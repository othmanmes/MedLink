<script setup lang="ts">
import type { City } from '../models/city'
import type { Doctor } from '../models/doctor'
import type { Specialty } from '../models/specialty'
import DoctorCard from './DoctorCard.vue'

defineProps<{
  doctors: Doctor[]
  city: City
  specialty: Specialty
}>()
</script>

<template>
  <div class="doctor-list">
    <DoctorCard
      v-for="doctor in doctors"
      :key="doctor.id"
      :doctor="doctor"
      :city="city"
      :specialty="specialty"
    />
  </div>
</template>

<style scoped>
.doctor-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

@media (min-width: 760px) {
  .doctor-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1120px) {
  .doctor-list {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
