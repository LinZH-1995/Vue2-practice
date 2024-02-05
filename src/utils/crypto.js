import CryptoJS from 'crypto-js'

export const crypto = {
  encrypted(token) {
    return CryptoJS.AES.encrypt(token, 'secret key').toString() // encrypt jwt token
  }
}
