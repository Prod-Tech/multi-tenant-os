import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { api } from "@/utils/api";

const Home: NextPage = () => {
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
        <div>
            <br/>
            <Link href="/sign-up">
                Sign up
            </Link>
            <Link href="/sign-in">
                Log in
            </Link>
        </div>
      </main>
    </>
  );
};

export default Home;

