const router = require("express").Router();

// controller
const apiController = require("../../controllers/api");

// Middlewares - if needed
const {backgroundMulter} = require("../../middlewares/multer")

// Your api routes go here...
router.get("/user", apiController.getUserInfo);
router.put("/user/styles/background", backgroundMulter.single("backgroundImage"), apiController.changeUsersBG);
router.put("/user/styles/clock", apiController.clockStyle);

router.get("/todos", apiController.getTodos);

router
  .route("/todos/tasks")
  .post(apiController.addTask)
  .put(apiController.taskModify)
  .delete(apiController.taskDelete);

router
  .route("/todos/exams")
  .post(apiController.addExam)
  .put(apiController.examModify)
  .delete(apiController.examDelete);


module.exports = router;
