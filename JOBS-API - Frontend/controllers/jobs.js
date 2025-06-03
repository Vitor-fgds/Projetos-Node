const Job = require("../models/Job.js")
const {StatusCodes} = require("http-status-codes")
const {BadRequestError, NotFoundError} = require("../errors/index.js")

const getAllJobs = async (req,res) => {
    const jobs = await Job.find({createdBy:req.user.userId}).sort("createdAt");
    res.status(StatusCodes.OK).json({jobs, count: jobs.length})
}

const getJob = async (req,res) => {
    const {userId} = req.user;
    const {id} = req.params;
    //const {user: {userId}, params: {id: jobId}} = req
    const job = await Job.findOne({_id:id, createdBy:userId})
    if(!job) {
        throw new NotFoundError(`No job with id: ${jobId}`)
    }
    res.status(StatusCodes.OK).json({job})
}

const getJobByName = async (req,res) => {
    try {
        const {position} = req.params;
        const queryObject = {};
        if (position) {
            queryObject.position = {$regex: position, $options: "i" }
        }
        const job = await Job.findOne(queryObject);
        if(job){
            res.status(200).json({job});
        }
        res.status(404).json({msg: "Job not found!"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const updateJob = async (req,res) => {
    const {userId} = req.user;
    const {id} = req.params;
    const {company, position} = req.body;
    if(company === "" || position === "") {
        throw new BadRequestError("Company or Position field cannot be empty")
    }

    const job = await Job.findByIdAndUpdate(
        {_id: id, createdBy: userId},
         req.body, 
        {new: true, runValidator:true}
    )
    if(!job) {
        throw new NotFoundError(`No job with id ${id}`)
    }
    res.status(StatusCodes.OK).json({job})
}

const deleteJob = async (req,res) => {
    const {userId} = req.user;
    const {id} = req.params;
    const job = await Job.findByIdAndDelete({_id:id, createdBy:userId})
    if(!job){
        throw new NotFoundError(`No job with id ${id}`)
    }
    res.status(StatusCodes.OK).json({msg: `Job with id ${id} successfuly deleted!` })
}

const createJob = async(req,res) => {
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({job})
}



module.exports = {
    getAllJobs,
    getJob,
    updateJob,
    deleteJob,
    createJob,
    getJobByName
}
