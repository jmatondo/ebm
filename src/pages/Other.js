import React, { useState } from "react";
import axios from "axios";

const Other = () => {
  const [file, setFile] = useState("");

  const handleFile = (e) => {
    //Single file
    setFile(e.target.files[0]);

    //Multiple files
    setFile(e.target.files);
  };

  const handleUpload = (e) => {
    //console.log(file);

    let fd = new FormData();
    //fd.append("file", file, file.name);
    for (let i = 0; i < file.length; i++) {
      fd.append("files", file[i]);
    }

    axios({
      method: "post",
      url: "http://localhost:8981/docs/upload",
      data: fd,
      headers: { "Content-Type": "multipart/form-data" },
    }).then(
      function (response) {
        //handle success
        console.log(response);
      },
      function (error) {
        // handle error
      }
    );

    /*     axios
      .post(`http://localhost:8981/iccs/uploadF/${file.name}`, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
      }); */
  };

  return (
    <div
      className="other"
      style={{
        paddingTop: "100px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form>
        <div>
          <label>Select file</label>
          <input
            multiple
            type="file"
            name="file"
            onChange={(e) => handleFile(e)}
          />
          <button type="button" onClick={(e) => handleUpload(e)}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Other;
