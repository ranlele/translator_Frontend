import React, { useState } from "react";
import axios from "axios";

const TranscriptionForm = () => {
  const [file, setFile] = useState(null);
  const [transcription, setTranscription] = useState("");
  const [translation, setTranslation] = useState("");
  const [loading, setLoading] = useState(false); // 添加这行

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true); // 添加这行
    console.log("Submitting file...");
    try {
      const response = await axios.post("http://localhost:8080/transcribe", formData);
      console.log("Response from server:", response);
      setTranscription(response.data.transcription);
      setTranslation(response.data.translation);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
    setLoading(false); // 添加这行
  };

  return (
    <div className="container">
      <h1>Speech-to-Text</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="audio/*" onChange={handleFileChange} />
        <button type="submit" disabled={loading}> {/* 添加这行 */}
          Transcribe
        </button>
      </form>
      {loading && <p>Loading...</p>} {/* 添加这行 */}
      {transcription && (
        <div>
          <h2>Transcription:</h2>
          <p>{transcription}</p>
        </div>
      )}
      {translation && (
        <div>
          <h2>Translation:</h2>
          <p>{translation}</p>
        </div>
      )}
    </div>
  );
};

export default TranscriptionForm;
