/* eslint-disable @typescript-eslint/ban-ts-comment */

import { Block } from "@notionhq/client/build/src/api-types"
import { getMediaProperties } from "@/lib/notion"
import { Code } from "@/components/content/Code"
import { NotionHeading } from "@/components/content/NotionHeading"
import { NotionImage } from "@/components/content/NotionImage"
import { NotionText } from "@/components/content/NotionText"
interface Props {
  block: Block
}

export const RenderBlock: React.FC<Props> = ({ block }) => {
  const { type } = block
  const value = block[type]

  /**
   * I don't like this but if we do multiple line breaks (enter key) in Notion,
   * the API returns them as empty arrays and they go in the UI as a paragraph
   * with no content but margin bottom of 32px
   *
   * The check below filters such items
   */
  if (value.text != null && value.text.length === 0) {
    return null
  }

  switch (type) {
    case "paragraph": {
      return (
        <p className="leading-8 mb-6 text-gray-800">
          <NotionText text={value.text} />
        </p>
      )
    }
    case "heading_1":
    case "heading_2":
    case "heading_3": {
      return <NotionHeading type={type} text={value.text} />
    }
    case "callout": {
      return (
        <div className="flex w-full p-4 my-8 rounded border border-transparent bg-blue-100">
          {value.icon.emoji && (
            <div className="text-yellow-500">{value.icon.emoji}</div>
          )}
          <div className="ml-4 text-foreground">
            <NotionText text={value.text} />
          </div>
        </div>
      )
    }
    case "bulleted_list_item":
      return (
        <li className="mb-2">
          <NotionText text={value.text} />
        </li>
      )
    case "numbered_list_item": {
      return (
        <li className="mb-2">
          <NotionText text={value.text} />
        </li>
      )
    }
    case "image": {
      const { source, caption } = getMediaProperties(value)
      return (
        <div className="flex flex-col my-8">
          <NotionImage src={source} alt={caption} blockId={block.id} />
          {caption && <p className="text-gray-600 mt-3 text-sm">{caption}</p>}
        </div>
      )
    }
    case "video": {
      const { source, caption } = getMediaProperties(value)
      return (
        <div className="flex flex-col my-8 space-y-2">
          <video
            src={source}
            controls
            autoPlay
            loop
            muted
            className="rounded-lg"
          />
          {caption && <p className="text-gray-500 text-sm">{caption}</p>}
        </div>
      )
    }
    case "pdf": {
      const { source, caption } = getMediaProperties(value);
      return (
        <div className="flex flex-col my-8 space-y-2">
          <object data={source} type="application/pdf" width="100%" height="800px">
            <p>PDF cannot be displayed</p>
          </object>
          {caption && <p className="text-gray-500 text-sm">{caption}</p>}
        </div>
      )
    }
    case "audio": 
    case "file": {
      const { source, caption } = getMediaProperties(value);
      return (
        <div className="flex flex-col my-8 space-y-2">
          <a href={source} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Link</a>
          {caption && <p className="text-gray-500 text-sm">{caption}</p>}
        </div>
      )
    }
    default: {
      return null
      // return (
      //   <p>
      //     ❌ Unsupported block{" "}
      //     {type === "unsupported" ? "unsupported by Notion API" : type})
      //   </p>
      // )
    }
  }
}
