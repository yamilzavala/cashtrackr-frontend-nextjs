"use client"

import { updatePassword } from "@/actions/update-password-action"
import { useFormState } from "react-dom"
import ErrorMessage from "../ui/ErrorMessage"
import { useEffect, useRef } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

export default function ChangePasswordForm() {
  const router = useRouter()
  const ref = useRef<HTMLFormElement>(null)
  const [state, dispatch] = useFormState(updatePassword, {
    errors: [],
    success: ''
  })

  useEffect(() => {
    if(state.success) {
        toast.success(state.success, {
            onClose: () => router.push('/auth/login')
        })
        ref.current?.reset()
    }
  }, [state])


  return (
    <>
      <form
        className=" mt-14 space-y-5"
        noValidate
        action={dispatch}
        ref={ref}
      >
        {state.errors.map(err => <ErrorMessage key={err}>{err}</ErrorMessage>)}

        <div className="flex flex-col gap-5">
          <label
            className="font-bold text-2xl"
            htmlFor="current_password"
          >Current Password</label>
          <input
            id="current_password"
            type="password"
            placeholder="Current Password"
            className="w-full border border-gray-300 p-3 rounded-lg text-black"
            name="current_password"
          />
        </div>
        <div className="flex flex-col gap-5">
          <label
            className="font-bold text-2xl"
            htmlFor="password"
          >New Password</label>
          <input
            id="password"
            type="password"
            placeholder="Register Password"
            className="w-full border border-gray-300 p-3 rounded-lg text-black"
            name="password"
          />
        </div>
        <div className="flex flex-col gap-5">
          <label
            htmlFor="password_confirmation"
            className="font-bold text-2xl"
          >Repeat Password</label>

          <input
            id="password_confirmation"
            type="password"
            placeholder="Repeat Register Password"
            className="w-full border border-gray-300 p-3 rounded-lg text-black"
            name="password_confirmation"
          />
        </div>

        <input
          type="submit"
          value='Change Password'
          className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer"
        />
      </form>
    </>
  )
}