
import { type NextPage } from "next";

import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { api } from "@/utils/api";
import { useAuth } from "@clerk/nextjs";

type OrganizationSettingsProps = {
    organizationId: string;
};

const OrganizationSettings: NextPage<OrganizationSettingsProps> = (props) => {
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const createNotionIntegration = api.notionIntegration.createNotionIntegration.useMutation();

    const handleSubmit = async () => {
        const orgNotionToken = (document.getElementById("organizationNotionToken") as HTMLInputElement).value
        const orgNotionPostsTableId = (document.getElementById("organizationNotionTableId") as HTMLInputElement).value
        await createNotionIntegration.mutateAsync({
            organizationId: props.organizationId,
            notionIntegrationToken: orgNotionToken,
            notionPostsTableId: orgNotionPostsTableId
        })
    }

    if (!isLoaded || !userId) {
        return (
            <p></p>
        )
    } else {
        return (
                <div
                    className="flex w-full flex-col space-y-6 bg-gradient-to-b from-[#2e026d] to-[#15162c] dark:bg-gray-800 p-6 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 h-[80vh] items-center justify-center"
                >
                    <div className="mb-4 w-full">
                    <label
                        className="block text-orange-700 text-sm font-bold mb-2"
                        htmlFor="organizationNotionTokenLabel"
                    >
                        Organization Notion API Token
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="organizationNotionToken"
                        type="text"
                        placeholder="secret_XYZ"
                    />
                    </div>
                    <div className="mb-4 w-full">
                    <label
                        className="block text-orange-700 text-sm font-bold mb-2"
                        htmlFor="organizationNotionTableIdLabel"
                    >
                        Notion Content Table ID
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="organizationNotionTableId"
                        type="text"
                        placeholder="abc123"
                    />
                    </div>
                    <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    // eslint-disable-next-line
                    onClick={handleSubmit}
                    >
                    Save
                    </button>
                </div>
        )
    }
}

export default OrganizationSettings;
