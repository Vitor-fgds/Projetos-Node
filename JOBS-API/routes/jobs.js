const express = require("express")
const router = express.Router()

const {getAllJobs, getJob, createJob, deleteJob, updateJob} 
= require("../controllers/jobs")

router.get("/", getAllJobs);
router.get("/:id", getJob);
router.post("/", createJob);
router.delete("/:id", deleteJob);
router.patch("/:id", updateJob);

module.exports = router;

