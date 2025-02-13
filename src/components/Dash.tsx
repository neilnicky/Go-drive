"use client"

import { useState } from "react"


import {
  File,
  FileText,
  FolderIcon,
  Grid,
  HelpCircle,
  ImageIcon,
  Info,
  Menu,
  MoreVertical,
  Music,
  Search,
  Settings,
  Upload,
  Video,
} from "lucide-react"

import { Clock, Star, Trash } from "lucide-react"
import React from "react" 
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "./ui/breadcrumb"
import { Checkbox } from "./ui/checkbox"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"

interface FileItem {
  id: string
  name: string
  type: "file" | "folder" | "image" | "document" | "video" | "audio"
  size?: string
  modified: string
  path: string[]
  owner: string
}

const mockFiles: FileItem[] = [
  {
    id: "1",
    name: "Documents",
    type: "folder",
    modified: "Feb 12, 2024",
    path: ["Documents"],
    owner: "me",
  },
  {
    id: "2",
    name: "Images",
    type: "folder",
    modified: "Feb 11, 2024",
    path: ["Images"],
    owner: "me",
  },
  {
    id: "3",
    name: "presentation.pdf",
    type: "document",
    size: "2.4 MB",
    modified: "Feb 10, 2024",
    path: [],
    owner: "me",
  },
  {
    id: "4",
    name: "vacation.jpg",
    type: "image",
    size: "3.1 MB",
    modified: "Feb 9, 2024",
    path: ["Images"],
    owner: "me",
  },
  {
    id: "5",
    name: "meeting-notes.txt",
    type: "file",
    size: "12 KB",
    modified: "Feb 8, 2024",
    path: ["Documents"],
    owner: "john@example.com",
  },
  {
    id: "6",
    name: "project-demo.mp4",
    type: "video",
    size: "45 MB",
    modified: "Feb 7, 2024",
    path: [],
    owner: "me",
  },
  {
    id: "7",
    name: "podcast.mp3",
    type: "audio",
    size: "24 MB",
    modified: "Feb 6, 2024",
    path: [],
    owner: "sarah@example.com",
  },
]

export default function Component() {
  const [currentPath, setCurrentPath] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const getFileIcon = (type: FileItem["type"]) => {
    switch (type) {
      case "folder":
        return <FolderIcon className="w-5 h-5 text-muted-foreground" />
      case "image":
        return <ImageIcon className="w-5 h-5 text-muted-foreground" />
      case "document":
        return <FileText className="w-5 h-5 text-muted-foreground" />
      case "video":
        return <Video className="w-5 h-5 text-muted-foreground" />
      case "audio":
        return <Music className="w-5 h-5 text-muted-foreground" />
      default:
        return <File className="w-5 h-5 text-muted-foreground" />
    }
  }

  const filteredFiles = mockFiles.filter((file) => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPath =
      currentPath.length === 0 ? file.path.length === 0 : JSON.stringify(file.path) === JSON.stringify(currentPath)
    return matchesSearch && matchesPath
  })

  const handleFolderClick = (folderPath: string[]) => {
    setCurrentPath(folderPath)
  }

  const handlePathClick = (index: number) => {
    setCurrentPath(currentPath.slice(0, index + 1))
  }

  const toggleItemSelection = (id: string) => {
    setSelectedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <div className="dark min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center px-2 md:px-4 gap-2 md:gap-4">
          <Button variant="ghost" size="icon" className="shrink-0">
            <Menu className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-foreground"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2 flex-1">
            <Search className="h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search in Drive"
              className="flex-1 bg-muted/50 text-foreground placeholder:text-muted-foreground"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <HelpCircle className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Grid className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-col md:flex-row">
        <aside className="hidden md:block w-60 border-r min-h-[calc(100vh-3.5rem)] p-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full mb-2" size="lg">
                <Upload className="w-4 h-4 mr-2" />
                New
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Files</DialogTitle>
                <DialogDescription>Drag and drop files here or click to browse</DialogDescription>
              </DialogHeader>
              <div className="border-2 border-dashed rounded-lg p-12 text-center">
                <Upload className="w-8 h-8 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Drop your files here or click to browse through your machine
                </p>
              </div>
            </DialogContent>
          </Dialog>

          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              <File className="mr-2 h-4 w-4" />
              My Drive
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Info className="mr-2 h-4 w-4" />
              Shared with me
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Clock className="mr-2 h-4 w-4" />
              Recent
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Star className="mr-2 h-4 w-4" />
              Starred
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Trash className="mr-2 h-4 w-4" />
              Trash
            </Button>
          </div>
        </aside>

        <main className="flex-1 p-2 md:p-4">
          <div className="mb-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink onClick={() => setCurrentPath([])}>My Drive</BreadcrumbLink>
                </BreadcrumbItem>
                {currentPath.map((path, index) => (
                  <React.Fragment key={path}>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink onClick={() => handlePathClick(index)}>{path}</BreadcrumbLink>
                    </BreadcrumbItem>
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="rounded-lg border bg-card w-[91%]">
            <div className="flex items-center gap-4 p-2 border-b bg-muted/50">
              <Checkbox
                checked={selectedItems.length === filteredFiles.length}
                onCheckedChange={() =>
                  setSelectedItems(selectedItems.length === filteredFiles.length ? [] : filteredFiles.map((f) => f.id))
                }
              />
              <div className="flex-1 font-medium">Name</div>
              <div className="w-48 font-medium">Owner</div>
              <div className="w-48 font-medium">Last modified</div>
              <div className="w-24 font-medium">File size</div>
              <div className="w-10" />
            </div>
            {filteredFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-4 p-2 hover:bg-muted/50 group relative"
                onClick={() => file.type === "folder" && handleFolderClick(file.path)}
                role={file.type === "folder" ? "button" : undefined}
              >
                <Checkbox
                  checked={selectedItems.includes(file.id)}
                  onCheckedChange={() => toggleItemSelection(file.id)}
                  onClick={(e) => e.stopPropagation()}
                />
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {getFileIcon(file.type)}
                  <span className="truncate">{file.name}</span>
                </div>
                <div className="w-48 truncate text-sm text-muted-foreground">{file.owner}</div>
                <div className="w-48 truncate text-sm text-muted-foreground">{file.modified}</div>
                <div className="w-24 truncate text-sm text-muted-foreground">{file.size ?? "—"}</div>
                <div className="w-10">
                  <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
                {file.type !== "folder" && (
                  <a
                    href="#"
                    className="absolute inset-0"
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`Open ${file.name}`}
                  />
                )}
              </div>
            ))}
          </div>

          {filteredFiles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No files found</p>
            </div>
          )}
        </main>
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetContent side="left" className="w-60 p-2">
            <SheetHeader className="mb-4">
              <SheetTitle>Google Drive</SheetTitle>
            </SheetHeader>
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start">
                <File className="mr-2 h-4 w-4" />
                My Drive
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Info className="mr-2 h-4 w-4" />
                Shared with me
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Clock className="mr-2 h-4 w-4" />
                Recent
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Star className="mr-2 h-4 w-4" />
                Starred
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Trash className="mr-2 h-4 w-4" />
                Trash
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

