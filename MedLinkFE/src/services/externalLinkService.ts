import type { Doctor } from '../models/doctor'

const getDoctorName = (doctor: Doctor) => `${doctor.firstName} ${doctor.lastName}`

export const externalLinkService = {
  buildWhatsAppUrl(doctor: Doctor): string {
    const message = `Bonjour Dr ${getDoctorName(doctor)}, je souhaiterais prendre un rendez-vous.`
    return `https://wa.me/${doctor.whatsappNumber}?text=${encodeURIComponent(message)}`
  },

  buildMapUrl(doctor: Doctor): string {
    const coordinates = `${doctor.latitude},${doctor.longitude}`
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(coordinates)}`
  },
}
