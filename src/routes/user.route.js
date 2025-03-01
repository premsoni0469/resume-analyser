const Router = require("express");
const router = Router();
const upload = require("../middlewares/multer.middleware.js");
const {applicantResumeUpload,
    applicantResumeScore,
    recruterResumeUpload,
    recruterResumeScore,} = require("../controllers/user.controller.js")
const { model } = require("mongoose");

router.route("/applicant-user").post(
    upload.single("resume"), applicantResumeUpload 
)
router.route("/applicant-resume-score").get(applicantResumeScore)

router.route("/recruter-user").post(
    upload.array("resume"), recruterResumeUpload 
)
router.route("/recruter-resume-score").get(recruterResumeScore)


module.exports = router