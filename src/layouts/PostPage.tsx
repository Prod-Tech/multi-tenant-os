import { NotionText } from "@/components/content/NotionText"
import Page from "@/layouts/Page"
import { PostProps } from "@/lib/types"
import dayjs from "dayjs"
import React, { useMemo } from "react"
import { Divider } from "../components/content/Divider"

export interface Props {
  post: PostProps
  relatedPosts: PostProps[]
  children?: React.ReactNode
}

export const PostPage: React.FC<Props> = ({ post, relatedPosts, children }) => {
  const formattedDate = useMemo(
    () => dayjs((post.properties.Date.date ?? { start: "" }).start).format("MMM D, YYYY"),
    [(post.properties.Date.date ?? { start: "" }).start]
  )

  const author = post.properties.Authors.people[0]
  const authorExists = author != null && author.name != null

  const category = post.properties.Category?.select?.name

  return (
    <Page>
      <div className="mt-10 mb-5 px-5 md:px-8 mx-auto">
          <div className="flex items-center text-gray-500 space-x-3">
            {authorExists && (
              <>
                <div className="flex items-center space-x-3">
                  <img
                    src={author?.avatar_url}
                    // eslint-disable-next-line
                    alt={`Avatar of ${author?.name}`}
                    className="w-6 h-6 rounded-full overflow-hidden"
                  />
                  <span>{author?.name}</span>
                </div>
                <Divider />
              </>
            )}
          </div>

          <header className="mt-5 mb-16 max-w-[800px] mx-auto">
            <h1 className="text-5xl text-center font-bold">
              <NotionText text={post.properties.Page.title} />
            </h1>
            <></>
            <div className="space-x-3 my-5 text-center text-gray-500">
            <time dateTime={(post.properties.Date.date ?? { start: "" }).start}>
              {formattedDate}
            </time>
            </div>
          </header>

          <section className="max-w-[736px] mx-auto text-base sm:text-lg leading-8">
            {children}
          </section>
      </div>
    </Page>
  )
}