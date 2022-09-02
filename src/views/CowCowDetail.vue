<template>
    <div class="  bg-slate-700 w-full overflow-x-hidden  ">
        <div v-if="data" class="w-full flex  ">
            <singleCowCow :data="data"></singleCowCow>
            <div class=" scroll_main bg-slate-800 overflow-y-hidden relative">
                <div @click="moveData()" class="dl-section r-section scrollbar__  whitespace-nowrap   h-full overflow-y-hidden  ">
                    <!-- {{dl.lst}} -->
                    <div class="col c2  h-[280px]   text-center  " v-for="(item, idx) in nnp.lst" :key="idx">
                        <!-- {{item}} -->
                        <div class="cell w-[45px] text-center overflow-hidden  ">
                            <div class="nn-b-d w-full h-full relative">
                                <img v-if="item.n0.v !== '.'" :src="'/static/img/nn_b' + item.n0.v + '.png'" alt=""
                                    class="h-full w-full">
                                <img v-else src="/static/img/nn_n.png" alt="" class="h-full w-full">
                            </div>
                        </div>

                        <div class="cell w-[45px] text-center overflow-hidden ">
                            <div class="nn-b-d w-full h-full relative" v-if="item.n1.v !== undefined">
                                <img class="y h-full w-full" :class="{ 'active': item.n1.w === 1 }"
                                    v-if="item.n1.v !== '.'" :src="'/static/img/nn_' + item.n1.v + '.png'" alt="">
                                <img v-else src="/static/img/nn_n.png" alt="" class="h-full w-full">
                            </div>
                        </div>

                        <div class="cell w-[45px] text-center overflow-hidden ">
                            <div class="nn-b-d w-full h-full relative" v-if="item.n1.v !== undefined">
                                <img class="y w-full h-full " :class="{ 'active': item.n2.w === 1 }"
                                    v-if="item.n2.v !== '.'" :src="'/static/img/nn_' + item.n2.v + '.png'" alt="">
                                <img v-else src="/static/img/nn_n.png" alt="" class="w-full h-full">
                            </div>
                        </div>

                        <div class="cell w-[45px] text-center overflow-hidden">
                            <div class="nn-b-d w-full h-full relative" v-if="item.n1.v !== undefined">
                                <img class="y w-full h-full" :class="{ 'active': item.n3.w === 1 }"
                                    v-if="item.n3.v !== '.'" :src="'/static/img/nn_' + item.n3.v + '.png'" alt="">
                                <img v-else src="/static/img/nn_n.png" alt="">
                            </div>
                        </div>
                        <!-- <div class="cell w-[45px] text-center overflow-hidden">
                            <div class="nn-b-d w-full h-full relative" v-if="item.n1.v !== undefined">
                                <img class="y w-full h-full" :class="{ 'active': item.n4.w === 1 }" v-if="item.n4.v !== '.'"
                                    :src="'/static/img/nn_' + item.n4.v + '.png'" alt="">
                                <img v-else src="/static/img/nn_n.png" alt="">
                            </div>
                        </div>
                        <div class="cell w-[45px] text-center overflow-hidden">
                            <div class="nn-b-d w-full h-full relative" v-if="item.n1.v !== undefined">
                                <img class="y w-full h-full" :class="{ 'active': item.n5.w === 1 }" v-if="item.n5.v !== '.'"
                                    :src="'/static/img/nn_' + item.n5.v + '.png'" alt="">
                                <img v-else src="/static/img/nn_n.png" alt="">
                            </div>
                        </div> -->

                    </div>
                </div>
            </div>
        </div>
        <div style="overflow-x:auto !important">
            <TableData></TableData>
        </div>
        <div v-if="betsData?.length > 0" class="flex items-center justify-center">
            <Paginate v-model="pagination.currentPage" :page-count="Math.ceil(pagination.total / pagination.pageSize)"
                :page-range="3" :margin-pages="1" :click-handler="clickCallback" :prev-text="'Prev'" :next-text="'Next'"
                :container-class="'pagination'" :hide-prev-next="true" :page-class="'page-item'"
                :first-last-button="true" class="flex items-center space-x-4" :no-li-surround="true"
                :page-link-class="'page-link'" :active-class="'active-class'">

            </Paginate>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, onBeforeUnmount,reactive } from 'vue'
import pomelo from "@/socket/pomelo.js";
import { useRoute } from 'vue-router';
import singleCowCow from "../components/singleCowCow.vue";
import { useStore } from "vuex";
import global from '@/utils/global';
import TableData from '@/components/TableData.vue';
import Paginate from "vuejs-paginate-next";
const route = useRoute();
const store = useStore()
//
const state = ref('')
// callMoreData()
const data = ref(null)
const betsData = ref([])
const roadData = ref("")
const timing = ref(null)
const pagination = reactive({
  pageSize: 5,
  currentPage: 1,
  total:0,
});
const statistic = ref({
    n0: 0,
    n1: 0,
    n2: 0,
    n3: 0,
    n4: 0,
    n5: 0,
})

const nnp = ref({
    lst: [],
    col: 0,
    row: 0,
})

const chair = ref({
    visible: false,
    data: []
})

const currChair = ref([{}, {}, {}, {}, {}, {}, {}])

function __dataFormat(rData) {
    var data = rData
    var betOrderInquireForm = { tableData: [], totalItemsNum: 0 }
    var tableData = betOrderInquireForm.tableData
    for (var i = 0; i < data.length; i++) {
        tableData[i] = {}
        tableData[i].orderId = i + 1
        tableData[i].name = data[i].name
        tableData[i].rType = data[i].rType
        tableData[i].gameType = data[i].rType
        tableData[i].time = data[i].time
        tableData[i].roomName = data[i].roomName
        tableData[i].cc = data[i].cc
        tableData[i].memberName = data[i].name
        // tableData[i].betOrderInfo = trasBetResult(data[i].rType, data[i].xzmx)
        tableData[i].xz = data[i].xz
        tableData[i].ye = data[i].ye
        tableData[i].ip = data[i].ip // 权限表    
        tableData[i].terminal = data[i].terminal
        let resultData = global.betInfoData(data[i].xzmx, tableData[i].rType)
        tableData[i].niuniu = resultData[0]
        tableData[i].niuniuBet = resultData[1]
        tableData[i].showResult = tableData[i].niuniu.map((item, index) => {
            return item + ':' + tableData[i].niuniuBet[index]
        })
        store.commit("app/TABLE_BETDATA", tableData);
        betsData.value = tableData
        // tableData[i].tablePara = getTablePara(
        //     data[i].rType, tableData[i].betOrderInfo)
    }   // mapIP(betOrderInquireForm.tableData)  
    //betOrderInquireForm.totalItemsNum = rData.totalItem
}

const clickCallback = (pageNum) =>{
    console.log(pageNum , "from click callback");
    callMoreData()
}

function callMoreData() {
    const sendStr = {
        router: 'getDeskLists',
        JsonData: {
            type: 'nn',
            findname: '',
            deskname: route.query.cowRoomId,
            pageSize: pagination.pageSize,
            currentPage: pagination.currentPage
        }
    }
    pomelo.send(sendStr, res => {
        console.log('resp ', res)
        data.value = res.JsonData?.data[0]
        __dataFormat(res.JsonData?.bets)
        roadData.value = res.JsonData?.data[0]?.road
        _roadDataModifed(res.JsonData?.data[0]?.road)
        pagination.total = res.JsonData?.totalItem //pagination total
        //betsData.value = res.JsonData.bets
    })
}
 callMoreData()


function requestDataEveryFiveSec() {
    timing.value = setInterval(() => {
        callMoreData()
        console.log("5 log second");
    }, 5000);
    // }
}

onBeforeUnmount(() => {
    clearInterval(timing.value)
})
onMounted(() => {
    store.commit("app/TABLE_BETDATA", []);
    initData()
    requestDataEveryFiveSec()
})

function _roadDataModifed(data) {
   // let test_data = 'dlbd-001^lfli-101^hbll-000^lllb-011^cdlf-101^lchl-110^lgha-111^llil-010^jhch-000^icld-000^alhl-010^lijj-111^jjca-000^flil-010^jlfj-001^'
    let nn = data?.split("^")
    nn.pop()
    var splitData = [];
    var resultData = []
    for (let i = 0; i < nn?.length; i++) {
        splitData.push(nn[i].split("-")[0])
        resultData.push(nn[i].split("-")[1])
    }
    // addOne('abcd','111')
    // addOne('efhj','000')
    for (let index = 0; index < splitData.length; index++) {
         addOne(splitData[index] , resultData[index])  
    }
    // splitData.forEach((split, i) => {
    //     addOne(split)
    // })
    //console.log(splitData, "splitData length ************");
}
 function textToNum (strGame) {
  // 游戏类型转换
  var msg = {
    a: '1',
    b: '2',
    c: '3',
    d: '4',
    e: '5',
    f: '6',
    g: '7',
    h: '8',
    i: '9',
    j: 'a',
    k: 'c',
    l: '0',
  }
  return msg[strGame]
}
function addOne(item,number) {
    let result = item;
    if (!result) {
        return;
    }
     let rs = result.split("");
     let md = number.split("")
     //console.log(rs,"rs from addOne");
    // if (rs.length !== 12) return;
    let ii = {
        n0: {
            v: textToNum(rs[0]),
            w: textToNum(rs[0]) == '0' ? '0' : 1,
        },
        n1: {
            v: textToNum(rs[1]),
            w: md[0] * 1,
        },
        n2: {
            v: textToNum(rs[2]),
            w: md[1] * 1
        },
        n3: {
            v: textToNum(rs[3]),
            w: md[2] * 1
        },
        // n4: {
        //     v: rs[8],
        //     w: rs[9] * 1,
        // },
        // n5: {
        //     v: rs[10],
        //     w: rs[11] * 1
        // },
    };

    if (ii.n1.w === 1) statistic.value.n1++;
    if (ii.n2.w === 1) statistic.value.n2++;
    if (ii.n3.w === 1) statistic.value.n3++;
    // if (ii.n4.w === 1) statistic.value.n4++;
    // if (ii.n5.w === 1) statistic.value.n5++;
    nnp.value.lst[nnp.value.col] = ii;
    nnp.value.col++;
    if (nnp.value.col >= 19 - 1) {
        nnp.value.lst.shift();
        nnp.value.lst.push({ n0: {w:1,v:1}, n1: {}, n2: {}, n3: {}, n4: {}, n5: {} });
        nnp.value.col--;
    }
}

const initData = () => {
    nnp.value.col = 0;
    nnp.value.lst = [];
    let colsNumUnit = 31;
    for (let i = 0; i < colsNumUnit; i++) {
        nnp.value.lst.push({ n0: {}, n1: {}, n2: {}, n3: {}, n4: {}, n5: {} })
    }
    statistic.value.n0 = 0;
    statistic.value.n1 = 0;
    statistic.value.n2 = 0;
    statistic.value.n3 = 0;
    statistic.value.n4 = 0;
    statistic.value.n5 = 0;
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
.scroll_main {
    @apply w-[calc(100%_-_632px)] min-w-[calc(100%_-_632px)] max-w-[(100%_-_632px)] overflow-x-hidden;
}

.r-section {
    overflow-y: hidden;
    position: relative;
    @apply w-full;
    will-change: transform;
    user-select: none;
    cursor: grabbing;
    /* overflow-x: hidden; */
    overflow-x: scroll;
    /* -ms-overflow-style: none; 
    scrollbar-width: none;   */

    /* width: calc((100vw - 198px)); */
}

/* .r-section::-webkit-scrollbar { 
    display: none;  
} */
.col {
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
.cell {
    border-bottom: 1px solid;
    @apply border-slate-700;
    height: calc(280px / 4);
    width: calc(320px / 4);
}

.cell:last-child {
    border-bottom: 1px solid transparent;
}

.table_wrap {
    /* max-height: calc(100vh - 20rem );
  display:block;
  overflow-y: scroll; */
}

.__table {
    overflow: scroll !important;
}

.y {
    background: #1268F9;
}

.nn-b-d .active {
    background: #E00B17;
}
</style>
