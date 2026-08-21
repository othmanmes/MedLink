import { doctors } from '../mocks/doctors'
import type { Doctor } from '../models/doctor'

export interface DoctorSearchCriteria {
  cityId: string
  specialtyId: string
}

export interface DoctorService {
  search(criteria: DoctorSearchCriteria): Promise<Doctor[]>
}

export const doctorService: DoctorService = {
  async search({ cityId, specialtyId }) {
    return doctors
      .filter(
        (doctor) => doctor.cityId === cityId && doctor.specialtyIds.includes(specialtyId),
      )
      .map((doctor) => ({ ...doctor, specialtyIds: [...doctor.specialtyIds] }))
  },
}
