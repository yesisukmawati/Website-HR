// "use client"

// import { useState, useEffect } from "react"
// import { supabase } from "@/lib/supabase"

// // ---------- Generic Hook ----------
// export function useSupabaseData() {
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)

//   const handleAsync = async (operation: () => Promise<any>): Promise<any | null> => {
//     try {
//       setLoading(true)
//       setError(null)
//       const result = await operation()
//       return result
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "An error occurred")
//       return null
//     } finally {
//       setLoading(false)
//     }
//   }

//   return {
//     loading,
//     error,
//     handleAsync,
//   }
// }

// // ---------- Employees ----------
// export function useEmployees() {
//   const [employees, setEmployees] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const { data } = await supabase.getEmployees()
//         setEmployees(data)
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "Failed to fetch employees")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchEmployees()
//   }, [])

//   return { employees, loading, error, refetch: () => setLoading(true) }
// }

// // ---------- Leave Requests ----------
// export function useLeaveRequests(employeeId?: string) {
//   const [leaveRequests, setLeaveRequests] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     const fetchLeaveRequests = async () => {
//       try {
//         const { data } = await supabase.from("leave_requests").select().eq("employee_id", employeeId)
//         setLeaveRequests(data)
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "Failed to fetch leave requests")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchLeaveRequests()
//   }, [employeeId])

//   const submitLeaveRequest = async (request: any) => {
//     try {
//       setLoading(true)
//       const { data } = await supabase.from("leave_requests").insert([request])
//       setLeaveRequests((prev) => [data[0], ...prev])
//       return data[0]
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Failed to submit leave request")
//       return null
//     } finally {
//       setLoading(false)
//     }
//   }

//   return { leaveRequests, loading, error, submitLeaveRequest }
// }

// // ---------- Attendance ----------
// export function useAttendance(employeeId?: string) {
//   const [attendance, setAttendance] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     const fetchAttendance = async () => {
//       try {
//         const { data } = await supabase.from("attendance").select().eq("employee_id", employeeId)
//         setAttendance(data)
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "Failed to fetch attendance")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchAttendance()
//   }, [employeeId])

//   const checkIn = async (employeeId: string) => {
//     try {
//       setLoading(true)
//       const { data } = await supabase.from("attendance").insert([{ employee_id: employeeId, check_in: new Date() }])
//       setAttendance((prev) => [data[0], ...prev])
//       return data[0]
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Failed to check in")
//       return null
//     } finally {
//       setLoading(false)
//     }
//   }

//   const checkOut = async (employeeId: string) => {
//     try {
//       setLoading(true)
//       const { data } = await supabase
//         .from("attendance")
//         .update({ check_out: new Date() })
//         .eq("employee_id", employeeId)
//         .select()
//       setAttendance((prev) => prev.map((a) => (a.id === data[0].id ? data[0] : a)))
//       return data[0]
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Failed to check out")
//       return null
//     } finally {
//       setLoading(false)
//     }
//   }

//   return { attendance, loading, error, checkIn, checkOut }
// }

// // ---------- Documents ----------
// export function useDocuments() {
//   const [documents, setDocuments] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     const fetchDocuments = async () => {
//       try {
//         const { data } = await supabase.from("documents").select()
//         setDocuments(data)
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "Failed to fetch documents")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchDocuments()
//   }, [])

//   return { documents, loading, error }
// }

// // ---------- Notifications ----------
// export function useNotifications(userId?: string) {
//   const [notifications, setNotifications] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const { data } = await supabase.from("notifications").select().eq("user_id", userId)
//         setNotifications(data)
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "Failed to fetch notifications")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchNotifications()
//   }, [userId])

//   const markAsRead = async (notificationId: string) => {
//     try {
//       await supabase.from("notifications").update({ read: true }).eq("id", notificationId)
//       setNotifications((prev) => prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n)))
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Failed to mark notification as read")
//     }
//   }

//   return { notifications, loading, error, markAsRead }
// }
"use client"

import { useState, useEffect } from "react"
// IMPORT SEMUA TIPE DATA YANG DIPERLUKAN DARI FILE MOCK
import {
  supabase,
  type Employee,
  type LeaveRequest,
  type AttendanceRecord,
  type Document,
  type Notification,
} from "@/lib/supabase"

// ---------- Generic Hook (Tidak perlu diubah, sudah bagus) ----------
export function useSupabaseData() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAsync = async (operation: () => Promise<any>): Promise<any | null> => {
    try {
      setLoading(true)
      setError(null)
      const result = await operation()
      return result
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      return null
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    handleAsync,
  }
}

// ---------- Employees ----------
export function useEmployees() {
  // TAMBAHKAN TIPE Employee[]
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true)
        // PANGGIL FUNGSI MOCK LANGSUNG
        const data = await supabase.getEmployees()
        setEmployees(data || []) // Beri fallback jika data null
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch employees")
      } finally {
        setLoading(false)
      }
    }

    fetchEmployees()
  }, [])

  const refetch = async () => {
     setLoading(true);
     try {
       const data = await supabase.getEmployees();
       setEmployees(data || []);
     } catch (err) {
       setError(err instanceof Error ? err.message : "Failed to refetch employees");
     } finally {
       setLoading(false);
     }
  }

  return { employees, loading, error, refetch }
}

// ---------- Leave Requests ----------
export function useLeaveRequests(employeeId?: string) {
  // TAMBAHKAN TIPE LeaveRequest[]
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!employeeId) return
    const fetchLeaveRequests = async () => {
      try {
        setLoading(true)
        // PANGGIL FUNGSI MOCK LANGSUNG
        const data = await supabase.getLeaveRequests(employeeId)
        setLeaveRequests(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch leave requests")
      } finally {
        setLoading(false)
      }
    }

    fetchLeaveRequests()
  }, [employeeId])

  const submitLeaveRequest = async (request: Omit<LeaveRequest, "id" | "created_at" | "updated_at">) => {
    try {
      setLoading(true)
      // PANGGIL FUNGSI MOCK LANGSUNG
      const newRequest = await supabase.submitLeaveRequest(request)
      if (newRequest) {
        setLeaveRequests((prev) => [newRequest, ...prev])
      }
      return newRequest
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit leave request")
      return null
    } finally {
      setLoading(false)
    }
  }

  return { leaveRequests, loading, error, submitLeaveRequest }
}

// ---------- Attendance ----------
export function useAttendance(employeeId?: string) {
  // TAMBAHKAN TIPE AttendanceRecord[]
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!employeeId) return
    const fetchAttendance = async () => {
      try {
        setLoading(true)
        // PANGGIL FUNGSI MOCK LANGSUNG
        const data = await supabase.getAttendanceRecords(employeeId)
        setAttendance(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch attendance")
      } finally {
        setLoading(false)
      }
    }

    fetchAttendance()
  }, [employeeId])

  const checkIn = async (employeeId: string) => {
    try {
      setLoading(true)
      // PANGGIL FUNGSI MOCK LANGSUNG
      const newRecord = await supabase.checkIn(employeeId)
      if (newRecord) {
        setAttendance((prev) => [newRecord, ...prev])
      }
      return newRecord
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to check in")
      return null
    } finally {
      setLoading(false)
    }
  }

  const checkOut = async (employeeId: string) => {
    try {
      setLoading(true)
      // PANGGIL FUNGSI MOCK LANGSUNG
      const updatedRecord = await supabase.checkOut(employeeId)
      if (updatedRecord) {
        setAttendance((prev) =>
          prev.map((a) => (a.id === updatedRecord.id ? updatedRecord : a))
        )
      }
      return updatedRecord
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to check out")
      return null
    } finally {
      setLoading(false)
    }
  }

  return { attendance, loading, error, checkIn, checkOut }
}

// ---------- Documents ----------
export function useDocuments() {
  // TAMBAHKAN TIPE Document[]
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoading(true)
        // PANGGIL FUNGSI MOCK LANGSUNG
        const data = await supabase.getDocuments()
        setDocuments(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch documents")
      } finally {
        setLoading(false)
      }
    }

    fetchDocuments()
  }, [])

  return { documents, loading, error }
}

// ---------- Notifications ----------
export function useNotifications(userId?: string) {
  // TAMBAHKAN TIPE Notification[]
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading]=useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) return
    const fetchNotifications = async () => {
      try {
        setLoading(true)
        // PANGGIL FUNGSI MOCK LANGSUNG
        const data = await supabase.getNotifications(userId)
        setNotifications(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch notifications")
      } finally {
        setLoading(false)
      }
    }

    fetchNotifications()
  }, [userId])

  const markAsRead = async (notificationId: string) => {
    try {
      // PANGGIL FUNGSI MOCK LANGSUNG
      await supabase.markNotificationAsRead(notificationId)
      setNotifications((prev) =>
        prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to mark notification as read")
    }
  }

  return { notifications, loading, error, markAsRead }
}