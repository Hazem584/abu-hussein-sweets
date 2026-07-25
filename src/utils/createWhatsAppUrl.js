import { siteConfig } from '../config/siteConfig.js'

export const getConfiguredWhatsAppNumber = () =>
  import.meta.env.VITE_WHATSAPP_NUMBER || siteConfig.whatsappNumber

export const sanitizeWhatsAppNumber = (phoneNumber) =>
  String(phoneNumber || '').replace(/\D/g, '')

export const getCleanWhatsAppNumber = () => {
  return sanitizeWhatsAppNumber(getConfiguredWhatsAppNumber())
}

export const isValidWhatsAppNumber = (phoneNumber) =>
  /^[1-9]\d{9,14}$/.test(sanitizeWhatsAppNumber(phoneNumber))

export const createWhatsAppUrl = (phoneNumber, orderMessage = '') => {
  const cleanPhoneNumber = sanitizeWhatsAppNumber(phoneNumber)

  if (!isValidWhatsAppNumber(cleanPhoneNumber)) {
    throw new TypeError('A valid international WhatsApp number is required.')
  }

  const messageQuery = orderMessage
    ? `?text=${encodeURIComponent(orderMessage)}`
    : ''

  return `https://wa.me/${cleanPhoneNumber}${messageQuery}`
}
