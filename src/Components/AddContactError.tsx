import React from "react";
import IAddContactError from "../Intetfaces/IAddContactError";

export default function ErrorField({ errMsg }: IAddContactError) {
  return (
    <div className="border-2 border-ventian-red rounded p-5 text-xl text-ventian-red max-w-[190px] mx-auto">
      {errMsg}
    </div>
  );
}
