import UploadForm from "./components/UploadForm";

function App() {
  return (
    <div className="min-h-screen bg-slate-100">

      <nav className="bg-black text-white py-4">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-xl font-bold">
            AI Resume Analyzer
          </h1>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-12">

        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold mb-3">
            Analyze Your Resume
          </h1>

          <p className="text-gray-600">
            Upload your PDF resume and get
            AI-powered recruiter feedback.
          </p>
        </div>

        <UploadForm />

      </div>
    </div>
  );
}

export default App;