import React, { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    if (!text.trim()) return;

    setLoading(true);

    const res = await fetch("http://localhost:5000/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();
    setResult(data.result);
    setLoading(false);
  };

  // Format output nicely
  const formatResult = (text) => {
    return text.split("\n").map((line, index) => {
      if (line.includes("Summary:"))
        return <h4 key={index}>🧠 Summary</h4>;

      if (line.includes("Key Points:"))
        return <h4 key={index}>📌 Key Points</h4>;

      if (line.includes("Action Items:"))
        return <h4 key={index}>✅ Action Items</h4>;

      return <p key={index}>{line}</p>;
    });
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        background: "#f7f9fc",
        minHeight: "100vh",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "auto",
          background: "white",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        {/* Title */}
        <h1 style={{ marginBottom: 5 }}>
          Smart Notes AI – Knowledge Extraction Tool
        </h1>

        <p style={{ color: "gray", marginBottom: 20 }}>
          Transform unstructured text into structured insights (summary, key
          points, and action items)
        </p>

        {/* Input */}
        <textarea
          rows="8"
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "14px",
          }}
          placeholder="Paste your notes here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* Button */}
        <button
          onClick={analyze}
          style={{
            marginTop: 15,
            padding: "12px 20px",
            background: loading ? "#9ccc9c" : "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          {loading ? "Analyzing..." : "Analyze Notes"}
        </button>

        {/* Output */}
        {result && (
          <div style={{ marginTop: 25 }}>
            <h3>📌 Results</h3>

            <div
              style={{
                background: "#f4f6f8",
                padding: "15px",
                borderRadius: "8px",
                fontSize: "14px",
                lineHeight: "1.6",
              }}
            >
              {formatResult(result)}
            </div>
          </div>
        )}

        {/* Footer */}
        <p
          style={{
            marginTop: 30,
            fontSize: "12px",
            color: "gray",
            textAlign: "center",
          }}
        >
          Inspired by knowledge management platforms like Propel
        </p>
      </div>
    </div>
  );
}

export default App;