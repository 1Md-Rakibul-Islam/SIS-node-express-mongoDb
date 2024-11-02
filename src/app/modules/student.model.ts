import { Schema, model } from 'mongoose';
import {
    Guardian,
    LocalGuardian,
    Student,
    UserName,
} from './student/student.interface';

const userNameSchema = new Schema<UserName>({
    firstName: {
        type: String,
        required: [true, 'First name is requireddd'],
    },
    middleName: {
        type: String,
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
    },
});

const guardianSchema = new Schema<Guardian>({
    fatherName: {
        type: String,
        required: true,
    },
    fatherOccupation: {
        type: String,
        required: true,
    },
    fatherContactNo: {
        type: String,
        required: true,
    },
    motherName: {
        type: String,
        required: true,
    },
    motherOccupation: {
        type: String,
        required: true,
    },
    motherContactNo: {
        type: String,
        required: true,
    },
});

const localGuradianSchema = new Schema<LocalGuardian>({
    name: {
        type: String,
        required: true,
    },
    occupation: {
        type: String,
        required: true,
    },
    contactNo: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
});

const studentSchema = new Schema<Student>({
    id: { type: String, required: true, unique: true },
    name: {
        type: userNameSchema,
        required: true,
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female'],
            message: '{VALUE} is not valid',
        },
        required: true,
    },
    dateOfBirth: { type: String },
    email: { type: String, required: true },
    contactNo: { type: String, required: true, unique: true },
    emergencyContactNo: { type: String, required: true },
    bloogGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        required: true,
    },
    presentAddress: { type: String, required: true },
    permanentAddres: { type: String, required: true },
    guardian: guardianSchema,
    localGuardian: {
        type: localGuradianSchema,
        required: true,
    },
    profileImg: { type: String },
    isActive: {
        type: String,
        enum: ['active', 'blocked'],
        default: 'active',
        required: true,
    },
});

export const StudentModel = model<Student>('Student', studentSchema);