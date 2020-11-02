// eslint-disable-next-line new-cap
const router = require("express").Router();
const { ExtractToken, Admin } = require("../../middleware");
const { FileManager } = require("../../service");
const controller = require("../../controller/product");

router.get("/", controller.getAll).get("/:id", controller.get);

// all requests must pass in a token
router.use(ExtractToken);

// all requests must be by ADMIN
router.use(Admin);
router
  .post("/", FileManager.cloudinary, controller.post)
  .put("/:id", FileManager.cloudinary, controller.update)
  .delete("/:id", controller.deleteProduct);

module.exports = router;
