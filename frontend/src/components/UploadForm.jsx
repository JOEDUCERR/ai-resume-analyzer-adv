import { useState } from "react";
import { analyzeResume } from "../services/api";
import { ClipLoader } from "react-spinners";
import AnalysisResult from "./AnalysisResult";

function UploadForm() {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setAnalysis("");
  };

  const handleAnalyze = async () => {
    if (!file) {
      alert("Please select a PDF resume.");
      return;
    }

    setLoading(true);

    try {
      const result = await analyzeResume(file);
      setAnalysis(result.analysis);
    } catch (error) {
      console.error(error);
      alert("Failed to analyze resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="space-y-4">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="block w-full border rounded-lg p-3"
          />

          {file && (
            <p className="text-green-600 font-medium">
              Resume Selected: {file.name}
            </p>
          )}

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg hover:opacity-90 disabled:opacity-50"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-3">
              <ClipLoader size={20} />
              <span>Analyzing...</span>
              </div>
            ) : (
              "Analyze Resume"
            )}
          </button>
        </div>
      </div>

      {analysis && (
        <AnalysisResult analysis={analysis} />
      )}
    </>
  );
}

export default UploadForm;