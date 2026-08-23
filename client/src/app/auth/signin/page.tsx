"use client"

import { signIn } from "next-auth/react"
import Image from "next/image"
import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"

export default function SignIn() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [seePassword, setSeePassword] = useState(false)

    function handleLogin() {
        signIn('credentials', {
            email,
            password,
            callbackUrl: '/'
        })
    }
    return (
        <>
            <div className="bg-[#161b22] text-white h-screen w-screen flex justify-center items-center">
                <div className="bg-[#0d1117] py-5 rounded-xl px-9 min-w-96">
                    <div>
                        <h1 className="pb-1">Welcome Back!</h1>
                        <p>Login with email</p>
                    </div>

                    <div className="pt-5">
                        <div className="flex flex-col pb-2">
                            <label htmlFor="email" className="font-medium pb-1">Email</label>
                            <input onChange={(e) => setEmail(e.target.value)} id="email" type="text" placeholder="example@gmail.com" className="border border-[#555] px-3 py-1.5 rounded-lg" />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="password" className="font-medium pb-1">Password</label>
                            <div className="relative w-full">
                                <input onChange={(e) => setPassword(e.target.value)} id="password" type={seePassword? "text": "password"} placeholder="Password" className="border pr-9 border-[#555] w-full px-3 py-1.5 rounded-lg" />
                            <button onClick={() => setSeePassword(!seePassword)} className="cursor-pointer">
                                {seePassword? <Eye strokeWidth={1.75} color="#777" size={20} className="absolute right-2 top-3/6 -translate-y-3/6" />:
                                <EyeOff strokeWidth={1.75} color="#777" size={20} className="absolute right-2 top-3/6 -translate-y-3/6" />}
                            </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button onClick={() => handleLogin()} className="bg-[#555] cursor-pointer mb-4 text-center px-6 mt-2 w-full py-3 rounded-lg">Login</button>
                    </div>

                    <div className="grid grid-cols-[1fr_auto_1fr] items-center">
                        <hr className="border-[#555] border-t" />
                        <p className="text-center text-lg px-3">or</p>
                        <hr className="border-[#555] border-t" />
                    </div>

                    <div>
                        <button onClick={() => signIn('google', {
                            callbackUrl: '/'
                        })} className="bg-white cursor-pointer relative flex items-center justify-center text-black mb-4 text-center px-6 mt-2 w-full py-4 rounded-lg">
                            <Image className="absolute left-3" src="https://authjs.dev/img/providers/google.svg" width={22} height={22} alt="Google" />
                            <h4 className="font-medium">Sign in with Google</h4>
                        </button>
                    </div>
                    <p className="text-center pb-2">Don&apos;t have a account? <span className="font-medium underline cursor-pointer"><Link href='/auth/signup'>Register Now</Link></span></p>
                </div>
            </div>
        </>
    )
}