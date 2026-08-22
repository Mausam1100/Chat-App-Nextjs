import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

interface PropsType {
  content: string;
  senderId: number;
  receiverId: number;
}

export const saveNewMessages = async ({
  content,
  senderId,
  receiverId,
}: PropsType) => {
  try {
    const message = await prisma.message.create({
      data: {
        content,
        senderId,
        receiverId,
      },
    });
    return message;
  } catch (error) {
    console.log(`Error in saveNewMessages function: ${error}`);
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const { senderId, receiverId } = req.query;

    if (!senderId || !receiverId) {
      return res.status(400).json({
        msg: "senderId and receiverId are missing!",
      });
    }

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: Number(senderId),
            receiverId: Number(receiverId),
          },
          {
            senderId: Number(receiverId),
            receiverId: Number(senderId),
          },
        ],
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    res.status(200).json({ messages });
  } catch (error) {
    console.log(`Error in getMessages function: ${error}`);
  }
};

export const getFriends = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.query.userId);

    if (!userId) {
      return res.status(400).json({
        message: "userId is required",
      });
    }

    const users = await prisma.user.findMany({
      where: {
        id: {
          not: userId,
        },
        OR: [
          {
            receivedMessages: {
              some: {
                senderId: userId,
              },
            },
          },
          {
            sentMessages: {
              some: {
                receiverId: userId,
              },
            },
          },
        ],
      },
      select: {
        id: true,
        fullName: true,
        email: true,
      },
    });

    return res.status(200).json({
      users,
    });
  } catch (error) {
    console.log(`Error in getFriends function: ${error}`);
  }
};

export const deleteChat = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.query.userId);
    const otherUserId = Number(req.query.otherUserId);

    if (!userId || !otherUserId) {
      return res.status(400).json({
        message: "userId and otherUserId are required",
      });
    }

    await prisma.message.deleteMany({
        where: {
            OR: [
                {senderId: userId, receiverId: otherUserId},
                {senderId: otherUserId, receiverId: userId}
            ]
        }
    })

    res.status(200).json({
        msg: "Chate deleted successfully"
    })
  } catch (error) {
    console.log(`Error in deleteChat function: ${error}`);
  }
};
