import React from "react";

export default interface IButton {
  name: string;
  label: string;
  onClick: (event: React.MouseEvent) => void;
}
