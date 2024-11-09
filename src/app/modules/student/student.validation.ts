import { z } from 'zod';

const userNameValidationSchema = z.object({
    firstName: z
        .string()
        .trim()
        .min(1, 'First name is required')
        .max(20, 'First name cannot be more than 20 characters')
        .refine(value => /^[A-Z]/.test(value), {
            message: '{VALUE} is not in capitalized format',
        }),
    middleName: z.string().trim().max(20, 'Middle name cannot be more than 20 characters').optional(),
    lastName: z
        .string()
        .trim()
        .min(1, 'Last name is required')
        .max(20, 'Last name cannot be more than 20 characters')

        .refine(value => /^[a-zA-Z]+$/.test(value), {
            message: '{VALUE} is not a valid name',
        }),
});

const guardianValidationSchema = z.object({
    fatherName: z.string().min(1, "Father's name is required"),
    fatherOccupation: z.string().min(1, "Father's occupation is required"),
    fatherContactNo: z.string().min(1, "Father's contact number is required"),
    motherName: z.string().min(1, "Mother's name is required"),
    motherOccupation: z.string().min(1, "Mother's occupation is required"),
    motherContactNo: z.string().min(1, "Mother's contact number is required"),
});

const localGuardianValidationSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Local guardian's name is required")
        .max(30, "Local guardian's name cannot be more than 30 characters"),
    occupation: z.string().min(1, "Local guardian's occupation is required"),
    contactNo: z.string().min(1, "Local guardian's contact number is required"),
    address: z.string().min(1, "Local guardian's address is required"),
});

const studentValidationSchema = z.object({
    id: z.string().min(1, 'Student ID is required'),
    password: z.string().max(20, 'Password cannot be more than 20 characters'),
    name: userNameValidationSchema,
    gender: z.enum(['male', 'female', 'other'], { required_error: 'Gender is required' }),
    dateOfBirth: z.string().optional(),
    email: z.string().email('Email is required'),
    contactNo: z.string().min(1, 'Contact number is required'),
    emergencyContactNo: z.string().min(1, 'Emergency contact number is required'),
    bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
        required_error: 'Blood group is required',
    }),
    presentAddress: z.string().min(1, 'Present address is required'),
    permanentAddress: z.string().min(1, 'Permanent address is required'),
    guardian: guardianValidationSchema,
    localGuardian: localGuardianValidationSchema,
    profileImg: z.string().optional(),
    isActive: z.enum(['active', 'blocked']).default('active'),
    isDeleted: z.boolean(),
});

export default studentValidationSchema;
