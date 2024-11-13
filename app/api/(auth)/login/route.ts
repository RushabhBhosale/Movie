import connectDB from "@/lib/db";
import User, { LoginInterface } from "@/models/user";
import { errorResponse, successResponse } from "@/utils/response";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  await connectDB();

  try {
    const body = await req.json();
    const { username, password }: LoginInterface = body;

    if (!username || !password) {
      return errorResponse({
        status: 400,
        message: "Please fill all required fields",
      });
    }

    const user = await User.findOne({
      username,
    });

    if (!user) {
      return errorResponse({
        status: 400,
        message: "User not found",
      });
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      return errorResponse({
        status: 401,
        message: "Invalid password",
      });
    }

    return successResponse({
      status: 200,
      message: "Login successfully",
    });
  } catch (error) {
    console.error("Error logging user:", error);
    return errorResponse({
      status: 500,
      message: "Server error",
    });
  }
}
