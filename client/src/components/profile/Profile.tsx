import Image from "next/image"
import User1 from "../../../public/Pavitr Prabhakar.jpg";

export default function Profile() {
    return (
        <>
        <div className="h-full min-h-0 bg-[#161b22] rounded-xl flex justify-center items-center">
            <div>
                <Image className="rounded-full" src={User1} alt="img" height={230} width={230} />
            </div>
            <div>
                
            </div>
        </div>
        </>
    )
}