'use server'

import getToken from "@/src/auth/token"
import { UpdateProfileSchema, ErrorSchema, SuccessSchema } from "@/src/schemas"
import { revalidatePath } from "next/cache"

type ActionStateType = {
    errors: string[],
    success: string
}

export async function updateProfile(prevState: ActionStateType, formData: FormData) {
    const updateProfileInput = {
        name: formData.get('name'),
        email: formData.get('email'),
    }

    // sanitization
    const updateProfile = UpdateProfileSchema.safeParse(updateProfileInput)
    if(!updateProfile.success){
        return {
            errors: updateProfile.error.issues.map(err => err.message),
            success: ''
        }
    }

    // request to backend service
    const token = getToken()
    const url = `${process.env.API_URL}/auth/user`;
    const req = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name: updateProfile.data.name,
            email: updateProfile.data.email
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

    revalidatePath('/admin/profile/settings')

    return {
        errors: [],
        success: success.msg
    }

}