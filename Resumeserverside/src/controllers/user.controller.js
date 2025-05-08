const asyncHandler = require("../utils/asyncHandler.js");
const apiError = require("../utils/ApiError.js");
const apiResponse = require("../utils/ApiResponse.js");
const path = require("path");
const fs = require("fs");
const saveToCSV = require("../utils/convertToCsv.js");
const {extractTextFromDOCX, extractTextFromPDF} = require("../utils/extractDataFromFile.js");
const readCSV = require("../utils/readCsv.js")
const axios = require("axios");




let rp1 
let rp2


const resetFolder = (folderPath) => {
    try {
        fs.rmSync(folderPath, { recursive: true, force: true });
        fs.mkdirSync(folderPath); 
        
    } catch (error) {
        throw new apiError(400, "Error resetting folder")
    }
};




const applicantResumeUpload = asyncHandler( async (req, res) => {
  const resumePath = req.file?.path ;
  
  if(!resumePath){
      throw new apiError(400, "Resume file is missing")
  }
  rp1 = resumePath;
  

  let fileDataArray = [];

  const filePath = resumePath;
  const ext = path.extname(filePath).toLowerCase();
  let extractedText = "";

  try {
    if (ext === ".pdf") {
      extractedText = await extractTextFromPDF(filePath);
    } else if (ext === ".docx") {
      extractedText = await extractTextFromDOCX(filePath);
    } else {
      extractedText = fs.readFileSync(filePath, "utf8"); 
    }
  } catch (error) {
    throw new apiError(400, "Please upload .docx or .pdf files")
  }

  fileDataArray.push({ filename: req.file.filename, content: extractedText });

  const csvFilePath = await saveToCSV(fileDataArray);
  if(!csvFilePath){
    throw new apiError(400, "CSV file is missing")
  }

  const csvData = await readCSV(csvFilePath);
  if(!csvData){
    throw new apiError(400, "CSV data is missing")
  }
  return res
  .status(200)
  .json(
      new apiResponse(200, csvData, "Resume file is stored")
  )
    
})




const applicantResumeScore = asyncHandler( async (req, res) => {
    
  
  
  try {
    

    // const resumePath = req.file?.path;
    const resumePath = "C:\\Users\\Rahul Soni\\Downloads\\Final Resume Analyzer Project Sem 6\\Resumeserverside\\" + rp1;
   
    
    if (!resumePath) {
        throw new apiError(400, "Resume file is missing");
    }
    
    
    // Send file path to Flask API
    const response = await axios.post("http://127.0.0.1:5001/predict", {
        file_path: resumePath
    });
    
    
    const prediction = response.data.prediction;
    
    // console.log("Prediction: ",prediction);
    
    await resetFolder("./public/temp");
    await resetFolder("./public/uploads");
  
    return res.status(200).json(new apiResponse(200, { prediction }, "ATS Score Generated"));
} catch (error) {
    throw new apiError(500, "ATS Score Generation Failed: " + error.message);
}

})


// for recruter
const recruterResumeUpload = asyncHandler( async (req, res) => {
  const resumePaths = req.files.map(file => file.path);
  
  if(!resumePaths){
      throw new apiError(400, "Resume file is missing")
  }
  rp2 = resumePaths;
  
  
  
  
  let fileDataArray = [];

  for (const file of req.files) {
    const filePath = file.path;
    
    const ext = path.extname(filePath).toLowerCase();
    let extractedText = "";

    try {
      if (ext === ".pdf") {
        extractedText = await extractTextFromPDF(filePath);
      } else if (ext === ".docx") {
        extractedText = await extractTextFromDOCX(filePath);
      } else {
        extractedText = fs.readFileSync(filePath, "utf8"); 
      }
    } catch (error) {
      throw new apiError(400, "Please upload .docx or .pdf files")
    }

    fileDataArray.push({ filename: file.filename, content: extractedText });
  }

  const csvFilePath = await saveToCSV(fileDataArray);
  if(!csvFilePath){
    throw new apiError(400, "CSV file is missing")
  }

  const csvData = await readCSV(csvFilePath);
  if(!csvData){
    throw new apiError(400, "CSV data is missing")
  }
  
  
  return res
  .status(200)
  .json(
      new apiResponse(200, csvData, "Resume files is stored")
  )
  
})




const recruterResumeScore = asyncHandler( async (req, res) => {
  
  try {
    

    const predictions = [];
    
    
    
    for (const fileName of rp2) {
      const resumePath = "C:\\Users\\Rahul Soni\\Downloads\\Final Resume Analyzer Project Sem 6\\Resumeserverside\\" + fileName;
      if (!resumePath) {
        throw new apiError(400, "Resume file is missing");
      }
      
      

      const filePath = fileName;
      const ext = path.extname(filePath).toLowerCase();
      let extractedText = "";
      try {
        if (ext === ".pdf") {
          extractedText = await extractTextFromPDF(filePath);
        } else if (ext === ".docx") {
          extractedText = await extractTextFromDOCX(filePath);
        } else {
          extractedText = fs.readFileSync(filePath, "utf8"); 
        }
      } catch (error) {
        throw new apiError(400, "Please upload .docx or .pdf files")
      }

      // Extract name (simplistic approach: first non-empty line)
      const lines = extractedText.split('\n').map(line => line.trim()).filter(Boolean);
      let applicant_name = "Unknown"; // Initialize with default
    
      if (lines.length > 0) {
        let firstLine = lines[0]; // Get the first non-empty line
    
        
        firstLine = firstLine.replace(/^name[:\-\s]*/i, '').trim();
    
        
        const nameRegex = /(.+?)(?=\s+\(|\s+(?:Email|Skype|Mob|Phone|Tel|Employer)|\s*[:;]|\s+-\s+|,\s+|$)/i;
        const match = firstLine.match(nameRegex);
    
        if (match && match[1]) {
          
          applicant_name = match[1].trim();
        } else if (firstLine) {
          
          applicant_name = firstLine;
        }
       
        if (!applicant_name) {
          applicant_name = "Unknown";
        }
      }
    
      // Extract experience using regex
      const experienceMatch = extractedText.match(/(\d+(\.\d+)?)(\s+)?(years?|yrs?)\b/i);
      const experience = experienceMatch ? experienceMatch[1] : "0";


      const fn = path.basename(fileName);
      const actualFileName = fn.split('-').slice(1).join('-');    

      

      const response = await axios.post("http://127.0.0.1:5001/predict", {
          file_path: resumePath
      });

      
      
      predictions.push({
          fileName: actualFileName,
          atsScore: response.data.prediction,
          name: applicant_name,
          year: experience,
      });
    }
    
    
    await resetFolder("./public/temp");
    await resetFolder("./public/uploads");
    
    

    return res.status(200).json(new apiResponse(200, { predictions }, "ATS Score Generated"));

  } catch (error) {
      throw new apiError(500, "ATS Score Generation Failed: " + error.message);
  }


})

module.exports = {
    applicantResumeUpload,
    applicantResumeScore,
    recruterResumeUpload,
    recruterResumeScore,
}