import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { api } from "@/utils/api";
import { useAuth } from "@clerk/nextjs";

const OrganizationJoinPage: NextPage = () => {
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const createOrg = api.organization.createOrganization.useMutation();

    const handleCreate = async () => {
      const orgName = (document.getElementById("organizationName") as HTMLInputElement).value
      if (!userId) {
        return;
      }
      await createOrg.mutateAsync({ ownerUserId: userId, name: orgName });
    }

    if (!isLoaded || !userId) {
        return (
            <p></p>
        );
    } else {
        return (
            <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
            <div className="flex items-center justify-center bg-gray-200">
              <form className="w-full max-w-sm bg-gray rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="organization"
                  >
                    Organization Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="organizationName"
                    type="text"
                    placeholder="Organization Name"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    // eslint-disable-next-line
                    onClick={handleCreate}
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
            </main>
          );
    }
};

export default OrganizationJoinPage;
