"use client"

import { useState } from "react"
import { Container, Row, Col, Card, ProgressBar, Button, Accordion, Alert, Spinner } from "react-bootstrap"
import { Upload, CheckCircle, Lock, FileText, X, Eye, AlertCircle } from "react-feather"
import { calculateATSScore } from "../utils/atsScoreCalculator"

function Dashboard() {
  const [file, setFile] = useState(null)
  const [score, setScore] = useState(null)
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [preview, setPreview] = useState(null)

  // Function to validate file
  const validateFile = (file) => {
    const allowedTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
    const maxSize = 2 * 1024 * 1024 // 2MB

    if (!allowedTypes.includes(file.type)) {
      throw new Error("Invalid file type. Please upload a PDF or DOCX file.")
    }

    if (file.size > maxSize) {
      throw new Error("File size exceeds 2MB limit.")
    }
  }

  // Function to generate preview
  const generatePreview = async (file) => {
    if (file.type === "application/pdf") {
      const url = URL.createObjectURL(file)
      return `<iframe src="${url}" width="100%" height="600px"></iframe>`
    } else {
      return `
        <div class="docx-preview">
          <h4>${file.name}</h4>
          <p>Size: ${(file.size / 1024).toFixed(2)} KB</p>
          <p>Type: ${file.type}</p>
          <p>Last Modified: ${new Date(file.lastModified).toLocaleString()}</p>
        </div>
      `
    }
  }

  const handleFileDrop = (e) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    handleFile(droppedFile)
  }

  const handleFile = async (file) => {
    try {
      setLoading(true)
      setError(null)

      validateFile(file)
      setFile(file)

      const previewContent = await generatePreview(file)
      setPreview(previewContent)

      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target.result
        const analysisResult = calculateATSScore(content)
        setScore(analysisResult.totalScore)
        setAnalysis(analysisResult)
      }
      reader.onerror = () => {
        setError("Error reading file. Please try again.")
      }
      reader.readAsText(file)
    } catch (err) {
      setError(err.message)
      setFile(null)
    } finally {
      setLoading(false)
    }
  }

  const removeFile = () => {
    setFile(null)
    setScore(null)
    setAnalysis(null)
    setPreview(null)
    setError(null)
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <Container fluid className="dashboard-container">
      {error && (
        <Alert variant="danger" className="mb-4" onClose={() => setError(null)} dismissible>
          <AlertCircle className="me-2" size={20} />
          {error}
        </Alert>
      )}

      {!file ? (
        <div className="upload-section">
          <Card className="text-center upload-card">
            <Card.Body>
              <div className="hero-section">
                <img
                  src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80"
                  alt="Resume Analysis"
                  className="hero-image"
                />
                <span className="text-uppercase text-primary fw-bold small">RESUME CHECKER</span>
                <h1 className="display-4 mb-4">Is your resume good enough?</h1>
                <p className="text-muted lead">
                  A free and fast AI resume checker doing 16 crucial checks to ensure your resume is ready to perform
                  and get you interview callbacks.
                </p>
              </div>
              <div className="drop-zone" onDrop={handleFileDrop} onDragOver={(e) => e.preventDefault()}>
                <Upload size={48} className="mb-3 text-primary" />
                <p>Drop your resume here or choose a file.</p>
                <p className="text-muted small">PDF & DOCX only. Max 2MB file size.</p>
                <Button variant="success" size="lg" onClick={() => document.getElementById("fileInput").click()}>
                  Upload Your Resume
                </Button>
                <input
                  id="fileInput"
                  type="file"
                  hidden
                  accept=".pdf,.docx"
                  onChange={(e) => handleFile(e.target.files[0])}
                />
              </div>
              <div className="mt-3 text-muted small">
                <Lock size={14} className="me-1" />
                Privacy guaranteed
              </div>
            </Card.Body>
          </Card>
        </div>
      ) : (
        <Row>
          <Col md={3} className="sidebar">
            <Card className="file-info-card mb-4">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h6 className="text-truncate mb-1" title={file.name}>
                      {file.name}
                    </h6>
                    <p className="text-muted small mb-0">{formatFileSize(file.size)}</p>
                  </div>
                  <div className="d-flex gap-2">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => document.getElementById("previewModal").showModal()}
                    >
                      <Eye size={16} />
                    </Button>
                    <Button variant="outline-danger" size="sm" onClick={removeFile}>
                      <X size={16} />
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>

            {loading ? (
              <Card className="text-center p-4">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2">Analyzing your resume...</p>
              </Card>
            ) : (
              <Card className="score-card">
                <Card.Body>
                  <h2>Your Score</h2>
                  <div className="score-display">
                    {score}/100
                    <small>{Object.keys(analysis?.sections.content.items || {}).length} Issues</small>
                  </div>
                  <Accordion defaultActiveKey="0" className="mt-4">
                    {analysis &&
                      Object.entries(analysis.sections).map(([key, section], index) => (
                        <Accordion.Item eventKey={index.toString()} key={key}>
                          <Accordion.Header>
                            {key.toUpperCase()}
                            <ProgressBar
                              now={section.score}
                              variant={section.score >= 80 ? "success" : "warning"}
                              className="w-25 ms-auto"
                            />
                          </Accordion.Header>
                          <Accordion.Body>
                            <ul className="list-unstyled">
                              {section.items.map((item, i) => (
                                <li key={i} className="d-flex align-items-center gap-2">
                                  {section.score >= 80 ? (
                                    <CheckCircle size={16} className="text-success" />
                                  ) : (
                                    <Lock size={16} className="text-muted" />
                                  )}
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </Accordion.Body>
                        </Accordion.Item>
                      ))}
                  </Accordion>
                  <Button variant="success" className="w-100 mt-4">
                    Unlock Full Report
                  </Button>
                </Card.Body>
              </Card>
            )}
          </Col>

          <Col md={9} className="main-content">
            {loading ? (
              <Card className="text-center p-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2">Analyzing your resume...</p>
              </Card>
            ) : (
              <>
                <Card className="mb-4">
                  <Card.Body>
                    <h4 className="mb-3">Resume Overview</h4>
                    <Row>
                      <Col md={4}>
                        <div className="overview-item">
                          <h6>ATS Score</h6>
                          <p className="h2 text-success">{score}/100</p>
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="overview-item">
                          <h6>Parse Rate</h6>
                          <p className="h2 text-primary">{analysis?.parseRate}%</p>
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="overview-item">
                          <h6>Issues Found</h6>
                          <p className="h2 text-warning">
                            {Object.keys(analysis?.sections.content.items || {}).length}
                          </p>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>

                <Card>
                  <Card.Body>
                    <div className="d-flex align-items-center gap-2 mb-4">
                      <FileText size={24} />
                      <h3 className="mb-0">CONTENT</h3>
                    </div>
                    <div className="ats-section">
                      <h4>ATS PARSE RATE</h4>
                      <p>
                        An Applicant Tracking System commonly referred to as ATS is a system used by employers and
                        recruiters to quickly scan a large number of job applications.
                      </p>
                      <ProgressBar
                        now={analysis?.parseRate}
                        variant="success"
                        className="my-4"
                        style={{ height: "8px" }}
                      />
                      <div className="text-center">
                        <h5>Great!</h5>
                        <p>
                          We parsed {analysis?.parseRate}% of your resume successfully using an industry-leading ATS.
                        </p>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </>
            )}
          </Col>
        </Row>
      )}

      {/* Preview Modal */}
      <dialog id="previewModal" className="preview-modal">
        <div className="preview-header">
          <h5>Resume Preview</h5>
          <Button
            variant="link"
            className="close-button"
            onClick={() => document.getElementById("previewModal").close()}
          >
            <X size={20} />
          </Button>
        </div>
        <div className="preview-content" dangerouslySetInnerHTML={{ __html: preview }} />
      </dialog>
    </Container>
  )
}

export default Dashboard

