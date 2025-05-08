import { Text, View, StyleSheet } from "@react-pdf/renderer"

const CreativeTemplate = ({ data, colorScheme, font, layout }) => {
  // Add null checks and default values
  const safeData = {
    personalDetails: data?.personalDetails || {},
    summary: data?.summary || "",
    experience: data?.experience || [],
    education: data?.education || [],
    skills: data?.skills || [],
    certifications: data?.certifications || [],
    languages: data?.languages || [],
    volunteering: data?.volunteering || [],
    awards: data?.awards || [],
    publications: data?.publications || [],
  }

  const styles = StyleSheet.create({
    page: {
      fontFamily: font,
      color: colorScheme.text,
      backgroundColor: colorScheme.background,
      padding: 30,
    },
    header: {
      marginBottom: 20,
      backgroundColor: colorScheme.primary,
      padding: 20,
      borderRadius: 10,
    },
    name: {
      fontSize: 28,
      fontWeight: "bold",
      color: colorScheme.background,
    },
    contact: {
      fontSize: 10,
      color: colorScheme.background,
      marginTop: 5,
    },
    section: {
      marginBottom: 15,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: colorScheme.primary,
      marginBottom: 5,
      textTransform: "uppercase",
    },
    sectionContent: {
      fontSize: 10,
    },
    experienceItem: {
      marginBottom: 10,
    },
    bold: {
      fontWeight: "bold",
    },
    columns: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    leftColumn: {
      width: "65%",
      paddingRight: 15,
    },
    rightColumn: {
      width: "35%",
      backgroundColor: colorScheme.secondary,
      padding: 10,
      borderRadius: 10,
    },
    skill: {
      marginBottom: 5,
    },
    skillBar: {
      height: 4,
      backgroundColor: colorScheme.background,
      marginTop: 2,
    },
    rightColumnText: {
      color: colorScheme.background,
    },
  })

  const updatedStyles = StyleSheet.create({
    ...styles,
    page: {
      ...styles.page,
      minHeight: "100%",
      padding: "40px",
    },
    header: {
      ...styles.header,
      marginBottom: "30px",
      background: `linear-gradient(135deg, ${colorScheme.primary} 0%, ${colorScheme.secondary} 100%)`,
      padding: "30px",
      borderRadius: "10px",
    },
  })

  const renderExperience = (item) => (
    <View key={item.company} style={styles.experienceItem}>
      <Text style={styles.bold}>{item.position}</Text>
      <Text>
        {item.company} | {item.startDate} - {item.endDate}
      </Text>
      <Text>{item.description}</Text>
    </View>
  )

  const renderEducation = (item) => (
    <View key={item.institution} style={styles.experienceItem}>
      <Text style={styles.bold}>{item.degree}</Text>
      <Text>
        {item.institution}, {item.graduationDate}
      </Text>
    </View>
  )

  const renderSkill = (skill) => (
    <View key={skill.name} style={styles.skill}>
      <Text style={styles.rightColumnText}>{skill.name}</Text>
      <View style={[styles.skillBar, { width: `${skill.level * 20}%` }]} />
    </View>
  )

  return (
    <View style={updatedStyles.page}>
      <View style={updatedStyles.header}>
        <Text style={updatedStyles.name}>{safeData.personalDetails.name}</Text>
        <Text style={updatedStyles.contact}>
          {safeData.personalDetails.email} | {safeData.personalDetails.phone} | {safeData.personalDetails.location}
        </Text>
        {safeData.personalDetails.linkedin && (
          <Text style={updatedStyles.contact}>LinkedIn: {safeData.personalDetails.linkedin}</Text>
        )}
        {safeData.personalDetails.github && (
          <Text style={updatedStyles.contact}>GitHub: {safeData.personalDetails.github}</Text>
        )}
      </View>

      <View style={layout === "two" ? updatedStyles.columns : null}>
        <View style={layout === "two" ? updatedStyles.leftColumn : null}>
          <View style={updatedStyles.section}>
            <Text style={updatedStyles.sectionTitle}>Professional Summary</Text>
            <Text style={updatedStyles.sectionContent}>{safeData.summary}</Text>
          </View>

          <View style={updatedStyles.section}>
            <Text style={updatedStyles.sectionTitle}>Experience</Text>
            {safeData.experience.map(renderExperience)}
          </View>

          <View style={updatedStyles.section}>
            <Text style={updatedStyles.sectionTitle}>Education</Text>
            {safeData.education.map(renderEducation)}
          </View>

          {safeData.certifications.length > 0 && (
            <View style={updatedStyles.section}>
              <Text style={updatedStyles.sectionTitle}>Certifications</Text>
              {safeData.certifications.map((cert) => (
                <Text key={cert.name} style={updatedStyles.sectionContent}>
                  {cert.name}
                </Text>
              ))}
            </View>
          )}
        </View>

        <View style={layout === "two" ? updatedStyles.rightColumn : null}>
          <View style={updatedStyles.section}>
            <Text style={[updatedStyles.sectionTitle, updatedStyles.rightColumnText]}>Skills</Text>
            {safeData.skills.map(renderSkill)}
          </View>

          {safeData.languages.length > 0 && (
            <View style={updatedStyles.section}>
              <Text style={[updatedStyles.sectionTitle, updatedStyles.rightColumnText]}>Languages</Text>
              {safeData.languages.map((lang) => (
                <Text key={lang.language} style={[updatedStyles.sectionContent, updatedStyles.rightColumnText]}>
                  {lang.language}: {lang.proficiency}
                </Text>
              ))}
            </View>
          )}

          {safeData.volunteering.length > 0 && (
            <View style={updatedStyles.section}>
              <Text style={[updatedStyles.sectionTitle, updatedStyles.rightColumnText]}>Volunteering</Text>
              {safeData.volunteering.map((vol) => (
                <Text key={vol.organization} style={[updatedStyles.sectionContent, updatedStyles.rightColumnText]}>
                  {vol.organization}: {vol.role}
                </Text>
              ))}
            </View>
          )}

          {safeData.awards.length > 0 && (
            <View style={updatedStyles.section}>
              <Text style={[updatedStyles.sectionTitle, updatedStyles.rightColumnText]}>Awards</Text>
              {safeData.awards.map((award) => (
                <Text key={award.name} style={[updatedStyles.sectionContent, updatedStyles.rightColumnText]}>
                  {award.name} ({award.year})
                </Text>
              ))}
            </View>
          )}

          {safeData.publications.length > 0 && (
            <View style={updatedStyles.section}>
              <Text style={[updatedStyles.sectionTitle, updatedStyles.rightColumnText]}>Publications</Text>
              {safeData.publications.map((pub) => (
                <Text key={pub.title} style={[updatedStyles.sectionContent, updatedStyles.rightColumnText]}>
                  {pub.title} ({pub.year})
                </Text>
              ))}
            </View>
          )}
        </View>
      </View>
    </View>
  )
}

export default CreativeTemplate

