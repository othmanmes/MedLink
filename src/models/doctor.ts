export interface Doctor {
  id: string
  firstName: string
  lastName: string
  specialtyIds: string[]
  cityId: string
  address: string
  latitude: number
  longitude: number
  whatsappNumber: string
  profileImage: string | null
}
