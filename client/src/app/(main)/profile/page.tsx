import DisplayDetails from "@/components/profile/DisplayDetails";
import Profile from "@/components/profile/Profile";

export default function Home() {
  return (
    <>
      <div className="h-full min-h-0 w-screen grid grid-cols-5 text-white bg-[#2d3542] p-3">
        <div className="p-3 min-h-0 col-span-2">
          <Profile />
        </div>

        <div className="p-3 min-h-0 col-span-3">
          <DisplayDetails />
        </div>
      </div>
    </>
  );
}
