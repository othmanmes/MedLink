<script setup lang="ts">
import { nextTick, ref } from 'vue'
import CitySelector from '../components/CitySelector.vue'
import DirectoryStatus from '../components/DirectoryStatus.vue'
import DoctorList from '../components/DoctorList.vue'
import SpecialtyGrid from '../components/SpecialtyGrid.vue'
import { useDoctorDirectory } from '../composables/useDoctorDirectory'

const {
  cities,
  specialties,
  doctors,
  selectedCityId,
  selectedSpecialtyId,
  selectedCity,
  selectedSpecialty,
  isInitializing,
  isLoadingDoctors,
  initializationError,
  doctorSearchError,
  loadFilters,
  searchDoctors,
  selectCity,
  selectSpecialty,
} = useDoctorDirectory()

const resultsSection = ref<HTMLElement | null>(null)

const handleSpecialtySelection = async (specialtyId: string) => {
  await selectSpecialty(specialtyId)
  await nextTick()
  resultsSection.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <section class="hero">
    <div class="container hero__inner">
      <div class="hero__content">
        <p class="eyebrow"><span aria-hidden="true">✦</span> Le bon médecin, simplement</p>
        <h1>
          Votre santé mérite le
          <span>bon spécialiste.</span>
        </h1>
        <p class="hero__lead">
          Trouvez rapidement un médecin près de chez vous et contactez-le directement, sans intermédiaire.
        </p>

        <div id="search" class="hero__search">
          <div class="step-label">
            <span>01</span>
            <p>Commencez par choisir votre ville</p>
          </div>
          <CitySelector
            :cities="cities"
            :model-value="selectedCityId"
            :disabled="isInitializing || Boolean(initializationError)"
            @update:model-value="selectCity"
          />
        </div>
      </div>

      <div class="hero-visual" aria-hidden="true">
        <span class="hero-visual__orb hero-visual__orb--one"></span>
        <span class="hero-visual__orb hero-visual__orb--two"></span>
        <div class="care-panel">
          <div class="care-panel__top">
            <span class="care-panel__mini-logo">+</span>
            <span>MedLink Care</span>
            <i></i>
          </div>
          <div class="care-panel__portrait">
            <div class="care-panel__face">Dr</div>
            <span class="care-panel__verified">✓</span>
          </div>
          <div class="care-panel__copy">
            <strong>Un spécialiste près de vous</strong>
            <span></span>
            <span></span>
          </div>
          <div class="care-panel__action">Disponible maintenant <b>→</b></div>
        </div>
        <div class="floating-card floating-card--rating">
          <span>♥</span>
          <div><strong>Prendre soin</strong><small>en toute confiance</small></div>
        </div>
        <div class="floating-card floating-card--location">
          <span>⌖</span>
          <div><strong>10 villes</strong><small>partout en Tunisie</small></div>
        </div>
      </div>
    </div>
  </section>

  <section id="how-it-works" class="trust-strip">
    <div class="container trust-strip__inner">
      <div><strong>10</strong><span>villes couvertes</span></div>
      <i></i>
      <div><strong>15</strong><span>spécialités médicales</span></div>
      <i></i>
      <div><strong>Direct</strong><span>contact WhatsApp</span></div>
    </div>
  </section>

  <section id="specialties" class="specialties-section">
    <div class="container">
      <div class="section-heading">
        <div>
          <p class="section-kicker"><span>02</span> Choisissez votre spécialité</p>
          <h2>De quel spécialiste avez-vous besoin ?</h2>
          <p v-if="selectedCity" class="section-copy">
            Sélectionnez une spécialité pour afficher les médecins disponibles à {{ selectedCity.name }}.
          </p>
          <p v-else class="section-copy">
            Choisissez d'abord votre ville pour activer les spécialités ci-dessous.
          </p>
        </div>
        <span v-if="selectedCity" class="selected-city"><i aria-hidden="true">⌖</i>{{ selectedCity.name }}</span>
      </div>

      <div v-if="isInitializing" class="specialty-skeleton" aria-label="Chargement des spécialités">
        <span v-for="index in 6" :key="index"></span>
      </div>
      <SpecialtyGrid
        v-else-if="!initializationError"
        :specialties="specialties"
        :selected-specialty-id="selectedSpecialtyId"
        :disabled="!selectedCityId"
        @select="handleSpecialtySelection"
      />
    </div>
  </section>

  <section ref="resultsSection" class="results-section">
    <div class="container">
      <div class="section-heading section-heading--results">
        <div>
          <p class="section-kicker"><span>03</span> Rencontrez votre médecin</p>
          <h2 v-if="selectedSpecialty && selectedCity">
            {{ selectedSpecialty.name }} à {{ selectedCity.name }}
          </h2>
          <h2 v-else>Les médecins qui vous correspondent</h2>
        </div>
        <p v-if="selectedSpecialty && selectedCity && !isLoadingDoctors && !doctorSearchError" class="result-count">
          {{ doctors.length }} {{ doctors.length > 1 ? 'médecins trouvés' : 'médecin trouvé' }}
        </p>
      </div>

      <DirectoryStatus
        v-if="initializationError"
        icon="!"
        title="Impossible de charger MedLink"
        :description="initializationError"
        action-label="Réessayer"
        @action="loadFilters"
      />
      <DirectoryStatus
        v-else-if="isInitializing"
        icon="✦"
        title="Préparation de votre recherche"
        description="Nous chargeons les villes et les spécialités disponibles."
        loading
      />
      <DirectoryStatus
        v-else-if="!selectedCity"
        icon="⌖"
        title="Commencez par votre ville"
        description="Sélectionnez la ville dans laquelle vous souhaitez consulter un médecin."
      />
      <DirectoryStatus
        v-else-if="!selectedSpecialty"
        icon="✣"
        title="Choisissez une spécialité"
        :description="`Les spécialités sont maintenant disponibles pour votre recherche à ${selectedCity.name}.`"
      />
      <DirectoryStatus
        v-else-if="isLoadingDoctors"
        icon="✦"
        title="Recherche des médecins"
        :description="`Nous recherchons les spécialistes disponibles à ${selectedCity.name}.`"
        loading
      />
      <DirectoryStatus
        v-else-if="doctorSearchError"
        icon="!"
        title="La recherche n'a pas abouti"
        :description="doctorSearchError"
        action-label="Réessayer"
        @action="searchDoctors"
      />
      <DirectoryStatus
        v-else-if="doctors.length === 0"
        icon="⌕"
        title="Aucun médecin trouvé"
        :description="`Aucun médecin trouvé pour ${selectedSpecialty.name} à ${selectedCity.name}. Essayez une autre spécialité ou une autre ville.`"
      />
      <DoctorList
        v-else
        :doctors="doctors"
        :city="selectedCity"
        :specialty="selectedSpecialty"
      />
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  padding: 58px 0 54px;
}

.hero::before {
  position: absolute;
  top: 5%;
  left: -130px;
  width: 300px;
  height: 300px;
  content: '';
  border: 1px solid rgba(13, 125, 118, 0.07);
  border-radius: 50%;
  box-shadow: 0 0 0 48px rgba(13, 125, 118, 0.025), 0 0 0 96px rgba(13, 125, 118, 0.015);
}

.hero__inner {
  position: relative;
  display: grid;
  align-items: center;
  gap: 50px;
}

.hero__content {
  position: relative;
  z-index: 2;
}

.eyebrow,
.section-kicker {
  display: flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 17px;
  color: var(--primary);
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.eyebrow span {
  display: grid;
  width: 24px;
  height: 24px;
  place-items: center;
  border-radius: 8px;
  background: var(--primary-soft);
}

h1 {
  max-width: 700px;
  margin-bottom: 21px;
  color: var(--ink);
  font-size: clamp(2.45rem, 10vw, 4.4rem);
  font-weight: 800;
  letter-spacing: -0.058em;
  line-height: 1.04;
}

h1 span {
  display: block;
  color: var(--primary);
}

.hero__lead {
  max-width: 590px;
  margin-bottom: 31px;
  color: var(--muted);
  font-size: 1rem;
  line-height: 1.65;
}

.hero__search {
  max-width: 500px;
  padding: 15px;
  border: 1px solid rgba(221, 235, 232, 0.9);
  border-radius: 23px;
  background: rgba(255, 255, 255, 0.58);
  box-shadow: 0 18px 50px rgba(31, 84, 80, 0.07);
  backdrop-filter: blur(12px);
}

.step-label {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 1px 3px 12px;
}

.step-label span,
.section-kicker span {
  color: #94aaa7;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.step-label span {
  display: grid;
  width: 29px;
  height: 29px;
  place-items: center;
  color: white;
  border-radius: 9px;
  background: var(--primary);
}

.step-label p {
  margin: 0;
  color: #557370;
  font-size: 0.83rem;
  font-weight: 700;
}

.hero-visual {
  position: relative;
  display: none;
  min-height: 455px;
  align-items: center;
  justify-content: center;
}

.hero-visual::before {
  position: absolute;
  width: 385px;
  height: 385px;
  content: '';
  border-radius: 46% 54% 57% 43% / 53% 45% 55% 47%;
  background: linear-gradient(145deg, #d8f2ed 0%, #c0e7df 100%);
  transform: rotate(-6deg);
}

.hero-visual__orb {
  position: absolute;
  border-radius: 50%;
}

.hero-visual__orb--one {
  top: 33px;
  right: 13%;
  width: 39px;
  height: 39px;
  background: var(--warm);
  box-shadow: 0 12px 20px rgba(245, 167, 133, 0.2);
}

.hero-visual__orb--two {
  bottom: 25px;
  left: 17%;
  width: 22px;
  height: 22px;
  border: 6px solid #83cfc3;
}

.care-panel {
  position: relative;
  z-index: 2;
  width: 276px;
  padding: 17px;
  overflow: hidden;
  border: 7px solid rgba(255, 255, 255, 0.8);
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 27px 60px rgba(29, 88, 82, 0.2);
  transform: rotate(2deg);
}

.care-panel::after {
  position: absolute;
  right: -26px;
  bottom: 68px;
  width: 92px;
  height: 92px;
  content: '+';
  color: rgba(13, 125, 118, 0.065);
  font-family: 'DM Sans', sans-serif;
  font-size: 7rem;
  line-height: 0.8;
}

.care-panel__top {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 8px;
  color: #456865;
  font-size: 0.68rem;
  font-weight: 800;
}

.care-panel__mini-logo {
  display: grid;
  width: 25px;
  height: 25px;
  place-items: center;
  color: white;
  border-radius: 8px;
  background: var(--primary);
  font-size: 1rem;
}

.care-panel__top i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--warm);
  box-shadow: -10px 0 #c6dad7, -20px 0 #c6dad7;
}

.care-panel__portrait {
  position: relative;
  display: grid;
  width: 136px;
  height: 136px;
  margin: 25px auto 16px;
  place-items: center;
  border: 12px solid #e6f4f1;
  border-radius: 43% 57% 48% 52%;
  background: linear-gradient(150deg, #b7ded7, #78bfb5);
}

.care-panel__face {
  display: grid;
  width: 82px;
  height: 82px;
  place-items: center;
  color: rgba(255, 255, 255, 0.94);
  border-radius: 50%;
  background: rgba(13, 125, 118, 0.33);
  font-family: 'Manrope', sans-serif;
  font-size: 1.5rem;
  font-weight: 800;
}

.care-panel__verified {
  position: absolute;
  right: -5px;
  bottom: 4px;
  display: grid;
  width: 30px;
  height: 30px;
  place-items: center;
  color: white;
  border: 4px solid white;
  border-radius: 50%;
  background: var(--primary);
  font-size: 0.69rem;
}

.care-panel__copy {
  text-align: center;
}

.care-panel__copy strong {
  display: block;
  margin-bottom: 9px;
  color: #284f4b;
  font-family: 'Manrope', sans-serif;
  font-size: 0.86rem;
}

.care-panel__copy span {
  display: block;
  width: 72%;
  height: 5px;
  margin: 6px auto;
  border-radius: 8px;
  background: #e3eeec;
}

.care-panel__copy span:nth-child(3) {
  width: 45%;
}

.care-panel__action {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 17px;
  padding: 12px 14px;
  color: white;
  border-radius: 13px;
  background: var(--primary);
  font-size: 0.69rem;
  font-weight: 700;
}

.care-panel__action b {
  font-size: 1rem;
}

.floating-card {
  position: absolute;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 14px;
  border: 1px solid rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 15px 34px rgba(31, 84, 80, 0.13);
  backdrop-filter: blur(10px);
}

.floating-card > span {
  display: grid;
  width: 33px;
  height: 33px;
  place-items: center;
  color: var(--primary);
  border-radius: 10px;
  background: var(--primary-soft);
  font-weight: 800;
}

.floating-card strong,
.floating-card small {
  display: block;
}

.floating-card strong {
  color: #375b58;
  font-size: 0.7rem;
}

.floating-card small {
  margin-top: 2px;
  color: #839795;
  font-size: 0.59rem;
}

.floating-card--rating {
  top: 78px;
  left: 2%;
  transform: rotate(-3deg);
}

.floating-card--rating > span {
  color: #d97858;
  background: var(--warm-soft);
}

.floating-card--location {
  right: 0;
  bottom: 58px;
  transform: rotate(2deg);
}

.trust-strip {
  border-block: 1px solid var(--line);
  background: rgba(255, 255, 255, 0.65);
}

.trust-strip__inner {
  display: grid;
  grid-template-columns: 1fr;
  padding-block: 6px;
}

.trust-strip__inner > div {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 8px;
  padding: 13px 8px;
}

.trust-strip strong {
  color: var(--primary);
  font-family: 'Manrope', sans-serif;
  font-size: 1rem;
}

.trust-strip span {
  color: #708986;
  font-size: 0.77rem;
  font-weight: 600;
}

.trust-strip i {
  display: none;
}

.specialties-section,
.results-section {
  padding: 72px 0 10px;
  scroll-margin-top: 24px;
}

.section-heading {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 27px;
}

.section-kicker {
  margin-bottom: 10px;
}

.section-heading h2 {
  max-width: 650px;
  margin-bottom: 8px;
  color: var(--ink);
  font-size: clamp(1.6rem, 5vw, 2.3rem);
  letter-spacing: -0.04em;
  line-height: 1.15;
}

.section-copy {
  max-width: 650px;
  margin: 0;
  color: var(--muted);
  font-size: 0.9rem;
  line-height: 1.55;
}

.selected-city {
  display: inline-flex;
  width: fit-content;
  align-items: center;
  gap: 7px;
  padding: 9px 13px;
  color: var(--primary-dark);
  border: 1px solid #c9e2dd;
  border-radius: 999px;
  background: white;
  font-size: 0.8rem;
  font-weight: 700;
  box-shadow: var(--shadow-sm);
}

.selected-city i {
  font-style: normal;
}

.specialty-skeleton {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

.specialty-skeleton span {
  min-height: 96px;
  border-radius: 18px;
  background: linear-gradient(90deg, #edf5f3 25%, #f8fbfa 42%, #edf5f3 60%);
  background-size: 300% 100%;
  animation: shimmer 1.2s linear infinite;
}

.results-section {
  padding-bottom: 28px;
}

.section-heading--results {
  align-items: flex-start;
}

.result-count {
  margin: 0;
  padding: 8px 12px;
  color: #66817e;
  border-radius: 999px;
  background: #eaf5f3;
  font-size: 0.75rem;
  font-weight: 700;
}

@keyframes shimmer {
  from { background-position: 100% 0; }
  to { background-position: 0 0; }
}

@media (min-width: 640px) {
  .trust-strip__inner {
    grid-template-columns: 1fr auto 1fr auto 1fr;
    align-items: center;
  }

  .trust-strip i {
    display: block;
    width: 1px;
    height: 24px;
    background: var(--line);
  }

  .specialty-skeleton {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
  }

  .section-heading {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }

  .section-heading--results {
    align-items: flex-end;
  }
}

@media (min-width: 900px) {
  .hero {
    padding: 74px 0 66px;
  }

  .hero__inner {
    grid-template-columns: minmax(0, 1.1fr) minmax(390px, 0.9fr);
    min-height: 500px;
    gap: 24px;
  }

  .hero-visual {
    display: flex;
  }

  .specialties-section,
  .results-section {
    padding-top: 94px;
  }
}

@media (min-width: 980px) {
  .specialty-skeleton {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
  }
}
</style>
