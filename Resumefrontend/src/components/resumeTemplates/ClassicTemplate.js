import { Text, View, StyleSheet } from "@react-pdf/renderer"

const ClassicTemplate = ({ data, colorScheme, font, layout }) => {
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
      textAlign: "center",
      marginBottom: 20,
    },
    name: {
      fontSize: 24,
      fontWeight: "bold",
      color: colorScheme.primary,
    },
    contact: {
      fontSize: 10,
      marginTop: 5,
    },
    section: {
      marginBottom: 10,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: "bold",
      color: colorScheme.secondary,
      marginBottom: 5,
      borderBottomWidth: 1,
      borderBottomColor: colorScheme.secondary,
      paddingBottom: 2,
    },
    sectionContent: {
      fontSize: 10,
    },
    experienceItem: {
      marginBottom: 5,
    },
    bold: {
      fontWeight: "bold",
    },
    columns: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    leftColumn: {
      width: "70%",
      paddingRight: 15,
    },
    rightColumn: {
      width: "30%",
    },
    skill: {
      marginBottom: 3,
    },
    skillLevel: {
      height: 4,
      backgroundColor: colorScheme.secondary,
      marginTop: 2,
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
      textAlign: "center",
    },
  })

  const renderExperience = (item) => (
    <View key={item.company} style={styles.experienceItem}>
      <Text style={styles.bold}>
        {item.position} at {item.company}
      </Text>
      <Text>
        {item.startDate} - {item.endDate}
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
      <Text>{skill.name}</Text>
      <View style={[styles.skillLevel, { width: `${skill.level * 20}%` }]} />
    </View>
  )

  return (
    <View style={updatedStyles.page}>
      <View style={updatedStyles.header}>
        <Text style={styles.name}>{safeData.personalDetails.name}</Text>
        <Text style={styles.contact}>
          {safeData.personalDetails.email} | {safeData.personalDetails.phone} | {safeData.personalDetails.location}
        </Text>
        {safeData.personalDetails.linkedin && (
          <Text style={styles.contact}>LinkedIn: {safeData.personalDetails.linkedin}</Text>
        )}
        {safeData.personalDetails.github && (
          <Text style={styles.contact}>GitHub: {safeData.personalDetails.github}</Text>
        )}
      </View>

      <View style={layout === "two" ? styles.columns : null}>
        <View style={layout === "two" ? styles.leftColumn : null}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.sectionContent}>{safeData.summary}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {safeData.experience.map(renderExperience)}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {safeData.education.map(renderEducation)}
          </View>

          {safeData.certifications.length > 0 && (
            <View style={styles.section}>
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
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            {safeData.skills.map(renderSkill)}
          </View>

          {safeData.languages.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Languages</Text>
              {safeData.languages.map((lang) => (
                <Text key={lang.language} style={styles.sectionContent}>
                  {lang.language}: {lang.proficiency}
                </Text>
              ))}
            </View>
          )}

          {safeData.volunteering.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Volunteering</Text>
              {safeData.volunteering.map((vol) => (
                <Text key={vol.organization} style={styles.sectionContent}>
                  {vol.organization}: {vol.role}
                </Text>
              ))}
            </View>
          )}

          {safeData.awards.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Awards</Text>
              {safeData.awards.map((award) => (
                <Text key={award.name} style={styles.sectionContent}>
                  {award.name} ({award.year})
                </Text>
              ))}
            </View>
          )}

          {safeData.publications.length > 0 && (
            <View style={styles.section}>
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

export default ClassicTemplate

