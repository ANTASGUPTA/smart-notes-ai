import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Mock AI function
function analyzeText(text) {
  const sentences = text.split(".").filter(s => s.trim().length > 0);

  const summary = sentences.slice(0, 2).join(". ") + ".";

  const keyPoints = sentences
    .slice(0, 5)
    .map(s => "- " + s.trim())
    .join("\n");

  const actionItems = sentences
    .filter(s =>
      s.toLowerCase().includes("should") ||
      s.toLowerCase().includes("need") ||
      s.toLowerCase().includes("must")
    )
    .map(s => "- " + s.trim())
    .join("\n") || "- No clear action items detected";

  return `
Summary:
${summary}

Key Points:
${keyPoints}

Action Items:
${actionItems}
`;
}

app.post("/analyze", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  const result = analyzeText(text);
  res.json({ result });
});

app.listen(5000, () => console.log("Backend running on http://localhost:5000"));