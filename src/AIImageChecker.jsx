import React, { useState } from "react";
import { Client } from "@gradio/client";
import { useDropzone } from "react-dropzone";

function AIImageChecker() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const onDrop = (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setResult(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const handleSubmit = async () => {
    if (!file) return;
    setLoading(true);
    setResult(null);

    try {
      const client = await Client.connect("ymcmy/AI_Generated_Image_Detector");
      const res = await client.predict("/predict", { image: file });
      setResult(res.data[0]); // string result
    } catch (err) {
      console.error(err);
      alert("Server busy or network error, try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "50px auto", textAlign: "center", fontFamily: "sans-serif" }}>
      <h1>AI Image Checker</h1>

      <div
        {...getRootProps()}
        style={{
          border: "2px dashed #aaa",
          padding: 20,
          cursor: "pointer",
          borderRadius: 8,
          marginBottom: 20,
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the image here ...</p>
        ) : (
          <p>{file ? "Selected: " + file.name : "Drag & drop an image here, or click to select"}</p>
        )}
      </div>

      {result && (
        <div
          style={{
            marginTop: 20,
            padding: 15,
            borderRadius: 8,
            backgroundColor: result.toLowerCase().includes("ai") ? "#f8d7da" : "#d4edda",
            color: result.toLowerCase().includes("ai") ? "#721c24" : "#155724",
            fontWeight: "bold",
          }}
        >
          {result}
        </div>
      )}

      {preview && (
        <div style={{ marginBottom: 20, marginTop: 20 }}>
          <img
            src={preview}
            alt="Preview"
            style={{ maxWidth: "100%", borderRadius: 8 }}
          />
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={!file || loading}
        style={{
          padding: "10px 20px",
          fontSize: 16,
          cursor: file && !loading ? "pointer" : "not-allowed",
          borderRadius: 6,
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
        }}
      >
        {loading ? "Checking..." : "Check Image"}
      </button>
    </div>
  );
}

export default AIImageChecker;
