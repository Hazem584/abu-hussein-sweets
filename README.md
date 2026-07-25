# Abu Hussein Oriental Sweets Menu

**Arabic project name:** حلويات أبو حسين

Abu Hussein Oriental Sweets Menu is a responsive, one-page Arabic RTL
website for an Egyptian oriental sweets business. It presents the available
products and prices, lets customers choose weights and quantities, builds an
order in the browser, and prepares an Arabic order message that can be sent
through WhatsApp.

The project is frontend-only. It provides a simple ordering workflow without
requiring a backend, database, customer account, or online payment system.

## Live Demo

**Live production website:**
[https://abu-hussein-sweets.vercel.app](https://abu-hussein-sweets.vercel.app)

## Features

- Arabic interface with right-to-left layout
- Responsive one-page design for mobile and desktop
- Product menu backed by centralized product data and local images
- Category filters generated from the available products
- Arabic weight options for half, one, one-and-a-half, and two kilograms
- Dynamic per-product and cart price calculations
- Add-to-cart, quantity updates, weight updates, item removal, and cart clearing
- Best-seller badge driven by product data
- Required customer name, phone number, and address validation
- Optional customer notes
- Empty-cart validation before customer-information validation
- Accessible validation dialog with keyboard and focus handling
- Arabic WhatsApp order-message generation
- Production-safe WhatsApp URL generation with phone-number sanitization
- Facebook page integration
- Copy-order workflow for pasting the message into Facebook Messenger
- Lazy-loaded product images with local fallback behavior
- Vite production build suitable for deployment to Vercel

## Tech Stack

- [React 19](https://react.dev/) and React DOM
- [Vite 8](https://vite.dev/)
- JavaScript with ES modules
- Plain CSS with responsive media queries and CSS custom properties
- ESLint 10 with React Hooks and React Refresh rules
- React Compiler through the configured Babel integration
- Vercel as the production deployment target

No backend framework, state-management library, CSS framework, or component
library is used.

## Screenshots

Screenshots can be added later under `docs/screenshots/`.

## Project Structure

```text
.
├── public/
│   ├── images/
│   │   └── hero-sweets.svg
│   ├── brand-icon.svg
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   └── images/
│   │       └── products/
│   ├── components/
│   │   ├── Cart.jsx
│   │   ├── CartItem.jsx
│   │   ├── ContactSection.jsx
│   │   ├── CustomerForm.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductGrid.jsx
│   │   └── ValidationModal.jsx
│   ├── config/
│   │   └── siteConfig.js
│   ├── constants/
│   │   └── weights.js
│   ├── data/
│   │   └── products.js
│   ├── hooks/
│   │   ├── useCart.js
│   │   └── useOrderValidation.js
│   ├── utils/
│   │   ├── createOrderMessage.js
│   │   ├── createWhatsAppUrl.js
│   │   ├── formatCurrency.js
│   │   ├── formatWeight.js
│   │   └── validateCustomerDetails.js
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env.example
├── IMAGE_SOURCES.md
├── index.html
├── package.json
└── vite.config.js
```

Important areas:

- `src/components/` contains the visible page sections and focused UI components.
- `src/hooks/` contains the cart and customer-validation state logic.
- `src/config/siteConfig.js` is the central business and contact configuration.
- `src/data/products.js` is the single source of truth for the product menu.
- `src/constants/weights.js` defines the supported weights and Arabic labels.
- `src/utils/` contains reusable order, validation, formatting, and WhatsApp helpers.
- `src/assets/images/products/` contains locally bundled product images.
- `public/` contains assets that must keep stable public URLs.

## Getting Started

### Prerequisites

- Git
- npm
- Node.js `^20.19.0` or `>=22.12.0`, as required by the installed Vite version

### Installation

```bash
git clone https://github.com/Hazem584/abu-hussein-sweets.git
cd abu-hussein-sweets
npm install
npm run dev
```

Vite normally serves the development website at:

```text
http://localhost:5173
```

The terminal output is the source of truth if that port is already in use.

## Available Scripts

The following scripts are defined in `package.json`:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Starts the Vite development server with hot module replacement. |
| `npm run build` | Creates the optimized production build in `dist/`. |
| `npm run lint` | Runs ESLint across the project. |
| `npm run preview` | Serves the current `dist/` build locally for production verification. |

## Business and Contact Configuration

Update business information in:

```text
src/config/siteConfig.js
```

The current configuration shape is:

```js
export const siteConfig = Object.freeze({
  businessName: 'حلويات أبو حسين',
  whatsappNumber: '201000000000',
  facebookUrl: 'https://www.facebook.com/your-page',
  brandIconPath: '/brand-icon.svg',
})
```

This file controls:

- The business name used throughout the React interface
- The fallback WhatsApp business number
- The Facebook page opened by contact and footer links
- The circular logo icon used in the header and footer

The default logo can be replaced at `public/brand-icon.svg`. The browser tab
icon can be replaced at `public/favicon.svg`. Keep the same filenames to avoid
changing any code, or update `brandIconPath` when using a different public path.

### WhatsApp Number Format

Use the full international number with digits only:

- Do not include `+`
- Do not include spaces, dashes, or parentheses
- Do not include the leading Egyptian `0`

Example:

```text
201068119841
```

The application sanitizes the configured value and requires a valid
international-length number before creating a `wa.me` URL.

## Environment Variables

The project uses one optional Vite client environment variable:

```env
VITE_WHATSAPP_NUMBER=201068119841
```

Copy `.env.example` to `.env.local` when a local override is needed:

```bash
cp .env.example .env.local
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

Important behavior:

- `VITE_WHATSAPP_NUMBER` takes precedence over `siteConfig.whatsappNumber`.
- If it is not defined, the value in `src/config/siteConfig.js` is used.
- Vite only exposes client variables whose names start with `VITE_`.
- The WhatsApp number is public business configuration, not a secret.
- `.env` and `.env.*` files are ignored by Git; `.env.example` is intentionally tracked.
- `.env.example` must contain only safe example values.
- Vercel environment-variable changes apply to new deployments, so redeploy
  the project after adding or changing the number.

There is no `VITE_FACEBOOK_URL` variable. Update the Facebook page only through
`siteConfig.facebookUrl`.

## Updating Products

All product data is stored in:

```text
src/data/products.js
```

Each entry contains the product ID, Arabic name and description, category,
price per kilogram, imported image, Arabic alternative text, and best-seller
flag. For example:

```js
{
  id: 'mixed-oriental',
  name: 'مشكل حلويات شرقية',
  description: 'تشكيلة منتقاة لمشاركة أكثر من طعم في طبق واحد.',
  category: 'تشكيلات',
  pricePerKg: DEFAULT_PRICE_PER_KG,
  image: mixedOrientalSweetsImage,
  imageAlt: 'تشكيلة حلويات شرقية متنوعة',
  isBestSeller: true,
}
```

Maintenance notes:

- Keep every `id` unique and stable.
- Change `DEFAULT_PRICE_PER_KG` to update the shared price used by the menu.
- Product display order follows the order of objects in the `products` array.
- Category filters are generated from product categories automatically.
- Set `isBestSeller: true` only on products that should show the
  `الأكثر طلبًا` badge.
- Preserve meaningful Arabic product names, descriptions, and image alt text.

## Updating Product Images

Product images are stored in:

```text
src/assets/images/products/
```

When replacing or adding an image:

1. Use a short English filename.
2. Prefer a compressed WebP image when practical; optimized JPEG is also supported.
3. Store the image locally instead of hotlinking an external URL.
4. Import it near the top of `src/data/products.js`.
5. Assign the import to the product's `image` property.
6. Provide meaningful Arabic text in `imageAlt`.
7. Use a crop that works with the existing fixed product-card aspect ratio.
8. Record the source and known licensing information in `IMAGE_SOURCES.md`.

## Weight Options and Pricing

Supported weights and their Arabic labels are centralized in:

```text
src/constants/weights.js
```

The same values are used by product cards, cart items, and order messages.
Prices are calculated from:

```text
pricePerKg × selected weight × quantity
```

Avoid adding a new weight in only one component. Update the shared constants so
all parts of the ordering flow stay consistent.

## WhatsApp Order Flow

All order buttons use the same shared submission flow:

1. The cart is checked first.
2. If it is empty, an Arabic dialog asks the customer to view the menu.
3. Once the cart contains an item, the customer name, phone number, and address
   are validated.
4. Notes are included only when entered.
5. The application creates an Arabic message containing readable weight labels,
   products, prices, total, and customer details.
6. The message is encoded and the browser navigates directly to the generated
   `https://wa.me/` URL.

WhatsApp URL construction is centralized in
`src/utils/createWhatsAppUrl.js`. Order-message formatting is centralized in
`src/utils/createOrderMessage.js`.

The navigation remains synchronous with the user's button click to reduce
popup-blocking problems in production browsers.

## Facebook Integration

The configured Facebook page is opened in a new tab from the contact section
and footer.

The website does not prefill a Facebook Messenger conversation. Instead, the
customer can:

1. Build the order.
2. Select **نسخ تفاصيل الطلب**.
3. Open the configured Facebook page.
4. Paste the copied Arabic order message into Messenger.

Clipboard access depends on browser support, permissions, and a secure
production context. The interface shows an Arabic success or failure message.

## Production Build

Create and test the production build before deployment:

```bash
npm run lint
npm run build
npm run preview
```

The generated website is written to `dist/`. Do not edit `dist/` manually;
rebuild it from the source files.

## Deployment to Vercel

This project is a static Vite application. It does not require serverless
functions or a backend service.

### Method 1: GitHub Integration

1. Push the repository to GitHub.
2. Import `Hazem584/abu-hussein-sweets` into Vercel.
3. Select **Vite** as the framework preset.
4. Use `npm run build` as the build command.
5. Use `dist` as the output directory.
6. Add `VITE_WHATSAPP_NUMBER` if the deployment should override the fallback
   value in `siteConfig.js`.
7. Deploy the project.

GitHub integration is recommended because pushes to the connected branch can
create automatic deployments.

### Method 2: Vercel CLI

Install and authenticate the Vercel CLI, then deploy from the project root:

```bash
npm install -g vercel
vercel
vercel --prod
```

Confirm the framework, build command, output directory, and environment
variable values when prompted.

## Accessibility

The current interface includes:

- Arabic `lang` and RTL document direction
- Semantic sections, navigation, headings, articles, and buttons
- Visible keyboard focus styles
- Arabic labels and accessible names for controls and icon-only links
- `aria-invalid` and `aria-describedby` connections for invalid form fields
- Alert roles for visible field errors
- A dialog with `role="dialog"` and `aria-modal="true"`
- Dialog keyboard handling, focus containment, and focus restoration
- Keyboard-operable category, cart, social, and order controls
- Meaningful Arabic alt text and an accessible image-failure fallback
- Reduced-motion handling for scrolling and animations

Accessibility should still be checked after significant visual or interaction
changes.

## Image Sources and Licensing

Image-source records are maintained in:

```text
IMAGE_SOURCES.md
```

The current product images were downloaded from supplied Google-hosted
thumbnail URLs. Those URLs do not reliably identify the original publisher,
author, ownership, or license. No royalty-free or commercial-use status is
claimed.

Before commercial reuse or redistribution, the project owner should identify
the original sources, verify the usage rights, and replace any image whose
license cannot be confirmed.

## Known Limitations

- No backend, API, or database
- No customer accounts or persistent server-side cart
- Cart state resets when the page is reloaded
- No online payment processing
- No admin dashboard
- No automatic stock or product-availability management
- Products, prices, and categories are maintained in source code
- Orders are manually sent and confirmed through WhatsApp
- Facebook ordering requires copying and pasting the message
- Clipboard and external-app behavior can vary by browser and device
- Product image licensing must be verified separately

## Future Ideas

The following are possible future enhancements, not current features:

- Admin dashboard for product and availability management
- Database-backed products and orders
- Delivery-area and delivery-fee selection
- Online payments
- Order status tracking
- Per-product availability controls
- Arabic and English language switching

## Contributing and Maintenance

For a small focused change:

1. Create a branch from the current main branch.
2. Keep business configuration in `siteConfig.js`.
3. Keep product data in `products.js`.
4. Reuse the cart, validation, order-message, and WhatsApp utilities instead of
   duplicating their logic in components.
5. Preserve the Arabic RTL layout and existing order-message format.
6. Run `npm run lint` and `npm run build`.
7. Test the cart, customer validation, message copying, Facebook link, and
   WhatsApp flow in the production preview.
8. Open a pull request with a concise description of the change.

When dependencies are changed, commit both `package.json` and
`package-lock.json`. Do not commit `node_modules/`, `dist/`, local `.env`
files, private keys, or credentials.

## Repository

[https://github.com/Hazem584/abu-hussein-sweets](https://github.com/Hazem584/abu-hussein-sweets)

## Author

[Hazem584](https://github.com/Hazem584)

## License

No license has been added yet. All rights are reserved by the project owner.
