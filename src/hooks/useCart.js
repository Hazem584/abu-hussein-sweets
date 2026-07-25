import { useCallback, useMemo, useState } from 'react'

const createCartItemId = (productId, weight) => `${productId}-${weight}`

export const useCart = () => {
  const [cartItems, setCartItems] = useState([])

  const addToCart = useCallback((product, weight) => {
    setCartItems((currentItems) => {
      const id = createCartItemId(product.id, weight)
      const existingItem = currentItems.find((item) => item.id === id)

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }

      return [
        ...currentItems,
        {
          id,
          productId: product.id,
          name: product.name,
          pricePerKg: product.pricePerKg,
          weight,
          quantity: 1,
        },
      ]
    })
  }, [])

  const updateQuantity = useCallback((productId, weight, change) => {
    const id = createCartItemId(productId, weight)

    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + change }
            : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }, [])

  const updateWeight = useCallback((productId, oldWeight, newWeight) => {
    if (oldWeight === newWeight) return

    setCartItems((currentItems) => {
      const oldId = createCartItemId(productId, oldWeight)
      const newId = createCartItemId(productId, newWeight)
      const editedItem = currentItems.find((item) => item.id === oldId)

      if (!editedItem) return currentItems

      if (currentItems.some((item) => item.id === newId)) {
        return currentItems
          .filter((item) => item.id !== oldId)
          .map((item) =>
            item.id === newId
              ? { ...item, quantity: item.quantity + editedItem.quantity }
              : item,
          )
      }

      return currentItems.map((item) =>
        item.id === oldId
          ? { ...item, id: newId, weight: newWeight }
          : item,
      )
    })
  }, [])

  const removeFromCart = useCallback((productId, weight) => {
    const id = createCartItemId(productId, weight)
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== id),
    )
  }, [])

  const clearCart = useCallback(() => setCartItems([]), [])

  const totalPrice = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + item.pricePerKg * item.weight * item.quantity,
        0,
      ),
    [cartItems],
  )

  const totalItems = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  )

  const hasValidItems = cartItems.some((item) => item.quantity > 0)

  return {
    cartItems,
    addToCart,
    updateQuantity,
    updateWeight,
    removeFromCart,
    clearCart,
    totalPrice,
    totalItems,
    hasValidItems,
  }
}
