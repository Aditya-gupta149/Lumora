import CryptoJS from "crypto-js";

const SECRET = import.meta.env.VITE_MESSAGE_SECRET;

export const decryptMessage = (text) => {
  try {
    return CryptoJS.AES.decrypt(text, SECRET).toString(CryptoJS.enc.Utf8);
  } catch (err) {
    return text;
  }
};