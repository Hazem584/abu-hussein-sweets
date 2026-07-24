import baklavaImage from '../assets/images/products/baklava.jpg'
import balahElShamImage from '../assets/images/products/balah-el-sham.jpg'
import basbousaImage from '../assets/images/products/basbousa.jpg'
import creamKunafaImage from '../assets/images/products/cream-kunafa.jpg'
import goulashFingersImage from '../assets/images/products/goulash-fingers.jpg'
import harissaDessertImage from '../assets/images/products/harissa-dessert.jpg'
import mixedOrientalSweetsImage from '../assets/images/products/mixed-oriental-sweets.jpg'
import plainGoulashImage from '../assets/images/products/plain-goulash.jpg'
import plainKunafaImage from '../assets/images/products/plain-kunafa.jpg'
import ramoushElSetImage from '../assets/images/products/ramoush-el-set.jpg'
import zainabFingersImage from '../assets/images/products/zainab-fingers.jpg'

export const DEFAULT_PRICE_PER_KG = 150

export const products = [
  ['basbousa', 'بسبوسة', 'بسبوسة شرقية بقوام طري ومذاق غني بالشربات.', 'بسبوسة', basbousaImage, 'صينية بسبوسة شرقية'],
  ['plain-kunafa', 'كنافة سادة', 'خيوط كنافة ذهبية مقرمشة بطعم شرقي أصيل.', 'كنافة', plainKunafaImage, 'كنافة سادة مصرية'],
  ['cream-kunafa', 'كنافة بالقشطة', 'كنافة ذهبية محشوة بطبقة كريمية من القشطة.', 'كنافة', creamKunafaImage, 'كنافة محشوة بالقشطة'],
  ['plain-goulash', 'جلاش عادي', 'رقائق جلاش خفيفة ومقرمشة بطعم السمن البلدي.', 'جلاش وبقلاوة', plainGoulashImage, 'جلاش حلو شرقي'],
  ['goulash-fingers', 'صوابع جلاش', 'أصابع جلاش ملفوفة ومحمرة بعناية حتى القرمشة.', 'جلاش وبقلاوة', goulashFingersImage, 'صوابع جلاش محشوة'],
  ['balah-el-sham', 'بلح الشام', 'قطع ذهبية هشة من الخارج وطرية من الداخل.', 'حلويات مقلية', balahElShamImage, 'بلح الشام الشرقي'],
  ['baklava', 'بقلاوة', 'طبقات رقيقة ومقرمشة بحشوة شرقية متوازنة.', 'جلاش وبقلاوة', baklavaImage, 'قطع بقلاوة شرقية'],
  ['mixed-oriental', 'مشكل حلويات شرقية', 'تشكيلة منتقاة لمشاركة أكثر من طعم في طبق واحد.', 'تشكيلات', mixedOrientalSweetsImage, 'تشكيلة حلويات شرقية متنوعة'],
  ['zeinab-fingers', 'صوابع زينب', 'حلوى شرقية مقرمشة ومشبعة بالشربات الخفيف.', 'حلويات مقلية', zainabFingersImage, 'صوابع زينب'],
  ['romosh-el-set', 'رموش الست', 'قطع هشة وناعمة مزينة بلمسة من جوز الهند.', 'تشكيلات', ramoushElSetImage, 'رموش الست'],
  ['harissa', 'هريسة', 'هريسة شرقية متماسكة بطعم غني ومميز.', 'بسبوسة', harissaDessertImage, 'هريسة حلويات شرقية'],
].map(([id, name, description, category, image, imageAlt]) => ({
  id,
  name,
  description,
  category,
  pricePerKg: DEFAULT_PRICE_PER_KG,
  image,
  imageAlt,
}))

export const weightOptions = [
  { value: 0.5, label: 'نصف كيلو' },
  { value: 1, label: '1 كيلو' },
  { value: 1.5, label: 'كيلو ونصف' },
  { value: 2, label: '2 كيلو' },
]
