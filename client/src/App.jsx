import { faCheck, faFilePdf, faPlus, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState } from "react";
import ImageSection from "./components/ImageSection";
import MyDropzone from "./components/MyDropzone";
import axios from "axios";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import fileDownload from "js-file-download";
export default function App() {
  const [images, setImages] = useState([]);
  const [resultPath, setResultPath] = useState();
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState("");
  const [rename, setRename] = useState(false);
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
      setImages(result);
    }
  }

  function onDrop(files) {
    files.forEach((file) => {
      return setImages((data) => [...data, file]);
    });
  }

  function deleteImage(idx) {
    const result = [...images];
    result.splice(idx, 1);
    setImages(result);
  }
  const submitHandler = async () => {
    try {
      const formData = new FormData();

      images.forEach((file, index) => {
        formData.append(`file`, file);
      });
      axios
        .post(import.meta.env.VITE_API_URL + "upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            setProgress(parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total)));
          },
        })
        .then((res) => {
          setResultPath(res.data.pathFile);
          setProgress(0);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const donwloadHandler = () => {
    const url = `${import.meta.env.VITE_API_URL}download?path=${resultPath}`;
    axios
      .get(url, {
        responseType: "blob",
        onDownloadProgress: (progressEvent) => {
          setProgress(parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total)));
        },
      })
      .then((res) => {
        fileDownload(res.data, `${fileName ? fileName : resultPath}.pdf`);
        setResultPath(null);
        axios.get(url);
      });
  };
  return (
    <div className="p-2  ">
      <h1 className="text-center font-semibold text-xl mb-7">Gambar ke Pdf</h1>
      {progress > 0 ? (
        <div className="flex justify-center">
          <CircularProgress value={progress} color="green.500">
            <CircularProgressLabel>{progress}%</CircularProgressLabel>
          </CircularProgress>
        </div>
      ) : (
        <>
          {resultPath ? (
            <>
              <div className="flex mb-4 flex-col items-center justify-center p-2 border border-gray-300 rounded-lg shadow-lg w-fit  mx-auto">
                <FontAwesomeIcon icon={faFilePdf} size="2xl" color="red" />
                <span className="mt-4">{fileName ? fileName : resultPath}.pdf</span>
              </div>
              {rename ? (
                <div className="flex space-x-3 justify-center items-center">
                  <input
                    onChange={(event) => setFileName(event.target.value)}
                    type="text"
                    className="border-green-500 rounded-lg border outline-none
                  p-2
                  "
                  />
                  <FontAwesomeIcon onClick={() => setRename(false)} icon={faCheck} size="lg" />
                </div>
              ) : (
                <div className="flex space-x-3 justify-center">
                  <button
                    onClick={donwloadHandler}
                    className="px-3 py-2 bg-green-500 rounded-lg text-white mt-4"
                  >
                    Download
                  </button>
                  <button
                    onClick={() => setRename(true)}
                    className="px-3 py-2 bg-green-500 rounded-lg text-white mt-4"
                  >
                    Ganti nama
                  </button>
                </div>
              )}
            </>
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
        </>
      )}
    </div>
  );
}
