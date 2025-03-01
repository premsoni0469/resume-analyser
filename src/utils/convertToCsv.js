const createCsvWriter = require("csv-writer").createObjectCsvWriter;


const saveToCSV = async (fileDataArray) => {
    const csvFilePath = "./public/uploads/output.csv"; 
  
    const csvWriter = createCsvWriter({
      path: csvFilePath,
      header: [
        { id: "filename", title: "Filename" },
        { id: "content", title: "Extracted Text" },
      ],
    });
  
    await csvWriter.writeRecords(fileDataArray);
    
    return csvFilePath; 
  };

module.exports = saveToCSV;