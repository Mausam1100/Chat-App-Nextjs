interface PropsType {
    id: number,
    fullName: string,
    size?: "verySmall" | "small" | "medium" | "large"
}

export default function DefaultProfilePic({id, fullName, size="medium"}: PropsType) {
    const avatarColors = [
        "bg-red-500",
        "bg-blue-500",
        "bg-green-500",
        "bg-purple-500",
        "bg-orange-500",
      ];

    const textSize = {
      verySmall: "text-base",
      small: "text-xl",
      medium: "text-7xl",
      large: "text-8xl"
    }
    
      const avatarColor = avatarColors[id! % avatarColors.length];
  return (
    <>
      <div className={`flex h-full w-full aspect-square items-center justify-center rounded-full ${avatarColor}`}>
        <span className={`${textSize[size]} font-semibold text-white`}>
          {fullName.charAt(0).toUpperCase()}
        </span>
      </div>
    </>
  );
}
