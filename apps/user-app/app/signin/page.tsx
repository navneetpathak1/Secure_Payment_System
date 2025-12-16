"use client"
import { Card } from "@repo/ui/card";
import { Button } from "@repo/ui/button";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Signin() {
    const router = useRouter();
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    return <div className="h-screen flex justify-center flex-col bg-slate-100">
        <div className="flex justify-center">
            <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                <div className="px-10">
                    <div className="text-3xl font-extrabold text-center text-[#6a51a6]">
                        PayTM
                    </div>
                    <div className="text-center text-slate-500 mb-4 pt-2">
                        Login to continue
                    </div>
                    <TextInput placeholder={"1212121212"} label={"Phone Number"} onChange={(value) => {
                        setPhone(value);
                    }} />
                    <div className="pt-2">
                         <label className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                         <input onChange={(e) => setPassword(e.target.value)} type="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" />
                    </div>

                    <div className="pt-4 flex justify-center">
                        <Button onClick={async () => {
                            const res = await signIn("credentials", {
                                phone: phone,
                                password: password,
                                redirect: false,
                            });
                            if (!res?.error) {
                                router.push("/");
                            } else {
                                alert("Invalid credentials or error");
                            }
                        }}>Login</Button>
                    </div>
                    <div className="text-center text-slate-500 pt-3">
                         Don't have an account? <a className="underline pl-1 cursor-pointer" onClick={() => {
                             router.push("/signup")
                         }}>Sign Up</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
