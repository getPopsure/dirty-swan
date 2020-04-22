import React from "react";

const colors = [
  {
    name: "Blue 100",
    code: "blue-100",
    hex: "#e5f0ff",
  },
  {
    name: "Blue 300",
    code: "blue-300",
    hex: "#b0cdf3",
  },
  {
    name: "Blue 500",
    code: "blue-500",
    hex: "#8bb4ea",
  },
  {
    name: "Blue 700",
    code: "blue-700",
    hex: "#5f7ba0",
  },
  {
    name: "Blue 900",
    code: "blue-900",
    hex: "#2d394a",
  },
  {
    name: "Purple 100",
    code: "purple-100",
    hex: "#e6e5ff",
  },
  {
    name: "Purple 300",
    code: "purple-300",
    hex: "#b1b0f5",
  },
  {
    name: "Purple 500",
    code: "purple-500",
    hex: "#8e8cee",
  },
  {
    name: "Purple 700",
    code: "purple-700",
    hex: "#6160a2",
  },
  {
    name: "Purple 900",
    code: "purple-900",
    hex: "#2e2e4c",
  },
  {
    name: "Red 100",
    code: "red-100",
    hex: "#fedede",
  },
  {
    name: "Red 300",
    code: "red-300",
    hex: "#f08c8c",
  },
  {
    name: "Red 500",
    code: "red-500",
    hex: "#e55454",
  },
  {
    name: "Red 700",
    code: "red-700",
    hex: "#9e3f3f",
  },
  {
    name: "Red 900",
    code: "red-900",
    hex: "#4b2525",
  },
  {
    name: "Grey 100",
    code: "grey-100",
    hex: "#f4f4f9",
  },
  {
    name: "Grey 300",
    code: "grey-300",
    hex: "#d2d2d8",
  },
  {
    name: "Grey 500",
    code: "grey-500",
    hex: "#b4b4ba",
  },
  {
    name: "Grey 600",
    code: "grey-600",
    hex: "#696970",
  },
  {
    name: "Grey 700",
    code: "grey-700",
    hex: "#4c4c53",
  },
  {
    name: "Grey 900",
    code: "grey-900",
    hex: "#26262e",
  },
  {
    name: "Green 100",
    code: "green-100",
    hex: "#ebffe4",
  },
  {
    name: "Green 300",
    code: "green-300",
    hex: "#bbebab",
  },
  {
    name: "Green 500",
    code: "green-500",
    hex: "#9cde84",
  },
  {
    name: "Green 700",
    code: "green-700",
    hex: "#6b985b",
  },
  {
    name: "Green 900",
    code: "green-900",
    hex: "#354a2d",
  },
  {
    name: "Yellow 100",
    code: "yellow-100",
    hex: "#fff8e3",
  },
  {
    name: "Yellow 300",
    code: "yellow-300",
    hex: "#f2db9f",
  },
  {
    name: "Yellow 500",
    code: "yellow-500",
    hex: "#e9c771",
  },
  {
    name: "Yellow 700",
    code: "yellow-700",
    hex: "#9e884f",
  },
  {
    name: "Yellow 900",
    code: "yellow-900",
    hex: "#4a4129",
  },
];

export const Colors = () => (
  <table style={{ width: "100%" }}>
    <tr
      style={{
        height: "40px",
        lineHeight: "40px",
        textAlign: "left",
      }}
    >
      <th style={{ fontWeight: "bold" }}>Color</th>
      <th style={{ fontWeight: "bold" }}>Name</th>
      <th style={{ fontWeight: "bold" }}>Sass</th>
      <th style={{ fontWeight: "bold" }}>Text class</th>
      <th style={{ fontWeight: "bold" }}>Hex</th>
    </tr>
    {colors.map((color) => (
      <tr style={{ height: "40px", lineHeight: "40px" }}>
        <td>
          <div
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "4px",
              backgroundColor: color.hex,
            }}
          />
        </td>
        <td>{color.name}</td>
        <td>{`$popsure-${color.code}`}</td>
        <td>{`tc-${color.code}`}</td>
        <td>{color.hex}</td>
      </tr>
    ))}
  </table>
);
