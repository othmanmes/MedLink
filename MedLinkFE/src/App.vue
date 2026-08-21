<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
import HomeView from './views/HomeView.vue'
</script>

<template>
  <div class="app-shell">
    <AppHeader />
    <main>
      <HomeView />
    </main>
    <footer class="app-footer">
      <div class="container app-footer__inner">
        <a class="brand brand--footer" href="#top" aria-label="Retour en haut de la page">
          <span class="brand__mark" aria-hidden="true"><span>+</span></span>
          <span>MedLink</span>
        </a>
        <p>Votre santé, plus proche de vous.</p>
        <p class="app-footer__legal">Prototype de recherche médicale en Tunisie</p>
      </div>
    </footer>
  </div>
</template>
