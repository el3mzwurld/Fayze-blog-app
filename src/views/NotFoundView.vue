<template>
  <div class="notfound">
    <div class="code">404</div>
    <h2>Page not found</h2>
    <p>This page doesn't exist or has been moved. ☹️☹️☹️.</p>
    <RouterLink :to="{ name: 'home' }" class="btn btn-primary"
      >← Go home instead.</RouterLink
    >
  </div>
</template>

<style scoped>
.notfound {
  text-align: center;
  padding: 5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.code {
  font-size: clamp(5rem, 15vw, 9rem);
  font-weight: 900;
  line-height: 1;
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.notfound h2 {
  font-size: 1.5rem;
  font-weight: 700;
}

.notfound p {
  color: var(--muted);
  max-width: 360px;
}
</style>
