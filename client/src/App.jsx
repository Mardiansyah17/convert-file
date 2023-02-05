import { faFilePdf, faPlus, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState } from "react";
import ImageSection from "./components/ImageSection";
import MyDropzone from "./components/MyDropzone";
import axios from "axios";

export default function App() {
  const [images, setImages] = useState([]);
  const [resultPath, setResultPath] = useState();
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

  function onDrop(files) {
    console.log(files);
    files.forEach((file) => {
      return setImages((data) => [...data, file]);
    });
  }

  function deleteImage(idx) {
    const result = [...images];
    result.splice(idx, 1);
    console.log(result);
    setImages(result);
  }
  const submitHandler = async () => {
    try {
      const formData = new FormData();

      images.forEach((file, index) => {
        formData.append(`file`, file);
      });
      axios
        .post("http://localhost:3000/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setResultPath(res.data.pathFile);
        });
    } catch (error) {
      console.log("woui", error);
    }
  };
  return (
    <div className="p-2  ">
      <h1 className="text-center font-semibold text-xl">Gambar ke Pdf</h1>
      {resultPath ? (
        <div className="flex flex-col items-center justify-center mt-10 p-2 border border-gray-300 rounded-lg shadow-lg w-[40%] mx-auto">
          <FontAwesomeIcon icon={faFilePdf} size="2xl" color="red" />
          <span className="mt-4">{resultPath}.pdf</span>
          <a
            className="px-3 py-2 bg-green-500 text-white rounded-lg "
            href={`http://localhost:3000/download?path=${resultPath}`}
          >
            Download
          </a>
        </div>
      ) : (
        <>
          <MyDropzone hidden={images.length !== 0 ? "hidden" : ""} onDrop={onDrop} />

          {images.length !== 0 ? (
            <>
              {images.map((data, idx) => {
                return (
                  <ImageSection
                    id={idx}
                    key={`image.${idx}`}
                    upHandler={upHandler}
                    downHandler={downHandler}
                    deleteHandler={deleteImage}
                    img={URL.createObjectURL(data)}
                  />
                );
              })}
              <div className="fixed  bottom-0 right-0 p-3 text-white">
                <label htmlFor="addFile">
                  <FontAwesomeIcon
                    className="bg-green-500 block mb-3 rounded-full px-[1.3rem] py-5"
                    icon={faPlus}
                  />
                </label>

                <button>
                  <FontAwesomeIcon
                    onClick={submitHandler}
                    className="bg-green-500 rounded-full px-[1.3rem] py-5"
                    icon={faUpload}
                  />
                </button>
              </div>
            </>
          ) : (
            ""
          )}
        </>
      )}
    </div>
  );
}
