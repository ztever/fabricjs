<template>
  <div class="ractfabric">
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
export default class RactFabric extends Vue {
  private mounted() {
    // 使用了staticcanvas，将不能拖动，移动canvas的内容
    // const canvas = new fabric.StaticCanvas("canvas");
    const vm = this;
    const canvas = new fabric.Canvas("canvas");
    // 画圆
    var circle = new fabric.Circle({
      radius: 30,
      fill: "green",
      strokeWidth: 2,
      stroke: "red",
      left: 100,
      top: 100
    });
    // canvas 的边框是在圆的边上往圆内与园外各添加一半，比如下面的🌰，由于有重合的2.5px，导致中间颜色是结合的颜色,可以参考group下面的🌰看的更清楚
    circle.set({ strokeWidth: 5, stroke: "rgba(10,20,20,0.5)" });
    var triangle = new fabric.Triangle({
      width: 20,
      height: 30,
      fill: "blue",
      left: 50,
      top: 50
    });
    // 画椭圆
    var ellipse = new fabric.Ellipse({
      rx: 95,
      ry: 60,
      fill: "yellow",
      stroke: "red",
      strokeWidth: 3,
      left: 200,
      top: 100
    });
    //  画线  起始点x y 终点 x y
    var line = new fabric.Line([500, 10, 400, 100], {
      stroke: "yellow",
      strokeWidth: 5
    });
    line.on("moved", (res: any) => {
      console.log("line moved", res);
    });
    // 矩形
    var rect = new fabric.Rect({
      left: 200,
      top: 70,
      fill: "red",
      width: 30,
      height: 30
    });
    // 多边形
    var Polygon = new fabric.Polygon(
      [
        { x: 200, y: 0 },
        { x: 350, y: 50 },
        { x: 250, y: 100 },
        { x: 150, y: 100 },
        { x: 150, y: 50 }
      ],
      {
        left: 50,
        top: 250,
        angle: 0,
        fill: "green",
        strokeLineJoin: "round",
        strokeWidth: 10,
        stroke: "green"
      }
    );
    //多线条
    var Polyline = new fabric.Polyline(
      [
        { x: 200, y: 0 },
        { x: 250, y: 50 },
        { x: 250, y: 100 },
        { x: 150, y: 100 }
      ],
      {
        left: 250,
        top: 250,
        angle: 0,
        fill: "white", //如果有颜色，会填充
        strokeLineJoin: "round",
        strokeWidth: 6,
        stroke: "purple",
        strokeLineCap: "round"
      }
    );
    //  虚线
    var dashline = new fabric.Line([300, 60, 400, 200], {
      fill: "green",
      stroke: "green",
      strokeDashArray: [4, 3] // 第一个是调节线的长短，第二个是间距
    });

    // 通过路径画形状
    var path = new fabric.Path("M 0 0 L 200 50 L 150 150 v 38 90 z"); // path的意义与svg path 相同 m  = moveto l = lineto z =closepath
    path.set({ left: 230, top: 420, fill: "red" });
    var pathline = new fabric.Path(
      "M 153 334 C153 334 151 334 151 334 C151 339 153 344 156 344 C164 344 171 339 171 334 C171 322 164 314 156 314  C142 314 131 322 131 334 C131 350 142 364 156 364 C175 364 191 350 191 334 C191 311 175 294 156 294 C131 294 111 311 111 334"
    );
    pathline.set({
      left: 30,
      top: 150,
      fill: "white",
      strokeWidth: 4,
      stroke: "pink"
    });
    // const arrow = new fabric.Path(
    //   "M 0 0 L 100 50 M 92 31.6 L 100 50 L 80.5 54.6",
    //   {
    //     left: 400,
    //     top: 300,
    //     strokeWidth: 5,
    //     stroke: "orange",
    //     fill: "#fff"
    //   }
    // );

    const arrowLine1 = new fabric.Path("M 0 0 L 100 50", {
      strokeWidth: 5,
      stroke: "orange",
      fill: "#fff"
    });
    const arrowLine2 = new fabric.Path("M 92 31.6 L 100 50 L 80.5 54.6", {
      strokeWidth: 5,
      stroke: "orange",
      fill: "rgba(255,255,255,0)"
    });
    const arrow = new fabric.Group([arrowLine1, arrowLine2], {
      left: 400,
      top: 300
    });

    const arrow2 = new fabric.Path(vm.drawArrow(0, 0, 100, 50), {
      left: 400,
      top: 350,
      strokeWidth: 5,
      stroke: "blue",
      fill: "#fff"
    });

    // add 里的顺序，也是绘制的顺序，后绘制的内容会覆盖先绘制的内容，绘图里有写设置绘制层级
    canvas.add(
      circle,
      triangle,
      ellipse,
      line,
      rect,
      Polygon,
      Polyline,
      dashline,
      path,
      pathline,
      arrow,
      arrow2
    );
    // 移动端没有mouse事件 over up
    canvas.on("mouse:down", (e: any) => {
      console.log("mouse:down", e);
      if (e.target) {
        e.target.set("fill", "red");
        canvas.renderAll();
      }
    });
    canvas.on("mouse:out", (e: any) => {
      if (e.target) {
        e.target.set("fill", "yellow");
        canvas.renderAll();
      }
    });
    //给对象添加事件，不能要:
    circle.on("mouseup", (e: any) => {
      console.log("circle click");
    });
    console.log("canvas", canvas);
    // 被选中
    canvas.on("object:selected", (e: any) => {
      console.log("selected e", e);
      if (e.target) {
        e.target.set("fill", "red");
        canvas.renderAll();
      }
    });

    // getcontext getSelectionContext()
    // const ctx = canvas.getContext();
    const ctx = canvas.getSelectionContext(); //获取的是uppercanvas 绘制的内容也是在uppercanvas上面
    console.log("ctx", ctx);
    ctx.beginPath();
    ctx.arc(50, 550, 30, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.stroke();
  }

  //绘制箭头方法
  private drawArrow(
    fromX: number,
    fromY: number,
    toX: number,
    toY: number,
    theta = 40, //角度
    headlen = 30 //线的长度
  ) {
    // 计算各角度和对应的P2,P3坐标
    let angle = (Math.atan2(fromY - toY, fromX - toX) * 180) / Math.PI,
      angle1 = ((angle + theta) * Math.PI) / 180,
      angle2 = ((angle - theta) * Math.PI) / 180,
      topX = headlen * Math.cos(angle1),
      topY = headlen * Math.sin(angle1),
      botX = headlen * Math.cos(angle2),
      botY = headlen * Math.sin(angle2);
    let arrowX = fromX - topX,
      arrowY = fromY - topY;
    let path = " M " + fromX + " " + fromY;
    path += " L " + toX + " " + toY;
    arrowX = toX + topX;
    arrowY = toY + topY;
    path += " M " + arrowX + " " + arrowY;
    path += " L " + toX + " " + toY;
    arrowX = toX + botX;
    arrowY = toY + botY;
    path += " L " + arrowX + " " + arrowY;
    return path;
  }
}
</script>

<style scoped lang="scss"></style>
