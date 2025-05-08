export function calculateATSScore(fileContent) {
  let score = 0
  const factors = {
    hasKeywords: 20,
    properFormatting: 25,
    hasQuantifiableResults: 20,
    hasProperSections: 20,
    hasSkills: 15,
  }

  if (fileContent.includes("experience")) score += factors.hasKeywords
  if (fileContent.includes("skills")) score += factors.hasSkills
  if (fileContent.includes("education")) score += factors.hasProperSections
  if (fileContent.includes("%") || fileContent.includes("$")) score += factors.hasQuantifiableResults
  if (!fileContent.includes("objective")) score += factors.properFormatting

  return {
    totalScore: score,
    parseRate: 94,
    sections: {
      content: { score: 75, items: ["ATS Parse Rate", "Quantifying Impact", "Repetition", "Spelling & Grammar"] },
      format: { score: 100, items: ["File Format", "Margins", "Font"] },
      sections: { score: 67, items: ["Experience", "Education", "Skills"] },
      skills: { score: 100, items: ["Technical Skills", "Soft Skills"] },
      style: { score: 75, items: ["Active Voice", "Action Words"] },
    },
  }
}

