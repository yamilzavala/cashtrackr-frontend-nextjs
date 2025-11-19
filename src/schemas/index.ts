import { z } from 'zod'

export const RegisterSchema = z.object({
    email: z.string()
            .min(1, {message: 'Required Email'})
            .email({message: 'Invalid email'}),
    name: z.string()
            .min(1, {message: 'Required Name'}),
    password: z.string()
                .min(8, {message: 'Password must be at least eight characters'}),
    password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation, {
    message: 'Passwords are not equals',
    path: ['password_confirmation']
})

export const SuccessSchema = z.object({
    msg: z.string()
});

export const ErrorSchema = z.object({
    error: z.string()
});

export const TokenSchema = z.string({message: 'Not valid token'})
                            .length(6, {message: 'Must be 6 digits'})