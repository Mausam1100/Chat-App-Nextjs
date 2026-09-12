import { Calendar, Mail, User } from "lucide-react";

interface PropsType {
    fullName: string,
    email: string,
    createdAt: string
}

export default function DisplayDetails({fullName, email, createdAt}: PropsType) {
    const date = createdAt.split("T")[0];
  return (
    <>
      <div className="h-full min-h-0 bg-[#161b22] rounded-xl py-4 sm:py-5 px-5 sm:px-7">
        <h2 className="text-lg sm:text-2xl font-medium pb-3 sm:pb-6">User Information</h2>
        <div>
          <ul className="space-y-3">
            <div className="flex border-l-2 border-white items-center gap-x-5 bg-[#31363b] rounded-xl px-4 sm:px-6 py-1.5">
              <div className="sm:p-3 p-2 rounded-full bg-[#161b22]">
                <User />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-medium">Full Name</h3>
                <p className="text-xs sm:text-base">{fullName}</p>
              </div>
            </div>

            <div className="flex border-l-2 border-white items-center gap-x-5 bg-[#31363b] rounded-xl px-4 sm:px-6 py-1.5">
              <div className="sm:p-3 p-2 rounded-full bg-[#161b22]">
                <Mail />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-medium">Email Address</h3>
                <p className="text-xs sm:text-base break-all">{email}</p>
              </div>
            </div>

            <div className="flex border-l-2 border-white items-center gap-x-5 bg-[#31363b] rounded-xl px-4 sm:px-6 py-1.5">
              <div className="sm:p-3 p-2 rounded-full bg-[#161b22]">
                <Calendar />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-medium">Joined On</h3>
                <p className="text-xs sm:text-base">{date}</p>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </>
  );
}
