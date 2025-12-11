import { apiClient } from "@/lib/api-client"
import type { Syndrome, Checkbox } from "@/types/api"

export const syndromeService = {
  async getAll(): Promise<Syndrome[]> {
    return apiClient.get<Syndrome[]>("/api/syndromes")
  },

  async getById(id: string): Promise<Syndrome> {
    return apiClient.get<Syndrome>(`/api/syndromes/${id}`)
  },

  async getBySlug(slug: string): Promise<Syndrome> {
    return apiClient.get<Syndrome>(`/api/syndromes/slug/${slug}`)
  },

  async getCheckboxes(syndromeId: string): Promise<Checkbox[]> {
    return apiClient.get<Checkbox[]>(`/api/syndromes/${syndromeId}/checkboxes`)
  },
}
