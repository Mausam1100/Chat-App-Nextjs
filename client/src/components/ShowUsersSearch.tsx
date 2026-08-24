import Image from 'next/image'
import DefaultProfilePic from './DefaultProfilePic'

interface UserType {
    id: number,
    fullName: string,
    email: string,
    imageUrl: string | null
}

export default function ShowUsersSearch({fullName, imageUrl, id}: UserType) {
    return (
        <>
            <div className='flex hover:bg-[#777] cursor-pointer items-center border-b border-[#555] pt-2 px-5 pb-2 rounded-xl'>
                <div>
                    <div className="w-9 h-9 rounded-full aspect-square">
                              {imageUrl? (<Image
                                className="rounded-full aspect-square object-cover"
                                src={imageUrl}
                                alt="user1"
                                height={36}
                                width={36}
                              />): 
                              (
                                <DefaultProfilePic id={id} fullName={fullName}  size="verySmall" />
                              )}
                            </div>
                </div>
                <div className='pl-3'>
                    <h4 className='text-sm'>{fullName}</h4>
                    {/* <p className='text-xs font-extralight'>{email}</p> */}
                </div>
            </div>
        </>
    )
}