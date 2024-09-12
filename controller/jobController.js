import jobModels from "../models/jobModels.js";
import mongoose from "mongoose";
import moment from "moment";

export const createJobController = async (req, res, next) => {
  const { company, position } = req.body;
  if (!company || !position) {
    next("Please Provide All Fields");
  }
  req.body.createdBy = req.user.userId;
  const job = await jobModels.create(req.body);
  res.status(201).json({ job });
};

export const getJobController = async (req, res, next) => {
  // console.log("User ID in createJobController:", req.user.userId);
  const { status, workType, search, sort } = req.query;
  // const job = await jobModels.find({ createdBy: req.user.userId });
  // conditions for searching 
  const queryObject = {
    createdBy: req.user.userId,
  };
   //logic filters
   if (status && status !== "all") {
    queryObject.status = status;
  }
  if (workType && workType !== "all") {
    queryObject.workType = workType;
  }
  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }
// console.log(status,workType,"30")
  let queryResult = jobModels.find(queryObject);
   //sorting
   if (sort === "latest") {
    queryResult = queryResult.sort("-createdAt");
  }
  if (sort === "oldest") {
    queryResult = queryResult.sort("createdAt");
  }
  if (sort === "a-z") {
    queryResult = queryResult.sort("position");
  }
  if (sort === "z-a") {
    queryResult = queryResult.sort("-position");
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  queryResult = queryResult.skip(skip).limit(limit);

  //jobs count
  const totalJobs = await jobModels.countDocuments(queryResult);
  const numOfPage = Math.ceil(totalJobs / limit);

  const jobs = await queryResult;
  // console.log(jobs);
  res.status(200).json({
    totalJobs,
    jobs,
    numOfPage,
  });
};

export const updateJobController = async (req, res, next) => {
  const { id } = req.params;
  const { company, position } = req.body;
  if (!company || !position) {
    next("Please Provide All Fields");
  }
  // find job
  const job = await jobModels.findOne({ _id: id });
  if (!job) {
    next(`no jobs found with this id ${id}`);
  }
  if (!req.user.userId === job.createdBy.toString()) {
    next("Your Not Authorized to update this job");
    return;
  }
  const updateJob = await jobModels.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    updateJob,
  });
};

export const deleteJobController = async (req, res, next) => {
  const { id } = req.params;
  const job = await jobModels.findOne({ _id: id });
  if (!job) {
    next(`no jobs found with this id ${id}`);
  }
  if (!req.user.userId === job.createdBy.toString()) {
    next("Your Not Authorized to delete this job");
    return;
  }
  await job.deleteOne();
  res.status(200).json({
    message: "Success job Deleted!",
  });
};

export const jobStatsController = async (req, res, next) => {
  const stats = await jobModels.aggregate([
    // search by user jobs
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);
  //   default stats
  const defaultStats = {
    pending: stats.pending || 0,
    reject: stats.reject || 0,
    interview: stats.interview || 0,
  };
  // monthly yearly stats
  let monthlyApplication = await jobModels.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: {
          $sum: 1,
        },
      },
    },
  ]);
  monthlyApplication = monthlyApplication
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      return { date, count };
    })
    .reverse();
  res.status(200).json({
    totalJob: stats.length,
    defaultStats,
    monthlyApplication,
  });
};
