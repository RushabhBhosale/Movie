import jwt from "jsonwebtoken";

export interface TokenPayload {
  id: string;
  username: string;
}

export function generateToken(user: TokenPayload) {
  return jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET!, // Ensure this secret is the same in both places
    { expiresIn: "24h" }
  );
}

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
    console.log("Decoded token:", decoded); // Should contain the id and username
    return decoded;
  } catch (error) {
    console.error("Error verifying token:", error); // Log the specific error
    return null;
  }
};
