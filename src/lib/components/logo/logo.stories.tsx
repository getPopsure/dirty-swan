import type { Meta, StoryObj } from '@storybook/react';
import { LogoColor } from './LogoColor';
import { LogoWhite } from './LogoWhite';
import { LogoBlack } from './LogoBlack';
import { LogoOrangeBox } from './LogoOrangeBox';
import { LogoInvertedColor } from './LogoInvertedColor';
import { LogoInverted } from './LogoInverted';
import { LogoPositiveColor } from './LogoPositiveColor';
import { LogoPositiveBlack } from './LogoPositiveBlack';

export default {
  title: 'JSX/Logo',
  parameters: {
    layout: 'centered',
  },
};

export const StandardLogos = () => (
  <div className='d-flex gap24 ai-center fd-wrap'>
    <div className='bg-neutral-200 br8 p16 ta-center'>
      <LogoColor width={100} />
      <p className='p-p mt16'>LogoColor</p>
    </div>
    <div className='bg-neutral-200 br8 p16 ta-center'>
      <LogoBlack width={100} />
      <p className='p-p mt16'>LogoBlack</p>
    </div>
    <div className='bg-neutral-900 br8 p16 ta-center'>
      <LogoWhite width={100} />
      <p className='p-p tc-white mt16'>LogoWhite</p>
    </div>
    <div className='bg-neutral-200 br8 p16 ta-center'>
      <LogoOrangeBox width={100} />
      <p className='p-p mt16'>LogoOrangeBox</p>
    </div>
  </div>
);

export const HorizontalLogos = () => (
  <div className='d-flex gap24 ai-center fd-wrap'>
    <div className='ta-center br8 p16 bg-neutral-200'>
      <LogoPositiveColor width={150} />
      <p className='p-p mt16'>LogoPositiveColor</p>
    </div>
    <div className='ta-center br8 p16 bg-neutral-200'>
      <LogoPositiveBlack width={150} />
      <p className='p-p mt16'>LogoPositiveBlack</p>
    </div>
    <div className='ta-center br8 p16 bg-neutral-900'>
      <LogoInvertedColor width={150} />
      <p className='p-p mt16 tc-white'>LogoInvertedColor</p>
    </div>
    <div className='ta-center br8 p16 bg-neutral-900'>
      <LogoInverted width={150} />
      <p className='p-p mt16 tc-white'>LogoInverted</p>
    </div>
  </div>
);

export const Sizes = () => (
  <div className='d-flex gap24 ai-center fd-wrap'>
    <div className='ta-center'>
      <LogoColor width={64} />
      <p className='p-p'>64px</p>
    </div>
    <div className='ta-center'>
      <LogoColor width={128} />
      <p className='p-p'>128px</p>
    </div>
    <div className='ta-center'>
      <LogoColor width={256} />
      <p className='p-p'>256px</p>
    </div>
  </div>
);