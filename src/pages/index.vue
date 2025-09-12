<template>
  <VLayout class="bg-grey-lighten-5">
    <VAppBar
      app
      flat
      class="bg-grey-lighten-5"
      border
      density="comfortable"
      scroll-behavior="elevate"
    >
      <VContainer class="d-flex align-center pa-0">
        <VAppBarTitle class="font-weight-black text-blue-lighten-1"
          >Sanalta</VAppBarTitle
        >
        <VSpacer />
        <VBtn
          variant="outlined"
          color="grey-darken-1"
          class="text-capitalize"
          prepend-icon="mdi-login-variant"
          @click="goToService"
        >
          Entrar
        </VBtn>
      </VContainer>
    </VAppBar>

    <VMain>
      <section id="hero">
        <VContainer
          fluid
          class="d-flex align-center justify-center text-center pa-4 fill-height hero-container"
        >
          <div class="w-100 w-md-75 w-lg-50">
            <h1
              class="text-h3 text-md-h2 font-weight-black mb-4 text-grey-darken-4"
            >
              Sua jornada para uma vida mais saudável começa aqui.
            </h1>
                      <p>State: {{ connected }}</p>
            <p
              class="text-h6 font-weight-regular text-grey-darken-2 mx-auto mb-8"
            >
              Cresça com saúde e bem-estar na Sanalta, a plataforma completa que
              cuida de você.
            </p>
            <VBtn
              color="blue-lighten-1"
              size="x-large"
              class="text-capitalize"
              elevation="4"
              @click="goToService"
            >
              Comece Agora
            </VBtn>
          </div>
        </VContainer>
      </section>

      <VContainer class="py-12 py-md-16">
        <h2
          class="text-h4 text-center font-weight-bold mb-4 text-grey-darken-3"
        >
          Uma plataforma completa para seu bem-estar
        </h2>
        <p class="text-body-1 text-center text-grey-darken-1 mb-12">
          Oferecemos as ferramentas que você precisa para se sentir melhor.
        </p>

        <VRow justify="center">
          <VCol cols="12" md="5" lg="4">
            <VCard class="pa-6 text-center card-hover" elevation="4" hover>
              <VAvatar color="blue-lighten-1" size="70" class="mb-6">
                <VIcon
                  icon="mdi-account-group-outline"
                  size="40"
                  color="white"
                />
              </VAvatar>
              <h3 class="text-h6 font-weight-bold mb-2 text-grey-darken-4">
                Grupos de Apoio
              </h3>
              <p class="text-body-1 text-grey-darken-2 mb-6">
                Conecte-se com pessoas que entendem sua jornada em um ambiente
                seguro e anônimo.
              </p>
              <VBtn
                color="blue-lighten-1"
                class="text-capitalize"
                @click="goToService"
                block
              >
                Comece a conversar
              </VBtn>
            </VCard>
          </VCol>

          <VCol cols="12" md="5" lg="4">
            <VCard class="pa-6 text-center card-hover" elevation="4" hover>
              <VAvatar color="blue-lighten-1" size="70" class="mb-6">
                <VIcon icon="mdi-head-heart-outline" size="40" color="white" />
              </VAvatar>
              <h3 class="text-h6 font-weight-bold mb-2 text-grey-darken-4">
                Sessões com Psicólogos
              </h3>
              <p class="text-body-1 text-grey-darken-2 mb-6">
                Receba orientação personalizada de profissionais experientes
                para apoiar seu crescimento.
              </p>
              <VBtn
                color="blue-lighten-1"
                class="text-capitalize"
                @click="goToGroups"
                block
              >
                Encontre um Psicólogo
              </VBtn>
            </VCard>
          </VCol>
        </VRow>
      </VContainer>

      <!-- <VContainer fluid class="bg-grey-lighten-4 py-12 py-md-16">
        <VContainer>
          <h2
            class="text-h4 text-center font-weight-bold mb-12 text-grey-darken-3"
          >
            Como Funciona?
          </h2>
          <VRow justify="center" align="center" class="text-center">
            <VCol cols="12" md="4" class="pa-4">
              <VIcon
                icon="mdi-account-plus-outline"
                size="50"
                color="grey-darken-2"
                class="mb-4"
              />
              <h3 class="text-h6 font-weight-bold mb-2">1. Cadastre-se</h3>
              <p class="text-body-1 text-grey-darken-2">
                Crie sua conta de forma rápida e segura para ter acesso a todos
                os recursos.
              </p>
            </VCol>
            <VCol cols="12" md="4" class="pa-4">
              <VIcon
                icon="mdi-magnify"
                size="50"
                color="grey-darken-2"
                class="mb-4"
              />
              <h3 class="text-h6 font-weight-bold mb-2">2. Explore</h3>
              <p class="text-body-1 text-grey-darken-2">
                Encontre grupos de apoio ou escolha um psicólogo que se encaixe
                no seu perfil.
              </p>
            </VCol>
            <VCol cols="12" md="4" class="pa-4">
              <VIcon
                icon="mdi-trending-up"
                size="50"
                color="grey-darken-2"
                class="mb-4"
              />
              <h3 class="text-h6 font-weight-bold mb-2">3. Cresça</h3>
              <p class="text-body-1 text-grey-darken-2">
                Participe das sessões e comece sua jornada de desenvolvimento
                pessoal.
              </p>
            </VCol>
          </VRow>
        </VContainer>
      </VContainer> -->

      <VFooter class="text-center d-flex flex-column pa-16 bg-grey-lighten-5">
        <div>


          <span class="font-weight-bold text-grey-darken-2">Sanalta</span>
        </div>
        <div class="text-caption text-grey-darken-1 mt-2">
          © {{ new Date().getFullYear() }} Todos os direitos reservados.
        </div>
      </VFooter>
    </VMain>
  </VLayout>
</template>

<script setup>
import { useRouter } from "vue-router";
import { computed } from "vue";
import { state2 } from "@/socket";


const router = useRouter();

const goToGroups = () => {
  router.push("/groups");
};

const goToService = () => {
  router.push("/services");
};

</script>

<style scoped>
/* Fonte importada para um visual mais moderno. Considere adicionar no seu index.html ou main.ts */
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap");

.v-main {
  font-family: "Inter", sans-serif;
}

.hero-container {
  min-height: 85vh; /* Garante que a primeira seção ocupe boa parte da tela */
  background: linear-gradient(
    to bottom,
    #f5f5f5,
    #e0e0e0
  ); /* Gradiente suave */
}

</style>
