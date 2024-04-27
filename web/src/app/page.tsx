"uae client"
import { UserButton } from "@clerk/nextjs";

export default async function Home() {
  return (
    <div className="h-full w-fll">
      <UserButton afterSignOutUrl="/" />
    </div>
  )
}
