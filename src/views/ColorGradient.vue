<template>
  <div class="ColorGradient">
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
export default class ColorGradient extends Vue {
  private mounted() {
    const canvas = new fabric.Canvas("canvas");
    new fabric.Color("#f55");
    console.log('new fabric.Color("#f55")', new fabric.Color("#f55").toRgb());
    new fabric.Color("#123123");
    new fabric.Color("356735");
    new fabric.Color("rgb(100,0,100)");
    new fabric.Color("rgba(10, 20, 30, 0.5)");

    new fabric.Color("#f55").toRgb(); // "rgb(255,85,85)"
    new fabric.Color("rgb(100,100,100)").toHex(); // "646464"
    new fabric.Color("fff").toHex(); // "FFFFFF"

    const redish = new fabric.Color("#f55");
    const greenish = new fabric.Color("#5f5");

    redish.overlayWith(greenish).toHex(); // "AAAA55"
    redish.toGrayscale().toHex(); // "A1A1A1"

    const circle = new fabric.Circle({
      left: 200,
      top: 200,
      radius: 50,
      scaleY: 0.5,
      angle: 40
    });

    // circle.setGradient("fill", {
    //   x1: 0,
    //   y1: 0,
    //   x2: 0,
    //   y2: circle.height,
    //   colorStops: {
    //     0: "#000",
    //     1: "#fff"
    //   }
    // });

    // circle.setGradient("fill", {
    //   x1: 0,
    //   y1: 0,
    //   x2: circle.width,
    //   y2: 0,
    //   colorStops: {
    //     0: "red",
    //     1: "blue"
    //   }
    // });
    circle.animate("angle", 270, {
      duration: 2000,
      onChange: canvas.renderAll.bind(canvas)
    });
    circle.setGradient("fill", {
      x1: 0,
      y1: 0,
      x2: circle.width,
      y2: 0,
      colorStops: {
        0: "red",
        0.2: "orange",
        0.4: "yellow",
        0.6: "green",
        0.8: "blue",
        1: "purple"
      }
    });

    const rect = new fabric.Rect({
      rx: 100,
      ry: 50,
      width: 200,
      height: 100,
      fill: "red"
    });
    const text = new fabric.Text("click get json and render", {
      left: 100, //相对于group的左上角
      top: 50,
      fontSize: 16,
      fill: "yellow",
      originX: "center", //代表坐标系,绘制left，top是以文字中心为原点绘制
      originY: "center"
    });

    const group = new fabric.Group([rect, text], {
      left: 400,
      top: 400,
      hasControls: false,
      hasBorders: false,
      originX: "center", //代表坐标系,以left top为中心绘制，并且旋转动画也是以中心
      originY: "center"
    });
    group.on("mouseup", (res: any) => {
      // console.log("res", JSON.stringify(canvas.toJSON()));//只是保存当前对一帧，不会将整个过程保存下来
      // const json = JSON.stringify(canvas);
      const json = JSON.stringify(canvas.toDatalessJSON()); //如果加载了图片，这个会把path修改成svg，因此json数据少了很多  loadFromDatalessJSON
      console.log("res", json);
      canvas.clear();
      setTimeout(() => {
        canvas.loadFromJSON(json);
      }, 2000);
      // const svg = canvas.toSVG();   loadSVGFromURL   canvas.toDataURL('png')  toObject
    });

    const gradientRect = new fabric.Rect({
      width: 200,
      height: 100,
      left: 50,
      top: 400
    });
    gradientRect.setGradient("fill", {
      x1: 0,
      y1: 0,
      x2: gradientRect.width,
      y2: 0,
      colorStops: {
        0: "red",
        0.2: "orange",
        0.4: "yellow",
        0.6: "green",
        0.8: "blue",
        1: "purple"
      }
    });
    const radialGradient = new fabric.Circle({
      left: 300,
      top: 100,
      radius: 50
    });
    radialGradient.setGradient("fill", {
      type: "radial",
      x1: 50,
      y1: 50,
      x2: 30,
      y2: 30,
      r1: radialGradient.width / 2,
      r2: 20,
      colorStops: {
        0: "red",
        0.5: "blue",
        1: "purple"
      }
    });
    canvas.add(circle, group, gradientRect, radialGradient);
  }
}
</script>

<style scoped lang="scss"></style>
