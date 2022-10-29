import React from "react";
import IButton from "../Intetfaces/IButton";

export default function Button({ name, label, onClick }: IButton) {
  return (
    <div className="">
      <button
        name={name}
        onClick={onClick}
        className="px-6 py-3 text-center border rounded bg-ventian-red text-white text-base focus:outline-none border-black hover:border-ventian-red transition-all"
      >
        {label}
      </button>
    </div>
  );
}
