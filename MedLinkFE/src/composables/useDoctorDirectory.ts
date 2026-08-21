import { computed, onMounted, ref } from 'vue'
import type { City } from '../models/city'
import type { Doctor } from '../models/doctor'
import type { Specialty } from '../models/specialty'
import { cityService } from '../services/cityService'
import { doctorService } from '../services/doctorService'
import { specialtyService } from '../services/specialtyService'

export const useDoctorDirectory = () => {
  const cities = ref<City[]>([])
  const specialties = ref<Specialty[]>([])
  const doctors = ref<Doctor[]>([])
  const selectedCityId = ref('')
  const selectedSpecialtyId = ref('')
  const isInitializing = ref(true)
  const isLoadingDoctors = ref(false)
  const initializationError = ref('')
  const doctorSearchError = ref('')
  let latestSearchId = 0

  const selectedCity = computed(
    () => cities.value.find((city) => city.id === selectedCityId.value) ?? null,
  )
  const selectedSpecialty = computed(
    () => specialties.value.find((specialty) => specialty.id === selectedSpecialtyId.value) ?? null,
  )

  const loadFilters = async () => {
    isInitializing.value = true
    initializationError.value = ''

    try {
      const [availableCities, availableSpecialties] = await Promise.all([
        cityService.getAll(),
        specialtyService.getAll(),
      ])
      cities.value = availableCities
      specialties.value = availableSpecialties
    } catch {
      initializationError.value = 'Une erreur est survenue lors du chargement de MedLink.'
    } finally {
      isInitializing.value = false
    }
  }

  const searchDoctors = async () => {
    if (!selectedCityId.value || !selectedSpecialtyId.value) {
      doctors.value = []
      return
    }

    const searchId = ++latestSearchId
    isLoadingDoctors.value = true
    doctorSearchError.value = ''

    try {
      const matches = await doctorService.search({
        cityId: selectedCityId.value,
        specialtyId: selectedSpecialtyId.value,
      })

      if (searchId === latestSearchId) {
        doctors.value = matches
      }
    } catch {
      if (searchId === latestSearchId) {
        doctors.value = []
        doctorSearchError.value = 'Une erreur est survenue lors du chargement des médecins.'
      }
    } finally {
      if (searchId === latestSearchId) {
        isLoadingDoctors.value = false
      }
    }
  }

  const selectCity = (cityId: string) => {
    if (selectedCityId.value === cityId) return
    latestSearchId += 1
    selectedCityId.value = cityId
    selectedSpecialtyId.value = ''
    doctors.value = []
    doctorSearchError.value = ''
    isLoadingDoctors.value = false
  }

  const selectSpecialty = async (specialtyId: string) => {
    if (!selectedCityId.value) return
    selectedSpecialtyId.value = specialtyId
    await searchDoctors()
  }

  onMounted(loadFilters)

  return {
    cities,
    specialties,
    doctors,
    selectedCityId,
    selectedSpecialtyId,
    selectedCity,
    selectedSpecialty,
    isInitializing,
    isLoadingDoctors,
    initializationError,
    doctorSearchError,
    loadFilters,
    searchDoctors,
    selectCity,
    selectSpecialty,
  }
}
