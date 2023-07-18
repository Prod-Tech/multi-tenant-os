import { createServerSideHelpers } from '@trpc/react-query/server';
import { appRouter } from '@/server/api/root';
import { type NextPage, type GetStaticProps, GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { api } from "@/utils/api";
import { useAuth } from "@clerk/nextjs";
import { PostList } from "../content/PostList";
import { PostProps } from "@/lib/types";
import { getDatabase } from "@/lib/notion";
import { Client } from "@notionhq/client";
import { useEffect, useState } from "react";
import superjson from 'superjson';
import { createTRPCContext } from '@/server/api/trpc';

export interface Props {
    organizationId: string
    preview: boolean
}

const OrganizationContentView: NextPage<Props> = (props: Props) => {
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const notionIntegration = api.notionIntegration.getNotionIntegration.useQuery({organizationId: props.organizationId});
    const [posts, setPosts] = useState<PostProps[]>([]);

    useEffect(() => {
        console.log(notionIntegration.data);

        if (notionIntegration.data) {
            const notion = new Client({ auth: notionIntegration.data.notionIntegrationToken });
            const posts = getDatabase(notion, notionIntegration.data.notionPostsTableId).then((posts) => {
                setPosts(posts);
            });
        }
    }, [notionIntegration.data]);

    if (!isLoaded || !userId) {
        return (
            <p></p>
        )
    } else {
        return (
            <PostList posts={posts} showCustomerStories />
        )
    }
}

/*
export const getServerSideProps = async (
    context: GetServerSidePropsContext<{organizationId: string}>
) => {
    const helpers = createServerSideHelpers({
        router: appRouter,
        ctx: {},
        transformer: superjson,
    });

    if (process.env.POSTS_TABLE_ID == null) {
      return {
        notFound: true,
      }
    }
  
    const posts = await getDatabase(process.env.POSTS_TABLE_ID)
  
    generateRssFeed(posts)
  
    return {
      props: {
        trpcState: helpers.dehydrate(),
        posts
      },
    }
  }
*/
export default OrganizationContentView;
