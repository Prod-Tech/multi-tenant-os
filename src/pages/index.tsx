import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { api } from "@/utils/api";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const { userId, isLoaded } = useAuth();
  const router = useRouter()

  if (userId && isLoaded) {
    // eslint-disable-next-line
    router.push("/organizations");
    return (<></>)
  } else {
    return (
      <>
        <Head>
          <title>Startup OS</title>
        </Head>
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
            <h1 className="text-center text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
              Startup <span className="text-[hsl(280,100%,70%)]">OS</span>
            </h1>
            <div className="flex flex-col items-center gap-2">
            </div>
          </div>
          <div className="flex flex-col items-center justify-center space-y-4 py-8 px-6 bg-white border-2 border-gray-200 rounded-lg shadow-lg">
            <Link href="/sign-up" className="w-full text-center text-xl font-semibold text-white bg-blue-500 hover:bg-blue-600 py-2 rounded transition-colors">
                Sign up
            </Link>
            <Link href="/sign-in" className="w-full text-center text-xl font-semibold text-white bg-blue-500 hover:bg-blue-600 py-2 rounded transition-colors">
                Log in
            </Link>
        </div>
        </main>
      </>
    );
  }
};

export default Home;

