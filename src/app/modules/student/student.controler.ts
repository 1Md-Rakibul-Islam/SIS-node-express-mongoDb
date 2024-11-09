import { Request, Response } from "express";
import { StudentServices } from "./student.service";
import studentValidationSchema from "./student.validation";
// import studentValidationSchema from "./student.joi.validation";

const createStudent = async (req: Request, res: Response) => {
    try {
        const { student: studentData } = req.body;

        // Validate student data usign joi
        // const { error, value } = studentValidationSchema.validate(studentData);

        // data validation using zod
        const zodParseData = studentValidationSchema.parse(studentData);

        // Proceed with database operation if validation is successful
        const result = await StudentServices.createStudentIntoDb(zodParseData);


        // if (error) {
        //     // Respond with error if validation fails
        //     return res.status(400).json({
        //         success: false,
        //         message: "Student creation failed due to validation error",
        //         error: error.details,
        //     });
        // }

        res.status(200).json({
            success: true,
            message: "Student created successfully",
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: (error as Error).message || "Student creation failed",
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
        res.status(500).json({
            success: false,
            message: (error as Error).message || "Something went wrong",
            error: error,
        });
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
        res.status(500).json({
            success: false,
            message: (error as Error).message || "Something went wrong",
            error: error,
        });
    }
};

const deleteStudent = async (req: Request, res: Response) => {
    try {
        const { studentId } = req.params;

        const result = await StudentServices.deleteStudentFromDB(studentId);

        res.status(200).json({
            success: true,
            message: "Students deleted successfully",
            data: result,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: (error as Error).message || "Something went wrong",
            error: error,
        })
    }
}

export const StudentController = {
    createStudent,
    getAllStudents,
    getSingleStudent,
    deleteStudent
};