<template>
  <div class="Freedrawing">
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
export default class Freedrawing extends Vue {
  private mounted() {
    const isDrawingMode = false;
    const canvas = new fabric.Canvas("canvas", {
      isDrawingMode: isDrawingMode, //这个为true，能直接画图
      skipTargetFind: true,
      selectable: false,
      selection: false
    });
    canvas.freeDrawingBrush.color = "red";
    canvas.freeDrawingBrush.width = 2;
    canvas.freeDrawingBrush.shadow = new fabric.Shadow({
      blur: 1,
      offsetX: 1,
      offsetY: 0,
      affectStroke: true,
      color: "blue"
    });
    let path = "";
    let count = 0;

    //绑定画板事件
    canvas.on("mouse:down", (res: any) => {
      const { x, y } = res.pointer;
      path = `M ${x} ${y}`;
    });
    canvas.on("mouse:up", (res: any) => {});
    canvas.on("mouse:move", (res: any) => {
      //可以在move的时候获取坐标，然后画图
      const { x, y } = res.pointer;
      path += `L ${x} ${y}`;
      count++;
      // const isDrawingMode = canvas.get("isDrawingMode");
      // 减少绘制频率
      if (count % 5 != 0 || isDrawingMode) {
        return;
      }
      const line = new fabric.Path(path, {
        fill: "transparent",
        stroke: "blue",
        strokeWidth: 5
      });
      canvas.add(line);
    });
  }
}
</script>

<style scoped lang="scss"></style>
