<template>
    <div class="w-full  flex flex-wrap ">
        <singleDragonTiger v-for="data in lhData" :key="data.roomId" :data="data"></singleDragonTiger>
        <!-- <singleBjl v-for="data in bjlData" :key="data.roomId" :data="data" ></singleBjl> -->
    </div>
</template>

<script setup>
import singleDragonTiger from "@/components/singleDragonTiger.vue";
import pomelo from "@/socket/pomelo.js";
import { ref, onMounted,computed } from 'vue'
import { useStore } from "vuex";
const store = useStore();

//for props data
const lhData = computed(() => store.getters["app/All_Table_Info"]);

//const lhData = ref(null)

function getDragonTiger(type) {
    console.log(type);
    const sendStr = {
        router: 'getDeskLists',
        JsonData: {
            type: type,
            findname: '',
            deskname: ''
        }
    }
    console.log(sendStr + "sendStr");
    pomelo.send(sendStr, res => {
        console.log(res,"res from dragontiger");
        console.log(res.JsonData?.result + 'res of dragontiger ************') ;
        if (res.JsonData.result == 'ok' && res.JsonData?.data.length > 0) {
            console.log('resp ', res.JsonData.data)
            //lhData.value = res.JsonData.data
            store.commit('app/ALL_TABLE_INFO',res.JsonData.data)
            // console.log('bjlData data ', bjlData.value)
            console.log("rrrrrrrr");
        }
    })
}
//null in created otherwise errors occured
store.commit('app/ALL_TABLE_INFO',null)
onMounted(() => {
    getDragonTiger('lh')
})
</script>

<style>
</style>