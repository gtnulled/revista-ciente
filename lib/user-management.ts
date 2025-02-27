import { supabase } from "./supabase"

export async function setUserAsAdmin(userId: string, isAdmin: boolean) {
  try {
    const { data, error } = await supabase.from("users").update({ is_admin: isAdmin }).eq("id", userId)

    if (error) throw error

    console.log(`User ${userId} admin status updated to ${isAdmin}`)
    return data
  } catch (error) {
    console.error("Error updating user admin status:", error)
    throw error
  }
}

