"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Users,
  Loader2,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Clock,
  UserCheck,
  Trash2,
  RefreshCw,
  BookOpen,
  HandHeart,
  LogOut,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ConfirmDialog } from "@/components/admin/confirm-dialog"

interface User {
  id: string
  name: string
  email: string
  role: string
  createdAt: string
  _count: {
    blogPosts: number
    volunteerPosts: number
  }
}

const roleConfig: Record<
  string,
  { label: string; color: string; icon: React.ReactNode; description: string }
> = {
  PENDING: {
    label: "Pending",
    color: "bg-yellow-100 text-yellow-800 border-yellow-300",
    icon: <Clock className="h-3.5 w-3.5" />,
    description: "Wacht op goedkeuring",
  },
  USER: {
    label: "Gebruiker",
    color: "bg-blue-100 text-blue-800 border-blue-300",
    icon: <Users className="h-3.5 w-3.5" />,
    description: "Normaal account",
  },
  VERIFIED: {
    label: "Geverifieerd",
    color: "bg-green-100 text-green-800 border-green-300",
    icon: <UserCheck className="h-3.5 w-3.5" />,
    description: "Kan blogs en vrijwilligersposts beheren",
  },
  WIJSNEUZEN: {
    label: "Wijsneuzen",
    color: "bg-purple-100 text-purple-800 border-purple-300",
    icon: <ShieldCheck className="h-3.5 w-3.5" />,
    description: "Volledige beheertoegang",
  },
}

export default function UsersAdminPage() {
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState<{
    type: "success" | "error"
    message: string
  } | null>(null)
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [deleteUser, setDeleteUser] = useState<User | null>(null)

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/users")
      if (res.status === 403) {
        router.push("/admin")
        return
      }
      if (!res.ok) throw new Error("Failed to fetch")
      const data = await res.json()
      setUsers(data)
    } catch {
      setStatus({ type: "error", message: "Kon gebruikers niet laden." })
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const handleRoleChange = async (userId: string, newRole: string) => {
    setUpdatingId(userId)
    setStatus(null)

    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Fout bij wijzigen")
      }

      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
      )
      setStatus({
        type: "success",
        message: `Rol bijgewerkt naar ${roleConfig[newRole]?.label || newRole}`,
      })
    } catch (err: any) {
      setStatus({ type: "error", message: err.message })
    } finally {
      setUpdatingId(null)
    }
  }

  const handleDelete = async () => {
    if (!deleteUser) return

    try {
      const res = await fetch(`/api/admin/users/${deleteUser.id}`, {
        method: "DELETE",
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Verwijderen mislukt")
      }

      setUsers((prev) => prev.filter((u) => u.id !== deleteUser.id))
      setStatus({ type: "success", message: "Gebruiker verwijderd." })
    } catch (err: any) {
      setStatus({ type: "error", message: err.message })
    } finally {
      setDeleteUser(null)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      router.push("/login")
      router.refresh()
    } catch {
      router.push("/login")
    }
  }

  const pendingCount = users.filter((u) => u.role === "PENDING").length

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-primary" />
            <h1 className="font-display text-xl font-bold text-foreground">
              Gebruikersbeheer
            </h1>
            {pendingCount > 0 && (
              <Badge variant="destructive" className="text-xs">
                {pendingCount} wachtend
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={fetchUsers}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Vernieuwen
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Dashboard
              </Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="text-destructive hover:text-destructive"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Uitloggen
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Status */}
          {status && (
            <div
              className={`mb-6 flex items-center gap-2 rounded-lg p-3 text-sm ${
                status.type === "success"
                  ? "bg-green-50 text-green-800 border border-green-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              {status.type === "success" ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              {status.message}
            </div>
          )}

          {/* Role Legend */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {Object.entries(roleConfig).map(([key, config]) => (
              <div
                key={key}
                className="flex items-center gap-2 p-3 rounded-lg border bg-card"
              >
                <div className={`p-1.5 rounded ${config.color}`}>
                  {config.icon}
                </div>
                <div>
                  <p className="text-sm font-medium">{config.label}</p>
                  <p className="text-xs text-muted-foreground">
                    {config.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : users.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Users className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">
                  Geen gebruikers gevonden.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {/* Pending users first */}
              {users
                .sort((a, b) => {
                  const roleOrder = { PENDING: 0, USER: 1, VERIFIED: 2, WIJSNEUZEN: 3 }
                  const orderA = roleOrder[a.role as keyof typeof roleOrder] ?? 1
                  const orderB = roleOrder[b.role as keyof typeof roleOrder] ?? 1
                  return orderA - orderB
                })
                .map((user) => {
                  const config = roleConfig[user.role] || roleConfig.USER
                  const isUpdating = updatingId === user.id

                  return (
                    <Card key={user.id} className="border-2">
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          {/* User info */}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-display font-semibold text-foreground">
                                {user.name}
                              </h3>
                              <Badge
                                variant="outline"
                                className={`text-xs ${config.color} border`}
                              >
                                {config.icon}
                                <span className="ml-1">{config.label}</span>
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {user.email}
                            </p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                              <span>
                                Geregistreerd:{" "}
                                {new Date(user.createdAt).toLocaleDateString(
                                  "nl-NL"
                                )}
                              </span>
                              <span className="flex items-center gap-1">
                                <BookOpen className="h-3 w-3" />
                                {user._count.blogPosts} blogs
                              </span>
                              <span className="flex items-center gap-1">
                                <HandHeart className="h-3 w-3" />
                                {user._count.volunteerPosts} vrijwilligers
                              </span>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2">
                            <Select
                              value={user.role}
                              onValueChange={(val) =>
                                handleRoleChange(user.id, val)
                              }
                              disabled={isUpdating}
                            >
                              <SelectTrigger className="w-[160px] border-2">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="PENDING">
                                  <span className="flex items-center gap-2">
                                    <Clock className="h-3.5 w-3.5" />
                                    Pending
                                  </span>
                                </SelectItem>
                                <SelectItem value="USER">
                                  <span className="flex items-center gap-2">
                                    <Users className="h-3.5 w-3.5" />
                                    Gebruiker
                                  </span>
                                </SelectItem>
                                <SelectItem value="VERIFIED">
                                  <span className="flex items-center gap-2">
                                    <UserCheck className="h-3.5 w-3.5" />
                                    Geverifieerd
                                  </span>
                                </SelectItem>
                                <SelectItem value="WIJSNEUZEN">
                                  <span className="flex items-center gap-2">
                                    <ShieldCheck className="h-3.5 w-3.5" />
                                    Wijsneuzen
                                  </span>
                                </SelectItem>
                              </SelectContent>
                            </Select>

                            {isUpdating && (
                              <Loader2 className="h-4 w-4 animate-spin text-primary" />
                            )}

                            <Button
                              variant="outline"
                              size="icon"
                              className="text-destructive hover:text-destructive hover:bg-destructive/10 border-2"
                              onClick={() => setDeleteUser(user)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={!!deleteUser}
        onOpenChange={() => setDeleteUser(null)}
        title="Gebruiker Verwijderen"
        description={`Weet je zeker dat je "${deleteUser?.name}" (${deleteUser?.email}) wilt verwijderen? Dit kan niet ongedaan worden gemaakt.`}
        onConfirm={handleDelete}
        confirmLabel="Verwijderen"
        variant="destructive"
      />
    </div>
  )
}
