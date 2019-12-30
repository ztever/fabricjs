<template>
  <div class="draw-image">
    <img
      class="img"
      style="display:none"
      src="http://img4.imgtn.bdimg.com/it/u=2310030772,4023298708&fm=26&gp=0.jpg"
      alt=""
    />
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
export default class DrawImage extends Vue {
  private mounted() {
    this.$nextTick(() => {
      var canvas = new fabric.Canvas("canvas");
      const imgEle = document.querySelector(".img");
      const imgFabric = new fabric.Image(imgEle, {
        top: 5,
        left: 10,
        width: 200, //这种形式必须设置width 与height,width和height如果小于原图大小，原图将会被剪切
        height: 200
      });
      canvas.add(imgFabric); //不知道为什么，如果这里和上面的img标签没注释，下面的zindex不生效,底下如果没有添加image到canvas上面，也绘制不上去，可能是image没load成功
      const img = new Image();
      img.src = require("../assets/logo.png");
      img.src =
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574423019726&di=fdd121a08fdc1bfd40d170066773043e&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201606%2F03%2F20160603150417_wJLrk.jpeg";
      img.style.width = 200 + "px";
      img.style.height = 200 + "px";
      img.onload = () => {
        var imgInstance = new fabric.Image(img, {
          left: 100,
          top: 100,
          angle: 30,
          opacity: 1
        });
        // imgInstance.scale(0.5); //如果需要绘制比原图小的图片，可以通过scale来改变图片大小
        imgInstance.scaleToWidth(300, false); // 设置宽度  scaleToHeight  第二个参数是boolean ignore viewport
        canvas.add(imgInstance);
      };

      fabric.Image.fromURL(require("../assets/timg.jpeg"), (oImg: any) => {
        oImg.set({
          originX: "left",
          originY: "top",
          width: canvas.width
          // height: canvas.height
          // zIndex: 20 //加zIndex 或者bringToFront可以让先绘制的图在上面,但如果像上面一样，先new image ，由于load是异步，导致这两个参数无用
        });
        // canvas.add(oImg).bringToFront(oImg);//向上到顶层，.bringForward() 向上跳一层  sendBackwards() 向下一层sendToBack()最底层
        // canvas.add(oImg);
        canvas.setBackgroundImage(oImg, canvas.renderAll.bind(canvas)); //设置背景
      });
      fabric.Image.fromURL(require("../assets/logo.png"), (oImg: any) => {
        oImg.set({
          left: 50,
          top: 50,
          angle: -15,
          clipTo: (ctx: any) => {
            ctx.arc(0, 0, 50, 0, Math.PI, true);
            //  context.arc(x,y,r,sAngle,eAngle,counterclockwise); x , y圆中心的的xy坐标，r圆的半径，sAngle,开始的角度（0是从三点钟方向开始）， eAngle结束位置 counterclockwise可选，true逆时针
            // ctx.rect(20, 10, 100, 100);
          }
        });
        canvas.add(oImg);
      });
    });
  }
}
</script>

<style scoped lang="scss"></style>
