import connectDB from "@/lib/db";
import User, { IUser } from "@/models/user";
import { errorResponse, successResponse } from "@/utils/response";
import bcrypt from "bcryptjs";

export async function POST(req: Request, res: Response) {
  await connectDB();

  try {
    // Parse the request body only once
    const { username, email, password } = (await req.json()) as IUser;

    // Validate required fields
    if (!username || !email || !password) {
      return errorResponse({
        status: 400,
        message: "Invalid username, email, or password",
      });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse({
        status: 400,
        message: "Email already exists",
      });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user: IUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return successResponse({
      status: 201,
      message: "User created successfully",
      body: { username: user.username, email: user.email },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return errorResponse({
      status: 500,
      message: "Server error",
    });
  }
}
