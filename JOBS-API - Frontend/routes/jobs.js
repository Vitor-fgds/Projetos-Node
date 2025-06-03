const express = require("express")
const router = express.Router()

const {getAllJobs, getJob, createJob, deleteJob, updateJob, getJobByName} 
= require("../controllers/jobs");
const { get } = require("mongoose");

router.get("/", getAllJobs);
router.get("/:id", getJob);
router.get("/name/:position", getJobByName);
router.post("/", createJob);
router.delete("/:id", deleteJob);
router.patch("/:id", updateJob);

module.exports = router;

