import React from "react";
import Dropzone from "react-dropzone";

export default function MyDropzone({ onDrop }) {
  return (
    <Dropzone onDrop={onDrop}>
      {({ getRootProps, getInputProps }) => (
        <section className="border-2 border-dashed cursor-pointer border-green-600 mx-2 lg:mx-[5rem]  mt-3">
          <div {...getRootProps()}>
            <input {...getInputProps()} />
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
// const submitHandler = async () => {
//   try {
//     const formData = new FormData();

//     files.forEach((file, index) => {
//       formData.append(`file`, file);
//     });
//     axios
//       .post("http://localhost:3000/upload", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       })
//       .then((res) => {
//         setResultPath(res.data.pathFile);
//       });
//   } catch (error) {
//     console.log("woui", error);
//   }
// };
