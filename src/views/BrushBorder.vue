<template>
  <div class="BrushBorder">
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
export default class BrushBorders extends Vue {
  private mounted() {
    const canvas = new fabric.Canvas("canvas", {
      selection: false
    });
    fabric.Image.fromURL(
      require("../assets/brush/CityScape.jpg"),
      (image: any) => {
        image.set({
          globalCompositeOperation: "source-over"
        });
        image.scaleToHeight(600, false);
        fabric.Image.fromURL(
          require("../assets/brush/frame.png"),
          (oImage: any) => {
            oImage.scaleToHeight(600, false);
            oImage.scaleToWidth(600, false);
            canvas.add(image, oImage);
            fabric.Image.fromURL(
              require("../assets/brush/paintTexture.png"),
              (oImg: any) => {
                const rect = new fabric.Rect({
                  width: 600,
                  height: 600,
                  fill: "#fff",
                  // selectable: false,
                  globalCompositeOperation: "source-over"
                });
                oImg.set({
                  globalCompositeOperation: "destination-out"
                });

                oImg.scaleToHeight(100, false);
                oImg.scaleToWidth(100, false);
                canvas.add(rect, oImg);
              }
            );
          }
        );
      }
    );
  }
}
</script>

<style scoped lang="scss"></style>
