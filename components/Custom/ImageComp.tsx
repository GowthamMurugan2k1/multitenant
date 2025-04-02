import { ImageProps } from "@/types/Commontypes";
import Image from "next/image";

function ImageComp({
  src,
  width = 100,
  height =100,
  alt,
  isFill = false,
  className,
  ...props
}: ImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={isFill ? 0 : width }
      height={ isFill ? 0 : height }
      fill={isFill}
      className={className}
      {...props}
    />
  );
}

export default ImageComp;
