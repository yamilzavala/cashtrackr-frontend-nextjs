'use server'

import { ErrorSchema, RegisterSchema, SuccessSchema } from "@/src/schemas"

type ActionStateType = {
    errors: string[],
    success: string
};

export async function register (prevState: ActionStateType, formData: FormData) {
    const registerData = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        password_confirmation: formData.get('password_confirmation')
    }

    // zod validations
    const register = RegisterSchema.safeParse(registerData)
    
    if(!register.success) {
        const errors = register.error.issues.map(issue => issue.message);
        return {
            errors,
            success: ''
        }
    }

    // user register
    const url = `${process.env.API_URL}/auth/create-account`
    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: register.data.name,
            password: register.data.password,
            email: register.data.email,
        })
    })

    //console.log('### STATUS: ', req.status)
    const json = await req.json();

    if(req.status === 409) {
        const {error} = ErrorSchema.parse(json);
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