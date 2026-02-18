<script setup>
defineProps({
  error: {
    type: Error,
    default: null,
  },
})

defineEmits(['retry'])
</script>

<template>
  <div class="error-box" role="alert">
    <div class="error-icon">⚠️</div>
    <h2>Something went wrong</h2>
    <p>{{ error?.message || 'An unexpected error occurred while loading content.' }}</p>
    <button class="btn btn-primary" @click="$emit('retry')">↺ Try Again</button>
  </div>
</template>

<style scoped>
.error-box {
  background: rgba(248, 113, 113, 0.08);
  border: 1px solid rgba(248, 113, 113, 0.3);
  border-radius: var(--radius);
  padding: 3rem 2rem;
  text-align: center;
}

.error-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.error-box h2 {
  color: var(--danger);
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.error-box p {
  color: var(--muted);
  margin-bottom: 1.5rem;
  max-width: 400px;
  margin-inline: auto;
}
</style>
