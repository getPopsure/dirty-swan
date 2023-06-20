const basePath = 'https://assets.cdn.feather-insurance.com/assets/images';

const images = {
  aid: `${basePath}/aid.svg`,
  bed: `${basePath}/bed.svg`,
  bigDog: `${basePath}/bigDog.svg`,
  verticalIcons: {
    dogLiability: `${basePath}/dogLiabilityIcon.png`,
    dogLiability2x: `${basePath}/dogLiabilityIcon2x.png`,
    dogLiability3x: `${basePath}/dogLiabilityIcon3x.png`,
    lifeIcon: `${basePath}/lifeIcon.png`,
    lifeIcon2x: `${basePath}/lifeIcon2x.png`,
    lifeIcon3x: `${basePath}/lifeIcon3x.png`,
  },
  brokenAquarium: `${basePath}/brokenAquarium.svg`,
  brokenGlass: `${basePath}/brokenGlass.svg`,
  damagedLaptop: `${basePath}/damagedLaptop.svg`,
  moneyIncome: `${basePath}/moneyIncome.svg`,
  washingMachine: `${basePath}/washingMachine.svg`,
  bill: `${basePath}/bill.svg`,
  books: `${basePath}/books.svg`,
  finalExpenses: `${basePath}/finalExpenses.svg`,
  mortgage: `${basePath}/mortgage.svg`,
} as const;

export { images };
