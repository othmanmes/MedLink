import { specialties } from '../mocks/specialties'
import type { Specialty } from '../models/specialty'

export interface SpecialtyService {
  getAll(): Promise<Specialty[]>
}

export const specialtyService: SpecialtyService = {
  async getAll() {
    return specialties.map((specialty) => ({ ...specialty }))
  },
}
