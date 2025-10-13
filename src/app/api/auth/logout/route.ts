import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json(
    { message: "Sesión cerrada correctamente" },
    { status: 200 }
  );
  response.cookies.set("Auth_SAM", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  return response;
}