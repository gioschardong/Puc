export interface Transaction {
  id: string
  date: string
  category: string
  description: string
  amount: number
  type: "income" | "expense"
  account: string
}

export interface Goal {
  id: string
  name: string
  target: number
  current: number
  deadline: string
  color: string
}

export interface Alert {
  id: string
  type: string
  condition: string
  status: "active" | "inactive"
}

export const demoTransactions: Transaction[] = [
  {
    id: "1",
    date: "2025-01-15",
    category: "Salário",
    description: "Salário Mensal",
    amount: 5000,
    type: "income",
    account: "Conta Principal",
  },
  {
    id: "2",
    date: "2025-01-14",
    category: "Alimentação",
    description: "Compras no Mercado",
    amount: -150,
    type: "expense",
    account: "Conta Principal",
  },
  {
    id: "3",
    date: "2025-01-13",
    category: "Transporte",
    description: "Corrida de App",
    amount: -25,
    type: "expense",
    account: "Conta Principal",
  },
  {
    id: "4",
    date: "2025-01-12",
    category: "Entretenimento",
    description: "Assinatura Netflix",
    amount: -15,
    type: "expense",
    account: "Conta Principal",
  },
  {
    id: "5",
    date: "2025-01-11",
    category: "Compras",
    description: "Compra Online",
    amount: -80,
    type: "expense",
    account: "Cartão de Crédito",
  },
  {
    id: "6",
    date: "2025-01-10",
    category: "Contas",
    description: "Conta de Luz",
    amount: -120,
    type: "expense",
    account: "Conta Principal",
  },
  {
    id: "7",
    date: "2025-01-09",
    category: "Alimentação",
    description: "Restaurante",
    amount: -60,
    type: "expense",
    account: "Cartão de Crédito",
  },
  {
    id: "8",
    date: "2025-01-08",
    category: "Saúde",
    description: "Farmácia",
    amount: -45,
    type: "expense",
    account: "Conta Principal",
  },
]

export const demoGoals: Goal[] = [
  {
    id: "1",
    name: "Fundo de Emergência",
    target: 10000,
    current: 6500,
    deadline: "2025-12-31",
    color: "bg-primary",
  },
  {
    id: "2",
    name: "Viagem de Férias",
    target: 3000,
    current: 1200,
    deadline: "2025-06-30",
    color: "bg-secondary",
  },
  {
    id: "3",
    name: "Novo Notebook",
    target: 2000,
    current: 1800,
    deadline: "2025-03-31",
    color: "bg-chart-3",
  },
  {
    id: "4",
    name: "Portfólio de Investimentos",
    target: 15000,
    current: 8500,
    deadline: "2025-12-31",
    color: "bg-chart-4",
  },
]

export const demoAlerts: Alert[] = [
  {
    id: "1",
    type: "Limite de Orçamento",
    condition: "Gastos com alimentação > R$ 500/mês",
    status: "active",
  },
  {
    id: "2",
    type: "Saldo Baixo",
    condition: "Saldo da conta < R$ 1.000",
    status: "active",
  },
  {
    id: "3",
    type: "Prazo da Meta",
    condition: "Meta Viagem de Férias se aproximando",
    status: "inactive",
  },
  {
    id: "4",
    type: "Grande Transação",
    condition: "Transação única > R$ 500",
    status: "active",
  },
]

export function calculateMonthlyStats(transactions: Transaction[]) {
  const income = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

  const expenses = Math.abs(transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0))

  const balance = income - expenses

  return { income, expenses, balance }
}

export function getCategoryDistribution(transactions: Transaction[]) {
  const expensesByCategory: Record<string, number> = {}

  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      const amount = Math.abs(t.amount)
      expensesByCategory[t.category] = (expensesByCategory[t.category] || 0) + amount
    })

  return Object.entries(expensesByCategory).map(([name, value]) => ({
    name,
    value,
  }))
}

export function getMonthlyBalanceData() {
  return [
    { month: "Jul", balance: 3200 },
    { month: "Ago", balance: 3800 },
    { month: "Set", balance: 4200 },
    { month: "Out", balance: 4600 },
    { month: "Nov", balance: 4100 },
    { month: "Dez", balance: 4800 },
    { month: "Jan", balance: 5495 },
  ]
}
