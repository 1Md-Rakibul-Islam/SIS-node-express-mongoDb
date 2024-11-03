import { Request, Response } from "express";
import { StudentServices } from "./student.service";
import studentValidationSchema from "./student.validation";

const createStudent = async (req: Request, res: Response) => {
    try {
        const { student: studentData } = req.body;

        // Validate student data
        const { error, value } = studentValidationSchema.validate(studentData);

        if (error) {
            // Respond with error if validation fails
            return res.status(400).json({
                success: false,
                message: "Student creation failed due to validation error",
                error: error.details,
            });
        }

        // Proceed with database operation if validation is successful
        const result = await StudentServices.createStudentIntoDb(value);

        res.status(200).json({
            success: true,
            message: "Student created successfully",
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Student creation failed",
            error: error,
        });
    }
};

const getAllStudents = async (req: Request, res: Response) => {
    try {

        const result = await StudentServices.getAllStudentsFromDB();

        res.status(200).json({
            success: true,
            message: "Students fetched successfully",
            data: result,
        })

    } catch (error) {
        console.log(error);
    }
}

const getSingleStudent = async (req: Request, res: Response) => {

    try {
        const { studentId } = req.params;

        const result = await StudentServices.getSingleStudentFromDB(studentId);

        res.status(200).json({
            success: true,
            message: "Students fetched successfully",
            data: result,
        })

    } catch (error) {
        console.log(error);
    }
};

export const StudentController = {
    createStudent,
    getAllStudents,
    getSingleStudent
};