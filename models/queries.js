const fs = require("node:fs");
const path = require("node:path");

let jsonObjData;
let jsonObjUsers;

const dataPath = path.resolve(__dirname, "data.json");
const usersPath = path.resolve(__dirname, "users.json");
try {
  const jsonStringData = fs.readFileSync(dataPath);
  jsonObjData = JSON.parse(jsonStringData);
} catch (err) {
  console.log(err);
}

try {
  const jsonStringData = fs.readFileSync(usersPath);
  jsonObjUsers = JSON.parse(jsonStringData);
} catch (err) {
  console.log(err);
}

function fetchUserInfos(userId) {
  return jsonObjUsers.find((user) => userId === user.id) || {};
}

function login(email, password) {
  return (
    jsonObjUsers.find(
      (user) => user.email === email && user.password === password
    ) || {}
  );
}

function fetchTodos(userId) {
  return jsonObjData.find((todo) => todo.userId === userId) || {};
}

function getSpecificTask(taskObj, task_id) {
  return taskObj.find((todo) => todo.id === task_id) || {};
}

function getSpecificExam(examObj, exam_id) {
  return examObj.find((todo) => todo.id === exam_id) || {};
}

function changeSpecificTask(taskObj, changed) {
  Object.entries(changed).forEach(([key, value]) => {
    if (value !== undefined && key !== "id") {
      taskObj[key] = value;
    }
  });
  return taskObj;
}

function changeSpecificExam(examObj, changed) {
  Object.entries(changed).forEach(([key, value]) => {
    if (value !== undefined && key !== "id") {
      examObj[key] = value;
    }
  });
  return examObj;
}

function writeChangedTask(userId, changedTask) {
  const TodoIndex = jsonObjData.findIndex((todo) => todo.userId === userId);
  const TaskIndex = jsonObjData[TodoIndex].tasks.findIndex(
    (todo) => todo.id === changedTask.id
  );

  jsonObjData[TodoIndex].tasks[TaskIndex] = changedTask;

  fs.writeFile(dataPath, JSON.stringify(jsonObjData, null, 2), () =>
    console.log("error on writing the json file")
  );
}

function writeChangedExam(userId, changedExam) {
  const TodoIndex = jsonObjData.findIndex((todo) => todo.userId === userId);
  const TaskIndex = jsonObjData[TodoIndex].exams.findIndex(
    (todo) => todo.id === changedExam.id
  );

  jsonObjData[TodoIndex].exams[TaskIndex] = changedExam;

  fs.writeFile(dataPath, JSON.stringify(jsonObjData, null, 2), () =>
    console.log("error on writing the json file")
  );
}

function deleteTask(userId, taskObj) {
  const TodoIndex = jsonObjData.findIndex((todo) => todo.userId === userId);

  const updatedTasks = jsonObjData[TodoIndex].tasks.filter(
    (task) => task.id !== taskObj.id
  );

  jsonObjData[TodoIndex].tasks = updatedTasks;

  fs.writeFile(dataPath, JSON.stringify(jsonObjData, null, 2), () =>
    console.log("error on writing the json file")
  );
}

function deleteExam(userId, taskObj) {
  const TodoIndex = jsonObjData.findIndex((todo) => todo.userId === userId);

  const updatedExams = jsonObjData[TodoIndex].exams.filter(
    (exam) => exam.id !== taskObj.id
  );

  jsonObjData[TodoIndex].exams = updatedExams;

  fs.writeFile(dataPath, JSON.stringify(jsonObjData, null, 2), () =>
    console.log("error on writing the json file")
  );
}

function createTask(userId, taskObj) {
  const TodoIndex = jsonObjData.findIndex((todo) => todo.userId === userId);
  jsonObjData[TodoIndex].tasks.push(taskObj);

  fs.writeFile(dataPath, JSON.stringify(jsonObjData, null, 2), () =>
    console.log("error on writing the json file")
  );
}

function createExam(userId, examObj) {
  const TodoIndex = jsonObjData.findIndex((todo) => todo.userId === userId);
  jsonObjData[TodoIndex].exams.push(examObj);

  fs.writeFile(dataPath, JSON.stringify(jsonObjData, null, 2), () =>
    console.log("error on writing the json file")
  );
}

function changeUsersBackground(userId, fileName) {
  const userIndex = jsonObjUsers.findIndex((user) => user.id === userId);

  // Changing the background on file
  jsonObjUsers[
    userIndex
  ].background = `http://localhost:3000/images/backgrounds/${fileName}`;

  fs.writeFile(usersPath, JSON.stringify(jsonObjUsers, null, 2), () =>
    console.log("error on writing the json file")
  );
}

function modifyClockStyle(userId, ClockStyleObj) {
  const userIndex = jsonObjUsers.findIndex((user) => user.id === userId);
  jsonObjUsers[userIndex].clock_style = ClockStyleObj;

  fs.writeFile(usersPath, JSON.stringify(jsonObjUsers, null, 2), () =>
    console.log("error on writing the json file")
  );
}

module.exports = {
  fetchUserInfos,
  login,
  fetchTodos,
  getSpecificTask,
  getSpecificExam,
  changeSpecificTask,
  changeSpecificExam,
  writeChangedTask,
  writeChangedExam,
  deleteTask,
  deleteExam,
  createTask,
  createExam,
  changeUsersBackground,
  modifyClockStyle,
};
