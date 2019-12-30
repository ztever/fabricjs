<template>
  <div class="brush">
    <canvas
      id="canvas"
      style="border:1px solid red"
      width="600"
      height="600"
    ></canvas>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { fabric } from "fabric";
@Component({
  components: {}
})
export default class Brush extends Vue {
  private mounted() {
    // Original canvas
    const canvas = new fabric.Canvas("canvas");

    canvas.isDrawingMode = true;

    const img = new Image();
    img.src = require("../assets/timg.jpeg");
    img.onload = function() {
      var texturePatternBrush = new fabric.PatternBrush(canvas);
      texturePatternBrush.source = img;
      // texturePatternBrush.shadow = "10px 10px rgba(255, 255, 255, 0.5)";
      texturePatternBrush.width = 50;
      texturePatternBrush.height = 50;
      canvas.freeDrawingBrush = texturePatternBrush;
    };
  }
}
</script>

<style scoped lang="scss"></style>
