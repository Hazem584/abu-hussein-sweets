import { WEIGHT_OPTIONS } from '../constants/weights.js'

export const formatWeight = (weight) => {
  const numericWeight = Number(weight)

  return (
    WEIGHT_OPTIONS.find((option) => option.value === numericWeight)?.label ||
    `${numericWeight} كيلو`
  )
}
