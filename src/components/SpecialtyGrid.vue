<script setup lang="ts">
import type { Specialty } from '../models/specialty'
import SpecialtyCard from './SpecialtyCard.vue'

defineProps<{
  specialties: Specialty[]
  selectedSpecialtyId: string
  disabled: boolean
}>()

defineEmits<{
  select: [specialtyId: string]
}>()
</script>

<template>
  <div class="specialty-grid" :aria-busy="specialties.length === 0">
    <SpecialtyCard
      v-for="specialty in specialties"
      :key="specialty.id"
      :specialty="specialty"
      :selected="specialty.id === selectedSpecialtyId"
      :disabled="disabled"
      @select="$emit('select', $event)"
    />
  </div>
</template>

<style scoped>
.specialty-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

@media (min-width: 640px) {
  .specialty-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
  }
}

@media (min-width: 980px) {
  .specialty-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
  }
}
</style>
