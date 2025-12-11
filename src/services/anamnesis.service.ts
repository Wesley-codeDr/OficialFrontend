import { apiClient } from "@/lib/api-client"
import type {
  CreateAnamnesisRequest,
  AnamnesisResponse,
} from "@/types/api"

export const anamnesisService = {
  async create(data: CreateAnamnesisRequest): Promise<AnamnesisResponse> {
    return apiClient.post<AnamnesisResponse>("/api/anamnesis", data)
  },

  async getById(id: string): Promise<AnamnesisResponse> {
    return apiClient.get<AnamnesisResponse>(`/api/anamnesis/${id}`)
  },

  async getUserHistory(userId: string): Promise<AnamnesisResponse[]> {
    return apiClient.get<AnamnesisResponse[]>(`/api/anamnesis/user/${userId}`)
  },
}
