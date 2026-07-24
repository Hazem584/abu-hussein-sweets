import { useState } from 'react'
import { siteConfig } from '../config/siteConfig'

function Header({ cartCount }) {
  const [isOpen, setIsOpen] = useState(false)
  const closeMenu = () => setIsOpen(false)

  return (
    <header className="header">
      <div className="container header__inner">
        <a className="brand" href="#home" onClick={closeMenu}>
          <span className="brand__mark" aria-hidden="true">
            <img src={siteConfig.brandIconPath} alt="" />
          </span>
          <span>{siteConfig.businessName}</span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={isOpen}
          aria-controls="main-navigation"
          aria-label={isOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? '×' : '☰'}
        </button>
        <nav
          id="main-navigation"
          className={`nav${isOpen ? ' is-open' : ''}`}
          aria-label="التنقل الرئيسي"
        >
          <a href="#home" onClick={closeMenu}>الرئيسية</a>
          <a href="#menu" onClick={closeMenu}>المنيو</a>
          <a href="#cart" onClick={closeMenu}>طلبك {cartCount > 0 && `(${cartCount})`}</a>
          <a href="#contact" onClick={closeMenu}>تواصل معنا</a>
        </nav>
        <a
          className="button button--gold header__action"
          href={`https://wa.me/${siteConfig.whatsappNumber}`}
          target="_blank"
          rel="noreferrer"
        >
          <span aria-hidden="true">◉</span>
          تواصل واتساب
        </a>
      </div>
    </header>
  )
}

export default Header
