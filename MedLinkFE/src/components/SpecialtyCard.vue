<script setup lang="ts">
import type { Specialty } from '../models/specialty'

defineProps<{
  specialty: Specialty
  selected: boolean
  disabled: boolean
}>()

defineEmits<{
  select: [specialtyId: string]
}>()
</script>

<template>
  <button
    class="specialty-card"
    :class="[`specialty-card--${specialty.accent}`, { 'specialty-card--selected': selected }]"
    type="button"
    :disabled="disabled"
    :aria-pressed="selected"
    @click="$emit('select', specialty.id)"
  >
    <span class="specialty-card__icon" aria-hidden="true">{{ specialty.icon }}</span>
    <span class="specialty-card__name">{{ specialty.name }}</span>
    <span class="specialty-card__arrow" aria-hidden="true">→</span>
  </button>
</template>

<style scoped>
.specialty-card {
  --card-accent: #0d7d76;
  --card-soft: #e4f5f2;
  display: grid;
  width: 100%;
  min-height: 96px;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 15px;
  padding: 15px;
  text-align: left;
  border: 1px solid #deebe8;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 16px rgba(31, 84, 80, 0.035);
  cursor: pointer;
  transition: border-color 180ms ease, box-shadow 180ms ease, transform 180ms ease;
}

.specialty-card:hover:not(:disabled) {
  border-color: color-mix(in srgb, var(--card-accent) 45%, white);
  box-shadow: var(--shadow-sm);
  transform: translateY(-2px);
}

.specialty-card:disabled {
  cursor: not-allowed;
  opacity: 0.56;
}

.specialty-card--selected {
  border-color: var(--card-accent);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--card-accent) 13%, transparent), var(--shadow-sm);
  background: color-mix(in srgb, var(--card-soft) 32%, white);
}

.specialty-card--coral {
  --card-accent: #d97858;
  --card-soft: #ffede7;
}

.specialty-card--blue {
  --card-accent: #5287a4;
  --card-soft: #e5f2f8;
}

.specialty-card--violet {
  --card-accent: #8877a8;
  --card-soft: #f0ebf7;
}

.specialty-card__icon {
  display: grid;
  width: 52px;
  height: 52px;
  place-items: center;
  color: var(--card-accent);
  border-radius: 15px;
  background: var(--card-soft);
  font-size: 1.4rem;
  font-weight: 700;
}

.specialty-card__name {
  color: #274c49;
  font-size: 0.94rem;
  font-weight: 700;
  line-height: 1.3;
}

.specialty-card__arrow {
  color: var(--card-accent);
  font-size: 1.15rem;
  opacity: 0.65;
  transform: translateX(-3px);
  transition: transform 180ms ease, opacity 180ms ease;
}

.specialty-card:hover:not(:disabled) .specialty-card__arrow,
.specialty-card--selected .specialty-card__arrow {
  opacity: 1;
  transform: translateX(0);
}
</style>
