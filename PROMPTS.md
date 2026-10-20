# Промпты для генерации изображений и видео

Сейчас на сайте только **реальные фото залов** с wedwed.ru — их стоит оставить. Генерация нужна для «настроения»: живого главного экрана, карточек форматов, блока меню и цветочных украшений.

**Как подключить:** положите готовый файл по указанному пути — сайт подхватит его сам, без правок кода. Если формат другой (png/jpg/mov), пришлите мне — сконвертирую в нужный и сожму.

## Общий стиль (добавляйте к каждому промпту для картинок)

```
luxury wedding editorial photography, soft natural light, warm ivory and champagne-gold palette,
cream, beige and taupe tones, crystal and gold accents, airy and elegant, shallow depth of field,
shot on medium format film, fine art wedding style, no text, no logos, no watermark
```

Палитра сайта: слоновая кость `#FBF8F2`, крем `#F4EDE2`, тауп `#A8957F`, золото `#B48C55`, тёмный шоколад `#2A231E`.

---

## 1. Видео для главного экрана (самое эффектное)

Файл: `assets/video/hero.mp4` — показывается в арке справа от заголовка (вертикальная рамка).
Формат **4:5 вертикальный (1080×1350)**, 6–10 секунд, бесшовный цикл, без звука, до 5 МБ.

**Лучше делать image-to-video** — первым кадром загрузите реальное фото зала `assets/img/halls/zolotoy-01.webp`, тогда видео покажет настоящий зал, а не выдуманный.

```
Slow cinematic dolly forward along the white aisle of a grand banquet hall,
cascading crystal curtains above gently sway and sparkle, warm golden light flickers softly,
white flower arrangements on round tables with white tablecloths, dust particles glowing in the light,
no people, elegant and calm, smooth camera motion, seamless loop
```

Запасной вариант (тоже от фото `zolotoy-04.webp`):
```
Slow downward tilt from crystal chandeliers and hanging crystal strands to a festive wedding banquet below,
gentle shimmer of crystals, warm ambient lights slowly brighten, no people, seamless loop
```

---

## 2. Карточки «Для каких событий»

Папка `assets/img/gen/`, формат **6:5 (1200×1000)**, `.webp`. Сейчас там стоят фото залов.

| Файл | Промпт |
|---|---|
| `format-wedding.webp` | Bride and groom's first dance in a luxurious ballroom with crystal chandeliers and white flowers, warm golden bokeh, guests softly blurred around round banquet tables, romantic, faces turned away from camera |
| `format-jubilee.webp` | Elegant anniversary celebration: a beautifully set long banquet table with white peonies, tall gold candlesticks, crystal glasses with champagne, a tiered white cake with gold leaf, warm evening light |
| `format-corporate.webp` | Corporate gala dinner in a dark banquet hall with a starry ceiling, round tables with gold tablecloths, stage with large screen and soft blue and gold stage lights, guests in black tie blurred |
| `format-graduation.webp` | Graduation party: young people in evening dresses and suits raising champagne glasses, confetti and golden balloons in the air, festive ballroom lights, joyful, faces partly blurred |
| `format-birthday.webp` | Chic birthday celebration: champagne tower with golden light, sparklers on a white cake, balloons in cream and gold, ballroom with chandeliers in the background, bokeh |
| `format-presentation.webp` | Elegant business presentation in a modern event hall: rows of white chairs facing a stage with a big screen, soft spotlight on a speaker podium, starry ceiling lights, clean and premium |

---

## 3. Блок «Банкетное меню»

Папка `assets/img/gen/`, `.webp`.

| Файл | Формат | Промпт |
|---|---|---|
| `menu-1.webp` | 3:4 (900×1200), верх обрезается аркой | Fine dining banquet plate close-up: beautifully plated main course on white porcelain with gold rim, microgreens and sauce drops, crystal wine glass and gold cutlery beside, white tablecloth, soft window light |
| `menu-2.webp` | 4:3 (1200×900) | Overhead view of an elegant banquet table: canapés, oysters on ice, salads, cold cuts and fruit on silver and gold platters, white flowers, champagne glasses, ivory linen |

---

## 4. Цветочные украшения (как орхидеи в 4-м референсе)

Прозрачный фон (PNG с альфа-каналом), примерно 1000×1000, путь `assets/img/gen/`. Появятся по углам карточек «Выездная регистрация», «Подарок» и формы заявки.

| Файл | Промпт |
|---|---|
| `flowers-corner.png` | Watercolor botanical illustration of a corner bouquet: white garden roses, blush peonies, eucalyptus and delicate gold leaves, soft painterly style, isolated on transparent background, flows from bottom-right corner |
| `flowers-left.png` | Watercolor illustration of a trailing branch of white orchids and eucalyptus with thin gold accents, growing from the left edge upward, isolated on transparent background |
| `flowers-right.png` | Watercolor illustration of a small cluster of white peonies and blush roses with gold-leaf foliage, hanging from the top-right corner, isolated on transparent background |

Если генератор не умеет прозрачный фон — сделайте на чисто белом, я вырежу.
