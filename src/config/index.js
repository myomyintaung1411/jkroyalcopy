import { createI18n } from "vue-i18n/index"
import en from '@/config/en.js'
import cz from '@/config/zh.js'
// const messages = {
//     'cz': '@/config/zh.json',
//     'en': '@/config/en.json' 
// }

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('l') || 'cz',
  globalInjection: true,
  messages: {en,cz}
});
export default i18n;


export const translate = (key) => {
    if (!key) {
        return '';
    }
    return i18n.global.t(key);
};

// const messages = {
//     'cz': '@/config/zh.json',
//     'en': '@/config/en.json' 
// }
  
//   const localData = {
//     // something vue-i18n options here ...
//     globalInjection: true,
//     legacy:false,
//     locale: localStorage.getItem('l') || 'cz', // set locale 默认显示中文
//     messages: messages // set locale messages 
//   }

//   export function setupI18n(app) {
//       const i18n = createI18n(localData)
//       app.use(i18n)
//       console.log(i18n);
//   }