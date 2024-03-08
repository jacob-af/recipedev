import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { csv } from "d3";
import { ADD_MANY_TYPES } from "../../reducers/mutations";

const UploadFile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [addManyTypes] = useMutation(ADD_MANY_TYPES);
  const handleFileUpload = event => {
    setSelectedFile(URL.createObjectURL(event.target.files[0]));
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    const values = await csv(selectedFile);
    console.log(values);
    try {
      const response = await addManyTypes({
        variables: {
          dat: values
        }
      });
      console.log(response);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <h3>Upload File</h3>
      <input type="file" onChange={handleFileUpload} />
      <button onClick={handleUpload}>Upload</button>
    </>
  );
};

export default UploadFile;
