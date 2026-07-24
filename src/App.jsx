import { useMemo, useState } from 'react'
import Cart from './components/Cart'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import ProductGrid from './components/ProductGrid'
import { products } from './data/products'
import { createOrderMessage } from './utils/createOrderMessage'
import './App.css'

function App() {
  const [cartItems, setCartItems] = useState([])
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    phone: '',
    address: '',
    notes: '',
  })
  const [cartNotice, setCartNotice] = useState('')

  const totalPrice = useMemo(
    () => cartItems.reduce(
      (total, item) => total + item.pricePerKg * item.weight * item.quantity,
      0,
    ),
    [cartItems],
  )
  const totalQuantity = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  )

  const addToCart = (product, weight) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.productId === product.id && item.weight === weight,
      )
      if (existingItem) {
        return currentItems.map((item) =>
          item.productId === product.id && item.weight === weight
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }
      return [...currentItems, {
        productId: product.id,
        name: product.name,
        pricePerKg: product.pricePerKg,
        weight,
        quantity: 1,
      }]
    })
    setCartNotice(`تمت إضافة ${product.name} إلى طلبك`)
    window.setTimeout(() => setCartNotice(''), 2400)
  }

  const updateQuantity = (productId, weight, change) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.productId === productId && item.weight === weight
            ? { ...item, quantity: item.quantity + change }
            : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const updateWeight = (productId, oldWeight, newWeight) => {
    if (oldWeight === newWeight) return
    setCartItems((currentItems) => {
      const editedItem = currentItems.find(
        (item) => item.productId === productId && item.weight === oldWeight,
      )
      const matchingItem = currentItems.find(
        (item) => item.productId === productId && item.weight === newWeight,
      )
      if (matchingItem) {
        return currentItems
          .filter((item) => !(item.productId === productId && item.weight === oldWeight))
          .map((item) =>
            item.productId === productId && item.weight === newWeight
              ? { ...item, quantity: item.quantity + editedItem.quantity }
              : item,
          )
      }
      return currentItems.map((item) =>
        item.productId === productId && item.weight === oldWeight
          ? { ...item, weight: newWeight }
          : item,
      )
    })
  }

  const removeItem = (productId, weight) => {
    setCartItems((currentItems) =>
      currentItems.filter(
        (item) => !(item.productId === productId && item.weight === weight),
      ),
    )
  }

  const orderMessage = createOrderMessage(cartItems, totalPrice, customerDetails)

  return (
    <div className="site-shell">
      <Header cartCount={totalQuantity} />
      <main>
        <Hero />
        <ProductGrid products={products} onAddToCart={addToCart} />
        <Cart
          items={cartItems}
          totalPrice={totalPrice}
          customerDetails={customerDetails}
          orderMessage={orderMessage}
          onCustomerDetailsChange={setCustomerDetails}
          onQuantityChange={updateQuantity}
          onWeightChange={updateWeight}
          onRemove={removeItem}
          onClear={() => setCartItems([])}
        />
        <ContactSection orderMessage={orderMessage} canCopy={cartItems.length > 0} />
      </main>
      <Footer />
      {totalQuantity > 0 && (
        <a className="mobile-cart-pill" href="#cart" aria-label="الانتقال إلى طلبك">
          <span aria-hidden="true">🧺</span>
          <span>طلبك</span>
          <strong>{totalQuantity}</strong>
          <span className="mobile-cart-pill__total">{totalPrice} ج.م</span>
        </a>
      )}
      <div className="toast" aria-live="polite" aria-atomic="true">
        {cartNotice && <span>{cartNotice}</span>}
      </div>
    </div>
  )
}

export default App
