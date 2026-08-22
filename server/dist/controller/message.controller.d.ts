import type { Request, Response } from "express";
interface PropsType {
    content: string;
    senderId: number;
    receiverId: number;
}
export declare const saveNewMessages: ({ content, senderId, receiverId, }: PropsType) => Promise<{
    id: number;
    content: string;
    createdAt: Date;
    senderId: number;
    receiverId: number;
} | undefined>;
export declare const getMessages: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getFriends: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteChat: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export {};
//# sourceMappingURL=message.controller.d.ts.map