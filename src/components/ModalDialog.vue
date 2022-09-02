<template>
  <teleport to="body">
    <transition enter-active-class="transition ease-out duration-200 transform" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition ease-in duration-200 transform" leave-from-class="opacity-100" leave-to-class="opacity-0">
      <div ref="modal-backdrop" class="fixed z-50 inset-0 overflow-y-auto bg-black bg-opacity-60" v-show="showModal">
        <div class="flex items-center justify-center min-h-screen">
          <transition enter-active-class="transition ease-out duration-300 transform " enter-from-class="opacity-0 translate-y-10 scale-95" enter-to-class="opacity-100 translate-y-0 scale-100" leave-active-class="ease-in duration-200" leave-from-class="opacity-100 translate-y-0 scale-100" leave-to-class="opacity-0 translate-y-10 translate-y-0 scale-95">
            <div class="relative bg-gray-900 rounded-lg overflow-hidden shadow-xl w-fit" role="dialog" ref="modal" aria-modal="true" v-show="showModal" aria-labelledby="modal-headline">
              <button class="absolute top-0 right-0 rounded-full bg-white p-3">
                <XIcon class="w-6 h-6 text-black" @click="closeModal" />
              </button>
              <slot>I'm empty inside</slot>
            </div>
          </transition>
        </div>
      </div>
    </transition>
  </teleport>
</template>


<script setup>
import { ref, watch } from "vue";
import { XIcon } from "@heroicons/vue/outline";
import useClickOutside from "../composables/useClickOutside";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["close"]);

const showModal = ref(false);
const modal = ref(null);
// const { onClickOutside } = useClickOutside();

const closeModal = () => {
  emit("close");
};
// onClickOutside(modal, () => {
//   if (showModal.value === true) {
//     closeModal();
//   }
// });
watch(
  () => props.show,
  (show) => {
    showModal.value = show;
  }
);
</script>


<style></style>