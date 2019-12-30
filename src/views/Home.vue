<template>
  <div class="home">
    <router-view></router-view>
    <div class="router-box">
      <router-link ref="TextFabric" to="TextFabric" tag="li">文字</router-link>
      <router-link to="RactFabric" tag="li"
        >矩形 圆 三角形 线条 椭圆 多边形 路径</router-link
      >
      <router-link to="DrawImage" tag="li">draw image </router-link>
      <router-link to="ImageFilter" tag="li">image filter</router-link>
      <router-link to="AnimateTest" tag="li">动画基础</router-link>
      <router-link to="AnimateComplex" tag="li">动画示例</router-link>
      <router-link to="GroupTest" tag="li">组合使用Group</router-link>
      <router-link to="ColorGradient" tag="li"
        >Color Gradient toObject toJson</router-link
      >
      <router-link to="CreateClass" tag="li">CreateClass</router-link>
      <router-link to="Freedrawing" tag="li">Freedrawing</router-link>
      <router-link to="brush" tag="li">brush</router-link>
      <router-link to="GlobalCompositeOperation" tag="li"
        >GlobalCompositeOperation</router-link
      >
      <router-link to="BrushBorder" tag="li">BrushBorder.</router-link>
      <router-link to="BannerCaptionSlideshow" tag="li"
        >BannerCaptionSlideshow</router-link
      >
      <router-link to="LottieAnimate" tag="li">LottieAnimate</router-link>
    </div>
    <!-- <div @click="changeFont">修改字体</div> -->
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Home extends Vue {
  // private changeFont() {
  //   console.log("this.$refs.TextFabric", this.$refs.TextFabric);
  //   (this.$refs.TextFabric as any).changeTextTestFont(10);
  // }
}
</script>

<style lang="scss">
.router-box {
  font-size: 0;
  li {
    padding: 5px 10px;
    margin: 0;
    display: inline-block;
    font-size: 14px;
  }
}
</style>
