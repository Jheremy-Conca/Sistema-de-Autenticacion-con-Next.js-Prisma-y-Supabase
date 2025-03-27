import { loginSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { loginAction } from "@/actions/auth-action";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

interface FormLoginProps {
  isVerified: boolean;
  OAuthAccountNotLinked: boolean;
}

const FormLogin = ({ isVerified, OAuthAccountNotLinked }: FormLoginProps) => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setError(null);
    startTransition(async () => {
      const response = await loginAction(values);
      if (response.error) {
        setError(response.error);
      } else {
        router.push("/dashboard");
      }
    });
  }

  return (
    <div className="max-w-md mx-auto bg-gradient-to-b from-gray-900 to-black p-8 rounded-2xl shadow-lg text-white">
      <h1 className="mb-5 text-center text-2xl font-semibold">Login</h1>
      {isVerified && (
        <p className="text-center text-green-400 mb-5 text-sm">
          Email verified, you can now login
        </p>
      )}
      {OAuthAccountNotLinked && (
        <p className="text-center text-red-400 mb-5 text-sm">
          To confirm your identity, sign in with the same account you used
          originally.
        </p>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="bg-gray-800 border-gray-600 text-white"
                    placeholder="email"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    className="bg-gray-800 border-gray-600 text-white"
                    placeholder="password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <div className="flex flex-col space-y-3">
            <Button
              type="submit"
              disabled={isPending}
              className="bg-white text-black hover:bg-gray-300"
            >
              Submit
            </Button>

            <Button
              type="button"
              onClick={() => router.push("/register")}
              className="bg-gray-700 text-white hover:bg-gray-600"
            >
              Register
            </Button>
          </div>
        </form>
      </Form>

    </div>
  );
};

export default FormLogin;
