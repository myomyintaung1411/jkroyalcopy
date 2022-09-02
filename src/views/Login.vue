<template>
  <div class="min-h-screen flex flex-col items-center justify-center  login__">
    <div class="flex flex-col bg-transparent text-gray-200  shadow-2xl  shadow-[#342D11]  px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-50 max-w-xs sm:max-w-md">
      <!-- <div class="font-medium self-center text-xl sm:text-3xl">现在登录</div>
      <div class="mt-4 self-center text-md sm:text-sm">现在登录</div> -->
      <div class="py-3 self-center">
        <img src="@/assets/images/logo.png" alt=""  class=" w-[120px] h-auto">
      </div>

      <div class="mt-5">
        <form @click.prevent>
          <div class="flex flex-col mb-5">
            <label for="name" class="mb-1 text-xs tracking-wide text-gray-100">请输入账号</label>
            <div class="relative">
              <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>

              <input v-model="name" id="name" type="name" autocomplete="off" name="name" class="text-sm placeholder-gray-500 text-gray-500 pl-10 pr-4 rounded-2xl w-full py-2 focus:outline-none outline-none" placeholder="请输入账号" />
            </div>
          </div>
          <div class="flex flex-col mb-6">
            <label for="password" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-100">请输入密码:</label>
            <div class="relative">
              <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input v-model="password" id="password" autocomplete="off" :type="passwordField" name="password" class="__p text-sm placeholder-gray-500 text-gray-500 pl-10 pr-16 rounded-2xl w-full py-2 focus:outline-0 outline-none focus:outline-none selection:outline-none border-none focus:border-none outline-hidden shadow-none outline-0" placeholder="请输入密码" />
              <div class="inline-flex items-center justify-center absolute right-3 top-0 h-full w-10 text-gray-400 md:cursor-pointer">
                <EyeIcon v-if="passwordField !== 'password'" @click="ShowVisibility" class="w-4 h-5" />
                <EyeOffIcon v-else @click="ShowVisibility" class="w-4 h-5 text-yellow-700" />
                <!-- <label class="bg-gray-300 hover:bg-gray-400 rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer js-password-label select-none" for="toggle" @click="ShowVisibility">{{passwordField === 'password' ? 'show' : 'hide'}}</label> -->
              </div>
            </div>
          </div>

          <div class="flex w-full">
            <button :disabled="disableBtn" @click="login" type="submit" :class="disableBtn ? 'bg-[#F0DE7C] opacity-40 cursor-not-allowed' : 'text-black bg-[#C78E3B]'" class="flex mt-2 items-center justify-center focus:outline-none text-white text-sm sm:text-base rounded-2xl py-2 w-full transition duration-150 ease-in">
              <span class="mr-2 uppercase">Login</span>
              <span :class="!disableBtn ? 'sm:animate-wiggle ' : ''">
                <svg class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {
  EyeIcon,
  EyeOffIcon,
  ExclamationCircleIcon,
} from "@heroicons/vue/solid";
import { ref, computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import md5 from "js-md5";
import pomelo from "@/socket/pomelo.js";
// import AES from "@/utils/aes";

export default {
  components: {
    EyeIcon,
    EyeOffIcon,
    ExclamationCircleIcon,
  },
  data() {
    return {
      name: "admin",
      password: "111111",
      passwordField: "password",
    };
  },
  computed: {
    disableBtn() {
      if (this.name === "" || this.password === "") {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {

    ShowVisibility() {
      this.passwordField =
        this.passwordField === "password" ? "text" : "password";
    },

    login() {
      const sendStr = {
        router: 'Login',
        JsonData: { name: this.name, password: md5(this.password), ip: '', terminal: 'jk' }
      } 
      this.$store.dispatch('app/login', sendStr).then(() => {
        pomelo.conn((err,res)=>{
          if(err) console.error(err);
          if(res.code === 200){
            this.$router.push('/all')
          }
        })
         //this.$router.push('/all')
      }).catch((e)=>{
        console.error(e);
      })
    },
  },
};
</script>

<style  scoped>
.login__{
 background-image: url("@/assets/images/login.jpg") ;
 background-size: cover;
 background-repeat: no-repeat;
 width: 100vw;
 height: 100vh;
}

</style>