import { createClient } from "@supabase/supabase-js"

// --- PASTIKAN ANDA SUDAH MEMBUAT FILE .env.local ---
// --- DAN MENGISINYA DENGAN URL & KUNCI ANON DARI SUPABASE ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Membuat client Supabase yang akan digunakan di seluruh aplikasi
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// --- INTERFACE (Tipe Data) - Tetap sama ---
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


// --- FUNGSI-FUNGSI ASLI SUPABASE ---

// Note: Fungsi untuk otentikasi (login, logout, getUser) sudah disediakan
// oleh `supabase.auth`, jadi kita tidak perlu membuatnya lagi di sini.
// Cukup panggil `supabase.auth.signInWithPassword(...)` dll di komponen Anda.


// --- FUNGSI UNTUK INTERAKSI DENGAN TABEL ---

export async function getEmployees(): Promise<Employee[]> {
  const { data, error } = await supabase.from('employees').select('*');
  if (error) {
    console.error("Error fetching employees:", error.message);
    throw error;
  }
  return data || [];
}

export async function getEmployee(id: string): Promise<Employee | null> {
    const { data, error } = await supabase.from('employees').select('*').eq('id', id).single();
    if (error) {
        console.error("Error fetching employee:", error.message);
        throw error;
    }
    return data;
}

export async function getLeaveRequests(employeeId?: string): Promise<LeaveRequest[]> {
    let query = supabase.from('leave_requests').select('*');
    if (employeeId) {
        query = query.eq('employee_id', employeeId);
    }
    const { data, error } = await query;
    if (error) {
        console.error("Error fetching leave requests:", error.message);
        throw error;
    }
    return data || [];
}

export async function submitLeaveRequest(request: Omit<LeaveRequest, "id" | "created_at" | "updated_at">): Promise<LeaveRequest> {
    const { data, error } = await supabase.from('leave_requests').insert(request).select().single();
    if (error) {
        console.error("Error submitting leave request:", error.message);
        throw error;
    }
    return data;
}

export async function getAttendanceRecords(employeeId?: string): Promise<AttendanceRecord[]> {
    let query = supabase.from('attendance').select('*');
    if (employeeId) {
        query = query.eq('employee_id', employeeId);
    }
    const { data, error } = await query.order('date', { ascending: false });
    if (error) {
        console.error("Error fetching attendance records:", error.message);
        throw error;
    }
    return data || [];
}

export async function checkIn(employeeId: string, employeeName: string): Promise<AttendanceRecord> {
    const now = new Date();
    const status = now.getHours() > 9 ? "late" : "present"; // Logika sederhana untuk status 'late'

    const { data, error } = await supabase.from('attendance').insert({
        employee_id: employeeId,
        employee_name: employeeName,
        check_in: now.toISOString(),
        status: status,
    }).select().single();

    if (error) {
        console.error("Error during check-in:", error.message);
        throw error;
    }
    return data;
}


export async function checkOut(attendanceId: string): Promise<AttendanceRecord> {
    const now = new Date();
    // Pertama, ambil data check_in untuk menghitung jam kerja
    const { data: currentRecord, error: fetchError } = await supabase
        .from('attendance')
        .select('check_in')
        .eq('id', attendanceId)
        .single();

    if (fetchError || !currentRecord) {
        console.error("Could not find record to check out:", fetchError?.message);
        throw new Error("Could not find record to check out.");
    }

    const checkInTime = new Date(currentRecord.check_in);
    const diffMs = now.getTime() - checkInTime.getTime();
    const hoursWorked = parseFloat((diffMs / 3600000).toFixed(2)); // Milidetik ke jam

    const { data, error } = await supabase
        .from('attendance')
        .update({
            check_out: now.toISOString(),
            hours_worked: hoursWorked,
        })
        .eq('id', attendanceId)
        .select()
        .single();
    
    if (error) {
        console.error("Error during check-out:", error.message);
        throw error;
    }
    return data;
}


export async function getDocuments(): Promise<Document[]> {
    const { data, error } = await supabase.from('documents').select('*');
    if (error) {
        console.error("Error fetching documents:", error.message);
        throw error;
    }
    return data || [];
}

export async function uploadDocument(file: File, docData: Omit<Document, 'id' | 'url' | 'file_url' | 'name' | 'size' | 'type' | 'uploadDate' | 'downloadCount'>): Promise<Document> {
    // 1. Upload file ke Storage
    const filePath = `${docData.category}/${Date.now()}_${file.name}`;
    const { error: uploadError } = await supabase.storage.from('company_documents').upload(filePath, file);

    if (uploadError) {
        console.error("Error uploading file to storage:", uploadError.message);
        throw uploadError;
    }

    // 2. Dapatkan URL publik dari file yang diupload
    const { data: { publicUrl } } = supabase.storage.from('company_documents').getPublicUrl(filePath);

    // 3. Simpan metadata ke tabel 'documents'
    const { data, error } = await supabase.from('documents').insert({
        ...docData,
        name: file.name,
        file_url: publicUrl,
        url: publicUrl, // Anda mungkin ingin membedakan ini nanti
        size: `${(file.size / 1024).toFixed(2)} KB`,
        type: file.type || 'unknown',
        uploadDate: new Date().toISOString(),
        downloadCount: 0,
    }).select().single();
    
    if (error) {
        console.error("Error saving document metadata:", error.message);
        throw error;
    }
    
    return data;
}

export async function deleteDocument(docId: number): Promise<{ success: boolean }> {
    // Optional: Hapus juga file dari storage jika diperlukan
    const { data: doc, error: fetchError } = await supabase.from('documents').select('file_url').eq('id', docId).single();
    if (fetchError) {
        console.error("Could not fetch document to delete:", fetchError.message);
        // Lanjutkan untuk menghapus record DB
    }
    if (doc) {
        // Ekstrak path file dari URL
        const filePath = doc.file_url.split('/company_documents/')[1];
        await supabase.storage.from('company_documents').remove([filePath]);
    }
    
    const { error } = await supabase.from('documents').delete().eq('id', docId);
    if (error) {
        console.error("Error deleting document:", error.message);
        return { success: false };
    }
    return { success: true };
}

export async function getNotifications(userId: string): Promise<Notification[]> {
    const { data, error } = await supabase.from('notifications').select('*').eq('user_id', userId).order('created_at', { ascending: false });
    if (error) {
        console.error("Error fetching notifications:", error.message);
        throw error;
    }
    return data || [];
}

export async function markNotificationAsRead(notificationId: string): Promise<void> {
    const { error } = await supabase.from('notifications').update({ read: true, isRead: true }).eq('id', notificationId);
    if (error) {
        console.error("Error marking notification as read:", error.message);
        throw error;
    }
}