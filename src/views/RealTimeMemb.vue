<template>
    <!-- <div class="  flex whitespace-nowrap    min-w-[1200px]">
    <div class="h-20 flex items-center w-72 mx-2 my-2  ">
      <div class="h-full bg-yellow-500 w-1/2 flex justify-center ">
        <img src="@/assets/images/logo.png" alt="" class="h-full ">
      </div>
      <div class="flex flex-col items-center bg-white text-black font-medium w-1/2 h-full justify-center">
        <p>OnlineUser</p>
        <p>{{onlineUserData?.totalItemsNum?.total || '0'}}</p>
      </div>
    </div>
    <div class="h-20 flex items-center w-72 mx-2 my-2  ">
      <div class="h-full bg-emerald-600 w-1/2 flex justify-center ">
        <img src="@/assets/images/logo.png" alt="" class="h-full ">
      </div>
      <div class="flex flex-col items-center bg-white text-black font-medium w-1/2 h-full justify-center">
        <p>Money</p>
        <p>{{onlineUserData?.totalItemsNum?.money || '0'}}</p>
      </div>
    </div>
    <div class="h-20 flex items-center w-72 mx-2 my-2  ">
      <div class="h-full bg-red-600 w-1/2 flex justify-center ">
        <img src="@/assets/images/logo.png" alt="" class="h-full ">
      </div>
      <div class="flex flex-col items-center bg-white text-black font-medium w-1/2 h-full justify-center">
        <p>H5</p>
        <p>{{onlineUserData?.totalItemsNum?.h5 || '0'}}</p>
      </div>
    </div>
    <div class="h-20 flex items-center w-72 mx-2 my-2  ">
      <div class="h-full bg-blue-600 w-1/2 flex justify-center ">
        <img src="@/assets/images/logo.png" alt="" class="h-full ">
      </div>
      <div class="flex flex-col items-center bg-white text-black font-medium w-1/2 h-full justify-center">
        <p>Android</p>
        <p>{{onlineUserData?.totalItemsNum?.android || '0'}}</p>
      </div>
    </div>
    <div class="h-20 flex items-center w-72 mx-2 my-2  ">
      <div class="h-full bg-cyan-600 w-1/2 flex justify-center ">
        <img src="@/assets/images/logo.png" alt="" class="h-full ">
      </div>
      <div class="flex flex-col items-center bg-white text-black font-medium w-1/2 h-full justify-center">
        <p>Ios</p>
        <p>{{onlineUserData?.totalItemsNum?.ios || '0'}}</p>
      </div>
    </div>
    <div class="h-20 flex items-center w-72 mx-2 my-2  ">
      <div class="h-full bg-orange-600 w-1/2 flex justify-center ">
        <img src="@/assets/images/logo.png" alt="" class="h-full ">
      </div>
      <div class="flex flex-col items-center bg-white text-black font-medium w-1/2 h-full justify-center">
        <p>Pc</p>
        <p>{{onlineUserData?.totalItemsNum?.pc || '0'}}</p>
      </div>
    </div>
  </div> -->
    <div class="w-full min-w-[1200px] max-w-full   ">
        <div class="py-3 flex items-center bg-slate-600 px-3 space-x-3">
            <span class="px-2">{{t('route.OnlineMembers')}}</span>
            <input v-model="account" id="name" type="name" autocomplete="off" name="name" class="
      text-sm placeholder-gray-500 text-gray-500  px-2 
        w-80 py-2 focus:outline-none outline-none" :placeholder="t('message.enter_account')" />
            <span class="px-2">{{t('bet_record.table')}}</span>
            <input v-model="teskNum" id="name" type="name" autocomplete="off" name="name" class="
      text-sm placeholder-gray-500 text-gray-500  px-2 
        w-80 py-2 focus:outline-none outline-none" placeholder="请输入账号" />
            <div>
                <button @click="doFind()" type="submit"
                    class="bg-[#473903] shadow-md py-[6px] px-9 rounded outline-none focus:outline-none ease-in hover:bg-[#7c6405] ">{{t('buttons.search')}}</button>
            </div>
        </div>
        <section class="w-full min-w-full __tableHeight ">
            <div class="flex flex-wrap h-full">
                <div class="w-full h-full ">
                    <div class="max-w-full min-w-full overflow-x-auto h-full">
                        <table class="border-collapse table-fixed   border-none w-full  __table ">
                            <thead class="text-center border-b bg-slate-500  sticky top-0 h-full py-2">
                                <tr class="text-center ">
                                    <th class="border border-slate-600  font-bold">{{t('bet_record.game')}}</th>
                                    <th class="border border-slate-600  font-bold">{{t('bet_record.settle_time')}}</th>
                                    <th class="border border-slate-600    font-bold w-16">{{t('bet_record.table')}}</th>
                                    <th class="border border-slate-600  font-bold">局口</th>
                                    <th class="border border-slate-600  font-bold">{{t('bet_record.account')}}</th>
                                    <th class="border border-slate-600  font-bold">{{t('bet_record.bet_info')}}</th>
                                    <th class="border border-slate-600  font-bold">{{t('online_page.total_bet')}}</th>
                                    <th class="border border-slate-600  font-bold">{{t('online_page.balance')}}</th>
                                    <th class="border border-slate-600  font-bold">{{t('online_page.bet_ip')}}</th>
                                    <th class="border border-slate-600 text-white font-bold w-16">{{t('online_page.device')}}</th>
                                    <!-- <th class="border border-slate-600 text-indigo-200  font-bold">闲</th>
                <th class="border border-slate-600 text-green-300 font-bold">和</th>
                <th class="border border-slate-600 text-red-400 font-bold">庄对</th>
                <th class="border border-slate-600 text-indigo-200 font-bold">闲对</th>
                <th class="border border-slate-600 text-indigo-200 font-bold">闲对</th> -->
                                </tr>
                            </thead>
                            <tbody v-if="onlineMemb?.tableData" class="text-center  overflow-scroll      ">
                                <tr v-for="(bet, index) in onlineMemb.tableData" :key="index" class="h-12">
                                    <td class="border border-slate-600  text-white  ">{{bet.gameType}}</td>
                                    <td class="border border-slate-600  text-white">{{bet.betTime}}</td>
                                    <td class="border border-slate-600  text-white">{{bet.tableNum}}</td>
                                    <td class="border border-slate-600  text-white">{{bet.cc}}</td>
                                    <td class="border border-slate-600  text-white">{{bet.memberName}}</td>

                                    <td class="border border-slate-600  text-indigo-200 pb-2">
                                        <div v-if="bet.rType === 'dx' || bet.rType === 'ssc'
                        || bet.rType === 'jsk3'
                        || bet.rType === 'bjcs' || bet.rType === 'tts' ||
                        bet.rType === 'bjl' || bet.rType === 'lh'" style="display: flex; justify-content: flex-start;"
                                            :style="bet.showResult.length > 3 ? 'overflow-x: scroll' : ''">
                                            <div v-for="(item, inde) in bet.showResult" :key="inde"
                                                style="white-space: nowrap; margin: 0 5px;">
                                                <span
                                                    :style="(item.indexOf('庄') !== -1 || item.indexOf('龙') !== -1 ||
                                item.indexOf('大') !== -1 || item.indexOf('双') !== -1)
                                ? 'color: red'
                                : (item.indexOf('闲') !== -1 || item.indexOf('虎') !== -1 ||
                                    item.indexOf('单') !== -1 || item.indexOf('小') !== -1)
                                    ? 'color: rgb(96 165 250)'
                                    : (item.indexOf('和') !== -1 || item.indexOf('同点') !== -1) ? 'color: rgb(134 239 172)' : ''">
                                                    <span v-if="bet.rType === 'bjl'">
                                                        {{ item }}
                                                    </span>
                                                    <span v-if="bet.rType === 'lh'">
                                                        {{ item }}
                                                    </span>
                                                    <span v-if="bet.rType === 'dx'">
                                                        {{ item }}
                                                    </span>
                                                    <span v-if="bet.rType === 'tts'">
                                                        {{ item }}
                                                    </span>
                                                </span>
                                            </div>
                                        </div>

                                        <div v-if="bet.rType === 'nn'" class="nn_info ">
                                            <div class="">
                                                <span v-for="(n, index) in bet.niuniu" :key="index"
                                                    class="nn_info_container">
                                                    <p class="nn_info_title"
                                                        :style="n.indexOf('闲') != -1 ? 'color: blue' : 'color: red'">
                                                        {{ n }}
                                                    </p>
                                                </span>
                                            </div>
                                            <div>
                                                <span v-for="(n, i) in bet.niuniuBet" :key="i"
                                                    class="nn_info_container">
                                                    <p class="nn_info_bet_show">
                                                        {{ n }}
                                                    </p>
                                                </span>
                                            </div>
                                            <div v-if="bet.niuniuResult" style="margin-left: 5px;">
                                                <span v-for="(n, i) in bet.nnWinLose" :key="i"
                                                    class="nn_info_container">
                                                    <span v-if="n === '输'" class="nn_info_bet_show"
                                                        style="color: #FF1744">{{t('table.lose')}}</span>
                                                    <span v-else class="nn_info_bet_show"
                                                        style="color: #00C853">{{t('table.win')}}</span>
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="border border-slate-600  text-white ">{{bet.betMoney}}</td>
                                    <td class="border border-slate-600  text-white">{{bet.aBalance}}</td>
                                    <td class="border border-slate-600  text-white">{{bet.ip}}</td>
                                    <td class="border border-slate-600  text-white">{{bet.terminal}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
        <!-- <Pagination :totalItems="onlineMemb.totalItem" :pageItems="pageSize"></Pagination> -->
        <!-- <div class="flex justify-center items-center">
     <div v-if="onlineMemb?.tableData.length > 0" class="flex justify-center items-center space-x-5 w-fit px-4 cursor-pointer  ">
        <span  @click="loadmore(1)" :class="pagination.currentPage === 1 ? 'hidden' : 'block'" class="text-white bg-red-500 px-3 hover:text-blue-600 font-bold tracking-wide">First</span>
        <span @click="loadmore(2)" :class="pagination.currentPage === 1 ? 'hidden' : 'block'" class="text-white hover:text-blue-600 bg-red-500 px-3 font-bold tracking-wide">Prev</span>
        <button class="rounded-lg w-fit px-2 py-1 bg-primary text-white">{{pagination.currentPage}}</button>
        <span @click="loadmore(3)" :class="Math.ceil(pagination.total / pagination.pageSize) > pagination.currentPage ? 'block' : 'hidden'" class="text-gray-200 bg-red-500 px-3 hover:text-blue-600 font-bold tracking-wide">Next</span>
        <span @click="loadmore(4)" :class="Math.ceil(pagination.total / pagination.pageSize) > pagination.currentPage ? 'block' : 'hidden'" class="text-gray-200 bg-red-500 px-3 hover:text-blue-600 font-bold tracking-wide">Last</span>
      </div>
      </div> -->
        <div v-if="onlineMemb?.tableData.length > 0" class="flex items-center justify-center">
            <Paginate v-model="pagination.currentPage" :page-count="Math.ceil(pagination.total / pagination.pageSize)"
                :page-range="3" :margin-pages="1" :click-handler="clickCallback" :prev-text="'Prev'" :next-text="'Next'"
                :container-class="'pagination'" :hide-prev-next="true" :page-class="'page-item'" :first-last-button	="true"
                class="flex items-center space-x-4" :no-li-surround="true" :page-link-class="'page-link'"
                :active-class="'active-class'">


            </Paginate>
        </div>
        <!-- <Pagination v-model="pagination.currentPage" :records="pagination.total" :per-page="pagination.pageSize" @paginate="myCallback"/> -->

    </div>
</template>

<script setup>
import { ref,reactive,onMounted,onBeforeUnmount,shallowRef } from 'vue'

import TestTable from '../components/testTable.vue'
import pomelo from "@/socket/pomelo.js";
import moment from 'moment'
import global from '@/utils/global';
// import Pagination from '@/components/Pagination.vue';
import Paginate from "vuejs-paginate-next";
import { useI18n } from "vue-i18n/index";

// import Pagination from 'v-pagination-3';

const account = ref('')
const teskNum = ref('')
const {t} = useI18n();

// const currentPage = ref(1)
// const pageSize = ref(10)
const interval = ref(null)
const onlineMemb = ref(null)

const pagination = reactive({
  pageSize: 10,
  currentPage: 1,
  total:0,
});

 onBeforeUnmount(() => {
    clearInterval(interval.value)
    interval.value = null
})

 onMounted(() => {
  getOnTime()
 requestDataEveryFiveSec()
 })
  
  const myCallback = (pageNum) => {
    console.log(pageNum,"from mycall of mycall of mycall of mycall of mycall of mycall of");
  }

const clickCallback = (pageNum) =>{
    console.log(pageNum , "from click callback");
    getOnTime()
}

function requestDataEveryFiveSec() {
  interval.value = setInterval(() => {
    getOnTime()
    console.log("5 log second");
  }, 5000);
  // }
}

 function doFind() {
  getOnTime()
 }



function transTime (times) {
  moment.suppressDeprecationWarnings = true;
  return moment(times).format('YYYY-MM-DD HH:mm:ss')
}

const loadmore = (index) => {
  switch (index) {
    case 1:
      pagination.currentPage = 1;
       getOnTime()
      break;
    case 2:
      if (pagination.currentPage > 1) {
        pagination.currentPage -= 1;
         getOnTime()
      }
      break;
    case 3:
      if( Math.ceil(pagination.total / pagination.pageSize) > pagination.currentPage) {
        pagination.currentPage += 1;
         getOnTime()
      }
      break;
    case 4:
     pagination.currentPage = Math.ceil(pagination.total / pagination.pageSize)
      getOnTime()
      break;

    default:
      break;
  }
};
  
function getOnTime() {
    const findName = account.value.trim()
    const sendStr = {
        router: 'getOnTimeBet',
        JsonData: {
            Id: 1,
            findname: findName,
            teskNum: teskNum.value.trim() || '',
            pageSize: pagination.pageSize,
            currentPage: pagination.currentPage
        }
    }
    pomelo.send(sendStr, res => {
        console.log(res,"res is ***********");
        var data = res.JsonData
        var betOrderInquireForm = { tableData: [], totalItemsNum: 0 }
        var tableData = betOrderInquireForm.tableData
        for (var i = 0; i < data.length; i++) {
            tableData[i] = {}
            tableData[i].orderId = i + 1
            tableData[i].name = data[i].name
            tableData[i].rType = data[i].rType
            tableData[i].gameType = global.transGameStr(data[i].rType)
            tableData[i].betTime = transTime(data[i].time)
            tableData[i].tableNum = data[i].roomName
            tableData[i].cc = data[i].cc
            tableData[i].memberName = data[i].name
            tableData[i].betOrderInfo = global.trasBetResult(data[i].rType, data[i].xzmx)
            tableData[i].betMoney = data[i].xz
            tableData[i].aBalance = data[i].ye
            tableData[i].ip = data[i].ip // 权限表
            tableData[i].terminal = data[i].terminal
            let resultData = global.betInfoData(data[i].xzmx, tableData[i].rType)
            tableData[i].niuniu = resultData[0]
            tableData[i].niuniuBet = resultData[1]
            tableData[i].showResult = tableData[i].niuniu.map((item, index) => {
                return item + ':' + tableData[i].niuniuBet[index]
            })
            tableData[i].tablePara = global.getTablePara(
                data[i].rType,
                tableData[i].betOrderInfo
            )
        }
        //mapIP(betOrderInquireForm.tableData)
        betOrderInquireForm.totalItemsNum = res?.totalItem
        pagination.total = betOrderInquireForm.totalItemsNum
        
        onlineMemb.value = betOrderInquireForm
        //store.commit('ht/setBetOrderInquireForm', betOrderInquireForm)
    })
}
</script>

<style scoped>
  /* @import "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"; */

.__tableHeight{
    height: calc(100vh - 200px);
}

.nn_info{
  display: flex;
  justify-content: flex-start;
}
.nn_info_container{
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
}
.nn_info_title{
  width: auto;
  height: 20px;
  padding: 2px;
  margin: 3px;
}
.nn_info_bet_show{
  width: auto; height: 20px; padding: 2px; margin: 3px;
}

  .pagination {
     @apply  px-4 py-3 text-white;
  }

</style>

<style>
.page-item  {
    @apply  px-4 py-2 bg-[#473903]
  }
  .page-link{
    /* background: red !important; */
    @apply bg-[#473903] px-4 py-2
  }
  .active-class{
    display :inline-block;
    color:#fff;
    @apply bg-[#151515] !important;
    
  }
</style>