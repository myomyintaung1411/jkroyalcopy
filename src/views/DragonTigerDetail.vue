<template>
    <div class="  bg-slate-700 w-full overflow-x-hidden   ">
        <div v-if="data" class="w-full flex">
            <singleDragonTiger :data="data" ></singleDragonTiger>
            <div  class=" scroll_main bg-slate-800 overflow-y-hidden relative">
                <div @click="moveData()"
                    class="dl-section r-section text-white whitespace-nowrap scrollbar__   h-full overflow-y-hidden  ">
                    <!-- {{dl.lst}} -->
                    <div class="col c2  h-52   text-center  " v-for="(col, iCol) in dl.lst" :key="iCol">
                        <div class="cell w-[45px] text-center overflow-hidden " v-for="(c, iRow) in col" :key="iRow">

                            <img v-if="c >= 100" :src="'/static/img/dl-' + c + '.png'" alt=""
                                class="h-[100%] ml-1  align-top">
                        </div>
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
                :container-class="'pagination'" :hide-prev-next="true" :page-class="'page-item'" :first-last-button	="true"
                class="flex items-center space-x-4" :no-li-surround="true" :page-link-class="'page-link'"
                :active-class="'active-class'">

            </Paginate>
     </div>
   </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed,onBeforeUnmount } from 'vue'
import pomelo from "@/socket/pomelo.js";
import { useRoute } from 'vue-router';
import singleDragonTiger from "../components/singleDragonTiger.vue";
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
    banker: 0,
    player: 0,
    tie: 0,
    bPair: 0,
    pPair: 0,
})

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
            type: 'lh',
            findname: '',
            dragonRoomId: route.query.deskname,
            pageSize: pagination.pageSize,
            currentPage: pagination.currentPage
        }
    }
    pomelo.send(sendStr, res => {
        console.log('resp ', res)
        data.value = res.JsonData.data[0]
        __dataFormat(res.JsonData.bets)
        roadData.value = res.JsonData.data[0].road
        _roadDataModifed(res.JsonData.data[0].road)
        pagination.total = res.JsonData?.totalItem //pagination total
        //betsData.value = res.JsonData.bets
    })
}
callMoreData()


function requestDataEveryFiveSec() {
        timing.value = setInterval(() => {
            initData()
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
    let nn = data?.split("^")
     nn.pop()
    var splitData = [];
    for (let i = 0; i < nn?.length; i++) {
        splitData.push(nn[i].substring("0")[0])
    }
    splitData.forEach((split, i) => {
        addOne(split)
    })
    console.log(splitData, "splitData length ************");
}

//   function TwoDimensional(arr, size) 
//     {
//       var res = []; 
//       for(var i=0;i < arr.length;i = i+size)
//       res.push(arr.slice(i,i+size));
//       console.log(res,"from TwoDimensional");
//       addOne(res)
//       return res;
//     }

function addOne(item) {
    //console.log(item, 'adding one item... ******');
    let result = item
    if (!result)//first letter of result H
    {
        return
    }

    let zpIdx = 0
    if (result == 'a') { // dragon
        zpIdx = 100
        statistic.value.banker++
    } else if (result == 'c') { //tiger
        zpIdx = 200
        statistic.value.player++
    } else if (result == 'b') { //tie
        zpIdx = 300
        statistic.value.tie++
    }
    // if (result == 'b') {
    //     zpIdx = 100
    //     zpIdx += 1
    //     statistic.value.banker++
    //     statistic.value.pPair++
    // }
    // if (result == 'c') {
    //     zpIdx = 100
    //     zpIdx += 10
    //     statistic.value.banker++
    //     statistic.value.bPair++
    // }
    // if (result == 'd') {
    //     zpIdx = 100
    //     zpIdx += 10
    //     zpIdx += 1
    //     statistic.value.banker++
    //     statistic.value.bPair++
    //     statistic.value.pPair++
    // }

    // if (result == 'f') {
    //     zpIdx = 200
    //     zpIdx += 1
    //     statistic.value.player++
    //     statistic.value.pPair++
    // }
    // if (result == 'g') {
    //     zpIdx = 200
    //     zpIdx += 10
    //     statistic.value.player++
    //     statistic.value.bPair++
    // }
    // if (result == 'h') {
    //     zpIdx = 200
    //     zpIdx += 1
    //     zpIdx += 10
    //     statistic.value.player++
    //     statistic.value.pPair++
    //     statistic.value.bPair++
    // }
    // if (result == 'j') {
    //     zpIdx = 300
    //     zpIdx += 10
    //     statistic.value.tie++
    //     statistic.value.pPair++
    // }
    // if (result == 'k') {
    //     zpIdx = 300
    //     zpIdx += 1
    //     statistic.value.tie++
    //     statistic.value.bPair++
    // }
    // if (result == 'l') {
    //     zpIdx = 300
    //     zpIdx += 10
    //     zpIdx += 1
    //     statistic.value.tie++
    //     statistic.value.bPair++
    //     statistic.value.pPair++
    // }

    zp.value.lst[zp.value.col][zp.value.row] = zpIdx
    zp.value.lst, zp.value.col, zp.value.lst[zp.value.col]
    console.log("updating ....... addOne with the this.$set() method");
    if (++zp.value.row >= 6) {
        zp.value.col++
        zp.value.row = 0
        console.log(zp.value, "this.zp.row >= 6 1229 ************ of zp list");
    }

    if (zp.value.col >= 20 - 2) {
        zp.value.lst.shift() //remove first element
        zp.value.lst.push([0, 0, 0, 0, 0, 0])//append to end of array
        zp.value.col--
    }
    let dlIdx = Math.floor(zpIdx / 100)
    console.log("dlidx inside of addOne method ***** = " + dlIdx);
    addOneDl(dlIdx)
}
function addOneDl(dlIdx, ask = false) {
    console.log(dlIdx + "  dlidx index : LINE 1413 ********* " + ask);
    let param = {}
    let pIdx = Math.floor(dl.value.lst[dl.value.pc][dl.value.pr] / 100)
    //console.log(pIdx + "  PIDX OF 1416:******************* ");
    if (dlIdx === 3) {
        if (dl.value.lst[dl.value.pc][dl.value.pr] % 10 < 9) { // tie adding untial less than 9
            dl.value.lst[dl.value.pc][dl.value.pr] += 1
            //console.log("dlIdx is 3 then logging :" + dl.value.lst);
        }
        // console.log(dl.value.lst, "dl lst log *********** 1420");
    } else {
        if (pIdx === dlIdx) {
            // console.log("inside of equal pidx and dlidx", pIdx, dlIdx);
            if (dl.value.row > 5 || dl.value.lst[dl.value.col][dl.value.row] > 0 || dl.value.cl) {
                //console.log(dl.value.row, dl.value.col + "in line 1442 of row greater than 5 ***********");
                dl.value.row--
                dl.value.col++
                dl.value.cl = true
                dl.value.clNum++
            }
            if (!ask) dl.value.stat[dl.value.pointCol]++; //console.log("if (!ask) dl.value.stat[dl.value.pointCol]++", dl.value.stat[dl.value.pointCol]);
        } else {
            dl.value.col = dl.value.nc
            dl.value.row = 0
            dl.value.cl = false
            dl.value.clNum = 0
            //console.log("not equal pidx and dlidx ***********  ", dl.value.col);
            if (!ask) {
                dl.value.pointCol = dl.value.nc
                dl.value.stat[dl.value.pointCol] = 1
                // console.log("not equal pidx and dlidx  if (!ask) { ***********  ", dl.value.pointCol);

            }

        }

        if (dl.value.col < 0) dl.value.col = 0; //console.log("if (dl.value.col < 0) *****");
        if (ask === true) {
            dl.value.lst[dl.value.col][dl.value.row] = dlIdx * -100

            // console.log(dlIdx * -100, "1466 dlIdx * -100 **** ask === true");
            if (dlIdx === 1) {
                dl.value.ab.row = dl.value.row
                dl.value.ab.col = dl.value.col
                //   console.log("dlIdx === 1 in line 1470 *********" + dl.value.row, dl.value.col);
            } else {
                dl.value.ap.row = dl.value.row
                dl.value.ap.col = dl.value.col
                // console.log("dlIdx != 1 in line 1474 *********" + dl.value.row, dl.value.col);
            }
        } else {
            dl.value.lst[dl.value.col][dl.value.row] = dlIdx * 100
            // console.log(dlIdx * 100, "1466 dlIdx * -100 **** ask === FALSE");
            dl.value.good = 0
            if (dl.value.cl) {
                // console.log("  if (dl.value.cl)  true *******");
                dl.value.good = 4
                if (dl.value.col >= 3) {
                    //   console.log(dl.value.col + " if (dl.value.col >= 3)  greater than 3 *************");
                    let clp = parseChangLong(dl.value.lst, dl.value.col, dl.value.row, 2)
                    if (clp.col >= 2 && clp.num > 3 && dl.value.lst[clp.col - 1][1] === 0) {
                        // console.log("if (clp.col >= 2 && clp.num > 3 && dl.value.lst[clp.col - 1][1] === 0) " + clp);
                        let cln = parseChangLong(dl.value.lst, clp.col - 2, 0, 0)
                        if (cln.num !== -1 && cln.num > 3) dl.value.good = 5; //console.log("if (cln.num !== -1 && cln.num > 3) *****" + cln);
                    }
                }
            } else if (dl.value.row >= 3) {
                //console.log(dl.value.row + " (dl.value.row >= 3) dl.value.row greater than 3 *************");

                dl.value.good = 4
                if (dl.value.col >= 2 && dl.value.lst[dl.value.col - 1][1] === 0) {
                    //console.log("if (dl.value.col >= 2 && dl.value.lst[dl.value.col - 1][1] === 0) ******" + dl);

                    let cl = parseChangLong(dl.value.lst, dl.value.col - 2, 0, 0)
                    if (cl.num !== -1 && cl.num > 3) dl.value.good = 5;// console.log("if (cl.num !== -1 && cl.num > 3)*******" + cl);
                }
            } else if (dl.value.row === 2) {
                //console.log(dl.value.row + "  if (dl.value.row === 2) dl.value.row equal to 2 *************");
                if (dl.value.col >= 3) {
                    //console.log(dl.value.col + "dl.value.col GREATER than 3 *************");
                    if (dl.value.lst[dl.value.col - 1][2] === 0
                        && dl.value.lst[dl.value.col - 1][1] > 0
                        && dl.value.lst[dl.value.col - 2][3] === 0
                        && dl.value.lst[dl.value.col - 2][2] > 0
                        && dl.value.lst[dl.value.col - 3][2] === 0
                        && dl.value.lst[dl.value.col - 3][1] > 0) {
                        dl.value.good = 3
                    }
                }
            } else if (dl.value.row === 1) {
                //console.log(dl.value.row + " if (dl.value.row === 1)  dl.value.row equal to 1 *************");

                if (dl.value.col >= 3) {
                    // console.log(dl.value.col + "if (dl.value.col >= 3)  dl.value.col GREATER THAN to 3*************");

                    if (dl.value.lst[dl.value.col - 1][1] === 0
                        && dl.value.lst[dl.value.col - 2][1] > 0
                        && dl.value.lst[dl.value.col - 2][2] === 0
                        && dl.value.lst[dl.value.col - 3][1] === 0) {
                        dl.value.good = 2
                    }
                }
            } else if (dl.value.row === 0) {
                //console.log(dl.value.row + "if (dl.value.row === 0)  dl.value.row eqaul to zero *************");

                if (dl.value.col >= 3) {
                    // console.log(dl.value.col + " dl.value.col GREATER THAN to 3*************");

                    if (dl.value.lst[dl.value.col - 1][1] === 0
                        && dl.value.lst[dl.value.col - 2][1] === 0
                        && dl.value.lst[dl.value.col - 3][1] === 0) {
                        dl.value.good = 1
                    }
                }
            }
        }
        dl.value.pr = dl.value.row
        dl.value.pc = dl.value.col
        if (dl.value.row === 0) dl.value.nc++
        dl.value.row++
        //console.log("  if (dl.value.row === 0) ********" + dl.value.pr + dl.value.pc + dl.value.nc + dl.value.row);
    }


    if (dl.value.col >= 20 * 2 - 2 && !ask) {
        // console.log(" if (dl.value.col >= 20 * 2 - 2 && !ask)" + dl.value.col);
        dl.value.lst.shift()
        dl.value.lst.push([0, 0, 0, 0, 0, 0])
        dl.value.col--
        dl.value.pc--
        dl.value.nc--
    }
    // debugger
}

function parseChangLong(lst, col, row, cl) {
    console.log(lst, col, row, cl, "parseChangLong ************* LINE 1366");
    let define = Math.floor(lst[col][row] / 100)
    console.log("define *********: " + define);
    if (define === 0) {
        console.log(" if (define === 0) define *********: is zero " + define);
        return { num: -1, col: 0, row: 0 }
    }
    let num = 1
    let iCol = col
    let iRow = row
    if (cl === 0) {
        while (++iRow) {
            if (Math.floor(lst[iCol][iRow]) !== define) {
                iRow--
                break
            }
            num++
        }
        console.log(iRow, iCol, " inside of cl == 0 *********** parseChangLong line 1389");  //
        while (++iCol) {
            if (Math.floor(lst[iCol][iRow]) !== define) {
                iCol--
                break
            }
            num++
        }

    } else {

        if (cl === 2) {
            while (--iCol) {
                if (Math.floor(lst[iCol][iRow]) !== define) {
                    iCol++
                    break
                }
                num++
            }
            console.log(iRow, iCol, " inside of cl == 2 *********** parseChangLong line 1389");  //
        }
        while (--iRow >= 0) num++
        iRow++
    }

    return {
        num: num,
        col: iCol,
        row: iRow
    }
}
const initData = () => {
    zp.value.col = zp.value.row = 0
    zp.value.lst = []
    let colsNumUnit = 32
    for (let i = 0; i < colsNumUnit; i++) {
        zp.value.lst.push([0, 0, 0, 0, 0, 0])
    }
    dl.value.col = dl.value.row = 0
    dl.value.lst = []
    dl.value.pr = dl.value.pc = dl.value.nc = 0
    dl.value.cl = false
    // dl.value.clNum = 0
    dl.value.stat = {}
    dl.value.pointCol = 0
    for (let i = 0; i < colsNumUnit * 2; i++) {
        dl.value.lst.push([0, 0, 0, 0, 0, 0])
    }
    statistic.value.banker = 0
    statistic.value.player = 0
    statistic.value.tie = 0
    statistic.value.bPair = 0
    statistic.value.pPair = 0
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
    @apply w-[calc(100%_-_500px)] min-w-[calc(100%_-_500px)] max-w-[(100%_-_500px)] overflow-x-hidden;
}

.r-section {
    overflow-y: hidden;
    position: relative;
    @apply w-full;
    will-change: transform;
    user-select: none;
    cursor: grabbing;
    overflow-x: scroll;
    /* overflow-x: hidden; */
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
    height: calc(208px / 6);
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
</style>
