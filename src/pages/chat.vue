<template>
  <VLayout class="rounded rounded-md">
    <VNavigationDrawer
      location="left"
      :width="50"
      permanent
    ></VNavigationDrawer>
    <VNavigationDrawer
      location="right"
      :width="100"
      permanent
    ></VNavigationDrawer>

    <VNavigationDrawer location="left" :width="470" permanent>
      <VSheet color="grey-lighten-5" height="100%">
        <div class="pa-4">
          <div class="d-flex align-center mb-2">
            <VIcon icon="mdi-account-group-outline" class="mr-2" />
            <div class="font-weight-bold text-capitalize">
              {{ currentGroup }}
            </div>
          </div>

          <p class="text-caption text-grey">
            {{ users.length }} usuário(s) online
          </p>
        </div>
        <VDivider />
        <VList>
          <VListItem
            v-for="user in users"
            :key="user.id"
            :title="user.username"
            :subtitle="user.type"
            :class="{
              'bg-blue-lighten-5': user.username === route.query.username,
            }"
          >
            <template #prepend>
              <VAvatar color="primary" size="small">
                <span class="text-white font-weight-bold">{{
                  getInitials(user.username)
                }}</span>
              </VAvatar>
            </template>
          </VListItem>
        </VList>
      </VSheet>
    </VNavigationDrawer>

    <VAppBar title="Sanalta" flat border>
      <VBtn
        variant="outlined"
        color="error"
        class="text-capitalize mr-4"
        @click="leaveGroup"
      >
        Sair da Sala
      </VBtn>
    </VAppBar>

    <VMain class="d-flex flex-column" style="height: 100vh">
      <div class="flex-grow-1 pa-8 overflow-y-auto" ref="chatContainer">
        <div
          class="d-flex w-100 mb-1"
          v-for="(chat, i) in chats"
          :key="i"
          :class="getChatBubbleClass(chat.username)"
        >
          <VSheet
            max-width="65%"
            class="rounded-lg pa-2"
            :color="getChatBubbleColor(chat.username)"
          >
            <div
              v-if="
                chat.username !== 'chatSystem' &&
                chat.username !== route.query.username
              "
              class="d-flex align-center text-caption mb-1"
            >
              <div class="font-weight-bold text-primary">
                {{ chat.username }}
              </div>
            </div>

            <div class="text-body-1 d-flex align-end">
              <span>{{ chat.text }}</span>

              <span
                class="text-caption text-grey-darken-1 ml-3"
                style="margin-bottom: -4px"
              >
                {{ chat.username === "chatSystem" ? "" : chat.time }}
              </span>
            </div>
          </VSheet>
        </div>
      </div>

      <div class="flex-shrink-0 pa-4" style="background-color: white">
        <VForm @submit.prevent="onSubmit" class="w-100">
          <VTextField
            v-model="message"
            variant="solo"
            placeholder="Digite sua mensagem..."
            hide-details
            rounded="lg"
            autofocus
          >
            <template #append-inner>
              <V-Btn
                type="submit"
                icon="mdi-send"
                color="primary"
                variant="flat"
                @click="onSubmit"
                :disabled="!message.trim()"
              />
            </template>
          </VTextField>
        </VForm>
      </div>
    </VMain>
  </VLayout>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import { io, type Socket } from "socket.io-client";

type Chat = {
  username: string;
  text: string;
  time: string;
  group?: string;
};

type User = {
  id: string;
  username: string;
  group: string;
  type: "paciente" | "consultor";
};

const route = useRoute();
const router = useRouter();

const message = ref("");
const chats = ref<Chat[]>([]);
const users = ref<User[]>([]);
const currentGroup = ref("");
const socket = ref<Socket>();
const chatContainer = ref<HTMLElement | null>(null); // NOVO: Ref para o container do chat

// NOVO: Função para scrollar para o final do chat
const scrollToBottom = async () => {
  await nextTick();
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
};

// NOVO: Função para pegar as iniciais do nome de usuário
const getInitials = (username: string = "") => {
  if (username === "chatSystem") return "A";
  return username.substring(0, 2).toUpperCase();
};

// NOVO: Funções para estilização dinâmica das bolhas de chat
const getChatBubbleClass = (username: string) => {
  if (username === "chatSystem") return "justify-center";
  return username === route.query.username ? "justify-end" : "justify-start";
};

const getChatBubbleColor = (username: string) => {
  if (username === "chatSystem") return "white";
  return username === route.query.username
    ? "blue-lighten-4"
    : "grey-lighten-3";
};

const onSubmit = () => {
  console.log("Função onSubmit chamada!"); // Adicione esta linha

  if (!message.value.trim()) {
    console.log("Mensagem vazia, abortando.");
    return;
  }

  socket.value?.emit("chat:post_message", message.value);
  console.log("Evento chatMessage emitido."); // Adicione esta linha
  message.value = "";
  scrollToBottom();
};



onMounted(() => {
  socket.value = io("http://localhost:3001");
  const { username, group, type } = route.query as Partial<User>;

  if (!username || !group || !type) {
    router.push("/");
    return;
  }

  socket.value?.emit("group:join", { username, group, type });

  // Recupera os usuarios do grupo
  socket.value?.on("group:users_update", (response: { group: string; users: User[] }) => {
    currentGroup.value = response.group;
    users.value = response.users;
  });

  // Recupera as mensagens do grupo
  socket.value?.on("chat_history_load", (chatHistory: Chat[]) => {
    chats.value = chatHistory;
    scrollToBottom();
  });

  socket.value?.on("chat:new_message", (newMessage: Chat) => {
    chats.value.push(newMessage);
    scrollToBottom();
  });

  socket.value?.on("chat:new_notification", (notification: Chat) => {
    chats.value.push(notification);
    scrollToBottom();
  });
});

const leaveGroup = () => {
  socket.value?.emit("group:leave");
  router.push("/");
};

onBeforeUnmount(() => {
  socket.value?.emit("group:leave");
});
</script>

<style scoped>
/* Adicionando um estilo para a barra de rolagem para um visual mais limpo */
.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: #d1d5db; /* cinza claro */
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background-color: #f8fafc; /* quase branco */
}
</style>
