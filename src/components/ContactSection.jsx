import { useState } from 'react'
import { siteConfig } from '../config/siteConfig'

function ContactSection({ orderMessage, canCopy }) {
  const [copyStatus, setCopyStatus] = useState('')

  const copyOrder = async () => {
    if (!canCopy) {
      setCopyStatus('أضف منتجاً أولاً لنسخ تفاصيل الطلب')
      return
    }
    try {
      await navigator.clipboard.writeText(orderMessage)
      setCopyStatus('تم نسخ تفاصيل الطلب')
    } catch {
      setCopyStatus('تعذّر النسخ التلقائي، جرّب مرة أخرى')
    }
  }

  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <div className="contact-card">
          <div>
            <p className="eyebrow">تواصل معنا</p>
            <h2>جاهز تطلب حلو؟</h2>
            <p>ابعت لنا طلبك على واتساب، أو انسخ التفاصيل وافتح صفحتنا على فيسبوك للصقها في رسالة ماسنجر.</p>
          </div>
          <div className="contact-card__actions">
            <a className="button button--whatsapp" href={`https://wa.me/${siteConfig.whatsappNumber}`} target="_blank" rel="noreferrer">تواصل عبر واتساب</a>
            <button className="button button--gold" type="button" onClick={copyOrder}>نسخ تفاصيل الطلب</button>
            <a className="button button--facebook" href={siteConfig.facebookUrl} target="_blank" rel="noreferrer">افتح صفحة فيسبوك</a>
            <p className="copy-feedback" aria-live="polite">{copyStatus}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
