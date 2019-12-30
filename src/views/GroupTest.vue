<template>
  <div class="group-test">
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
export default class GroupTest extends Vue {
  private mounted() {
    const canvas = new fabric.Canvas("canvas");
    const rect = new fabric.Rect({
      rx: 100,
      ry: 50,
      width: 200,
      height: 100,
      fill: "red"
    });
    const text = new fabric.Text("group", {
      left: 100, //相对于group的左上角
      top: 50,
      fill: "yellow",
      angle: 10,
      originX: "center", //代表坐标系,绘制left，top是以文字中心为原点绘制
      originY: "center"
    });
    const line = new fabric.Line([0, 10, 200, 100], {
      stroke: "green",
      strokeWidth: 5,
      textAlign: "right"
    });
    const group = new fabric.Group([rect, text, line], {
      left: 300,
      top: 300,
      // angle: 30,
      originX: "center", //代表坐标系,以left top为中心绘制，并且旋转动画也是以中心
      originY: "center"
    });
    group.add(
      new fabric.Rect({
        width: 50,
        height: 50,
        fill: "green"
      })
    );

    group.animate("angle", 180, {
      duration: 2000,
      onChange: canvas.renderAll.bind(canvas)
    });
    canvas.add(group);
    group.addWithUpdate(
      //往group里增加内容，重新设置group的参数
      new fabric.Text("group text", {
        left: group.get("left") + 100, //相对于canvas的左上角
        top: 400,
        // adjustPosition: "center", //
        fill: "red",
        // angle: 10,
        originX: "center",
        originY: "center"
      })
    );

    const text2 = new fabric.Text("group", {
      left: 100,
      top: 20,
      fill: "red"
    });
    canvas.add(text2);

    var texts = new fabric.Text("hello world", {
      fontSize: 30,
      left: 100,
      top: 50,
      originX: "center",
      originY: "center"
    });
    var circle = new fabric.Circle({
      radius: 100, //半径
      fill: "#eef",
      scaleY: 0.5
    });
    var group2 = new fabric.Group([circle, texts], {
      left: 150,
      top: 100,
      angle: -10
      // originX: "center",
      // originY: "center"
    });

    setTimeout(() => {
      group2.item(0).set("fill", "red");
      group2.item(1).set({
        text: "trololo",
        fill: "white"
      });
      canvas.renderAll();
    }, 2000);
    canvas.add(group2);

    const rect1 = new fabric.Rect({
      width: 100,
      height: 50,
      fill: "red",
      angle: 10
    });
    const rect2 = new fabric.Rect({
      width: 100,
      height: 50,
      left: -20,
      fill: "blue"
    });
    const rect3 = new fabric.Rect({
      width: 100,
      height: 50,
      left: 10,
      fill: "orange"
    });
    const rectGroup = new fabric.Group([rect1, rect2, rect3], {
      left: 10,
      top: 200,
      width: 100,
      height: 50
      // visible: false
    });
    canvas.add(rectGroup);

    const circleRing = new fabric.Circle({
      radius: 100, //半径
      fill: "pink",
      stroke: "blue", //可以通过注释stroke strokewidth可以看出，circle的边框是以圆的外边，往内外各延伸一半
      strokeWidth: 20,
      left: "50%",
      top: "50%",
      translateX: "-50%",
      translateY: "-50%"
    });
    const recBox = new fabric.Rect({
      width: 200,
      height: 200,
      fill: "transparent",
      stroke: "red",
      strokeWidth: 1
    });
    const groupCirlce = new fabric.Group([circleRing, recBox], {
      left: 150,
      top: 400,
      originX: "center",
      originY: "center"
    });
    canvas.add(groupCirlce);
  }
}
</script>

<style scoped lang="scss"></style>
