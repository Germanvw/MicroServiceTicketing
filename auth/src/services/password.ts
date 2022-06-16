import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsyc = promisify(scrypt);

export class Password {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString('hex');
    const buffer = (await scryptAsyc(password, salt, 64)) as Buffer;

    return `${buffer.toString('hex')}.${salt}`;
  }
  static async compare(dbPassword: string, password: string) {
    const [hashedPassword, salt] = dbPassword.split('.');
    const buffer = (await scryptAsyc(password, salt, 64)) as Buffer;

    return buffer.toString('hex') === hashedPassword;
  }
}
