
import { type NextPage, type GetStaticProps } from "next";
import { api } from "@/utils/api";
import { useAuth } from "@clerk/nextjs";
import { PostList } from "../content/PostList";
import { PostProps } from "@/lib/types";
import { getDatabase } from "@/lib/notion";
import { Client } from "@notionhq/client";
import { useEffect, useState } from "react";

export interface Props {
    organizationId: string
    preview: boolean
}

const OrganizationContentView: NextPage<Props> = ({ organizationId }) => {
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const notionIntegration = api.notionIntegration.getNotionIntegration.useQuery({organizationId: organizationId});
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

export default OrganizationContentView;
