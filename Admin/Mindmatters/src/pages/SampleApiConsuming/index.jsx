import React, { useState, useEffect } from "react";
import axios from "axios";

export const SampleApi = () => {
  
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  // Storing data like like a variable
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  //Button function to save the data to the MYSqL database
  const save = () => {
    const data = { title: title, body: body };
    axios.post("http://localhost:5000/comments/save", data).then((response) => {
      setTitle("");//To change the value to null
      setBody("");
      getData();
    });
  };

//View or get the Data to display it
  const getData = () => {
    axios.get("http://localhost:5000/comments/list").then((response) => {
      setComments(response.data);
      // console.log(response.data)
      //to print the data in the inspect element
      console.log(response.data)
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>
        Title:{" "}
        <input
          placeholder="title"
          //everytime changes update the variable
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
        />{" "}
      </div>
      <div>
        Body:{" "}
        <input
          placeholder="body"
          onChange={(e) => {
            setBody(e.target.value);
          }}
          value={body}
        />{" "}
      </div>
      <button onClick={save}>Save</button>

      {comments.map((data, index) => (
        <div style={{marginBottom: "10px", borderTop:"1px solid gray"}}>
          {index + 1}. {data.title}
          <div>{data.body}</div>
        </div>
      ))}
    </div>
  );
};
