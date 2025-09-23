import React from 'react';

const colors = [
  {
    name: 'Transparent',
    code: 'transparent',
    hex: 'transparent',
  },
  {
    name: 'White',
    code: 'white',
    hex: '#fff',
  },
  {
    name: 'Purple 50',
    code: 'purple-50',
    hex: '#F9F9FF',
  },
  {
    name: 'Purple 100',
    code: 'purple-100',
    hex: '#F6F6FE',
  },
  {
    name: 'Purple 200',
    code: 'purple-200',
    hex: '#EEEEFE',
  },
  {
    name: 'Purple 300',
    code: 'purple-300',
    hex: '#E8E7FE',
  },
  {
    name: 'Purple 400',
    code: 'purple-400',
    hex: '#D2CFFD',
  },
  {
    name: 'Purple 500',
    code: 'purple-500',
    hex: '#B8B4F3',
  },
  {
    name: 'Purple 600',
    code: 'purple-600',
    hex: '#8883D8',
  },
  {
    name: 'Purple 700',
    code: 'purple-700',
    hex: '#6A65AE',
  },
  {
    name: 'Purple 800',
    code: 'purple-800',
    hex: '#484676',
  },
  {
    name: 'Purple 900',
    code: 'purple-900',
    hex: '#32334B',
  },
  {
    name: 'Blue 100',
    code: 'blue-100',
    hex: '#E5F0FF',
  },
  {
    name: 'Blue 200',
    code: 'blue-200',
    hex: '#DAE8FC',
  },
  {
    name: 'Blue 300',
    code: 'blue-300',
    hex: '#B0CDF3',
  },
  {
    name: 'Blue 500',
    code: 'blue-500',
    hex: '#8BB4EA',
  },
  {
    name: 'Blue 700',
    code: 'blue-700',
    hex: '#5F7BA0',
  },
  {
    name: 'Blue 900',
    code: 'blue-900',
    hex: '#2D394A',
  },
  {
    name: 'Red 100',
    code: 'red-100',
    hex: '#FEE6E6',
  },
  {
    name: 'Red 200',
    code: 'red-200',
    hex: '#FED7D7',
  },
  {
    name: 'Red 300',
    code: 'red-300',
    hex: '#FAA0A0',
  },
  {
    name: 'Red 500',
    code: 'red-500',
    hex: '#E55454',
  },
  {
    name: 'Red 700',
    code: 'red-700',
    hex: '#C64848',
  },
  {
    name: 'Red 900',
    code: 'red-900',
    hex: '#4B2525',
  },
  {
    name: 'Neutral 50',
    code: 'neutral-50',
    hex: '#f9f9fd',
  },
  {
    name: 'Neutral 100',
    code: 'neutral-100',
    hex: '#f7f7fd',
  },
  {
    name: 'Neutral 200',
    code: 'neutral-200',
    hex: '#f2f2f8',
  },
  {
    name: 'Neutral 300',
    code: 'neutral-300',
    hex: '#e7e7ed',
  },
  {
    name: 'Neutral 400',
    code: 'neutral-400',
    hex: '#d2d2d9',
  },
  {
    name: 'Neutral 500',
    code: 'neutral-500',
    hex: '#b8b8c0',
  },
  {
    name: 'Neutral 600',
    code: 'neutral-600',
    hex: '#919199',
  },
  {
    name: 'Neutral 700',
    code: 'neutral-700',
    hex: '#696971',
  },
  {
    name: 'Neutral 800',
    code: 'neutral-800',
    hex: '#3f3f47',
  },
  {
    name: 'Neutral 900',
    code: 'neutral-900',
    hex: '#26262e',
  },
  {
    name: 'Green 100',
    code: 'green-100',
    hex: '#E6FAF1',
  },
  {
    name: 'Green 200',
    code: 'green-200',
    hex: '#D5F6E7',
  },
  {
    name: 'Green 300',
    code: 'green-300',
    hex: '#AAEACC',
  },
  {
    name: 'Green 500',
    code: 'green-500',
    hex: '#85DCB4',
  },
  {
    name: 'Green 700',
    code: 'green-700',
    hex: '#599278',
  },
  {
    name: 'Green 900',
    code: 'green-900',
    hex: '#2B4639',
  },
  {
    name: 'Yellow 100',
    code: 'yellow-100',
    hex: '#FEFAEC',
  },
  {
    name: 'Yellow 200',
    code: 'yellow-200',
    hex: '#FCF3D1',
  },
  {
    name: 'Yellow 300',
    code: 'yellow-300',
    hex: '#F6E7AC',
  },
  {
    name: 'Yellow 500',
    code: 'yellow-500',
    hex: '#F0D26F',
  },
  {
    name: 'Yellow 700',
    code: 'yellow-700',
    hex: '#C5A33E',
  },
  {
    name: 'Yellow 900',
    code: 'yellow-900',
    hex: '#483D18',
  },
  {
    name: 'Orange 50',
    code: 'orange-50',
    hex: '#FAF8F5',
  },
  {
    name: 'Orange 100',
    code: 'orange-100',
    hex: '#FCF7EF',
  },
  {
    name: 'Orange 200',
    code: 'orange-200',
    hex: '#FDF2E2',
  },
  {
    name: 'Orange 300',
    code: 'orange-300',
    hex: '#FEECD3',
  },
  {
    name: 'Orange 400',
    code: 'orange-400',
    hex: '#FCDAAB',
  },
  {
    name: 'Orange 500',
    code: 'orange-500',
    hex: '#FFD08F',
  },
  {
    name: 'Orange 600',
    code: 'orange-600',
    hex: '#F2B873',
  },
  {
    name: 'Orange 700',
    code: 'orange-700',
    hex: '#C6824E',
  },
  {
    name: 'Orange 800',
    code: 'orange-800',
    hex: '#7E4B2F',
  },
  {
    name: 'Orange 900',
    code: 'orange-900',
    hex: '#4C2D21',
  },
];

export const Colors = () => (
  <table style={{ width: '100%' }}>
    <tr
      style={{
        height: '40px',
        lineHeight: '40px',
        textAlign: 'left',
      }}
    >
      <th style={{ fontWeight: 'bold' }}>Color</th>
      <th style={{ fontWeight: 'bold' }}>Name</th>
      <th style={{ fontWeight: 'bold' }}>Sass</th>
      <th style={{ fontWeight: 'bold' }}>Text color class</th>
      <th style={{ fontWeight: 'bold' }}>BG color class</th>
      <th style={{ fontWeight: 'bold' }}>Hex</th>
    </tr>
    {colors.map((color) => (
      <tr style={{ height: '40px', lineHeight: '40px' }}>
        <td>
          <div
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '4px',
              backgroundColor: color.hex,
            }}
          />
        </td>
        <td>{color.name}</td>
        <td>{`$ds-${color.code}`}</td>
        <td>{`tc-${color.code}`}</td>
        <td>{`bg-${color.code}`}</td>
        <td>{color.hex}</td>
      </tr>
    ))}
  </table>
);

export const BoxShadows = () => {
  return (
    <div className="d-flex fd-row f-wrap gap16">
      <div
        className="d-flex ai-center jc-center ws2 border br8 bs-xs p-p"
        style={{ height: '136px' }}
      >
        .bs-xs
      </div>
      <div
        className="d-flex ai-center jc-center ws2 border br8 bs-sm p-p"
        style={{ height: '136px' }}
      >
        .bs-sm
      </div>
      <div
        className="d-flex ai-center jc-center ws2 border br8 bs-md p-p"
        style={{ height: '136px' }}
      >
        .bs-md
      </div>
      <div
        className="d-flex ai-center jc-center ws2 border br8 bs-lg p-p"
        style={{ height: '136px' }}
      >
        .bs-lg
      </div>
      <div
        className="d-flex ai-center jc-center ws2 border br8 bs-lg p-p"
        style={{ height: '136px' }}
      >
        .bs-xl
      </div>
    </div>
  );
};
