import {
    FileWithCaption,
    ExternalFileWithCaption,
    Block,
  } from "@notionhq/client/build/src/api-types"
  import { Client } from "@notionhq/client"
  import { ListBlock, PostProps } from "@/lib/types"

  /**
   * Get Notion database
   * @param databaseId ID of the collection to query
   * @returns A list of published posts from the collection
   */
  export const getDatabase = async (
    notion: Client,
    databaseId: string,
    { includeUnpublished }: { includeUnpublished: boolean } = {
      includeUnpublished: false,
    }
  ) => {

    const response = await notion.databases.query({
      database_id: databaseId,
    })
  
    const results = response.results as unknown as PostProps[]
  
    return results
      .filter(
        (r) =>
          r.properties.Date.date != null &&
          r.properties.Description.rich_text.length > 0 &&
          r.properties.Slug.rich_text.length > 0 &&
          r.properties.Page.title.length > 0 &&
          r.properties.Authors.people.length > 0 &&
          (includeUnpublished || r.properties.Published.checkbox)
      )
      .sort((a, b) => {
        const aDate = a.properties.Date.date;
        const bDate = b.properties.Date.date;

        if (aDate === null || bDate === null) {
            return 0;
        }

        const dateA = new Date(aDate.start)
        const dateB = new Date(bDate.start)
  
        return dateB.getTime() - dateA.getTime()
      })
  }
  
  export const getPage = async (notion: Client, pageId: string) => {

    const response = await notion.pages.retrieve({ page_id: pageId })
  
    return response as unknown as PostProps
  }
  
  export const getBlocks = async (notion: Client, blockId: string) => {

    const response = await notion.blocks.children.list({
      block_id: blockId,
      page_size: 100,
    })
  
    return response.results
  }
  
  export const mapDatabaseToPaths = (database: PostProps[]) => {
    return database.map((item) => {
        const slug = item.properties.Slug.rich_text[0];
        if (slug === undefined) {
            return { params: { slug: "" } }
        }
        return { params: { slug: slug.plain_text } }
    })
  }
  
  export const mapDatabaseItemToPageProps = async (notionApiToken: string, id: string) => {
    const notion = new Client({
        auth: notionApiToken,
    })

    const page = await getPage(notion, id)
    const blocks = await getBlocks(notion, id)
  
    const childBlocks = await Promise.all(
      blocks
        .filter((block) => block.has_children)
        .map(async (block) => {
          return {
            id: block.id,
            children: await getBlocks(notion, block.id),
          }
        })
    )
  
    const blocksWithChildren = blocks.map((block) => {
      // eslint-disable-next-line
      if (block.has_children && !block[block.type].children) {
        // eslint-disable-next-line
        block[block.type]["children"] = childBlocks.find(
          (childBlock) => (childBlock.id = block.id)
        )?.children
      }
  
      return block
    })
  
    return { page, blocks: blocksWithChildren }
  }
  
  export const getMediaProperties = (
    value: FileWithCaption | ExternalFileWithCaption
  ) => {
    const source = value.type === "external" ? value.external.url : value.file.url
    const caption = value.caption && value.caption.length > 0 ? value.caption[0]!.plain_text : ""
  
    return { source, caption }
  }
  
  export const getBlogLink = (slug: string) => {
    return `/p/${slug}`
  }
  
  export const getChangelogImageSrc = async (notionApiToken: string, blockId: string) => {
    const notion = new Client({
        auth: notionApiToken,
    })

    const supportedBlockType = "image"
    const block = await notion.blocks.retrieve({ block_id: blockId })
  
    if (block.type !== supportedBlockType) {
      throw new Error("Block is not an image")
    }
    // @ts-ignore
    const image = block[supportedBlockType] as
      | FileWithCaption
      | ExternalFileWithCaption
  
    if (image.type === "external") {
      return image.external.url
    }
  
    return image.file.url
  }
  
  export const groupListBlocks = (blocks: Block[]): (Block | ListBlock)[] => {
    const updatedBlocks: Array<Block | ListBlock> = []
    let currList: ListBlock | null = null
  
    for (const b of blocks ?? []) {
      if (b.type === "bulleted_list_item" || b.type === "numbered_list_item") {
        if (currList == null) {
          currList = {
            id: b.id,
            type: b.type === "bulleted_list_item" ? "ul" : "ol",
            items: [],
          }
        }
  
        currList.items.push(b)
      } else {
        if (currList != null) {
          updatedBlocks.push(currList)
          currList = null
        }
  
        updatedBlocks.push(b)
      }
    }
  
    return updatedBlocks
  }
  