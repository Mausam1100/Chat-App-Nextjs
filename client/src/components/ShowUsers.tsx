import { useSearchUser, useSelectedUser, useShowChatBoxStore } from "@/store/searchUsers";
import ShowUsersSearch from "./ShowUsersSearch"

interface User {
    id: number,
    fullName: string,
    email: string,
    imageUrl: string | null
}

interface Props {
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    setShowInput?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ShowUsers({setSearch, setShowInput}: Props) {
    const searchUsers = useSearchUser((state) => state.searchUsers)
    const setSearchUsers = useSearchUser((state) => state.setSearchUsers)
    const setSelectedUser = useSelectedUser((state) => state.setSelectedUser)
    const setShowChatBox = useShowChatBoxStore((state) => state.setShowChatBox)

    function handleClick(user: User) {
        setShowChatBox(true)
        setSearch('')
        setSelectedUser(user)
        setSearchUsers([])
        setShowInput && setShowInput(false)
    }
    return (
        <>
            <div className="bg-[#555] rounded-xl">
                {searchUsers.map((user) => (
                    <div onClick={() => handleClick(user)} key={user.email}>
                        <ShowUsersSearch fullName={user.fullName} id={user.id} email={user.email} imageUrl={user.imageUrl}/>
                    </div>
                ))}
            </div>
        </>
    )
}