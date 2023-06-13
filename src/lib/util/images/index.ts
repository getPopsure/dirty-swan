const basePath = 'https://assets.cdn.feather-insurance.com/assets/images';

const images = {
  aid: `${basePath}/aid.svg`,
  bed: `${basePath}/bed.svg`,
  bigDog: `${basePath}/bigDog.svg`,
  verticalIcons: {
    dogLiability: `${basePath}/dogLiabilityIcon.png`,
    dogLiability2x: `${basePath}/dogLiabilityIcon2x.png`,
    dogLiability3x: `${basePath}/dogLiabilityIcon3x.png`,
  },
  brokenAquarium: `${basePath}/brokenAquarium.svg`,
  brokenGlass: `${basePath}/brokenGlass.svg`,
  damagedLaptop: `${basePath}/damagedLaptop.svg`,
  moneyIncome: `${basePath}/moneyIncome.svg`,
  washingMachine: `${basePath}/washingMachine.svg`,
} as const;

export { images };
