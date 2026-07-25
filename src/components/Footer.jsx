import { siteConfig } from '../config/siteConfig'
import {
  createWhatsAppUrl,
  getCleanWhatsAppNumber,
  isValidWhatsAppNumber,
} from '../utils/createWhatsAppUrl.js'

function Footer() {
  const year = new Date().getFullYear()
  const whatsappNumber = getCleanWhatsAppNumber()
  const whatsappUrl = isValidWhatsAppNumber(whatsappNumber)
    ? createWhatsAppUrl(whatsappNumber)
    : '#contact'

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <a className="brand" href="#home">
          <span className="brand__mark" aria-hidden="true">
            <img
              src={siteConfig.brandIconPath}
              alt=""
              width="64"
              height="64"
            />
          </span>
          <span>{siteConfig.businessName}</span>
        </a>
        <p className="footer__copyright">
          © {year} {siteConfig.businessName}. جميع الحقوق محفوظة.
        </p>
        <div className="footer__links">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="تواصل عبر واتساب"
            title="تواصل عبر واتساب"
          >
            <svg
              className="footer__social-icon"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.23 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26A9.9 9.9 0 0 1 12.05 2a9.82 9.82 0 0 1 6.99 2.9 9.82 9.82 0 0 1 2.89 6.99 9.9 9.9 0 0 1-9.88 9.9M20.46 3.49A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.69 1.45c6.55 0 11.89-5.34 11.89-11.9 0-3.18-1.23-6.16-3.48-8.41" />
            </svg>
          </a>
          <a
            href={siteConfig.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="صفحتنا على فيسبوك"
            title="صفحتنا على فيسبوك"
          >
            <svg
              className="footer__social-icon"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M14 8.5h3V5h-3.5C10.5 5 9 6.8 9 9.5V12H6v3.5h3V24h4v-8.5h3.2l.6-3.5H13V9.8c0-.9.4-1.3 1-1.3Z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
