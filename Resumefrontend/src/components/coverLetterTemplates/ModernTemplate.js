const ModernTemplate = ({ data, theme }) => {
    const { personalDetails, recipientDetails, letterContent } = data
  
    return (
      <div className={`font-sans ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"} p-8`}>
        <header className="mb-8">
          <h1 className="text-3xl font-bold">{personalDetails.name}</h1>
          <p>
            {personalDetails.email} | {personalDetails.phone} | {personalDetails.location}
          </p>
        </header>
        <main>
          <div className="mb-8">
            <p>{new Date().toLocaleDateString()}</p>
            <p className="mt-4">{recipientDetails.name}</p>
            <p>{recipientDetails.company}</p>
            <p>{recipientDetails.address}</p>
          </div>
          <div className="space-y-4">
            <p>{letterContent.opening}</p>
            <p>{letterContent.body}</p>
            <p>{letterContent.closing}</p>
          </div>
        </main>
      </div>
    )
  }
  
  export default ModernTemplate
  
  