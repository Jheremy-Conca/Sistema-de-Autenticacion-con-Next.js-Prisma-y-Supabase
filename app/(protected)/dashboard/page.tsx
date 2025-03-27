import { auth } from "@/auth";
import LogoutButton from "@/components/logout-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    return <div>Not authenticated</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black to-white p-8 text-white">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-semibold">Welcome, {session.user.name}</h1>
        <p className="mt-2">Email: {session.user.email}</p>
        <div className="flex justify-center mt-4">
          <img
            src={
              session.user.image
                ? session.user.image
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqVg_URh9Mvrm3NYaTlCUyiM7r382ohELc1g&s"
            }
            width={96}
            height={96}
            className="mt-4 rounded-full border-2 border-white"
            alt="User Avatar"
          />
        </div>
        <p className="mt-2">Role: {session.user.role}</p>
        <p className="mt-2 text-sm">
          Session expires on: {new Date(session.expires).toLocaleString()}
        </p>
      </div>
      <div className="mt-4 flex gap-4">
        <Link href="/admin">
          <Button className="text-blue-400 hover:underline">Admin</Button>
        </Link>
        <LogoutButton />
      </div>
    </div>
  );
}
