<template>
  <div class="animate-complex">
    <canvas
      id="canvas"
      style="border:1px solid red"
      width="800"
      height="800"
    ></canvas>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { fabric } from "fabric";
let vm: any;
@Component({
  components: {}
})
export default class AnimateComplex extends Vue {
  private imageEle: any;
  private mounted() {
    vm = this;
    const canvas = new fabric.Canvas("canvas");

    const text = new fabric.Text("animate", {
      left: 300,
      top: 80,
      fill: "red",
      angle: 45,
      scaleX: 0.3,
      opacity: 0.1
    });
    text
      .animate("angle", 180, {
        duration: 1000
      })
      .animate("scaleX", 1, {
        duration: 2000
      })
      .animate("opacity", 1, {
        duration: 2000
      });
    fabric.Image.fromURL(require("../assets/timg.jpeg"), (image: any) => {
      image
        .set({
          left: 600,
          top: 100,
          angle: 10,
          opacity: 0.1
        })
        .scale(0.1);

      canvas.add(image, text);

      vm.imageEle = image;
      animate();
    });

    function animate() {
      var isStart = Math.round(vm.imageEle.left) === 50;
      vm.imageEle &&
        vm.imageEle.animate(
          {
            left: isStart ? 600 : 50,
            opacity: isStart ? 0.1 : 1,
            angle: isStart ? 100 : 50,
            scaleX: isStart ? 0.1 : 0.6,
            scaleY: isStart ? 0.1 : 0.6
          },
          {
            duration: 1500,
            // onChange: canvas.requestRenderAllBound,
            onChange: canvas.renderAll.bind(canvas),
            onComplete: animate
          }
        );
    }
  }
}
</script>

<style scoped lang="scss"></style>
