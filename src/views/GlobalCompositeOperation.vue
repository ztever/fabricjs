<template>
  <div class="globalCompositeOperation">
    <canvas
      id="canvas"
      style="border:1px solid red"
      :width="templateWidth"
      :height="templateWidth"
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
export default class GlobalCompositeOperation extends Vue {
  private templateWidth = 414;
  private templateHeight = 414;
  private mounted() {
    vm = this;
    const canvas = new fabric.Canvas("canvas", {
      selection: false
    });
    fabric.Image.fromURL(
      require("../assets/brush/CityScape.jpg"),
      (oImg: any) => {
        oImg.set({
          selectable: false,
          hasControls: false
        });
        // canvas.add(oImg);//此处先不要添加，避免先显示了原图，等所有等图都加载完毕后，在绘制，也可以封装个方法，先加载所有的图
        fabric.Image.fromURL(
          require("../assets/brush/frame.png"),
          (frameImg: any) => {
            frameImg.set({
              selectable: false,
              hasControls: false
            });
            frameImg.scaleToHeight(vm.templateWidth, false);
            frameImg.scaleToWidth(vm.templateHeight, false);

            //可以创建一个虚拟canvas，也可以用group
            const maskRect = new fabric.Rect({
              width: vm.templateWidth,
              height: vm.templateHeight,
              fill: "#fff"
            });
            const maskGroup = new fabric.Group([maskRect], {
              left: 0,
              top: 0,
              selectable: false,
              hasControls: false
            });
            canvas.add(oImg, frameImg, maskGroup);
            let imgLeft = -vm.templateWidth;
            let imgTop = -vm.templateWidth;

            const draw = () => {
              new fabric.Image.fromURL(
                require("@/assets/brush/paintTexture.png"),
                (brushImage: any) => {
                  imgLeft += Math.random() * 10;
                  imgTop += Math.random() * 10;
                  brushImage.set({
                    transformMatrix: [
                      1,
                      0,
                      -Math.random() * 2,
                      1,
                      imgLeft,
                      imgTop
                    ],
                    width: vm.templateWidth,
                    height: vm.templateHeight,
                    globalCompositeOperation: "destination-out"
                  });

                  maskGroup.add(brushImage);
                  // const activeObject = canvas.getActiveObject();
                  // console.log("activeObject", activeObject);
                  // if (activeObject) {
                  //   canvas.remove(activeObject);
                  // }
                  canvas.add(maskGroup).setActiveObject(maskGroup);

                  canvas.renderAll();
                  if (imgLeft > vm.templateWidth && imgTop > vm.templateWidth) {
                    canvas.clear();
                    canvas.add(oImg, frameImg);
                    return;
                  }
                  window.requestAnimationFrame(draw);
                }
              );
            };
            draw();
            // const virtualCanvas = document.createElement("canvas");
            // virtualCanvas.width = vm.templateWidth;
            // virtualCanvas.height = vm.templateHeight;
            // let virtualCtx: any = virtualCanvas.getContext("2d");
            // virtualCtx.globalAlpha = 1;
            // virtualCtx.fillStyle = "#fff";
            // virtualCtx.fillRect(0, 0, vm.templateWidth, vm.templateHeight);
            // let theUnmaskDuration = 2400;
            // let theStartingMaskPosition = -100;
            // let theLastMaskPosition = 0;
            // let theMaskStep = 12 * (Math.PI / 180);
            // let aLapsedTime = 0;
            // let theMaskDirection = 1;
            // const range = (min: number, max: number) => {
            //   return min + Math.random() * (max - min);
            // };
            // const img2 = new Image();
            // img2.src = require("@/assets/brush/paintTexture.png");
            // img2.onload = () => {
            //   virtualCtx.globalCompositeOperation = "destination-out";
            //   const draw = () => {
            //     aLapsedTime += 16;
            //     const distance =
            //       theStartingMaskPosition +
            //       1000 * (aLapsedTime / theUnmaskDuration);
            //     if (aLapsedTime > theUnmaskDuration) {
            //       // 开始绘制下一页
            //       canvas.remove(canvas.getActiveObject());
            //       return;
            //     }
            //     var position =
            //       theLastMaskPosition + theMaskStep * theMaskDirection;

            //     if (
            //       (theMaskDirection > 0 && position > 1.5707963267948966) ||
            //       (theMaskDirection < 0 && position < 0)
            //     ) {
            //       theMaskDirection *= -1;
            //     }
            //     theLastMaskPosition = position;
            //     const transX = distance * Math.sin(position);
            //     const transY = distance * Math.cos(position) + 30;
            //     virtualCtx.save();
            //     virtualCtx.translate(transX, transX);
            //     virtualCtx.rotate(range(0, Math.PI * 2));
            //     virtualCtx.drawImage(
            //       img2,
            //       -vm.templateWidth / 2,
            //       -vm.templateHeight / 2,
            //       vm.templateWidth,
            //       vm.templateHeight
            //     );

            //     const dataUrl = virtualCanvas.toDataURL("image/png", 0.6);
            //     virtualCtx.restore();
            //     new fabric.Image.fromURL(dataUrl, (maskImage: any) => {
            //       canvas.clear();
            //       maskImage.set({
            //         selectable: false,
            //         hasControls: false
            //       });
            //       canvas
            //         .add(oImg, frameImg, maskImage)
            //         .setActiveObject(maskImage);
            //       window.requestAnimationFrame(draw);
            //     });
            //   };
            //   draw();
            // };
          }
        );
      }
    );

    // const canvas: any = document.querySelector("#canvas");
    // const ctx = canvas.getContext("2d");
    // const image = new Image();
    // image.src = "https://www.kkkk1000.com/images/bg.jpg";
    // image.onload = () => {
    //   canvas.style.background = "url(https://www.kkkk1000.com/images/bg.jpg)";
    //   // ctx.globalCompositeOperation = "destination-atop";
    //   // ctx.drawImage(image, 0, 0, vm.templateWidth, vm.templateHeight);
    //   ctx.globalAlpha = 1;
    //   // ctx.globalCompositeOperation = "destination-in";
    //   ctx.fillStyle = "red";
    //   ctx.fillRect(0, 0, vm.templateWidth, vm.templateHeight);
    //   const img2 = new Image();
    //   img2.src = "https://www.kkkk1000.com/images/clear.png";
    //   img2.onload = () => {
    //     ctx.globalCompositeOperation = "destination-out";
    //     ctx.drawImage(img2, 0, 0, 400, 400);
    //   };
    // };
  }
}
</script>

<style scoped lang="scss"></style>
