import CryptoJS from 'crypto-js'

export const crypto = {
  encrypted(token) {
    return CryptoJS.AES.encrypt(token, 'secret key').toString() // encrypt jwt token
  },

  decrypted() {
    const token = localStorage.getItem('token') // get token from localStorage
    if (token === null || token === '') return token

    const decryptWordArray = CryptoJS.AES.decrypt(token, 'secret key') // return WordArray[]
    return decryptWordArray.toString(CryptoJS.enc.Utf8) // Default: CryptoJS.enc.Hex --> CryptoJS.enc.Utf8
  }
}
