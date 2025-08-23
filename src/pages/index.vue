<template>
  <VContainer class="mt-14">
    <VForm @submit.prevent="onSubmit">
      <VCard max-width="600" class="mx-auto pa-5">
        <VCardTitle>
          <div class="d-flex align-center justify-center">
            <VIcon icon="mdi-chat" />
            <h3 class="ml-2">Vue Chatapp</h3>
          </div>
        </VCardTitle>
        <VCardText class="py-4">
          <VTextField label="Seu Nome" v-model="state.username" />
          <VSelect :items="rooms" label="Sala" v-model="state.room" />
          <VSelect :items="userTypes" label="Você é" v-model="state.type" />
        </VCardText>
        <VCardActions>
          <V-Btn
            block
            color="primary"
            :disabled="!state.username || !state.room || !state.type"
            variant="flat"
            size="large"
            type="submit"
          >
            Entrar no Chat
          </V-Btn>
        </VCardActions>
      </VCard>
    </VForm>
  </VContainer>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const rooms = ['Atendimento Geral', 'Suporte Técnico', 'Discussão Aberta'];
const userTypes = ['paciente', 'consultor']; // NOVO: Tipos de usuário disponíveis

const state = reactive({
  username: '',
  room: rooms[0],
  type: userTypes[0], // NOVO: Adiciona 'type' ao estado inicial
});

const onSubmit = () => {
  // MODIFICADO: Adiciona o 'type' à URL para ser enviado ao backend
  router.push(`/chat?username=${state.username}&room=${state.room}&type=${state.type}`);
};
</script>
