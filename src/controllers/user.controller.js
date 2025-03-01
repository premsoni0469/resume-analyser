const asyncHandler = require("../utils/asyncHandler.js");
const apiError = require("../utils/ApiError.js");
const apiResponse = require("../utils/ApiResponse.js");
const path = require("path");
const fs = require("fs");
const saveToCSV = require("../utils/convertToCsv.js");
const {extractTextFromDOCX, extractTextFromPDF} = require("../utils/extractDataFromFile.js");
const readCSV = require("../utils/readCsv.js")






const resetFolder = (folderPath) => {
    try {
        fs.rmSync(folderPath, { recursive: true, force: true });
        fs.mkdirSync(folderPath); 
        
    } catch (error) {
        throw new apiError(400, "Error resetting folder")
    }
};




const applicantResumeUpload = asyncHandler( async (req, res) => {
  const resumePath = req.file?.path;
  
  if(!resumePath){
      throw new apiError(400, "Resume file is missing")
  }


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
    
  const analysis ={
    totalScore: 0,
    parseRate: 94,
    sections: {
      content: { score: 75, items: ["ATS Parse Rate", "Quantifying Impact", "Repetition", "Spelling & Grammar"] },
      format: { score: 100, items: ["File Format", "Margins", "Font"] },
      sections: { score: 67, items: ["Experience", "Education", "Skills"] },
      skills: { score: 100, items: ["Technical Skills", "Soft Skills"] },
      style: { score: 75, items: ["Active Voice", "Action Words"] },
    }
  }
  await resetFolder("./public/temp");
  await resetFolder("./public/uploads");

  if(!analysis){
      throw new apiError(500, "ATS Score is not Generated")
  }

  return res
  .status(200)
  .json(
      new apiResponse(200, analysis, "Resume file is stored")
  )


})


const recruterResumeUpload = asyncHandler( async (req, res) => {
  const resumePaths = req.files.map(file => file.path);
  if(!resumePaths){
      throw new apiError(400, "Resume file is missing")
  }


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
  const analysis ={
    totalScore: 0,
    parseRate: 94,
    sections: {
      content: { score: 75, items: ["ATS Parse Rate", "Quantifying Impact", "Repetition", "Spelling & Grammar"] },
      format: { score: 100, items: ["File Format", "Margins", "Font"] },
      sections: { score: 67, items: ["Experience", "Education", "Skills"] },
      skills: { score: 100, items: ["Technical Skills", "Soft Skills"] },
      style: { score: 75, items: ["Active Voice", "Action Words"] },
    }
  }

  await resetFolder("./public/temp");
  await resetFolder("./public/uploads");

  if(!analysis){
      throw new apiError(500, "ATS Score is not Generated")
  }

  return res
  .status(200)
  .json(
      new apiResponse(200, analysis, "Resume file is stored")
  )


})

module.exports = {
    applicantResumeUpload,
    applicantResumeScore,
    recruterResumeUpload,
    recruterResumeScore,
}