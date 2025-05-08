const fs = require("fs");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");


const extractTextFromPDF = async (filePath) => {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    return data.text;
};
  
  
  const extractTextFromDOCX = async (filePath) => {
    const data = await mammoth.extractRawText({ path: filePath });
    return data.value;
};
  
module.exports = {extractTextFromDOCX, extractTextFromPDF};