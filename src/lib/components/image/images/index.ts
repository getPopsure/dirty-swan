import aid from './aid.svg';
import bed from './bed.svg';
import bigDog from './bigDog.svg';
import brokenAquarium from './brokenAquarium.svg';
import brokenGlass from './brokenGlass.svg';
import damagedLaptop from './damagedLaptop.svg';
import moneyIncome from './moneyIncome.svg';
import washingMachine from './washingMachine.svg';

// This should be moved to come from a CDN with absolute URL paths
const sources = {
  aid,
  bed,
  bigDog,
  brokenAquarium,
  brokenGlass,
  damagedLaptop,
  moneyIncome,
  washingMachine
}

export { sources };

export type ImageKey = keyof typeof sources;
