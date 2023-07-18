
import { type NextPage } from "next";

import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { api } from "@/utils/api";
import { useAuth } from "@clerk/nextjs";

const OrganizationSettings: NextPage = () => {
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    
    return (
            <div
                className="flex flex-col space-y-6 bg-gradient-to-b from-[#2e026d] to-[#15162c] dark:bg-gray-800 p-6 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 h-[80vh] items-center justify-center"
            >
                <div className="mb-4 w-full">
                <label
                    className="block text-orange-700 text-sm font-bold mb-2"
                    htmlFor="organizationNotionToken"
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
                    htmlFor="organizationNotionTableId"
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
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline self-stretch"
                type="button"
                >
                Save
                </button>
            </div>
    )
}

export default OrganizationSettings;
