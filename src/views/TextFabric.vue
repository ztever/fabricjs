<template>
  <div class="text">
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
let vm: any;
@Component
export default class TextFabric extends Vue {
  private textTest: any;
  // private canvas:any
  // public changeTextTestFont(val: number) {
  //   if (this.textTest) {
  //     this.textTest.set({
  //       fontSize: val
  //     });
  //   }
  // }
  //  text 都有相同的监听方法，Textbox 可以设置宽度，text 与IText看起来是相同的
  private mounted() {
    vm = this;
    const canvas = new fabric.Canvas("canvas", {
      // skipTargetFind: true//不检测选中目标
    });
    const itext = new fabric.IText("This is a IText object text is long", {
      left: 20, //x轴距离
      top: 50, //y轴距离
      fill: "#D81B60", //填充的颜色
      strokeWidth: 2, //文字边框的宽度
      stroke: "#880E4F", //文字边框的颜色
      fontSize: 40, //文字大小 对应css属性，驼峰命名
      fontStyle: "italic",
      backgroundColor: "pink", //背景色
      linethrough: true, //text-decoration:line-througth;
      opacity: 0.8,
      width: 400, //这个属性不生效，在Textbox生效,
      lockMovementX: true, //锁定X轴的移动 lockMovementY	lockRotation  lockScalingX    lockScalingY,
      hasBorders: true,
      hasControls: false,
      hasRotatingPoint: false, //是否有旋转按钮
      strokeDashArray: [5, 3]
    });
    // 文字添加到了canvas上
    itext.on("added", (res: any) => {
      console.log("itext added", itext);
      // 返回的对象中 left,top 表示文字区域左上角的位置 width height,表示文字区域的宽高
    });
    // 文本发生了变化
    itext.on("changed", (res: any) => {
      console.log("itext changed", itext);
      // 返回的对象中 text为改变后的文本内容
    });
    // 文本区域被缩放
    itext.on("scaled", (res: any) => {
      console.log("itext scaled", itext);
      // 返回的对象中 scaleX scaleY表示X轴Y轴缩放比率
    });
    // 文本区域被缩放
    itext.on("rotated", (res: any) => {
      console.log("itext rotated", itext);
      // 返回的对象中 left,top 表示文字区域左上角的位置 ,angle表示文字区域的宽高
    });
    // 文字区域被移动 咩有translate
    itext.on("moved", (res: any) => {
      console.log("itext moved", itext);
      // 返回的对象中 left,top 表示移动后文字区域左上角的位置
    });
    // 也可以通过下面的方法一起监听多个事件
    // itext.on({
    //   moved: (e: any) => {
    //     console.log(" on moved", e);
    //  可以通过target获取需要的属性
    //   },
    //   rotated: (e: any) => {
    //     console.log(" rotated e", e);
    //   }
    // });
    // 正在移动中，还有rotaing，scaling····
    itext.on("moving", (res: any) => {
      console.log("itext moving", res);
    });
    //对象被选中
    itext.on("selected", (res: any) => {
      console.log("itext selected", res);
    });
    canvas.add(itext);

    var textbox = new fabric.Textbox("This is a textbox object", {
      left: 120,
      top: 150,
      width: 300,
      height: 300,
      // lineHeight: 20,
      padding: 20, //padding部分不会有背景色
      textAlign: "right", //设置了宽度，textalign才生效
      backgroundColor: "#cccc",
      fill: "#880E4F",
      underline: true,
      fontWeight: "bold",
      borderColor: "blue"
    });

    canvas.add(textbox).setActiveObject(textbox);
    vm.textTest = new fabric.Text("This is a text", {
      left: 80,
      top: 350,
      fill: "blue",
      angle: 40,
      // shadow: "rgba(0,0,0,0.3) 5px 5px 5px",
      shadow: "green -5px -5px 3px",
      overline: true,
      cornerColor: "red",
      cornerSize: 3
    });
    // 设置选中的对象,
    canvas.add(vm.textTest).setActiveObject(vm.textTest);
    // 获取选中的对象，并且设置填充颜色，选中的对象只能有一个，最后被设置的对象
    canvas.getActiveObject().set("fill", "red");
    canvas.getActiveObject().center(); //全部居中
    // canvas.getActiveObject().centerH(); //水平居中
    // canvas.getActiveObject().centerV(); //垂直居中
    canvas.getActiveObject().setCoords(); //注：必须设coords（坐标）以上设置才会有效。

    const patternText = new fabric.Text("pattern", {
      fontSize: 100,
      left: 150,
      top: 450,
      fontWeight: "bold",
      statefullCache: true
    });
    canvas.add(patternText);
    fabric.util.loadImage(require("../assets/timg.jpeg"), (img: any) => {
      //可以将这个封装成一个方法
      patternText.set(
        "fill",
        new fabric.Pattern({
          source: img,
          offsetX: 250, //图片偏移量
          offsetY: 300,
          repeat: "repeat",
          crossOrigin: "anonymous"
        })
      );
      canvas.renderAll();
    });
    fabric.util.loadImage(
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574423019726&di=fdd121a08fdc1bfd40d170066773043e&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201606%2F03%2F20160603150417_wJLrk.jpeg",
      (img: any) => {
        const pattern = new fabric.Pattern({
          source: img,
          repeat: "repeat" // no-repeat repear-x repeat-y
        });
        const textPattern = new fabric.Text("Patterns Text", {
          fontSize: 250,
          left: 300,
          top: 400,
          fill: pattern,
          originX: "center",
          originY: "center",
          scaleX: 0.4, //图片太大，用了缩放
          scaleY: 0.4
        });
        canvas.add(textPattern);
      }
    );
  }
}
</script>

<style scoped lang="scss"></style>
