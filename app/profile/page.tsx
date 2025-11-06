"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "@/lib/theme-provider"

export default function ProfilePage() {
  const router = useRouter()
  const { theme, toggleTheme } = useTheme()
  const [name, setName] = useState("João Silva")
  const [email, setEmail] = useState("demo@moneta.com")
  const [phone, setPhone] = useState("+55 11 98765-4321")
  const [notifications, setNotifications] = useState(true)

  const handleSave = () => {
    // Demo mode - just show success
    alert("Perfil atualizado com sucesso!")
  }

  const handleLogout = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto p-4 md:p-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-pretty">Configurações de Perfil</h1>
          <p className="text-muted-foreground mt-2">Gerencie suas configurações de conta e preferências</p>
        </div>

        <div className="space-y-6">
          {/* Profile Information Card */}
          <Card>
            <CardHeader>
              <CardTitle>Informações de Perfil</CardTitle>
              <CardDescription>Atualize suas informações pessoais e foto de perfil</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24 border-4 border-primary/20">
                  <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-2xl">
                    JS
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">
                    Mudar Foto
                  </Button>
                  <p className="text-sm text-muted-foreground mt-2">JPG, PNG ou GIF. Máx 2MB.</p>
                </div>
              </div>

              <Separator />

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
              </div>

              <Button onClick={handleSave} className="w-full md:w-auto">
                Salvar Alterações
              </Button>
            </CardContent>
          </Card>

          {/* Security Card */}
          <Card>
            <CardHeader>
              <CardTitle>Segurança</CardTitle>
              <CardDescription>Gerencie sua senha e configurações de segurança</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Senha Atual</Label>
                <Input id="current-password" type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">Nova Senha</Label>
                <Input id="new-password" type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                <Input id="confirm-password" type="password" placeholder="••••••••" />
              </div>
              <Button variant="outline" className="w-full md:w-auto bg-transparent">
                Atualizar Senha
              </Button>
            </CardContent>
          </Card>

          {/* Preferences Card */}
          <Card>
            <CardHeader>
              <CardTitle>Preferências</CardTitle>
              <CardDescription>Personalize sua experiência no aplicativo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notifications">Notificações por Email</Label>
                  <p className="text-sm text-muted-foreground">Receba atualizações por email sobre suas transações</p>
                </div>
                <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="theme-toggle">Tema</Label>
                  <p className="text-sm text-muted-foreground">
                    Tema atual: <span className="capitalize font-medium">{theme === "dark" ? "Escuro" : "Claro"}</span>
                  </p>
                </div>
                <Switch id="theme-toggle" checked={theme === "dark"} onCheckedChange={toggleTheme} />
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone Card */}
          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle className="text-destructive">Zona de Perigo</CardTitle>
              <CardDescription>Ações irreversíveis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-between sm:items-center">
                <div>
                  <p className="font-medium">Sair</p>
                  <p className="text-sm text-muted-foreground">Saia de sua conta</p>
                </div>
                <Button variant="outline" onClick={handleLogout} className="w-full sm:w-auto bg-transparent">
                  Sair
                </Button>
              </div>
              <Separator />
              <div className="flex flex-col sm:flex-row gap-4 justify-between sm:items-center">
                <div>
                  <p className="font-medium text-destructive">Deletar Conta</p>
                  <p className="text-sm text-muted-foreground">Exclua permanentemente sua conta e todos os dados</p>
                </div>
                <Button variant="destructive" className="w-full sm:w-auto">
                  Deletar Conta
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
