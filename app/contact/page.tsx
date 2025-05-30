"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, HelpCircle, Briefcase } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Send us an email and we'll respond within 24 hours",
    contact: "hello@blogspace.com",
    action: "mailto:hello@blogspace.com",
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak directly with our support team",
    contact: "+1 (555) 123-4567",
    action: "tel:+15551234567",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    description: "Come visit our headquarters",
    contact: "123 Blog Street, San Francisco, CA 94102",
    action: "https://maps.google.com",
  },
  {
    icon: Clock,
    title: "Business Hours",
    description: "Monday to Friday",
    contact: "9:00 AM - 6:00 PM PST",
    action: null,
  },
]

const faqItems = [
  {
    question: "How do I start writing on BlogSpace?",
    answer:
      "Simply create an account, complete your profile, and click the 'Write' button to start creating your first post. Our editor is user-friendly and supports rich text formatting.",
  },
  {
    question: "Is BlogSpace free to use?",
    answer:
      "Yes! BlogSpace is completely free for writers and readers. We offer premium features for advanced users, but the core platform is always free.",
  },
  {
    question: "Can I monetize my content?",
    answer:
      "We support various monetization options including tips, subscriptions, and sponsored content. Check our monetization guide for more details.",
  },
  {
    question: "How do I get more readers?",
    answer:
      "Focus on quality content, use relevant tags, engage with the community, and share your posts on social media. Our algorithm also promotes engaging content.",
  },
  {
    question: "What types of content are allowed?",
    answer:
      "We welcome all types of constructive content including tutorials, personal stories, business insights, creative writing, and more. Please review our community guidelines.",
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: "", email: "", subject: "", category: "", message: "" })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Have questions, feedback, or need support? We're here to help and would love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <Card
                key={index}
                className="text-center border-0 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <info.icon className="w-8 h-8 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2 text-gray-900">{info.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{info.description}</p>
                  {info.action ? (
                    <a href={info.action} className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                      {info.contact}
                    </a>
                  ) : (
                    <p className="text-blue-600 font-medium text-sm">{info.contact}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & FAQ */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl">Send us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <Alert className="mb-6">
                      <Send className="h-4 w-4" />
                      <AlertDescription>
                        Thank you for your message! We'll get back to you within 24 hours.
                      </AlertDescription>
                    </Alert>
                  ) : null}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="support">Technical Support</SelectItem>
                          <SelectItem value="business">Business Partnership</SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                          <SelectItem value="bug">Bug Report</SelectItem>
                          <SelectItem value="feature">Feature Request</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        placeholder="Brief description of your inquiry"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us more about your inquiry..."
                        rows={6}
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* FAQ Section */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4 text-gray-900">Frequently Asked Questions</h2>
                <p className="text-gray-600">
                  Find quick answers to common questions. Can't find what you're looking for? Send us a message!
                </p>
              </div>

              <div className="space-y-4">
                {faqItems.map((faq, index) => (
                  <Card key={index} className="border-0 bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-3">
                        <HelpCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold mb-2 text-gray-900">{faq.question}</h3>
                          <p className="text-gray-600 text-sm">{faq.answer}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="mt-8 space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Quick Actions</h3>
                <div className="grid gap-3">
                  <Button variant="outline" className="justify-start h-auto p-4">
                    <MessageCircle className="w-5 h-5 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">Join our Community</div>
                      <div className="text-sm text-gray-500">Connect with other writers</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="justify-start h-auto p-4">
                    <HelpCircle className="w-5 h-5 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">Help Center</div>
                      <div className="text-sm text-gray-500">Browse our documentation</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="justify-start h-auto p-4">
                    <Briefcase className="w-5 h-5 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">Business Inquiries</div>
                      <div className="text-sm text-gray-500">Partnership opportunities</div>
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Visit Our Office</h2>
            <p className="text-gray-600">We're located in the heart of San Francisco. Drop by for a coffee and chat!</p>
          </div>
          <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Interactive map would be embedded here</p>
              <p className="text-sm text-gray-400">123 Blog Street, San Francisco, CA 94102</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
