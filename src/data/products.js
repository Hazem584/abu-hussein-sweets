import baklavaImage from '../assets/images/products/baklava.jpg'
import balahElShamImage from '../assets/images/products/balah-el-sham.jpg'
import basbousaImage from '../assets/images/products/basbousa.jpg'
import creamKunafaImage from '../assets/images/products/cream-kunafa.jpg'
import goulashFingersImage from '../assets/images/products/goulash-fingers.jpg'
import mixedOrientalSweetsImage from '../assets/images/products/mixed-oriental-sweets.jpg'
import plainGoulashImage from '../assets/images/products/plain-goulash.jpg'
import plainKunafaImage from '../assets/images/products/plain-kunafa.jpg'
import zainabFingersImage from '../assets/images/products/zainab-fingers.jpg'

export const DEFAULT_PRICE_PER_KG = 150

export const products = [
  {
    id: 'basbousa',
    name: 'بسبوسة',
    description: 'بسبوسة شرقية بقوام طري ومذاق غني بالشربات.',
    category: 'بسبوسة',
    pricePerKg: DEFAULT_PRICE_PER_KG,
    image: basbousaImage,
    imageAlt: 'صينية بسبوسة شرقية',
    isBestSeller: false,
  },
  {
    id: 'plain-kunafa',
    name: 'كنافة سادة',
    description: 'خيوط كنافة ذهبية مقرمشة بطعم شرقي أصيل.',
    category: 'كنافة',
    pricePerKg: DEFAULT_PRICE_PER_KG,
    image: plainKunafaImage,
    imageAlt: 'كنافة سادة مصرية',
    isBestSeller: false,
  },
  {
    id: 'cream-kunafa',
    name: 'كنافة بالقشطة',
    description: 'كنافة ذهبية محشوة بطبقة كريمية من القشطة.',
    category: 'كنافة',
    pricePerKg: DEFAULT_PRICE_PER_KG,
    image: creamKunafaImage,
    imageAlt: 'كنافة محشوة بالقشطة',
    isBestSeller: false,
  },
  {
    id: 'plain-goulash',
    name: 'جلاش عادي',
    description: 'رقائق جلاش خفيفة ومقرمشة بطعم السمن البلدي.',
    category: 'جلاش وبقلاوة',
    pricePerKg: DEFAULT_PRICE_PER_KG,
    image: plainGoulashImage,
    imageAlt: 'جلاش حلو شرقي',
    isBestSeller: false,
  },
  {
    id: 'goulash-fingers',
    name: 'صوابع جلاش',
    description: 'أصابع جلاش ملفوفة ومحمرة بعناية حتى القرمشة.',
    category: 'جلاش وبقلاوة',
    pricePerKg: DEFAULT_PRICE_PER_KG,
    image: goulashFingersImage,
    imageAlt: 'صوابع جلاش محشوة',
    isBestSeller: false,
  },
  {
    id: 'balah-el-sham',
    name: 'بلح الشام',
    description: 'قطع ذهبية هشة من الخارج وطرية من الداخل.',
    category: 'حلويات مقلية',
    pricePerKg: DEFAULT_PRICE_PER_KG,
    image: balahElShamImage,
    imageAlt: 'بلح الشام الشرقي',
    isBestSeller: false,
  },
  {
    id: 'baklava',
    name: 'بقلاوة',
    description: 'طبقات رقيقة ومقرمشة بحشوة شرقية متوازنة.',
    category: 'جلاش وبقلاوة',
    pricePerKg: DEFAULT_PRICE_PER_KG,
    image: baklavaImage,
    imageAlt: 'قطع بقلاوة شرقية',
    isBestSeller: false,
  },
  {
    id: 'zeinab-fingers',
    name: 'صوابع زينب',
    description: 'حلوى شرقية مقرمشة ومشبعة بالشربات الخفيف.',
    category: 'حلويات مقلية',
    pricePerKg: DEFAULT_PRICE_PER_KG,
    image: zainabFingersImage,
    imageAlt: 'صوابع زينب',
    isBestSeller: false,
  },
  {
    id: 'mixed-oriental',
    name: 'مشكل حلويات شرقية',
    description: 'تشكيلة منتقاة لمشاركة أكثر من طعم في طبق واحد.',
    category: 'تشكيلات',
    pricePerKg: DEFAULT_PRICE_PER_KG,
    image: mixedOrientalSweetsImage,
    imageAlt: 'تشكيلة حلويات شرقية متنوعة',
    isBestSeller: true,
  },
]
