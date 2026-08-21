import type { Request, Response } from "express";
export declare const signUp: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const signIn: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const googleSignIn: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const searchUser: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=user.controller.d.ts.map