"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { useSession } from "next-auth/react"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters"),
  abstract: z.string().min(100, "Abstract must be at least 100 characters"),
  keywords: z.string().min(3, "Keywords are required"),
  categoryId: z.string().min(1, "Category is required"),
  content: z.string().min(1000, "Content must be at least 1000 characters"),
  doi: z.string().optional(),
  authors: z
    .array(
      z.object({
        name: z.string().min(2, "Author name is required"),
        email: z.string().email("Valid email is required"),
        institutionId: z.string().min(1, "Institution is required"),
        order: z.number(),
      }),
    )
    .min(1, "At least one author is required"),
  references: z.string().min(10, "References are required"),
})

type FormValues = z.infer<typeof formSchema>

export function SubmissionForm() {
  const { data: session } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const [categories, setCategories] = useState([])
  const [institutions, setInstitutions] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      abstract: "",
      keywords: "",
      categoryId: "",
      content: "",
      doi: "",
      authors: [
        {
          name: session?.user?.name || "",
          email: session?.user?.email || "",
          institutionId: "",
          order: 1,
        },
      ],
      references: "",
    },
  })

  const onSubmit = async (data: FormValues) => {
    if (!session) {
      toast({
        title: "Authentication required",
        description: "Please sign in to submit an article",
        variant: "destructive",
      })
      router.push("/auth/signin?callbackUrl=/submit")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to submit article")
      }

      const result = await response.json()

      toast({
        title: "Submission successful",
        description: "Your article has been submitted for review",
      })

      router.push(`/profile/articles/${result.id}`)
    } catch (error) {
      toast({
        title: "Submission failed",
        description: error instanceof Error ? error.message : "Failed to submit article",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const addAuthor = () => {
    const authors = form.getValues("authors")
    form.setValue("authors", [
      ...authors,
      {
        name: "",
        email: "",
        institutionId: "",
        order: authors.length + 1,
      },
    ])
  }

  const removeAuthor = (index: number) => {
    const authors = form.getValues("authors")
    if (authors.length > 1) {
      const newAuthors = authors.filter((_, i) => i !== index)
      // Update order for remaining authors
      newAuthors.forEach((author, i) => {
        author.order = i + 1
      })
      form.setValue("authors", newAuthors)
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Basic Information</TabsTrigger>
                <TabsTrigger value="authors">Authors</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Article title" {...field} />
                      </FormControl>
                      <FormDescription>The title of your scientific article</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="abstract"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Abstract</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Article abstract" rows={5} {...field} />
                      </FormControl>
                      <FormDescription>A brief summary of your research (100-250 words)</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="keywords"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Keywords</FormLabel>
                      <FormControl>
                        <Input placeholder="Separate keywords with commas" {...field} />
                      </FormControl>
                      <FormDescription>Keywords help others find your article</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category: any) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>The research field of your article</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="doi"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>DOI (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Digital Object Identifier" {...field} />
                      </FormControl>
                      <FormDescription>If your article already has a DOI, enter it here</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value="authors" className="space-y-4 pt-4">
                {form.watch("authors").map((_, index) => (
                  <div key={index} className="space-y-4 rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">Author {index + 1}</h3>
                      {index > 0 && (
                        <Button type="button" variant="outline" size="sm" onClick={() => removeAuthor(index)}>
                          Remove
                        </Button>
                      )}
                    </div>

                    <FormField
                      control={form.control}
                      name={`authors.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Author name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`authors.${index}.email`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Author email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`authors.${index}.institutionId`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Institution</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select an institution" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {institutions.map((institution: any) => (
                                <SelectItem key={institution.id} value={institution.id}>
                                  {institution.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}

                <Button type="button" variant="outline" onClick={addAuthor} className="w-full">
                  Add Author
                </Button>
              </TabsContent>

              <TabsContent value="content" className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Article Content</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Your article content" rows={15} {...field} />
                      </FormControl>
                      <FormDescription>The main content of your article</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="references"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>References</FormLabel>
                      <FormControl>
                        <Textarea placeholder="List your references" rows={5} {...field} />
                      </FormControl>
                      <FormDescription>List all references following the ABNT or APA format</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Article"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

