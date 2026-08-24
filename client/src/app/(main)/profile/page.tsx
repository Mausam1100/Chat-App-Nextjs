import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DisplayDetails from "@/components/profile/DisplayDetails";
import Profile from "@/components/profile/Profile";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions)
  return (
    <>
      <div className="h-full max-w-[1600px] mx-auto w-full min-h-0 grid grid-cols-5 text-white bg-[#2d3542] p-3">
        <div className="p-3 min-h-0 col-span-2">
          <Profile id={session?.user?.id ?? null} imageUrl={session?.user?.image ?? null} fullName={session?.user?.name ?? "User"} email={session?.user?.email ?? "Email"} />
        </div>

        <div className="p-3 min-h-0 col-span-3">
          <DisplayDetails fullName={session?.user?.name ?? "User"} email={session?.user?.email ?? "Email"} createdAt={session?.user?.createdAt ?? "0000-00-00"} />
        </div>
      </div>
    </>
  );
}
