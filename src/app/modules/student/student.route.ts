import express from 'express';
import { StudentController } from './student.controler';

const router = express.Router();

router.post("/create-student", StudentController.createStudent);

router.get("/", StudentController.getAllStudents);

router.get("/:studentId", StudentController.getSingleStudent);

export const StudentRoutes = router;