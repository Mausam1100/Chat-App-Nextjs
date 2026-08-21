import type { Request, Response } from "express";
export declare const signUp: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const signIn: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const googleSignIn: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=user.controller.d.ts.map