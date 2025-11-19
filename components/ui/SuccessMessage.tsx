const SuccessMessage = ({children}: {children: React.ReactNode}) => {
  return (
    <p className="text-center my-4 font-bold bg-amber-500 uppercase text-sm p-3">
        {children}
    </p>
  )
}

export default SuccessMessage