<template>
  <div class="loader-container">

    <p>
      <slot>
        Loading
      </slot>
      <span class="loader-dots">{{ dots }}</span>
    </p>

  </div>

</template>

<script>
export default {
  data() {
    return {
      dots: ".",
    }
  },
  created: function () {
    setInterval(() => {
      this.dots += ".";
      if(this.dots === "....") {
        this.dots = "";
      }
    }, 500)
  }
}
</script>

<style scoped>
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
}

.loader-logo {
  width: 20%;
}

.loader-dots {
  width: 30px;
  margin-left: 2px;
  display: inline-block;
}
</style>