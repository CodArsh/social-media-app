import CryptoJS from 'react-native-crypto-js';

const SECRET_KEY = '852963741'; // Replace with your secret key

export const encryptData = data => {
  try {
    const jsonString = JSON.stringify(data);
    const utf8String = CryptoJS.enc.Utf8.stringify(
      CryptoJS.enc.Utf8.parse(jsonString),
    );
    const encryptedData = CryptoJS.AES.encrypt(
      utf8String,
      SECRET_KEY,
    ).toString();
    return encryptedData;
  } catch (error) {
    console.error('Encryption error:', error);
    return null;
  }
};

export const decryptData = encryptedData => {
  try {
    const decryptedString = CryptoJS.AES.decrypt(
      encryptedData,
      SECRET_KEY,
    ).toString(CryptoJS.enc.Utf8);
    const decryptedData = JSON.parse(decryptedString);
    return decryptedData;
  } catch (error) {
    console.error('Decryption error:', error);
    return null;
  }
};
