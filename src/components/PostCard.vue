<script setup>
import { computed } from "vue";
import { imageUrl, formatDate, parseTags, readTime } from "../api";
import img from "../assets/dummy.png";
const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});
const image = computed(() => imageUrl(props.post.featuredImage, 600, 340));
const date = computed(() => formatDate(props.post.publishedAt));
const time = computed(() => readTime(props.post.content));
const tags = computed(() => parseTags(props.post.tags).slice(0, 2));
const title = computed(() => {
  const t = props.post.title ?? "Untitled";
  return t.charAt(0).toUpperCase() + t.slice(1);
});
const summary = computed(() => {
  const e = props.post.excerpt ?? props.post.content ?? "";
  const cleanTxt = e.replace(/\n/g, " ");
  return cleanTxt.length > 120 ? cleanTxt.slice(0, 120) + "…" : cleanTxt;
});
</script>

<template>
  <RouterLink :to="{ name: 'post', params: { id: post.id } }" class="card">
    <div v-if="image" class="card-img-wrap">
      <img :src="image" :alt="title" class="card-img" loading="lazy" />
      <span v-if="post.category" class="card-cat">{{ post.category }}</span>
    </div>
    <span
      v-else-if="post.category"
      class="post-badge"
      style="margin: 1.25rem 1.25rem 0"
    >
      {{ post.category }}
    </span>

    <div class="card-body">
      <h2 class="card-title">{{ title }}</h2>
      <p class="card-excerpt">{{ summary }}</p>
      <div v-if="tags.length" class="card-tags">
        <span v-for="tag in tags" :key="tag" class="tag">#{{ tag }}</span>
      </div>
      <div class="card-footer">
        <div class="card-meta">
          <span v-if="date">{{ date }}</span>
          <span v-if="date" class="dot" />
          <span>{{ time }}min</span>
          <template v-if="post.viewCount > 0">
            <span class="dot" />
            <span>{{ post.viewCount.toLocaleString() }} views</span>
          </template>
        </div>
        <span class="read-link">Read →</span>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  overflow: hidden;
  border-radius: var(--radius);
  font-family: "dm mono", monospace;
  transition:
    transform 0.2s,
    border-color 0.2s,
    box-shadow 0.2s;
}
.card:hover {
  transform: translateY(-4px);
  border-color: var(--accent);
  box-shadow: 0 8px 32px rgba(108, 139, 239, 0.15);
  border-radius: 0px;
}
.card-img-wrap {
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
  background: var(--surface2);
}
.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.35s ease;
}
.card:hover .card-img {
  transform: scale(1.04);
}
.card-cat {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  background: rgba(108, 139, 239, 0.85);
  backdrop-filter: blur(4px);
  color: #fff;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 3px 10px;
}
.card-body {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  flex: 1;
}
.card-title {
  font-size: 0.85rem;
  font-weight: 700;
  line-height: 1.4;
  color: var(--text);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.card-excerpt {
  color: var(--muted);
  font-size: 0.8rem;
  line-height: 1.6;
  flex: 1;
}
.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.25rem;
}
.card-meta {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--muted);
  font-size: 0.6rem;
}
.dot {
  width: 3px;
  height: 3px;
  background: var(--muted);
  border-radius: 50%;
  display: inline-block;
}
.read-link {
  color: var(--accent);
  font-size: 0.8rem;
  font-weight: 600;
  white-space: nowrap;
}
.card:hover .read-link {
  text-decoration: underline;
}
</style>
