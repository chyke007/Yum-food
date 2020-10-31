// eslint-disable-next-line new-cap
const router = require("express").Router();

const { FileManager } = require("../../service");
const controller = require("../../controller/product");

router
  .get("/", controller.getAll)
  .get("/:id", controller.get)
  .post("/", FileManager.upload, controller.post)
  // .put('/:id', FileManager.upload, controller.update)
  .delete("/:id", controller.deleteProduct);

module.exports = router;
