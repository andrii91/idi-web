# Email Template - Order Confirmation

Цей email template створений на основі Figma дизайну для підтвердження замовлення Italian Design Interiors.

## Структура файлів

- `email1.mjml` - MJML файл з email template
- `email1.html` - Скомпільований HTML файл
- `images/` - Папка для зображень

## Зображення

✅ **Всі зображення завантажені з Figma макету!**

### Основні зображення
- `logo.svg` - Логотип IDI (10x45px)
- `product-1-45201f.jpg` - Зображення першого продукту "Eliot Wood Drive Dining Table" (903x607px)
- `product-2-6a5f1f.jpg` - Зображення другого продукту "Artemide" (903x607px)
- `finish-sample-1-572c10.jpg` - Зразок оздоблення "With leather pad" (460x460px)
- `finish-sample-2-56586a.jpg` - Зразок композиції "123325" (227x228px)

### Іконки
- `materials-icon.svg` - Іконка матеріалів/оздоблення (17x8px)
- `sofa-icon.svg` - Іконка композиції (19x12px)
- `shipping-icon.svg` - Іконка доставки (19x17px)
- `copy-icon.svg` - Іконка копіювання (18x18px)

### Соціальні мережі
- `facebook-icon.svg` - Іконка Facebook (16x22px)
- `instagram-icon.svg` - Іконка Instagram (21x21px)
- `youtube-icon.svg` - Іконка YouTube (22x19px)
- `pinterest-icon.svg` - Іконка Pinterest (6x12px)

## Компіляція

Для компіляції MJML в HTML використовуйте:

```bash
npx mjml email1.mjml -o email1.html
```

## Особливості template

### ✅ Реалізовано
- Повністю адаптивний дизайн
- Використання MJML компонентів для кращої сумісності
- Інлайн стилі для максимальної сумісності з email клієнтами
- Структура відповідає Figma дизайну
- Правильна типографіка (Nunito Sans, Lato)
- Кольорова схема відповідає брендингу

### 📱 Адаптивність
- Mobile-first підхід
- Breakpoint на 480px
- Адаптивні зображення та текст
- Правильне масштабування на всіх пристроях

### 🎨 Стилізація
- Тіні та закруглення
- Градієнти та ефекти
- Правильні відступи та spacing
- Семантична HTML структура

## Email клієнти

Template оптимізований для:
- Gmail (всі версії)
- Outlook (2016, 2019, 365)
- Apple Mail
- Yahoo Mail
- Thunderbird
- Мобільні email клієнти

## Використання

1. ✅ Всі зображення вже завантажені з Figma макету
2. Скомпілюйте MJML файл: `npx mjml email1.mjml -o email1.html`
3. Протестуйте в різних email клієнтах
4. Відправте через ваш email сервіс

## Примітки

- Всі зображення повинні бути оптимізовані для web
- Рекомендується використовувати PNG для іконок
- SVG файли повинні бути оптимізовані
- Розмір email не повинен перевищувати 100KB 