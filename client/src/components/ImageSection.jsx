import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp, faCoffee, faTrash } from "@fortawesome/free-solid-svg-icons";
export default function ImageSection({ img, upHandler, downHandler, id, deleteHandler, tes }) {
  return (
    <div className="mb-5 border border-gray-300 p-2 shadow-sm">
      <p>{tes}</p>
      <img src={img} alt="" />
      <div className="flex justify-around w-2/4 mx-auto mt-3 items-center text-2xl">
        <FontAwesomeIcon onClick={() => downHandler(id)} icon={faCaretUp} size="xl" />
        <FontAwesomeIcon onClick={() => upHandler(id)} icon={faCaretDown} size="xl" />
        <FontAwesomeIcon onClick={() => deleteHandler(id)} icon={faTrash} size="sm" />
      </div>
    </div>
  );
}
