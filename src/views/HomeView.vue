<script setup>
import { ref, computed } from "vue";
import PostCard from "../components/PostCard.vue";
import ErrorBoundary from "../components/ErrorBoundary.vue";
import { fetchPosts } from "../api";

const error = ref(null);
const posts = ref([]);
const meta = ref(null);
const loading = ref(false);
const page = ref(1);
const LIMIT = 12;

const visiblePages = computed(() => {
  if (!meta.value) return [];
  const total = meta.value.totalPages;
  const cur = page.value;
  const delta = 2;
  const pages = [];
  for (
    let i = Math.max(1, cur - delta);
    i <= Math.min(total, cur + delta);
    i++
  ) {
    pages.push(i);
  }
  return pages;
});

async function loadPosts(p = 1) {
  if (loading.value) return;
  loading.value = true;
  error.value = null;
  try {
    console.log(`Fetching page ${p}...`);
    const result = await fetchPosts(p, LIMIT);
    posts.value = result.data;
    meta.value = result.meta;
    console.log(`Received ${result.data.length} posts for page ${p}`);
    page.value = p;
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (e) {
    error.value = e;
  } finally {
    loading.value = false;
  }
}

try {
  await loadPosts(1);
} catch (e) {
  error.value = e;
}
</script>

<template>
  <div>
    <header class="hero">
      <p class="hero-label">Welcome to</p>
      <h1>Elemi.co's Fayze Journal.</h1>
      <p class="hero-sub">
        My thoughts on programming, tech, school, and life in general. This is a
        project but i'm exploring writing in my near future so who knows, maybe
        i'll explore this as a possibility.
      </p>
    </header>

    <ErrorBoundary v-if="error" :error="error" @retry="() => loadPosts(page)" />

    <template v-else>
      <div v-if="meta" class="stats-bar">
        <span>{{ meta.total.toLocaleString() }} articles</span>
        <span class="dot" />
        <span>Page {{ page }} of {{ meta.totalPages }}</span>
      </div>

      <div class="grid" :class="{ loading: loading }">
        <PostCard v-for="post in posts" :key="post.id" :post="post" />
      </div>

      <nav v-if="meta && meta.totalPages > 1" class="pagination">
        <button
          class="btn btn-ghost"
          :disabled="!meta.hasPreviousPage || loading"
          @click="loadPosts(page - 1)"
        >
          ← Prev
        </button>

        <div class="page-numbers">
          <button
            v-for="p in visiblePages"
            :key="p"
            class="page-btn"
            :class="{ active: p === page }"
            :disabled="loading"
            @click="loadPosts(p)"
          >
            {{ p }}
          </button>
        </div>

        <button
          class="btn btn-ghost"
          :disabled="!meta.hasNextPage || loading"
          @click="loadPosts(page + 1)"
        >
          Next →
        </button>
      </nav>
    </template>
  </div>
</template>

<style scoped>
.hero {
  text-align: center;
  margin-bottom: 2.5rem;
  font-family: "PT Sans", sans-serif;
}
.hero-label {
  color: var(--accent);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}
.hero h1 {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 600;
  letter-spacing: -0.03em;
  background: linear-gradient(135deg, #fff 30%, var(--accent2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
}
.hero-sub {
  color: var(--muted);
  font-size: 1rem;
  max-width: 480px;
  margin: 0 auto;
}
.stats-bar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--muted);
  font-size: 0.8rem;
  margin-bottom: 1.5rem;
}
.dot {
  width: 3px;
  height: 3px;
  background: var(--muted);
  border-radius: 50%;
  display: inline-block;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 1.5rem;
}
.loading {
  opacity: 0.5;
  pointer-events: none;
}
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 3rem;
}
.page-numbers {
  display: flex;
  gap: 0.8rem;
}
.page-btn {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--muted);
  font-size: 0.85rem;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.15s;
}
.page-btn:hover {
  border-color: var(--accent);
  color: var(--text);
}
.page-btn.active {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
  font-weight: 700;
}
.page-btn:disabled,
button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
