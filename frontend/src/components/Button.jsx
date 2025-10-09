
export function Button({label, onClick, disabled}) {
    return <button onClick={onClick} disabled={disabled} type="button" className={`w-full text-white focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ${disabled ? "bg-gray-400 cursor-not-allowed" : "bg-gray-800 hover:bg-gray-900" }`}>{label}</button>
}