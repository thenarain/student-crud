import express from "express";
import StudentController from "../controllers/studentController.js";

const router = express.Router();

router.post("/", StudentController.create);
router.get("/", StudentController.getAll);
router.get("/:id", StudentController.getById);
router.put("/:id", StudentController.update);
router.delete("/:id", StudentController.remove);

export default router;
