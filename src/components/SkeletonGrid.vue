<template>
  <div>
    <div class="hero-skeleton">
      <div class="skeleton" style="height:12px;width:80px;border-radius:100px;margin-bottom:10px" />
      <div class="skeleton" style="height:44px;width:300px;border-radius:10px;margin-bottom:10px" />
      <div class="skeleton" style="height:14px;width:380px;border-radius:6px" />
    </div>
    <div class="skeleton" style="height:12px;width:160px;border-radius:6px;margin-bottom:1.5rem" />
    <div class="grid">
      <div v-for="n in 12" :key="n" class="skel-card">
        <div class="skeleton skel-img" />
        <div class="skel-body">
          <div class="skeleton skel-title" />
          <div class="skeleton skel-line" style="width:100%" />
          <div class="skeleton skel-line" style="width:80%" />
          <div class="skeleton skel-meta" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-skeleton { text-align:center; margin-bottom:2.5rem; display:flex; flex-direction:column; align-items:center; }
.grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(270px,1fr)); gap:1.5rem; }
.skel-card {
  background:var(--surface); border:1px solid var(--border); border-radius:var(--radius); overflow:hidden;
  display:flex; flex-direction:column;
}
.skel-img  { height:160px; border-radius:0; }
.skel-body { padding:1.25rem; display:flex; flex-direction:column; gap:0.75rem; }
.skel-title { height:18px; width:85%; }
.skel-line  { height:12px; }
.skel-meta  { height:10px; width:55%; }
</style>
