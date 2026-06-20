import ReactMarkdown from "react-markdown";

function AnalysisResult({ analysis }) {
  const atsMatch = analysis.match(/ATS Score:\s*(\d+)\/100/i);

  const atsScore = atsMatch
    ? parseInt(atsMatch[1])
    : 0;

  return (
    <div className="mt-8 space-y-6">

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-4">
          ATS Score
        </h2>

        <div className="w-full bg-gray-200 rounded-full h-6">
          <div
            className="bg-green-500 h-6 rounded-full"
            style={{
              width: `${atsScore}%`
            }}
          />
        </div>

        <p className="mt-3 text-lg font-semibold">
          {atsScore}/100
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6">
          Resume Analysis
        </h2>

        <div className="prose max-w-none">
          <ReactMarkdown>
            {analysis}
          </ReactMarkdown>
        </div>
      </div>

    </div>
  );
}

export default AnalysisResult;