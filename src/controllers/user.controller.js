const asyncHandler = require("../utils/asyncHandler.js")
const apiError = require("../utils/ApiError.js")
const apiResponse = require("../utils/ApiResponse.js")
const fs = require("fs")






const resetFolder = (folderPath) => {
    try {
        fs.rmSync(folderPath, { recursive: true, force: true });
        fs.mkdirSync(folderPath); 
        
    } catch (error) {
        throw new apiError(400, "Error resetting folder")
    }
};




const applicantResumeUpload = asyncHandler( (req, res) => {
    const resumePath = req.file?.path;
   
    if(!resumePath){
        throw new apiError(400, "Resume file is missing")
    }

    return res
    .status(200)
    .json(
        new apiResponse(200, resumePath, "Resume file is stored")
    )
    
})




const applicantResumeScore = asyncHandler( async (req, res) => {
    const analysis = {
        score: 75,
        sections: [
          {
            title: "Format & Structure",
            description: "Analysis of your resume's format and structure",
            score: 80,
            items: [
              {
                title: "File Format",
                status: "success",
                description: "Your resume is in an ATS-friendly format",
              },
              {
                title: "Length",
                status: "success",
                description: "Resume length is appropriate (1-2 pages)",
              },
              {
                title: "Sections",
                status: "warning",
                description: "Consider adding a Skills section",
              },
            ],
          },
          {
            title: "Content Quality",
            description: "Evaluation of your resume's content",
            score: 70,
            items: [
              {
                title: "Action Words",
                status: "success",
                description: "Good use of action verbs",
              },
              {
                title: "Achievements",
                status: "warning",
                description: "Add more quantifiable achievements",
              },
              {
                title: "Keywords",
                status: "warning",
                description: "Include more industry-specific keywords",
              },
            ],
          },
          {
            title: "ATS Compatibility",
            description: "How well your resume works with ATS systems",
            score: 85,
            items: [
              {
                title: "Parsing",
                status: "success",
                description: "Content is easily parsed by ATS systems",
              },
              {
                title: "Formatting",
                status: "success",
                description: "No complex formatting that could confuse ATS",
              },
            ],
          },
        ],
    }

    await resetFolder("./public/temp");

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
    applicantResumeScore
}