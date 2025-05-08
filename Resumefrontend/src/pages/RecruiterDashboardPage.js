"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { motion } from "framer-motion"
import { CloudArrowUpIcon, FunnelIcon, ArrowsUpDownIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import axios from 'axios';
import { useToast } from "../components/ui/use-toast"; // Assuming path is correct

const RecruiterDashboardPage = () => {
  const [files, setFiles] = useState([])
  const [rankings, setRankings] = useState([])
  const [filterCriteria, setFilterCriteria] = useState("all")
  const [sortCriteria, setSortCriteria] = useState("score")
  const [searchTerm, setSearchTerm] = useState("")
  const [dashboardData, setDashboardData] = useState({
    candidateScores: [
      { name: "90-100", count: 0 },
      { name: "80-89", count: 0 },
      { name: "70-79", count: 0 },
      { name: "60-69", count: 0 },
      { name: "<60", count: 0 },
    ],
  })


  const calculateScoreDistribution = (currentRankings) => {
    // Initialize counts for each bracket
    const scoreCounts = {
        "90-100": 0,
        "80-89": 0,
        "70-79": 0,
        "60-69": 0,
        "<60": 0,
    };

    // Iterate through the rankings and increment the appropriate count
    currentRankings.forEach(rank => {
        // Ensure score is a number before processing
        if (typeof rank.score === 'number') {
            const score = rank.score;
            if (score >= 90 && score <= 100) { // Be precise with ranges if needed (e.g., <= 100)
                scoreCounts["90-100"]++;
            } else if (score >= 80 && score < 90) {
                scoreCounts["80-89"]++;
            } else if (score >= 70 && score < 80) {
                scoreCounts["70-79"]++;
            } else if (score >= 60 && score < 70) {
                scoreCounts["60-69"]++;
            } else if (score < 60) {
                scoreCounts["<60"]++;
            }
        } else {
            console.warn(`Invalid score type for candidate: ${rank.candidateName || rank.fileName}`);
        }
    });

    // Format the counts into the array structure required by the state/chart
    const newChartData = [
        { name: "90-100", count: scoreCounts["90-100"] },
        { name: "80-89", count: scoreCounts["80-89"] },
        { name: "70-79", count: scoreCounts["70-79"] },
        { name: "60-69", count: scoreCounts["60-69"] },
        { name: "<60", count: scoreCounts["<60"] },
    ];

    return newChartData;
  };




  const { toast } = useToast();
  const handleUploadAndFetchScores = async (filesToUpload) => {
    if (!filesToUpload || filesToUpload.length === 0) {
      toast({
        title: "No Files Provided",
        description: "Cannot process empty file list.",
        variant: "destructive",
      });
      return null; 
    }

    const formData = new FormData();
    // --- Correctly append multiple files ---
    filesToUpload.forEach((file) => {
      
      formData.append("resume", file, file.name);
    });
    

    try {
      
      await axios.post("http://localhost:8000/api/v1/users/recruiter-user", formData, {
        headers: {
           // Axios sets Content-Type automatically for FormData, but explicitly is fine too.
           // However, DO NOT manually set 'Content-Type': 'multipart/form-data' if you provide boundary; let axios handle it.
        },
        
      });
      console.log("Upload successful. Fetching scores...");
      toast({
        title: "Upload Successful",
        description: `${filesToUpload.length} resume(s) uploaded. Fetching scores...`,
      });


      // Step 2: Fetch the scores calculated by the backend
      
      const scoreResponse = await axios.get("http://localhost:8000/api/v1/users/recruiter-resume-score");
      console.log("Scores fetched:", scoreResponse.data);

      
      const predictionData = scoreResponse.data?.data?.predictions; 

      if (!predictionData) {
          console.warn("Prediction data not found in API response:", scoreResponse.data);
           toast({
             title: "Processing Incomplete",
             description: "Scores could not be retrieved. Check backend logs.",
             variant: "warning",
           });
           return null;
      }

      return predictionData; // Return the fetched data

    } catch (err) {
      const message = err.response?.data?.message || err.message || "Upload or fetch failed. Please try again.";
      toast({
          title: "API Error",
          description: message,
          variant: "destructive",
      });
      console.error("API error:", err.response || err); // Log detailed error
      return null; // Indicate failure
    }
  };


  const onDrop = useCallback(async (acceptedFiles) => {
    setFiles(acceptedFiles)
    // Simulate ATS score calculation and ranking
    

    try {
      // Call the combined upload and fetch function, passing the accepted files
      const fetchedPredictions = await handleUploadAndFetchScores(acceptedFiles);
      setRankings([]);
      setDashboardData(prev => ({
        ...prev,
        candidateScores: prev.candidateScores.map(item => ({ ...item, count: 0 }))
      }));

      if (fetchedPredictions && Array.isArray(fetchedPredictions)) {
         
          const newRankings = fetchedPredictions.map((prediction, index) => ({
              id: prediction.id || index, 
              candidateName: prediction.name || `Candidate ${index + 1}`, 
              fileName: prediction.fileName || `File ${index + 1}`, 
              score: Math.floor(prediction.atsScore) || 0, 
              experience: prediction.year || 0, 
          }));

          setRankings(newRankings); 
          const newChartData = calculateScoreDistribution(newRankings);
            setDashboardData(prevData => ({
                ...prevData, // Keep any other dashboard data
                candidateScores: newChartData // Update only the scores part
            }));


          toast({
              title: "Processing Complete",
              description: `Rankings updated for ${newRankings.length} candidate(s).`,
          });

          // Optional: Update Bar Chart Data based on new rankings
          //updateDashboardChart(newRankings);

      } else {
          setRankings([]);
          console.log("No valid prediction data received to update rankings.");
      }
  } catch (error) {
      // Catch any unexpected errors during the onDrop process itself
      console.error("Error in onDrop handler:", error);
      toast({
          title: "Processing Error",
          description: "An unexpected error occurred during file processing.",
          variant: "destructive",
      });
      setRankings([]);
        setDashboardData(prev => ({
            ...prev,
            candidateScores: prev.candidateScores.map(item => ({ ...item, count: 0 }))
        }));
  } 

}, [toast]);


  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const filteredAndSortedRankings = rankings
    .filter((resume) => {
      if (filterCriteria === "all") return true
      if (filterCriteria === "highScore") return resume.score >= 80
      if (filterCriteria === "experienced") return resume.experience >= 5
      return true
    })
    .filter(
      (resume) =>
        resume.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resume.candidateName.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortCriteria === "score") return b.score - a.score
      if (sortCriteria === "experience") return b.experience - a.experience
      return 0
    })

  return (
    <div className="container mx-auto px-44 py-12 min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-blue-600 bg-clip-text">
        Recruiter Dashboard
            </h1>
        {/* <p className="text-xl text-gray-600 dark:text-gray-300">
          Efficiently screen and rank resumes with AI-powered insights
        </p> */}
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Efficiently screen and rank resumes according to ATS scores
        </p>
      </motion.div>
      

      <div className="grid grid-cols-1 gap-8 mb-12">
        {/* Bulk Resume Upload Section */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Bulk Resume Upload</h2>
          <div
            {...getRootProps()}
            className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-all duration-300 ${
              isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-500"
            }`}
          >
            <input {...getInputProps()} />
            <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Drag & drop resumes here, or click to select files
            </p>
          </div>
          {files.length > 0 && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              {files.length} {files.length === 1 ? "file" : "files"} uploaded
            </p>
          )}
        </div>

        {/* Candidate Scores Section */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Candidate Scores</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dashboardData.candidateScores}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ATS Rankings Section */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">ATS Rankings</h2>
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
            <div className="flex items-center">
              <FunnelIcon className="h-5 w-5 text-gray-400 mr-2" />
              <select
                value={filterCriteria}
                onChange={(e) => setFilterCriteria(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="all">All Resumes</option>
                <option value="highScore">High Scores (80+)</option>
                <option value="experienced">Experienced (5+ years)</option>
              </select>
            </div>
            <div className="flex items-center">
              <ArrowsUpDownIcon className="h-5 w-5 text-gray-400 mr-2" />
              <select
                value={sortCriteria}
                onChange={(e) => setSortCriteria(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="score">Sort by Score</option>
                <option value="experience">Sort by Experience</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <div className="relative">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute top-3 left-3" />
              <input
                type="text"
                placeholder="Search resumes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Table View for ATS Rankings */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    File Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Candidate Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ATS Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Experience
                  </th>
                  
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAndSortedRankings.map((resume) => (
                  <tr key={resume.id} className="hover:bg-gray-50">
                    
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{resume.fileName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {resume.candidateName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{resume.score}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{resume.experience} years</td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecruiterDashboardPage
