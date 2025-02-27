import { supabase } from "./supabase"

export const db = {
  article: {
    findMany: async ({ where, skip, take, include, orderBy }: any) => {
      let query = supabase.from("articles").select("*")

      if (where) {
        Object.entries(where).forEach(([key, value]) => {
          query = query.eq(key, value)
        })
      }

      if (skip) query = query.range(skip, skip + (take || 10) - 1)
      if (orderBy) query = query.order(orderBy.field, { ascending: orderBy.direction === "asc" })

      const { data, error } = await query
      if (error) throw error
      return data
    },
    findUnique: async ({ where }: any) => {
      const { data, error } = await supabase.from("articles").select("*").eq("id", where.id).single()
      if (error) throw error
      return data
    },
    create: async ({ data }: any) => {
      const { data: newArticle, error } = await supabase.from("articles").insert(data).single()
      if (error) throw error
      return newArticle
    },
    update: async ({ where, data }: any) => {
      const { data: updatedArticle, error } = await supabase.from("articles").update(data).eq("id", where.id).single()
      if (error) throw error
      return updatedArticle
    },
    delete: async ({ where }: any) => {
      const { data, error } = await supabase.from("articles").delete().eq("id", where.id).single()
      if (error) throw error
      return data
    },
    count: async ({ where }: any) => {
      let query = supabase.from("articles").select("*", { count: "exact", head: true })

      if (where) {
        Object.entries(where).forEach(([key, value]) => {
          query = query.eq(key, value)
        })
      }

      const { count, error } = await query
      if (error) throw error
      return count || 0
    },
  },
  // Implemente métodos similares para outras entidades (category, tag, institution, user, review, settings)
}

