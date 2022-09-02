<template>
    <div class="w-full  flex flex-wrap ">
        <!-- <div v-for="(all,i) in allData" :key="i">
             <singleBjl v-if="all.rType === 'bjl'" :data="all"></singleBjl>
             <singleDragonTiger v-if="all.rType === 'lh'" :data="all"></singleDragonTiger>
             <singleCowCow v-if="all.rType === 'nn'" :data="all"></singleCowCow>
        </div> -->
    </div>
    <div class="w-full">
        <div class="py-2 bg-slate-500 px-3 mx-5 text-xl">{{t('general.bjl')}}</div>
        <div class="w-full overflow-x-scroll whitespace-nowrap  flex scrollbar__">
           <singleBjl v-for="data in bjlData?.fixs" :key="data.roomId" :data="data"></singleBjl>
        </div>
        <div class="py-2 bg-slate-500 px-3 mx-5 text-xl my-3">{{t('general.dragon')}}</div>
        <div class="w-full overflow-x-scroll whitespace-nowrap  flex scrollbar__">
           <singleDragonTiger v-for="data in dragonTiger?.fixs" :key="data.roomId" :data="data"></singleDragonTiger>
        </div>
        <div class="py-2 bg-slate-500 px-3 mx-5 text-xl my-3">{{t('general.cow')}}</div>
        <div class="w-full overflow-x-scroll   flex scrollbar__">
          <singleCowCow v-for="data in cowcowData?.fixs" :key="data.roomId" :data="data" ></singleCowCow>
        </div>
    </div>
</template>

<script setup>
import singleBjl from "@/components/singleBjl.vue";
import singleCowCow from "@/components/singleCowCow.vue";
import singleDragonTiger from "@/components/singleDragonTiger.vue";
import { useI18n } from "vue-i18n/index";
import { useStore } from "vuex";
import pomelo from "@/socket/pomelo.js";
import { ref, onMounted,computed } from 'vue'
// const bjlData = ref(null)
const bjlData = ref(null)
const dragonTiger = ref(null)
const cowcowData = ref(null)
//const allData = ref(null)
const allData = computed(() => store.getters["app/All_Table_Info"]);
const {t} = useI18n();
const store = useStore();
function getDeskLists(type) {
    console.log(type);
    const sendStr = {
        router: 'getDeskLists',
        JsonData: {
            type: type,
            findname: '',
            deskname: ''
        }
    }
    pomelo.send(sendStr, res => {
        // console.log('resp ', res)
        if (res.JsonData.result == 'ok' && res.JsonData.data.length > 0) {
            console.log('resp ', res.JsonData.data)
            //allData.value = res.JsonData.data
             store.commit('app/ALL_TABLE_INFO',res.JsonData.data)
            // console.log('bjlData data ', bjlData.value)
            mergedData(allData.value)
            console.log("rrrrrrrr");
        }
    })
}

   function  mergedData(data) {
      const merged = data?.reduce(
        (r, { rType, ...rest }) => {
          const key = `${rType}`;
          r[key] = r[key] || { rType, fixs: [] };
          let newObj = { rType, ...rest };
          r[key]["fixs"].push(newObj);
          return r;
        },
        {}
      );

      const fixtureData = Object.values(merged);
      const sortData = fixtureData.sort((a, b) => a.rType.localeCompare(b.rType))
      console.log(sortData, "merged data ************");

       bjlData.value = sortData[1]
       dragonTiger.value = sortData[4]
       cowcowData.value = sortData[5]
     // return sortData;
    }
store.commit('app/ALL_TABLE_INFO',null)
onMounted(() => {
    getDeskLists('all')
})
</script>

<style>
.scrollbar__ {
  scrollbar-width: thin;
  scrollbar-color: #debd6b #fff;
   border-radius: 5px;
    /* cursor:crosshair; */
}


/* For Chrome, EDGE, Opera, Others */
.scrollbar__::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  border-radius: 5px;
}

.scrollbar__::-webkit-scrollbar-track { 
  background: #fff;
   border-radius: 5px;
}

.scrollbar__::-webkit-scrollbar-thumb { 
  background:#debd6b;
   border-radius: 5px;
}
</style>