import NextImage from "next/image"
import { useState } from "react"

export const NotionImage: React.FC<{
  src: string
  alt: string
  blockId: string
}> = ({ src, alt, blockId }) => {
  const [imageSrc, setImageSrc] = useState(src)

  return (
    <div className="imageContainer w-full">
      <img
        src={imageSrc}
        alt={alt}
        // layout="fill"
        // objectFit="cover"
        // objectPosition="center"
        className="nextImage p-0 rounded overflow-hidden"
        // eslint-disable-next-line
        onError={async () => {
          // eslint-disable-next-line
          const res = await fetch(`/api/image?blockId=${blockId}`).then((res) =>
            res.json()
          )
          // eslint-disable-next-line
          setImageSrc(res.imageSrc)
        }}
      />
    </div>
  )
}
