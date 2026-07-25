import { useEffect, useRef } from 'react'

function ValidationModal({
  isOpen,
  type,
  missingFields,
  errorMessage,
  onConfirm,
}) {
  const confirmButtonRef = useRef(null)
  const previousFocusRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return undefined

    const previousOverflow = document.body.style.overflow
    previousFocusRef.current = document.activeElement
    document.body.style.overflow = 'hidden'
    confirmButtonRef.current?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onConfirm()
      if (event.key === 'Tab') {
        event.preventDefault()
        confirmButtonRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
      previousFocusRef.current?.focus()
    }
  }, [isOpen, onConfirm])

  if (!isOpen) return null

  const isEmptyCart = type === 'cart'
  const isWhatsAppError = type === 'whatsapp'
  const allRequiredFieldsMissing = missingFields.length === 3

  return (
    <div className="validation-modal__backdrop">
      <div
        className="validation-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="validation-modal-title"
        aria-describedby="validation-modal-description"
      >
        <span className="validation-modal__icon" aria-hidden="true">!</span>
        <h2 id="validation-modal-title">
          {isEmptyCart
            ? 'الطلب فارغ'
            : isWhatsAppError
              ? 'تعذر فتح واتساب'
              : 'بيانات الطلب غير مكتملة'}
        </h2>
        <div id="validation-modal-description">
          {isEmptyCart ? (
            <p>يرجى إضافة صنف واحد على الأقل من المنيو قبل إرسال الطلب.</p>
          ) : isWhatsAppError ? (
            <p>{errorMessage}</p>
          ) : allRequiredFieldsMissing ? (
            <p>يرجى كتابة الاسم ورقم الهاتف والعنوان لإرسال الطلب عبر واتساب.</p>
          ) : (
            <>
              <p>يرجى استكمال البيانات التالية:</p>
              <ul>
                {missingFields.map((field) => (
                  <li key={field.key}>{field.label}</li>
                ))}
              </ul>
            </>
          )}
        </div>
        <button
          ref={confirmButtonRef}
          className="button button--primary button--full"
          type="button"
          onClick={onConfirm}
        >
          {isEmptyCart ? 'شاهد المنيو' : 'حسنًا'}
        </button>
      </div>
    </div>
  )
}

export default ValidationModal
