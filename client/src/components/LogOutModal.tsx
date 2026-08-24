import { CircleAlert } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
  setLogOutModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LogOutModal({setLogOutModal}: Props) {
    const router = useRouter()
    function handleLogOut() {
        signOut()
        router.push('https://chat-app-two-ochre-87.vercel.app/auth/signin')
        toast.success("Logged out successfully!")
    }
    return (
        <>
        <div onClick={() => setLogOutModal(false)} className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-xs bg-black/40">
            <div onClick={(e) => e.stopPropagation()} className="bg-[#555] flex flex-col px-4 rounded-xl max-w-90">
                <div className="text-center pt-5 pb-3 space-y-2">
                    <div className="flex items-center gap-x-3 justify-center">
                        <CircleAlert className="text-white" />
                        <h2 className="text-xl text-white font-medium">Log Out</h2>
                    </div>
                    <p>Are you sure you want to log out from this device. See you soon...</p>
                </div>
                <div className="flex pb-3 justify-end items-center gap-x-4">
                    <button onClick={() => setLogOutModal(false)} className="hover:bg-[#999] text-white cursor-pointer px-3 py-1 rounded-lg">Cancel</button>
                    <button onClick={handleLogOut} className="hover:bg-red-100 px-3 py-1 cursor-pointer rounded-lg text-red-500">Logout</button>
                </div>
            </div>
        </div>
        </>
    )
}