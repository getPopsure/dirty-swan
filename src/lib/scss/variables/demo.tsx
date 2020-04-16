import React from "react";

const colors = [
  {
    name: "Blue 100",
    sass: "$popsure-blue-100",
    hex: "#e5f0ff",
  },
  {
    name: "Blue 300",
    sass: "$popsure-blue-300",
    hex: "#b0cdf3",
  },
  {
    name: "Blue 500",
    sass: "$popsure-blue-500",
    hex: "#8bb4ea",
  },
  {
    name: "Blue 700",
    sass: "$popsure-blue-700",
    hex: "#5f7ba0",
  },
  {
    name: "Blue 900",
    sass: "$popsure-blue-900",
    hex: "#2d394a",
  },
  {
    name: "Purple 100",
    sass: "$popsure-purple-100",
    hex: "#e6e5ff",
  },
  {
    name: "Purple 300",
    sass: "$popsure-purple-300",
    hex: "#b1b0f5",
  },
  {
    name: "Purple 500",
    sass: "$popsure-purple-500",
    hex: "#8e8cee",
  },
  {
    name: "Purple 700",
    sass: "$popsure-purple-700",
    hex: "#6160a2",
  },
  {
    name: "Purple 900",
    sass: "$popsure-purple-900",
    hex: "#2e2e4c",
  },
  {
    name: "Red 100",
    sass: "$popsure-red-100",
    hex: "#fedede",
  },
  {
    name: "Red 300",
    sass: "$popsure-red-300",
    hex: "#f08c8c",
  },
  {
    name: "Red 500",
    sass: "$popsure-red-500",
    hex: "#e55454",
  },
  {
    name: "Red 700",
    sass: "$popsure-red-700",
    hex: "#9e3f3f",
  },
  {
    name: "Red 900",
    sass: "$popsure-red-900",
    hex: "#4b2525",
  },
  {
    name: "Grey 100",
    sass: "$popsure-grey-100",
    hex: "#f4f4f9",
  },
  {
    name: "Grey 300",
    sass: "$popsure-grey-300",
    hex: "#d2d2d8",
  },
  {
    name: "Grey 500",
    sass: "$popsure-grey-500",
    hex: "#b4b4ba",
  },
  {
    name: "Grey 600",
    sass: "$popsure-grey-600",
    hex: "#696970",
  },
  {
    name: "Grey 700",
    sass: "$popsure-grey-700",
    hex: "#4c4c53",
  },
  {
    name: "Grey 900",
    sass: "$popsure-grey-900",
    hex: "#26262e",
  },
  {
    name: "Green 100",
    sass: "$popsure-green-100",
    hex: "#ebffe4",
  },
  {
    name: "Green 300",
    sass: "$popsure-green-300",
    hex: "#bbebab",
  },
  {
    name: "Green 500",
    sass: "$popsure-green-500",
    hex: "#9cde84",
  },
  {
    name: "Green 700",
    sass: "$popsure-green-700",
    hex: "#6b985b",
  },
  {
    name: "Green 900",
    sass: "$popsure-green-900",
    hex: "#354a2d",
  },
  {
    name: "Yellow 100",
    sass: "$popsure-yellow-100",
    hex: "#fff8e3",
  },
  {
    name: "Yellow 300",
    sass: "$popsure-yellow-300",
    hex: "#f2db9f",
  },
  {
    name: "Yellow 500",
    sass: "$popsure-yellow-500",
    hex: "#e9c771",
  },
  {
    name: "Yellow 700",
    sass: "$popsure-yellow-700",
    hex: "#9e884f",
  },
  {
    name: "Yellow 900",
    sass: "$popsure-yellow-900",
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
        <td>{color.sass}</td>
        <td>{color.hex}</td>
      </tr>
    ))}
  </table>
);
