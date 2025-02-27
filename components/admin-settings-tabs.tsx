"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

interface SiteSettings {
  siteName: string
  siteDescription: string
  logoUrl: string
  faviconUrl: string
  primaryColor: string
  secondaryColor: string
  footerText: string
  contactEmail: string
  socialLinks: {
    facebook: string
    twitter: string
    instagram: string
    linkedin: string
    github: string
  }
}

export function AdminSettingsTabs() {
  const { toast } = useToast()
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: "",
    siteDescription: "",
    logoUrl: "",
    faviconUrl: "",
    primaryColor: "",
    secondaryColor: "",
    footerText: "",
    contactEmail: "",
    socialLinks: {
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: "",
      github: "",
    },
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setSettings({
            siteName: data.siteName || "",
            siteDescription: data.siteDescription || "",
            logoUrl: data.logoUrl || "",
            faviconUrl: data.faviconUrl || "",
            primaryColor: data.primaryColor || "",
            secondaryColor: data.secondaryColor || "",
            footerText: data.footerText || "",
            contactEmail: data.contactEmail || "",
            socialLinks: data.socialLinks || {
              facebook: "",
              twitter: "",
              instagram: "",
              linkedin: "",
              github: "",
            },
          })
        }
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error fetching settings:", err)
        setLoading(false)
      })
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name.startsWith("socialLinks.")) {
      const socialKey = name.split(".")[1]
      setSettings((prev) => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [socialKey]: value,
        },
      }))
    } else {
      setSettings((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const saveSettings = async () => {
    setSaving(true)

    try {
      const response = await fetch("/api/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      })

      if (response.ok) {
        toast({
          title: "Settings saved",
          description: "Your site settings have been updated successfully.",
        })
      } else {
        const error = await response.json()
        throw new Error(error.message || "Failed to save settings")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save settings",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  return (
    <Tabs defaultValue="general">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="appearance">Appearance</TabsTrigger>
        <TabsTrigger value="footer">Footer</TabsTrigger>
        <TabsTrigger value="social">Social Media</TabsTrigger>
      </TabsList>

      <TabsContent value="general">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Manage your site's basic information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">Site Name</Label>
              <Input id="siteName" name="siteName" value={settings.siteName} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="siteDescription">Site Description</Label>
              <Textarea
                id="siteDescription"
                name="siteDescription"
                value={settings.siteDescription}
                onChange={handleChange}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input
                id="contactEmail"
                name="contactEmail"
                type="email"
                value={settings.contactEmail}
                onChange={handleChange}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={saveSettings} disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="appearance">
        <Card>
          <CardHeader>
            <CardTitle>Appearance Settings</CardTitle>
            <CardDescription>Customize your site's look and feel.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="logoUrl">Logo URL</Label>
              <Input
                id="logoUrl"
                name="logoUrl"
                value={settings.logoUrl}
                onChange={handleChange}
                placeholder="https://example.com/logo.png"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="faviconUrl">Favicon URL</Label>
              <Input
                id="faviconUrl"
                name="faviconUrl"
                value={settings.faviconUrl}
                onChange={handleChange}
                placeholder="https://example.com/favicon.ico"
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="primaryColor">Primary Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="primaryColor"
                    name="primaryColor"
                    type="color"
                    value={settings.primaryColor}
                    onChange={handleChange}
                    className="w-12"
                  />
                  <Input
                    value={settings.primaryColor}
                    onChange={handleChange}
                    name="primaryColor"
                    placeholder="#000000"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="secondaryColor">Secondary Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="secondaryColor"
                    name="secondaryColor"
                    type="color"
                    value={settings.secondaryColor}
                    onChange={handleChange}
                    className="w-12"
                  />
                  <Input
                    value={settings.secondaryColor}
                    onChange={handleChange}
                    name="secondaryColor"
                    placeholder="#000000"
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={saveSettings} disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="footer">
        <Card>
          <CardHeader>
            <CardTitle>Footer Settings</CardTitle>
            <CardDescription>Customize your site's footer content.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="footerText">Footer Text</Label>
              <Textarea
                id="footerText"
                name="footerText"
                value={settings.footerText}
                onChange={handleChange}
                rows={3}
                placeholder="© 2024 Scientific Publication Platform. All rights reserved."
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={saveSettings} disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="social">
        <Card>
          <CardHeader>
            <CardTitle>Social Media Links</CardTitle>
            <CardDescription>Connect your social media accounts.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="facebook">Facebook</Label>
              <Input
                id="facebook"
                name="socialLinks.facebook"
                value={settings.socialLinks.facebook}
                onChange={handleChange}
                placeholder="https://facebook.com/yourpage"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="twitter">Twitter</Label>
              <Input
                id="twitter"
                name="socialLinks.twitter"
                value={settings.socialLinks.twitter}
                onChange={handleChange}
                placeholder="https://twitter.com/yourhandle"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram</Label>
              <Input
                id="instagram"
                name="socialLinks.instagram"
                value={settings.socialLinks.instagram}
                onChange={handleChange}
                placeholder="https://instagram.com/yourprofile"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                name="socialLinks.linkedin"
                value={settings.socialLinks.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/company/yourcompany"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="github">GitHub</Label>
              <Input
                id="github"
                name="socialLinks.github"
                value={settings.socialLinks.github}
                onChange={handleChange}
                placeholder="https://github.com/yourorganization"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={saveSettings} disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

