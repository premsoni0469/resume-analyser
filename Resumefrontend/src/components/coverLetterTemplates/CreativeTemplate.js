const CreativeTemplate = ({ data, theme }) => {
    const { personalDetails, recipientDetails, letterContent } = data
  
    return (
      <div className={`font-sans ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"} p-8`}>
        <header className="mb-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-lg">
          <h1 className="text-3xl font-bold">{personalDetails.name}</h1>
          <p>
            {personalDetails.email} | {personalDetails.phone} | {personalDetails.location}
          </p>
        </header>
        <main>
          <div className="mb-8">
            <p className="text-purple-600 font-bold">{new Date().toLocaleDateString()}</p>
            <p className="mt-4 text-pink-600 font-bold">{recipientDetails.name}</p>
            <p>{recipientDetails.company}</p>
            <p>{recipientDetails.address}</p>
          </div>
          <div className="space-y-4">
            <p className="font-bold text-purple-600">Dear {recipientDetails.name},</p>
            <p>{letterContent.opening}</p>
            <p>{letterContent.body}</p>
            <p>{letterContent.closing}</p>
            <p className="mt-8 font-bold text-pink-600">Best regards,</p>
            <p className="mt-8 font-bold">{personalDetails.name}</p>
          </div>
        </main>
      </div>
    )
  }
  
  export default CreativeTemplate
  
  