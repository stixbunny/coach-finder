<template>
  <section>
    <BaseCard>
      <h2>Page not found</h2>
      <p>
        This page could not be found - maybe check out all our
        <RouterLink :to="{ name: 'coaches' }">coaches</RouterLink>.
      </p>
    </BaseCard>
  </section>
</template>
