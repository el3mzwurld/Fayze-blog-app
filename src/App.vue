<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppNav from './components/AppNav.vue'
import ErrorBoundary from './components/ErrorBoundary.vue'
import SkeletonGrid from './components/SkeletonGrid.vue'

const route = useRoute()
// Key forces Suspense to re-run when the route changes
const routeKey = ref(route.fullPath)
watch(() => route.fullPath, (val) => (routeKey.value = val))

const globalError = ref(null)
function handleError(err) {
  globalError.value = err
}
function retry() {
  globalError.value = null
}
</script>

<template>
  <AppNav />

  <main class="page">
    <ErrorBoundary v-if="globalError" :error="globalError" @retry="retry" />

    <Suspense v-else @resolve="globalError = null" @pending="() => {}" @fallback="() => {}">
      <template #default>
        <RouterView v-slot="{ Component }">
          <Transition name="fade" mode="out-in">
            <component
              :is="Component"
              :key="routeKey"
              @error="handleError"
            />
          </Transition>
        </RouterView>
      </template>

      <!-- Shown while any lazy-loaded view or async setup is pending -->
      <template #fallback>
        <SkeletonGrid />
      </template>
    </Suspense>
  </main>
</template>

<style scoped>
.page {
  max-width: 960px;
  margin: 0 auto;
  padding: 3rem 1.5rem 6rem;
}
</style>
