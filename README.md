# Oriental Sweets Menu

منيو عربي متجاوب للحلويات الشرقية، مع سلة طلب ورسالة واتساب عربية جاهزة.

## مواقع التخصيص

- بيانات النشاط وروابط التواصل ومسار الشعار: `src/config/siteConfig.js`
- المنتجات والأسعار والصور: `src/data/products.js`
- خيارات الوزن العربية: `src/constants/weights.js`
- تنسيق رسالة الطلب: `src/utils/createOrderMessage.js`
- إنشاء رابط واتساب والتحقق من الرقم: `src/utils/createWhatsAppUrl.js`
- أيقونة المتصفح: `public/favicon.svg`
- أيقونة الشعار الدائرية: `public/brand-icon.svg`

يمكن استبدال ملفي الأيقونة لاحقًا مع الإبقاء على الأسماء والمسارات نفسها، أو
تغيير `brandIconPath` في ملف الإعدادات.

## إعداد واتساب

يقرأ بناء Vite رقم واتساب العام من `VITE_WHATSAPP_NUMBER`، ثم يستخدم القيمة
الموجودة في `siteConfig.js` كبديل آمن. يجب كتابة الرقم بصيغة دولية من أرقام فقط،
من دون علامة `+` أو الصفر المصري الأول.

انسخ `.env.example` إلى ملف `.env.local` عند الحاجة إلى قيمة محلية مختلفة.

## التشغيل والفحص

```bash
npm install
npm run dev
npm run lint
npm run build
npm run preview
```
