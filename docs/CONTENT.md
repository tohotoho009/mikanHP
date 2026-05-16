# CONTENT.md — 未完 サイトコンテンツ定義

> このファイルはサイト内の全テキスト・画像・リンクの唯一の真実（Single Source of Truth）です。
> コピーや画像URLを変更する場合はここを先に編集してください。

---

## 店舗基本情報

```yaml
name_ja:    "未完"
name_kana:  "みかん"
name_en:    "Wabar Mikan"
genre:      "焼き鳥・比内地鶏・居酒屋"
address:    "〒176-0001 東京都練馬区栄町4-9"
access:
  - "西武池袋線 江古田駅 南口 徒歩約5分"
  - "都営大江戸線 新江古田駅 徒歩約10分"
hours:      "月〜日 17:00〜24:00（L.O. 23:30）"
closed:     "不定休あり"
budget:     "¥4,000〜4,999（お一人様・夜）"
phone:      "03-3557-2122"
instagram:  "https://www.instagram.com/wabarmikan/"
tabelog:    "https://tabelog.com/tokyo/A1321/A132101/13196558/"
```

---

## ナビゲーション

```yaml
logo: "未完"
logo_href: "#hero"

links:
  - label: "お店について"
    href: "#concept"
  - label: "ギャラリー"
    href: "#gallery"
  - label: "お品書き"
    href: "#menu"
  - label: "ご予約"
    href: "#reserve"
  - label: "アクセス"
    href: "#access"
```

---

## セクション別コンテンツ

---

### Hero

```yaml
en_sub:   "Wabar Mikan — Ekoda, Tokyo"
title:    "未完"
sub:      "東京 江古田 ― 比内地鶏"
scroll_label: "scroll"

bg_image: "images/kanban.jpg"
```

---

### Concept

```yaml
section_label: "about"
section_title: "完成を\n目指さない、\nという完成。"   # <br> で改行

body:
  - "江古田の静かな路地に佇む、\n比内地鶏の焼き鳥を専門とした一軒。\n日本三大地鶏のひとつ、秋田・比内地鶏を\n炭火でじっくりと焼き上げる。"
  - "「未完」とは、常に進化し続ける姿勢のこと。\n毎夜、鮮度にこだわった比内地鶏と向き合い、\n今夜だけの一串をお届けします。"
  - "気取らず、でも真剣に。\n江古田の夜に、ふらりと寄れる焼き鳥店。"

hinai_label: "比内地鶏について"
hinai_body: "秋田県で育つ比内地鶏は、日本三大地鶏のひとつ。\n旨味と歯応えが際立つ赤身の肉質と、濃厚なコクが特徴。\n生産量が少なく希少ながら、その滋味深い風味は炭火焼きでこそ真価を発揮する。"

image:
  src: "images/tennai.jpg"
  alt: "未完 店内"
```

---

### Gallery

```yaml
section_label: "gallery"
section_title: "料理・店内"

footer_text: "最新の料理写真は"
footer_link_label: "Instagram @wabarmikan"
footer_link_href: "https://www.instagram.com/wabarmikan/"
footer_suffix: "をご覧ください"

images:
  - src: "images/kanban.jpg"
    caption: "未完"
    alt: "看板"
  - src: "images/tennai.jpg"
    caption: "店内"
    alt: "店内"
  - src: "https://tblg.k-img.com/restaurant/images/Rvw/102628/640x640_rect_102628468.jpg"
    caption: "本日の一品"
    alt: "料理"
  - src: "https://tblg.k-img.com/restaurant/images/Rvw/102628/640x640_rect_102628341.jpg"
    caption: "旬の素材"
    alt: "料理"
  - src: "https://tblg.k-img.com/restaurant/images/Rvw/102628/640x640_rect_102628312.jpg"
    caption: "季節の肴"
    alt: "料理"
  - src: "https://tblg.k-img.com/restaurant/images/Rvw/102628/640x640_rect_102628492.jpg"
    caption: "季節の一品"
    alt: "料理"
```

> **画像追加方法**：食べログの写真URLは
> `https://tblg.k-img.com/restaurant/images/Rvw/102628/640x640_rect_XXXXXXX.jpg`
> の番号部分を変更するだけで追加可能。

---

### Menu

```yaml
section_label: "menu"
section_title: "お品書き"
note: "仕入れ状況により内容が変わる場合がございます"
footer_note: |
  メニューの詳細・最新情報は食べログ・Instagramをご確認ください
  アレルギーのある方はご来店前にお知らせください

courses:
  - en: "Omakase Course"
    title: "おまかせコース"
    dishes: 12
    menu:
      - "前菜"
      - "焼き物"
      - "一品料理"
      - "季節の土鍋御飯"
    price: "¥ 3,500"
    price_note: "税抜 / 税込 ¥ 3,850"


alacarte:
  - name: "刺身盛り合わせ"
    price: "時価"
  - name: "だし巻き玉子"
    price: "¥ 550"
  - name: "天ぷら盛り合わせ"
    price: "¥ 1,100〜"
  - name: "季節の焼き魚"
    price: "時価"
  - name: "もつ煮込み"
    price: "¥ 660"
  - name: "冷やしトマト"
    price: "¥ 440"
```

> ⚠️ **要確認**：食べログに37品・コース6種のメニューが掲載されている。
> 実際の内容・価格はオーナーに確認の上、このファイルを更新すること。

---

### Reserve

```yaml
section_label: "reservation"
section_title: "ご予約・お問い合わせ"

body: |
  ご予約はInstagramのDMよりお気軽にどうぞ。
  少人数のお一人様から宴会まで承ります。

occasion_note: "デートや会食、記念日のご利用もお気軽にどうぞ。"

info_items:
  - label: "営業時間"
    value: "月〜日 17:00〜24:00"
    note: "L.O. 23:30"
  - label: "定休日"
    value: "不定休"
    note: "不定休あり"
  - label: "予算"
    value: "¥ 4,000〜4,999"
    note: "お一人様・夜"
  - label: "SNS"
    value: "@wabarmikan"
    note: "Instagram DM予約可"

buttons:
  - label: "Instagram でご予約"
    href: "https://www.instagram.com/wabarmikan/"
    variant: "primary"
  - label: "食べログを見る"
    href: "https://tabelog.com/tokyo/A1321/A132101/13196558/"
    variant: "ghost"
```

---

### Access

```yaml
section_label: "access"
section_title: "アクセス"

map_embed_src: "https://maps.google.com/maps?q=東京都練馬区栄町4-9&output=embed&z=16&hl=ja"

info:
  - dt: "店名"
    dd: "未完（みかん）"
  - dt: "住所"
    dd: "〒176-0001 東京都練馬区栄町4-9"
    note:
      - "西武池袋線 江古田駅 南口 徒歩約5分"
      - "都営大江戸線 新江古田駅 徒歩約10分"
  - dt: "営業"
    dd: "月〜日 17:00〜24:00"
    note: "不定休あり"
  - dt: "予算"
    dd: "¥ 4,000〜4,999"

note: |
  お車でのご来店は近隣のコインパーキングをご利用ください。
  最新情報はInstagramをご確認ください。

sns_links:
  - label: "Instagram"
    href: "https://www.instagram.com/wabarmikan/"
  - label: "食べログ"
    href: "https://tabelog.com/tokyo/A1321/A132101/13196558/"
```

---

### Footer

```yaml
logo: "未完"
copy: "東京都練馬区栄町4-9 ／ © 未完"
```

---

## OGP / メタ情報（未設定・要追加）

```html
<meta name="description" content="江古田の焼き鳥「未完」。日本三大地鶏・比内地鶏の焼き鳥を専門とした一軒。炭火でじっくりと。東京都練馬区栄町4-9。">
<meta property="og:title" content="未完 — 江古田">
<meta property="og:description" content="比内地鶏の焼き鳥を専門とした一軒。江古田駅南口 徒歩5分。">
<meta property="og:image" content="https://tblg.k-img.com/restaurant/images/Rvw/102628/640x640_rect_102628468.jpg">
<meta property="og:type" content="restaurant">
<meta name="twitter:card" content="summary_large_image">
```

---

---

## 外部プロフィール文

### Instagram プロフィール文（改訂案）

```
🔥 比内地鶏の炭火焼き鳥 | 江古田・隠れ家カウンター
日本三大地鶏・比内地鶏をおまかせコースで。
旬の食材と日本酒、炭火の香りが交わる夜を。

📍 西武池袋線 江古田駅 南口 徒歩5分
⏰ 毎日 17:00〜24:00
📞 03-3557-2122

▶ ご予約はDMまたはHPフォームから
```

> キーワード（検索流入を意識）：焼鳥 / 比内地鶏 / 炭火 / 日本酒 / おまかせコース / カウンター / 隠れ家 / 江古田

---

### Google ビジネスプロフィール 説明文（草案）

```
江古田駅南口から徒歩5分の路地裏にある、比内地鶏の焼き鳥専門店。
日本三大地鶏のひとつ・秋田比内地鶏を炭火でじっくりと焼き上げる
おまかせコースをご提供しています。

一人飲みからデート・会食・記念日まで、
気取らずゆっくり過ごせる隠れ家的カウンター席。
毎日17時から営業、ご予約はInstagramのDMまたはHPフォームから。
```

---

## TODO（コンテンツ）

- [ ] 店主に実際のコース内容・価格を確認し alacarte / courses を更新
- [ ] 電話番号を確認・追加
- [ ] 実際の営業時間・定休日を最終確認
- [ ] 自前の高解像度写真に差し替え（食べログCDN依存の解消）
- [ ] OGPタグ設定
- [ ] Google Analytics タグ追加（任意）
