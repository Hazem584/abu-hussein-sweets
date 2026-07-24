import { siteConfig } from '../config/siteConfig'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <a className="brand" href="#home">
          <span className="brand__mark" aria-hidden="true">
            <img src={siteConfig.brandIconPath} alt="" />
          </span>
          <span>{siteConfig.businessName}</span>
        </a>
        <p className="footer__copyright">© {year} {siteConfig.businessName}. جميع الحقوق محفوظة.</p>
        <div className="footer__links">
          <a href={`https://wa.me/${siteConfig.whatsappNumber}`} target="_blank" rel="noreferrer" aria-label="واتساب">و</a>
          <a href={siteConfig.facebookUrl} target="_blank" rel="noreferrer" aria-label="فيسبوك">ف</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
