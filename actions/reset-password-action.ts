'use server'

import { ErrorSchema, ResetPasswordSchema, SuccessSchema } from "@/src/schemas"
import { cookies } from "next/headers"

type ActionStateType = {
    errors: string[],
    success: string
}

export async function resetPassword(token: string, prevState: ActionStateType, formData: FormData) {
    const resetPasswordInput = {
        password: formData.get('password'),
        password_confirmation: formData.get('password_confirmation')

    }

    // sanitization
    const resetPassword = ResetPasswordSchema.safeParse(resetPasswordInput)
    if(!resetPassword.success) {
        return {
            errors: resetPassword.error.issues.map(err => err.message),
            success: ''
        }
    }

    // request to backend service
    const url = `${process.env.API_URL}/auth/reset-password/${token}`
    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            password: resetPasswordInput.password
        })
    })

   const json = await req.json();

    if(!req.ok) {
        const {error} = ErrorSchema.parse(json)
           return {
            errors: [error],
            success: ''
           } 
    }

    const success = SuccessSchema.parse(json)

    return {
        errors: [],
        success: success.msg
    }

}