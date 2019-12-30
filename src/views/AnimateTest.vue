<template>
  <div class="animate">
    <canvas
      id="canvas"
      style="border:1px solid red"
      width="100"
      height="100"
    ></canvas>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { fabric } from "fabric";
@Component({
  components: {}
})
export default class AnimateTest extends Vue {
  private mounted() {
    const canvas = new fabric.Canvas("canvas", {
      width: 600,
      height: 600
    });
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      width: 30,
      height: 30,
      opacity: 0.5,
      fill: "red"
    });
    rect.animate("left", 450, {
      onChange: canvas.renderAll.bind(canvas),
      duration: 3000,
      // Cubic 三次方程  Quad二次方程 quartic四次方程  Elastic弹性运动 Circular 圆 Bounce反弹  sinusoidal正弦  Exponential越来越快
      //参考fabric.js ease，很多可供选择 easeOutExpo先快后慢  easeInOutExpo 初始很慢，再加速运动   easeInCubic先慢后快(运动非线性)   easeOutCubic先加速后减速   easeInElastic在起点回弹几次(回弹会超出起始位置)快速到结束位置  easeOutElastic在终点位置回弹几次
      //easeInBack 移动小段距离回到起始位置，然后再运动到终点 easeInBounce 在起始位置来回运动几次，再运动到终点 easeInCirc 先慢后快，不是线性运动 easeInOutBack() 先往反方向运动再运动超过终点位置，再返回终点
      // easeInOutQuad 二次方程移动，
      easing: fabric.util.ease.easeOutExpo,
      onComplete: (res: any) => {
        // 对应的动画结束，这里就是就是3s后，res是left的最终值
        console.log("res", res);
      }
    });
    // .animate("opacity", 1, {
    //   duration: 1000
    // })
    // .animate("top", 300, {
    //   duration: 2000
    // });

    const circle = new fabric.Circle({
      radius: 30,
      left: 500,
      top: 300,
      fill: "blue",
      opacity: 1
    });
    circle.animate(
      { left: 100, opacity: 0.6 },
      {
        duration: 1000
      }
    );
    const rect2 = new fabric.Text("text", {
      left: 300,
      top: 50,
      fill: "red",
      angle: 45
    });
    // rect2.animate("angle", 90, {
    //   duration: 1000,
    //   onChange: canvas.renderAll.bind(canvas)
    // }); //这种动画是从0 转动45度
    rect2.animate("angle", "+=45", {
      duration: 1000
      // onChange: canvas.renderAll.bind(canvas)
    });
    canvas.add(rect, circle, rect2);
  }
}
</script>

<style scoped lang="scss"></style>
