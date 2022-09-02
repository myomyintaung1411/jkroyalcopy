

<template>
  <div class="w-full h-screen relative">
    <div class="flex  h-screen w-full overflow-y-hidden ">
      <div class="max-w-sm w-60  bg-slate-800 h-screen drawer_bg relative overflow-y-hidden ">
        <div class="text-center flex flex-col justify-center items-center p-5">
          <img src="@/assets/images/logo.png" class="max-w-[220px] h-32 max-h-32" alt="logo">
          <h1 class="text-2xl font-bold tracking-wider text-center pt-3 text-white">{{ t('general.title') }}</h1>
        </div>
        <!-- <div class=" px-2 w-full text-xl">
          <p class="tracking-wide">{{t('general.lang')}}</p>
          <div class="flex py-2">
              <RadioGroup v-model="lang" @click="changeLanguage()">
                <div class=" flex space-x-2">
                  <RadioGroupOption as="template" value="en" v-slot="{ active, checked }">
                    <div :class="[
                active
                  ? ''
                  : '',
                checked ? 'bg-white bg-opacity-75 text-white ' : 'bg-slate-500  ',
              ]" class="relative text-white flex w-fit px-7 py-1 rounded-lg shadow-md cursor-pointer focus:outline-none">
                      <div class="flex items-center justify-between w-full">
                        <div class="flex items-center">
                          <div class="text-sm flex items-center justify-center space-x-3 w-fit">
                            <RadioGroupLabel as="p" :class="checked ? 'text-white' : 'text-white'" class="font-medium w-fit" >{{t('general.en')}}</RadioGroupLabel>
                          </div>
                        </div>
                      </div>
                    </div>
                  </RadioGroupOption>
                  <RadioGroupOption as="template" value="cz" v-slot="{ active, checked }">
                    <div :class="[
                active
                  ? ''
                  : '',
                checked ? 'bg-white bg-opacity-75 text-white ' : 'bg-slate-500  ',
              ]" class="relative text-white flex w-fit px-7 py-1 rounded-lg shadow-md cursor-pointer focus:outline-none">
                      <div class="flex items-center justify-between w-full">
                        <div class="flex items-center">
                          <div class="text-sm flex items-center justify-center space-x-3 w-fit">
                            <RadioGroupLabel as="p" :class="checked ? 'text-white' : 'text-white'" class="font-medium w-fit">{{t('general.cz')}}</RadioGroupLabel>
                          </div>
                        </div>
                      </div>
                    </div>
                  </RadioGroupOption>
                </div>
              </RadioGroup>
          </div>
        </div> -->
        <div class="py-2 w-full" @click="clickData(0)">
          <div class=" cursor-pointer">
            <div class="w-full h-14 px-3 rounded bg-slate-400 text-white 
          hover:text-[#debd6b] hover:bg-slate-500 text-center shadow-xl ease-in duration-300 
          hover:rounded-tl-3xl hover:rounded-bl-3xl cursor-pointer" :class="activeTab === 0 ? '__activeColor' : '__bgItem'">
              <div class="flex items-center space-x-5 h-full">
                <img src="@/assets/images/all.svg" class="w-14 h-14 text-[#e4cd76]" alt="">
                <p class="text-2xl tracking-wide font-bold">{{ t('general.all') }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="py-2 w-full" @click="clickData(1)">
          <div class=" cursor-pointer">
            <div class="w-full h-14 px-3 rounded bg-slate-400 text-white 
          hover:text-[#debd6b] hover:bg-slate-500 text-center shadow-xl ease-in duration-300 
          hover:rounded-tl-3xl hover:rounded-bl-3xl cursor-pointer" :class="activeTab === 1 ? '__activeColor' : '__bgItem'">
              <div class="flex items-center space-x-5 h-full">
                <img src="@/assets/images/baccarat.svg" class="w-14 h-14 text-[#e4cd76]" alt="">
                <p class="text-2xl tracking-wide font-bold">{{ t('general.bjl') }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="py-2 w-full" @click="clickData(2)">
          <div class=" cursor-pointer">
            <div class="w-full h-14 px-3 rounded bg-slate-400 text-white 
          hover:text-[#debd6b] hover:bg-slate-500 text-center shadow-xl ease-in duration-300 
          hover:rounded-tl-3xl hover:rounded-bl-3xl cursor-pointer" :class="activeTab === 2 ? '__activeColor' : '__bgItem'">
              <div class="flex items-center space-x-5 h-full">
                <img src="@/assets/images/dragon.svg" class="w-14 h-14 text-[#e4cd76]" alt="">
                <p class="text-2xl tracking-wide font-bold">{{ t('general.dragon') }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="py-2 w-full" @click="clickData(3)">
          <div class=" cursor-pointer">
            <div class="w-full h-14 px-3 rounded bg-slate-400 text-white 
          hover:text-[#debd6b] hover:bg-slate-500 text-center shadow-xl ease-in duration-300 
          hover:rounded-tl-3xl hover:rounded-bl-3xl cursor-pointer" :class="activeTab === 3 ? '__activeColor' : '__bgItem'">
              <!-- <p class="text-2xl tracking-wide font-medium">{{t('general.cow')}}</p> -->
              <div class="flex items-center space-x-5 h-full">
                <img src="@/assets/images/cowcow.svg" class="w-14 h-14 text-[#e4cd76]" alt="">
                <p class="text-2xl tracking-wide font-bold">{{ t('general.cow') }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="py-2 w-full" @click="clickData(4)">
          <div class=" cursor-pointer">
            <div class="w-full h-14 px-3 rounded bg-slate-400 text-white 
          hover:text-[#debd6b] hover:bg-slate-500 text-center shadow-xl ease-in duration-300 
          hover:rounded-tl-3xl hover:rounded-bl-3xl cursor-pointer" :class="activeTab === 4 ? '__activeColor' : '__bgItem'">
              <!-- <p class="text-2xl tracking-wide font-medium">{{t('general.onlineUser')}}</p> -->
              <div class="flex items-center space-x-5 h-full">
                <img src="@/assets/images/member.svg" class="w-14 h-14 text-[#e4cd76]" alt="" />
                <p class="text-2xl tracking-wide font-bold">{{ t('general.onlineUser') }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="py-2 w-full" @click="clickData(5)">
          <div class=" cursor-pointer">
            <div class="w-full h-14 px-3 rounded bg-slate-400 text-white 
          hover:text-[#debd6b] hover:bg-slate-500 text-center shadow-xl ease-in duration-300 
          hover:rounded-tl-3xl hover:rounded-bl-3xl cursor-pointer" :class="activeTab === 5 ? '__activeColor' : '__bgItem'">
              <div class="flex items-center space-x-5 h-full">
                <img src="@/assets/images/realtime.svg" class="w-14 h-14 text-[#e4cd76]" alt="" />
                <p class="text-2xl tracking-wide font-bold">{{ t('general.real') }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="absolute bottom-0   m-auto left-0 right-0 cursor-pointer ">
          <div @click="logout()" class="p-3 rounded bg-[#473903] flex justify-center items-center h-20 ">
            <LogoutIcon class="w-10 h-10 text-white"></LogoutIcon>
          </div>
        </div>
      </div>
      <div class="main-content w-[calc(100%_-_15rem)]  h-screen relative  p-5 overflow-y-scroll ">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script setup>
import singleBjl from "../components/singleBjl.vue";
import ModalDialog from "@/components/ModalDialog.vue";
import pomelo from "@/socket/pomelo.js";
import { onMounted, ref } from "vue";
import BjlModal from "@/components/BjlModal.vue";
import { useRouter, useRoute } from "vue-router";
import { useI18n } from "vue-i18n/index";
import { useStore } from "vuex";

import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupDescription,
  RadioGroupOption,
} from "@headlessui/vue";
import {
  BellIcon,
  MenuIcon,
  XIcon,
  SelectorIcon,
  CheckIcon,
  SearchIcon,
  TranslateIcon,
  LogoutIcon,
  ViewBoardsIcon
} from "@heroicons/vue/outline";
const modal = ref(false);

const activeTab = ref(0)
const router = useRouter()
const route = useRoute()
const store = useStore();

// const bjlData = ref(null)
const { t } = useI18n();
const lang = ref(localStorage.getItem("l") || "cz");
function showModal() {
  console.log("llllllllllllllllllemittttttttttttt");
  modal.value = true;
}

const logout = () => {
  window.location.reload();
  router.push('/login')
}

const changeLanguage = () => {
  console.log("l;ee");
  localStorage.setItem("l", lang.value);
  window.location.reload();
};

const clickData = (n) => {
  console.log(n);
  activeTab.value = n

  switch (activeTab.value) {
    case 0:
      router.push('/all')
      // getDeskLists('all')
      break;
    case 1:
      router.push('/bjl')
      // getBjlLists('bjl')
      break;
    case 2:
      router.push('/dgtiger')
      break;
    case 3:
      router.push('/cowcow')
      break;
    case 4:
      router.push('/onlineuser')
      break;
    case 5:
      router.push('/realtimememb')
      break;

    default:
      break;
  }
}
</script>
<style scoped>
.drawer_bg {
  background: url("https://i.pinimg.com/564x/ed/97/64/ed9764cbd7ef51f88716199c35f9ed6b.jpg");
  background-size: cover;
  background-repeat: no-repeat;
}

.bg__info_img {
  background-image: url("https://template.viserlab.com/casinous/demo/assets/images/game/shape.png");
  background-size: cover;
  background-repeat: no-repeat;

}

.shadow__ {
  box-shadow: -3.828px -3.828px 6px 0px rgba(5, 4, 0, 0.801), 3px 5px 8px 0px rgba(24, 13, 8, 0.2);
}

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
  overflow-x: hidden;
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
  max-height: 50vh;
  overflow-y: scroll;
  display: block;
}

.__table {
  overflow: scroll !important;
}

.__activeColor {
  background-color: rgb(100 116 139 / 1);
  color:#debd6b;
  border-top-left-radius: 1.5rem;
  border-bottom-left-radius: 1.5rem;
    background: url("https://i.pinimg.com/564x/ed/97/64/ed9764cbd7ef51f88716199c35f9ed6b.jpg");
  background-size: cover;
  background-repeat: no-repeat;
}
.__bgItem{
      background: url("https://i.pinimg.com/564x/af/8c/25/af8c251c8bf9f7930306f015accaad7f.jpg");
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
