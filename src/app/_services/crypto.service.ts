import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  keyBase64 = ')>epsftcloudplatforml23s#434'

  encrypt(plainText) {
    // const key = CryptoJS.enc.Utf8.parse(this.keyBase64);
    // console.log(key);
    // const encrypted = CryptoJS.AES.encrypt(plainText, key, {
    //   mode: CryptoJS.mode.ECB,
    // });
    // return encrypted.toString();
//DWIzFkO22qfVMgx2fIsxOXnwz10pRuZfFJBvf4RS3eY=     1234567890123456
    var keyUtf8 = CryptoJS.enc.Utf8.parse('1234567890123456');
    var ivUtf8 = CryptoJS.enc.Utf8.parse('1234567890123456');
    var ciphertext = CryptoJS.AES.encrypt(plainText, keyUtf8,{
      iv: ivUtf8
    });
    return ciphertext.toString();
  };

  decrypt(decryptMessage) {
    console.log(decryptMessage)
    var keyUtf8 = CryptoJS.enc.Utf8.parse('1234567890123456');
    var ivUtf8 = CryptoJS.enc.Utf8.parse('1234567890123456');
    var decrypt = CryptoJS.AES.decrypt(decryptMessage, keyUtf8,{
      iv: ivUtf8
    });     
   return CryptoJS.enc.Utf8.stringify(decrypt).toString();  
    // const key = CryptoJS.enc.Utf8.parse(this.keyBase64);
    // const decrypted = CryptoJS.AES.decrypt(decryptMessage, key, {
    //   mode: CryptoJS.mode.ECB
    // });
    // return decrypted.toString(CryptoJS.enc.Utf8);
  }

}
