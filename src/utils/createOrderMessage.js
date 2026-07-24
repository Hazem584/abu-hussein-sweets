import { weightOptions } from '../data/products.js'

const getWeightLabel = (weight) =>
  weightOptions.find((option) => option.value === weight)?.label ||
  `${weight} كيلو`

const formatOrderPrice = (amount) =>
  `${new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  }).format(amount)} جنيه`

const normalizeDetails = (customerDetails) =>
  Object.fromEntries(
    Object.entries(customerDetails).map(([key, value]) => [
      key,
      value.trim(),
    ]),
  )

export const createOrderMessage = (items, totalPrice, customerDetails) => {
  if (!items.length) return ''

  const itemLines = items
    .map((item) => {
      const quantityPrefix = item.quantity > 1 ? `${item.quantity} × ` : ''
      const itemTotal = item.pricePerKg * item.weight * item.quantity

      return `- ${quantityPrefix}${getWeightLabel(item.weight)} ${item.name} — ${formatOrderPrice(itemTotal)}`
    })
    .join('\n')

  const details = normalizeDetails(customerDetails)
  const customerLines = [
    `الاسم: ${details.name}`,
    `رقم الهاتف: ${details.phone}`,
  ]

  if (details.address) customerLines.push(`العنوان: ${details.address}`)
  if (details.notes) customerLines.push(`ملاحظات: ${details.notes}`)

  return `السلام عليكم، أريد تأكيد الطلب التالي:\n\n${itemLines}\n\nالإجمالي: ${formatOrderPrice(
    totalPrice,
  )}\n\n${customerLines.join('\n')}`
}
