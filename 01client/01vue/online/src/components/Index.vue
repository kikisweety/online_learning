<template>
  <div class="container">
    <div id="myChart" :style="{width: '600px', height: '300px'}"></div>
    <div class="gridBox">
      <!-- <div>A</div>
      <div>B</div>
      <div>C</div>
      <div>D</div>
      <div>E</div>
      <div>F</div>-->
      <grid-layout
        :layout="layoutData"
        :col-num="12"
        :row-height="layoutHeight"
        :is-draggable="dialogVisible"
        :is-resizable="dialogVisible"
        :is-mirrored="false"
        :vertical-compact="true"
        :margin="[10, 10]"
        :use-css-transforms="true"
      >
        <grid-item
          v-for="(item,index) in layoutData"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
          :key="item.i"
        >{{index}}</grid-item>
      </grid-layout>
    </div>
  </div>
</template>

<script>
import layoutData from "../../static/jsonData/layoutData.json";
import VueGridLayout from "vue-grid-layout";
const GridLayout = VueGridLayout.GridLayout;
const GridItem = VueGridLayout.GridItem;
export default {
  name: "echarts",
  data() {
    return {
      layoutData:[],
      layoutConfig:{
        height:100,
        dialogVisible:true
      }
    };
  },
  components:{
    GridLayout,
    GridItem
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    init(){
      this.layoutData=layoutData.mainData
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: { text: "在Vue中使用echarts" },
        //配置提示信息
        tooltip: {},
        legend: {
          data: [
            {
              name: "系列1",
              // 强制设置图形为圆。
              icon: "circle",
              // 设置文本为红色
              textStyle: {
                color: "red"
              }
            }
          ]
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "系列1",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      });
    }
  },
  created(){
    this.init()
  }
};
</script>>

<style scoped>
.container {
  position: absolute;
  width: 1000px;
  height: 1000px;
  background-color: whitesmoke;
}
.gridBox {
  width: 60%;
  height: 80%;
  background-color: antiquewhite;
  display: grid;
  /* grid-template-columns: repeat(3, 33.3%);
  grid-template-rows: repeat(3, 33.3%); */
  /* grid-template-columns: 150px 1fr 2fr;
   */
  /*
   第一个占比1/6 第二个是第一个的五倍 剩下四个均分 
    */
  grid-template-rows: 1fr 2fr;
}
.gridBox > div {
  background-color: aquamarine;
  margin: 5px;
}
.vue-grid-item {
  background: rebeccapurple;
}
</style>>