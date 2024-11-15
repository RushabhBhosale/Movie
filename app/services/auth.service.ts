import { LoginInputState, SignupInputState } from "@/schema/userSchema";
import axiosClient from "@/utils/axiosClient";
import { errorResponse } from "@/utils/response";

export const loginUser = async (
  input: LoginInputState
): Promise<{ token: string } | undefined | null> => {
  try {
    const res = await axiosClient.post("/login", input);

    if (res.data && res.data.data && res.data.data.token) {
      return { token: res.data.data.token }; // Correctly access the token
    }

    return null; // If no token is returned, return null
  } catch (error: any) {
    errorResponse({
      status: error.response?.status || 500,
      message: error.response?.data?.message || "Server error",
    });
  }
};

export const registerUser = async (
  input: SignupInputState
): Promise<{ username: string; email: string } | null | undefined> => {
  try {
    const res = await axiosClient.post("/register", input);

    if (
      res.data &&
      res.data.data &&
      res.data.data.username &&
      res.data.data.email
    ) {
      return { username: res.data.data.username, email: res.data.data.email }; // Correctly access the username and email
    }

    return null; // If no username or email is returned, return null
  } catch (error: any) {
    errorResponse({
      status: error.response?.status || 500,
      message: error.response?.data?.message || "Server error",
    });
  }
};
