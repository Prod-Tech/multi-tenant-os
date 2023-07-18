import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { api } from "@/utils/api";
import { useEffect } from "react";

const OrganizationJoinPage: NextPage = (props) => {
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const getOrgs = api.organization.getAllOrganizations.useQuery();

    useEffect(() => {
        console.log(getOrgs.data);
    }, []);

    if (!isLoaded || !userId) {
        return (<p></p>);
    } else {
        return (
            <>
            <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
                <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
                {CardWithLink("Create Organization", "/organizations/create")}
                {CardWithLink("Join Organization", "/organizations/join")}
                {CardWithLink("My Organizations", "/organizations/list")}
                </div>
            </main>
            </>
        );
    }
};

export default OrganizationJoinPage;

const CardWithLink = (title: string, href: string) => (
    <div className="flex items-center justify-center bg-gray-200">
      <div className="overflow-hidden shadow-lg rounded-lg h-45 w-64 m-auto">
        <div className="bg-gray p-5">
          <div className="flex items-center justify-center mt-1">
            <a href={href} className="text-lg font-semibold bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition-colors duration-300">
              {title}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
