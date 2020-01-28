import { aliceTesting } from './index';

aliceTesting((_, message: string) => message.split('').reverse().join(''));
