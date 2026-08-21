import z from "zod";
import { prisma } from "../lib/prisma.js";
import bcrypt from 'bcrypt';
const signUpSchema = z.object({
    fullName: z.string().min(3).max(15),
    email: z.email(),
    password: z.string().min(3).max(25)
});
const signInSchema = z.object({
    email: z.string().min(1, "Email is required"),
    password: z.string().min(1, "Password is required"),
});
export const signUp = async (req, res) => {
    try {
        const result = signUpSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                msg: result.error.issues[0]?.message
            });
        }
        const { fullName, email, password } = result.data;
        const existedUser = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if (existedUser) {
            return res.status(400).json({
                msg: "User with this username already existed!"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 16);
        await prisma.user.create({
            data: {
                fullName,
                email,
                password: hashedPassword
            }
        });
        res.status(200).json({
            msg: "User created successfully!"
        });
    }
    catch (error) {
        console.log(`Error in signUp controller: ${error}`);
    }
};
export const signIn = async (req, res) => {
    try {
        const result = signInSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                msg: result.error.issues[0]?.message
            });
        }
        const { email, password } = result.data;
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if (!user) {
            return res.status(400).json({
                msg: "User doesn't exist!"
            });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({
                msg: "Incorrect Password!"
            });
        }
        res.status(200).json({
            id: user.id,
            fullName: user.fullName,
            email: user.email
        });
        res.status(200).json({
            msg: "User logged in successfully!"
        });
    }
    catch (error) {
        console.log(`Error in signIn controller: ${error}`);
    }
};
export const googleSignIn = async (req, res) => {
    try {
        const { name, email } = req.body;
        if (!email) {
            return res.status(400).json({
                message: "Email is required",
            });
        }
        let user = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            user = await prisma.user.create({
                data: {
                    fullName: name,
                    email,
                    password: null,
                },
            });
        }
        return res.status(200).json(user);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Something went wrong",
        });
    }
};
export const searchUser = async (req, res) => {
    try {
        const query = req.query.q;
        const users = await prisma.user.findMany({
            where: {
                OR: [
                    {
                        fullName: {
                            contains: query,
                            mode: "insensitive"
                        }
                    },
                    {
                        email: {
                            contains: query,
                            mode: "insensitive"
                        }
                    }
                ]
            },
            select: {
                fullName: true,
                email: true
            }
        });
        res.status(200).json({
            users
        });
    }
    catch (error) {
        console.log(`Error in searchUser controller: ${error}`);
    }
};
//# sourceMappingURL=user.controller.js.map