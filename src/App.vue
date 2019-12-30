<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import { fabric } from "fabric";
@Component
export default class App extends Vue {
  // private mounted() {
  //   const canvas = new fabric.Canvas("canvas");
  //   const rect = new fabric.Rect({
  //     left: 100, //距离画布左侧的距离，单位是像素
  //     top: 100, //距离画布上边的距离
  //     fill: "red", //填充的颜色
  //     width: 30, //方形的宽度
  //     height: 30 //方形的高度
  //   });
  //   console.log("rect", rect);
  //   rect.on("render", (res: any) => {
  //     console.log("render res", res);
  //   });
  //   rect.on("rotating", (res: any) => {
  //     console.log("rotating res", res);
  //   });
  //   rect.on("selected", (res: any) => {
  //     console.log("rotating res", res);
  //   });
  //   rect.on("added", (res: any) => {
  //     console.log("added res", res);
  //   });
  //   rect.on("removed", (res: any) => {
  //     console.log("removed res", res);
  //   });
  //   rect.on("moving", (res: any) => {
  //     console.log("moving res", res);
  //   });
  //   rect.on("down", (res: any) => {
  //     console.log("down res", res);
  //   });
  //   rect.on("moved", (res: any) => {
  //     console.log("moved res", res);
  //   });
  //   rect.on("up", (res: any) => {
  //     console.log("up res", res);
  //   });
  //   rect.on("scaling", (res: any) => {
  //     console.log("scaling res", res);
  //   });
  //   rect.on("scaled", (res: any) => {
  //     console.log("scaled res", res);
  //     console.log("rect", rect);
  //   });
  //   rect.on("translating", (res: any) => {
  //     console.log("translating res", res);
  //   });
  //   const rect2 = new fabric.Rect({
  //     left: 200,
  //     top: 50,
  //     fill: "#D81B60",
  //     width: 50,
  //     height: 50,
  //     strokeWidth: 2,
  //     stroke: "#880E4F",
  //     rx: 10,
  //     ry: 10,
  //     angle: 45,
  //     scaleX: 3,
  //     scaleY: 3,
  //     hasControls: true
  //   });
  //   var circle1 = new fabric.Circle({
  //     radius: 65,
  //     fill: "#039BE5",
  //     left: 0,
  //     stroke: "red",
  //     strokeWidth: 3
  //   });
  //   var itext = new fabric.IText("This is a IText object", {
  //     left: 20,
  //     top: 150,
  //     fill: "#D81B60",
  //     strokeWidth: 2,
  //     stroke: "#880E4F"
  //   });
  //   itext.on("added", (res: any) => {
  //     console.log("itext added itext", itext);
  //     console.log("itext added res", res);
  //   });
  //   itext.on("added", (res: any) => {
  //     console.log("itext added itext", itext);
  //     console.log("itext added res", res);
  //   });
  //   itext.on("changed", (res: any) => {
  //     console.log("itext editing itext", itext);
  //     console.log("itext editing res", res);
  //   });
  //   canvas.add(rect);
  //   canvas.add(rect2);
  //   canvas.add(circle1);
  //   canvas.add(itext);
  // }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
  line-height: 30px;
  font-size: 20px;
  margin: 10px;
  padding-left: 30px;
}
</style>
