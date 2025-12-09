import React from 'react'
import { useFormStatus } from 'react-dom'

const commonStyles = 'bg-amber-500 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors';

export default function Submit({label}: {label:string}) {
    const status = useFormStatus()

    return (
        <input
            type="submit"
            className={status.pending ? `${commonStyles} bg-gray-800` : `${commonStyles} hover:bg-amber-600`}
            value={status.pending ? 'Procesing...' : label ? label : 'Submit'}
            disabled={status.pending}
        />
    )
}
