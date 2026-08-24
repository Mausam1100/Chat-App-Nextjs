import Image from "next/image"
import { CircleUserRound, LogOut } from "lucide-react"
import { useRouter } from "next/navigation";
import DefaultProfilePic from "../DefaultProfilePic";

interface PropsType {
    setLogOutModal: React.Dispatch<React.SetStateAction<boolean>>,
    setMenuModal: React.Dispatch<React.SetStateAction<boolean>>,
    fullName: string,
    imageUrl: string | null,
    id: number
}

export default function MenuModal({setLogOutModal, setMenuModal, fullName, id, imageUrl}: PropsType) {
    const router = useRouter()
    function handleClick() {
        setLogOutModal(true);
        setMenuModal(false)
    }
    return (
        <>
        <div className="bg-[#444] whitespace-nowrap rounded-lg p-4 w-fit">
            <div className="bg-[#444] rounded-lg border border-[#777] px-3 py-2">
                <div className="flex items-center gap-x-3 border-b border-[#777] pb-3">
                    <div className="h-8 w-8 rounded-full">
                        {imageUrl? <Image src={imageUrl} width={30} height={30} alt="img" className="rounded-full object-cover" />:
                        <DefaultProfilePic size="verySmall" id={id} fullName={fullName} />}
                    </div>
                    <h4 className="text-base">{fullName}</h4>
                </div>
                <button onClick={() => router.push('/profile')} className="flex items-center justify-center py-1.5 rounded-lg w-full mt-3 mb-1 gap-x-1 cursor-pointer bg-[#666] hover:bg-[#888]">
                    <CircleUserRound strokeWidth={2} size={18} />
                    <h4 className="font-medium text-sm">See profile</h4>
                </button>
            </div>
            <button onClick={handleClick} className="cursor-pointer flex items-center gap-x-2 mt-2  py-2 px-3  rounded-lg hover:bg-[#333] border border-[#777] w-full ">
                <div className="bg-[#666] p-1 rounded-full">
                    <LogOut size={20} />
                </div>
                <h4 className="font-medium font-sm">Log out</h4>
            </button>
        </div>
        </>
    )
}