import React from "react";
import { useState } from "react";
import MyDropzone from "./components/Dropzone";
import axios from "axios";
import FileSaver from "file-saver";
import ImageSection from "./components/ImageSection";
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
      {/* <h1 className="text-center font-semibold text-xl">Gambar ke Pdf</h1>
      <MyDropzone /> */}
      <ImageSection />
    </div>
  );
}
