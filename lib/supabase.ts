// // Mock Supabase client for development
// export interface User {
//   id: string
//   email: string
//   name: string
//   role: "admin" | "employee"
//   avatar?: string
//   position?: string
//   department?: string
//   employee_id?: string
// }

// export interface Employee {
//   id: string
//   employee_id: string
//   name: string
//   email: string
//   position: string
//   department: string
//   hire_date: string
//   phone?: string
//   address?: string
//   avatar?: string
//   status: "active" | "inactive"
//   created_at: string
//   updated_at: string
// }

// export interface LeaveRequest {
//   id: string
//   employee_id: string
//   employee_name: string
//   leave_type: "annual" | "sick" | "personal" | "maternity" | "emergency"
//   start_date: string
//   end_date: string
//   days_requested: number
//   reason: string
//   status: "pending" | "approved" | "rejected"
//   approved_by?: string
//   approved_at?: string
//   comments?: string
//   created_at: string
//   updated_at: string
// }

// export interface AttendanceRecord {
//   id: string
//   employee_id: string
//   employee_name: string
//   date: string
//   check_in: string | null
//   check_out: string | null
//   status: "present" | "late" | "absent" | "half_day"
//   hours_worked?: number
//   overtime_hours?: number
//   notes?: string
//   created_at: string
//   updated_at: string
// }

// export interface Document {
//   id: string
//   title: string
//   description?: string
//   file_url: string
//   file_type: string
//   file_size: number
//   category: "policy" | "form" | "handbook" | "announcement" | "other"
//   uploaded_by: string
//   is_public: boolean
//   created_at: string
//   updated_at: string
// }

// export interface Notification {
//   id: string
//   user_id: string
//   title: string
//   message: string
//   type: "info" | "success" | "warning" | "error"
//   read: boolean
//   action_url?: string
//   created_at: string
// }

// // Mock data
// const mockUsers: User[] = [
//   {
//     id: "admin-1",
//     email: "admin@company.com",
//     name: "Admin User",
//     role: "admin",
//     avatar: "AU",
//     position: "System Administrator",
//     department: "IT",
//   },
//   {
//     id: "emp-1",
//     email: "john.doe@company.com",
//     name: "John Doe",
//     role: "employee",
//     avatar: "JD",
//     position: "Software Developer",
//     department: "Engineering",
//     employee_id: "EMP001",
//   },
//   {
//     id: "emp-2",
//     email: "jane.smith@company.com",
//     name: "Jane Smith",
//     role: "employee",
//     avatar: "JS",
//     position: "UI/UX Designer",
//     department: "Design",
//     employee_id: "EMP002",
//   },
// ]

// const mockEmployees: Employee[] = [
//   {
//     id: "emp-1",
//     employee_id: "EMP001",
//     name: "John Doe",
//     email: "john.doe@company.com",
//     position: "Software Developer",
//     department: "Engineering",
//     hire_date: "2023-01-15",
//     phone: "+62 812-3456-7890",
//     address: "Jakarta, Indonesia",
//     avatar: "JD",
//     status: "active",
//     created_at: "2023-01-15T00:00:00Z",
//     updated_at: "2023-01-15T00:00:00Z",
//   },
//   {
//     id: "emp-2",
//     employee_id: "EMP002",
//     name: "Jane Smith",
//     email: "jane.smith@company.com",
//     position: "UI/UX Designer",
//     department: "Design",
//     hire_date: "2023-02-01",
//     phone: "+62 813-4567-8901",
//     address: "Bandung, Indonesia",
//     avatar: "JS",
//     status: "active",
//     created_at: "2023-02-01T00:00:00Z",
//     updated_at: "2023-02-01T00:00:00Z",
//   },
// ]

// const mockLeaveRequests: LeaveRequest[] = [
//   {
//     id: "leave-1",
//     employee_id: "emp-1",
//     employee_name: "John Doe",
//     leave_type: "annual",
//     start_date: "2024-01-15",
//     end_date: "2024-01-17",
//     days_requested: 3,
//     reason: "Family vacation",
//     status: "approved",
//     approved_by: "admin-1",
//     approved_at: "2024-01-10T10:00:00Z",
//     comments: "Approved for family vacation",
//     created_at: "2024-01-08T09:00:00Z",
//     updated_at: "2024-01-10T10:00:00Z",
//   },
//   {
//     id: "leave-2",
//     employee_id: "emp-1",
//     employee_name: "John Doe",
//     leave_type: "sick",
//     start_date: "2024-01-20",
//     end_date: "2024-01-20",
//     days_requested: 1,
//     reason: "Medical appointment",
//     status: "pending",
//     created_at: "2024-01-19T08:00:00Z",
//     updated_at: "2024-01-19T08:00:00Z",
//   },
// ]

// const mockAttendance: AttendanceRecord[] = [
//   {
//     id: "att-1",
//     employee_id: "emp-1",
//     employee_name: "John Doe",
//     date: "2024-01-08",
//     check_in: "09:00:00",
//     check_out: "17:30:00",
//     status: "present",
//     hours_worked: 8.5,
//     overtime_hours: 0.5,
//     created_at: "2024-01-08T09:00:00Z",
//     updated_at: "2024-01-08T17:30:00Z",
//   },
//   {
//     id: "att-2",
//     employee_id: "emp-1",
//     employee_name: "John Doe",
//     date: "2024-01-09",
//     check_in: "09:15:00",
//     check_out: "17:00:00",
//     status: "late",
//     hours_worked: 7.75,
//     created_at: "2024-01-09T09:15:00Z",
//     updated_at: "2024-01-09T17:00:00Z",
//   },
// ]

// const mockDocuments: Document[] = [
//   {
//     id: "doc-1",
//     title: "Employee Handbook 2024",
//     description: "Complete guide for all employees",
//     file_url: "/documents/handbook-2024.pdf",
//     file_type: "pdf",
//     file_size: 2048000,
//     category: "handbook",
//     uploaded_by: "admin-1",
//     is_public: true,
//     created_at: "2024-01-01T00:00:00Z",
//     updated_at: "2024-01-01T00:00:00Z",
//   },
//   {
//     id: "doc-2",
//     title: "Leave Request Form",
//     description: "Form for requesting time off",
//     file_url: "/documents/leave-form.pdf",
//     file_type: "pdf",
//     file_size: 512000,
//     category: "form",
//     uploaded_by: "admin-1",
//     is_public: true,
//     created_at: "2024-01-01T00:00:00Z",
//     updated_at: "2024-01-01T00:00:00Z",
//   },
// ]

// const mockNotifications: Notification[] = [
//   {
//     id: "notif-1",
//     user_id: "emp-1",
//     title: "Leave Request Approved",
//     message: "Your annual leave request for Jan 15-17 has been approved",
//     type: "success",
//     read: false,
//     action_url: "/employee/leave",
//     created_at: "2024-01-10T10:00:00Z",
//   },
//   {
//     id: "notif-2",
//     user_id: "emp-1",
//     title: "New Company Policy",
//     message: "Please review the updated remote work policy",
//     type: "info",
//     read: false,
//     action_url: "/employee/documents",
//     created_at: "2024-01-09T14:00:00Z",
//   },
// ]

// // Mock Supabase functions
// export const supabase = {
//   // Auth functions
//   async signIn(email: string, password: string): Promise<User | null> {
//     await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay

//     const user = mockUsers.find((u) => u.email === email)
//     if (user && (password === "admin123" || password === "employee123")) {
//       localStorage.setItem("supabase_user", JSON.stringify(user))
//       return user
//     }
//     throw new Error("Invalid credentials")
//   },

//   async signOut(): Promise<void> {
//     await new Promise((resolve) => setTimeout(resolve, 500))
//     localStorage.removeItem("supabase_user")
//   },

//   async getCurrentUser(): Promise<User | null> {
//     const stored = localStorage.getItem("supabase_user")
//     return stored ? JSON.parse(stored) : null
//   },

//   // Employee functions
//   async getEmployees(): Promise<Employee[]> {
//     await new Promise((resolve) => setTimeout(resolve, 500))
//     return [...mockEmployees]
//   },

//   async getEmployee(id: string): Promise<Employee | null> {
//     await new Promise((resolve) => setTimeout(resolve, 300))
//     return mockEmployees.find((e) => e.id === id) || null
//   },

//   // Leave request functions
//   async getLeaveRequests(employeeId?: string): Promise<LeaveRequest[]> {
//     await new Promise((resolve) => setTimeout(resolve, 500))
//     if (employeeId) {
//       return mockLeaveRequests.filter((lr) => lr.employee_id === employeeId)
//     }
//     return [...mockLeaveRequests]
//   },

//   async submitLeaveRequest(request: Omit<LeaveRequest, "id" | "created_at" | "updated_at">): Promise<LeaveRequest> {
//     await new Promise((resolve) => setTimeout(resolve, 800))
//     const newRequest: LeaveRequest = {
//       ...request,
//       id: `leave-${Date.now()}`,
//       created_at: new Date().toISOString(),
//       updated_at: new Date().toISOString(),
//     }
//     mockLeaveRequests.unshift(newRequest)
//     return newRequest
//   },

//   // Attendance functions
//   async getAttendanceRecords(employeeId?: string): Promise<AttendanceRecord[]> {
//     await new Promise((resolve) => setTimeout(resolve, 500))
//     if (employeeId) {
//       return mockAttendance.filter((a) => a.employee_id === employeeId)
//     }
//     return [...mockAttendance]
//   },

//   async checkIn(employeeId: string): Promise<AttendanceRecord> {
//     await new Promise((resolve) => setTimeout(resolve, 600))
//     const now = new Date()
//     const record: AttendanceRecord = {
//       id: `att-${Date.now()}`,
//       employee_id: employeeId,
//       employee_name: mockEmployees.find((e) => e.id === employeeId)?.name || "Unknown",
//       date: now.toISOString().split("T")[0],
//       check_in: now.toTimeString().split(" ")[0],
//       check_out: null,
//       status: now.getHours() > 9 ? "late" : "present",
//       created_at: now.toISOString(),
//       updated_at: now.toISOString(),
//     }
//     mockAttendance.unshift(record)
//     return record
//   },

//   async checkOut(employeeId: string): Promise<AttendanceRecord> {
//     await new Promise((resolve) => setTimeout(resolve, 600))
//     const now = new Date()
//     const todayRecord = mockAttendance.find(
//       (a) => a.employee_id === employeeId && a.date === now.toISOString().split("T")[0] && !a.check_out,
//     )

//     if (todayRecord) {
//       todayRecord.check_out = now.toTimeString().split(" ")[0]
//       todayRecord.updated_at = now.toISOString()

//       if (todayRecord.check_in) {
//         const checkInTime = new Date(`2000-01-01T${todayRecord.check_in}`)
//         const checkOutTime = new Date(`2000-01-01T${todayRecord.check_out}`)
//         const diffMs = checkOutTime.getTime() - checkInTime.getTime()
//         todayRecord.hours_worked = Math.round((diffMs / (1000 * 60 * 60)) * 100) / 100
//       }

//       return todayRecord
//     }

//     throw new Error("No check-in record found for today")
//   },

//   // Document functions
//   async getDocuments(): Promise<Document[]> {
//     await new Promise((resolve) => setTimeout(resolve, 400))
//     return [...mockDocuments]
//   },

//   // Notification functions
//   async getNotifications(userId?: string): Promise<Notification[]> {
//     await new Promise((resolve) => setTimeout(resolve, 300))
//     if (userId) {
//       return mockNotifications.filter((n) => n.user_id === userId)
//     }
//     return [...mockNotifications]
//   },

//   async markNotificationAsRead(notificationId: string): Promise<void> {
//     await new Promise((resolve) => setTimeout(resolve, 200))
//     const notification = mockNotifications.find((n) => n.id === notificationId)
//     if (notification) {
//       notification.read = true
//     }
//   },
// }
// File: lib/supabase.ts

// Mock Supabase client for development

// --- INTERFACES (TIDAK ADA PERUBAHAN) ---
export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "employee"
  avatar?: string
  position?: string
  department?: string
  employee_id?: string
}
// ... (Interface lainnya tetap sama)
export interface Employee {
  id: string
  employee_id: string
  name: string
  email: string
  position: string
  department: string
  hire_date: string
  phone?: string
  address?: string
  avatar?: string
  status: "active" | "inactive"
  created_at: string
  updated_at: string
}

export interface LeaveRequest {
  id: string
  employee_id: string
  employee_name: string
  leave_type: "annual" | "sick" | "personal" | "maternity" | "emergency"
  start_date: string
  end_date: string
  days_requested: number
  reason: string
  status: "pending" | "approved" | "rejected"
  approved_by?: string
  approved_at?: string
  comments?: string
  created_at: string
  updated_at: string
}

export interface AttendanceRecord {
  id: string
  employee_id: string
  employee_name: string
  date: string
  check_in: string | null
  check_out: string | null
  status: "present" | "late" | "absent" | "half_day"
  hours_worked?: number
  overtime_hours?: number
  notes?: string
  created_at: string
  updated_at: string
}

export interface Document {
  id: string
  title: string
  description?: string
  file_url: string
  file_type: string
  file_size: number
  category: "policy" | "form" | "handbook" | "announcement" | "other"
  uploaded_by: string
  is_public: boolean
  created_at: string
  updated_at: string
}

export interface Notification {
  id: string
  user_id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error" | "attendance_request" | "leave_request" | "document_upload"
  read: boolean
  action_url?: string
  created_at: string
  employeeName?: string;
  isRead: boolean;
  employeeAvatar?: string;
  actionRequired?: boolean;
  metadata?: Record<string, any>; // Untuk data tambahan apa pun
}


// --- MOCK DATA (TIDAK ADA PERUBAHAN) ---
const mockUsers: User[] = [
  {
    id: "admin-1",
    email: "admin@company.com",
    name: "Admin User",
    role: "admin",
    avatar: "AU",
    position: "System Administrator",
    department: "IT",
  },
  {
    id: "emp-1",
    email: "john.doe@company.com",
    name: "John Doe",
    role: "employee",
    avatar: "JD",
    position: "Software Developer",
    department: "Engineering",
    employee_id: "EMP001",
  },
  {
    id: "emp-2",
    email: "jane.smith@company.com",
    name: "Jane Smith",
    role: "employee",
    avatar: "JS",
    position: "UI/UX Designer",
    department: "Design",
    employee_id: "EMP002",
  },
]
const mockEmployees: Employee[] = [
  {
    id: "emp-1",
    employee_id: "EMP001",
    name: "John Doe",
    email: "john.doe@company.com",
    position: "Software Developer",
    department: "Engineering",
    hire_date: "2023-01-15",
    phone: "+62 812-3456-7890",
    address: "Jakarta, Indonesia",
    avatar: "JD",
    status: "active",
    created_at: "2023-01-15T00:00:00Z",
    updated_at: "2023-01-15T00:00:00Z",
  },
  {
    id: "emp-2",
    employee_id: "EMP002",
    name: "Jane Smith",
    email: "jane.smith@company.com",
    position: "UI/UX Designer",
    department: "Design",
    hire_date: "2023-02-01",
    phone: "+62 813-4567-8901",
    address: "Bandung, Indonesia",
    avatar: "JS",
    status: "active",
    created_at: "2023-02-01T00:00:00Z",
    updated_at: "2023-02-01T00:00:00Z",
  },
]
const mockLeaveRequests: LeaveRequest[] = [
  {
    id: "leave-1",
    employee_id: "emp-1",
    employee_name: "John Doe",
    leave_type: "annual",
    start_date: "2024-01-15",
    end_date: "2024-01-17",
    days_requested: 3,
    reason: "Family vacation",
    status: "approved",
    approved_by: "admin-1",
    approved_at: "2024-01-10T10:00:00Z",
    comments: "Approved for family vacation",
    created_at: "2024-01-08T09:00:00Z",
    updated_at: "2024-01-10T10:00:00Z",
  },
  {
    id: "leave-2",
    employee_id: "emp-1",
    employee_name: "John Doe",
    leave_type: "sick",
    start_date: "2024-01-20",
    end_date: "2024-01-20",
    days_requested: 1,
    reason: "Medical appointment",
    status: "pending",
    created_at: "2024-01-19T08:00:00Z",
    updated_at: "2024-01-19T08:00:00Z",
  },
]
const mockAttendance: AttendanceRecord[] = [
  {
    id: "att-1",
    employee_id: "emp-1",
    employee_name: "John Doe",
    date: "2024-01-08",
    check_in: "09:00:00",
    check_out: "17:30:00",
    status: "present",
    hours_worked: 8.5,
    overtime_hours: 0.5,
    created_at: "2024-01-08T09:00:00Z",
    updated_at: "2024-01-08T17:30:00Z",
  },
  {
    id: "att-2",
    employee_id: "emp-1",
    employee_name: "John Doe",
    date: "2024-01-09",
    check_in: "09:15:00",
    check_out: "17:00:00",
    status: "late",
    hours_worked: 7.75,
    created_at: "2024-01-09T09:15:00Z",
    updated_at: "2024-01-09T17:00:00Z",
  },
]
const mockDocuments: Document[] = [
  {
    id: "doc-1",
    title: "Employee Handbook 2024",
    description: "Complete guide for all employees",
    file_url: "/documents/handbook-2024.pdf",
    file_type: "pdf",
    file_size: 2048000,
    category: "handbook",
    uploaded_by: "admin-1",
    is_public: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "doc-2",
    title: "Leave Request Form",
    description: "Form for requesting time off",
    file_url: "/documents/leave-form.pdf",
    file_type: "pdf",
    file_size: 512000,
    category: "form",
    uploaded_by: "admin-1",
    is_public: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
]
const mockNotifications: Notification[] = [
  {
    id: "notif-1",
    user_id: "emp-1",
    title: "Leave Request Approved",
    message: "Your annual leave request for Jan 15-17 has been approved",
    type: "success",
    read: false,
    action_url: "/employee/leave",
    created_at: "2024-01-10T10:00:00Z",
    employeeName: "John Doe",
    isRead: false,
  },
  {
    id: "notif-2",
    user_id: "emp-1",
    title: "New Company Policy",
    message: "Please review the updated remote work policy",
    type: "info",
    read: false,
    action_url: "/employee/documents",
    created_at: "2024-01-09T14:00:00Z",
    employeeName: "John Doe",
    isRead: false,
  },
]


// --- MOCK SUPABASE CLIENT (BAGIAN YANG DIPERBAIKI) ---
export const supabase = {
  /**
   * OBJEK 'auth' DIBUAT UNTUK MENIRU STRUKTUR SUPABASE CLIENT ASLI
   */
  auth: {
    /**
     * Menggantikan signIn() -> menjadi signInWithPassword()
     * Mengembalikan objek { data, error }
     */
    async signInWithPassword({ email, password }: { email: string; password: string }) {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const user = mockUsers.find((u) => u.email === email)
      if (user && (password === "admin123" || password === "employee123")) {
        localStorage.setItem("supabase_user", JSON.stringify(user))
        // Supabase asli mengembalikan struktur ini
        return { data: { user, session: {} }, error: null }
      }
      return { data: null, error: new Error("Invalid credentials") }
    },

    /**
     * signOut() dipindahkan ke dalam 'auth'
     * Mengembalikan objek { error }
     */
    async signOut() {
      await new Promise((resolve) => setTimeout(resolve, 500))
      localStorage.removeItem("supabase_user")
      return { error: null }
    },

    /**
     * Menggantikan getCurrentUser() -> menjadi getUser()
     * Mengembalikan objek { data, error }
     */
    async getUser() {
      await new Promise((resolve) => setTimeout(resolve, 100))
      const stored = localStorage.getItem("supabase_user")
      const user = stored ? JSON.parse(stored) : null
      return { data: { user }, error: null }
    },

    /**
     * Menambahkan mock untuk onAuthStateChange agar AuthProvider berfungsi
     */
    onAuthStateChange(callback: (event: string, session: any | null) => void) {
      // Panggil callback sekali untuk inisialisasi
      const stored = localStorage.getItem("supabase_user")
      const user = stored ? JSON.parse(stored) : null
      const session = user ? { user } : null
      callback("INITIAL_SESSION", session)

      // Kembalikan objek subscription palsu
      return {
        data: {
          subscription: {
            unsubscribe: () => {
              // Fungsi unsubscribe palsu, tidak melakukan apa-apa
            },
          },
        },
      }
    },
  },

  /**
   * Fungsi-fungsi lain dipertahankan di sini untuk sementara.
   * Di aplikasi Supabase asli, ini akan dipanggil dengan cara:
   * supabase.from('employees').select('*')
   */

  // Employee functions
  async getEmployees(): Promise<Employee[]> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return [...mockEmployees]
  },

  async getEmployee(id: string): Promise<Employee | null> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return mockEmployees.find((e) => e.id === id) || null
  },

  // Leave request functions
  async getLeaveRequests(employeeId?: string): Promise<LeaveRequest[]> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    if (employeeId) {
      return mockLeaveRequests.filter((lr) => lr.employee_id === employeeId)
    }
    return [...mockLeaveRequests]
  },

  async submitLeaveRequest(request: Omit<LeaveRequest, "id" | "created_at" | "updated_at">): Promise<LeaveRequest> {
    await new Promise((resolve) => setTimeout(resolve, 800))
    const newRequest: LeaveRequest = {
      ...request,
      id: `leave-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    mockLeaveRequests.unshift(newRequest)
    return newRequest
  },

  // Attendance functions
  async getAttendanceRecords(employeeId?: string): Promise<AttendanceRecord[]> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    if (employeeId) {
      return mockAttendance.filter((a) => a.employee_id === employeeId)
    }
    return [...mockAttendance]
  },

  async checkIn(employeeId: string): Promise<AttendanceRecord> {
    await new Promise((resolve) => setTimeout(resolve, 600))
    const now = new Date()
    const record: AttendanceRecord = {
      id: `att-${Date.now()}`,
      employee_id: employeeId,
      employee_name: mockEmployees.find((e) => e.id === employeeId)?.name || "Unknown",
      date: now.toISOString().split("T")[0],
      check_in: now.toTimeString().split(" ")[0],
      check_out: null,
      status: now.getHours() > 9 ? "late" : "present",
      created_at: now.toISOString(),
      updated_at: now.toISOString(),
    }
    mockAttendance.unshift(record)
    return record
  },

  async checkOut(employeeId: string): Promise<AttendanceRecord> {
    await new Promise((resolve) => setTimeout(resolve, 600))
    const now = new Date()
    const todayRecord = mockAttendance.find(
      (a) => a.employee_id === employeeId && a.date === now.toISOString().split("T")[0] && !a.check_out,
    )

    if (todayRecord) {
      todayRecord.check_out = now.toTimeString().split(" ")[0]
      todayRecord.updated_at = now.toISOString()

      if (todayRecord.check_in) {
        const checkInTime = new Date(`2000-01-01T${todayRecord.check_in}`)
        const checkOutTime = new Date(`2000-01-01T${todayRecord.check_out}`)
        const diffMs = checkOutTime.getTime() - checkInTime.getTime()
        todayRecord.hours_worked = Math.round((diffMs / (1000 * 60 * 60)) * 100) / 100
      }

      return todayRecord
    }

    throw new Error("No check-in record found for today")
  },

  // Document functions
  async getDocuments(): Promise<Document[]> {
    await new Promise((resolve) => setTimeout(resolve, 400))
    return [...mockDocuments]
  },

  // Notification functions
  async getNotifications(userId?: string): Promise<Notification[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    if (userId) {
      return mockNotifications.filter((n) => n.user_id === userId)
    }
    return [...mockNotifications]
  },

  async markNotificationAsRead(notificationId: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    const notification = mockNotifications.find((n) => n.id === notificationId)
    if (notification) {
      notification.read = true
    }
  },
}