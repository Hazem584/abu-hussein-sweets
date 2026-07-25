import { WEIGHT_OPTIONS } from '../constants/weights.js'
import { formatCurrency } from '../utils/formatCurrency'

function CartItem({ item, onQuantityChange, onWeightChange, onRemove }) {
  return (
    <article className="cart-item">
      <div className="cart-item__details">
        <h4 className="cart-item__name">{item.name}</h4>
        <span className="cart-item__unit">
          {formatCurrency(item.pricePerKg)} / كيلو
        </span>
      </div>
      <select
        className="select"
        value={item.weight}
        aria-label={`تعديل وزن ${item.name}`}
        onChange={(event) =>
          onWeightChange(
            item.productId,
            item.weight,
            Number(event.target.value),
          )
        }
      >
        {WEIGHT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div
        className="quantity-control"
        role="group"
        aria-label={`كمية ${item.name}`}
      >
        <button
          type="button"
          aria-label={`زيادة كمية ${item.name}`}
          onClick={() =>
            onQuantityChange(item.productId, item.weight, 1)
          }
        >
          +
        </button>
        <span aria-live="polite">{item.quantity}</span>
        <button
          type="button"
          aria-label={`تقليل كمية ${item.name}`}
          onClick={() =>
            onQuantityChange(item.productId, item.weight, -1)
          }
        >
          −
        </button>
      </div>
      <strong className="cart-item__total">
        {formatCurrency(item.pricePerKg * item.weight * item.quantity)}
      </strong>
      <button
        className="remove-button"
        type="button"
        aria-label={`حذف ${item.name} من الطلب`}
        onClick={() => onRemove(item.productId, item.weight)}
      >
        ×
      </button>
    </article>
  )
}

export default CartItem
