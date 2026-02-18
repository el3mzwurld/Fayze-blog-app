<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<template>
  <nav class="nav">
    <RouterLink to="/" class="nav-brand">✦ Fayze Blog</RouterLink>

    <div class="nav-links">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink :to="{ name: 'post', params: { id: 1 } }">Latest</RouterLink>
    </div>
  </nav>
</template>

<style scoped>
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(15, 17, 23, 0.85);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--border);
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.nav-brand {
  font-size: 1.25rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 1.25rem;
}

.nav-links a {
  color: var(--muted);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: var(--text);
}
</style>
