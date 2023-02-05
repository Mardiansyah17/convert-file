import React from "react";
import Dropzone from "react-dropzone";

export default function MyDropzone({ onDrop, hidden }) {
  return (
    <Dropzone onDrop={onDrop}>
      {({ getRootProps, getInputProps }) => (
        <section
          className={`border-2 border-dashed cursor-pointer border-green-600 mx-2 lg:mx-[5rem]  mt-3 ${hidden}`}
        >
          <div {...getRootProps()}>
            <input id="addFile" {...getInputProps()} />
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
