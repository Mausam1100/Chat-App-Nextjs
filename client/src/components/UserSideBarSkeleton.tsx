export default function UserSideBarSkeleton() {
  return (
    <>  
        {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className="flex items-center gap-x-3 py-3 px-5">
                <div className="w-9 aspect-square h-9 rounded-full bg-[#444]"></div>
                <div className='flex flex-col gap-y-2 w-full'>
                    <div className="w-28 py-1.5 bg-[#444]"></div>
                    <div className="py-1.5 bg-[#444]"></div>
                </div>
            </div>    
        ))}    
    </>
  );
}