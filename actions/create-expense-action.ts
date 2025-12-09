'use server'

import getToken from "@/src/auth/token"
import { Budget, DraftExpenseSchema, ErrorSchema, SuccessSchema } from "@/src/schemas"
import { revalidatePath } from "next/cache"

type ActionStateType = {
    errors: string[],
    success: string
}

export async function createExpense(budgetId: Budget['id'], prevState: ActionStateType, formData: FormData)  {
    const expenseInput = {
        name: formData.get('name'),
        amount: formData.get('amount'),
    }

    // sanitization
    const expense = DraftExpenseSchema.safeParse(expenseInput);
    if(!expense.success) {
        return {
            errors: expense.error.issues.map(err => err.message),
            success: ''
        }
    }

    // request to backend service
    const token = getToken();
    const url = `${process.env.API_URL}/budgets/${budgetId}/expenses`
    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name: expense.data.name,
            amount: expense.data.amount
        })
    })

    // response to backend
    const json = await req.json()

    if(!req.ok) {
        const {error} = ErrorSchema.parse(json)
        return {
            errors: [error],
            success: ''
        }        
    }

    const success = SuccessSchema.parse(json)
    revalidatePath(`/admin/budgets/${budgetId}`)

    return {
        errors: [],
        success: success.msg
    }
}