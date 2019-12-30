<template>
  <div class="BannerCaptionSlideshow">
    <canvas id="canvas" :width="tempWidth" :height="tempHeight"></canvas>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { fabric } from "fabric";
let vm: any;
@Component({
  components: {}
})
export default class BannerCaptionSlideshow extends Vue {
  private isEditble = false;
  private isRecording = false;
  private tempWidth = window.innerWidth;
  private tempHeight = window.innerWidth;
  private renderTwoTimer: any = null;
  private renderThreeTimer: any = null;
  private pageNow = 1;
  private pageTotal = 3;
  private async mounted() {
    vm = this;
    const imageResorce = [
      "watermark.png",
      "demo_1.jpg",
      "demo_7.jpg",
      "back.png",
      "next.png"
    ];
    let imageList: any = [];
    let promiseALllist: any = [];
    const loadImageList = () => {
      try {
        for (let i = 0; i < imageResorce.length; i++) {
          promiseALllist[i] = new Promise((resolve: any, reject: any) => {
            new fabric.Image.fromURL(
              require("../assets/" + imageResorce[i]),
              (image: any) => {
                resolve(image);
              }
            );
          });
        }
      } catch (error) {
        //
      }
    };
    loadImageList();
    //首先加载好所有的图片资源
    const res: any = await Promise.all(promiseALllist);
    imageList = res;
    const cornerStyle = {
      transparentCorners: false,
      cornerColor: "rgb(78,176,189)",
      cornerStrokeColor: "#fff",
      borderColor: "#fff",
      cornerSize: 16,
      cornerStyle: "circle",
      hasRotatingPoint: false,
      borderScaleFactor: 3
    };
    const setCornerStyle = (object: any, style: any = {}) => {
      object.set({ ...cornerStyle, ...style });
      object.setControlsVisibility({
        mt: false,
        ml: false,
        mr: false,
        mm: false,
        mb: false
      });
      // bl: true, // 左下
      // br: true, // 右下
      // mb: true, // 下中
      // ml: true, // 中左
      // mr: true, // 中右
      // mt: true, // 上中
      // tl: true, // 上左
      // tr: true, // 上右
      // mtr: true // 旋轉控制鍵
    };
    const canvas = vm.isRecording
      ? new fabric.StaticCanvas("canvas")
      : new fabric.Canvas("canvas", {
          selectionLineWidth: 10,
          // selectionBorderColor: "red",
          selectionBackgroundColor: "transparent"
          // selection: !vm.isRecording
          // selectionDashArray: [5, 5],
        });
    //用mouseup模拟click事件
    canvas.on({
      "mouse:up": (res: any) => {
        if (!vm.isRecording && !vm.isEditble) {
          vm.isEditble = true;
          clearTimeout(vm.renderTwoTimer);
          clearTimeout(vm.renderThreeTimer);
          renderBackNext();
        }
      }
    });

    canvas.backgroundColor = "rgb(237,145,126)";
    const backgroundRec = new fabric.Rect({
      left: 0,
      top: 0,
      width: vm.tempWidth,
      height: vm.tempWidth,
      hasControls: !vm.isRecording,
      hasBorders: !vm.isRecording,
      selectable: !vm.isRecording //不可被选中
    });
    let x = 0.002;
    let y = 0.003;
    let oprator = 0;
    const backgroundAnimate = () => {
      if (oprator % 2 == 0) {
        x += 0.01;
        if (oprator === 2 && x > 0.4) {
          return;
        }
        if (x >= 1) {
          x = 0.999;
          oprator += 1;
        }
        if (oprator === 2) {
          y += 0.01;
        } else {
          y += 0.02;
        }

        if (y > 1) {
          y = 1;
        }
      } else {
        y -= 0.01;
        x -= 0.0115;
        if (x < 0.001) {
          x = 0.001;
          oprator += 1;
        }
        if (y < 0.002) {
          y = 0.002;
        }
      }
      const lx = x - 0.001;
      const ly = y - 0.001;
      let stop: any = {
        0: "rgb(237,145,126)",
        1: "rgb(232,88,109)"
      };

      stop[lx] = "rgb(237,145,126)";
      stop[x] = "rgb(233,116,110)";
      stop[ly] = "rgb(233,116,110)";
      stop[y] = "rgb(232,88,109)";
      backgroundRec.setGradient("fill", {
        x1: 500,
        y1: 0,
        x2: 0,
        y2: 700,
        colorStops: {
          ...stop
        }
      });
      canvas.renderAll();
      window.requestAnimationFrame(backgroundAnimate);
    };
    backgroundAnimate();
    const brilliantText = new fabric.Textbox("BRILLIANT!", {
      left: vm.tempHeight / 6,
      top: vm.tempHeight / 2,
      fill: "#fff",
      fontSize: 40,
      width: (vm.tempWidth * 2) / 3,
      textAlign: "center",
      opacity: 0.5,
      centeredScaling: true //从中间缩放
    });

    const coolText = new fabric.Textbox("this is cool!", {
      left: vm.tempHeight / 6,
      top: (vm.tempHeight * 4) / 5,
      fill: "#fff",
      fontSize: 20,
      width: (vm.tempWidth * 2) / 3,
      textAlign: "center",
      opacity: 0.1,
      centeredScaling: true //从中间缩放
    });

    //添加右下角的星星
    imageList[0]
      .set({
        left: (vm.tempWidth * 4) / 5,
        top: (vm.tempWidth * 4) / 5,
        originX: "center",
        originY: "center",
        padding: 10,
        hasControls: false,
        borderColor: "#fff",
        lockMovementX: true,
        lockMovementY: true
      })
      .scaleToWidth(80, false);
    //创建back
    imageList[3].scaleToWidth(40, false);
    imageList[3].set({
      left: 0,
      top: vm.tempHeight / 2 - (imageList[3].height * imageList[3].scaleY) / 2,
      hasBorders: false,
      hasControls: false,
      selectable: false
    });
    //创建next
    imageList[4].scaleToWidth(40, true);
    imageList[4].set({
      left: vm.tempWidth - imageList[4].width * imageList[4].scaleX,
      top: vm.tempHeight / 2 - (imageList[4].height * imageList[4].scaleY) / 2,
      hasBorders: false,
      hasControls: false,
      selectable: false
    });
    imageList[3].on({
      mouseup: (res: any) => {
        console.log("back");
        vm.pageNow--;
        if (vm.pageNow < 1) {
          vm.pageNow = 3;
        }
        renderPage();
      }
    });
    imageList[4].on("mouseup", (res: any) => {
      console.log("next");
      vm.pageNow++;
      if (vm.pageNow > 3) {
        vm.pageNow = 1;
      }
      renderPage();
    });
    // render next back image
    const renderBackNext = () => {
      //添加back next
      if (this.isEditble) {
        canvas.add(imageList[3], imageList[4]);
      }
    };
    //将page1的内容添加到画布上
    const renderPageOne = () => {
      setCornerStyle(brilliantText);
      setCornerStyle(coolText);
      setTimeout(() => {
        brilliantText.animate(
          {
            top: vm.tempHeight / 4,
            opacity: 1
          },
          {
            onChange: canvas.renderAll.bind(canvas),
            duration: 1000,
            easing: fabric.util.ease.easeOutExpo
          }
        );
        coolText.animate(
          {
            top: vm.tempHeight / 2,
            opacity: 1
          },
          {
            onChange: canvas.renderAll.bind(canvas),
            duration: 2000,
            easing: fabric.util.ease.easeOutExpo
          }
        );
      }, 100);
      canvas.add(backgroundRec, brilliantText, coolText);
      canvas.add(imageList[0]).bringToFront(imageList[0]);
      if (this.isEditble) {
        renderBackNext();
      }
    };
    renderPageOne();
    const getBorderImageGroup = (img: any, args: any) => {
      //创建大图
      // 将高或者宽设置成canvas大小
      img.width < img.height
        ? img.scaleToWidth(vm.tempWidth, false)
        : img.scaleToHeight(vm.tempHeight, false);
      img.set({
        centeredScaling: true
        // left: (img.width * img.scaleX) / 2,
        // top: (-img.height * img.scaleY) / 2,
        // originX: "center",
        // originY: "center"
      });

      //创建图片上的白色边框
      const borderBox = new fabric.Rect({
        left: (img.width * img.scaleX - vm.tempWidth + 50) / 2,
        top: (img.height * img.scaleY - vm.tempHeight + 50) / 2,
        width: vm.tempWidth - 50,
        height: vm.tempHeight - 50,
        fill: "rgba(255,255,255,0)",
        stroke: "#fff",
        stokeWidth: 2
      });
      //将大图与边框设置成group
      return new fabric.Group([img, borderBox], {
        left: args.left || -(img.width * img.scaleX - vm.tempWidth) / 2,
        top: args.top || -(img.height * img.scaleY - vm.tempHeight) / 2,
        hasBorders: false,
        hasControls: false,
        selectable: false
      });
    };
    //获取pagetwo带边框的大图
    const pageTwoImageBoderGroup = getBorderImageGroup(imageList[1], {
      top: vm.tempHeight
    });

    const getCaptionBackGroup = (
      left: number,
      top: number,
      angle: number,
      skewX: number = 70,
      height: number = 100
    ) => {
      const pageTwoCaptionRect1 = new fabric.Rect({
        left: -2 * vm.tempWidth,
        width: vm.tempWidth,
        height,
        fill: "rgb(232,88,109)",
        skewX
      });
      const pageTwoCaptionRect2 = new fabric.Rect({
        left: -vm.tempWidth,
        width: (vm.tempWidth * 2) / 3,
        height,
        fill: "rgb(233,116,110)",
        skewX
      });
      const pageTwoCaptionRect3 = new fabric.Rect({
        width: 2.5 * vm.tempWidth,
        left: -vm.tempWidth / 2,
        height,
        fill: "rgb(237,145,126)"
      });
      return new fabric.Group(
        [pageTwoCaptionRect3, pageTwoCaptionRect1, pageTwoCaptionRect2],
        {
          // width: 600,//不能限制宽度
          height,
          left,
          top,
          angle,
          centeredScaling: true,
          originX: "center",
          originY: "center",
          hasBorders: false,
          hasControls: false,
          selectable: false
        }
      );
    };
    //caption左边的背景色
    const pageTwoBackCaptionGroup = getCaptionBackGroup(
      -vm.tempWidth,
      vm.tempHeight,
      0
    );

    const getPageCaption = (pageGroup: any, text: string, propertys: any) => {
      const pageCaption = new fabric.Textbox(text, {
        fill: "#fff",
        textAlign: "center",
        originX: "center",
        originY: "center",
        centeredScaling: true, //从中间缩放
        lockMovementX: true,
        minScaleLimit: 0.5,
        // editingBorderColor: "red",
        ...propertys
      });
      setCornerStyle(pageCaption);
      pageCaption.on({
        scaling: (res: any) => {
          const scaleY = res && res.target.scaleY && res.target.scaleY;
          const scaleX = scaleY > 1 ? scaleY : 1;
          pageGroup.set({ scaleY, scaleX });
        },
        moving: (res: any) => {
          const top = res && res.target.top;
          pageGroup.set({
            top
          });
        }
      });
      return pageCaption;
    };
    const pageTwoCaption = getPageCaption(
      pageTwoBackCaptionGroup,
      "why does this look familiar?",
      {
        left: vm.tempWidth / 2,
        top: vm.tempHeight,
        width: (vm.tempWidth * 4) / 5,
        height: 80
      }
    );
    const scaleImage = (oImg: any) => {
      oImg.animate(
        {
          width: oImg.width * 1.2,
          height: oImg.height * 1.2,
          left: oImg.left * 1.2,
          top: oImg.top * 1.2
        },
        {
          onChange: canvas.renderAll.bind(canvas),
          duration: 16000,
          easing: fabric.util.ease.easeOutExpo
        }
      );
    };

    // 渲染page2

    const renderPageTwo = () => {
      let duration = 1500;
      let duration2 = 3000;
      let timeOut = 3000;
      if (this.isEditble) {
        timeOut = duration = duration2 = 0;
      }
      vm.renderTwoTimer = setTimeout(() => {
        //3s后绘制pagetwo
        canvas.add(pageTwoImageBoderGroup).bringToFront(imageList[0]);
        //绘制pagetwo需要将page1的内容设置成不可点击，或者清除page1的内容,否则点击page1的文字，会让文字置于顶层
        // brilliantText.set({
        //   selectable: false
        // });
        // coolText.set({
        //   selectable: false
        // });
        // 背景图往上移动;
        pageTwoImageBoderGroup.animate("top", 0, {
          duration: duration,
          onChange: canvas.requestRenderAllBound,
          easing: fabric.util.ease.easeOutExpo,
          onComplete: () => {
            //背景图开始放大
            if (!this.isEditble) {
              scaleImage(imageList[1]);
            }
            // caption开始往上移动
            pageTwoCaption.animate("top", vm.tempHeight / 5, {
              onChange: canvas.renderAll.bind(canvas),
              duration: duration,
              easing: fabric.util.ease.easeOutExpo
            });
            pageTwoBackCaptionGroup.animate("top", vm.tempHeight / 5, {
              onChange: canvas.renderAll.bind(canvas),
              duration: duration,
              easing: fabric.util.ease.easeOutExpo,
              onComplete: () => {
                // caption的背景色开始移动
                pageTwoBackCaptionGroup.animate("left", vm.tempWidth, {
                  onChange: canvas.renderAll.bind(canvas),
                  duration: duration2,
                  easing: fabric.util.ease.easeOutExpo
                });
              }
            });
            canvas.add(pageTwoBackCaptionGroup, pageTwoCaption);
            if (this.isEditble) {
              renderBackNext();
            }
          }
        });
      }, timeOut);
    };
    renderPageTwo();
    //创建page3的内容
    //获取pagethree带边框的大图
    const pageThreeImageBoderGroup = getBorderImageGroup(imageList[2], {
      left: vm.tempWidth
    });
    //获取pagethree的caption 背景
    const pageThreeCaptionBack = getCaptionBackGroup(
      vm.tempWidth,
      vm.tempHeight,
      -90,
      40
    );
    //创建page3的caption
    const pageThreeCaption = getPageCaption(
      pageThreeCaptionBack,
      "click to change caption",
      {
        left: vm.tempWidth,
        top: vm.tempHeight / 2,
        width: vm.tempWidth / 4,
        fontSize: 30
      }
    );
    //获取page3 侧边划过的渐变动画
    const pageThreeSlideBack = getCaptionBackGroup(
      vm.tempWidth,
      vm.tempHeight / 4,
      -90,
      30,
      vm.tempHeight / 3
    );
    //创建星星的圆圈
    const circleRing = new fabric.Circle({
      left: (vm.tempWidth * 4) / 5,
      top: (vm.tempWidth * 4) / 5,
      radius: 1,
      stroke: "#fff",
      stokeWidth: 1,
      fill: "rgba(255,255,255,0)",
      centeredScaling: true,
      originX: "center",
      originY: "center",
      opacity: 1,
      hasBorders: false,
      hasControls: false,
      selectable: false
    });

    const renderPageThree = () => {
      let timeOut = 8000;
      let duration = 1500;
      let duration2 = 3000;
      if (this.isEditble) {
        timeOut = duration = duration2 = 0;
      }

      vm.renderThreeTimer = setTimeout(() => {
        // 初始化的时候点击了画布，需要停止绘制第二页，并且页面可以编辑
        if (vm.stopAnimate && !vm.isEditble) {
          vm.isEditble = true;
          return;
        }
        //编辑状态下，不需要动画
        if (this.isEditble) {
          duration = duration2 = 0;
        }
        //开始绘制page3
        canvas.clear();
        canvas
          .add(pageThreeSlideBack, pageThreeImageBoderGroup)
          .bringToFront(imageList[0]);
        //添加动画;
        pageThreeSlideBack.animate("left", -vm.tempWidth / 6, {
          onChange: canvas.renderAll.bind(canvas),
          duration: duration,
          easing: fabric.util.ease.easeOutExpo
        });
        pageThreeImageBoderGroup.animate("left", 0, {
          onChange: canvas.renderAll.bind(canvas),
          duration: duration,
          easing: fabric.util.ease.easeOutExpo,
          onComplete: () => {
            //背景图开始放大
            if (!this.isEditble) {
              scaleImage(imageList[2]);
            }
            canvas.add(pageThreeCaptionBack, pageThreeCaption);
            //caption 开始移动
            pageThreeCaption.animate("left", vm.tempWidth / 6, {
              onChange: canvas.renderAll.bind(canvas),
              duration: duration,
              easing: fabric.util.ease.easeOutExpo
            });
            pageThreeCaptionBack.animate("left", vm.tempWidth / 6, {
              onChange: canvas.renderAll.bind(canvas),
              duration: duration,
              easing: fabric.util.ease.easeOutExpo,
              onComplete: () => {
                // caption的背景色开始移动
                pageThreeCaptionBack.animate("top", -vm.tempWidth / 8, {
                  onChange: canvas.renderAll.bind(canvas),
                  duration: duration2,
                  easing: fabric.util.ease.easeOutExpo
                });
                canvas.add(circleRing).bringToFront(imageList[0]);
                const animateRing = () => {
                  circleRing.animate(
                    { radius: 40, opacity: 0.2 },
                    {
                      onChange: canvas.renderAll.bind(canvas),
                      duration: duration2,
                      easing: fabric.util.ease.easeOutExpo,
                      onComplete: () => {
                        if (vm.isRecording) {
                          circleRing.set({ radius: 1, opacity: 1 });
                          setTimeout(() => {
                            animateRing();
                          }, 200);
                        } else {
                          if (vm.isEditble) {
                            renderBackNext();
                          } else {
                            vm.isEditble = true;
                            renderPageOne();
                            renderBackNext();
                            canvas.remove(circleRing);
                          }
                        }
                      }
                    }
                  );
                };
                animateRing();
              }
            });
          }
        });
      }, timeOut);
    };
    renderPageThree();
    const renderPage = () => {
      if (vm.pageNow === 1) {
        renderPageOne();
      } else if (vm.pageNow === 2) {
        renderPageTwo();
      } else {
        renderPageThree();
      }
    };
  }
}
</script>

<style scoped lang="scss"></style>
