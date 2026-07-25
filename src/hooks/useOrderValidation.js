import { useCallback, useState } from 'react'
import {
  isCustomerFieldValid,
  validateCustomerDetails,
} from '../utils/validateCustomerDetails.js'

const INITIAL_CUSTOMER_DETAILS = {
  name: '',
  phone: '',
  address: '',
  notes: '',
}

export const useOrderValidation = () => {
  const [customerDetails, setCustomerDetails] = useState(
    INITIAL_CUSTOMER_DETAILS,
  )
  const [validationErrors, setValidationErrors] = useState({})
  const [missingFields, setMissingFields] = useState([])

  const updateCustomerDetail = useCallback((fieldName, value) => {
    setCustomerDetails((current) => ({ ...current, [fieldName]: value }))

    if (isCustomerFieldValid(fieldName, value)) {
      setValidationErrors((current) => {
        if (!current[fieldName]) return current

        const nextErrors = { ...current }
        delete nextErrors[fieldName]
        return nextErrors
      })
    }
  }, [])

  const validate = useCallback(() => {
    const result = validateCustomerDetails(customerDetails)
    setCustomerDetails(result.normalizedDetails)
    setValidationErrors(result.errors)
    setMissingFields(result.missingFields)
    return result
  }, [customerDetails])

  const clearValidation = useCallback(() => {
    setValidationErrors({})
    setMissingFields([])
  }, [])

  return {
    customerDetails,
    validationErrors,
    missingFields,
    updateCustomerDetail,
    validate,
    clearValidation,
  }
}
