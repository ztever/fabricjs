<template>
  <div class="CreateClass">
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
export default class CreateClass extends Vue {
  private mounted() {
    const canvas = new fabric.Canvas("canvas");
    // canvas.add(
    //   new fabric.Rect({
    //     left: 50,
    //     top: 50,
    //     fill: "red",
    //     width: 100,
    //     height: 100
    //   })
    // );
    const LabeledRect = fabric.util.createClass(fabric.Rect, {
      type: "labeledRect",
      //不可以用箭头函数，否则会改变this的指向
      initialize: function(options: any) {
        options || (options = {});
        this.callSuper("initialize", options);
        this.set("label", options.label || "");
      },
      toObject: function() {
        return fabric.util.object.extend(this.callSuper("toObject"), {
          label: this.get("label")
        });
      },

      _render: function(ctx: any) {
        this.callSuper("_render", ctx);

        ctx.font = "20px Helvetica";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.direction = "rtl"; //文本方向
        ctx.fillText(this.label, 0, 0);
        const textWidth = ctx.measureText(this.label).width;
        ctx.beginPath();
        ctx.moveTo(-textWidth / 2, 0);
        ctx.lineTo(textWidth / 2, 0);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "blue";
        ctx.stroke();
      }
    });
    const labeledRectTest = new LabeledRect({
      width: 200,
      height: 50,
      left: 200,
      top: 100,
      rx: 10,
      ry: 10,
      // hasControls: false,
      // originX: "center",
      // originY: "center",
      label: "test text",
      fill: "#faa"
    });
    // labeledRectTest.center();
    // labeledRectTest.setCoords();
    canvas.add(labeledRectTest);
    setTimeout(() => {
      labeledRectTest.set({
        fill: "purple",
        label: "hello world"
      });
      canvas.renderAll();
    }, 2000);
  }
}
</script>

<style scoped lang="scss"></style>
