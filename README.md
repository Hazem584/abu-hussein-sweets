# Oriental Sweets Menu

منيو عربي متجاوب للحلويات الشرقية مع سلة طلب ورسالة واتساب جاهزة.

## التخصيص

- بيانات النشاط ورقم واتساب ورابط فيسبوك ومسار الشعار: `src/config/siteConfig.js`
- أيقونة المتصفح المؤقتة: `public/favicon.svg`
- أيقونة الشعار الدائرية المؤقتة: `public/brand-icon.svg`
- المنتجات والأسعار والصور: `src/data/products.js`

يمكن استبدال ملفي الأيقونة لاحقاً بملفات SVG أخرى مع الإبقاء على نفس
الأسماء والمسارات، أو تغيير `brandIconPath` في ملف الإعدادات.

## التشغيل

```bash
npm install
npm run dev
npm run build
```

## Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
