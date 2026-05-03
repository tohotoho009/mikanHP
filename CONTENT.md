# CONTENT.md — 和バル 未完 サイトコンテンツ定義

> このファイルはサイト内の全テキスト・画像・リンクの唯一の真実（Single Source of Truth）です。
> コピーや画像URLを変更する場合はここを先に編集してください。

---

## 店舗基本情報

```yaml
name_ja:    "和バル 未完"
name_kana:  "わバル みかん"
name_en:    "Wabar Mikan"
genre:      "和食・居酒屋・和バル"
address:    "〒176-0001 東京都練馬区栄町4-9"
access:
  - "西武池袋線 江古田駅 南口 徒歩約5分"
  - "都営大江戸線 新江古田駅 徒歩約10分"
hours:      "月〜日 17:00〜24:00（L.O. 23:30）"
closed:     "不定休あり"
budget:     "¥4,000〜4,999（お一人様・夜）"
phone:      ""   # 要確認・追加
instagram:  "https://www.instagram.com/wabarmikan/"
tabelog:    "https://tabelog.com/tokyo/A1321/A132101/13196558/"
```

---

## ナビゲーション

```yaml
logo: "和バル 未完"
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
title:    "和バル\n未完"           # <br> で改行
sub:      "東京 江古田 ― 和食 & バル"
scroll_label: "scroll"

bg_image: "https://tblg.k-img.com/restaurant/images/Rvw/102628/640x640_rect_102628468.jpg"
```

---

### Concept

```yaml
section_label: "about"
section_title: "完成を\n目指さない、\nという完成。"   # <br> で改行

body:
  - "江古田の静かな路地に佇む、\n和食とバルが溶け合う一軒。\n旬の素材を丁寧に仕込み、\n日本酒・ワインと寄り添う一皿を。"
  - "「未完」とは、常に進化し続ける姿勢のこと。\n毎夜、新鮮な目で素材と向き合い、\n今夜だけの料理をお届けします。"
  - "気取らず、でも真剣に。\n江古田の夜に、ふらりと寄れる場所。"

image:
  src: "https://tblg.k-img.com/restaurant/images/Rvw/102628/640x640_rect_102628395.jpg"
  alt: "和バル未完 店内"
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
  - src: "https://tblg.k-img.com/restaurant/images/Rvw/102628/640x640_rect_102628468.jpg"
    caption: "本日の一品"
    alt: "料理"
  - src: "https://tblg.k-img.com/restaurant/images/Rvw/102628/640x640_rect_102628341.jpg"
    caption: "旬の素材"
    alt: "料理"
  - src: "https://tblg.k-img.com/restaurant/images/Rvw/102628/640x640_rect_102628492.jpg"
    caption: "店内"
    alt: "店内"
  - src: "https://tblg.k-img.com/restaurant/images/Rvw/102628/640x640_rect_102628312.jpg"
    caption: "季節の肴"
    alt: "料理"
  - src: "https://tblg.k-img.com/restaurant/images/Rvw/102628/640x640_rect_102628395.jpg"
    caption: "夜の雰囲気"
    alt: "雰囲気"
  - src: "https://tblg.k-img.com/restaurant/images/Rvw/102628/640x640_rect_102628468.jpg"
    caption: "おすすめ"
    alt: "おすすめ"
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
    price_note: "（税込）"


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
    dd: "和バル 未完（わバル みかん）"
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
logo: "和バル 未完"
copy: "東京都練馬区栄町4-9 ／ © 和バル 未完"
```

---

## OGP / メタ情報（未設定・要追加）

```html
<meta name="description" content="江古田の和バル「未完」。旬の素材を活かした和食とバルの融合。日本酒・ワインと寄り添う一皿を。東京都練馬区栄町4-9。">
<meta property="og:title" content="和バル 未完 — 江古田">
<meta property="og:description" content="旬の素材を活かした和食とバルの融合。江古田駅南口 徒歩5分。">
<meta property="og:image" content="https://tblg.k-img.com/restaurant/images/Rvw/102628/640x640_rect_102628468.jpg">
<meta property="og:type" content="restaurant">
<meta name="twitter:card" content="summary_large_image">
```

---

## TODO（コンテンツ）

- [ ] 店主に実際のコース内容・価格を確認し alacarte / courses を更新
- [ ] 電話番号を確認・追加
- [ ] 実際の営業時間・定休日を最終確認
- [ ] 自前の高解像度写真に差し替え（食べログCDN依存の解消）
- [ ] OGPタグ設定
- [ ] Google Analytics タグ追加（任意）
