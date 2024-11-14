import jwt from "jsonwebtoken";

export function generateToken(user: { id: string; username: string }) {
  return jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET!,
    {
      expiresIn: "24h",
    }
  );
}
