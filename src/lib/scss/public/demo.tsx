import React from 'react';

const colors = [
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
    code: 'grey-100',
    hex: '#fafaff',
  },
  {
    name: 'Grey 200',
    code: 'grey-200',
    hex: '#f5f5fa',
  },
  {
    name: 'Grey 300',
    code: 'grey-300',
    hex: '#d2d2d8',
  },
  {
    name: 'Grey 500',
    code: 'grey-500',
    hex: '#b4b4ba',
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
      <th style={{ fontWeight: 'bold' }}>Text class</th>
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
        <td>{color.hex}</td>
      </tr>
    ))}
  </table>
);
