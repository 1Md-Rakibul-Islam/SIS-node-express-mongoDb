import express, { Request, Response } from "express";
import cors from "cors";
import { StudentRoutes } from "./app/modules/student/student.route";

const app = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use("/api/v1/students", StudentRoutes);

app.get("/", (req: Request, res: Response) => {
    const a = {
        name: "hello",
        version: "1.0.0",
    };
    res.status(200).json({
        status: 200,
        data: a,
        message: "success",
    });
});

export default app;
