import { useState } from 'react'
import { weightOptions } from '../data/products'
import { formatCurrency } from '../utils/formatCurrency'

function ProductCard({ product, onAddToCart }) {
  const [weight, setWeight] = useState(1)
  const [imageFailed, setImageFailed] = useState(false)

  return (
    <article className="product-card">
      <div className="product-card__image-wrap">
        {!imageFailed ? (
          <img
            className="product-card__image"
            src={product.image}
            alt={product.imageAlt}
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div
            className="image-fallback"
            role="img"
            aria-label={`تعذر تحميل ${product.imageAlt}`}
          >
            <span aria-hidden="true">🍯</span><strong>{product.name}</strong>
          </div>
        )}
        <span className="product-card__category">{product.category}</span>
      </div>
      <div className="product-card__body">
        <div className="product-card__top">
          <h3>{product.name}</h3>
          <span className="product-card__price">{formatCurrency(product.pricePerKg)} / كيلو</span>
        </div>
        <p className="product-card__description">{product.description}</p>
        <label className="field-label" htmlFor={`weight-${product.id}`}>اختار الوزن</label>
        <select
          className="select"
          id={`weight-${product.id}`}
          value={weight}
          onChange={(event) => setWeight(Number(event.target.value))}
        >
          {weightOptions.map((option) => (
            <option value={option.value} key={option.value}>{option.label}</option>
          ))}
        </select>
        <div className="product-card__total">
          <span>السعر حسب الوزن</span>
          <strong>{formatCurrency(product.pricePerKg * weight)}</strong>
        </div>
        <button className="button button--primary button--full" type="button" onClick={() => onAddToCart(product, weight)}>
          <span aria-hidden="true">＋</span> أضف إلى الطلب
        </button>
      </div>
    </article>
  )
}

export default ProductCard
