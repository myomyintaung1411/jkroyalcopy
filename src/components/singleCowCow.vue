    <template>
    <div  @click="requstMore()"
        class="  w-[632px] max-w-[632px]  flex 
         bg-slate-800 h-[280px]  shadow-xl   shadow__  cursor-pointer " :class="routeName === '/cowcow' || routeName === '/all' ? 'my-3 mx-3' : 'my-0'">
        <div class="py-3 px-1 text-center relative flex flex-col justify-between  w-[120px] overflow-hidden  __bg  bg-slate-500 ">
            <p class="text-white font-medium text-3xl ">{{ data.roomName }}</p>
            <div class="text-white text-lg font-extrabold tracking-wide">
              <p v-if="data.state == '0'">开局</p>
              <p v-else-if="data.state == '1'" class="text-green-400">开始下注</p>
              <p v-else-if="data.state == '2'" class="text-red-500">停止下注</p>
              <p v-else-if="data.state == '3'">开牌中</p>
              <p v-else-if="data.state == '4'">开奖</p>
              <p v-else-if="data.state == '5'">派彩</p>
              <p v-else-if="data.state == '-1'" class="text-gray-200">等待操作</p>
            </div>
            <div>
                <h1 class="text-lg font-bold tracking-wide text-white text-center ">局口:{{ data.cc }}</h1>
                <h1 class="text-lg font-bold tracking-wide text-white text-center ">限红:{{ data.xh }}</h1>
            </div>
        </div>

        <div class=" w-[512px] overflow-hidden h-full  ">
            <table class="border-collapse  border-none table-fixed w-[512px] h-full " >
                <thead class="text-center">
                    <tr class="text-center whitespace-nowrap">
                        <th class="w-8 "></th>
                        <th class="border border-slate-600 text-red-400 font-bold w-20">闲一翻倍</th>
                        <th class="border border-slate-600 text-indigo-200  font-bold w-20">闲一平倍</th>
                        <th class="border border-slate-600 text-green-300 font-bold w-20">闲二翻倍</th>
                        <th class="border border-slate-600 text-red-400 font-bold w-20">闲二平倍</th>
                        <th class="border border-slate-600 text-indigo-200 font-bold w-20">闲三翻倍</th>
                        <th class="border border-slate-600 text-indigo-200 font-bold w-20">闲三平倍</th>
                    </tr>
                </thead>
                <tbody class="text-center overflow-hidden   break-all ">

                    <tr class="h-4  ">
                        <td class="border border-slate-700 text-xl font-bold  "
                            style="writing-mode: vertical-rl;text-orientation: upright;">投注</td>
                        <td class="border border-slate-700  text-red-400  ">{{data?.detail.player1_double}}</td>
                        <td class="border border-slate-700  text-indigo-200">{{data.detail.player1_normal}}</td>
                        <td class="border border-slate-700  text-green-300">{{data.detail.player2_double}}</td>
                        <td class="border border-slate-700  text-red-400">{{data.detail.player2_normal}}</td>
                        <td class="border border-slate-700  text-indigo-200">{{data.detail.player3_double}}</td>
                        <td class="border border-slate-700  text-indigo-200">{{data.detail.player3_normal}}</td>
                    </tr>
                    <tr class="h-10" >
                        <td class="border border-slate-700 py-0  my-0  flex flex-col " >
                            <span class="text-xl font-bold" style="writing-mode: vertical-rl;text-orientation: upright; ">赔彩</span>
                            <p class="text-red-500">1-6</p>
                        </td>
                        <td class="border border-slate-700  text-red-400  ">{{data.detail.player1_double * 0.97}}</td>
                        <td class="border border-slate-700  text-indigo-200">{{data.detail.player1_normal * 0.97}}</td>
                        <td class="border border-slate-700  text-green-300">{{data.detail.player2_double * 0.97}}</td>
                        <td class="border border-slate-700  text-red-400">{{data.detail.player2_normal * 0.97}}</td>
                        <td class="border border-slate-700  text-indigo-200">{{data.detail.player3_double * 0.97}}</td>
                        <td class="border border-slate-700  text-indigo-200">{{data.detail.player3_normal * 0.97}}</td>
                    </tr>
                    <tr class="h-10">
                      <td class="border border-slate-700 py-0  my-0  flex flex-col " >
                            <span class="text-xl font-bold" style="writing-mode: vertical-rl;text-orientation: upright; ">赔彩</span>
                            <p class="text-red-500">7-9</p>
                        </td>
                        <td class="border border-slate-700  text-red-400  ">{{data.detail.player1_double * 1.94}}</td>
                        <td class="border border-slate-700  text-indigo-200">{{data.detail.player1_normal * 0.97}}</td>
                        <td class="border border-slate-700  text-green-300">{{data.detail.player2_double * 1.94}}</td>
                        <td class="border border-slate-700  text-red-400">{{data.detail.player2_normal * 0.97}}</td>
                        <td class="border border-slate-700  text-indigo-200">{{data.detail.player3_double * 1.94}}</td>
                        <td class="border border-slate-700  text-indigo-200">{{data.detail.player3_normal * 0.97}}</td>
                    </tr>
                    <tr class="overflow-hidden  ">
                          <td class="border border-slate-700 py-0  my-0  flex flex-col max-h-20 " >
                            <span class="text-lg font-bold" style="writing-mode: vertical-rl;text-orientation: upright; ">赔彩</span>
                            <p class="text-red-500">1-6</p>
                        </td>
                        <td class="border border-slate-700  text-red-400  ">{{data.detail.player1_double * 2.91}}</td>
                        <td class="border border-slate-700  text-indigo-200">{{data.detail.player1_normal * 0.97}}</td>
                        <td class="border border-slate-700  text-green-300">{{data.detail.player2_double * 2.91}}</td>
                        <td class="border border-slate-700  text-red-400">{{data.detail.player2_normal * 0.97}}</td>
                        <td class="border border-slate-700  text-indigo-200">{{data.detail.player3_double * 2.91}}</td>
                        <td class="border border-slate-700  text-indigo-200">{{data.detail.player3_normal * 0.97}}</td>
                    </tr>
                </tbody>
            </table>
            <!-- <div class="w-full h-[40px] text-center text-2xl">庄闲差 : 2022</div> -->
        </div>
    </div>
</template>

<script setup>
import pomelo from "@/socket/pomelo.js";
import { useRouter,useRoute } from "vue-router";
import { useStore } from "vuex";
import {ref,watch} from 'vue'

 const props = defineProps({
  data: {
    type: Object,
    default: {},
  },
});
const routeName = ref('')
const route = useRoute()
const store = useStore()
const router = useRouter()
    watch(
      () => route.path,
      () => {
        // console.log(route.path, "watching");
        routeName.value = route.path;
      },
      { immediate: true, deep: true }
    );

 const requstMore = () => {
  router.push({path:'/nuDetail',query:{cowRoomId:props.data.roomId}})
 }

const greaterThan = (data) => {
  if(data.banker > data.player) {
    return data.banker - data.player
  } else{
    return data.player - data.banker
  }
}
 const seperatedComma = (data,name) => {
  var arraylist = data.bl.split(",") ;
  switch (name) {
    case 'banker':
     arraylist = arraylist[2] * data.detail.banker
      break;
    case 'player':
     arraylist = arraylist[0] * data.detail.player
      break;
    case 'tie':
     arraylist = arraylist[1] * data.detail.tie
      break;
    case 'bpair':
     arraylist = arraylist[1] * data.detail.tie
      break;
    case 'ppair':
     arraylist = arraylist[1] * data.detail.tie
      break;
  
    default:
      break;
  }
 // console.log(arraylist);
  return arraylist
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

 table,
        th,
        td {
            /* border: 2px solid green; */
            text-align: center;
        }
  
        th,
        td {
            padding: 0px;
            background-color: none;
        }
  
        /* h1 {
            color: green
        } */
</style>