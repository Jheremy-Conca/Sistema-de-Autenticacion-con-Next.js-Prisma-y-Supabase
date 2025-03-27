"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import FormLogin from "@/components/form-login";

const LoginPage = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <LoginContent />
    </Suspense>
  );
};

const LoginContent = () => {
  const searchParams = useSearchParams();
  const isVerified = searchParams.get("verified") === "true";
  const OAuthAccountNotLinked = searchParams.get("error") === "OAuthAccountNotLinked";

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center bg-gradient-to-b from-black to-white">
      <FormLogin isVerified={isVerified} OAuthAccountNotLinked={OAuthAccountNotLinked} />
    </div>
  );
};

export default LoginPage;
