"use client"

import { useState, useEffect } from "react"
import { Search, Upload, Download, Eye, Trash2, Filter, Plus, FileText, ImageIcon, File, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sidebar } from "../components/layout/sidebar"
import { Header } from "../components/layout/header"
import { useToast } from "@/hooks/use-toast"
import { getDocuments, uploadDocument, deleteDocument, type Document } from "@/lib/supabase"
import { useSupabaseAuth } from "@/hooks/use-supabase-auth"

const categories = ["All", "HR", "Legal", "Safety", "Finance", "IT"];

export default function DocumentsPage() {
  const { user } = useSupabaseAuth();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [newDocumentFile, setNewDocumentFile] = useState<File | null>(null);
  const [newDocumentCategory, setNewDocumentCategory] = useState("");
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const { toast } = useToast();

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const data = await getDocuments();
      setDocuments(data);
    } catch (error) {
      toast.error("Error", { description: "Failed to fetch documents." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return <FileText className="w-5 h-5 text-red-500" />;
    if (type.includes('word')) return <FileText className="w-5 h-5 text-blue-500" />;
    if (type.includes('image')) return <ImageIcon className="w-5 h-5 text-green-500" />;
    return <File className="w-5 h-5 text-gray-500" />;
  };

  const handleUpload = async () => {
    if (!newDocumentFile || !newDocumentCategory || !user) {
      toast.error("Error", { description: "Please select a file, category, and make sure you are logged in." });
      return;
    }
    
    try {
      await uploadDocument(newDocumentFile, {
          category: newDocumentCategory,
          uploadedBy: user.id,
          description: `Uploaded file: ${newDocumentFile.name}`,
          title: newDocumentFile.name.split('.').slice(0, -1).join('.'),
      });

      setUploadDialogOpen(false);
      setNewDocumentFile(null);
      setNewDocumentCategory("");
      toast.success("Success", { description: "Document uploaded successfully!" });
      await fetchDocuments();
    } catch (error) {
       toast.error("Upload Failed", { description: "Could not upload the document. Check console for details." });
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this document? This action cannot be undone.")) {
      try {
        await deleteDocument(id);
        toast.success("Success", { description: "Document deleted successfully." });
        await fetchDocuments();
      } catch (error) {
        toast.error("Error", { description: "Failed to delete the document." });
      }
    }
  };

  const handleView = (doc: Document) => {
    setSelectedDocument(doc);
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
    link.setAttribute('download', doc.name);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6">
        <Header title="Documents" subtitle="Manage company documents and files" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-gradient-to-r from-blue-400 to-blue-500 text-white"><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-blue-100">Total Documents</p><p className="text-3xl font-bold">{documents.length}</p></div><FileText className="w-8 h-8 text-blue-200" /></div></CardContent></Card>
            <Card className="bg-gradient-to-r from-green-400 to-green-500 text-white"><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-green-100">Categories</p><p className="text-3xl font-bold">{new Set(documents.map(d => d.category)).size}</p></div><Filter className="w-8 h-8 text-green-200" /></div></CardContent></Card>
            <Card className="bg-gradient-to-r from-purple-400 to-purple-500 text-white"><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-purple-100">Total Downloads</p><p className="text-3xl font-bold">{documents.reduce((sum, doc) => sum + (doc.downloadCount || 0), 0)}</p></div><Download className="w-8 h-8 text-purple-200" /></div></CardContent></Card>
            <Card className="bg-gradient-to-r from-orange-400 to-orange-500 text-white"><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-orange-100">Storage Used</p><p className="text-3xl font-bold">7.6 GB</p></div><Upload className="w-8 h-8 text-orange-200" /></div></CardContent></Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                {/* --- PERBAIKAN DI SINI --- */}
                <CardTitle>Document Library</CardTitle>
                <CardDescription>Manage and organize company documents</CardDescription>
              </div>
              <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Upload Document
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    {/* --- PERBAIKAN DI SINI --- */}
                    <DialogTitle>Upload New Document</DialogTitle>
                    <DialogDescription>Add a new document to the library</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="file">Select File</Label>
                      <Input 
                        id="file" 
                        type="file" 
                        onChange={(e) => setNewDocumentFile(e.target.files?.[0] || null)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select onValueChange={(value) => setNewDocumentCategory(value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.filter(c => c !== "All").map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full" onClick={handleUpload}>Upload Document</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search documents..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Uploaded By</TableHead>
                  <TableHead>Upload Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell><div className="flex items-center gap-3">{getFileIcon(doc.type || '')}<span className="font-medium">{doc.name}</span></div></TableCell>
                    <TableCell><Badge variant="outline">{doc.category}</Badge></TableCell>
                    <TableCell>{doc.size}</TableCell>
                    <TableCell>{doc.uploadedBy}</TableCell>
                    <TableCell>{new Date(doc.uploadDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => handleView(doc)}>
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDownload(doc)}>
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(doc.id)}>
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Dialog open={selectedDocument !== null} onOpenChange={(isOpen) => !isOpen && setSelectedDocument(null)}>
        <DialogContent className="max-w-2xl">
          {selectedDocument && (
            <>
              <DialogHeader>
                {/* --- PERBAIKAN DI SINI --- */}
                <DialogTitle>{selectedDocument.name}</DialogTitle>
                <DialogDescription>Document details</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><p className="text-sm font-medium text-gray-700">Type:</p><p className="text-sm text-gray-600">{selectedDocument.type.toUpperCase()}</p></div>
                  <div><p className="text-sm font-medium text-gray-700">Size:</p><p className="text-sm text-gray-600">{selectedDocument.size}</p></div>
                  <div><p className="text-sm font-medium text-gray-700">Category:</p><p className="text-sm text-gray-600">{selectedDocument.category}</p></div>
                  <div><p className="text-sm font-medium text-gray-700">Upload Date:</p><p className="text-sm text-gray-600">{new Date(selectedDocument.uploadDate).toLocaleDateString()}</p></div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Description:</p>
                  <p className="text-sm text-gray-600">{selectedDocument.description}</p>
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
  );
}