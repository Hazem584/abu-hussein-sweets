import { useMemo, useState } from 'react'
import ProductCard from './ProductCard'

function ProductGrid({
  products,
  menuSectionRef,
  menuHeadingRef,
  onAddToCart,
}) {
  const [activeCategory, setActiveCategory] = useState('الكل')
  const categories = useMemo(
    () => ['الكل', ...new Set(products.map((product) => product.category))],
    [products],
  )
  const visibleProducts =
    activeCategory === 'الكل'
      ? products
      : products.filter((product) => product.category === activeCategory)

  return (
    <section
      className="section section--cream"
      id="menu"
      ref={menuSectionRef}
    >
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">المنيو المتاح</p>
          <h2 ref={menuHeadingRef} tabIndex="-1">اختار الحلو اللي بتحبه</h2>
          <p>كل الأصناف بسعر موحّد للكيلو. اختار الصنف والوزن المناسب، وإحنا هنجهّز لك تفاصيل الطلب.</p>
        </div>
        <div
          className="category-filters"
          role="group"
          aria-label="تصفية المنيو"
        >
          {categories.map((category) => (
            <button
              className={`category-filter${activeCategory === category ? ' is-active' : ''}`}
              type="button"
              key={category}
              aria-pressed={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="product-grid">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductGrid
