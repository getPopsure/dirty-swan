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
    hex: '#e5f0ff',
  },
  {
    name: 'Blue 300',
    code: 'blue-300',
    hex: '#b0cdf3',
  },
  {
    name: 'Blue 500',
    code: 'blue-500',
    hex: '#8bb4ea',
  },
  {
    name: 'Blue 700',
    code: 'blue-700',
    hex: '#5f7ba0',
  },
  {
    name: 'Blue 900',
    code: 'blue-900',
    hex: '#2d394a',
  },
  {
    name: 'Red 100',
    code: 'red-100',
    hex: '#fedede',
  },
  {
    name: 'Red 300',
    code: 'red-300',
    hex: '#faa0a0',
  },
  {
    name: 'Red 500',
    code: 'red-500',
    hex: '#e55454',
  },
  {
    name: 'Red 700',
    code: 'red-700',
    hex: '#c64848',
  },
  {
    name: 'Red 900',
    code: 'red-900',
    hex: '#4b2525',
  },
  {
    name: 'Grey 100',
    code: 'neutral-50',
    hex: '#fafaff',
  },
  {
    name: 'Grey 200',
    code: 'neutral-100',
    hex: '#f5f6fb',
  },
  {
    name: 'Grey 300',
    code: 'grey-300',
    hex: '#ededf2',
  },
  {
    name: 'Grey 400',
    code: 'grey-400',
    hex: '#d2d2d8',
  },
  {
    name: 'Grey 500',
    code: 'grey-500',
    hex: '#91919c',
  },
  {
    name: 'Grey 600',
    code: 'grey-600',
    hex: '#696970',
  },
  {
    name: 'Grey 700',
    code: 'grey-700',
    hex: '#4c4c53',
  },
  {
    name: 'Grey 900',
    code: 'grey-900',
    hex: '#26262e',
  },
  {
    name: 'Green 100',
    code: 'green-100',
    hex: '#e4ffe6',
  },
  {
    name: 'Green 300',
    code: 'green-300',
    hex: '#c4f5c8',
  },
  {
    name: 'Green 500',
    code: 'green-500',
    hex: '#84de8a',
  },
  {
    name: 'Green 700',
    code: 'green-700',
    hex: '#5b985f',
  },
  {
    name: 'Green 900',
    code: 'green-900',
    hex: '#354a2d',
  },
  {
    name: 'Yellow 100',
    code: 'yellow-100',
    hex: '#fff8e3',
  },
  {
    name: 'Yellow 300',
    code: 'yellow-300',
    hex: '#fae3a5',
  },
  {
    name: 'Yellow 500',
    code: 'yellow-500',
    hex: '#f7ce5c',
  },
  {
    name: 'Yellow 700',
    code: 'yellow-700',
    hex: '#cc9e21',
  },
  {
    name: 'Yellow 900',
    code: 'yellow-900',
    hex: '#4a3d10',
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
        .bx-xs
      </div>
      <div
        className="d-flex ai-center jc-center ws2 border br8 bs-sm p-p"
        style={{ height: '136px' }}
      >
        .bx-sm
      </div>
      <div
        className="d-flex ai-center jc-center ws2 border br8 bs-md p-p"
        style={{ height: '136px' }}
      >
        .bx-md
      </div>
      <div
        className="d-flex ai-center jc-center ws2 border br8 bs-lg p-p"
        style={{ height: '136px' }}
      >
        .bx-lg
      </div>
    </div>
  );
};
