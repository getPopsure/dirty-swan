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
    name: 'Primary 25',
    code: 'primary-25',
    hex: '#fcfcff',
  },
  {
    name: 'Primary 50',
    code: 'primary-50',
    hex: '#f7f7ff',
  },
  {
    name: 'Primary 100',
    code: 'primary-100',
    hex: '#e6e5ff',
  },
  {
    name: 'Primary 300',
    code: 'primary-300',
    hex: '#b1b0f5',
  },
  {
    name: 'Primary 500',
    code: 'primary-500',
    hex: '#8e8cee',
  },
  {
    name: 'Primary 700',
    code: 'primary-700',
    hex: '#6160a2',
  },
  {
    name: 'Primary 900',
    code: 'primary-900',
    hex: '#2e2e4c',
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
    name: 'Glacier 100',
    code: 'glacier-100',
    hex: '#e0f7fe',
  },
  {
    name: 'Glacier 300',
    code: 'glacier-300',
    hex: '#aeddec',
  },
  {
    name: 'Glacier 500',
    code: 'glacier-500',
    hex: '#8bcbdf',
  },
  {
    name: 'Glacier 700',
    code: 'glacier-700',
    hex: '#5d8896',
  },
  {
    name: 'Glacier 900',
    code: 'glacier-900',
    hex: '#2d4148',
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
    name: 'Pink 100',
    code: 'pink-100',
    hex: '#ffebf1',
  },
  {
    name: 'Pink 300',
    code: 'pink-300',
    hex: '#ffb1cb',
  },
  {
    name: 'Pink 500',
    code: 'pink-500',
    hex: '#f96092',
  },
  {
    name: 'Pink 700',
    code: 'pink-700',
    hex: '#c0305f',
  },
  {
    name: 'Pink 900',
    code: 'pink-900',
    hex: '#700024',
  },
  {
    name: 'Grey 100',
    code: 'grey-100',
    hex: '#fafaff',
  },
  {
    name: 'Grey 200',
    code: 'grey-200',
    hex: '#f5f6fb',
  },
  {
    name: 'Grey 300',
    code: 'grey-300',
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
    name: 'Spearmint 100',
    code: 'spearmint-100',
    hex: '#e3fff2',
  },
  {
    name: 'Spearmint 300',
    code: 'spearmint-300',
    hex: '#aaeacc',
  },
  {
    name: 'Spearmint 500',
    code: 'spearmint-500',
    hex: '#85dcb4',
  },
  {
    name: 'Spearmint 700',
    code: 'spearmint-700',
    hex: '#599278',
  },
  {
    name: 'Spearmint 900',
    code: 'spearmint-900',
    hex: '#2b4639',
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
