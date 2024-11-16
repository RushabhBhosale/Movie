"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/store/authStore";
import {
  authService,
  RegisterInput,
  registerSchema,
} from "@/services/auth.service";
import { Button } from "@/components/ui/button";

const Register = () => {
  const { isLoading } = useAuthStore(); // If you decide to use Zustand for shared state

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    try {
      // Example register service call
      await authService.register(data);
      alert("Account created successfully. You can now login.");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-800 p-6 rounded-md shadow-md w-full max-w-md"
      >
        <h1 className="text-3xl font-semibold text-gray-100 mb-6 text-center">
          Register
        </h1>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-300 mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            className="w-full bg-gray-700 border border-gray-600 rounded p-3 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username"
            {...register("username")}
          />
          {errors.username && (
            <p className="text-red-400 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-300 mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full bg-gray-700 border border-gray-600 rounded p-3 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-6">
          <label
            className="block text-sm font-medium text-gray-300 mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full bg-gray-700 border border-gray-600 rounded p-3 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-400 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
          disabled={isLoading}
        >
          {isLoading ? "Registering..." : "Register"}
        </Button>
      </form>
    </div>
  );
};

export default Register;
