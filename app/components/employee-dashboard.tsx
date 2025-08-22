// "use client"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Progress } from "@/components/ui/progress"
// import { Clock, Calendar, FileText, User, CheckCircle, XCircle, AlertCircle } from "lucide-react"
// import { useSupabaseAuth } from "@/hooks/use-supabase-auth"
// import { useAttendance, useLeaveRequests, useDocuments } from "@/hooks/use-supabase-data"
// import { useNotifications } from "@/components/notifications/notification-provider"
// import { useToast } from "@/hooks/use-toast"

// export function EmployeeDashboard() {
//   const { user } = useSupabaseAuth()
//   const { attendance, checkIn, checkOut, loading: attendanceLoading } = useAttendance(user?.id)
//   const { leaveRequests, loading: leaveLoading } = useLeaveRequests(user?.id)
//   const { documents, loading: documentsLoading } = useDocuments()
//   const { addNotification } = useNotifications()
//   const { toast } = useToast()
//   const [isCheckedIn, setIsCheckedIn] = useState(false)

//   useEffect(() => {
//     // Check if user is already checked in today
//     const today = new Date().toISOString().split("T")[0]
//     const todayRecord = attendance.find((a:any) => a.date === today && a.check_in && !a.check_out)
//     setIsCheckedIn(!!todayRecord)
//   }, [attendance])

//   const handleCheckIn = async () => {
//     if (!user) return

//     const result = await checkIn(user.id)
//     if (result) {
//       setIsCheckedIn(true)
//       toast({
//         title: "Checked In Successfully",
//         description: `Welcome to work! Checked in at ${result.check_in}`,
//       })
//       addNotification({
//         user_id: user.id,
//         title: "Check-in Recorded",
//         message: `You checked in at ${result.check_in}`,
//         type: "success",
//         read: false,
//       })
//     }
//   }

//   const handleCheckOut = async () => {
//     if (!user) return

//     const result = await checkOut(user.id)
//     if (result) {
//       setIsCheckedIn(false)
//       toast({
//         title: "Checked Out Successfully",
//         description: `Have a great day! Worked ${result.hours_worked} hours`,
//       })
//       addNotification({
//         user_id: user.id,
//         title: "Check-out Recorded",
//         message: `You checked out at ${result.check_out}. Total hours: ${result.hours_worked}`,
//         type: "success",
//         read: false,
//       })
//     }
//   }

//   // Calculate stats
//   const totalDaysPresent = attendance.filter((a) => a.status === "present").length
//   const totalDaysLate = attendance.filter((a) => a.status === "late").length
//   const totalLeavesTaken = leaveRequests.filter((lr) => lr.status === "approved").length
//   const pendingLeaves = leaveRequests.filter((lr) => lr.status === "pending").length

//   // Recent attendance (last 7 days)
//   const recentAttendance = attendance.slice(0, 7)

//   // Recent leave requests
//   const recentLeaveRequests = leaveRequests.slice(0, 3)

//   // Recent documents
//   const recentDocuments = documents.slice(0, 3)

//   return (
//     <div className="space-y-6">
//       {/* Welcome Section */}
//       <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-6 text-white">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-2xl font-bold">Welcome back, {user?.name?.split(" ")[0]}!</h1>
//             <p className="text-blue-100 mt-1">
//               {user?.position} • {user?.department}
//             </p>
//             <p className="text-blue-100 text-sm mt-2">
//               Today is{" "}
//               {new Date().toLocaleDateString("en-US", {
//                 weekday: "long",
//                 year: "numeric",
//                 month: "long",
//                 day: "numeric",
//               })}
//             </p>
//           </div>
//           <Avatar className="h-16 w-16 border-2 border-white/20">
//             <AvatarImage src={user?.avatar || "/placeholder.svg"} />
//             <AvatarFallback className="bg-white/20 text-white text-lg">
//               {user?.name
//                 ?.split(" ")
//                 .map((n) => n[0])
//                 .join("")
//                 .toUpperCase()}
//             </AvatarFallback>
//           </Avatar>
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         <Card className="hover:shadow-md transition-shadow">
//           <CardContent className="p-4">
//             <div className="flex items-center space-x-3">
//               <div className="p-2 bg-green-100 rounded-lg">
//                 <Clock className="h-5 w-5 text-green-600" />
//               </div>
//               <div className="flex-1">
//                 <p className="text-sm font-medium">Attendance</p>
//                 <Button
//                   size="sm"
//                   className="mt-2 w-full"
//                   onClick={isCheckedIn ? handleCheckOut : handleCheckIn}
//                   disabled={attendanceLoading}
//                   variant={isCheckedIn ? "destructive" : "default"}
//                 >
//                   {isCheckedIn ? "Check Out" : "Check In"}
//                 </Button>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="hover:shadow-md transition-shadow">
//           <CardContent className="p-4">
//             <div className="flex items-center space-x-3">
//               <div className="p-2 bg-blue-100 rounded-lg">
//                 <Calendar className="h-5 w-5 text-blue-600" />
//               </div>
//               <div className="flex-1">
//                 <p className="text-sm font-medium">Leave Request</p>
//                 <Button size="sm" className="mt-2 w-full bg-transparent" variant="outline" asChild>
//                   <a href="/employee/leave">Request Leave</a>
//                 </Button>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="hover:shadow-md transition-shadow">
//           <CardContent className="p-4">
//             <div className="flex items-center space-x-3">
//               <div className="p-2 bg-purple-100 rounded-lg">
//                 <FileText className="h-5 w-5 text-purple-600" />
//               </div>
//               <div className="flex-1">
//                 <p className="text-sm font-medium">Documents</p>
//                 <Button size="sm" className="mt-2 w-full bg-transparent" variant="outline" asChild>
//                   <a href="/employee/documents">View Docs</a>
//                 </Button>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="hover:shadow-md transition-shadow">
//           <CardContent className="p-4">
//             <div className="flex items-center space-x-3">
//               <div className="p-2 bg-orange-100 rounded-lg">
//                 <User className="h-5 w-5 text-orange-600" />
//               </div>
//               <div className="flex-1">
//                 <p className="text-sm font-medium">Profile</p>
//                 <Button size="sm" className="mt-2 w-full bg-transparent" variant="outline" asChild>
//                   <a href="/employee/profile">Edit Profile</a>
//                 </Button>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Stats Overview */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-muted-foreground">Present Days</p>
//                 <p className="text-2xl font-bold text-green-600">{totalDaysPresent}</p>
//               </div>
//               <CheckCircle className="h-8 w-8 text-green-600" />
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-muted-foreground">Late Days</p>
//                 <p className="text-2xl font-bold text-orange-600">{totalDaysLate}</p>
//               </div>
//               <AlertCircle className="h-8 w-8 text-orange-600" />
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-muted-foreground">Leaves Taken</p>
//                 <p className="text-2xl font-bold text-blue-600">{totalLeavesTaken}</p>
//               </div>
//               <Calendar className="h-8 w-8 text-blue-600" />
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-muted-foreground">Pending Requests</p>
//                 <p className="text-2xl font-bold text-purple-600">{pendingLeaves}</p>
//               </div>
//               <XCircle className="h-8 w-8 text-purple-600" />
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Main Content Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Recent Attendance */}
//         <Card className="lg:col-span-2">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Clock className="h-5 w-5" />
//               Recent Attendance
//             </CardTitle>
//             <CardDescription>Your attendance records for the past week</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-3">
//               {recentAttendance.length === 0 ? (
//                 <p className="text-sm text-muted-foreground text-center py-4">No attendance records yet</p>
//               ) : (
//                 recentAttendance.map((record) => (
//                   <div key={record.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                     <div className="flex items-center space-x-3">
//                       <div
//                         className={`w-3 h-3 rounded-full ${
//                           record.status === "present"
//                             ? "bg-green-500"
//                             : record.status === "late"
//                               ? "bg-orange-500"
//                               : "bg-red-500"
//                         }`}
//                       />
//                       <div>
//                         <p className="text-sm font-medium">{new Date(record.date).toLocaleDateString()}</p>
//                         <p className="text-xs text-muted-foreground">
//                           {record.check_in} - {record.check_out || "Not checked out"}
//                         </p>
//                       </div>
//                     </div>
//                     <Badge
//                       variant={
//                         record.status === "present" ? "default" : record.status === "late" ? "secondary" : "destructive"
//                       }
//                     >
//                       {record.status}
//                     </Badge>
//                   </div>
//                 ))
//               )}
//             </div>
//           </CardContent>
//         </Card>

//         {/* Leave Balance */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Calendar className="h-5 w-5" />
//               Leave Balance
//             </CardTitle>
//             <CardDescription>Your remaining leave days</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div>
//               <div className="flex justify-between text-sm mb-2">
//                 <span>Annual Leave</span>
//                 <span>8/12 days</span>
//               </div>
//               <Progress value={67} className="h-2" />
//             </div>
//             <div>
//               <div className="flex justify-between text-sm mb-2">
//                 <span>Sick Leave</span>
//                 <span>2/5 days</span>
//               </div>
//               <Progress value={40} className="h-2" />
//             </div>
//             <div>
//               <div className="flex justify-between text-sm mb-2">
//                 <span>Personal Leave</span>
//                 <span>1/3 days</span>
//               </div>
//               <Progress value={33} className="h-2" />
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Recent Leave Requests & Documents */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Calendar className="h-5 w-5" />
//               Recent Leave Requests
//             </CardTitle>
//             <CardDescription>Your latest leave applications</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-3">
//               {recentLeaveRequests.length === 0 ? (
//                 <p className="text-sm text-muted-foreground text-center py-4">No leave requests yet</p>
//               ) : (
//                 recentLeaveRequests.map((request) => (
//                   <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                     <div>
//                       <p className="text-sm font-medium">{request.leave_type} Leave</p>
//                       <p className="text-xs text-muted-foreground">
//                         {new Date(request.start_date).toLocaleDateString()} -{" "}
//                         {new Date(request.end_date).toLocaleDateString()}
//                       </p>
//                       <p className="text-xs text-muted-foreground">{request.days_requested} days</p>
//                     </div>
//                     <Badge
//                       variant={
//                         request.status === "approved"
//                           ? "default"
//                           : request.status === "pending"
//                             ? "secondary"
//                             : "destructive"
//                       }
//                     >
//                       {request.status}
//                     </Badge>
//                   </div>
//                 ))
//               )}
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <FileText className="h-5 w-5" />
//               Recent Documents
//             </CardTitle>
//             <CardDescription>Latest company documents</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-3">
//               {recentDocuments.length === 0 ? (
//                 <p className="text-sm text-muted-foreground text-center py-4">No documents available</p>
//               ) : (
//                 recentDocuments.map((doc) => (
//                   <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                     <div className="flex items-center space-x-3">
//                       <FileText className="h-4 w-4 text-blue-600" />
//                       <div>
//                         <p className="text-sm font-medium">{doc.title}</p>
//                         <p className="text-xs text-muted-foreground">{doc.category}</p>
//                       </div>
//                     </div>
//                     <Button size="sm" variant="ghost" asChild>
//                       <a href={doc.file_url} target="_blank" rel="noopener noreferrer">
//                         View
//                       </a>
//                     </Button>
//                   </div>
//                 ))
//               )}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }

// "use client"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Progress } from "@/components/ui/progress"
// import { Clock, Calendar, FileText, User, CheckCircle, XCircle, AlertCircle } from "lucide-react"

// // --- IMPOR YANG DIPERBAIKI ---
// import {
//   useSupabaseAuth,
//   useAttendance,
//   useLeaveRequests,
//   useDocuments,
//   useNotifications,
// } from "@/hooks/use-supabase-auth" // Asumsi semua hook ada di file ini
// import { useToast } from "@/components/ui/use-toast"

// // --- IMPOR TIPE DATA UNTUK MEMPERBAIKI ERROR 'ANY' ---
// import type { AttendanceRecord, LeaveRequest, Document, Notification } from "@/lib/supabase"

// export function EmployeeDashboard() {
//   const { user } = useSupabaseAuth()
//   const { attendance, checkIn, checkOut, loading: attendanceLoading } = useAttendance(user?.id)
//   const { leaveRequests, loading: leaveLoading } = useLeaveRequests(user?.id)
//   const { documents, loading: documentsLoading } = useDocuments()
//   const { notifications, markAsRead } = useNotifications(user?.id) // Ganti 'addNotification' jika hookmu mengembalikan 'notifications'
//   const { toast } = useToast()
//   const [isCheckedIn, setIsCheckedIn] = useState(false)

//   useEffect(() => {
//     const today = new Date().toISOString().split("T")[0]
//     // TAMBAHKAN TIPE DATA PADA PARAMETER 'a'
//     const todayRecord = attendance.find((a: AttendanceRecord) => a.date === today && a.check_in && !a.check_out)
//     setIsCheckedIn(!!todayRecord)
//   }, [attendance])

//   const handleCheckIn = async () => {
//     if (!user) return
//     const result = await checkIn(user.id)
//     if (result) {
//       setIsCheckedIn(true)
//       toast({
//         title: "Checked In Successfully",
//         description: `Welcome to work! Checked in at ${result.check_in}`,
//       })
//       // Fungsi addNotification mungkin perlu dibuat jika tidak ada di hook
//     }
//   }

//   const handleCheckOut = async () => {
//     if (!user) return
//     const result = await checkOut(user.id)
//     if (result) {
//       setIsCheckedIn(false)
//       toast({
//         title: "Checked Out Successfully",
//         description: `Have a great day! Worked ${result.hours_worked} hours`,
//       })
//     }
//   }

//   // TAMBAHKAN TIPE DATA
//   const totalDaysPresent = attendance.filter((a: AttendanceRecord) => a.status === "present").length
//   const totalDaysLate = attendance.filter((a: AttendanceRecord) => a.status === "late").length
//   const totalLeavesTaken = leaveRequests.filter((lr: LeaveRequest) => lr.status === "approved").length
//   const pendingLeaves = leaveRequests.filter((lr: LeaveRequest) => lr.status === "pending").length

//   const recentAttendance = attendance.slice(0, 7)
//   const recentLeaveRequests = leaveRequests.slice(0, 3)
//   const recentDocuments = documents.slice(0, 3)

//   return (
//     <div className="space-y-6">
//       {/* Welcome Section */}
//       <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-6 text-white">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-2xl font-bold">Welcome back, {user?.name?.split(" ")[0]}!</h1>
//             <p className="text-blue-100 mt-1">
//               {user?.position} • {user?.department}
//             </p>
//             <p className="text-blue-100 text-sm mt-2">
//               Today is{" "}
//               {new Date().toLocaleDateString("en-US", {
//                 weekday: "long",
//                 year: "numeric",
//                 month: "long",
//                 day: "numeric",
//               })}
//             </p>
//           </div>
//           <Avatar className="h-16 w-16 border-2 border-white/20">
//             <AvatarImage src={user?.avatar || "/placeholder.svg"} />
//             <AvatarFallback className="bg-white/20 text-white text-lg">
//               {user?.name
//                 ?.split(" ")
//                 .map((n:any) => n[0])
//                 .join("")
//                 .toUpperCase()}
//             </AvatarFallback>
//           </Avatar>
//         </div>
//       </div>

//       {/* Quick Actions and other JSX... (tidak ada perubahan di bawah sini, kecuali penambahan tipe data di .map) */}
      
//       {/* ... bagian JSX lainnya ... */}
      
//       {/* Recent Attendance */}
//       <Card className="lg:col-span-2">
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Clock className="h-5 w-5" />
//             Recent Attendance
//           </CardTitle>
//           <CardDescription>Your attendance records for the past week</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-3">
//             {recentAttendance.length === 0 ? (
//               <p className="text-sm text-muted-foreground text-center py-4">No attendance records yet</p>
//             ) : (
//               // TAMBAHKAN TIPE DATA PADA PARAMETER 'record'
//               recentAttendance.map((record: AttendanceRecord) => (
//                 <div key={record.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                   {/* ...konten map... */}
//                    <div className="flex items-center space-x-3">
//                       <div
//                         className={`w-3 h-3 rounded-full ${
//                           record.status === "present"
//                             ? "bg-green-500"
//                             : record.status === "late"
//                               ? "bg-orange-500"
//                               : "bg-red-500"
//                         }`}
//                       />
//                       <div>
//                         <p className="text-sm font-medium">{new Date(record.date).toLocaleDateString()}</p>
//                         <p className="text-xs text-muted-foreground">
//                           {record.check_in} - {record.check_out || "Not checked out"}
//                         </p>
//                       </div>
//                     </div>
//                     <Badge
//                       variant={
//                         record.status === "present" ? "default" : record.status === "late" ? "secondary" : "destructive"
//                       }
//                     >
//                       {record.status}
//                     </Badge>
//                 </div>
//               ))
//             )}
//           </div>
//         </CardContent>
//       </Card>
      
//       {/* ... bagian JSX lainnya ... */}
      
//       {/* Recent Leave Requests */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Calendar className="h-5 w-5" />
//             Recent Leave Requests
//           </CardTitle>
//           <CardDescription>Your latest leave applications</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-3">
//             {recentLeaveRequests.length === 0 ? (
//               <p className="text-sm text-muted-foreground text-center py-4">No leave requests yet</p>
//             ) : (
//               // TAMBAHKAN TIPE DATA PADA PARAMETER 'request'
//               recentLeaveRequests.map((request: LeaveRequest) => (
//                 <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                   {/* ...konten map... */}
//                   <div>
//                       <p className="text-sm font-medium">{request.leave_type} Leave</p>
//                       <p className="text-xs text-muted-foreground">
//                         {new Date(request.start_date).toLocaleDateString()} -{" "}
//                         {new Date(request.end_date).toLocaleDateString()}
//                       </p>
//                       <p className="text-xs text-muted-foreground">{request.days_requested} days</p>
//                     </div>
//                     <Badge
//                       variant={
//                         request.status === "approved"
//                           ? "default"
//                           : request.status === "pending"
//                             ? "secondary"
//                             : "destructive"
//                       }
//                     >
//                       {request.status}
//                     </Badge>
//                 </div>
//               ))
//             )}
//           </div>
//         </CardContent>
//       </Card>

//       {/* Recent Documents */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <FileText className="h-5 w-5" />
//             Recent Documents
//           </CardTitle>
//           <CardDescription>Latest company documents</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-3">
//             {recentDocuments.length === 0 ? (
//               <p className="text-sm text-muted-foreground text-center py-4">No documents available</p>
//             ) : (
//               // TAMBAHKAN TIPE DATA PADA PARAMETER 'doc'
//               recentDocuments.map((doc: Document) => (
//                 <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                   {/* ...konten map... */}
//                    <div className="flex items-center space-x-3">
//                       <FileText className="h-4 w-4 text-blue-600" />
//                       <div>
//                         <p className="text-sm font-medium">{doc.title}</p>
//                         <p className="text-xs text-muted-foreground">{doc.category}</p>
//                       </div>
//                     </div>
//                     <Button size="sm" variant="ghost" asChild>
//                       <a href={doc.file_url} target="_blank" rel="noopener noreferrer">
//                         View
//                       </a>
//                     </Button>
//                 </div>
//               ))
//             )}
//           </div>
//         </CardContent>
//       </Card>
      
//     </div>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Clock, Calendar, FileText, User, CheckCircle, XCircle, AlertCircle } from "lucide-react"

// --- IMPOR YANG SUDAH BENAR SESUAI STRUKTUR FILE PROYEKMU ---
import { useSupabaseAuth } from "../../hooks/use-supabase-auth"
import {
  useAttendance,
  useLeaveRequests,
  useDocuments,
  useNotifications,
} from "../../hooks/use-supabase-data"
import { useToast } from "@/app/components/ui/use-toast"
import type { CustomUser } from "@/lib/types"


// --- Impor tipe data yang dibutuhkan ---
import type { AttendanceRecord, LeaveRequest, Document } from "@/lib/supabase"

export function EmployeeDashboard() {
  const { user } = useSupabaseAuth()
  const { attendance, checkIn, checkOut, loading: attendanceLoading } = useAttendance(user?.id)
  const { leaveRequests, loading: leaveLoading } = useLeaveRequests(user?.id)
  const { documents, loading: documentsLoading } = useDocuments()
  const { notifications, markAsRead } = useNotifications(user?.id)
  const { toast } = useToast()
  const [isCheckedIn, setIsCheckedIn] = useState(false)

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]
    const todayRecord = attendance.find(
      (a: AttendanceRecord) => a.date === today && a.check_in && !a.check_out
    )
    setIsCheckedIn(!!todayRecord)
  }, [attendance])

  const handleCheckIn = async () => {
    if (!user) return
    const result = await checkIn(user.id)
    if (result && result.check_in) {
      setIsCheckedIn(true)
      toast({
        title: "Checked In Successfully",
        description: `Welcome to work! Checked in at ${new Date(result.check_in).toLocaleTimeString()}`,
      })
      // NOTE: Fungsi addNotification belum didefinisikan di hook useNotifications.
      // Kamu bisa menambahkannya nanti jika perlu.
      /*
      addNotification({
        user_id: user.id,
        title: "Check-in Recorded",
        message: `You checked in at ${result.check_in}`,
        type: "success",
      })
      */
    }
  }

  const handleCheckOut = async () => {
    if (!user) return
    const result = await checkOut(user.id)
    if (result) {
      setIsCheckedIn(false)
      toast({
        title: "Checked Out Successfully",
        description: `Have a great day! Worked ${result.hours_worked} hours`,
      })
    }
  }

  const totalDaysPresent = attendance.filter((a: AttendanceRecord) => a.status === "present").length
  const totalDaysLate = attendance.filter((a: AttendanceRecord) => a.status === "late").length
  const totalLeavesTaken = leaveRequests.filter((lr: LeaveRequest) => lr.status === "approved").length
  const pendingLeaves = leaveRequests.filter((lr: LeaveRequest) => lr.status === "pending").length

  const recentAttendance = attendance.slice(0, 7)
  const recentLeaveRequests = leaveRequests.slice(0, 3)
  const recentDocuments = documents.slice(0, 3)

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {user?.user_metadata?.name?.split(" ")[0]}!</h1>
            <p className="text-blue-100 mt-1">
              {user?.user_metadata?.position} • {user?.user_metadata?.department}
            </p>
            <p className="text-blue-100 text-sm mt-2">
              Today is{" "}
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <Avatar className="h-16 w-16 border-2 border-white/20">
            <AvatarImage src={user?.user_metadata?.avatar_url|| "/placeholder.svg"} />
            <AvatarFallback className="bg-white/20 text-white text-lg">
              {user?.user_metadata?.name
                ?.split(" ")
                .map((n: string) => n[0]) // Tipe 'any' dihilangkan
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Clock className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Attendance</p>
                <Button
                  size="sm"
                  className="mt-2 w-full"
                  onClick={isCheckedIn ? handleCheckOut : handleCheckIn}
                  disabled={attendanceLoading}
                  variant={isCheckedIn ? "destructive" : "default"}
                >
                  {attendanceLoading ? "Loading..." : isCheckedIn ? "Check Out" : "Check In"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Other Quick Action Cards... */}
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stats Cards... */}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Attendance */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Attendance
            </CardTitle>
            <CardDescription>Your attendance records for the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAttendance.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">No attendance records yet</p>
              ) : (
                recentAttendance.map((record: AttendanceRecord) => (
                  <div key={record.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          record.status === "present" ? "bg-green-500" :
                          record.status === "late" ? "bg-orange-500" :
                          "bg-red-500"
                        }`}
                      />
                      <div>
                        <p className="text-sm font-medium">{new Date(record.date + 'T00:00:00').toLocaleDateString()}</p>
                        <p className="text-xs text-muted-foreground">
                          {record.check_in ? new Date(`1970-01-01T${record.check_in}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "N/A"} - 
                          {record.check_out ? new Date(`1970-01-01T${record.check_out}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Not checked out"}
                        </p>
                      </div>
                    </div>
                    <Badge variant={record.status === "present" ? "default" : record.status === "late" ? "secondary" : "destructive"}>
                      {record.status}
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Leave Balance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Leave Balance
            </CardTitle>
            <CardDescription>Your remaining leave days</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Leave balance content... */}
          </CardContent>
        </Card>
      </div>

      {/* Recent Leave Requests & Documents */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Recent Leave Requests
            </CardTitle>
            <CardDescription>Your latest leave applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentLeaveRequests.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">No leave requests yet</p>
              ) : (
                recentLeaveRequests.map((request: LeaveRequest) => (
                  <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium">{request.leave_type} Leave</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(request.start_date + 'T00:00:00').toLocaleDateString()} - {new Date(request.end_date + 'T00:00:00').toLocaleDateString()}
                      </p>
                      <p className="text-xs text-muted-foreground">{request.days_requested} days</p>
                    </div>
                    <Badge variant={request.status === "approved" ? "default" : request.status === "pending" ? "secondary" : "destructive"}>
                      {request.status}
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Recent Documents
            </CardTitle>
            <CardDescription>Latest company documents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentDocuments.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">No documents available</p>
              ) : (
                recentDocuments.map((doc: Document) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-4 w-4 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium">{doc.title}</p>
                        <p className="text-xs text-muted-foreground">{doc.category}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost" asChild>
                      <a href={doc.file_url} target="_blank" rel="noopener noreferrer">
                        View
                      </a>
                    </Button>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}