import { useState } from "react";
import HeroComponent from "./components/HeroComponent";
import NavBar from "./components/NavBar";
import "./App.css";
import UploadButton from "./components/UploadButton";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Details from "./pages/details";
import WhyUseUs from "./components/WhyUs";
import PoweredByGoogleGemini from "./components/PoweredByGoogle";

function App() {
  const [cvData, setCvData] = useState(null);
  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:8000/api/upload_cv", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setCvData(response.data.cv_summary); //state stores cv
    } catch (error) {
      console.error("Error uploading CV:", error);
    }
  };
  return (

    <Router>
      <NavBar />
      
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroComponent />
              <PoweredByGoogleGemini /> 
              <UploadButton onUpload={handleFileUpload} />
              </>
          }
        />
        <Route path="/details" element={<Details />} />
      </Routes>
      <WhyUseUs></WhyUseUs>
    </Router>
  );
}

export default App;
