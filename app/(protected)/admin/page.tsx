import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import UpgradeButton from "@/components/ui/UpgradeButton";

const AdminPage = async () => {
  const session = await auth();

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-white text-white text-xl">
        You are not logged in
      </div>
    );
  }

  if (session.user.role !== "admin") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black to-white text-white text-xl">
        <p>You are not an admin</p>
        <p className="mt-2">Role: {session.user.role}</p>
        <div className="mt-4 flex flex-col gap-4">
          <UpgradeButton role={session.user.role ?? "user"} />
          <Link href="/dashboard">
            <Button className="w-full bg-gradient-to-r from-black to-gray-700 text-white hover:from-gray-700 hover:to-black">
              Ir al Dashboard
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black to-white p-8 text-white">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-center w-full max-w-md">
        <h1 className="text-2xl font-semibold">Admin Panel</h1>
        <p className="mt-2">Welcome, {session.user.name}</p>
        <p className="mt-2">Email: {session.user.email}</p>
        
        <img
          src={session.user.image ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTH7Ef1AWxj1FXo8qUxpn1PE325zPFC0ZZnw&s"}
          alt="Admin Avatar"
          className="mt-4 w-24 h-24 rounded-full border-2 border-white mx-auto"
        />
        
        <p className="mt-2">Role: {session.user.role}</p>
      </div>

      <Link href="/dashboard">
        <Button className="mt-4 bg-gradient-to-r from-gray-700 to-black text-white hover:from-black hover:to-gray-700">
          Ir al Dashboard
        </Button>
      </Link>
    </div>
  );
};

export default AdminPage;
