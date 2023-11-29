const cron = require("node-cron");
const path = require("node:path");
const fs = require("node:fs");

// It check daily and resets the tasks.
function resetTasks() {
  let jsonObjData;
  const dataPath = path.resolve(__dirname, "../models/data.json");
  try {
    const jsonStringData = fs.readFileSync(dataPath);
    jsonObjData = JSON.parse(jsonStringData);
  } catch (err) {
    console.log(err);
  }

  cron.schedule("0 0 * * 0", async () => {
    try {
      console.log("Resetting tasks...");
      jsonObjData.forEach((user) => {
        user.tasks = [];
      });

      console.log("Tasks reset completed.");
    } catch (error) {
      console.error("Task failed:", error);
    }
  });
}

module.exports = resetTasks;
