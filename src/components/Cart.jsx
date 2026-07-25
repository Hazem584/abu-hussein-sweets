import { formatCurrency } from '../utils/formatCurrency'
import CartItem from './CartItem'
import CustomerForm from './CustomerForm'

function Cart({
  items,
  totalPrice,
  totalQuantity,
  customerDetails,
  validationErrors,
  customerFormRef,
  nameInputRef,
  phoneInputRef,
  addressInputRef,
  onCustomerDetailChange,
  onWhatsAppOrder,
  onQuantityChange,
  onWeightChange,
  onRemove,
  onClear,
}) {
  return (
    <section className="section" id="cart">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">طلبك</p>
          <h2>راجع طلبك قبل الإرسال</h2>
          <p>
            عدّل الوزن أو الكمية، وأكمل بياناتك، ثم أرسل الطلب مباشرة عبر
            واتساب.
          </p>
        </div>

        <div className="cart-layout">
          <div className="cart-panel">
            <div className="cart-panel__header">
              <h3>
                الأصناف المختارة{' '}
                <span className="cart-count">{totalQuantity}</span>
              </h3>
              {items.length > 0 && (
                <button className="clear-cart" type="button" onClick={onClear}>
                  مسح الطلب
                </button>
              )}
            </div>

            {items.length > 0 ? (
              <div className="cart-list">
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onQuantityChange={onQuantityChange}
                    onWeightChange={onWeightChange}
                    onRemove={onRemove}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-cart">
                <span className="empty-cart__icon" aria-hidden="true">🧺</span>
                <h3>طلبك لسه فاضي</h3>
                <p>
                  اختار الحلو اللي بتحبه من المنيو، وهتلاقيه هنا جاهز
                  للمراجعة.
                </p>
                <a className="button button--outline" href="#menu">
                  تصفّح المنيو
                </a>
              </div>
            )}

            <CustomerForm
              customerDetails={customerDetails}
              validationErrors={validationErrors}
              customerFormRef={customerFormRef}
              nameInputRef={nameInputRef}
              phoneInputRef={phoneInputRef}
              addressInputRef={addressInputRef}
              onCustomerDetailChange={onCustomerDetailChange}
            />
          </div>

          <aside className="order-summary" aria-label="ملخص الطلب">
            <div className="order-summary__header">
              <h3>ملخص الطلب</h3>
              <span aria-hidden="true">🧾</span>
            </div>
            <div className="order-summary__body">
              <div className="summary-row">
                <span>عدد القطع المختارة</span>
                <strong>{totalQuantity}</strong>
              </div>
              <div className="summary-row">
                <span>عدد الأصناف</span>
                <strong>{items.length}</strong>
              </div>
              <div className="summary-total">
                <span>الإجمالي</span>
                <strong>{formatCurrency(totalPrice)}</strong>
              </div>
              <button
                className="button button--whatsapp button--full"
                type="button"
                onClick={onWhatsAppOrder}
              >
                <span aria-hidden="true">◉</span>
                إرسال الطلب عبر واتساب
              </button>
              <p className="order-summary__hint">
                سيتم فتح واتساب برسالة عربية جاهزة تحتوي على تفاصيل طلبك.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

export default Cart
