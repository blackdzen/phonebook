import React, { useState } from "react";

export default function Search() {
  const [isSearchWindowOpen, setIsSearchWindowOpen] = useState(false)
  const onClick = () => {
    setIsSearchWindowOpen(!isSearchWindowOpen)
  }
  return (
    <div>
      <div
        className="w-16 h-16 p-2 fixed top-4 right-4 border-2 border-lavender-blush rounded-full hover:border-ventian-red transition-all cursor-pointer shadow-xl hover:shadow-3xl "
        onClick={onClick}
      >
        <img src="./search-icon.svg" className="w-full h-full"></img ></div >
      {isSearchWindowOpen && <div>Modal search window</div>}
    </div>
  )
}
