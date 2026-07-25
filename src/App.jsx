import { useCallback, useMemo, useRef, useState } from 'react'
import Cart from './components/Cart'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import ProductGrid from './components/ProductGrid'
import ValidationModal from './components/ValidationModal'
import { products } from './data/products'
import { createOrderMessage } from './utils/createOrderMessage'
import {
  createWhatsAppUrl,
  getCleanWhatsAppNumber,
  isValidWhatsAppNumber,
} from './utils/createWhatsAppUrl.js'
import './App.css'

function App() {
  const [cartItems, setCartItems] = useState([])
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    phone: '',
    address: '',
    notes: '',
  })
  const [validationErrors, setValidationErrors] = useState({})
  const [missingFields, setMissingFields] = useState([])
  const [validationModalType, setValidationModalType] = useState(null)
  const [whatsappErrorMessage, setWhatsappErrorMessage] = useState('')
  const [cartNotice, setCartNotice] = useState('')

  const menuSectionRef = useRef(null)
  const menuHeadingRef = useRef(null)
  const customerFormRef = useRef(null)
  const nameInputRef = useRef(null)
  const phoneInputRef = useRef(null)
  const addressInputRef = useRef(null)
  const firstMissingFieldRef = useRef(null)

  const totalPrice = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + item.pricePerKg * item.weight * item.quantity,
        0,
      ),
    [cartItems],
  )
  const totalQuantity = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  )
  const orderMessage = createOrderMessage(
    cartItems,
    totalPrice,
    customerDetails,
  )

  const validateCustomerDetails = useCallback(() => {
    const normalizedDetails = Object.fromEntries(
      Object.entries(customerDetails).map(([key, value]) => [
        key,
        value.trim(),
      ]),
    )
    const phoneDigits = normalizedDetails.phone.replace(/[^\d٠-٩]/g, '')
    const nextErrors = {}
    const nextMissingFields = []

    const addMissingField = (key, label, message, inputRef) => {
      nextErrors[key] = message
      nextMissingFields.push({ key, label })
      if (!firstMissingFieldRef.current) firstMissingFieldRef.current = inputRef
    }

    firstMissingFieldRef.current = null

    if (!normalizedDetails.name) {
      addMissingField('name', 'الاسم', 'يرجى كتابة الاسم.', nameInputRef)
    }
    if (!normalizedDetails.phone) {
      addMissingField(
        'phone',
        'رقم الهاتف',
        'يرجى كتابة رقم الهاتف.',
        phoneInputRef,
      )
    } else if (phoneDigits.length < 8) {
      addMissingField(
        'phone',
        'رقم الهاتف',
        'يرجى كتابة رقم هاتف صحيح.',
        phoneInputRef,
      )
    }
    if (!normalizedDetails.address) {
      addMissingField(
        'address',
        'العنوان',
        'يرجى كتابة العنوان.',
        addressInputRef,
      )
    }

    setCustomerDetails(normalizedDetails)
    setValidationErrors(nextErrors)
    setMissingFields(nextMissingFields)

    if (nextMissingFields.length) {
      setValidationModalType('customer')
      return false
    }

    setValidationModalType(null)
    return true
  }, [customerDetails])

  const handleValidationConfirm = useCallback(() => {
    setValidationModalType(null)

    if (validationModalType === 'cart') {
      menuSectionRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
      window.setTimeout(() => menuHeadingRef.current?.focus(), 350)
      return
    }

    if (validationModalType === 'whatsapp') return

    customerFormRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
    window.setTimeout(() => firstMissingFieldRef.current?.current?.focus(), 350)
  }, [validationModalType])

  const handleWhatsAppOrder = useCallback(
    (event) => {
      event?.preventDefault()

      if (!cartItems.length) {
        setValidationErrors({})
        setMissingFields([])
        setValidationModalType('cart')
        return
      }

      if (!validateCustomerDetails()) return

      const cleanPhoneNumber = getCleanWhatsAppNumber()

      if (!isValidWhatsAppNumber(cleanPhoneNumber)) {
        if (import.meta.env.DEV) {
          console.error('WhatsApp number is missing or invalid.')
        }
        setWhatsappErrorMessage(
          'رقم واتساب غير متاح حاليًا. يرجى المحاولة لاحقًا.',
        )
        setValidationModalType('whatsapp')
        return
      }

      if (!orderMessage) {
        if (import.meta.env.DEV) {
          console.error('WhatsApp order message is empty.')
        }
        setWhatsappErrorMessage(
          'تعذر تجهيز رسالة الطلب. يرجى مراجعة الطلب والمحاولة مرة أخرى.',
        )
        setValidationModalType('whatsapp')
        return
      }

      const whatsappUrl = createWhatsAppUrl(orderMessage)
      window.location.assign(whatsappUrl)
    },
    [cartItems.length, orderMessage, validateCustomerDetails],
  )

  const clearValidationError = (fieldName) => {
    setValidationErrors((current) => ({ ...current, [fieldName]: '' }))
  }

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
      return [
        ...currentItems,
        {
          productId: product.id,
          name: product.name,
          pricePerKg: product.pricePerKg,
          weight,
          quantity: 1,
        },
      ]
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
          .filter(
            (item) =>
              !(item.productId === productId && item.weight === oldWeight),
          )
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

  return (
    <div className="site-shell">
      <Header
        cartCount={totalQuantity}
        onWhatsAppOrder={handleWhatsAppOrder}
      />
      <main>
        <Hero onWhatsAppOrder={handleWhatsAppOrder} />
        <ProductGrid
          products={products}
          menuSectionRef={menuSectionRef}
          menuHeadingRef={menuHeadingRef}
          onAddToCart={addToCart}
        />
        <Cart
          items={cartItems}
          totalPrice={totalPrice}
          customerDetails={customerDetails}
          validationErrors={validationErrors}
          customerFormRef={customerFormRef}
          nameInputRef={nameInputRef}
          phoneInputRef={phoneInputRef}
          addressInputRef={addressInputRef}
          onCustomerDetailsChange={setCustomerDetails}
          onClearValidationError={clearValidationError}
          onWhatsAppOrder={handleWhatsAppOrder}
          onQuantityChange={updateQuantity}
          onWeightChange={updateWeight}
          onRemove={removeItem}
          onClear={() => setCartItems([])}
        />
        <ContactSection
          orderMessage={orderMessage}
          canCopy={cartItems.length > 0}
          onWhatsAppOrder={handleWhatsAppOrder}
        />
      </main>
      <Footer />

      {totalQuantity > 0 && (
        <a
          className="mobile-cart-pill"
          href="#cart"
          aria-label="الانتقال إلى طلبك"
        >
          <span aria-hidden="true">🧺</span>
          <span>طلبك</span>
          <strong>{totalQuantity}</strong>
          <span className="mobile-cart-pill__total">{totalPrice} ج.م</span>
        </a>
      )}

      <div className="toast" aria-live="polite" aria-atomic="true">
        {cartNotice && <span>{cartNotice}</span>}
      </div>

      <ValidationModal
        isOpen={Boolean(validationModalType)}
        type={validationModalType}
        missingFields={missingFields}
        errorMessage={whatsappErrorMessage}
        onConfirm={handleValidationConfirm}
      />
    </div>
  )
}

export default App
