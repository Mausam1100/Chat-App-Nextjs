import type { Request, Response } from "express";
import z from "zod";
import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";
import cloudinary from "../config/cloudinary.js";

const signUpSchema = z.object({
  fullName: z.string().min(3).max(15),
  email: z.email(),
  password: z.string().min(3).max(25),
});

const signInSchema = z.object({
  email: z.string().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

type signUpType = z.infer<typeof signUpSchema>;
type signInType = z.infer<typeof signInSchema>;

export const signUp = async (req: Request, res: Response) => {
  try {
    const result = signUpSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        msg: result.error.issues[0]?.message,
      });
    }

    const { fullName, email, password }: signUpType = result.data;

    const existedUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existedUser) {
      return res.status(400).json({
        msg: "User with this username already existed!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 16);

    await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
      },
    });

    res.status(200).json({
      msg: "User created successfully!",
    });
  } catch (error) {
    console.log(`Error in signUp controller: ${error}`);
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const result = signInSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        msg: result.error.issues[0]?.message,
      });
    }

    const { email, password }: signInType = result.data;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(400).json({
        msg: "User doesn't exist!",
      });
    }

    if (!user.password) {
      return res.status(400).json({
      msg: "This account was created with Google. Please sign in with Google.",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password!);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        msg: "Incorrect Password!",
      });
    }

    res.status(200).json({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      imageUrl: user.imageUrl,
      createdAt: user.createdAt
    });
  } catch (error) {
    console.log(`Error in signIn controller: ${error}`);
  }
};

export const googleSignIn = async (req: Request, res: Response) => {
  try {
    const { fullName, email, imageUrl } = req.body;

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
          fullName: fullName ?? "",
          email,
          imageUrl: imageUrl
        },
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Google sign-in error:", error);

    return res.status(500).json({
      message: "Google sign-in failed",
    });
  }
};

export const searchUser = async (req: Request, res: Response) => {
  try {
    const query = req.query.q as string;
    const userId = Number(req.userId)

    const users = await prisma.user.findMany({
      where: {
        id: {
          not: userId
        },
        OR: [
          {
            fullName: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            email: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        imageUrl: true
      },
    });

    res.status(200).json({
      users,
    });
  } catch (error) {
    console.log(`Error in searchUser controller: ${error}`);
  }
};

export const editProfile = async (req: Request, res: Response) => {
  try {
    const { fullName } = req.body;
    const userId = Number(req.userId);

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    let profilePic = user.imageUrl;

    if (req.file) {
      const result = await new Promise<any>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "profile-images",
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );

        uploadStream.end(req.file?.buffer);
      });

      profilePic = result.secure_url
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        fullName,
        imageUrl: profilePic
      },
    });

    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating profile:", error);

    return res.status(500).json({
      message: "Failed to update profile",
    });
  }
};