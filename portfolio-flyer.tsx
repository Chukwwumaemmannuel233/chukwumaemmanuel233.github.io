"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Download, Phone, Mail, MapPin, Instagram, Moon, Sun, Github, Twitter, ExternalLink } from "lucide-react"
import html2canvas from "html2canvas"
import { QRCodeSVG } from "qrcode.react"

export default function PortfolioFlyer() {
  const [flyerData, setFlyerData] = useState({
    name: "Ugwu Chukwuma Emmanuel",
    title: "Front-End Developer",
    bio: "Passionate Front-End Developer with expertise in creating responsive, user-centric web applications. Specializing in React and TypeScript, I combine technical excellence with an eye for design to deliver exceptional digital experiences.",
    services: [
      "Modern Frontend Development (React, TypeScript)",
      "Responsive Web Design & Implementation",
      "UI/UX Development with Tailwind CSS",
      "Web Application Architecture & Optimization",
      "Version Control & Collaborative Development",
    ],
    phone: "+234 816 177 0490",
    email: "echukwuma561@gmail.com",
    location: "Enugu, Nigeria",
    instagram: "emmanuel23670",
    twitter: "CEmmanuel25543",
    github: "github.com/Chukwwumaemmannuel233",
    cta: "Ready to bring your web project to life? Let's create something extraordinary together!",
  })

  const [darkMode, setDarkMode] = useState(false)
  const flyerRef = useRef<HTMLDivElement>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [imageFiles, setImageFiles] = useState({
    profile: null as File | null,
    work1: null as File | null,
    work2: null as File | null,
    work3: null as File | null,
  })
  const [imagePreviews, setImagePreviews] = useState({
    profile: "",
    work1: "",
    work2: "",
    work3: "",
  })

  // For project preview modal
  const [selectedProject, setSelectedProject] = useState<number | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFlyerData((prev) => ({ ...prev, [name]: value }))
  }

  const handleServiceChange = (index: number, value: string) => {
    const updatedServices = [...flyerData.services]
    updatedServices[index] = value
    setFlyerData((prev) => ({ ...prev, services: updatedServices }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: keyof typeof imageFiles) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImageFiles((prev) => ({ ...prev, [type]: file }))

      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setImagePreviews((prev) => ({ ...prev, [type]: event.target?.result as string }))
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const downloadFlyer = async () => {
    if (!flyerRef.current) return

    try {
      const canvas = await html2canvas(flyerRef.current, {
        scale: 3, // Increase scale for better quality
        logging: false,
        backgroundColor: darkMode ? "#1a1a1a" : "#ffffff",
        useCORS: true, // Enable CORS for images
      })

      const image = canvas.toDataURL("image/png", 1.0) // Use maximum quality
      const link = document.createElement("a")
      link.href = image
      link.download = `${flyerData.name.replace(/\s+/g, "-").toLowerCase()}-portfolio.png`
      link.click()
    } catch (error) {
      console.error("Error generating flyer:", error)
    }
  }

  const projectImages = [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/localhost_3000_-268t4U7vl5qfidb3aSrwqMQdiLH4sW.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/localhost_3001_-iEak6nlNGH5XKpkj6kUxMdX4E5LdAB.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-09%20at%2020-55-01%20Vite%20React-dmaqvSX52BwO6kc7dGT5cIf7prghSD.png",
  ]

  const projectTitles = [
    "SecureMatch - Dating Platform UI",
    "GreenLife - Eco E-commerce",
    "CoinShares - Crypto Dashboard",
  ]

  // GitHub profile URL for QR codes
  const githubProfileUrl = `https://${flyerData.github}`

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col gap-8 max-w-5xl mx-auto">
        {isEditing ? (
          <Card className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Edit Portfolio Flyer</h2>
              <div className="flex items-center gap-2">
                <Sun className="h-4 w-4" />
                <Switch checked={darkMode} onCheckedChange={setDarkMode} id="dark-mode" />
                <Moon className="h-4 w-4" />
              </div>
            </div>

            <div className="grid gap-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Full Name
                  </label>
                  <Input id="name" name="name" value={flyerData.name} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Professional Title
                  </label>
                  <Input id="title" name="title" value={flyerData.title} onChange={handleChange} />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="bio" className="text-sm font-medium">
                  Professional Bio
                </label>
                <Textarea id="bio" name="bio" value={flyerData.bio} onChange={handleChange} rows={3} />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium">Services Offered</label>
                {flyerData.services.map((service, index) => (
                  <Input
                    key={index}
                    value={service}
                    onChange={(e) => handleServiceChange(index, e.target.value)}
                    placeholder={`Service ${index + 1}`}
                  />
                ))}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Phone
                  </label>
                  <Input id="phone" name="phone" value={flyerData.phone} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input id="email" name="email" value={flyerData.email} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="location" className="text-sm font-medium">
                    Location
                  </label>
                  <Input id="location" name="location" value={flyerData.location} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="instagram" className="text-sm font-medium">
                    Instagram
                  </label>
                  <Input id="instagram" name="instagram" value={flyerData.instagram} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="twitter" className="text-sm font-medium">
                    Twitter
                  </label>
                  <Input id="twitter" name="twitter" value={flyerData.twitter} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="github" className="text-sm font-medium">
                    GitHub
                  </label>
                  <Input id="github" name="github" value={flyerData.github} onChange={handleChange} />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="cta" className="text-sm font-medium">
                  Call to Action
                </label>
                <Input id="cta" name="cta" value={flyerData.cta} onChange={handleChange} />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Your Photo</label>
                  <Input type="file" accept="image/*" onChange={(e) => handleImageChange(e, "profile")} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Work Sample 1</label>
                  <Input type="file" accept="image/*" onChange={(e) => handleImageChange(e, "work1")} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Work Sample 2</label>
                  <Input type="file" accept="image/*" onChange={(e) => handleImageChange(e, "work2")} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Work Sample 3</label>
                  <Input type="file" accept="image/*" onChange={(e) => handleImageChange(e, "work3")} />
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
              <h2 className="text-2xl font-bold">Portfolio Flyer Preview</h2>
              <div className="flex gap-2 items-center">
                <div className="flex items-center gap-2 mr-4">
                  <Sun className="h-4 w-4" />
                  <Switch checked={darkMode} onCheckedChange={setDarkMode} id="dark-mode-preview" />
                  <Moon className="h-4 w-4" />
                </div>
                {/* <Button variant="outline" onClick={() => setIsEditing(true)}>
                  Edit Content
                </Button> */}
                <Button onClick={downloadFlyer}>
                  <Download className="mr-2 h-4 w-4" /> Download
                </Button>
              </div>
            </div>

            <div
              ref={flyerRef}
              className={`border rounded-lg overflow-hidden shadow-lg ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
              style={{ width: "100%", maxWidth: "800px", margin: "0 auto" }}
            >
              {/* Decorative header */}
              <div className="h-10 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500"></div>

              <div className="grid md:grid-cols-3 gap-6 p-6 relative">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl"></div>

                {/* Left Column - Profile */}
                <div className="space-y-6 relative">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-36 h-36 rounded-full overflow-hidden mb-4 border-4 border-blue-600 relative z-10 shadow-lg">
                      <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20240707-WA0020.jpg-348qhUn22gjHlSbGRoqukh4lP1u6Ic.jpeg"
                        alt="Ugwu Chukwuma Emmanuel"
                        className="w-full h-full object-cover"
                        crossOrigin="anonymous"
                      />
                      {/* Decorative ring */}
                      <div className="absolute inset-0 border-4 border-purple-400 rounded-full scale-110 opacity-50"></div>
                    </div>

                    <h1 className="text-2xl font-bold relative z-10 mb-1">{flyerData.name}</h1>
                    <div className="relative">
                      <p className="text-lg font-medium text-blue-600 relative z-10">{flyerData.title}</p>
                      <div className="absolute -bottom-1 left-0 right-0 h-3 bg-blue-500/20 -skew-y-1 -z-0"></div>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div
                      className={`p-4 rounded-lg ${darkMode ? "bg-gray-800/80" : "bg-gray-50"} border-l-4 border-blue-500 shadow-md`}
                    >
                      <p className="text-base leading-relaxed">{flyerData.bio}</p>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-semibold border-b pb-2 flex items-center text-base">
                        <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                        Contact Information
                      </h3>
                      <div className="space-y-3 text-base pl-2">
                        <div className="flex items-center gap-2">
                          <div className="flex-shrink-0 flex items-center justify-center">
                            <Phone className="h-5 w-5 text-blue-500" />
                          </div>
                          <span>{flyerData.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-shrink-0 flex items-center justify-center">
                            <Mail className="h-5 w-5 text-blue-500" />
                          </div>
                          <span>{flyerData.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-shrink-0 flex items-center justify-center">
                            <MapPin className="h-5 w-5 text-blue-500" />
                          </div>
                          <span>{flyerData.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-semibold border-b pb-2 flex items-center text-base">
                        <span className="inline-block w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                        Social Media
                      </h3>
                      <div className="space-y-3 text-base pl-2">
                        <div className="flex items-center gap-2">
                          <div className="flex-shrink-0 flex items-center justify-center">
                            <Instagram className="h-5 w-5 text-purple-500" />
                          </div>
                          <span>@{flyerData.instagram}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-shrink-0 flex items-center justify-center">
                            <Twitter className="h-5 w-5 text-blue-400" />
                          </div>
                          <span>@{flyerData.twitter}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-shrink-0 flex items-center justify-center">
                            <Github className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                          </div>
                          <span>{flyerData.github.replace("github.com/", "")}</span>
                        </div>
                      </div>
                    </div>

                    {/* GitHub QR Code */}
                    <div className="flex flex-col items-center pt-2">
                      <p className="text-sm font-medium mb-2">Scan to view my GitHub</p>
                      <div className={`p-2 rounded-lg ${darkMode ? "bg-white" : "bg-white"}`}>
                        <QRCodeSVG
                          value={githubProfileUrl}
                          size={100}
                          bgColor={"#ffffff"}
                          fgColor={"#000000"}
                          level={"L"}
                          includeMargin={false}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Work & Services */}
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h2 className="text-xl font-bold mb-4 pb-2 border-b flex items-center">
                      <div className="w-6 h-6 rounded bg-gradient-to-br from-blue-500 to-purple-600 mr-2 flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      Featured Projects
                    </h2>

                    <div className="mb-2 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-sm">
                      <p className="flex items-center gap-1">
                        <ExternalLink className="h-4 w-4" />
                        <span>
                          View all projects at:{" "}
                          <a
                            href={githubProfileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 dark:text-blue-400 underline"
                          >
                            {githubProfileUrl}
                          </a>
                        </span>
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[0, 1, 2].map((index) => (
                        <div
                          key={index}
                          className="group relative aspect-video rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-md cursor-pointer"
                          onClick={() => setSelectedProject(index)}
                        >
                          <img
                            src={projectImages[index] || "/placeholder.svg"}
                            alt={projectTitles[index]}
                            className="w-full h-full object-cover"
                            crossOrigin="anonymous"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end justify-center p-3">
                            <div className="text-white text-center">
                              <p className="text-sm font-medium">{projectTitles[index]}</p>
                              <p className="text-xs mt-1 opacity-80">View at: myportfolio.com</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-bold mb-4 pb-2 border-b flex items-center">
                      <div className="w-6 h-6 rounded bg-gradient-to-br from-blue-500 to-purple-600 mr-2 flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      Technical Expertise
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div
                        className={`p-4 rounded-lg ${darkMode ? "bg-gray-800/80" : "bg-gray-50"} border-l-4 border-blue-500 shadow-md`}
                      >
                        <h3 className="font-semibold mb-2 text-blue-600 text-base">Core Technologies</h3>
                        <ul className="space-y-1 text-base">
                          <li className="flex items-center">
                            <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2 flex-shrink-0"></span>
                            <span>HTML5, CSS3, JavaScript (ES6+)</span>
                          </li>
                          <li className="flex items-center">
                            <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2 flex-shrink-0"></span>
                            <span>React.js & TypeScript</span>
                          </li>
                          <li className="flex items-center">
                            <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2 flex-shrink-0"></span>
                            <span>Tailwind CSS</span>
                          </li>
                        </ul>
                      </div>
                      <div
                        className={`p-4 rounded-lg ${darkMode ? "bg-gray-800/80" : "bg-gray-50"} border-l-4 border-purple-500 shadow-md`}
                      >
                        <h3 className="font-semibold mb-2 text-purple-600 text-base">Development Tools</h3>
                        <ul className="space-y-1 text-base">
                          <li className="flex items-center">
                            <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mr-2 flex-shrink-0"></span>
                            <span>Git & GitHub</span>
                          </li>
                          <li className="flex items-center">
                            <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mr-2 flex-shrink-0"></span>
                            <span>Scrum & Jira</span>
                          </li>
                          <li className="flex items-center">
                            <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mr-2 flex-shrink-0"></span>
                            <span>UI/UX Development</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`mt-4 p-5 rounded-lg text-center relative overflow-hidden ${darkMode ? "bg-gradient-to-r from-blue-900/30 to-purple-900/30" : "bg-gradient-to-r from-blue-50 to-purple-50"} shadow-md`}
                  >
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/20 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-12 h-12 bg-purple-500/20 rounded-full translate-y-1/2 -translate-x-1/2"></div>

                    <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2 relative z-10">
                      {flyerData.cta}
                    </h3>
                    <div className="flex flex-col sm:flex-row justify-center gap-3 mt-3 relative z-10">
                      <div className="flex items-center gap-2">
                        <div className="flex-shrink-0 flex items-center justify-center">
                          <Mail className="h-5 w-5 text-blue-600" />
                        </div>
                        <span className="font-medium text-base">{flyerData.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-shrink-0 flex items-center justify-center">
                          <Github className="h-5 w-5 text-purple-600" />
                        </div>
                        <a
                          href={githubProfileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-base hover:text-purple-600"
                        >
                          {flyerData.github}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`py-4 px-6 text-center ${darkMode ? "bg-blue-900/30" : "bg-blue-50"} border-t border-blue-200 dark:border-blue-800`}
              >
                <p className="font-bold text-base mb-1">View Interactive Portfolio:</p>
                <p className="text-lg font-mono bg-white dark:bg-gray-800 py-2 px-4 rounded-md inline-block border border-blue-300 dark:border-blue-700">
                  myportfolio.com
                </p>
                <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
                  Visit the URL above to see my interactive portfolio with project demos
                </p>
              </div>
              <div
                className={`py-3 px-8 text-center text-sm ${darkMode ? "bg-gradient-to-r from-blue-900/50 to-purple-900/50" : "bg-gradient-to-r from-blue-50 to-purple-50"}`}
              >
                <p className="font-medium">
                  © {new Date().getFullYear()} {flyerData.name} | Professional {flyerData.title}
                </p>
              </div>
            </div>

            {/* Project Preview Modal */}
            {selectedProject !== null && (
              <div
                className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
                onClick={() => setSelectedProject(null)}
              >
                <div
                  className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-4 border-b flex justify-between items-center">
                    <h3 className="font-bold text-lg">{projectTitles[selectedProject]}</h3>
                    <button
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      onClick={() => setSelectedProject(null)}
                    >
                      ✕
                    </button>
                  </div>
                  <div className="overflow-auto flex-1 p-2">
                    <img
                      src={projectImages[selectedProject] || "/placeholder.svg"}
                      alt={projectTitles[selectedProject]}
                      className="w-full h-auto object-contain"
                      crossOrigin="anonymous"
                    />
                  </div>
                  <div className="p-4 border-t">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Note: This preview is only available in the web interface. When you download the flyer as an
                      image, viewers will need to scan the QR code or visit your GitHub to see the full projects.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

