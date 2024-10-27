import express from 'express';
import { StudentController } from './student.controler';

const router = express.Router();

router.post("/create-student", StudentController.createStudent)

export const StudentRoutes = router;