import React from "react";

import styles from "./style.module.scss";

export const Typography = () => (
  <>
    <h1 className="p-h1--xl">The quick brown fox jumps over the lazy dog</h1>
    <h1 className="p-h1">The quick brown fox jumps over the lazy dog</h1>
    <h2 className="p-h2">The quick brown fox jumps over the lazy dog</h2>
    <h3 className="p-h3">The quick brown fox jumps over the lazy dog</h3>
    <h4 className="p-h4">The quick brown fox jumps over the lazy dog</h4>
    <p className="p-p">The quick brown fox jumps over the lazy dog</p>
    <p className="p-p--small">The quick brown fox jumps over the lazy dog</p>
  </>
);

export const StaticWidthClasses = () => (
  <div className={styles["width-container"]}>
    <div className="ws1">ws1</div>
    <div className="ws2">ws2</div>
    <div className="ws3">ws3</div>
    <div className="ws4">ws4</div>
    <div className="ws5">ws5</div>
    <div className="ws6">ws6</div>
    <div className="ws7">ws7</div>
    <div className="ws8">ws8</div>
    <div className="ws9">ws9</div>
    <div className="ws10">ws10</div>
    <div className="ws11">ws11</div>
    <div className="ws12">ws12</div>
  </div>
);

export const MinWidthClasses = () => (
  <div className={styles["min-width-container"]}>
    <div>
      <div className="wmn1">wmn1</div>
      <div />
    </div>
    <div>
      <div className="wmn2">wmn2</div>
      <div />
    </div>
    <div>
      <div className="wmn3">wmn3</div>
      <div />
    </div>
    <div>
      <div className="wmn4">wmn4</div>
      <div />
    </div>
    <div>
      <div className="wmn5">wmn5</div>
      <div />
    </div>
    <div>
      <div className="wmn6">wmn6</div>
      <div />
    </div>
    <div>
      <div className="wmn7">wmn7</div>
      <div />
    </div>
    <div>
      <div className="wmn8">wmn8</div>
      <div />
    </div>
    <div>
      <div className="wmn9">wmn9</div>
      <div />
    </div>
    <div>
      <div className="wmn10">wmn10</div>
      <div />
    </div>
    <div>
      <div className="wmn11">wmn11</div>
      <div />
    </div>
    <div>
      <div className="wmn12">wmn12</div>
      <div />
    </div>
  </div>
);

export const MaxWidthClasses = () => (
  <div className={styles["width-container"]}>
    <div className="wmx1">wmx1</div>
    <div className="wmx2">wmx2</div>
    <div className="wmx3">wmx3</div>
    <div className="wmx4">wmx4</div>
    <div className="wmx5">wmx5</div>
    <div className="wmx6">wmx6</div>
    <div className="wmx7">wmx7</div>
    <div className="wmx8">wmx8</div>
    <div className="wmx9">wmx9</div>
    <div className="wmx10">wmx10</div>
    <div className="wmx11">wmx11</div>
    <div className="wmx12">wmx12</div>
  </div>
);

export const FuildWidthClasses = () => (
  <div className={styles["width-container"]}>
    <div className="w-auto">w-auto</div>
    <div className="w0">w0</div>
    <div className="w10">w10</div>
    <div className="w20">w20</div>
    <div className="w30">w30</div>
    <div className="w40">w40</div>
    <div className="w50">w50</div>
    <div className="w60">w60</div>
    <div className="w70">w70</div>
    <div className="w80">w80</div>
    <div className="w90">w90</div>
    <div className="w100">w100</div>
  </div>
);
