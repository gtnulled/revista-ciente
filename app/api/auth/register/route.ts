import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import bcrypt from "bcrypt"

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 400 })
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create the user
    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
    })
  } catch (error) {
    console.error("Error registering user:", error)
    return NextResponse.json({ error: "An error occurred while registering" }, { status: 500 })
  }
}

