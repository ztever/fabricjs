<template>
  <div class="ImageFilter">
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
export default class ImageFilter extends Vue {
  private mounted() {
    const canvas = new fabric.Canvas("canvas");
    fabric.Image.fromURL(require("../assets/timg.jpeg"), (oImg: any) => {
      oImg.scale(0.6).set({
        left: 150,
        top: 70,
        flipX: true //水平翻转
      });
      // oImg.filters.push(new fabric.Image.filters.Grayscale()); //
      // oImg.filters.push(
      //   new fabric.Image.filters.Brightness({
      //     brightness: 0.5
      //   })
      // ); //
      // oImg.filters.push(
      //   new fabric.Image.filters.Blur({
      //     blur: 0.5
      //   })
      // ); //
      // oImg.filters.push(
      //   new fabric.Image.filters.Brightness({
      //     brightness: 0.1
      //   }),
      //   new fabric.Image.filters.Blur({
      //     blur: 0.01
      //   })
      // );
      // oImg.filters.push(
      //   new fabric.Image.filters.RemoveColor({ threshold: 0.9, distance: 0.1 })
      // );
      oImg.filters.push(
        new fabric.Image.filters.Convolute({
          matrix: [0, -1, 0, -1, 6, -1, 0, -1, 0]
        })
      );
      // const filter = new fabric.Image.filters.Invert();
      // oImg.filters.push(filter);
      oImg.applyFilters();
      canvas.add(oImg);
      // fabric.Image.filters.Redify = fabric.util.createClass({
      //   type: "Redify",

      //   applyTo: (canvasEl: any) => {
      //     var context = canvasEl.getContext("2d"),
      //       imageData = context.getImageData(
      //         0,
      //         0,
      //         canvasEl.width,
      //         canvasEl.height
      //       ),
      //       data = imageData.data;

      //     for (var i = 0, len = data.length; i < len; i += 4) {
      //       data[i + 1] = 0;
      //       data[i + 2] = 0;
      //     }
      //     context.putImageData(imageData, 0, 0);
      //   }
      // });
      // new fabric.Image.filters.Redify(canvas); //
    });

    fabric.Image.fromURL(require("../assets/demo_7.jpg"), (oImg: any) => {
      oImg.scale(0.3).set({
        left: 0,
        top: 150
      });
      //混合颜色
      const filter = new fabric.Image.filters.BlendColor({
        color: "red",
        mode: "multiply"
      });
      //将两张image合并
      const imgFilter = new fabric.Image.filters.BlendImage({
        image: oImg,
        mode: "multiply",
        alpha: 0.1
      });
      // 颜色反转
      const routationFilter = new fabric.Image.filters.HueRotation({
        rotation: -0.6
      });
      // 对比度
      const ContrastFilter = new fabric.Image.filters.Contrast({
        contrast: 10
      });
      // 旋转
      const ConvoluteFilter = new fabric.Image.filters.Convolute({
        matrix: [0, -1, 0.2, -1, 6, -1, 0, -1, 0]
      });
      //伽马射线
      const GammaFilter = new fabric.Image.filters.Gamma({
        brightness: 300
      });
      //设置饱和度
      const SaturationFilter = new fabric.Image.filters.Saturation({
        saturation: 100
      });
      //调节亮度
      const BrightnessFilter = new fabric.Image.filters.Brightness({
        brightness: 0.2
      });
      const ColorMatrixFilter = new fabric.Image.filters.ColorMatrix({
        matrix: [
          0.1285582396593525,
          -0.3967382283601348,
          -0.03992559172921793,
          0,
          3.72958762196502,
          -0.16404339962244616,
          1.0835251566291304,
          -0.05498805115633132,
          0,
          4.732407896706203,
          -0.16786010706155763,
          -0.5603416277695248,
          1.6014850761964943,
          0,
          5.62982807460946,
          0,
          0,
          0,
          1,
          0
        ]
      });
      // 颜色反转
      const InvertFilter = new fabric.Image.filters.Invert();
      //噪点
      const NoiseFilter = new fabric.Image.filters.Noise({
        noise: 700
      });
      //马赛克
      const PixelateFilter = new fabric.Image.filters.Pixelate({
        blocksize: 18
      });
      // 重新设置过滤器
      const ResizeFilter = new fabric.Image.filters.Resize();
      //增加棕色
      const SepiaFilter = new fabric.Image.filters.Sepia();
      //黑白
      const GrayscaleFilter = new fabric.Image.filters.Grayscale();
      const BlurFilter = new fabric.Image.filters.Blur({
        blur: 0.5
      });
      const RemoveColorFilter = new fabric.Image.filters.RemoveColor({
        // color: "red",
        threshold: 0.8, //   起始点
        distance: 0.3
      });
      // oImg.filters.push(filter);
      // oImg.filters.push(imgFilter);
      // oImg.filters.push(PixelateFilter);
      oImg.filters.push(GrayscaleFilter);
      // oImg.filters.push(SaturationFilter);
      oImg.applyFilters();
      canvas.add(oImg);
    });
  }
}
</script>

<style scoped lang="scss"></style>
