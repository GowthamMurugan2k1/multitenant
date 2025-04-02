import { Avatar, AvatarImage } from "../ui/avatar";

function AvatarCircle({
  viewCount,
  avatars,
}: {
  viewCount: number;
  avatars: { imageUrl: string; profileUrl: string }[];
}) {
  return (
    <div className="flex w-fit  -space-x-2 ">
      {avatars.slice(0, viewCount ?? avatars.length).map((item, i) => (
        <Avatar>
          <AvatarImage
            src={item.imageUrl}
            alt="@shadcn"
            className={"border-2 border-white rounded-full"}
            style={{ zIndex: i + 1 }}
          />
        </Avatar>
      ))}
      <div
        className="w-8 h-8 bg-white rounded-full flex justify-center items-center text-sm font-semibold"
        style={{ zIndex: avatars?.length }}
      >
        {avatars.slice(0, viewCount ?? avatars.length).length}+
      </div>
    </div>
  );
}

export default AvatarCircle;
