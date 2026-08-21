<template>
  <header id="top" class="app-header">
    <div class="container app-header__inner">
      <a class="brand" href="#top" aria-label="MedLink, accueil">
        <span class="brand__mark" aria-hidden="true"><span>+</span></span>
        <span>MedLink</span>
      </a>

      <nav class="app-header__nav" aria-label="Navigation principale">
        <a href="#specialties">Spécialités</a>
        <a href="#how-it-works">Comment ça marche ?</a>
      </nav>

      <a class="header-action" href="#search">
        Trouver un médecin
        <span aria-hidden="true">→</span>
      </a>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  position: relative;
  z-index: 20;
  border-bottom: 1px solid rgba(220, 234, 231, 0.85);
  background: rgba(247, 251, 250, 0.88);
  backdrop-filter: blur(18px);
}

.app-header__inner {
  display: flex;
  min-height: 74px;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.app-header__nav {
  display: none;
  align-items: center;
  gap: 34px;
}

.app-header__nav a {
  position: relative;
  color: #577471;
  font-size: 0.91rem;
  font-weight: 600;
  text-decoration: none;
}

.app-header__nav a::after {
  position: absolute;
  right: 0;
  bottom: -7px;
  left: 0;
  height: 2px;
  content: '';
  border-radius: 2px;
  background: var(--primary);
  transform: scaleX(0);
  transition: transform 180ms ease;
}

.app-header__nav a:hover::after {
  transform: scaleX(1);
}

.header-action {
  display: none;
  align-items: center;
  gap: 8px;
  padding: 11px 17px;
  color: white;
  border-radius: 12px;
  background: var(--primary);
  box-shadow: 0 8px 18px rgba(13, 125, 118, 0.16);
  font-size: 0.86rem;
  font-weight: 700;
  text-decoration: none;
  transition: background 180ms ease, transform 180ms ease;
}

.header-action:hover {
  background: var(--primary-dark);
  transform: translateY(-1px);
}

@media (min-width: 700px) {
  .header-action {
    display: inline-flex;
  }
}

@media (min-width: 920px) {
  .app-header__nav {
    display: flex;
  }
}
</style>
