"use client";

import axios from "axios";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export default function SignUp() {
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [seePassword, setSeePassword] = useState(false);
  const router = useRouter();

  async function handleSignUp() {
  setAuthLoading(true);

  try {
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/sign-up`,
      {
        fullName,
        email,
        password,
      },
    );

    toast.success(result.data.msg || "User registered successfully!");
    router.push("/auth/signin");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(
        error.response?.data?.msg || "Something went wrong"
      );
    } else {
      toast.error("Something went wrong");
    }
  } finally {
    setAuthLoading(false);
  }
}
  return (
    <>
      <div className="bg-[#161b22] text-white h-screen w-screen flex justify-center items-center">
        <div className="bg-[#0d1117] py-5 w-[92vw] sm:w-auto rounded-xl px-9 min-w-96">
          <div>
            <h1 className="pb-1 font-semibold text-2xl sm:text-3xl sm:font-bold">Get Started!</h1>
            <p>Login with email</p>
          </div>

          <div className="pt-5">
            <div className="flex flex-col pb-2">
              <label htmlFor="fullName" className="font-medium text-sm sm:text-base pb-1">
                Full Name
              </label>
              <input
                onKeyDown={(e) => {
                  if (e.key === "Enter" && fullName.trim()) {
                    emailInputRef.current?.focus();
                  }
                }}
                onChange={(e) => setFullName(e.target.value)}
                id="fullName"
                type="text"
                placeholder="John Wick"
                className="border outline-none border-[#555] px-3 py-1.5 rounded-lg"
              />
            </div>

            <div className="flex flex-col pb-2">
              <label htmlFor="email" className="font-medium pb-1 text-sm sm:text-base">
                Email
              </label>
              <input
                ref={emailInputRef}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && email.trim()) {
                    passwordInputRef.current?.focus();
                  }
                }}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="text"
                placeholder="example@gmail.com"
                className="border outline-none border-[#555] px-3 py-1.5 rounded-lg"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="font-medium pb-1 text-sm sm:text-base">
                Password
              </label>
              <div className="relative w-full">
                <input
                  ref={passwordInputRef}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && password.trim()) {
                      handleSignUp();
                    }
                  }}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  type={seePassword ? "text" : "password"}
                  placeholder="Password"
                  className="border pr-9 border-[#555] outline-none  w-full px-3 py-1.5 rounded-lg"
                />
                <button
                  onClick={() => setSeePassword(!seePassword)}
                  className="cursor-pointer"
                >
                  {seePassword ? (
                    <Eye
                      strokeWidth={1.75}
                      color="#777"
                      size={20}
                      className="absolute right-2 top-3/6 -translate-y-3/6"
                    />
                  ) : (
                    <EyeOff
                      strokeWidth={1.75}
                      color="#777"
                      size={20}
                      className="absolute right-2 top-3/6 -translate-y-3/6"
                    />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <button
              disabled={authLoading}
              onClick={() => handleSignUp()}
              className={`mb-4 text-center px-6 mt-2 w-full py-3 rounded-lg ${authLoading ? "opacity-50 bg-[#555] cursor-not-allowed" : "hover:bg-[#444] bg-[#555] cursor-pointer "}`}
            >
              {authLoading ? "Creating account..." : "Sign Up"}
            </button>
          </div>

          <div className="grid grid-cols-[1fr_auto_1fr] items-center">
            <hr className="border-[#555] border-t" />
            <p className="text-center text-lg px-3">or</p>
            <hr className="border-[#555] border-t" />
          </div>

          <div>
            <button
              onClick={() =>
                signIn("google", {
                  callbackUrl: "https://chat-app-two-ochre-87.vercel.app",
                })
              }
              className="bg-white cursor-pointer relative flex items-center justify-center text-black mb-4 text-center px-6 mt-2 w-full py-4 rounded-lg"
            >
              <Image
                className="absolute left-3"
                src="https://authjs.dev/img/providers/google.svg"
                width={22}
                height={22}
                alt="Google"
              />
              <h4 className="font-medium">Sign up with Google</h4>
            </button>
          </div>
          <p className="text-center pb-2">
            You already have an account?{" "}
            <span className="font-medium underline cursor-pointer">
              <Link href="/auth/signin">Sign In</Link>
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
