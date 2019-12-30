<template>
  <div class="LottieAnimate">
    LottieAnimate
    <div class="lottie-container"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import bodymovin from "lottie-web";
@Component({
  components: {}
})
export default class UserInfo extends Vue {
  private mounted() {
    this.$nextTick(() => {
      const lottieContainer: any = document.querySelector(".lottie-container");
      if (lottieContainer && bodymovin) {
        bodymovin.loadAnimation({
          container: lottieContainer,
          renderer: "svg",
          loop: true,
          autoplay: true,
          animationData: require("@/assets/lottie/scanning_face_icon_animation.json")
        });
      }
    });
  }
}
</script>

<style scoped lang="scss"></style>
