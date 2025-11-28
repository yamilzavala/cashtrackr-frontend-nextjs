import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='space-y-5'>
        <h1 className="font-black text-4xl text-purple-950">Resource not found</h1>
        <p className="text-xl font-bold">The budget that you are trying to get {''} <span className="text-amber-500">not exist</span></p>
        <Link href="/admin" className='bg-amber-500 px-10 py-2 rounded-lg text-white font-bold cursor-pointer inline-block'>Go to Budgets</Link>
    </div>
  )
}