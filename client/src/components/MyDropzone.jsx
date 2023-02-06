import React from "react";
import Dropzone, { useDropzone } from "react-dropzone";

export default function MyDropzone({ onDrop, hidden }) {
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [".jpeg", ".png"],
    },
  });
  return (
    <Dropzone
      onDrop={onDrop}
      accept={{
        "image/jpeg": [".jpeg", ".png"],
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <section
          className={`border-2 border-dashed cursor-pointer border-green-600 mx-2 lg:mx-[5rem]  mt-3 ${hidden}`}
        >
          <div {...getRootProps()}>
            <input accept="image/jpeg, image/png" id="addFile" {...getInputProps()} />
            <div className="h-[30rem] flex justify-center items-center">
              <p className="p-3 box-border ">Pilih gambar atau jatuhkan disini</p>
            </div>
          </div>
        </section>
      )}
    </Dropzone>
  );
}

// const [files, setFiles] = useState([]);
// const [resultPath, setResultPath] = useState();
