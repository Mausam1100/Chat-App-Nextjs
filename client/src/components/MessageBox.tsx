interface Message {
    msg: string,
    sender: "me" | "other"
}

export default function MessageBox({msg, sender}: Message) {
    const isLink = /^https?:\/\/[^\s]+$/.test(msg);
    return (
        <>
            <div className={`text-white mb-2 flex ${sender=="me"? "justify-end": "justify-start"}`}>
                <p className={`text-white px-3 py-1 rounded-2xl break-all max-w-[80%] sm:max-w-[40%] w-fit ${sender=='me'? "bg-blue-500": "bg-[#555]"}`}>{isLink ? <a href={msg} target="_blank" rel="noopener noreferrer" className="underline">
                    {msg}
                </a> : msg}</p>
            </div>
        </>
    )
}