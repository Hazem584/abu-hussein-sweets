import { useState } from 'react'
import { siteConfig } from '../config/siteConfig'
import { formatCurrency } from '../utils/formatCurrency'
import CartItem from './CartItem'

function Cart({
  items,
  totalPrice,
  customerDetails,
  orderMessage,
  onCustomerDetailsChange,
  onQuantityChange,
  onWeightChange,
  onRemove,
  onClear,
}) {
  const [validationErrors, setValidationErrors] = useState({})
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0)

  const handleDetailsChange = (event) => {
    const { name, value } = event.target
    onCustomerDetailsChange((current) => ({ ...current, [name]: value }))
    setValidationErrors((current) => ({ ...current, [name]: '' }))
  }

  const handleWhatsappOrder = () => {
    const normalizedDetails = Object.fromEntries(
      Object.entries(customerDetails).map(([key, value]) => [
        key,
        value.trim(),
      ]),
    )
    const phoneDigits = normalizedDetails.phone.replace(/[^\d٠-٩]/g, '')
    const nextErrors = {}

    if (!items.length) {
      nextErrors.cart = 'يرجى إضافة صنف واحد على الأقل إلى الطلب.'
    }
    if (!normalizedDetails.name) {
      nextErrors.name = 'يرجى كتابة الاسم.'
    }
    if (!normalizedDetails.phone) {
      nextErrors.phone = 'يرجى كتابة رقم الهاتف.'
    } else if (phoneDigits.length < 8) {
      nextErrors.phone = 'يرجى كتابة رقم هاتف صحيح.'
    }

    onCustomerDetailsChange(normalizedDetails)
    setValidationErrors(nextErrors)

    if (Object.keys(nextErrors).length) return

    const whatsappUrl = `https://wa.me/${
      siteConfig.whatsappNumber
    }?text=${encodeURIComponent(orderMessage)}`
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <section className="section" id="cart">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">طلبك</p>
          <h2>راجع طلبك قبل الإرسال</h2>
          <p>عدّل الوزن أو الكمية، وأضف بياناتك إن أحببت، ثم أرسل الطلب مباشرة عبر واتساب.</p>
        </div>
        <div className="cart-layout">
          <div className="cart-panel">
            <div className="cart-panel__header">
              <h3>الأصناف المختارة <span className="cart-count">{totalQuantity}</span></h3>
              {items.length > 0 && (
                <button className="clear-cart" type="button" onClick={onClear}>مسح الطلب</button>
              )}
            </div>
            {items.length > 0 ? (
              <>
                <div className="cart-list">
                  {items.map((item) => (
                    <CartItem
                      key={`${item.productId}-${item.weight}`}
                      item={item}
                      onQuantityChange={onQuantityChange}
                      onWeightChange={onWeightChange}
                      onRemove={onRemove}
                    />
                  ))}
                </div>
                <div className="cart-form">
                  <div className="cart-form__intro">
                    <h3>بيانات التواصل</h3>
                    <p>الاسم ورقم الهاتف مطلوبان لتأكيد الطلب.</p>
                  </div>
                  <div>
                    <label className="field-label" htmlFor="customer-name">الاسم</label>
                    <input
                      className="input"
                      id="customer-name"
                      name="name"
                      value={customerDetails.name}
                      onChange={handleDetailsChange}
                      placeholder="اكتب اسمك"
                      required
                      aria-invalid={Boolean(validationErrors.name)}
                      aria-describedby={validationErrors.name ? 'customer-name-error' : undefined}
                    />
                    {validationErrors.name && (
                      <p className="field-error" id="customer-name-error">{validationErrors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="field-label" htmlFor="customer-phone">رقم الهاتف</label>
                    <input
                      className="input"
                      id="customer-phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      value={customerDetails.phone}
                      onChange={handleDetailsChange}
                      placeholder="01xxxxxxxxx"
                      required
                      aria-invalid={Boolean(validationErrors.phone)}
                      aria-describedby={validationErrors.phone ? 'customer-phone-error' : undefined}
                    />
                    {validationErrors.phone && (
                      <p className="field-error" id="customer-phone-error">{validationErrors.phone}</p>
                    )}
                  </div>
                  <div className="form-field--wide">
                    <label className="field-label" htmlFor="customer-address">العنوان</label>
                    <input className="input" id="customer-address" name="address" value={customerDetails.address} onChange={handleDetailsChange} placeholder="المنطقة، الشارع، رقم المنزل" />
                  </div>
                  <div className="form-field--wide">
                    <label className="field-label" htmlFor="customer-notes">ملاحظات</label>
                    <textarea className="textarea" id="customer-notes" name="notes" value={customerDetails.notes} onChange={handleDetailsChange} placeholder="أي تفاصيل إضافية تحب تقولها لنا" />
                  </div>
                </div>
              </>
            ) : (
              <div className="empty-cart">
                <span className="empty-cart__icon" aria-hidden="true">🧺</span>
                <h3>طلبك لسه فاضي</h3>
                <p>اختار الحلو اللي بتحبه من المنيو، وهتلاقيه هنا جاهز للمراجعة.</p>
                <a className="button button--outline" href="#menu">تصفّح المنيو</a>
              </div>
            )}
          </div>
          <aside className="order-summary" aria-label="ملخص الطلب">
            <div className="order-summary__header"><h3>ملخص الطلب</h3><span aria-hidden="true">🧾</span></div>
            <div className="order-summary__body">
              <div className="summary-row"><span>عدد القطع المختارة</span><strong>{totalQuantity}</strong></div>
              <div className="summary-row"><span>عدد الأصناف</span><strong>{items.length}</strong></div>
              <div className="summary-total"><span>الإجمالي</span><strong>{formatCurrency(totalPrice)}</strong></div>
              <button
                className="button button--whatsapp button--full"
                type="button"
                onClick={handleWhatsappOrder}
              >
                <span aria-hidden="true">◉</span>
                إرسال الطلب عبر واتساب
              </button>
              {validationErrors.cart && !items.length && (
                <p className="cart-validation-error" role="alert">{validationErrors.cart}</p>
              )}
              <p className="order-summary__hint">سيتم فتح واتساب برسالة عربية جاهزة تحتوي على تفاصيل طلبك.</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

export default Cart
