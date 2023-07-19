import { type NextPage, type GetStaticProps, GetServerSidePropsContext, InferGetServerSidePropsType, GetServerSideProps } from "next";
import { api } from "@/utils/api";
import { useAuth } from "@clerk/nextjs";
import { PostList } from "../content/PostList";
import { PostProps } from "@/lib/types";
import { getDatabase } from "@/lib/notion";
import { Client } from "@notionhq/client";
import { useEffect, useState } from "react";

export interface Props {
    posts: PostProps[]
    preview: boolean
  }

const OrganizationContentView: NextPage<Props> = ({ posts = [] }) => {
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    // const notionIntegration = api.notionIntegration.getNotionIntegration.useQuery({organizationId: props.organizationId});

    /*
    useEffect(() => {
        console.log(notionIntegration.data);

        if (notionIntegration.data) {
            if (notionIntegration.data.notionIntegrationToken.length == 0 ||
                notionIntegration.data.notionPostsTableId.length == 0) {
                return;
            }
            const notion = new Client({ auth: notionIntegration.data.notionIntegrationToken });
            // eslint-disable-next-line
            getDatabase(notion, notionIntegration.data.notionPostsTableId).then((posts) => {
                setPosts(posts);
            });
        }
    }, [notionIntegration.data]);
    */
    
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

export const getStaticProps: GetStaticProps = async () => {
    if (process.env.POSTS_TABLE_ID == null) {
      return {
        notFound: true,
      }
    }
    
    const client = new Client({ auth: process.env.NOTION_API_KEY })

    const posts = await getDatabase(client, process.env.POSTS_TABLE_ID)
    
    return {
      props: { posts },
      revalidate: 60, // 15 minutes
    }
}

export default OrganizationContentView;
