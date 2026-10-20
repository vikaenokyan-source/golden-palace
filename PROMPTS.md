# Промпты для генерации изображений и видео

На сайте — **реальные фото залов** с wedwed.ru (их оставляем) и сгенерированные картинки для «настроения».

## Что готово и что осталось

| Что | Файлы | Статус |
|---|---|---|
| Карточки «Для каких событий» | `format-wedding`, `format-jubilee`, `format-corporate`, `format-graduation`, `format-birthday`, `format-presentation` | ✅ готово |
| Блок «Банкетное меню» | `menu-1`, `menu-2` | ✅ готово |
| Цветы-украшения по углам карточек | `flowers-corner`, `flowers-left`, `flowers-right` | ✅ готово |
| Видео для первого экрана | видео зала | ✅ готово — стоит в блоке «Как мы работаем» |

## Как генерировать в ChatGPT

1. Новый чат на chatgpt.com → **первым сообщением** вставьте «Стиль серии» ниже.
2. Дальше по одной картинке: промпт из таблицы + формат из колонки «Формат».
3. Не понравилось — поправьте словами: «светлее», «меньше деталей», «как предыдущая, но крупнее».
4. Скачайте и **пришлите мне в чат** (или положите в `assets/img/gen/` с именем из колонки «Файл») — я сожму и подключу.

## Стиль серии (первое сообщение в чате)

Палитра сайта сейчас: тёплый белый, **шалфей** и **шампань**, глубокий оливковый для акцентов. Розового на сайте нет — поэтому и в картинках его избегаем.

```
I will ask you for a series of images for a wedding & banquet venue website. Keep one consistent style for all of them:
fine-art wedding editorial photography, soft diffused daylight, airy and elegant,
palette: warm off-white, ivory, champagne, pale sage green and soft olive, touches of crystal and glass;
no pink, no saturated colors, no harsh contrast, shallow depth of field, shot on medium format film.
No text, no letters, no logos, no watermarks in any image. Reply "ok" and wait for my prompts.
```

---

## 1. Блок «Банкетное меню» — 2 картинки

| Файл | Формат | Промпт |
|---|---|---|
| `menu-1` | Vertical 2:3 (верх обрежется аркой — главное держите в центре) | Fine dining banquet plate close-up: beautifully plated main course on white porcelain, microgreens and sauce drops, crystal wine glass and cutlery beside, ivory linen tablecloth, a small sprig of eucalyptus |
| `menu-2` | Horizontal 3:2 | Top view of an elegant banquet table: canapés, salads, cheese and fruit on porcelain and glass platters, white flowers and eucalyptus, champagne glasses, ivory linen |

---

## 2. Цветы-украшения — 3 картинки

Они появятся по углам карточек «Выездная регистрация», «Подарок за бронирование» и формы заявки (как орхидеи в референсе с приглашением, но в палитре сайта — белые цветы и шалфейная зелень).

Нужен **прозрачный фон** — допишите к промпту `Transparent background, PNG`. Проверка: за цветком в ChatGPT видна «шахматка». Если фон получился белым — всё равно присылайте, я вырежу.

| Файл | Формат | Промпт |
|---|---|---|
| `flowers-corner` | Square 1:1 | Watercolor botanical illustration of white phalaenopsis orchids with buds, eucalyptus and soft sage-green leaves, arranged as a corner bouquet flowing from the bottom-right corner, delicate realistic watercolor, isolated, transparent background |
| `flowers-left` | Square 1:1 | Watercolor illustration of a curved branch of white orchids with buds and sage-green eucalyptus, growing from the left edge upward, delicate realistic watercolor, isolated, transparent background |
| `flowers-right` | Square 1:1 | Watercolor illustration of a small cluster of white orchids, ivory roses and sage-green leaves hanging from the top-right corner, delicate realistic watercolor, isolated, transparent background |

---

## 3. Видео для первого экрана (по желанию)

ChatGPT видео не делает — нужен видеогенератор (Sora, Runway, Kling и т.п.).
Файл `assets/video/hero.mp4`, **вертикальный 9:16**, 6–10 секунд, без звука. На компьютере видео показывается в арке, на телефоне — на весь экран, поэтому главное держите в центре кадра.

Лучше **image-to-video**: загрузите первым кадром реальное фото зала `_for-ai/zolotoy-01.jpg` (или `zolotoy-04.jpg`) — тогда видео покажет настоящий зал.

```
Slow cinematic dolly forward along the white aisle of a grand banquet hall,
cascading crystal curtains above gently sway and sparkle, soft warm light flickers,
white flower arrangements on round tables, dust particles glowing in the light,
no people, elegant and calm, smooth camera motion, seamless loop
```
