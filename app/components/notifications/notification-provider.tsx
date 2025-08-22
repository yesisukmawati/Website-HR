"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useSupabaseAuth } from "@/hooks/use-supabase-auth"
import { supabase, type Notification } from "@/lib/supabase"

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  markAsRead: (id: string) => Promise<void>
  markAllAsRead: () => Promise<void>
  addNotification: (notification: Omit<Notification, "id" | "created_at">) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const { user } = useSupabaseAuth()
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    if (user) {
      const fetchNotifications = async () => {
        try {
          const data = await supabase.getNotifications(user.id)
          setNotifications(data)
        } catch (error) {
          console.error("Failed to fetch notifications:", error)
        }
      }

      fetchNotifications()
    }
  }, [user])

  const markAsRead = async (id: string) => {
    try {
      await supabase.markNotificationAsRead(id)
      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
    } catch (error) {
      console.error("Failed to mark notification as read:", error)
    }
  }

  const markAllAsRead = async () => {
    try {
      const unreadIds = notifications.filter((n) => !n.read).map((n) => n.id)
      await Promise.all(unreadIds.map((id) => supabase.markNotificationAsRead(id)))
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error)
    }
  }

  const addNotification = (notification: Omit<Notification, "id" | "created_at">) => {
    const newNotification: Notification = {
      ...notification,
      id: `notif-${Date.now()}`,
      created_at: new Date().toISOString(),
    }
    setNotifications((prev) => [newNotification, ...prev])
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  const value: NotificationContextType = {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    addNotification,
  }

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}
