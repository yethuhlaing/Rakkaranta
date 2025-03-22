"use client"

import type React from "react"

import { useState } from "react"
import { Check, Clock, Filter, MoreHorizontal, Search, SlidersHorizontal, User } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { DashboardHeader } from "@/components/dashboard/header"
import { toast } from "sonner";

// Sample data for demonstration
const supportTickets = [
  {
    id: "T-1234",
    customer: {
      name: "Elina Mäkinen",
      email: "elina.makinen@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    subject: "Booking Confirmation Issue",
    message:
      "I made a reservation for the Northern Lights package for Dec 15-20, but I haven't received my confirmation email yet. Could you please check if my booking was processed correctly?",
    status: "new",
    priority: "high",
    category: "booking",
    created: "2 hours ago",
  },
  {
    id: "T-1233",
    customer: {
      name: "Mikko Virtanen",
      email: "mikko.virtanen@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    subject: "Sauna Package Question",
    message:
      "I'm interested in the traditional sauna experience package. Does it include the lakeside sauna option? Also, is it possible to book for a group of 8 people?",
    status: "in-progress",
    priority: "medium",
    category: "inquiry",
    created: "5 hours ago",
  },
  {
    id: "T-1232",
    customer: {
      name: "Antti Korhonen",
      email: "antti.korhonen@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    subject: "Special Dietary Requirements",
    message:
      "I have celiac disease and need gluten-free options. Will your restaurant be able to accommodate this during my stay next week? I've already made a booking under reservation #FIN-2023-0789.",
    status: "resolved",
    priority: "medium",
    category: "dining",
    created: "1 day ago",
  },
]

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "new":
      return <Badge className="bg-blue-500 hover:bg-blue-600">New</Badge>
    case "in-progress":
      return <Badge className="bg-amber-500 hover:bg-amber-600">In Progress</Badge>
    case "resolved":
      return <Badge className="bg-green-500 hover:bg-green-600">Resolved</Badge>
    default:
      return <Badge>Unknown</Badge>
  }
}

// Priority badge component
const PriorityBadge = ({ priority }: { priority: string }) => {
  switch (priority) {
    case "high":
      return (
        <Badge variant="outline" className="text-red-500 border-red-500">
          High
        </Badge>
      )
    case "medium":
      return (
        <Badge variant="outline" className="text-amber-500 border-amber-500">
          Medium
        </Badge>
      )
    case "low":
      return (
        <Badge variant="outline" className="text-green-500 border-green-500">
          Low
        </Badge>
      )
    default:
      return <Badge variant="outline">Normal</Badge>
  }
}

export default function AdminSupportForm() {
  const [selectedTicket, setSelectedTicket] = useState(supportTickets[0])
  const [responseText, setResponseText] = useState("")

  const handleResponseChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResponseText(e.target.value)
  }

  const handleSendResponse = () => {
    // In a real application, this would send the response to the customer
    // and update the ticket status
    // alert(`Response sent to ${selectedTicket.customer.name}`)
    toast.success(`Response sent to ${selectedTicket.customer.name}`)
    setResponseText("")
  }

  const handleSelectTicket = (ticket: (typeof supportTickets)[0]) => {
    setSelectedTicket(ticket)
    setResponseText("")
  }

  return (
    <div>
      <DashboardHeader
          heading="Admin Support"
          text="Manage administrative support and system settings."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Left sidebar - Ticket list */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Support Tickets</CardTitle>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search tickets..." className="pl-8" />
              </div>
              <Tabs defaultValue="all">
                <TabsList className="grid grid-cols-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="new">New</TabsTrigger>
                  <TabsTrigger value="in-progress">Active</TabsTrigger>
                  <TabsTrigger value="resolved">Resolved</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {supportTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className={`p-3 cursor-pointer hover:bg-muted transition-colors ${selectedTicket.id === ticket.id ? "bg-muted" : ""}`}
                    onClick={() => handleSelectTicket(ticket)}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <div className="font-medium">{ticket.subject}</div>
                      <StatusBadge status={ticket.status} />
                    </div>
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <div>{ticket.customer.name}</div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {ticket.created}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right side - Ticket details and response */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle>{selectedTicket.subject}</CardTitle>
                    <div className="text-sm text-muted-foreground">#{selectedTicket.id}</div>
                  </div>
                  <CardDescription>
                    {selectedTicket.category.charAt(0).toUpperCase() + selectedTicket.category.slice(1)} •{" "}
                    {selectedTicket.created}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={selectedTicket.status} />
                  <PriorityBadge priority={selectedTicket.priority} />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Assign to staff</DropdownMenuItem>
                      <DropdownMenuItem>Change priority</DropdownMenuItem>
                      <DropdownMenuItem>Mark as resolved</DropdownMenuItem>
                      <DropdownMenuItem>Archive ticket</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Customer information */}
                <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                  <Avatar>
                    <AvatarImage src={selectedTicket.customer.avatar} alt={selectedTicket.customer.name} />
                    <AvatarFallback>
                      {selectedTicket.customer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{selectedTicket.customer.name}</div>
                    <div className="text-sm text-muted-foreground">{selectedTicket.customer.email}</div>
                  </div>
                  <Button variant="outline" size="sm" className="ml-auto">
                    View Customer
                  </Button>
                </div>

                {/* Message content */}
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Original Message</h3>
                  <div className="p-4 border rounded-lg">
                    <p>{selectedTicket.message}</p>
                  </div>
                </div>

                {/* Response area */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Your Response</h3>
                    <Select defaultValue="custom">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Response template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="custom">Custom Response</SelectItem>
                        <SelectItem value="booking">Booking Confirmation</SelectItem>
                        <SelectItem value="inquiry">General Inquiry</SelectItem>
                        <SelectItem value="special">Special Requests</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Textarea
                    placeholder="Type your response here..."
                    className="min-h-[150px]"
                    value={responseText}
                    onChange={handleResponseChange}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <div className="flex gap-2">
                <Button variant="outline">Save Draft</Button>
                <Button variant="outline">Attach Files</Button>
              </div>
              <div className="flex gap-2">
                <Select defaultValue="in-progress">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Set status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={handleSendResponse}>
                  <Check className="mr-2 h-4 w-4" />
                  Send Response
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

