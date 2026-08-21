<script setup lang="ts">
withDefaults(
  defineProps<{
    icon: string
    title: string
    description: string
    loading?: boolean
    actionLabel?: string
  }>(),
  {
    loading: false,
    actionLabel: '',
  },
)

defineEmits<{
  action: []
}>()
</script>

<template>
  <div class="directory-status" role="status" :aria-busy="loading">
    <span class="directory-status__icon" :class="{ 'directory-status__icon--loading': loading }" aria-hidden="true">
      {{ icon }}
    </span>
    <div>
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
    </div>
    <button v-if="actionLabel" type="button" @click="$emit('action')">{{ actionLabel }}</button>
  </div>
</template>

<style scoped>
.directory-status {
  display: flex;
  min-height: 180px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 13px;
  padding: 28px 20px;
  text-align: center;
  border: 1px dashed #cfe2de;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.68);
}

.directory-status__icon {
  display: grid;
  width: 48px;
  height: 48px;
  place-items: center;
  color: var(--primary);
  border-radius: 15px;
  background: var(--primary-soft);
  font-size: 1.25rem;
}

.directory-status__icon--loading {
  animation: pulse 1.15s ease-in-out infinite alternate;
}

h3 {
  margin: 0 0 5px;
  color: var(--ink);
  font-size: 1rem;
}

p {
  max-width: 510px;
  margin: 0;
  color: var(--muted);
  font-size: 0.86rem;
  line-height: 1.55;
}

button {
  margin-top: 3px;
  padding: 9px 15px;
  color: var(--primary-dark);
  border: 1px solid #bcd9d4;
  border-radius: 11px;
  background: white;
  cursor: pointer;
  font-size: 0.82rem;
  font-weight: 700;
}

@keyframes pulse {
  from {
    opacity: 0.55;
    transform: scale(0.94);
  }
  to {
    opacity: 1;
    transform: scale(1.04);
  }
}
</style>
