import Link from "@/components/content/Link"
import { PostProps } from "@/lib/types"
import dayjs from "dayjs"
import React, { useMemo } from "react"
import { Divider } from "./Divider"
import { NotionText } from "./NotionText"
import { PostCategory } from "./PostCategory"

export interface Props {
  post: PostProps
  organizationId: string
}

const PostItem: React.FC<Props> = ({ post, organizationId }) => {
  const formattedDate = useMemo(
    () =>
      dayjs(new Date((post.properties.Date.date ?? { start: new Date()}).start)).format("MMM D, YYYY"),
    [(post.properties.Date.date ?? { start: new Date()}).start]
  )

  const author = post.properties.Authors.people[0]
  const authorExists = author != null && author.name != null
  const category = post.properties.Category.select?.name

  return (
    <Link
      href={`/organizations/posts/${organizationId}:${post.id}`}
      className="flex flex-col border-b bg-gradient group"
    >
      {category != null && <PostCategory category={category} />}

      <div className="flex-grow">
        <h4 className="font-bold text-lg mt-2 mb-1 group-hover:opacity-60 tracking-tight">
          <NotionText text={post.properties.Page.title} noLinks />
        </h4>

        <p className="text-base text-gray-800 line-clamp-2">
          <NotionText text={post.properties.Description.rich_text} noLinks />
        </p>
      </div>

      <div className="flex items-center gap-3 mt-6 mb-10">
        {authorExists && (
          <>
            <span className="font-medium text-sm text-gray-500">
              {author.name ?? ""}
            </span>
            <Divider />
          </>
        )}
        <span className="font-medium text-sm text-gray-500">
          {formattedDate}
        </span>
      </div>
    </Link>
  )
}

export default PostItem
