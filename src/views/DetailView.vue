<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import ErrorBoundary from "../components/ErrorBoundary.vue";
import { fetchPost, imageUrl, formatDate, parseTags, readTime } from "../api";

const route = useRoute();
const router = useRouter();

const error = ref(null);
const post = ref(null);

const image = computed(() =>
  post.value ? imageUrl(post.value.featuredImage, 1200, 480) : null,
);
const date = computed(() => formatDate(post.value?.publishedAt));
const time = computed(() => readTime(post.value?.content));
const tags = computed(() => parseTags(post.value?.tags));
const paragraphs = computed(() => {
  if (!post.value?.content) return [];
  return post.value.content.split(/\n+/).filter((p) => p.trim().length > 0);
});

async function loadPost() {
  error.value = null;
  post.value = null;
  const data = await fetchPost(route.params.id);
  if (!data) {
    router.replace({ name: "not-found" });
    return;
  }
  post.value = data;
}

try {
  await loadPost();
} catch (e) {
  error.value = e;
}
</script>

<template>
  <div>
    <button class="back-btn" @click="router.back()">← Back</button>

    <ErrorBoundary v-if="error" :error="error" @retry="loadPost" />

    <article v-else-if="post">
      <!-- Hero image -->
      <div v-if="image" class="detail-img-wrap">
        <img :src="image" :alt="post.title" class="detail-img" />
      </div>

      <header class="detail-header">
        <div class="detail-badges">
          <span v-if="post.category" class="post-badge">{{
            post.category
          }}</span>
          <span v-if="post.status === 'DRAFT'" class="status-badge draft"
            >Draft</span
          >
          <span v-else class="status-badge published">Published</span>
        </div>

        <h1>{{ post.title }}</h1>

        <div class="detail-meta">
          <span v-if="date">📅 {{ date }}</span>
          <span>⏱ {{ time }} min read</span>
          <span v-if="post.viewCount > 0"
            >👁 {{ post.viewCount.toLocaleString() }} views</span
          >
          <span v-if="post.author">✍️ {{ post.author }}</span>
        </div>

        <p v-if="post.excerpt" class="detail-excerpt">{{ post.excerpt }}</p>
      </header>

      <!-- Tags -->
      <div v-if="tags.length" class="detail-tags">
        <span v-for="tag in tags" :key="tag" class="tag">#{{ tag }}</span>
      </div>

      <!-- Content -->
      <div class="detail-body">
        <p v-for="(para, i) in paragraphs" :key="i">{{ para }}</p>
      </div>

      <hr class="divider" />

      <div class="detail-actions">
        <RouterLink :to="{ name: 'home' }" class="btn btn-primary"
          >← All Posts</RouterLink
        >
        <button class="btn btn-ghost" @click="router.back()">Go Back</button>
      </div>
    </article>
  </div>
</template>

<style scoped>
.back-btn {
  background: none;
  border: none;
  color: var(--muted);
  font-size: 0.875rem;
  cursor: pointer;
  margin-bottom: 2rem;
  padding: 0;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  transition: color 0.2s;
  font-family: inherit;
}
.back-btn:hover {
  color: var(--text);
}

.detail-img-wrap {
  border-radius: var(--radius);
  overflow: hidden;
  margin-bottom: 2rem;
  aspect-ratio: 21/9;
  background: var(--surface2);
}
.detail-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.detail-header {
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.detail-badges {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.detail-header h1 {
  font-size: clamp(1.6rem, 4vw, 2.5rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.2;
}
.detail-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  color: var(--muted);
  font-size: 0.875rem;
}
.detail-excerpt {
  color: var(--muted);
  font-size: 1.05rem;
  line-height: 1.7;
  border-left: 3px solid var(--accent);
  padding-left: 1rem;
  font-style: italic;
}

.status-badge {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  border-radius: 100px;
  padding: 3px 10px;
}
.status-badge.published {
  background: rgba(52, 211, 153, 0.12);
  color: #34d399;
}
.status-badge.draft {
  background: rgba(248, 113, 113, 0.12);
  color: var(--danger);
}

.detail-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.detail-body {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 2rem;
  font-size: 1rem;
  line-height: 1.85;
  color: var(--text);
}
.detail-body p {
  margin-bottom: 1.25rem;
}
.detail-body p:last-child {
  margin-bottom: 0;
}

.divider {
  border: none;
  border-top: 1px solid var(--border);
  margin: 2rem 0;
}
.detail-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}
</style>
