'use client'

import { useFormState } from "react-dom"
import { useEffect } from "react"
import { authenticate } from "@/actions/authenticate-user-action"
import { toast } from "react-toastify"

export default function LoginForm() {
    const [state, dispatch] = useFormState(authenticate, {
        errors: [],
    })

    useEffect(() => {
        if(state.errors) {
            state.errors.forEach(err => toast.error(err))
        }
    }, [state])

    return (
        <>
            <form
                className="mt-14 space-y-5"
                noValidate
                action={dispatch}
            >
                <div className="flex flex-col gap-2">
                    <label
                        className="font-bold text-2xl"
                    >Email</label>

                    <input
                        id="email"
                        type="email"
                        placeholder="Register Email"
                        className="w-full border border-gray-300 p-3 rounded-lg text-black"
                        name="email"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label
                        className="font-bold text-2xl"
                    >Password</label>

                    <input
                        type="password"
                        placeholder="Register Password"
                        className="w-full border border-gray-300 p-3 rounded-lg text-black"
                        name="password"
                    />
                </div>

                <input
                    type="submit"
                    value='Login'
                    className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer"
                />
            </form>
        </>
    )
}