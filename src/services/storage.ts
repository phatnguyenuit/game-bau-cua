import Crypto from './crypto';

class Storage {
  setItem = (key: string, value: any) => {
    const encryptedKey = Crypto.encrypt(key);
    const encryptedValue = Crypto.encrypt(value);
    window.localStorage.setItem(encryptedKey, encryptedValue);
  };

  getItem = (key: string) => {
    const encryptedKey = Crypto.encrypt(key);
    const encryptedValue = window.localStorage.getItem(encryptedKey) || '';
    if (!encryptedValue) {
      return encryptedValue;
    }
    return Crypto.decrypt(encryptedValue);
  };
}

export default new Storage();
