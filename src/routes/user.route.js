const Router = require("express");
const router = Router();
const upload = require("../middlewares/multer.middleware.js");
const {applicantResumeUpload, applicantResumeScore} = require("../controllers/user.controller.js")
const { model } = require("mongoose");

router.route("/applicant-user").post(
    upload.single("resume"), applicantResumeUpload 
)

router.route("/applicant-resume-score").get(applicantResumeScore)


module.exports = router