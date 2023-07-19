import { PostProps } from "@/lib/types"
import dayjs from "dayjs"
import React, { useMemo } from "react"
import { Divider } from "./Divider"
import { NotionText } from "./NotionText"
import { PostCategory } from "./PostCategory"
import Link from "./Link"
import Image from "next/image"

export const FeaturedPostItem: React.FC<{ post: PostProps }> = ({ post }) => {
  const formattedDate = useMemo(
    () =>
      dayjs(new Date((post.properties.Date.date ?? { start: new Date()}).start)).format("MMM D, YYYY"),
    [(post.properties.Date.date ?? { start: new Date()}).start]
  )

  const author = post.properties.Authors.people[0]
  const category = post.properties.Category.select?.name
  const featuredImage = post.properties.FeaturedImage.url

  return (
    <Link
  href={`/organizations/posts/${post.id}`}
  className="group flex flex-col border-b transition-colors bg-gradient-to-r from-blue-400 via-purple-500 to-red-500 hover:bg-gray-50 rounded-lg shadow-lg overflow-hidden p-5"
>
  {featuredImage != null ? (
    <div className="w-full aspect-[2.25/1] relative border border-black border-opacity-10 rounded-xl overflow-hidden">
      <Image
        src={featuredImage}
        fill
        priority
        alt={post.properties.Page.title[0] ? post.properties.Page.title[0].plain_text : ""}
        className="object-cover transition-transform group-hover:scale-[1.05]"
      />
    </div>
  ) : (
    // <div className="w-full aspect-[2/1] bg-gray-100 rounded-xl" />
    <></>
  )}

  <div className="mt-6 text-white">
    {category != null && <PostCategory category={category} />}

    <h3 className="font-bold text-2xl my-4 group-hover:opacity-60 tracking-tight">
      <NotionText text={post.properties.Page.title} noLinks />
    </h3>

    <p className="text-lg line-clamp-2">
      <NotionText text={post.properties.Description.rich_text} noLinks />
    </p>

    <div className="flex items-center gap-3 mt-6">
      <span className="font-medium text-sm">
        {author ? author.name : ""}
      </span>
      <span className="font-medium text-sm">
        {formattedDate}
      </span>
    </div>
  </div>
</Link>
  )
}
