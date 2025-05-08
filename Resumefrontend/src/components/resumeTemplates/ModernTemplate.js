import { Text, View, StyleSheet } from "@react-pdf/renderer"

const ModernTemplate = ({ data, colorScheme, font, layout }) => {
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
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    headerLeft: {
      width: "70%",
    },
    headerRight: {
      width: "30%",
      alignItems: "flex-end",
    },
    name: {
      fontSize: 28,
      fontWeight: "bold",
      color: colorScheme.primary,
    },
    contact: {
      fontSize: 10,
      marginTop: 5,
    },
    section: {
      marginBottom: 15,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: colorScheme.secondary,
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
    },
    skill: {
      marginBottom: 5,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    skillName: {
      width: "70%",
    },
    skillLevel: {
      width: "30%",
      flexDirection: "row",
      justifyContent: "flex-end",
    },
    skillDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: colorScheme.primary,
      marginLeft: 2,
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
    },
    section: {
      ...styles.section,
      marginBottom: "25px",
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
      <Text style={styles.skillName}>{skill.name}</Text>
      <View style={styles.skillLevel}>
        {[1, 2, 3, 4, 5].map((dot) => (
          <View key={dot} style={[styles.skillDot, { opacity: dot <= skill.level ? 1 : 0.3 }]} />
        ))}
      </View>
    </View>
  )

  return (
    <View style={updatedStyles.page}>
      <View style={updatedStyles.header}>
        <View style={updatedStyles.headerLeft}>
          <Text style={styles.name}>{safeData.personalDetails.name}</Text>
          <Text style={styles.contact}>
            {safeData.personalDetails.email} | {safeData.personalDetails.phone}
          </Text>
          <Text style={styles.contact}>{safeData.personalDetails.location}</Text>
        </View>
        <View style={updatedStyles.headerRight}>
          {safeData.personalDetails.linkedin && (
            <Text style={styles.contact}>LinkedIn: {safeData.personalDetails.linkedin}</Text>
          )}
          {safeData.personalDetails.github && (
            <Text style={styles.contact}>GitHub: {safeData.personalDetails.github}</Text>
          )}
        </View>
      </View>

      <View style={layout === "two" ? styles.columns : null}>
        <View style={layout === "two" ? styles.leftColumn : null}>
          <View style={updatedStyles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.sectionContent}>{safeData.summary}</Text>
          </View>

          <View style={updatedStyles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {safeData.experience.map(renderExperience)}
          </View>

          <View style={updatedStyles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {safeData.education.map(renderEducation)}
          </View>

          {safeData.certifications.length > 0 && (
            <View style={updatedStyles.section}>
              <Text style={styles.sectionTitle}>Certifications</Text>
              {safeData.certifications.map((cert) => (
                <Text key={cert.name} style={styles.sectionContent}>
                  {cert.name}
                </Text>
              ))}
            </View>
          )}
        </View>

        <View style={layout === "two" ? styles.rightColumn : null}>
          <View style={updatedStyles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            {safeData.skills.map(renderSkill)}
          </View>

          {safeData.languages.length > 0 && (
            <View style={updatedStyles.section}>
              <Text style={styles.sectionTitle}>Languages</Text>
              {safeData.languages.map((lang) => (
                <Text key={lang.language} style={styles.sectionContent}>
                  {lang.language}: {lang.proficiency}
                </Text>
              ))}
            </View>
          )}

          {safeData.volunteering.length > 0 && (
            <View style={updatedStyles.section}>
              <Text style={styles.sectionTitle}>Volunteering</Text>
              {safeData.volunteering.map((vol) => (
                <Text key={vol.organization} style={styles.sectionContent}>
                  {vol.organization}: {vol.role}
                </Text>
              ))}
            </View>
          )}

          {safeData.awards.length > 0 && (
            <View style={updatedStyles.section}>
              <Text style={styles.sectionTitle}>Awards</Text>
              {safeData.awards.map((award) => (
                <Text key={award.name} style={styles.sectionContent}>
                  {award.name} ({award.year})
                </Text>
              ))}
            </View>
          )}

          {safeData.publications.length > 0 && (
            <View style={updatedStyles.section}>
              <Text style={styles.sectionTitle}>Publications</Text>
              {safeData.publications.map((pub) => (
                <Text key={pub.title} style={styles.sectionContent}>
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

export default ModernTemplate

