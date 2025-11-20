'use server'

import { ErrorSchema, LoginSchema, SuccessToken } from "@/src/schemas"
import { cookies } from "next/headers"
import {redirect} from 'next/navigation'

type ActionStateType = {
    errors: string[],
}

export async function authenticate(prevState: ActionStateType, formData: FormData) {
    const loginData = {
        email: formData.get('email'),
        password: formData.get('password')
    }

    const auth = LoginSchema.safeParse(loginData)

    if(!auth.success) {
        const errors = auth.error.issues.map(issue => issue.message);
        return {
            errors,
        }
    }

    const url = `${process.env.API_URL}/auth/login`
    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            email: auth.data.email,
            password: auth.data.password
        })
    })

    const json = await req.json();

    if(!req.ok) {
        const {error} = ErrorSchema.parse(json)
        return {
            errors: [error],
        }
    }

    const success = SuccessToken.parse(json);

    cookies().set({
        name: 'CASHTRACKR_TOKEN',
        value: success.token,
        httpOnly: true,
        path: '/',
    })

    redirect('/admin')
}