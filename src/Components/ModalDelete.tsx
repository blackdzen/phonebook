import React from "react";
import IModalDelete from "../Intetfaces/IModalDelete";
import Button from "./Button";

export default function ModalDelete({
  clickDeleteNo,
  clickDeleteYes,
}: IModalDelete) {
  return (
    <div>
      <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
      <div className="fixed flex justify-center items-center inset-0 z-20">
        <div className="flex flex-col gap-8 border-4 rounded border-ventian-red bg-black p-8">
          <div className="text-4xl text-white">Are you sure?</div>
          <div className="flex justify-evenly">
            <Button name="Yes" label="Yes" onClick={clickDeleteYes} />
            <Button name="No" label="No" onClick={clickDeleteNo} />
          </div>
        </div>
      </div>
    </div>
  );
}
