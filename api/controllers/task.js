import { Task } from "../models/task.js";
import { errorHandler } from "../utils/error.js";
import { checkauthUser } from "../utils/features.js";

// add task
export const addTask = async (req, res) => {
  const { title, description, checked, token } = req.body;
  // const token = req.headers.cookie?.split("=")[1];

  try {
    if (!token) return errorHandler(res, 400, "Please Login");
    // const user = checkauthUser(res, token.toString());
    const user = checkauthUser(res, token);
    await Task.create({ title, description, creator: user.id, checked });
    res
      .status(200)
      .json({ success: true, message: "Task Successfully Created" });
  } catch (error) {
    console.log(error);
    errorHandler(res, 500, "Internal Server Error");
  }
};

// get tasks
export const getTask = async (req, res) => {
  // const token = req.headers.cookie?.split("=")[1];
  let { token } = req.query;
  try {
    if (!token) return errorHandler(res, 400, "Please Login");
    // const user = checkauthUser(res, token.toString());
    const user = checkauthUser(res, token);
    const task = await Task.find({ creator: user.id }).populate("creator");
    res.status(200).json(task);
  } catch (error) {
    console.log(error);
    errorHandler(res, 500, "Internal Server Error");
  }
};

// update task
export const updateTask = async (req, res) => {
  const { title, description, checked, token } = req.body;
  const taskid = req.params.id;
  //const token = req.headers.cookie?.split("=")[1];
  try {
    if (!token) return errorHandler(res, 400, "Please Login");
    // const user = checkauthUser(res, token.toString());
    const user = checkauthUser(res, token);
    let task = await Task.findOne({ _id: taskid });
    if (!task) return errorHandler(res, 404, "Task Not Found");
    if (task.creator.toString() !== user.id)
      return errorHandler(res, 400, "You are not Authorized");
    task.title = title !== undefined ? title : task.title;
    task.description =
      description !== undefined ? description : task.description;
    task.checked = checked;
    await task.save();
    res
      .status(200)
      .json({ success: true, message: "Task successfully updated" });
  } catch (error) {
    console.log(error);
    errorHandler(res, 500, "Internal Server Error");
  }
};

// delete Task
export const deleteTask = async (req, res) => {
  const taskid = req.params.id;
  //  const token = req.headers.cookie?.split("=")[1];
  const token = req.params.token;
  try {
    if (!token) return errorHandler(res, 400, "Please Login");
    // const user = checkauthUser(res, token.toString());
    const user = checkauthUser(res, token);
    let task = await Task.findOne({ _id: taskid });
    if (!task) return errorHandler(res, 404, "Task Not Found");
    if (task.creator.toString() !== user.id)
      return errorHandler(res, 400, "You are not Authorized");
    if (task.checked !== true) return errorHandler(res, 400, "Please Select");
    await task.deleteOne();
    res
      .status(200)
      .json({ success: true, message: "Task successfully Deleted" });
  } catch (error) {
    console.log(error);
    errorHandler(res, 500, "Internal Server Error");
  }
};

// delete all checked Task
export const deleteAllTask = async (req, res) => {
  //  const token = req.headers.cookie?.split("=")[1];
  let { token } = req.body;
  try {
    if (!token) return errorHandler(res, 400, "Please Login");
    // const user = checkauthUser(res, token.toString());
    const user = checkauthUser(res, token);
    let task = await Task.find({
      $and: [{ checked: true }, { creator: user.id }],
    });
    if (!task[0]) return errorHandler(res, 404, "Selected Task Not Found");
    if (task[0].creator.toString() !== user.id)
      return errorHandler(res, 400, "You are not Authorized");
    task.map((t) => {
      t.deleteOne();
    });
    res
      .status(200)
      .json({ success: true, message: "Task successfully Deleted" });
  } catch (error) {
    console.log(error);
    errorHandler(res, 500, "Internal Server Error");
  }
};
