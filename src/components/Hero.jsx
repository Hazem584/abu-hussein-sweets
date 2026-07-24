import { siteConfig } from '../config/siteConfig'
import mixedOrientalSweetsImage from '../assets/images/products/mixed-oriental-sweets.jpg'

function Hero() {
  return (
    <section
      className="hero"
      id="home"
      style={{ '--hero-background-image': `url("${mixedOrientalSweetsImage}")` }}
    >
      <div className="container hero__inner">
        <div className="hero__content">
          <p className="hero__eyebrow">طعم شرقي أصيل في كل قطعة</p>
          <h1>حلاوة مصرية<br /><span>تجمعنا سوا</span></h1>
          <p className="hero__description">
            اختر من منيو الحلويات الشرقية المتاحة، حدّد الوزن والكمية،
            وابعت طلبك جاهزاً إلى {siteConfig.businessName} عبر واتساب.
          </p>
          <div className="hero__actions">
            <a className="button button--gold" href="#menu">شاهد المنيو <span aria-hidden="true">←</span></a>
            <a className="button button--outline" href="#cart">اطلب عبر واتساب <span aria-hidden="true">◉</span></a>
          </div>
        </div>
        <div className="hero__visual" aria-hidden="true">
          <img className="hero__image" src="/images/hero-sweets.svg" alt="" />
          <div className="hero__seal"><strong>١٥٠</strong><small>جنيه / كيلو</small></div>
        </div>
      </div>
      <div className="hero__features">
        <div className="container hero__features-inner">
          <div className="hero__feature"><span>✦</span> تشكيلة شرقية متنوعة</div>
          <div className="hero__feature"><span>✓</span> اختيار الوزن بسهولة</div>
          <div className="hero__feature"><span>◉</span> طلب مباشر عبر واتساب</div>
        </div>
      </div>
    </section>
  )
}

export default Hero
