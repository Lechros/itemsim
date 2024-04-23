import { SoulRepository } from '@malib/gear';
import souls from './res/soul.json';

export { souls };
export const soulRepository = new SoulRepository(souls);
