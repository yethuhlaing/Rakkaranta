"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import {
  CalendarIcon,
  Search,
  Plus,
  Flame,
  Wrench,
  BedDouble,
  Wifi,
  Footprints,
  Info,
  MoreHorizontal,
  ChevronRight,
  ArrowUpDown,
    ArrowLeft,
  CheckCircle,
  ClipboardList,
  ClipboardX,
  Edit,
  InfoIcon,
  PenToolIcon as Tool,
  Trash2,
  UserIcon,
  Users,
  XCircle,
  ActivityIcon
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Define types for resort-specific items
export interface ResortItem {
  id: string
  type: "accommodation" | "facility" | "amenity" | "maintenance" | "activity"
  name: string
  description: string
  status: "available" | "occupied" | "maintenance" | "closed"
  category: string
  location: string
  bookable: boolean
  maintenanceHistory?: MaintenanceRecord[]
  nextMaintenance?: string
  capacity?: number
  price?: number
  x: number
  y: number
  z: number
  color?: string
  icon?: string
}

interface MaintenanceRecord {
  id: string
  date: string
  description: string
  technician: string
  resolved: boolean
}

// Predefined categories for different item types
const CATEGORIES = {
  accommodation: ["Cabin", "Villa", "Suite", "Standard Room"],
  facility: ["Sauna", "Hot Tub", "Restaurant", "Reception", "Lounge"],
  amenity: ["Wifi Hotspot", "Charging Station", "Fireplace", "Wood Storage"],
  maintenance: ["HVAC", "Plumbing", "Electrical", "Structural"],
  activity: ["Skiing", "Hiking", "Fishing", "Aurora Viewing", "Snowmobile"],
}

export default function ResortItemManager() {
  const [items, setItems] = useState<ResortItem[]>([])
  const [newItem, setNewItem] = useState<Partial<ResortItem>>({
    type: "accommodation",
    name: "",
    description: "",
    status: "available",
    category: "",
    location: "",
    bookable: true,
  })
  const [selectedItem, setSelectedItem] = useState<ResortItem | null>(null)
  const [activeTab, setActiveTab] = useState("view")
  const [filterType, setFilterType] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [maintenanceNote, setMaintenanceNote] = useState("")
  const [sortField, setSortField] = useState<string>("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Sample data for demo purposes
  const sampleItems: ResortItem[] = [
    {
      id: uuidv4(),
      type: "accommodation",
      name: "Lakeside Cabin 1",
      description: "Cozy cabin with lake view, sauna, and fireplace",
      status: "available",
      category: "Cabin",
      location: "Lakefront",
      bookable: true,
      capacity: 4,
      price: 250,
      x: 5,
      y: 0,
      z: 10,
      color: "#4ade80",
      icon: "BedDouble",
    },
    {
      id: uuidv4(),
      type: "accommodation",
      name: "Forest Villa 3",
      description: "Luxury villa surrounded by pine forest",
      status: "occupied",
      category: "Villa",
      location: "Forest Area",
      bookable: true,
      capacity: 6,
      price: 350,
      x: -8,
      y: 0,
      z: 15,
      color: "#3b82f6",
      icon: "BedDouble",
    },
    {
      id: uuidv4(),
      type: "facility",
      name: "Main Sauna",
      description: "Traditional Finnish wood-heated sauna",
      status: "available",
      category: "Sauna",
      location: "Central Area",
      bookable: true,
      capacity: 10,
      x: 0,
      y: 0,
      z: 0,
      color: "#4ade80",
      icon: "Flame",
    },
    {
      id: uuidv4(),
      type: "facility",
      name: "Lakeside Restaurant",
      description: "Restaurant serving local Finnish cuisine with lake views",
      status: "available",
      category: "Restaurant",
      location: "Lakefront",
      bookable: false,
      capacity: 50,
      x: 8,
      y: 0,
      z: 5,
      color: "#4ade80",
      icon: "Utensils",
    },
    {
      id: uuidv4(),
      type: "maintenance",
      name: "Hot Tub Pump",
      description: "Main circulation pump for the central hot tub",
      status: "maintenance",
      category: "Plumbing",
      location: "Central Area",
      bookable: false,
      maintenanceHistory: [
        {
          id: uuidv4(),
          date: "2025-03-15",
          description: "Replaced filter and cleaned impeller",
          technician: "Matti H.",
          resolved: true,
        },
      ],
      nextMaintenance: "2025-04-15",
      x: 3,
      y: 0,
      z: -5,
      color: "#f97316",
      icon: "Wrench",
    },
    {
      id: uuidv4(),
      type: "activity",
      name: "Aurora Viewing Point",
      description: "Prime location for northern lights viewing",
      status: "available",
      category: "Aurora Viewing",
      location: "Hilltop",
      bookable: true,
      x: -5,
      y: 2,
      z: -10,
      color: "#4ade80",
      icon: "Camera",
    },
    {
      id: uuidv4(),
      type: "amenity",
      name: "Premium WiFi Hotspot",
      description: "High-speed internet access point",
      status: "available",
      category: "Wifi Hotspot",
      location: "Central Lodge",
      bookable: false,
      x: 2,
      y: 0,
      z: 2,
      color: "#4ade80",
      icon: "Wifi",
    },
    {
      id: uuidv4(),
      type: "accommodation",
      name: "Hilltop Suite 2",
      description: "Luxury suite with panoramic views",
      status: "maintenance",
      category: "Suite",
      location: "Hilltop",
      bookable: true,
      capacity: 2,
      price: 400,
      x: -3,
      y: 5,
      z: -8,
      color: "#f97316",
      icon: "BedDouble",
    },
  ]

  // Load sample data on first render
  useEffect(() => {
    if (items.length === 0) {
      setItems(sampleItems)
    }
  }, [items.length])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewItem((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setNewItem((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setNewItem((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newItem.name || !newItem.type || !newItem.category) {
      alert("Please fill in all required fields")
      return
    }

    // Generate random coordinates for positioning (not visible but kept for data structure)
    const randomCoord = () => Math.floor(Math.random() * 20) - 10

    const itemWithId: ResortItem = {
      ...(newItem as ResortItem),
      id: uuidv4(),
      x: randomCoord(),
      y: 0,
      z: randomCoord(),
    }

    setItems((prev) => [...prev, itemWithId])

    // Reset form
    setNewItem({
      type: "accommodation",
      name: "",
      description: "",
      status: "available",
      category: "",
      location: "",
      bookable: true,
    })

    // Switch to view tab
    setActiveTab("view")
  }

  const handleUpdateStatus = (id: string, newStatus: ResortItem["status"]) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, status: newStatus }
        }
        return item
      }),
    )

    if (selectedItem?.id === id) {
      setSelectedItem((prev) => (prev ? { ...prev, status: newStatus } : null))
    }
  }

  const handleAddMaintenanceRecord = () => {
    if (!selectedItem || !maintenanceNote || !selectedDate) return

    const newRecord: MaintenanceRecord = {
      id: uuidv4(),
      date: format(selectedDate, "yyyy-MM-dd"),
      description: maintenanceNote,
      technician: "Current User", // In a real app, this would be the logged-in user
      resolved: false,
    }

    const updatedHistory = selectedItem.maintenanceHistory
      ? [...selectedItem.maintenanceHistory, newRecord]
      : [newRecord]

    setItems((prev) =>
      prev.map((item) => {
        if (item.id === selectedItem.id) {
          return { ...item, maintenanceHistory: updatedHistory }
        }
        return item
      }),
    )

    setSelectedItem((prev) => (prev ? { ...prev, maintenanceHistory: updatedHistory } : null))
    setMaintenanceNote("")
  }

  const handleDeleteItem = (id: string) => {
    // Remove from state
    setItems((prev) => prev.filter((item) => item.id !== id))

    // Clear selection if this was the selected item
    if (selectedItem?.id === id) {
      setSelectedItem(null)
    }

    // Switch to view tab
    setActiveTab("view")
  }

  const handleSort = (field: string) => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      // Set new field and default to ascending
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Filter and sort items
  const filteredItems = items
    .filter((item) => {
      // Apply type filter
      if (filterType && item.type !== filterType) return false

      // Apply status filter
      if (filterStatus && item.status !== filterStatus) return false

      // Apply search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          item.location.toLowerCase().includes(query)
        )
      }

      return true
    })
    .sort((a, b) => {
      // Apply sorting
      let comparison = 0

      switch (sortField) {
        case "name":
          comparison = a.name.localeCompare(b.name)
          break
        case "type":
          comparison = a.type.localeCompare(b.type)
          break
        case "status":
          comparison = a.status.localeCompare(b.status)
          break
        case "location":
          comparison = a.location.localeCompare(b.location)
          break
        default:
          comparison = a.name.localeCompare(b.name)
      }

      return sortDirection === "asc" ? comparison : -comparison
    })

  const getIconForType = (type: string) => {
    switch (type) {
      case "accommodation":
        return <BedDouble className="h-4 w-4" />
      case "facility":
        return <Flame className="h-4 w-4" />
      case "amenity":
        return <Wifi className="h-4 w-4" />
      case "maintenance":
        return <Wrench className="h-4 w-4" />
      case "activity":
        return <Footprints className="h-4 w-4" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-500">Available</Badge>
      case "occupied":
        return <Badge className="bg-blue-500">Occupied</Badge>
      case "maintenance":
        return <Badge className="bg-orange-500">Maintenance</Badge>
      case "closed":
        return <Badge className="bg-red-500">Closed</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 border-green-300"
      case "occupied":
        return "bg-blue-100 border-blue-300"
      case "maintenance":
        return "bg-orange-100 border-orange-300"
      case "closed":
        return "bg-red-100 border-red-300"
      default:
        return "bg-gray-100 border-gray-300"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "accommodation":
        return (
          <div className="p-2 rounded-full bg-indigo-100">
            <BedDouble className="h-5 w-5 text-indigo-600" />
          </div>
        )
      case "facility":
        return (
          <div className="p-2 rounded-full bg-amber-100">
            <Flame className="h-5 w-5 text-amber-600" />
          </div>
        )
      case "amenity":
        return (
          <div className="p-2 rounded-full bg-cyan-100">
            <Wifi className="h-5 w-5 text-cyan-600" />
          </div>
        )
      case "maintenance":
        return (
          <div className="p-2 rounded-full bg-orange-100">
            <Wrench className="h-5 w-5 text-orange-600" />
          </div>
        )
      case "activity":
        return (
          <div className="p-2 rounded-full bg-emerald-100">
            <Footprints className="h-5 w-5 text-emerald-600" />
          </div>
        )
      default:
        return (
          <div className="p-2 rounded-full bg-gray-100">
            <Info className="h-5 w-5 text-gray-600" />
          </div>
        )
    }
  }

  return (
    <div className="flex flex-col h-full w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <TabsList>
            <TabsTrigger value="view">View Items</TabsTrigger>
            <TabsTrigger value="add">Add Item</TabsTrigger>
            <TabsTrigger value="details" disabled={!selectedItem}>
              Item Details
            </TabsTrigger>
          </TabsList>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search items..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <Select
                value={filterType || "all"}
                onValueChange={(value) => setFilterType(value === "all" ? null : value)}
              >
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="accommodation">Accommodation</SelectItem>
                  <SelectItem value="facility">Facility</SelectItem>
                  <SelectItem value="amenity">Amenity</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="activity">Activity</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filterStatus || "all"}
                onValueChange={(value) => setFilterStatus(value === "all" ? null : value)}
              >
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="occupied">Occupied</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleSort("name")}>
                    Name {sortField === "name" && (sortDirection === "asc" ? "↑" : "↓")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSort("type")}>
                    Type {sortField === "type" && (sortDirection === "asc" ? "↑" : "↓")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSort("status")}>
                    Status {sortField === "status" && (sortDirection === "asc" ? "↑" : "↓")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSort("location")}>
                    Location {sortField === "location" && (sortDirection === "asc" ? "↑" : "↓")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                    >
                      {viewMode === "grid" ? (
                        <div className="grid grid-cols-2 gap-0.5">
                          <div className="w-1.5 h-1.5 rounded-sm bg-current"></div>
                          <div className="w-1.5 h-1.5 rounded-sm bg-current"></div>
                          <div className="w-1.5 h-1.5 rounded-sm bg-current"></div>
                          <div className="w-1.5 h-1.5 rounded-sm bg-current"></div>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-0.5">
                          <div className="w-3.5 h-1.5 rounded-sm bg-current"></div>
                          <div className="w-3.5 h-1.5 rounded-sm bg-current"></div>
                          <div className="w-3.5 h-1.5 rounded-sm bg-current"></div>
                        </div>
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Toggle {viewMode === "grid" ? "list" : "grid"} view</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>

        <TabsContent value="view" className="mt-0">
          {filteredItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4 border rounded-lg ">
              <div className="text-center">
                <h3 className="text-lg font-medium">No items found</h3>
                <p className="mt-1 text-sm ">
                  {searchQuery || filterType || filterStatus
                    ? "Try adjusting your search or filters"
                    : "Add your first resort item to get started"}
                </p>
                <div className="mt-6">
                  <Button onClick={() => setActiveTab("add")}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </div>
              </div>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredItems.map((item) => (
                <Card
                  key={item.id}
                  className={`overflow-hidden hover:shadow-md transition-shadow border-l-4`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      {getTypeIcon(item.type)}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-base truncate">{item.name}</h3>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs text-muted-foreground capitalize">{item.category}</span>
                          <span className="text-muted-foreground mx-1">•</span>
                          <span className="text-xs text-muted-foreground">{item.location}</span>
                        </div>
                      </div>
                      {getStatusBadge(item.status)}
                    </div>

                    <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{item.description}</p>

                    <div className="flex justify-between items-center mt-4">
                      {item.capacity && (
                        <span className="text-xs text-muted-foreground">Capacity: {item.capacity}</span>
                      )}
                      {item.price && <span className="text-xs font-medium">€{item.price}/night</span>}
                      {!item.capacity && !item.price && (
                        <span className="text-xs text-muted-foreground">
                          {item.bookable ? "Bookable" : "Not bookable"}
                        </span>
                      )}

                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs"
                        onClick={() => {
                          setSelectedItem(item)
                          setActiveTab("details")
                        }}
                      >
                        Details
                        <ChevronRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <div className="grid grid-cols-12 gap-4 p-3 bg-muted/50 font-medium text-sm">
                <div className="col-span-5">Item</div>
                <div className="col-span-2">Type</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2">Location</div>
                <div className="col-span-1"></div>
              </div>

              <div className="divide-y">
                {filteredItems.map((item) => (
                  <div key={item.id} className="grid grid-cols-12 gap-4 p-3 items-center hover:bg-muted/20">
                    <div className="col-span-5 flex items-center gap-3">
                      {getTypeIcon(item.type)}
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-xs text-muted-foreground">{item.category}</p>
                      </div>
                    </div>
                    <div className="col-span-2 capitalize text-sm">{item.type}</div>
                    <div className="col-span-2">{getStatusBadge(item.status)}</div>
                    <div className="col-span-2 text-sm">{item.location}</div>
                    <div className="col-span-1 flex justify-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedItem(item)
                              setActiveTab("details")
                            }}
                          >
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleUpdateStatus(item.id, "available")}>
                            Mark Available
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUpdateStatus(item.id, "occupied")}>
                            Mark Occupied
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUpdateStatus(item.id, "maintenance")}>
                            Mark Maintenance
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteItem(item.id)}>
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Showing {filteredItems.length} of {items.length} items
            </div>
            <Button onClick={() => setActiveTab("add")}>
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="add" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Add New Resort Item</CardTitle>
              <CardDescription>
                Add a new accommodation, facility, amenity, or maintenance item to the resort
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Item Type</Label>
                    <Select
                      value={newItem.type as string}
                      defaultValue="accommodation"
                      onValueChange={(value) => handleSelectChange("type", value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="accommodation">Accommodation</SelectItem>
                        <SelectItem value="facility">Facility</SelectItem>
                        <SelectItem value="amenity">Amenity</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="activity">Activity</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={newItem.category as string}
                      onValueChange={(value) => handleSelectChange("category", value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {newItem.type &&
                          CATEGORIES[newItem.type as keyof typeof CATEGORIES]?.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={newItem.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Lakeside Cabin 2"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={newItem.status as string}
                      onValueChange={(value) => handleSelectChange("status", value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="occupied">Occupied</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      value={newItem.location}
                      onChange={handleInputChange}
                      placeholder="e.g. Lakefront, Forest Area"
                    />
                  </div>

                  {(newItem.type === "accommodation" || newItem.type === "facility") && (
                    <div className="space-y-2">
                      <Label htmlFor="capacity">Capacity</Label>
                      <Input
                        id="capacity"
                        name="capacity"
                        type="number"
                        value={newItem.capacity?.toString() || ""}
                        onChange={handleInputChange}
                        placeholder="Number of people"
                      />
                    </div>
                  )}

                  {newItem.type === "accommodation" && (
                    <div className="space-y-2">
                      <Label htmlFor="price">Price per Night (€)</Label>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        value={newItem.price?.toString() || ""}
                        onChange={handleInputChange}
                        placeholder="e.g. 250"
                      />
                    </div>
                  )}

                  {(newItem.type === "accommodation" || newItem.type === "facility" || newItem.type === "activity") && (
                    <div className="flex items-center space-x-2 pt-6">
                      <Switch
                        id="bookable"
                        checked={newItem.bookable}
                        onCheckedChange={(checked) => handleSwitchChange("bookable", checked)}
                      />
                      <Label htmlFor="bookable">Bookable by guests</Label>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={newItem.description}
                    onChange={handleInputChange}
                    placeholder="Provide a detailed description"
                    rows={3}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setActiveTab("view")}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Item</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details" className="mt-0">
          {selectedItem && (
            <Card className="overflow-hidden border-t-4" style={{ borderTopColor: getStatusColor(selectedItem.status) }}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <CardTitle className="text-xl font-bold">{selectedItem.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      {getIconForType(selectedItem.type)}
                      <span className="capitalize">{selectedItem.category}</span>
                      {getStatusBadge(selectedItem.status)}
                    </CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10">
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to delete <span className="font-medium">{selectedItem.name}</span>? This
                          action cannot be undone.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline" onClick={() => {}}>
                          Cancel
                        </Button>
                        <Button variant="destructive" onClick={() => handleDeleteItem(selectedItem.id)}>
                          Delete
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-6">
                  {selectedItem.description && (
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Description</h3>
                      <p className="text-base">{selectedItem.description}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-base font-semibold flex items-center gap-2">
                        <InfoIcon className="h-4 w-4 text-muted-foreground" />
                        Details
                      </h3>
                      <div className="bg-background rounded-lg border p-4 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Location</span>
                          <span className="font-medium">{selectedItem.location || "Not specified"}</span>
                        </div>
                        {selectedItem.capacity && (
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Capacity</span>
                            <span className="font-medium">{selectedItem.capacity} people</span>
                          </div>
                        )}
                        {selectedItem.price && (
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Price</span>
                            <span className="font-medium">€{selectedItem.price} per night</span>
                          </div>
                        )}
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Bookable</span>
                          <Badge variant={selectedItem.bookable ? "default" : "outline"} className="font-normal">
                            {selectedItem.bookable ? "Yes" : "No"}
                          </Badge>
                        </div>
                        {selectedItem.nextMaintenance && (
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Next Maintenance</span>
                            <span className="font-medium">{selectedItem.nextMaintenance}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-base font-semibold flex items-center gap-2">
                        <ActivityIcon className="h-4 w-4 text-muted-foreground" />
                        Status Management
                      </h3>
                      <div className="bg-background rounded-lg border p-4">
                        <p className="text-sm text-muted-foreground mb-3">Update the current status:</p>
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            size="sm"
                            variant={selectedItem.status === "available" ? "default" : "outline"}
                            className={selectedItem.status === "available" ? "bg-green-600 hover:bg-green-700" : ""}
                            onClick={() => handleUpdateStatus(selectedItem.id, "available")}
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Available
                          </Button>
                          <Button
                            size="sm"
                            variant={selectedItem.status === "occupied" ? "default" : "outline"}
                            className={selectedItem.status === "occupied" ? "bg-blue-600 hover:bg-blue-700" : ""}
                            onClick={() => handleUpdateStatus(selectedItem.id, "occupied")}
                          >
                            <Users className="h-4 w-4 mr-2" />
                            Occupied
                          </Button>
                          <Button
                            size="sm"
                            variant={selectedItem.status === "maintenance" ? "default" : "outline"}
                            className={selectedItem.status === "maintenance" ? "bg-orange-600 hover:bg-orange-700" : ""}
                            onClick={() => handleUpdateStatus(selectedItem.id, "maintenance")}
                          >
                            <Tool className="h-4 w-4 mr-2" />
                            Maintenance
                          </Button>
                          <Button
                            size="sm"
                            variant={selectedItem.status === "closed" ? "default" : "outline"}
                            className={selectedItem.status === "closed" ? "bg-red-600 hover:bg-red-700" : ""}
                            onClick={() => handleUpdateStatus(selectedItem.id, "closed")}
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Closed
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {(selectedItem.type === "maintenance" || selectedItem.status === "maintenance") && (
                    <div className="space-y-4 pt-2">
                      <h3 className="text-base font-semibold flex items-center gap-2">
                        <ClipboardList className="h-4 w-4 text-muted-foreground" />
                        Maintenance Records
                      </h3>

                      {selectedItem.maintenanceHistory && selectedItem.maintenanceHistory.length > 0 ? (
                        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                          {selectedItem.maintenanceHistory.map((record) => (
                            <Card key={record.id} className="bg-background border shadow-sm">
                              <CardContent className="p-3">
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center gap-2">
                                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-medium">{record.date}</span>
                                  </div>
                                  <Badge variant={record.resolved ? "success" : "outline"} className="font-normal">
                                    {record.resolved ? "Resolved" : "Pending"}
                                  </Badge>
                                </div>
                                <p className="mt-2 text-sm">{record.description}</p>
                                <div className="flex items-center mt-2 text-xs text-muted-foreground">
                                  <UserIcon className="h-3 w-3 mr-1" />
                                  {record.technician}
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-muted/30 rounded-lg p-6 text-center">
                          <ClipboardX className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-muted-foreground">No maintenance records available.</p>
                        </div>
                      )}

                      <div className="bg-background rounded-lg border p-4 space-y-3">
                        <h4 className="font-medium text-sm">Add Maintenance Record</h4>
                        <div className="flex gap-2">
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" className="w-full justify-start text-left font-normal">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <Textarea
                          placeholder="Describe the maintenance performed or issue found"
                          value={maintenanceNote}
                          onChange={(e) => setMaintenanceNote(e.target.value)}
                          rows={2}
                          className="resize-none"
                        />
                        <Button
                          onClick={handleAddMaintenanceRecord}
                          disabled={!maintenanceNote || !selectedDate}
                          className="w-full"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Record
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>

              <CardFooter className="flex justify-between pt-2 pb-4">
                <Button variant="ghost" onClick={() => setActiveTab("view")}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to List
                </Button>
                <Button variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Details
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

