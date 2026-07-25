const REQUIRED_FIELDS = [
  {
    key: 'name',
    label: 'الاسم',
    emptyMessage: 'يرجى كتابة الاسم.',
  },
  {
    key: 'phone',
    label: 'رقم الهاتف',
    emptyMessage: 'يرجى كتابة رقم الهاتف.',
  },
  {
    key: 'address',
    label: 'العنوان',
    emptyMessage: 'يرجى كتابة العنوان.',
  },
]

const normalizeDetails = (customerDetails) =>
  Object.fromEntries(
    Object.entries(customerDetails).map(([key, value]) => [
      key,
      String(value).trim(),
    ]),
  )

export const isCustomerFieldValid = (fieldName, value) => {
  const normalizedValue = String(value).trim()

  if (fieldName === 'phone') {
    return normalizedValue.replace(/[^\d٠-٩]/g, '').length >= 8
  }

  return fieldName === 'notes' || Boolean(normalizedValue)
}

export const validateCustomerDetails = (customerDetails) => {
  const normalizedDetails = normalizeDetails(customerDetails)
  const errors = {}
  const missingFields = []

  REQUIRED_FIELDS.forEach(({ key, label, emptyMessage }) => {
    if (isCustomerFieldValid(key, normalizedDetails[key])) return

    const message =
      key === 'phone' && normalizedDetails.phone
        ? 'يرجى كتابة رقم هاتف صحيح.'
        : emptyMessage

    errors[key] = message
    missingFields.push({ key, label })
  })

  return {
    isValid: missingFields.length === 0,
    normalizedDetails,
    errors,
    missingFields,
    firstMissingField: missingFields[0]?.key ?? null,
  }
}
