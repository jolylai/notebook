<template>
  <figure>
    <img src="https://picsum.photos/300" />
    <figcaption>
      The great Sir Adam Catlace was named after Countess Ada Lovelace, the
      first programmer.
    </figcaption>
  </figure>
</template>

<style scoped>
figure {
  max-width: 300px;
  max-width: min-content;
  margin: auto;
}

figure > img {
  max-width: inherit;
}
</style>
