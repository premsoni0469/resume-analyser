export const analyzeResume = async (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader()
  
      reader.onload = () => {
        // Mock analysis results
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
  
        resolve(analysis)
      }
  
      reader.onerror = () => {
        throw new Error("Error reading file")
      }
  
      reader.readAsText(file)
    })
  }
  
  