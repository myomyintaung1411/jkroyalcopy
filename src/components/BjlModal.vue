<template>
  <ModalDialog :show="modal" @close="modal = false" >
    <div class="  bg-slate-700 min-w-[1350px] w-[90vw] h-[95vh] pt-12   ">
      <div class="w-full flex   ">
         <div  class=" w-[500px] max-w-[500px]   flex overflow-hidden   bg-slate-800 h-52  shadow-lg  shadow__  cursor-pointer ">
            <div class="py-3 px-3 text-center space-y-5 whitespace-nowrap max-w-[120px] overflow-hidden   bg__info_img ">
              <p class="text-white font-medium text-3xl ">18</p>
              <h1 class="text-4xl font-bold tracking-wide text-white ">皇家</h1>
              <h1 class="text-xl font-bold tracking-wide text-white ">皇17家9娱</h1>
            </div>

            <div class=" w-[380px] overflow-hidden  ">
            <table class="border-collapse  border-none table-fixed w-[380px] overflow-hidden h-[85%] ">
            <thead class="text-center ">
              <tr class="text-center">
                <th class="w-10"></th>
                <th class="border border-slate-600 w-12 text-red-400 font-bold">庄</th>
                <th class="border border-slate-600 w-12 text-indigo-200  font-bold">闲</th>
                <th class="border border-slate-600 w-12 text-green-300 font-bold">和</th>
                <th class="border border-slate-600 w-12 text-red-400 font-bold">庄对</th>
                <th class="border border-slate-600 w-12 text-indigo-200 font-bold">闲对</th>
              </tr>
            </thead>
            <tbody class="text-center  overflow-hidden break-all  ">
              <tr>
                <td class="border border-slate-700 text-xl font-bold w-10 text-white " style="writing-mode: vertical-rl;text-orientation: upright;">闲对</td>
                <td class="border border-slate-700 w-12 text-red-400  ">1000</td>
                <td class="border border-slate-700 w-12 text-indigo-200">1000</td>
                <td class="border border-slate-700 w-12 text-green-300">100</td>
                <td class="border border-slate-700 w-12 text-red-400">100</td>
                <td class="border border-slate-700 w-12 text-indigo-200">100</td>
              </tr>
              <tr>
                <td class="border border-slate-700 text-xl font-bold w-10 text-white" style="writing-mode: vertical-rl;text-orientation: upright; ">闲对</td>
                <td class="border border-slate-700 w-12 text-red-400">100</td>
                <td class="border border-slate-700 w-12 text-indigo-200">100</td>
                <td class="border border-slate-700 w-12 text-green-300">100</td>
                <td class="border border-slate-700 w-12 text-red-400">100</td>
                <td class="border border-slate-700 w-12 text-indigo-200">100</td>
              </tr>
            </tbody>
          </table>
           <div class="w-full h-[15%] text-center text-2xl text-white">总用户 : 0</div>
        </div>
       </div>
       <div class=" scroll_main bg-slate-800 overflow-y-hidden relative">
          <div @click="moveData()" class="dl-section r-section text-black whitespace-nowrap   h-full overflow-y-hidden  ">
            
            <div class="col c2  h-52   text-center  " v-for="(col, iCol) in dl.lst" :key="iCol">
              <div class="cell w-[45px] text-center overflow-hidden " v-for="(c, iRow) in col" :key="iRow">
                
               <img v-if="c>=100" :src="'/static/img/dl-'+c+'.png'" alt="" class="h-[100%] ml-1  align-top">
               <!-- <img v-if="c>=100" :src= "bindImage(c)" alt="" class="h-[100%]  align-top"> -->
                <!-- <div v-else-if="c<0" class="ask">
                  <div class="t">
                    <img v-if="c===-100" :src="askBanker" alt="">
                    <img v-else-if="c===-200" :src="askPlayer" alt="">
                  </div>
                  <img class="ball" :src="'/static/img/dl-'+(-c)+'.png'" alt="">
                </div> -->
              </div>
            </div>
          </div>
       </div>
      </div>
      <div class=" mt-2   table_wrap w-full touch-none">
          <table class="border-collapse table-fixed   border-none w-full  __table    ">
            <thead class="text-center border-b bg-slate-500  sticky top-0 h-full py-2">
              <tr class="text-center ">
                <th class="border border-slate-600  font-bold">皇家娱乐</th>
                <th class="border border-slate-600  font-bold">皇家娱乐</th>
                <th class="border border-slate-600    font-bold">皇家娱乐</th>
                <th class="border border-slate-600  font-bold">皇家娱乐</th>
                <th class="border border-slate-600  font-bold">皇家娱乐</th>
                <th class="border border-slate-600  font-bold">皇家娱乐</th>
                <th class="border border-slate-600  font-bold">皇家娱乐</th>
                <th class="border border-slate-600  font-bold">皇家娱乐</th>
                <th class="border border-slate-600  font-bold">皇家娱乐</th>
                <th class="border border-slate-600 text-red-400 font-bold">庄</th>
                <th class="border border-slate-600 text-indigo-200  font-bold">闲</th>
                <th class="border border-slate-600 text-green-300 font-bold">和</th>
                <th class="border border-slate-600 text-red-400 font-bold">庄对</th>
                <th class="border border-slate-600 text-indigo-200 font-bold">闲对</th>
                <th class="border border-slate-600 text-indigo-200 font-bold">闲对</th>
              </tr>
            </thead>
            <tbody class="text-center  overflow-scroll  py-2   ">
              <tr v-for="n in 30" :key="n">
                <td class="border border-slate-600 text-xl font-bold   text-white " >{{n}}</td>
                <td class="border border-slate-600  text-red-400  ">1000</td>
                <td class="border border-slate-600  text-indigo-200">1000</td>
                <td class="border border-slate-600  text-green-300">100</td>
                <td class="border border-slate-600  text-red-400">100</td>
                <td class="border border-slate-600  text-indigo-200">100</td>
                <td class="border border-slate-600  text-indigo-200">100</td>
                <td class="border border-slate-600  text-indigo-200">100</td>
                <td class="border border-slate-600  text-indigo-200">100</td>
                <td class="border border-slate-600  text-indigo-200">100</td>
                <td class="border border-slate-600  text-indigo-200">100</td>
                <td class="border border-slate-600  text-indigo-200">100</td>
                <td class="border border-slate-600  text-indigo-200">100</td>
                <td class="border border-slate-600  text-indigo-200">100</td>
                <td class="border border-slate-600  text-indigo-200">10000</td>
              </tr>
            </tbody>
          </table>
      </div>
    </div>
  </ModalDialog>
</template>

<script setup>
import ModalDialog from "./ModalDialog.vue";
import {ref,onMounted} from 'vue'
 defineProps({
  modal: {
    type: Boolean,
    default: false,
  },
});
const zp = ref({
  lst: [],
  col: 0,
  row: 0,
})
const dl = ref(
  {
    lst: [],
    row: 0,
    col: 0,
    pr: 0,
    pc: 0,
    nc: 0,
    cl: false,
    clNum: 0,
    good: 0,
    ab: {
      row: -1,
      col: -1,
    },
    ap: {
      row: -1,
      col: -1
    },
    pointCol: 0,
    stat: {}
  },
)

onMounted(() => {
     initData()
})

const initData = () => {
  zp.value.col = zp.value.row = 0
  zp.value.lst = []
  let colsNumUnit = 32
  for (let i = 0; i < colsNumUnit; i++) {
     zp.value.lst.push([0, 0, 0, 0, 0, 0])
  }
  dl.value.col = dl.row = 0
  dl.value.lst = []
  dl.value.pr = dl.pc = dl.nc = 0
  dl.value.cl = false
  dl.value.clNum = 0
  dl.value.stat = {}
  dl.value.pointCol = 0
  for (let i = 0; i < colsNumUnit * 2; i++) {
    dl.value.lst.push([200, 201, 202, 0, 0, 0])
  }
  // dy.lst = []
  // dy.col = dy.row = dy.pr = dy.pc = dy.nc = 0
  // dy.cl = false
  // for (let i = 0; i < 20 * 2; i++) {
  //   dy.lst.push([0, 0, 0, 0, 0, 0])
  // }
  // xq.lst = []
  // xq.col = xq.row = xq.pr = xq.pc = xq.nc = 0
  // xq.cl = false
  // for (let i = 0; i < colsNumUnit * 2 + 24;
  //      i++
  // ) {
  //   xq.lst.push([0, 0, 0, 0, 0, 0])
  // }
  // ot.lst = []
  // ot.xl.col = ot.xl.row = ot.xl.pr = ot.xl.pc = ot.xl.nc = 0
  // ot.xl.cl = false
  // ot.xl.cl = false
  // for (let i = 0; i < 20 * 2; i++) {
  //   ot.lst.push([0, 0, 0, 0, 0, 0])
  // }
  // sx.lst = []
  // sx.col = sx.row = sx.pr = sx.pc = sx.nc = 0
  // sx.cl = false
  // for (let i = 0; i < colsNumUnit + 12;
  //      i++
  // ) {
  //   sx.lst.push([0, 0, 0])
  // }
  // statistic.banker = 0
  // statistic.player = 0
  // statistic.tie = 0
  // statistic.bPair = 0
  // statistic.pPair = 0
}

 //draggble scroll
   function moveData() {
      const slider = document.querySelector(".r-section");
      let isDown = false;
      let startX;
      let scrollLeft;

      slider.addEventListener("mousedown", (e) => {
        isDown = true;
        slider.classList.add("active");
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
      });

      slider.addEventListener("mouseleave", () => {
        isDown = false;
        slider.classList.remove("active");
      });

      slider.addEventListener("mouseup", () => {
        isDown = false;
        slider.classList.remove("active");
      });

      slider.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 3; //scroll-fast
        slider.scrollLeft = scrollLeft - walk;
      });
    }
</script>

<style  scoped>
.scroll_main{
 @apply w-[calc(100%_-_500px)] min-w-[calc(100%_-_500px)] max-w-[(100%_-_500px)]
 overflow-x-hidden;
}
.r-section{
    overflow-y: hidden;
      position: relative;
      @apply w-full;
      will-change: transform;
      user-select: none;
      cursor: grabbing;
      overflow-x: hidden;
     /* -ms-overflow-style: none; 
    scrollbar-width: none;   */
    
    /* width: calc((100vw - 198px)); */
}
/* .r-section::-webkit-scrollbar { 
    display: none;  
} */
.col{
    display: inline-block;
    letter-spacing: 0;
    vertical-align: top;
    border-right: 1px solid;
    @apply border-slate-700;
    /* height: 100%; */
    position: relative;
    text-align: center;
}
 /* .col.c2 .cell {
	 height: calc(-6.0833333333333vh);
	 width: calc(-5.0833333333333vw);
   background: red;
} */
.cell{
  border-bottom: 1px solid;
 @apply border-slate-700;
  height: calc(208px / 6);
}
.cell:last-child{
  border-bottom: 1px solid transparent;
}
.table_wrap{
  max-height: 50vh;
  overflow-y: scroll;
  display:block;
}
.__table{
  overflow: scroll !important;
}
</style>