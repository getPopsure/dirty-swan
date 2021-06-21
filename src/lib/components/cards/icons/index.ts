import arrowRightImage from './arrow-right.svg';
import featherLogoImage from './feather-logo.svg';
import infoImage from './info.svg';

export interface Icon {
  src: string;
  alt: string;
}

export interface IconSize {
  width: number;
  height: number;
}

const arrowRight: Icon = {
  src: arrowRightImage,
  alt: 'arrow pointing right',
};

const featherLogo: Icon = {
  src: featherLogoImage,
  alt: 'feather logo',
};

const info: Icon = {
  src: infoImage,
  alt: 'circle with the letter i inside for information',
};

export { arrowRight, featherLogo, info };
