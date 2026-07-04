import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.MESSAGE_SECRET || "lumora_secret_key";

export const encryptMessage = (text) => {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
};

export const decryptMessage = (cipher) => {
  return CryptoJS.AES.decrypt(cipher, SECRET_KEY)
    .toString(CryptoJS.enc.Utf8);
};