const base_api = "https://api.oluwasetemi.dev";

/**
 * Fetch a paginated list of posts.
 * @param {number} page  - 1-based page number
 * @param {number} limit - posts per page
 */
export async function fetchPosts(page = 1, limit = 12) {
  const url = `${base_api}/posts?page=${page}&limit=${limit}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to load posts (HTTP ${res.status})`);
  return res.json(); // { data: Post[], meta: PaginationMeta }
}

/**
 * Fetch a single post using its UUID.
 * @param {string} id - UUID
 */
export async function fetchPost(id) {
  const res = await fetch(`${base_api}/posts/${id}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Failed to load post (HTTP ${res.status})`);
  const json = await res.json();
  return json.data ?? json;
}

export function imageUrl(id, width = 800, height = 420) {
  if (!id) return null;
  // I just used a placeholder image because the API was frustrating me, forgive me skskss
  return "https://placehold.co/600x400/1a1d27/a78bfa?text=Fayze+%20+Blog";
}

export function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function parseTags(tags) {
  if (!tags) return [];
  return tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

/**
 * Estimate reading time from content.(This is very much AI generated and i don't have anything to do with this logic *cough* Magic *cough* but i thought it was cool so i added it anyway)...but yeah i'm not taking credit for this
 * All i know is it does some mumbo jumbo cuz the average reading speed is about 200 words per minute, then it divides the no. of words by 200....(i definitely do not read at that speed🤣)
 */

export function readTime(content = "") {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}
