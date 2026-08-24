import { Calendar, ChevronRight, Lock, Mail, User } from "lucide-react";

interface PropsType {
    fullName: string,
    email: string,
    createdAt: string
}

export default function DisplayDetails({fullName, email, createdAt}: PropsType) {
    const date = createdAt.split("T")[0];
  return (
    <>
      <div className="h-full min-h-0 bg-[#161b22] rounded-xl py-5 px-7">
        <h2 className="text-2xl font-medium pb-6">User Information</h2>
        <div>
          <ul className="space-y-3">
            <div className="flex border-l-2 border-white items-center gap-x-5 bg-[#31363b] rounded-xl px-6 py-2.5">
              <div className="p-3 rounded-full bg-[#161b22]">
                <User />
              </div>
              <div>
                <h3 className="text font-medium">Full Name</h3>
                <p>{fullName}</p>
              </div>
            </div>

            <div className="flex border-l-2 border-white items-center gap-x-5 bg-[#31363b] rounded-xl px-6 py-2.5">
              <div className="p-3 rounded-full bg-[#161b22]">
                <Mail />
              </div>
              <div>
                <h3 className="text font-medium">Email Address</h3>
                <p>{email}</p>
              </div>
            </div>

            <div className="flex border-l-2 border-white items-center gap-x-5 bg-[#31363b] rounded-xl px-6 py-2.5">
              <div className="p-3 rounded-full bg-[#161b22]">
                <Calendar />
              </div>
              <div>
                <h3 className="text font-medium">Joined On</h3>
                <p>{date}</p>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </>
  );
}
