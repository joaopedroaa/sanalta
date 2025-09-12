<template>
  <VContainer
    fluid
    class="d-flex align-center justify-center fill-height bg-grey-lighten-5"
  >
    <VForm @submit.prevent="onSubmit" class="w-100">
      <VCard
        max-width="500"
        class="mx-auto pa-6 pa-md-8"
        elevation="0"
        border
        rounded="lg"
      >
        <VCardTitle
          class="d-flex flex-column align-center justify-center text-center"
        >
          <VIcon icon="mdi-message-text" size="x-large" color="primary" />
          <h1 class="text-h5 font-weight-bold mt-3">Sanalta Groups </h1>

        </VCardTitle>

        <VCardSubtitle class="text-center mb-6">
          Identifique-se para iniciar a <br />conversa de maneira segura e
          anonima
        </VCardSubtitle>

        <VCardText class="py-4">
          <VSelect
            :items="groups"
            v-model="state.group"
            label="Sala"
            variant="outlined"
            prepend-inner-icon="mdi-forum-outline"
            class="mb-4"
          />
          <VSelect
            :items="userTypes"
            v-model="state.type"
            label="Você é"
            variant="outlined"
            prepend-inner-icon="mdi-account-tie-outline"
            class="mb-4"
          />
          <VTextField
            v-model="state.username"
            label="Seu nome é opcional"
            variant="outlined"
            prepend-inner-icon="mdi-account-outline"
            class="mb-4"
          />
        </VCardText>

        <VCardActions>
          <VBtn
            :disabled="!state.group || !state.type"
            block
            color="primary"
            size="large"
            type="submit"
            variant="flat"
            class="text-capitalize font-weight-bold"
          >
            Entrar
          </VBtn>
        </VCardActions>
      </VCard>
    </VForm>
  </VContainer>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();


const groups = ["Maiores de idade","Saude mental", "Alcolismo"];
const userTypes = ["Não quero me identificar", "paciente", "pscicologo"];

const state = reactive({
  username: "",
  group: groups[0],
  type: userTypes[0],
});

function makeid(length: number) {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const onSubmit = () => {
  if (!state.username) {
    state.username = makeid(8);
  }

  if (state.type == "Não quero me identificar") {
    state.type = "-";
  }

  router.push(
    `/chat?username=${state.username}&group=${state.group}&type=${state.type}`
  );
};


</script>

<style scoped>
/* Adiciona um estilo sutil ao fundo da página, se desejar */
.fill-height {
  min-height: 100vh;
}
</style>
