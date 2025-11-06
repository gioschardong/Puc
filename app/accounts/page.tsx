"use client"

import { useState, useEffect } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, Plus, Edit2, Trash2 } from "lucide-react"
import { cn, formatCurrency } from "@/lib/utils"
import type { Account } from "@/lib/accounts"
import { getAccounts, addAccount, updateAccount, deleteAccount } from "@/lib/accounts"

const ACCOUNT_TYPES = [
  { value: "checking", label: "Conta Corrente" },
  { value: "savings", label: "Conta Poupança" },
  { value: "credit_card", label: "Cartão de Crédito" },
  { value: "investment", label: "Investimento" },
]

const COLORS = [
  "#6C63FF", // Purple
  "#00E676", // Lime Green
  "#FF6B6B", // Red
  "#4ECDC4", // Teal
  "#FFE66D", // Yellow
  "#FF8C42", // Orange
  "#A8E6CF", // Light Green
  "#FFD3B6", // Peach
]

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newAccount, setNewAccount] = useState({
    name: "",
    type: "checking" as const,
    balance: 0,
    currency: "BRL",
    color: "#6C63FF",
  })

  useEffect(() => {
    setAccounts(getAccounts())
    setLoading(false)
  }, [])

  const handleAddAccount = () => {
    if (!newAccount.name.trim()) return

    if (editingId) {
      updateAccount(editingId, newAccount)
      setEditingId(null)
    } else {
      addAccount(newAccount)
    }

    setNewAccount({
      name: "",
      type: "checking",
      balance: 0,
      currency: "BRL",
      color: "#6C63FF",
    })
    setAccounts(getAccounts())
    setOpen(false)
  }

  const handleEdit = (account: Account) => {
    setNewAccount({
      name: account.name,
      type: account.type,
      balance: account.balance,
      currency: account.currency,
      color: account.color,
    })
    setEditingId(account.id)
    setOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza de que deseja excluir esta conta?")) {
      deleteAccount(id)
      setAccounts(getAccounts())
    }
  }

  const handleCloseDialog = () => {
    setOpen(false)
    setEditingId(null)
    setNewAccount({
      name: "",
      type: "checking",
      balance: 0,
      currency: "BRL",
      color: "#6C63FF",
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <main className="container mx-auto px-4 py-8">
          <p className="text-muted-foreground">Carregando contas...</p>
        </main>
      </div>
    )
  }

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0)

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Minhas Contas</h1>
              <p className="text-muted-foreground mt-2">Gerencie suas contas financeiras e acompanhe saldos</p>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              <Button onClick={() => setOpen(true)} className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Conta
              </Button>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingId ? "Editar Conta" : "Criar Nova Conta"}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nome da Conta</Label>
                    <Input
                      id="name"
                      placeholder="ex: Conta Poupança"
                      value={newAccount.name}
                      onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="type">Tipo de Conta</Label>
                    <Select
                      value={newAccount.type}
                      onValueChange={(value: any) => setNewAccount({ ...newAccount, type: value })}
                    >
                      <SelectTrigger id="type" className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {ACCOUNT_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="balance">Saldo</Label>
                    <Input
                      id="balance"
                      type="number"
                      placeholder="0.00"
                      value={newAccount.balance}
                      onChange={(e) =>
                        setNewAccount({ ...newAccount, balance: Number.parseFloat(e.target.value) || 0 })
                      }
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="currency">Moeda (código ISO)</Label>
                    <Input
                      id="currency"
                      placeholder="BRL"
                      value={newAccount.currency}
                      onChange={(e) => setNewAccount({ ...newAccount, currency: e.target.value.toUpperCase() })}
                      maxLength={3}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label>Cor</Label>
                    <div className="grid grid-cols-4 gap-2 mt-2">
                      {COLORS.map((color) => (
                        <button
                          key={color}
                          onClick={() => setNewAccount({ ...newAccount, color })}
                          className={cn(
                            "w-10 h-10 rounded-lg border-2 transition-all",
                            newAccount.color === color ? "border-primary scale-110" : "border-border",
                          )}
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={handleCloseDialog}>
                    Cancelar
                  </Button>
                  <Button onClick={handleAddAccount} className="bg-primary hover:bg-primary/90">
                    {editingId ? "Atualizar Conta" : "Criar Conta"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Summary Card */}
          <Card className="border-border/50 shadow-lg">
            <CardHeader>
              <CardTitle>Saldo Total</CardTitle>
              <CardDescription>Saldo combinado em todas as contas</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-primary">
                {formatCurrency(totalBalance)}
              </p>
            </CardContent>
          </Card>

          {/* Accounts Grid */}
          {accounts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {accounts.map((account) => (
                <Card key={account.id} className="hover:shadow-lg transition-shadow border-border/50">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{account.name}</CardTitle>
                        <CardDescription className="text-xs capitalize mt-1">
                          {ACCOUNT_TYPES.find((t) => t.value === account.type)?.label}
                        </CardDescription>
                      </div>
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                        style={{ backgroundColor: account.color }}
                      >
                        {account.name.charAt(0).toUpperCase()}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Saldo</p>
                      <p
                        className={cn(
                          "text-2xl font-bold",
                          account.balance < 0 ? "text-destructive" : "text-secondary",
                        )}
                      >
                        {formatCurrency(account.balance, account.currency || "BRL")}
                      </p>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 bg-transparent"
                        onClick={() => handleEdit(account)}
                      >
                        <Edit2 className="w-4 h-4 mr-1" />
                        Editar
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 text-destructive hover:text-destructive bg-transparent"
                        onClick={() => handleDelete(account.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Deletar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12">
              <CardContent className="text-center">
                <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium">Nenhuma conta ainda</p>
                <p className="text-muted-foreground text-sm mt-2">Crie sua primeira conta para começar</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
