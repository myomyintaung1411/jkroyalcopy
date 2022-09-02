/* eslint-disable */
// var CryptoJS = require('crypto-js');
 import CryptoJS from 'crypto-js';
export default {
  /**
   * aes加密解密
   * 加密encrypt
   */
  encrypt(data, G_KP) {
    var key = CryptoJS.enc.Utf8.parse(G_KP.key)
    var iv = CryptoJS.enc.Utf8.parse(G_KP.iv)
    var encrypted = CryptoJS.AES.encrypt(data, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString()
  },
  /**
   * 解密decrypt
   * @param {Object} data 
   * @param {Object} G_KP 
   * @returns 
   */
  decrypt(data, G_KP) {
    var key = CryptoJS.enc.Utf8.parse(G_KP.key)
    var iv = CryptoJS.enc.Utf8.parse(G_KP.iv)
    // var base64 = CryptoJS.enc.Base64.parse(data)
    // var src = CryptoJS.enc.Base64.stringify(base64)
    var decrypted = CryptoJS.AES.decrypt(data, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
    return decrypted.toString(CryptoJS.enc.Utf8)
  }
};
