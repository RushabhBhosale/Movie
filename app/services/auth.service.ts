import { LoginInputState, SignupInputState } from "@/schema/userSchema";
import axiosClient from "@/utils/axiosClient";

export const loginUser = async (input: LoginInputState) => {
  return await axiosClient.post("/login", input);
};

export const registerUser = async (input: SignupInputState) => {
  return await axiosClient.post("/register", input);
};
