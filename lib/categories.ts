export interface Category {
  id: string
  name: string
  icon: string
  color: string
}

export const defaultCategories: Category[] = [
  { id: "1", name: "Alimentação", icon: "🍔", color: "#FF6B6B" },
  { id: "2", name: "Transporte", icon: "🚗", color: "#4ECDC4" },
  { id: "3", name: "Entretenimento", icon: "🎮", color: "#95E1D3" },
  { id: "4", name: "Compras", icon: "🛍️", color: "#F38181" },
  { id: "5", name: "Contas", icon: "📄", color: "#AA96DA" },
  { id: "6", name: "Saúde", icon: "🏥", color: "#FCBAD3" },
  { id: "7", name: "Salário", icon: "💰", color: "#00E676" },
  { id: "8", name: "Investimentos", icon: "📈", color: "#6C63FF" },
]

export function getCategories(): Category[] {
  if (typeof window === "undefined") return defaultCategories

  const stored = localStorage.getItem("moneta_categories")
  if (stored) {
    return JSON.parse(stored)
  }
  return defaultCategories
}

export function getCategoryNames(): string[] {
  return getCategories().map((cat) => cat.name)
}
