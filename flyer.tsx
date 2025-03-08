"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Clock, MapPin, Phone, Mail, Download } from "lucide-react"
import html2canvas from "html2canvas"

export default function Flyer() {
  const [flyerData, setFlyerData] = useState({
    title: "Company Event",
    subtitle: "Annual Conference 2025",
    description:
      "Join us for a day of networking, learning, and inspiration. Our annual conference brings together industry leaders and innovators to share insights and best practices.",
    date: "June 15, 2025",
    time: "9:00 AM - 5:00 PM",
    location: "Grand Conference Center, 123 Business Ave, New York, NY",
    contact: "events@company.com",
    phone: "(555) 123-4567",
    bgColor: "#f8fafc",
    accentColor: "#2563eb",
  })

  const flyerRef = useRef<HTMLDivElement>(null)
  const [isEditing, setIsEditing] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFlyerData((prev) => ({ ...prev, [name]: value }))
  }

  const downloadFlyer = async () => {
    if (!flyerRef.current) return

    try {
      const canvas = await html2canvas(flyerRef.current, {
        scale: 2,
        backgroundColor: flyerData.bgColor,
        logging: false,
      })

      const image = canvas.toDataURL("image/png")
      const link = document.createElement("a")
      link.href = image
      link.download = "company-flyer.png"
      link.click()
    } catch (error) {
      console.error("Error generating flyer:", error)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col gap-8 max-w-4xl mx-auto">
        {isEditing ? (
          <Card className="p-6 space-y-4">
            <h2 className="text-2xl font-bold">Edit Flyer Content</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Title
                </label>
                <Input id="title" name="title" value={flyerData.title} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <label htmlFor="subtitle" className="text-sm font-medium">
                  Subtitle
                </label>
                <Input id="subtitle" name="subtitle" value={flyerData.subtitle} onChange={handleChange} />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <Textarea
                  id="description"
                  name="description"
                  value={flyerData.description}
                  onChange={handleChange}
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="date" className="text-sm font-medium">
                  Date
                </label>
                <Input id="date" name="date" value={flyerData.date} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <label htmlFor="time" className="text-sm font-medium">
                  Time
                </label>
                <Input id="time" name="time" value={flyerData.time} onChange={handleChange} />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <label htmlFor="location" className="text-sm font-medium">
                  Location
                </label>
                <Input id="location" name="location" value={flyerData.location} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <label htmlFor="contact" className="text-sm font-medium">
                  Email
                </label>
                <Input id="contact" name="contact" value={flyerData.contact} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  Phone
                </label>
                <Input id="phone" name="phone" value={flyerData.phone} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <label htmlFor="bgColor" className="text-sm font-medium">
                  Background Color
                </label>
                <div className="flex gap-2">
                  <Input id="bgColor" name="bgColor" value={flyerData.bgColor} onChange={handleChange} />
                  <input
                    type="color"
                    value={flyerData.bgColor}
                    onChange={(e) => setFlyerData((prev) => ({ ...prev, bgColor: e.target.value }))}
                    className="w-10 h-10 p-1 rounded border"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="accentColor" className="text-sm font-medium">
                  Accent Color
                </label>
                <div className="flex gap-2">
                  <Input id="accentColor" name="accentColor" value={flyerData.accentColor} onChange={handleChange} />
                  <input
                    type="color"
                    value={flyerData.accentColor}
                    onChange={(e) => setFlyerData((prev) => ({ ...prev, accentColor: e.target.value }))}
                    className="w-10 h-10 p-1 rounded border"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Preview Flyer
              </Button>
            </div>
          </Card>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Flyer Preview</h2>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsEditing(true)}>
                  Edit Content
                </Button>
                <Button onClick={downloadFlyer}>
                  <Download className="mr-2 h-4 w-4" /> Download Flyer
                </Button>
              </div>
            </div>

            <div
              ref={flyerRef}
              className="border rounded-lg overflow-hidden shadow-lg"
              style={{ backgroundColor: flyerData.bgColor }}
            >
              <div className="relative">
                <div className="aspect-[3/2] bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
                  <img
                    src="/placeholder.svg?height=400&width=600"
                    alt="Event banner"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="text-center p-6">
                      <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{flyerData.title}</h1>
                      <p className="text-xl md:text-2xl text-white">{flyerData.subtitle}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8 space-y-6">
                <div className="prose max-w-none">
                  <p className="text-lg">{flyerData.description}</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 mt-0.5" style={{ color: flyerData.accentColor }} />
                    <div>
                      <h3 className="font-medium">Date</h3>
                      <p>{flyerData.date}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 mt-0.5" style={{ color: flyerData.accentColor }} />
                    <div>
                      <h3 className="font-medium">Time</h3>
                      <p>{flyerData.time}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 md:col-span-2">
                    <MapPin className="h-5 w-5 mt-0.5" style={{ color: flyerData.accentColor }} />
                    <div>
                      <h3 className="font-medium">Location</h3>
                      <p>{flyerData.location}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-semibold text-lg mb-3">Contact Information</h3>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" style={{ color: flyerData.accentColor }} />
                      <span>{flyerData.contact}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" style={{ color: flyerData.accentColor }} />
                      <span>{flyerData.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center pt-4">
                  <div className="h-16 w-40 bg-gray-200 rounded flex items-center justify-center">
                    <span className="text-gray-500">Company Logo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

