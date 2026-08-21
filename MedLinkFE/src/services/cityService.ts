import { cities } from '../mocks/cities'
import type { City } from '../models/city'

export interface CityService {
  getAll(): Promise<City[]>
}

export const cityService: CityService = {
  async getAll() {
    return cities.map((city) => ({ ...city }))
  },
}
