import React from "react";
import { useState } from "react";
import ImageSection from "./components/ImageSection";
import MyDropzone from "./components/MyDropzone";
export default function App() {
  const [images, setImages] = useState([
    // "../../public/img/1.png",
    // "../../public/img/2.png",
    // "../../public/img/3.png",
  ]);
  function upHandler(id) {
    if (id + 1 !== images.length) {
      const result = [...images];
      let currentImage = images[id];
      result[id] = result[id + 1];
      result[id + 1] = currentImage;
      setImages(result);
    }
  }
  function downHandler(id) {
    if (id !== 0) {
      const result = [...images];
      let currentImage = images[id];
      result[id] = result[id - 1];
      result[id - 1] = currentImage;
      console.log(result);
      setImages(result);
    }
  }

  function onDrop(file) {
    setImages(file);
  }

  return (
    <div className="p-2  ">
      <h1 className="text-center font-semibold text-xl">Gambar ke Pdf</h1>
      {/* tampilkan hasil gambar jika ada */}
      {images.length !== 0 ? (
        <>
          {images.map((data, idx) => {
            return (
              <ImageSection
                id={idx}
                key={`image.${idx}`}
                upHandler={upHandler}
                downHandler={downHandler}
                img={URL.createObjectURL(data)}
              />
            );
          })}
        </>
      ) : (
        <>
          <MyDropzone onDrop={onDrop} />
        </>
      )}
    </div>
  );
}
