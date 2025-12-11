export interface Syndrome {
  id: string
  name: string
  slug: string
  description: string
  createdAt: string
  updatedAt: string
}

export interface Checkbox {
  id: string
  label: string
  category: string
  syndromeId: string
  order: number
}

export interface AnamnesisResponse {
  id: string
  text: string
  mode: "resumido" | "detalhado"
  syndromeId: string
  userId: string
  createdAt: string
}

export interface CreateAnamnesisRequest {
  syndromeId: string
  checkboxIds: string[]
  mode: "resumido" | "detalhado"
  additionalNotes?: string
}

export interface User {
  id: string
  email: string
  name?: string
  createdAt: string
}
