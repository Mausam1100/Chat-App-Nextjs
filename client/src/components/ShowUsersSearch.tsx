import User1 from '../../public/Pavitr Prabhakar.jpg'
import Image from 'next/image'

interface UserType {
    fullName: string,
    email: string
}

export default function ShowUsersSearch({fullName}: UserType) {
    return (
        <>
            <div className='flex hover:bg-[#777] cursor-pointer items-center border-b border-[#555] pt-2 px-5 pb-2 rounded-xl'>
                <div>
                    <Image className='rounded-full' src={User1} alt='user1' height={36} width={36} />
                </div>
                <div className='pl-3'>
                    <h4 className='text-sm'>{fullName}</h4>
                    {/* <p className='text-xs font-extralight'>{email}</p> */}
                </div>
            </div>
        </>
    )
}