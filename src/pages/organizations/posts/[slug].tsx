import { Block } from "@notionhq/client/build/src/api-types"
import { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from "next"
import ErrorPage from "next/error"
import { useRouter } from "next/router"
import { Fragment, useMemo } from "react"

import { PostPage } from "@/layouts/PostPage"
import {
  getDatabase,
  groupListBlocks,
  mapDatabaseItemToPageProps,
  mapDatabaseToPaths,
} from "@/lib/notion"
import { ListBlock, PostProps } from "@/lib/types"

import { RenderBlock } from "@/components/content/RenderBlock"
import { NotionListBlock } from "@/components/content/ListBlock"
import { Client } from "@notionhq/client"

export interface Props {
  page: PostProps
  relatedPosts: PostProps[]
  blocks: Block[]
}

const Post: NextPage<Props> = ({ page, relatedPosts, ...props }) => {
  const router = useRouter()

  // Group all list items together so we can group in a <ul />
  const blocks = useMemo(() => groupListBlocks(props.blocks), [props.blocks])

  if (!router.isFallback && page == null) {
    return <ErrorPage statusCode={404} />
  }

  if (router.isFallback) {
    return <p></p>
  }

  return (
    <PostPage post={page} relatedPosts={relatedPosts}>
      {blocks.map((block) => {
        if ((block as ListBlock).items != null) {
          return <NotionListBlock key={block.id} block={block as ListBlock} />
        }

        return (
          <Fragment key={block.id}>
            <RenderBlock block={block as Block} />
          </Fragment>
        )
      })}
    </PostPage>
  )
}

interface NotionIntegrationInfo {
    id: string;
    organizationId: string;
    notionIntegrationToken: string;
    notionPostsTableId: string;
}


export const getServerSideProps: GetServerSideProps<{ page: PostProps, blocks: Block[] }> = async (ctx) => {
    const slug = ctx.query.slug as string;

    const orgId = slug.split(":")[0];
    const postId = slug.split(":")[1];

    // eslint-disable-next-line
    const res = await fetch(`${process.env.SSR_HELPER_BASE_URL}/notionIntegration/${orgId}`);
    // eslint-disable-next-line
    const data: NotionIntegrationInfo = (await res.json());

    if (!data || !orgId || !postId) {
      return {
        notFound: true,
      }
    }
    
    const client = new Client({ auth: data.notionIntegrationToken});

    const props = await mapDatabaseItemToPageProps(client, postId);

    return {
        props
    }
}

/*
export const getStaticPaths: GetStaticPaths = async (ctx) => {
  console.log("getStaticPathsCtx: ", ctx)

  if (process.env.POSTS_TABLE_ID == null) {
    return {
      paths: [],
      fallback: true,
    }
  }

  const client = new Client({ auth: process.env.NOTION_API_KEY })

  const posts = await getDatabase(client, process.env.POSTS_TABLE_ID, {
    includeUnpublished: true,
  })

  const paths = mapDatabaseToPaths(posts)

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  console.log("getStaticPropsContext: ", ctx)
  if (process.env.POSTS_TABLE_ID == null) {
    return {
      notFound: true,
    }
  }

  const { params } = ctx
  if (params == null) {
    return {
      notFound: true,
    }
  }

  const client = new Client({ auth: process.env.NOTION_API_KEY })

  const posts = await getDatabase(client, process.env.POSTS_TABLE_ID, {
    includeUnpublished: true,
  })
  const slug = params.slug as string

  const post = posts.find((post) => {
    if (!post.id) {
      return false
    }
    return post.id === slug
  })

  const category = post?.properties.Category?.select?.name
  const relatedPosts = (
    category != null
      ? posts.filter(
          (post) =>
            post.id !== slug &&
            post.properties.Category?.select?.name === category &&
            post.properties.Published?.checkbox === true
        )
      : []
  ).slice(0, 2)

  if (post == null) {
    return {
      notFound: true,
    }
  }

  const props = await mapDatabaseItemToPageProps(client, post.id)

  return {
    props: {
      ...props,
      relatedPosts,
    },
    revalidate: 1,
  }
}
*/
export default Post