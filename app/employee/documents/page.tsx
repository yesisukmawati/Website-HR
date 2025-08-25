"use client"

import { useState, useEffect } from "react"
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
import { useToast } from "@/hooks/use-toast"
import { getDocuments, type Document } from "@/lib/supabase"

export default function EmployeeDocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchDocuments = async () => {
        setLoading(true);
        try {
            const data = await getDocuments();
            setDocuments(data);
        } catch(error) {
            toast.error("Error", { description: "Could not fetch documents." });
        } finally {
            setLoading(false);
        }
    };
    fetchDocuments();
  }, []);

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (doc.description && doc.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === "all" || doc.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(documents.map((doc) => doc.category)));

  const getFileIcon = (type: string) => {
    return <FileText className="w-5 h-5 text-blue-600" />;
  };

  const getCategoryBadge = (category: string) => {
    const colors: { [key: string]: string } = {
      Policy: "bg-blue-100 text-blue-800",
      Benefits: "bg-green-100 text-green-800",
      Security: "bg-red-100 text-red-800",
      Training: "bg-purple-100 text-purple-800",
      Safety: "bg-orange-100 text-orange-800",
    };
    return <Badge className={colors[category] || "bg-gray-100 text-gray-800"}>{category}</Badge>;
  };

  const handleDownload = (doc: Document) => {
    if (!doc.file_url) {
        toast.error("Error", { description: "File URL not found." });
        return;
    }
    toast.info("Download Started", { description: `Downloading ${doc.name}...` });
    const link = document.createElement('a');
    link.href = doc.file_url;
    link.setAttribute('target', '_blank');
    link.setAttribute('download', doc.name || 'download');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleView = (doc: Document) => {
    setSelectedDocument(doc);
  };

  const handleCloseDialog = () => {
    setSelectedDocument(null);
  };

  const stats = {
    totalDocuments: documents.length,
    categories: categories.length,
    totalDownloads: documents.reduce((sum, doc) => sum + (doc.downloadCount || 0), 0),
    recentUploads: documents.filter((doc) => {
      const uploadDate = new Date(doc.uploadDate);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return uploadDate >= weekAgo;
    }).length,
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <EmployeeSidebar />
      <div className="flex-1 p-6">
        <EmployeeHeader title="Company Documents" subtitle="Access and download company documents and resources" />

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

        <Card className="mb-6">
          <CardHeader>
            {/* --- PERBAIKAN DI SINI --- */}
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
                            {doc.type.toUpperCase()} • {doc.size}
                          </p>
                        </div>
                      </div>
                      {getCategoryBadge(doc.category)}
                    </div>

                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{doc.description}</p>

                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <span>Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}</span>
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

      <Dialog open={selectedDocument !== null} onOpenChange={(isOpen) => !isOpen && handleCloseDialog()}>
        <DialogContent className="max-w-2xl">
          {selectedDocument && (
            <>
              <DialogHeader>
                 {/* --- PERBAIKAN DI SINI --- */}
                <DialogTitle>{selectedDocument.name}</DialogTitle>
                <DialogDescription>Document details and preview</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Type:</p>
                    <p className="text-sm text-gray-600">{selectedDocument.type.toUpperCase()}</p>
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
                    <p className="text-sm text-gray-600">{new Date(selectedDocument.uploadDate).toLocaleDateString()}</p>
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