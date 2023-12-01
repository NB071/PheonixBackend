const tryCatch = require("../../utils/tryCatch");
const { v4 } = require("uuid");
// import queries
const query = require("../../models/queries");

const getUserInfo = tryCatch(async (req, res) => {
  const { userId } = req.decoded;
  const user = await query.fetchUserInfos(userId);
  return res.json({ user });
});

const getTodos = tryCatch(async (req, res) => {
  const { userId } = req.decoded;
  const { tasks, exams } = await query.fetchTodos(userId);
  return res.json({ tasks, exams });
});

const taskModify = tryCatch(async (req, res) => {
  const { userId } = req.decoded;
  const { task_id, visibility, done, title, priority, description, time_box } =
    req.body;

  if (!task_id)
    return res
      .status(400)
      .json({ status: "error", message: "missing task_id" });

  const { tasks } = await query.fetchTodos(userId);

  const taskObj = await query.getSpecificTask(tasks, task_id);

  const changedObj = await query.changeSpecificTask(taskObj, {
    visibility,
    done,
    title,
    priority,
    description,
    time_box,
  });

  query.writeChangedTask(userId, changedObj);
  return res.sendStatus(204);
});

const examModify = tryCatch(async (req, res) => {
  const { userId } = req.decoded;
  const { exam_id, visibility, name, type, result, due } = req.body;
  if (!exam_id)
    return res
      .status(400)
      .json({ status: "error", message: "missing exam_id" });

  const { exams } = await query.fetchTodos(userId);

  const examObj = await query.getSpecificExam(exams, exam_id);

  const changedObj = await query.changeSpecificExam(examObj, {
    visibility,
    name,
    type,
    result,
    due,
  });

  query.writeChangedExam(userId, changedObj);
  return res.sendStatus(204);
});

const taskDelete = tryCatch(async (req, res) => {
  const { userId } = req.decoded;
  const { task_id } = req.body;

  if (!task_id)
    return res
      .status(400)
      .json({ status: "error", message: "missing task_id" });

  const { tasks } = await query.fetchTodos(userId);

  const taskObj = await query.getSpecificTask(tasks, task_id);

  query.deleteTask(userId, taskObj);

  return res.sendStatus(204);
});

const examDelete = tryCatch(async (req, res) => {
  const { userId } = req.decoded;
  const { exam_id } = req.body;

  if (!exam_id)
    return res
      .status(400)
      .json({ status: "error", message: "missing exam_id" });

  const { exams } = await query.fetchTodos(userId);

  const examObj = await query.getSpecificExam(exams, exam_id);

  query.deleteExam(userId, examObj);
  return res.sendStatus(204);
});

const changeUsersBG = tryCatch(async (req, res) => {
  const { userId } = req.decoded;
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const { filename } = req.file;
  try {
    query.changeUsersBackground(userId, filename);

    // Send a response to the client
    return res.status(201).json({
      status: "success",
      url: `https://pheonix-backend-385c2453f5c2.herokuapp.com/images/backgrounds/${filename}`,
    });
  } catch (error) {
    console.error("Error changing background:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

const addTask = tryCatch(async (req, res) => {
  const { userId } = req.decoded;

  const { title, priority, description, time_box } = req.body;

  if (!title || !priority || !description || !time_box) {
    return res.status(400).json({ status: "error", message: "missing fields" });
  }
  const taskObj = {
    visibility: true,
    id: v4(),
    done: false,
    title,
    priority,
    description,
    time_box,
  };
  query.createTask(userId, taskObj);

  return res.sendStatus(201);
});

const addExam = tryCatch(async (req, res) => {
  const { userId } = req.decoded;

  const { name, type, result, due } = req.body;

  if (!name || !type || !result || !due) {
    return res.status(400).json({ status: "error", message: "missing fields" });
  }
  const taskObj = {
    id: v4(),
    visibility: true,
    name,
    type,
    result,
    due,
  };
  query.createExam(userId, taskObj);

  return res.sendStatus(204);
});

const clockStyle = tryCatch(async (req, res) => {
  const { userId } = req.decoded;

  const { font_family, color } = req.body;
  if (!font_family || !color) {
    return res.status(400).json({ status: "error", message: "missing fields" });
  }

  const clockStyleObj = {
    font_family,
    color,
  };
  query.modifyClockStyle(userId, clockStyleObj);

  return res.sendStatus(204);
});

module.exports = {
  getUserInfo,
  getTodos,
  taskModify,
  addTask,
  examModify,
  taskDelete,
  examDelete,
  changeUsersBG,
  addExam,
  clockStyle,
};
