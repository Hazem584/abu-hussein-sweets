import { siteConfig } from '../config/siteConfig.js'

export const getCleanWhatsAppNumber = () => {
  const configuredNumber =
    import.meta.env.VITE_WHATSAPP_NUMBER || siteConfig.whatsappNumber

  return String(configuredNumber || '').replace(/\D/g, '')
}

export const isValidWhatsAppNumber = (phoneNumber) =>
  /^[1-9]\d{9,14}$/.test(phoneNumber)

export const createWhatsAppUrl = (orderMessage = '') => {
  const cleanPhoneNumber = getCleanWhatsAppNumber()

  if (!isValidWhatsAppNumber(cleanPhoneNumber)) return ''

  const messageQuery = orderMessage
    ? `?text=${encodeURIComponent(orderMessage)}`
    : ''

  return `https://wa.me/${cleanPhoneNumber}${messageQuery}`
}
