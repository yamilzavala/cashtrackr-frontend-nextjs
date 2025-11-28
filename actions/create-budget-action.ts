'use server'

import getToken from "@/src/auth/token";
import { DraftBudgetSchema, ErrorSchema, SuccessSchema } from "@/src/schemas";

type ActionStateType = {
    errors: string [],
    success: string
}

export async function createBudget(prevState: ActionStateType, formData: FormData) {
    const budgetInput = {
        name: formData.get('name'),
        amount: formData.get('amount')
    }

    // sanitization
    const budget = DraftBudgetSchema.safeParse(budgetInput);
    if(!budget.success) {
        return {
            errors: budget.error.issues.map(err => err.message),
            success: ''
        }
    }
    
    // request to backend service
    const token = getToken()
    const url = `${process.env.API_URL}/budgets`
    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name: budget.data.name,
            amount: budget.data.amount,
        })
    })

    const json = await req.json()

    if (!req.ok) {
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