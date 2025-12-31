'use server'

import getToken from "@/src/auth/token"
import { UpdatePasswordSchema, ErrorSchema, SuccessSchema } from "@/src/schemas"

type ActionStateType = {
    errors: string[],
    success: string
}

export async function updatePassword(prevState: ActionStateType, formData: FormData) {
    const updatePasswordInput = {
        current_password: formData.get('current_password'),
        password: formData.get('password'),
        password_confirmation: formData.get('password_confirmation')
    }

    // sanitization
    const updatePassword = UpdatePasswordSchema.safeParse(updatePasswordInput)
    if(!updatePassword.success){
        return {
            errors: updatePassword.error.issues.map(err => err.message),
            success: ''
        }
    }

    // request to backend service
    const token = getToken()
    const url = `${process.env.API_URL}/auth/update-password`;
    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            current_password: updatePassword.data.current_password,
            new_password: updatePassword.data.password
        })
    })

    const json = await req.json()
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