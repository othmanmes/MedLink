<script setup lang="ts">
import type { City } from '../models/city'

defineProps<{
  cities: City[]
  modelValue: string
  disabled?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [cityId: string]
}>()

const handleChange = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLSelectElement).value)
}
</script>

<template>
  <div class="city-field">
    <span class="city-field__icon" aria-hidden="true">⌖</span>
    <label for="city-select">
      <span>Votre ville</span>
      <select
        id="city-select"
        :value="modelValue"
        :disabled="disabled"
        aria-describedby="city-hint"
        @change="handleChange"
      >
        <option value="">Choisir une ville</option>
        <option v-for="city in cities" :key="city.id" :value="city.id">
          {{ city.name }}
        </option>
      </select>
    </label>
    <span class="city-field__arrow" aria-hidden="true">⌄</span>
  </div>
  <p id="city-hint" class="city-hint">10 villes tunisiennes disponibles</p>
</template>

<style scoped>
.city-field {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 13px;
  min-height: 74px;
  padding: 11px 16px;
  border: 1px solid #d6e8e4;
  border-radius: 17px;
  background: white;
  box-shadow: 0 12px 32px rgba(27, 86, 81, 0.08);
  transition: border-color 180ms ease, box-shadow 180ms ease;
}

.city-field:focus-within {
  border-color: var(--primary);
  box-shadow: 0 12px 36px rgba(13, 125, 118, 0.14);
}

.city-field__icon {
  display: grid;
  width: 42px;
  height: 42px;
  place-items: center;
  color: var(--primary);
  border-radius: 12px;
  background: var(--primary-soft);
  font-size: 1.35rem;
  font-weight: 700;
}

label {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 2px;
}

label > span {
  color: #738c8a;
  font-size: 0.73rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

select {
  width: 100%;
  padding: 0;
  color: var(--ink);
  border: 0;
  outline: 0;
  background: transparent;
  appearance: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
}

select:disabled {
  cursor: wait;
}

.city-field__arrow {
  color: var(--primary);
  font-size: 1.25rem;
  pointer-events: none;
}

.city-hint {
  margin: 10px 0 0;
  color: #78908e;
  font-size: 0.79rem;
}
</style>
