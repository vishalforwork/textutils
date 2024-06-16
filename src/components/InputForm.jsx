import React, { useState } from "react";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { Box, Button } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const InputForm = () => {
  const [text, setText] = useState("");
  const [len, setLen] = useState(0);
  const [lineLen, setLineLen] = useState(0);
  const [newLine, setNewLine] = useState("");
  const [readTime, setReadTime] = useState(0);


  const handleChange = (e) => {
    setText(e.target.value);

    setNewLine(text.includes(".") ? text.split(".") : text);
    setLineLen(newLine.length);

    setReadTime(len * 60 / 225)
   
    setLen(text.split(" ").length)    
  };

  const handleCaptitalize = () => {
    if (text.includes(".")) {
        let line = text.includes(".") ? text.split(".") : text;
   
        const cap = line.map((x) => {
          x = x.trim();
          let capped = x.charAt(0).toUpperCase() + x.slice(1).toLowerCase();
          return capped;
        });
        const capitalized = cap.join(".");
   
        setText(capitalized);
    }
    else {
        setText(text.charAt(0).toUpperCase() + text.slice(1).toLowerCase())
    }
  };

  const handleUpperCase = () => {
    const cap = text.toUpperCase();
    setText(cap);
  };

  const handleLowerCase = () => {
    const cap = text.toLowerCase();
    setText(cap);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy: ", err);
    }
  };


  return (
    <>
      <TextareaAutosize
        minRows={4}
        cols={100}
        placeholder="Enter your text here"
        name="text"
        value={text}
        onChange={handleChange}
      />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box mx={1}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCaptitalize}
          >
            Capitalize
          </Button>
        </Box>
        <Box mx={1}>
          <Button variant="contained" color="primary" onClick={handleUpperCase}>
            Upper Case
          </Button>
        </Box>
        <Box mx={1}>
          <Button variant="contained" color="primary" onClick={handleLowerCase}>
            Lower Case
          </Button>
        </Box>
        <Box mx={1}>
          <Button variant="contained" color="error" onClick={() => setText("")}>
            Clear
          </Button>
        </Box>
        <Box mx={1}>
          <Button
            variant="contained"
            color="secondary"
            onClick={copyToClipboard}
          >
            Copy
          </Button>
        </Box>
      </Box>


      <div
        style={{
          boxShadow: "1px 1px 5px #878787",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          height: 150,
          maxWidth: '800px',
          margin: "20px",
          overflowY: "scroll"
        }}
      >
          {text}
      </div>

      <div> The text contains {len} words, {text.length} letters and {lineLen} sentences</div>
      <div>Time required for reading this text is : {readTime} seconds</div>
    </>
  );
};

export default InputForm;