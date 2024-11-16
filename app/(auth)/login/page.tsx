"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, FormEvent, ChangeEvent } from "react";
import {
  userLoginSchema,
  userSignUpSchema,
  LoginInputState,
  SignupInputState,
} from "@/schema/userSchema";
import { loginUser, registerUser } from "@/app/services/auth.service";
import { saveToken } from "@/utils/token";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";
import { ResponseInterface } from "@/types/responseTypes";

export default function AuthTabs() {
  const router = useRouter();
  const { setToken } = useAuthStore();
  const [loginInput, setLoginInput] = useState<LoginInputState>({
    username: "",
    password: "",
  });
  const [signupInput, setSignupInput] = useState<SignupInputState>({
    username: "",
    email: "",
    password: "",
  });
  const [loginErrors, setLoginErrors] = useState<Partial<LoginInputState>>({});
  const [signupErrors, setSignupErrors] = useState<Partial<SignupInputState>>(
    {}
  );

  // Handle input change for both forms
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    form: "login" | "signup"
  ) => {
    const { name, value } = e.target;
    if (form === "login") {
      setLoginInput({ ...loginInput, [name]: value });
    } else {
      setSignupInput({ ...signupInput, [name]: value });
    }
  };

  // Handle login form submission with validation
  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = userLoginSchema.safeParse(loginInput);
    if (!result.success) {
      setLoginErrors(
        result.error.formErrors.fieldErrors as Partial<LoginInputState>
      );
    } else {
      setLoginErrors({});
      try {
        const res: any = await loginUser(loginInput);
        if (res && res.data.success) {
          setToken(res.data?.data?.token);
          toast.success(res.data.message);
          router.push("/home");
        }
      } catch (error: any) {
        toast.error(error.response.data?.message || "Failed to login");
      }
    }
  };

  // Handle sign-up form submission with validation
  const handleSignupSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = userSignUpSchema.safeParse(signupInput);
    if (!result.success) {
      setSignupErrors(
        result.error.formErrors.fieldErrors as Partial<SignupInputState>
      );
    } else {
      setSignupErrors({});
      try {
        const res = await registerUser(signupInput);
        router.push("/home");
        toast.success(res.data.message);
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <Tabs defaultValue="login" className="w-full max-w-md mx-auto">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
      </TabsList>

      {/* Login Tab */}
      <TabsContent value="login">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLoginSubmit}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Username</Label>
                  <Input
                    type="text"
                    name="username"
                    value={loginInput.username}
                    onChange={(e) => handleInputChange(e, "login")}
                  />
                  {loginErrors.username && (
                    <p className="text-red-500 text-sm">
                      {loginErrors.username}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    value={loginInput.password}
                    onChange={(e) => handleInputChange(e, "login")}
                  />
                  {loginErrors.password && (
                    <p className="text-red-500 text-sm">
                      {loginErrors.password}
                    </p>
                  )}
                </div>
              </div>
              <CardFooter className="mt-4">
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Sign Up Tab */}
      <TabsContent value="signup">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignupSubmit}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    type="text"
                    name="username"
                    value={signupInput.username}
                    onChange={(e) => handleInputChange(e, "signup")}
                  />
                  {signupErrors.username && (
                    <p className="text-red-500 text-sm">
                      {signupErrors.username}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    value={signupInput.email}
                    onChange={(e) => handleInputChange(e, "signup")}
                  />
                  {signupErrors.email && (
                    <p className="text-red-500 text-sm">{signupErrors.email}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    value={signupInput.password}
                    onChange={(e) => handleInputChange(e, "signup")}
                  />
                  {signupErrors.password && (
                    <p className="text-red-500 text-sm">
                      {signupErrors.password}
                    </p>
                  )}
                </div>
              </div>
              <CardFooter className="mt-4">
                <Button type="submit" className="w-full">
                  Sign Up
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
