/* eslint-disable no-buffer-constructor */
/* eslint-disable class-methods-use-this */
import crypto from 'crypto';
import { CRYPTO_KEY, CRYPTO_SECRET } from '../constants';

class Crypto {
  decrypt(text: string) {
    const keySecret = `${CRYPTO_KEY}:${CRYPTO_SECRET}`;
    const cc = crypto.createDecipher(
      'aes-128-ecb',
      Buffer.from(keySecret, 'base64'),
    );
    const decrypted = Buffer.concat([
      cc.update(text, 'base64'),
      cc.final(),
    ]).toString('utf8');

    return decrypted;
  }

  encrypt(text: string) {
    const keySecret = `${CRYPTO_KEY}:${CRYPTO_SECRET}`;
    const cc = crypto.createCipher(
      'aes-128-ecb',
      Buffer.from(keySecret, 'base64'),
    );
    const encrypted = Buffer.concat([
      cc.update(text, 'utf8'),
      cc.final(),
    ]).toString('base64');

    return encrypted;
  }
}

export default new Crypto();
