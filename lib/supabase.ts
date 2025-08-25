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
  id: number;
  name: string;
  category: string;
  size: string;
  uploadedBy: string;
  uploadDate: string;
  type: string;
  downloadCount: number;
  description: string;
  url: string;
  file_url: string;
  title: string;
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
  metadata?: Record<string, any>;
}

// --- MOCK DATA ---
const mockUsers: User[] = [
  { id: "admin-1", email: "admin@company.com", name: "Admin User", role: "admin", avatar: "AU", position: "System Administrator", department: "IT" },
  { id: "emp-1", email: "john.doe@company.com", name: "John Doe", role: "employee", avatar: "JD", position: "Software Developer", department: "Engineering", employee_id: "EMP001" },
  { id: "emp-2", email: "jane.smith@company.com", name: "Jane Smith", role: "employee", avatar: "JS", position: "UI/UX Designer", department: "Design", employee_id: "EMP002" },
];
const mockEmployees: Employee[] = [
    { id: "emp-1", employee_id: "EMP001", name: "John Doe", email: "john.doe@company.com", position: "Software Developer", department: "Engineering", hire_date: "2023-01-15", phone: "+62 812-3456-7890", address: "Jakarta, Indonesia", avatar: "JD", status: "active", created_at: "2023-01-15T00:00:00Z", updated_at: "2023-01-15T00:00:00Z" },
    { id: "emp-2", employee_id: "EMP002", name: "Jane Smith", email: "jane.smith@company.com", position: "UI/UX Designer", department: "Design", hire_date: "2023-02-01", phone: "+62 813-4567-8901", address: "Bandung, Indonesia", avatar: "JS", status: "active", created_at: "2023-02-01T00:00:00Z", updated_at: "2023-02-01T00:00:00Z" },
];
const mockLeaveRequests: LeaveRequest[] = [
    { id: "leave-1", employee_id: "emp-1", employee_name: "John Doe", leave_type: "annual", start_date: "2024-01-15", end_date: "2024-01-17", days_requested: 3, reason: "Family vacation", status: "approved", approved_by: "admin-1", approved_at: "2024-01-10T10:00:00Z", comments: "Approved for family vacation", created_at: "2024-01-08T09:00:00Z", updated_at: "2024-01-10T10:00:00Z" },
];
const mockAttendance: AttendanceRecord[] = [
    { id: "att-1", employee_id: "emp-1", employee_name: "John Doe", date: "2024-01-08", check_in: "09:00:00", check_out: "17:30:00", status: "present", hours_worked: 8.5, overtime_hours: 0.5, created_at: "2024-01-08T09:00:00Z", updated_at: "2024-01-08T17:30:00Z" },
];
const mockNotifications: Notification[] = [
    { id: "notif-1", user_id: "emp-1", title: "Leave Request Approved", message: "Your annual leave request for Jan 15-17 has been approved", type: "success", read: false, action_url: "/employee/leave", created_at: "2024-01-10T10:00:00Z", employeeName: "John Doe", isRead: false, },
];

// --- PENGELOLAAN DATA DOKUMEN (DATABASE TIRUAN) ---
const seedDocuments: Document[] = [
    { id: 1, name: "Employee Handbook 2025.pdf", category: "HR", size: "2.5 MB", uploadedBy: "Admin", uploadDate: "2025-01-08", type: "pdf", downloadCount: 45, description: "Complete employee handbook with company policies and procedures.", url: "/documents/employee-handbook-2025.pdf", file_url: "/documents/employee-handbook-2025.pdf", title: "Employee Handbook 2025" },
    { id: 2, name: "Company Policy.docx", category: "Legal", size: "1.2 MB", uploadedBy: "HR Manager", uploadDate: "2025-01-07", type: "doc", downloadCount: 23, description: "Official company-wide policies and regulations.", url: "/documents/company-policy.docx", file_url: "/documents/company-policy.docx", title: "Company Policy" },
];

const getStoredDocuments = (): Document[] => {
  try {
    const stored = localStorage.getItem("mock_documents");
    if (stored) return JSON.parse(stored);
    localStorage.setItem("mock_documents", JSON.stringify(seedDocuments));
    return seedDocuments;
  } catch (error) { return seedDocuments; }
};

const setStoredDocuments = (documents: Document[]) => {
  try {
    localStorage.setItem("mock_documents", JSON.stringify(documents));
  } catch (error) { console.error("Could not save to localStorage", error); }
};

// --- MOCK SUPABASE CLIENT ---
export const supabase = {
  auth: {
    async signInWithPassword({ email, password }: { email: string; password: string }) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const user = mockUsers.find(u => u.email === email);
      if (user && (password === "admin123" || password === "employee123")) {
        localStorage.setItem("supabase_user", JSON.stringify(user));
        return { data: { user, session: {} }, error: null };
      }
      return { data: null, error: new Error("Invalid credentials") };
    },
    async signOut() {
      await new Promise(resolve => setTimeout(resolve, 200));
      localStorage.removeItem("supabase_user");
      return { error: null };
    },
    async getUser() {
      await new Promise(resolve => setTimeout(resolve, 50));
      const stored = localStorage.getItem("supabase_user");
      const user = stored ? JSON.parse(stored) : null;
      return { data: { user }, error: null };
    },
    onAuthStateChange(callback: (event: string, session: any | null) => void) {
      const stored = localStorage.getItem("supabase_user");
      const user = stored ? JSON.parse(stored) : null;
      const session = user ? { user } : null;
      callback("INITIAL_SESSION", session);
      return { data: { subscription: { unsubscribe: () => {} } } };
    },
  },

  // --- SEMUA FUNGSI DATA YANG DIKEMBALIKAN ---
  async getEmployees(): Promise<Employee[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...mockEmployees];
  },
  async getEmployee(id: string): Promise<Employee | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockEmployees.find(e => e.id === id) || null;
  },
  async getLeaveRequests(employeeId?: string): Promise<LeaveRequest[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    if (employeeId) return mockLeaveRequests.filter(lr => lr.employee_id === employeeId);
    return [...mockLeaveRequests];
  },
  async submitLeaveRequest(request: Omit<LeaveRequest, "id" | "created_at" | "updated_at">): Promise<LeaveRequest> {
    const newRequest: LeaveRequest = { ...request, id: `leave-${Date.now()}`, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
    mockLeaveRequests.unshift(newRequest);
    return newRequest;
  },
  async getAttendanceRecords(employeeId?: string): Promise<AttendanceRecord[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    if (employeeId) return mockAttendance.filter(a => a.employee_id === employeeId);
    return [...mockAttendance];
  },
  async checkIn(employeeId: string): Promise<AttendanceRecord> {
    const now = new Date();
    const record: AttendanceRecord = { id: `att-${Date.now()}`, employee_id: employeeId, employee_name: mockEmployees.find(e => e.id === employeeId)?.name || "Unknown", date: now.toISOString().split("T")[0], check_in: now.toTimeString().split(" ")[0], check_out: null, status: now.getHours() > 9 ? "late" : "present", created_at: now.toISOString(), updated_at: now.toISOString() };
    mockAttendance.unshift(record);
    return record;
  },
  async checkOut(employeeId: string): Promise<AttendanceRecord> {
    const now = new Date();
    const todayRecord = mockAttendance.find(a => a.employee_id === employeeId && a.date === now.toISOString().split("T")[0] && !a.check_out);
    if (todayRecord && todayRecord.check_in) {
      todayRecord.check_out = now.toTimeString().split(" ")[0];
      const checkInTime = new Date(`1970-01-01T${todayRecord.check_in}`);
      const diffMs = now.getTime() - checkInTime.getTime();
      todayRecord.hours_worked = Math.round((diffMs / 3600000) * 100) / 100;
      return todayRecord;
    }
    throw new Error("No check-in record found for today");
  },
  async getDocuments(): Promise<Document[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return getStoredDocuments();
  },
  async uploadDocument(docData: Omit<Document, 'id' | 'downloadCount' | 'uploadDate'>): Promise<Document> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const currentDocs = getStoredDocuments();
    const newDoc: Document = { ...docData, id: Date.now(), downloadCount: 0, uploadDate: new Date().toISOString().split("T")[0] };
    setStoredDocuments([newDoc, ...currentDocs]);
    return newDoc;
  },
  async deleteDocument(docId: number): Promise<{ success: boolean }> {
    await new Promise(resolve => setTimeout(resolve, 300));
    setStoredDocuments(getStoredDocuments().filter(d => d.id !== docId));
    return { success: true };
  },
  async getNotifications(userId?: string): Promise<Notification[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    if (userId) return mockNotifications.filter(n => n.user_id === userId);
    return [...mockNotifications];
  },
  async markNotificationAsRead(notificationId: string): Promise<void> {
    const notification = mockNotifications.find(n => n.id === notificationId);
    if (notification) notification.read = true;
  },
};