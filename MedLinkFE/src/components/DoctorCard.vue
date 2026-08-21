<script setup lang="ts">
import { computed } from 'vue'
import type { City } from '../models/city'
import type { Doctor } from '../models/doctor'
import type { Specialty } from '../models/specialty'
import { externalLinkService } from '../services/externalLinkService'

const props = defineProps<{
  doctor: Doctor
  city: City
  specialty: Specialty
}>()

const fullName = computed(() => `Dr ${props.doctor.firstName} ${props.doctor.lastName}`)
const initials = computed(
  () => `${props.doctor.firstName.charAt(0)}${props.doctor.lastName.charAt(0)}`.toUpperCase(),
)
const whatsappUrl = computed(() => externalLinkService.buildWhatsAppUrl(props.doctor))
const mapUrl = computed(() => externalLinkService.buildMapUrl(props.doctor))
</script>

<template>
  <article class="doctor-card">
    <div class="doctor-card__profile">
      <img
        v-if="doctor.profileImage"
        class="doctor-card__avatar"
        :src="doctor.profileImage"
        :alt="`Portrait de ${fullName}`"
      />
      <div v-else class="doctor-card__avatar doctor-card__avatar--placeholder" aria-hidden="true">
        <span>{{ initials }}</span>
      </div>

      <div class="doctor-card__identity">
        <span class="doctor-card__availability"><i></i> Disponible sur WhatsApp</span>
        <h3>{{ fullName }}</h3>
        <p class="doctor-card__specialty">{{ specialty.name }}</p>
      </div>
    </div>

    <div class="doctor-card__location">
      <span class="doctor-card__pin" aria-hidden="true">⌖</span>
      <div>
        <strong>{{ city.name }}</strong>
        <p>{{ doctor.address }}</p>
      </div>
    </div>

    <div class="doctor-card__actions">
      <a class="doctor-action doctor-action--map" :href="mapUrl" target="_blank" rel="noopener noreferrer">
        <span aria-hidden="true">⌖</span>
        Voir l'emplacement
      </a>
      <a
        class="doctor-action doctor-action--whatsapp"
        :href="whatsappUrl"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span class="whatsapp-mark" aria-hidden="true">◔</span>
        Prendre rendez-vous
      </a>
    </div>
  </article>
</template>

<style scoped>
.doctor-card {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 21px;
  padding: 21px;
  border: 1px solid var(--line);
  border-radius: 22px;
  background: white;
  box-shadow: var(--shadow-sm);
  transition: box-shadow 180ms ease, transform 180ms ease;
}

.doctor-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.doctor-card__profile {
  display: flex;
  align-items: center;
  gap: 15px;
}

.doctor-card__avatar {
  width: 68px;
  height: 68px;
  flex: 0 0 auto;
  border: 4px solid white;
  border-radius: 19px;
  object-fit: cover;
  box-shadow: 0 0 0 1px var(--line), 0 8px 20px rgba(31, 84, 80, 0.1);
}

.doctor-card__avatar--placeholder {
  display: grid;
  place-items: center;
  color: var(--primary-dark);
  background:
    radial-gradient(circle at 75% 20%, rgba(255, 255, 255, 0.7), transparent 32%),
    linear-gradient(145deg, #d9f1ec, #aedcd4);
  font-family: 'Manrope', sans-serif;
  font-size: 1.05rem;
  font-weight: 800;
  letter-spacing: 0.03em;
}

.doctor-card__identity {
  min-width: 0;
}

.doctor-card__availability {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 5px;
  color: #4a8670;
  font-size: 0.7rem;
  font-weight: 700;
}

.doctor-card__availability i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #49b982;
  box-shadow: 0 0 0 3px #e5f6ed;
}

h3 {
  margin: 0 0 3px;
  color: var(--ink);
  font-size: 1.07rem;
  line-height: 1.25;
}

.doctor-card__specialty {
  margin: 0;
  overflow: hidden;
  color: var(--primary);
  font-size: 0.83rem;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.doctor-card__location {
  display: flex;
  align-items: flex-start;
  gap: 11px;
  padding: 13px 14px;
  border-radius: 14px;
  background: var(--surface-soft);
}

.doctor-card__pin {
  display: grid;
  width: 28px;
  height: 28px;
  flex: 0 0 auto;
  place-items: center;
  color: var(--primary);
  border-radius: 9px;
  background: white;
  font-weight: 800;
}

.doctor-card__location strong {
  color: #365d59;
  font-size: 0.81rem;
}

.doctor-card__location p {
  margin: 2px 0 0;
  color: #758d8b;
  font-size: 0.77rem;
  line-height: 1.4;
}

.doctor-card__actions {
  display: grid;
  grid-template-columns: 1fr;
  gap: 9px;
  margin-top: auto;
}

.doctor-action {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 13px;
  border-radius: 12px;
  font-size: 0.79rem;
  font-weight: 700;
  text-align: center;
  text-decoration: none;
  transition: background 180ms ease, border-color 180ms ease, transform 180ms ease;
}

.doctor-action:hover {
  transform: translateY(-1px);
}

.doctor-action--map {
  color: var(--primary-dark);
  border: 1px solid #cfe4e0;
  background: white;
}

.doctor-action--map:hover {
  border-color: #a8d2ca;
  background: var(--surface-soft);
}

.doctor-action--whatsapp {
  color: white;
  border: 1px solid var(--primary);
  background: var(--primary);
}

.doctor-action--whatsapp:hover {
  background: var(--primary-dark);
}

.whatsapp-mark {
  font-size: 1rem;
}

@media (min-width: 420px) {
  .doctor-card__actions {
    grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.25fr);
  }
}
</style>
