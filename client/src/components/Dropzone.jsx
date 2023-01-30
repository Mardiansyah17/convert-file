import React from "react";
import Dropzone from "react-dropzone";

export default function MyDropzone({ onDrop }) {
  return (
    <Dropzone onDrop={onDrop}>
      {({ getRootProps, getInputProps }) => (
        <section className="border border-dashed cursor-pointer border-green-500 mx-10 lg:mx-[5rem]  mt-3">
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p className="p-3 box-border">Pilih gambar atau jatuhkan disini</p>
          </div>
        </section>
      )}
    </Dropzone>
  );
}
