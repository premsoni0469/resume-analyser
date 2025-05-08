const ClassicTemplate = ({ data, theme }) => {
    const { personalDetails, recipientDetails, letterContent } = data
  
    return (
      <div className={`font-serif ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"} p-8`}>
        <header className="text-right mb-8">
          <h1 className="text-2xl font-bold">{personalDetails.name}</h1>
          <p>{personalDetails.email}</p>
          <p>{personalDetails.phone}</p>
          <p>{personalDetails.location}</p>
        </header>
        <main>
          <div className="mb-8">
            <p>{new Date().toLocaleDateString()}</p>
            <p className="mt-4">{recipientDetails.name}</p>
            <p>{recipientDetails.company}</p>
            <p>{recipientDetails.address}</p>
          </div>
          <div className="space-y-4">
            <p>Dear {recipientDetails.name},</p>
            <p>{letterContent.opening}</p>
            <p>{letterContent.body}</p>
            <p>{letterContent.closing}</p>
            <p className="mt-8">Sincerely,</p>
            <p className="mt-8">{personalDetails.name}</p>
          </div>
        </main>
      </div>
    )
  }
  
  export default ClassicTemplate
  
  