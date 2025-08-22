// "use client"

// import { useState } from "react"
// import { FileText, Download, Eye, Search, Filter, Calendar } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { EmployeeSidebar } from "../../components/employee/employee-sidebar"
// import { EmployeeHeader } from "../../components/employee/employee-header"

// const documents = [
//   {
//     id: 1,
//     name: "Employee Handbook 2025",
//     type: "PDF",
//     category: "Policy",
//     size: "2.5 MB",
//     uploadDate: "2025-01-01",
//     description: "Complete employee handbook with company policies and procedures",
//     downloadCount: 156,
//   },
//   {
//     id: 2,
//     name: "Health Insurance Guide",
//     type: "PDF",
//     category: "Benefits",
//     size: "1.8 MB",
//     uploadDate: "2025-01-05",
//     description: "Comprehensive guide to employee health insurance benefits",
//     downloadCount: 89,
//   },
//   {
//     id: 3,
//     name: "Leave Policy 2025",
//     type: "DOCX",
//     category: "Policy",
//     size: "0.5 MB",
//     uploadDate: "2025-01-03",
//     description: "Updated leave policy including new leave types and procedures",
//     downloadCount: 134,
//   },
//   {
//     id: 4,
//     name: "IT Security Guidelines",
//     type: "PDF",
//     category: "Security",
//     size: "3.2 MB",
//     uploadDate: "2025-01-07",
//     description: "Information security guidelines and best practices",
//     downloadCount: 67,
//   },
//   {
//     id: 5,
//     name: "Training Schedule Q1 2025",
//     type: "XLSX",
//     category: "Training",
//     size: "0.8 MB",
//     uploadDate: "2025-01-08",
//     description: "First quarter training schedule and registration information",
//     downloadCount: 45,
//   },
//   {
//     id: 6,
//     name: "Emergency Procedures",
//     type: "PDF",
//     category: "Safety",
//     size: "1.2 MB",
//     uploadDate: "2025-01-02",
//     description: "Emergency evacuation procedures and safety protocols",
//     downloadCount: 78,
//   },
// ]

// export default function EmployeeDocumentsPage() {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [categoryFilter, setCategoryFilter] = useState("all")
//   const [selectedDocument, setSelectedDocument] = useState<any>(null)

//   const filteredDocuments = documents.filter((doc) => {
//     const matchesSearch =
//       doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       doc.description.toLowerCase().includes(searchTerm.toLowerCase())
//     const matchesCategory = categoryFilter === "all" || doc.category === categoryFilter
//     return matchesSearch && matchesCategory
//   })

//   const categories = [...new Set(documents.map((doc) => doc.category))]

//   const getFileIcon = (type: string) => {
//     return <FileText className="w-5 h-5 text-blue-600" />
//   }

//   const getCategoryBadge = (category: string) => {
//     const colors = {
//       Policy: "bg-blue-100 text-blue-800",
//       Benefits: "bg-green-100 text-green-800",
//       Security: "bg-red-100 text-red-800",
//       Training: "bg-purple-100 text-purple-800",
//       Safety: "bg-orange-100 text-orange-800",
//     }
//     return <Badge className={colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"}>{category}</Badge>
//   }

//   // const handleDownload = (document: any) => {
//   //   // Simulate download
//   //   console.log(`Downloading ${document.name}`)
//   //   alert(`Downloading ${document.name}...`)
//   // }

//   const handleDownload = (doc: { name: string; url: string; }) => {
//   console.log(`Downloading ${doc.name}...`);

//   // Menggunakan 'document' global dari browser, bukan parameter 'doc'
//   const link = document.createElement('a');
  
//   // Mengambil URL dari parameter 'doc'
//   link.href = doc.url; 
  
//   // Mengambil nama file dari parameter 'doc'
//   link.setAttribute('download', doc.name || 'download'); 
  
//   // Tetap menggunakan 'document' global dari browser
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// };
//   const handleView = (document: any) => {
//     setSelectedDocument(document)
//   }

//   const stats = {
//     totalDocuments: documents.length,
//     categories: categories.length,
//     totalDownloads: documents.reduce((sum, doc) => sum + doc.downloadCount, 0),
//     recentUploads: documents.filter((doc) => {
//       const uploadDate = new Date(doc.uploadDate)
//       const weekAgo = new Date()
//       weekAgo.setDate(weekAgo.getDate() - 7)
//       return uploadDate >= weekAgo
//     }).length,
//   }

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <EmployeeSidebar />
//       <div className="flex-1 p-6">
//         <EmployeeHeader title="Company Documents" subtitle="Access and download company documents and resources" />

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center">
//                 <FileText className="w-8 h-8 text-blue-600 mr-3" />
//                 <div>
//                   <p className="text-2xl font-bold text-gray-900">{stats.totalDocuments}</p>
//                   <p className="text-sm text-gray-600">Total Documents</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center">
//                 <Filter className="w-8 h-8 text-green-600 mr-3" />
//                 <div>
//                   <p className="text-2xl font-bold text-gray-900">{stats.categories}</p>
//                   <p className="text-sm text-gray-600">Categories</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center">
//                 <Download className="w-8 h-8 text-purple-600 mr-3" />
//                 <div>
//                   <p className="text-2xl font-bold text-gray-900">{stats.totalDownloads}</p>
//                   <p className="text-sm text-gray-600">Total Downloads</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center">
//                 <Calendar className="w-8 h-8 text-orange-600 mr-3" />
//                 <div>
//                   <p className="text-2xl font-bold text-gray-900">{stats.recentUploads}</p>
//                   <p className="text-sm text-gray-600">Recent Uploads</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Search and Filter */}
//         <Card className="mb-6">
//           <CardHeader>
//             <CardTitle>Document Library</CardTitle>
//             <CardDescription>Browse and access company documents</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="flex flex-col md:flex-row gap-4 mb-6">
//               <div className="flex-1">
//                 <div className="relative">
//                   <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                   <Input
//                     placeholder="Search documents..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="pl-10"
//                   />
//                 </div>
//               </div>
//               <Select value={categoryFilter} onValueChange={setCategoryFilter}>
//                 <SelectTrigger className="w-full md:w-48">
//                   <Filter className="w-4 h-4 mr-2" />
//                   <SelectValue placeholder="Filter by category" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Categories</SelectItem>
//                   {categories.map((category) => (
//                     <SelectItem key={category} value={category}>
//                       {category}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Documents Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {filteredDocuments.map((document) => (
//                 <Card key={document.id} className="hover:shadow-lg transition-shadow">
//                   <CardContent className="p-6">
//                     <div className="flex items-start justify-between mb-4">
//                       <div className="flex items-center gap-3">
//                         {getFileIcon(document.type)}
//                         <div className="flex-1 min-w-0">
//                           <h3 className="font-semibold text-gray-900 truncate">{document.name}</h3>
//                           <p className="text-sm text-gray-600">
//                             {document.type} • {document.size}
//                           </p>
//                         </div>
//                       </div>
//                       {getCategoryBadge(document.category)}
//                     </div>

//                     <p className="text-sm text-gray-600 mb-4 line-clamp-2">{document.description}</p>

//                     <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
//                       <span>Uploaded: {document.uploadDate}</span>
//                       <span>{document.downloadCount} downloads</span>
//                     </div>

//                     <div className="flex gap-2">
//                       <Dialog>
//                         <DialogTrigger asChild>
//                           <Button
//                             variant="outline"
//                             size="sm"
//                             className="flex-1 bg-transparent"
//                             onClick={() => handleView(document)}
//                           >
//                             <Eye className="w-4 h-4 mr-2" />
//                             View
//                           </Button>
//                         </DialogTrigger>
//                         <DialogContent className="max-w-2xl">
//                           <DialogHeader>
//                             <DialogTitle>{document.name}</DialogTitle>
//                             <DialogDescription>Document details and preview</DialogDescription>
//                           </DialogHeader>
//                           <div className="space-y-4">
//                             <div className="grid grid-cols-2 gap-4">
//                               <div>
//                                 <p className="text-sm font-medium text-gray-700">Type:</p>
//                                 <p className="text-sm text-gray-600">{document.type}</p>
//                               </div>
//                               <div>
//                                 <p className="text-sm font-medium text-gray-700">Size:</p>
//                                 <p className="text-sm text-gray-600">{document.size}</p>
//                               </div>
//                               <div>
//                                 <p className="text-sm font-medium text-gray-700">Category:</p>
//                                 <p className="text-sm text-gray-600">{document.category}</p>
//                               </div>
//                               <div>
//                                 <p className="text-sm font-medium text-gray-700">Upload Date:</p>
//                                 <p className="text-sm text-gray-600">{document.uploadDate}</p>
//                               </div>
//                             </div>
//                             <div>
//                               <p className="text-sm font-medium text-gray-700 mb-2">Description:</p>
//                               <p className="text-sm text-gray-600">{document.description}</p>
//                             </div>
//                             <div className="bg-gray-50 p-4 rounded-lg">
//                               <p className="text-sm text-gray-600 text-center">
//                                 Document preview not available. Click download to view the full document.
//                               </p>
//                             </div>
//                             <Button onClick={() => handleDownload(document)} className="w-full">
//                               <Download className="w-4 h-4 mr-2" />
//                               Download Document
//                             </Button>
//                           </div>
//                         </DialogContent>
//                       </Dialog>
//                       <Button size="sm" className="flex-1" onClick={() => handleDownload(document)}>
//                         <Download className="w-4 h-4 mr-2" />
//                         Download
//                       </Button>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>

//             {filteredDocuments.length === 0 && (
//               <div className="text-center py-8">
//                 <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
//                 <p className="text-gray-500">No documents found matching your criteria.</p>
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }

"use client"

import { useState } from "react"
import { FileText, Download, Eye, Search, Filter, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { EmployeeSidebar } from "../../components/employee/employee-sidebar"
import { EmployeeHeader } from "../../components/employee/employee-header"

// Tipe data untuk dokumen agar lebih aman dan mudah dibaca
type Document = {
  id: number;
  name: string;
  type: string;
  category: string;
  size: string;
  uploadDate: string;
  description: string;
  downloadCount: number;
  // FIX: Menambahkan properti 'url' untuk fungsi download
  url: string; 
};

// Data dokumen dengan properti 'url' yang ditambahkan
const documents: Document[] = [
  {
    id: 1,
    name: "Employee Handbook 2025",
    type: "PDF",
    category: "Policy",
    size: "2.5 MB",
    uploadDate: "2025-01-01",
    description: "Complete employee handbook with company policies and procedures",
    downloadCount: 156,
    url: "/documents/employee-handbook-2025.pdf",
  },
  {
    id: 2,
    name: "Health Insurance Guide",
    type: "PDF",
    category: "Benefits",
    size: "1.8 MB",
    uploadDate: "2025-01-05",
    description: "Comprehensive guide to employee health insurance benefits",
    downloadCount: 89,
    url: "/documents/health-insurance-guide.pdf",
  },
  {
    id: 3,
    name: "Leave Policy 2025",
    type: "DOCX",
    category: "Policy",
    size: "0.5 MB",
    uploadDate: "2025-01-03",
    description: "Updated leave policy including new leave types and procedures",
    downloadCount: 134,
    url: "/documents/leave-policy-2025.docx",
  },
  {
    id: 4,
    name: "IT Security Guidelines",
    type: "PDF",
    category: "Security",
    size: "3.2 MB",
    uploadDate: "2025-01-07",
    description: "Information security guidelines and best practices",
    downloadCount: 67,
    url: "/documents/it-security-guidelines.pdf",
  },
  {
    id: 5,
    name: "Training Schedule Q1 2025",
    type: "XLSX",
    category: "Training",
    size: "0.8 MB",
    uploadDate: "2025-01-08",
    description: "First quarter training schedule and registration information",
    downloadCount: 45,
    url: "/documents/training-schedule-q1-2025.xlsx",
  },
  {
    id: 6,
    name: "Emergency Procedures",
    type: "PDF",
    category: "Safety",
    size: "1.2 MB",
    uploadDate: "2025-01-02",
    description: "Emergency evacuation procedures and safety protocols",
    downloadCount: 78,
    url: "/documents/emergency-procedures.pdf",
  },
]

export default function EmployeeDocumentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  // Menggunakan tipe 'Document' yang sudah kita definisikan
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || doc.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  // FIX: Menggunakan Array.from() untuk kompatibilitas yang lebih baik
  const categories = Array.from(new Set(documents.map((doc) => doc.category)))

  const getFileIcon = (type: string) => {
    return <FileText className="w-5 h-5 text-blue-600" />
  }

  const getCategoryBadge = (category: string) => {
    const colors: { [key: string]: string } = {
      Policy: "bg-blue-100 text-blue-800",
      Benefits: "bg-green-100 text-green-800",
      Security: "bg-red-100 text-red-800",
      Training: "bg-purple-100 text-purple-800",
      Safety: "bg-orange-100 text-orange-800",
    }
    return <Badge className={colors[category] || "bg-gray-100 text-gray-800"}>{category}</Badge>
  }

  const handleDownload = (doc: Document) => {
    console.log(`Downloading ${doc.name}...`)
    const link = document.createElement('a')
    link.href = doc.url
    link.setAttribute('download', doc.name || 'download')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleView = (doc: Document) => {
    setSelectedDocument(doc)
  }

  const handleCloseDialog = () => {
    setSelectedDocument(null)
  }

  const stats = {
    totalDocuments: documents.length,
    categories: categories.length,
    totalDownloads: documents.reduce((sum, doc) => sum + doc.downloadCount, 0),
    recentUploads: documents.filter((doc) => {
      const uploadDate = new Date(doc.uploadDate)
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return uploadDate >= weekAgo
    }).length,
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <EmployeeSidebar />
      <div className="flex-1 p-6">
        <EmployeeHeader title="Company Documents" subtitle="Access and download company documents and resources" />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
           <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <FileText className="w-8 h-8 text-blue-600 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalDocuments}</p>
                  <p className="text-sm text-gray-600">Total Documents</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Filter className="w-8 h-8 text-green-600 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.categories}</p>
                  <p className="text-sm text-gray-600">Categories</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Download className="w-8 h-8 text-purple-600 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalDownloads}</p>
                  <p className="text-sm text-gray-600">Total Downloads</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="w-8 h-8 text-orange-600 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.recentUploads}</p>
                  <p className="text-sm text-gray-600">Recent Uploads</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Document Library</CardTitle>
            <CardDescription>Browse and access company documents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search documents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Documents Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDocuments.map((doc) => (
                <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {getFileIcon(doc.type)}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 truncate">{doc.name}</h3>
                          <p className="text-sm text-gray-600">
                            {doc.type} • {doc.size}
                          </p>
                        </div>
                      </div>
                      {getCategoryBadge(doc.category)}
                    </div>

                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{doc.description}</p>

                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <span>Uploaded: {doc.uploadDate}</span>
                      <span>{doc.downloadCount} downloads</span>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent"
                        onClick={() => handleView(doc)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button size="sm" className="flex-1" onClick={() => handleDownload(doc)}>
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredDocuments.length === 0 && (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No documents found matching your criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* FIX: Dialog (modal) tunggal untuk melihat detail, lebih efisien */}
      <Dialog open={selectedDocument !== null} onOpenChange={(isOpen) => !isOpen && handleCloseDialog()}>
        <DialogContent className="max-w-2xl">
          {selectedDocument && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedDocument.name}</DialogTitle>
                <DialogDescription>Document details and preview</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Type:</p>
                    <p className="text-sm text-gray-600">{selectedDocument.type}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Size:</p>
                    <p className="text-sm text-gray-600">{selectedDocument.size}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Category:</p>
                    <p className="text-sm text-gray-600">{selectedDocument.category}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Upload Date:</p>
                    <p className="text-sm text-gray-600">{selectedDocument.uploadDate}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Description:</p>
                  <p className="text-sm text-gray-600">{selectedDocument.description}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 text-center">
                    Document preview not available. Click download to view the full document.
                  </p>
                </div>
                <Button onClick={() => handleDownload(selectedDocument)} className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download Document
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}