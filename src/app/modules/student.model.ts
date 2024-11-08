import {
    Schema,
    model
} from 'mongoose';
import {
    // StudentMethods,
    StudentModel,
    TGuardian,
    TLocalGuardian,
    TStudent,
    TUserName,
} from './student/student.interface';
// import validator from 'validator';

const userNameSchema = new Schema<TUserName>({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
        // validate: {
        //     validator: function (values: string) {
        //         const firstNameStr = values.charAt(0).toUpperCase() + values.slice(1);
        //         return firstNameStr === values;
        //     },
        //     message: '{VALUE} is not a captalized format',
        // },
    },
    middleName: {
        type: String,
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
        // validate: {
        //     validator: (value: string) => validator.isAlpha(value),
        //     message: '{VALUE} is not a valid name',
        // }
    },
});

const guardianSchema = new Schema<TGuardian>({
    fatherName: {
        type: String,
        required: [true, 'Father\'s name is required'],
    },
    fatherOccupation: {
        type: String,
        required: [true, 'Father\'s occupation is required'],
    },
    fatherContactNo: {
        type: String,
        required: [true, 'Father\'s contact number is required'],
    },
    motherName: {
        type: String,
        required: [true, 'Mother\'s name is required'],
    },
    motherOccupation: {
        type: String,
        required: [true, 'Mother\'s occupation is required'],
    },
    motherContactNo: {
        type: String,
        required: [true, 'Mother\'s contact number is required'],
    },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
    name: {
        type: String,
        required: [true, 'Local guardian\'s name is required'],
        trim: true,
        maxlength: [30, 'Local guardian\'s name cannot be more than 20 characters'],
    },
    occupation: {
        type: String,
        required: [true, 'Local guardian\'s occupation is required'],
    },
    contactNo: {
        type: String,
        required: [true, 'Local guardian\'s contact number is required'],
    },
    address: {
        type: String,
        required: [true, 'Local guardian\'s address is required'],
    },
});

// StudentMethods for user define instance methods

const studentSchema = new Schema<TStudent, StudentModel>({
    id: { type: String, required: [true, 'Student ID is required'], unique: true },
    name: {
        type: userNameSchema,
        required: [true, 'Student name is required'],
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female'],
            message: '{VALUE} is not a valid gender',
        },
        required: [true, 'Gender is required'],
    },
    dateOfBirth: { type: String },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        // validate: {
        //     validator: (value: string) => validator.isEmail(value),
        //     message: '{VALUE} is not a valid email',
        // }
    },
    contactNo: { type: String, required: [true, 'Contact number is required'], unique: true },
    emergencyContactNo: { type: String, required: [true, 'Emergency contact number is required'] },
    bloodGroup: {
        type: String,
        enum: {
            values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
            message: '{VALUE} is not a valid blood group',
        },
        required: [true, 'Blood group is required'],
    },
    presentAddress: { type: String, required: [true, 'Present address is required'] },
    permanentAddress: { type: String, required: [true, 'Permanent address is required'] },
    guardian: guardianSchema,
    localGuardian: {
        type: localGuardianSchema,
        required: [true, 'Local guardian information is required'],
    },
    profileImg: { type: String },
    isActive: {
        type: String,
        enum: {
            values: ['active', 'blocked'],
            message: '{VALUE} is not a valid status',
        },
        default: 'active',
        required: [true, 'Status is required'],
    },
});

// create a custom static method
studentSchema.statics.isUserExists = async function (id: string) {

    const existingUser = await Student.findOne({ id: id });

    return existingUser;
}

export const Student = model<TStudent, StudentModel>('Student', studentSchema);

// studentSchema.methods.isUserExists = async function (id: string) {
//     const existingUser = await Student.findOne({ id: id });

//     return existingUser;
// }

// export const Student = model<TStudent, StudentModel>('Student', studentSchema);
