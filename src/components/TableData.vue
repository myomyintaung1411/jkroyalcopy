<template>
    <div class=" mt-2  table_wrap w-full min-w-[1350px] max-w-full touch-none  ">
        <table class=" table-auto w-full  __table  ">
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
            <tbody class="text-center">
                <tr v-for="(bet, index) in betsData" :key="index" class="h-12">
                    <td class="border border-slate-600 text-xl font-bold   text-white ">{{ transGameStr(bet.rType)
                    }}</td>
                    <td class="border border-slate-600  text-white  ">{{ bet.time }}</td>
                    <td class="border border-slate-600  text-white">{{ bet.roomName }}</td>
                    <td class="border border-slate-600  text-white">{{ bet.cc }}</td>
                    <td class="border border-slate-600  text-white">{{ bet.name }}</td>
                    <td class="border border-slate-600  text-indigo-200 pb-2">
                        <div v-if="bet.rType === 'dx' || bet.rType === 'ssc'
                        || bet.rType === 'jsk3'
                        || bet.rType === 'bjcs' || bet.rType === 'tts' ||
                        bet.rType === 'bjl' || bet.rType === 'lh'"
                            style="display: flex; justify-content: flex-start;"
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
                            <!-- <span v-if="bet.niuniuResult" style="position: absolute; right: 5px; top: 5px;">
                <el-popover
                  placement="top-start"
                  :title="$t('table.result_detail')"
                  width="200"
                  trigger="hover"
                  :content="${$t('table.first_gate')} = ${bet.result.split('|')[0]}; 
                  ${$t('table.second_gate')} = ${bet.result.split('|')[1]}; 
                  ${$t('table.third_gate')} = ${bet.result.split('|')[2]}"
                >
                  <el-button slot="reference" icon="el-icon-question" circle size="mini" />
                </el-popover>
              </span> -->
                            <div class="">
                                <span v-for="(n, index) in bet.niuniu" :key="index" class="nn_info_container">
                                    <p class="nn_info_title"
                                        :style="n.indexOf('闲') != -1 ? 'color: lightblue' : 'color: red'" >
                                        {{ n }}
                                    </p>
                                </span>
                            </div>
                            <div>
                                <span v-for="(n, i) in bet.niuniuBet" :key="i" class="nn_info_container">
                                    <p class="nn_info_bet_show">
                                        {{ n }}
                                    </p>
                                </span>
                            </div>
                            <div v-if="bet.niuniuResult" style="margin-left: 5px;">
                                <span v-for="(n, i) in bet.nnWinLose" :key="i" class="nn_info_container">
                                    <span v-if="n === '输'" class="nn_info_bet_show" style="color: #FF1744">{{t('table.lose')}}</span>
                                    <span v-else class="nn_info_bet_show" style="color: #00C853">{{t('table.win')}}</span>
                                </span>
                            </div>
                        </div>
                    </td>
                    <!-- <td class="border border-slate-600  text-indigo-200">{{xzmx(bet.xzmx,bet.rType)}}</td> -->
                    <td class="border border-slate-600  text-white ">{{ bet.xz }}</td>
                    <td class="border border-slate-600  text-white">{{ bet.ye }}</td>
                    <td class="border border-slate-600  text-white">{{ bet.ip }}</td>
                    <td class="border border-slate-600  text-white">{{ bet.terminal }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import {ref,computed} from 'vue'
import { useStore } from "vuex";
import { useI18n } from "vue-i18n/index";
const store = useStore()
const {t} = useI18n();

const betsData = computed(() => store.getters["app/Table_BetData"]);
function transGameStr(strGame) {
    // 游戏类型转换
    var msg = {
        bjl: '百家乐',
        lh: '龙虎',
        nn: '牛牛',
        xjh: '炸金花',
        dx: '大小',
        tts: '推筒子',
        ssc: '时时彩',
        jsk3: '江苏快3',
        bjcs: '北京赛车'
    }
    return msg[strGame]
}

</script>

<style scoped>
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
.table_wrap{
    height: calc(100vh - 400px);
    overflow-x: auto;
}
</style>