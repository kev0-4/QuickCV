import { useState } from "react";
import NavBar from "../components/NavBar";

const JdPage = () => {
  const [jdFile, setJdFile] = useState(null);
  const [cvFile, setCvFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleJdUpload = (e) => {
    setJdFile(e.target.files[0]);
    setError(null);
  };

  const handleCvUpload = (e) => {
    setCvFile(e.target.files[0]);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!jdFile || !cvFile) {
      setError("Please upload both JD and CV files");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("jd_file", jdFile);
      formData.append("cv_file", cvFile);

      const response = await fetch(
        "https://quickcv.onrender.com/api/compare_cv_jd",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to analyze files");
      }

      const data = await response.json();
      setResult(data);
      console.log(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#7461c2]">
      {/* <NavBar/> */}

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="hero min-h-[50vh] bg-cover bg-center relative rounded-2xl mb-12">
          <div className="hero-overlay bg-opacity-20"></div>
          <div className="hero-content text-center relative z-10">
            <div className="max-w-3xl">
              <div className="flex items-center justify-center mb-4">
                <h1 className="text-5xl font-bold text-white mr-3">
                  Job Description Analysis
                </h1>
                {/* Job Icon */}
                <img
                  src="https://img.icons8.com/?size=100&id=eoxMN35Z6JKg&format=png&color=000000"
                  alt="AI Job Analysis"
                  className="w-12 h-12 ml-2"
                />
              </div>
              <div className="bg-purple-800 bg-opacity-30 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
                <p className="py-2 text-white font-bold text-lg mb-3">
                  Upload a job description and candidate CV to check
                  compatibility using our advanced AI analysis.
                </p>
                <div className="text-white text-sm text-left">
                  <p className="mb-2">
                    <span className="font-bold">
                      How compatibility is calculated:
                    </span>
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      Skills matching (60%): Comparison of required skills with
                      candidate's expertise
                    </li>
                    <li>
                      Education relevance (20%): Evaluation of academic
                      qualifications against requirements
                    </li>
                    <li>
                      Experience analysis (20%): Assessment of work history and
                      domain knowledge
                    </li>
                  </ul>
                  <div className="flex items-center justify-center mt-4">
                    <p className="text-xs opacity-80">Powered by</p>
                    <span className="ml-2 font-bold text-sm flex items-center">
                      AI
                      <img
                        src="https://icons8.com/icon/20497/permanent-job"
                        alt="Permanent Job"
                        className="w-5 h-5 ml-1"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://img.icons8.com/?size=48&id=20497&format=png";
                        }}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Upload Section */}
        <div className="card bg-base-100 shadow-xl p-6 mb-12">
          <div className="card-body">
            <h2 className="card-title text-3xl mb-6">Upload Documents</h2>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* JD Upload */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg">
                      Job Description (PDF)
                    </span>
                  </label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleJdUpload}
                    className="file-input file-input-bordered file-input-primary w-full"
                  />
                  {jdFile && (
                    <div className="mt-2 text-sm text-gray-600">
                      Selected: {jdFile.name}
                    </div>
                  )}
                </div>

                {/* CV Upload */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg">
                      Candidate CV (PDF)
                    </span>
                  </label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleCvUpload}
                    className="file-input file-input-bordered file-input-primary w-full"
                  />
                  {cvFile && (
                    <div className="mt-2 text-sm text-gray-600">
                      Selected: {cvFile.name}
                    </div>
                  )}
                </div>
              </div>

              {error && (
                <div className="alert alert-error mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              <div className="card-actions justify-center">
                <button
                  type="submit"
                  className={`btn btn-primary ${isLoading ? "loading" : ""}`}
                  disabled={isLoading}
                >
                  {isLoading ? "Analyzing..." : "Check Compatibility"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div className="card bg-base-100 shadow-xl p-6 mb-12">
            <div className="card-body">
              <h2 className="card-title text-3xl mb-6">Analysis Results</h2>

              {/* Summary Card */}
              <div className="card bg-purple-100 shadow-lg mb-8">
                <div className="card-body">
                  <h3 className="card-title text-2xl text-purple-800">
                    Summary
                  </h3>
                  <div className="stats shadow">
                    <div className="stat">
                      <div className="stat-title">Compatibility Score</div>
                      <div className="stat-value text-primary">
                        {result.ats_score}%
                      </div>
                      <div className="stat-desc">
                        Overall match with job requirements
                      </div>
                    </div>

                    <div className="stat">
                      <div className="stat-title">Experience Level</div>
                      <div className="stat-value text-info">
                        {result.experience_analysis.level || "Intern"}
                      </div>
                      <div className="stat-desc">
                        {result.experience_analysis.years || "Less than 1 year"}
                      </div>
                    </div>

                    <div className="stat">
                      <div className="stat-title">Education</div>
                      <div className="stat-value text-info">
                        {result.education_analysis.degree || "BTech"}
                      </div>
                      <div className="stat-desc">
                        {result.education_analysis.relevance || "Relevant"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills Analysis */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Matched Skills */}
                <div className="card bg-green-50">
                  <div className="card-body">
                    <h3 className="card-title text-green-800">
                      Matched Skills
                    </h3>
                    <div className="space-y-2">
                      {result.skills_analysis.matched &&
                        result.skills_analysis.matched.map((skill, index) => (
                          <div
                            key={index}
                            className="badge badge-success badge-lg gap-2 mr-2 mb-2"
                          >
                            {skill}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Missing Skills */}
                <div className="card bg-red-50">
                  <div className="card-body">
                    <h3 className="card-title text-red-800">Missing Skills</h3>
                    <div className="space-y-2">
                      {result.skills_analysis.missing &&
                        result.skills_analysis.missing.map((skill, index) => (
                          <div
                            key={index}
                            className="badge badge-error badge-lg gap-2 mr-2 mb-2"
                          >
                            {skill}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Bonus Skills */}
                <div className="card bg-blue-50">
                  <div className="card-body">
                    <h3 className="card-title text-blue-800">Bonus Skills</h3>
                    <div className="space-y-2">
                      {result.skills_analysis.bonus &&
                        result.skills_analysis.bonus.map((skill, index) => (
                          <div
                            key={index}
                            className="badge badge-info badge-lg gap-2 mr-2 mb-2"
                          >
                            {skill}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Improvement Suggestions */}
              <div className="card bg-yellow-50">
                <div className="card-body">
                  <h3 className="card-title text-yellow-800">
                    Improvement Suggestions
                  </h3>
                  <ul className="space-y-2">
                    {result.improvement_suggestions &&
                      result.improvement_suggestions.map(
                        (suggestion, index) => (
                          <li key={index} className="flex items-start">
                            <svg
                              className="w-5 h-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              ></path>
                            </svg>
                            <span>{suggestion}</span>
                          </li>
                        )
                      )}
                  </ul>
                </div>
              </div>

              {/* Summary Text */}
              <div className="card bg-gray-50 mt-6">
                <div className="card-body">
                  <h3 className="card-title text-gray-800">Detailed Summary</h3>
                  <p className="text-gray-700">{result.summary}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JdPage;
