import React from "react";

export const Notice = () => (
  <>
    <div className="p-notice p-notice--info">Info filled notice</div>
    <div className="p-notice p-notice--danger mt8">Danger filled notice</div>
    <div className="p-notice p-notice--warning mt8">Warning filled notice</div>
  </>
);

export const Badge = () => (
  <>
    <div className="p-badge p-badge--active">Active badge</div>
    <div className="p-badge p-badge--pending">Pending badge</div>
    <div className="p-badge p-badge--inactive">Inactive badge</div>
    <div className="p-badge p-badge--info">Info badge</div>
  </>
);
