import React from "react";
import { useState } from "react";
import MyDropzone from "./components/Dropzone";
import axios from "axios";
import FileSaver from "file-saver";
export default function App() {
  const [files, setFiles] = useState([]);
  const [resultPath, setResultPath] = useState();
  const submitHandler = async () => {
    try {
      const formData = new FormData();

      files.forEach((file, index) => {
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
    <div className="p-2">
      <h1 className="text-xl font-semibold">Upload gambar </h1>

      <MyDropzone onDrop={(file) => setFiles(file)} />
      <div className="flex justify-center">
        {resultPath ? (
          <button
            className="px-3 mt-4  py-2 bg-blue-600 rounded-lg text-white "
            onClick={() => {
              axios
                .get(`http://localhost:3000/download/`, {
                  responseType: "blob",
                  params: { path: resultPath },
                })
                .then((res) => {
                  FileSaver.saveAs(res.data);
                });
            }}
          >
            Download
          </button>
        ) : (
          <button
            onClick={submitHandler}
            className="px-3 mt-4  py-2 bg-green-600 rounded-lg text-white "
          >
            Upload
          </button>
        )}
      </div>
    </div>
  );
}
