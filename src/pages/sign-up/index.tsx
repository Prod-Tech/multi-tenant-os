import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
    <SignUp path="/sign-up" signInUrl="/sign-in" redirectUrl="/organizations"/>
    </main>
  )
}