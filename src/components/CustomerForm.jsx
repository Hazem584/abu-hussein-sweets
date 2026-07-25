function CustomerForm({
  customerDetails,
  validationErrors,
  customerFormRef,
  nameInputRef,
  phoneInputRef,
  addressInputRef,
  onCustomerDetailChange,
}) {
  const handleChange = (event) => {
    const { name, value } = event.target
    onCustomerDetailChange(name, value)
  }

  return (
    <div className="cart-form" ref={customerFormRef}>
      <div className="cart-form__intro">
        <h3>بيانات التواصل</h3>
        <p>الاسم ورقم الهاتف والعنوان مطلوبون لتأكيد الطلب.</p>
      </div>

      <div>
        <label className="field-label" htmlFor="customer-name">
          الاسم
        </label>
        <input
          ref={nameInputRef}
          className={`input${validationErrors.name ? ' input--error' : ''}`}
          id="customer-name"
          name="name"
          autoComplete="name"
          value={customerDetails.name}
          onChange={handleChange}
          placeholder="اكتب اسمك"
          required
          aria-invalid={Boolean(validationErrors.name)}
          aria-describedby={
            validationErrors.name ? 'customer-name-error' : undefined
          }
        />
        {validationErrors.name && (
          <p className="field-error" id="customer-name-error" role="alert">
            {validationErrors.name}
          </p>
        )}
      </div>

      <div>
        <label className="field-label" htmlFor="customer-phone">
          رقم الهاتف
        </label>
        <input
          ref={phoneInputRef}
          className={`input${validationErrors.phone ? ' input--error' : ''}`}
          id="customer-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={customerDetails.phone}
          onChange={handleChange}
          placeholder="01xxxxxxxxx"
          required
          aria-invalid={Boolean(validationErrors.phone)}
          aria-describedby={
            validationErrors.phone ? 'customer-phone-error' : undefined
          }
        />
        {validationErrors.phone && (
          <p className="field-error" id="customer-phone-error" role="alert">
            {validationErrors.phone}
          </p>
        )}
      </div>

      <div className="form-field--wide">
        <label className="field-label" htmlFor="customer-address">
          العنوان
        </label>
        <input
          ref={addressInputRef}
          className={`input${validationErrors.address ? ' input--error' : ''}`}
          id="customer-address"
          name="address"
          autoComplete="street-address"
          value={customerDetails.address}
          onChange={handleChange}
          placeholder="المنطقة، الشارع، رقم المنزل"
          required
          aria-invalid={Boolean(validationErrors.address)}
          aria-describedby={
            validationErrors.address ? 'customer-address-error' : undefined
          }
        />
        {validationErrors.address && (
          <p className="field-error" id="customer-address-error" role="alert">
            {validationErrors.address}
          </p>
        )}
      </div>

      <div className="form-field--wide">
        <label className="field-label" htmlFor="customer-notes">
          ملاحظات
        </label>
        <textarea
          className="textarea"
          id="customer-notes"
          name="notes"
          value={customerDetails.notes}
          onChange={handleChange}
          placeholder="أي تفاصيل إضافية تحب تقولها لنا"
        />
      </div>
    </div>
  )
}

export default CustomerForm
