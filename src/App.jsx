import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Cart from './components/Cart'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import ProductGrid from './components/ProductGrid'
import ValidationModal from './components/ValidationModal'
import { products } from './data/products'
import { useCart } from './hooks/useCart.js'
import { useOrderValidation } from './hooks/useOrderValidation.js'
import { createOrderMessage } from './utils/createOrderMessage'
import {
  createWhatsAppUrl,
  getCleanWhatsAppNumber,
  isValidWhatsAppNumber,
} from './utils/createWhatsAppUrl.js'
import './App.css'

const scrollToAndFocus = (scrollTarget, focusTarget, block) => {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches
  const behavior = prefersReducedMotion ? 'auto' : 'smooth'

  scrollTarget?.scrollIntoView({ behavior, block })
  window.setTimeout(
    () => focusTarget?.focus(),
    prefersReducedMotion ? 0 : 350,
  )
}

function App() {
  const {
    cartItems,
    addToCart,
    updateQuantity,
    updateWeight,
    removeFromCart,
    clearCart,
    totalPrice,
    totalItems,
    hasValidItems,
  } = useCart()
  const {
    customerDetails,
    validationErrors,
    missingFields,
    updateCustomerDetail,
    validate: validateCustomerDetails,
    clearValidation,
  } = useOrderValidation()

  const [validationModalType, setValidationModalType] = useState(null)
  const [whatsappErrorMessage, setWhatsappErrorMessage] = useState('')
  const [cartNotice, setCartNotice] = useState('')

  const menuSectionRef = useRef(null)
  const menuHeadingRef = useRef(null)
  const customerFormRef = useRef(null)
  const nameInputRef = useRef(null)
  const phoneInputRef = useRef(null)
  const addressInputRef = useRef(null)
  const firstMissingFieldNameRef = useRef(null)
  const noticeTimeoutRef = useRef(null)

  const orderMessage = useMemo(
    () => createOrderMessage(cartItems, totalPrice, customerDetails),
    [cartItems, customerDetails, totalPrice],
  )

  useEffect(
    () => () => window.clearTimeout(noticeTimeoutRef.current),
    [],
  )

  const handleValidationConfirm = useCallback(() => {
    setValidationModalType(null)

    if (validationModalType === 'cart') {
      scrollToAndFocus(
        menuSectionRef.current,
        menuHeadingRef.current,
        'start',
      )
      return
    }

    if (validationModalType === 'whatsapp') return

    const inputRefs = {
      name: nameInputRef,
      phone: phoneInputRef,
      address: addressInputRef,
    }

    scrollToAndFocus(
      customerFormRef.current,
      inputRefs[firstMissingFieldNameRef.current]?.current,
      'center',
    )
  }, [validationModalType])

  const showWhatsAppError = useCallback((message) => {
    setWhatsappErrorMessage(message)
    setValidationModalType('whatsapp')
  }, [])

  const handleWhatsAppOrder = useCallback(
    (event) => {
      event?.preventDefault()

      if (!hasValidItems) {
        clearValidation()
        setValidationModalType('cart')
        return
      }

      const validationResult = validateCustomerDetails()
      if (!validationResult.isValid) {
        firstMissingFieldNameRef.current =
          validationResult.firstMissingField
        setValidationModalType('customer')
        return
      }

      const cleanPhoneNumber = getCleanWhatsAppNumber()
      if (!isValidWhatsAppNumber(cleanPhoneNumber)) {
        showWhatsAppError(
          'رقم واتساب غير متاح حاليًا. يرجى المحاولة لاحقًا.',
        )
        return
      }

      if (!orderMessage) {
        showWhatsAppError(
          'تعذر تجهيز رسالة الطلب. يرجى مراجعة الطلب والمحاولة مرة أخرى.',
        )
        return
      }

      try {
        const whatsappUrl = createWhatsAppUrl(
          cleanPhoneNumber,
          orderMessage,
        )
        window.location.assign(whatsappUrl)
      } catch {
        showWhatsAppError(
          'تعذر فتح واتساب حاليًا. يرجى المحاولة مرة أخرى.',
        )
      }
    },
    [
      clearValidation,
      hasValidItems,
      orderMessage,
      showWhatsAppError,
      validateCustomerDetails,
    ],
  )

  const handleAddToCart = useCallback(
    (product, weight) => {
      addToCart(product, weight)
      setCartNotice(`تمت إضافة ${product.name} إلى طلبك`)
      window.clearTimeout(noticeTimeoutRef.current)
      noticeTimeoutRef.current = window.setTimeout(
        () => setCartNotice(''),
        2400,
      )
    },
    [addToCart],
  )

  return (
    <div className="site-shell">
      <Header
        cartCount={totalItems}
        onWhatsAppOrder={handleWhatsAppOrder}
      />
      <main>
        <Hero onWhatsAppOrder={handleWhatsAppOrder} />
        <ProductGrid
          products={products}
          menuSectionRef={menuSectionRef}
          menuHeadingRef={menuHeadingRef}
          onAddToCart={handleAddToCart}
        />
        <Cart
          items={cartItems}
          totalPrice={totalPrice}
          totalQuantity={totalItems}
          customerDetails={customerDetails}
          validationErrors={validationErrors}
          customerFormRef={customerFormRef}
          nameInputRef={nameInputRef}
          phoneInputRef={phoneInputRef}
          addressInputRef={addressInputRef}
          onCustomerDetailChange={updateCustomerDetail}
          onWhatsAppOrder={handleWhatsAppOrder}
          onQuantityChange={updateQuantity}
          onWeightChange={updateWeight}
          onRemove={removeFromCart}
          onClear={clearCart}
        />
        <ContactSection
          orderMessage={orderMessage}
          canCopy={hasValidItems}
          onWhatsAppOrder={handleWhatsAppOrder}
        />
      </main>
      <Footer />

      {totalItems > 0 && (
        <a
          className="mobile-cart-pill"
          href="#cart"
          aria-label="الانتقال إلى طلبك"
        >
          <span aria-hidden="true">🧺</span>
          <span>طلبك</span>
          <strong>{totalItems}</strong>
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
