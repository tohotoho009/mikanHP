---
version: 1.0
name: 未完
description: 未完のデザインシステム。漆黒と和紙白を基調に、深みのある金をアクセントとした、比内地鶏の焼き鳥専門店の空間を体現する。
---

## Overview

「未完」のビジュアルは **漆黒のキャンバス × 和紙の白 × 金の余韻** で構成される。主要な背景は深い炭色（#0f0e0c）で、すべての競合する「クール」なブラックと距離を置く。見出しは明朝体（游明朝 / Noto Serif JP）を400ウェイトで使い、ウェイトを上げる代わりに字間を広げることで格調を表現する。CTAは金色（#c8a96e）のみ——スパリングに使い、輝度で訴える。

サーフェスは3モードを交互に使う：
1. **炭キャンバス** — ページの床、デフォルト背景
2. **和紙カード** — コンテンツカード、メニューセクション
3. **漆黒バンド** — フッター、CTAバンド

---

## Colors

```
colors:
  # Brand
  primary: "#c8a96e"          # 金 — CTA・アクセント
  primary-active: "#a88a4e"   # 金ダーク — ホバー・押下
  primary-disabled: "#4a4438" # 金グレー — 非活性

  # Canvas / Surface
  canvas: "#0f0e0c"           # 漆黒 — ページの床
  surface-soft: "#161410"     # やや浮いた炭
  surface-card: "#1e1b16"     # 和紙カード（ライト）
  surface-card-warm: "#252019" # 和紙カード（ディープ）
  surface-light: "#f5f0e6"    # 和紙白 — 反転セクション用

  # Text
  ink: "#f0ebe0"              # 和紙白 — 見出し・主要テキスト
  body: "#c8c0b0"             # 本文
  muted: "#8a8070"            # 補足・キャプション
  muted-soft: "#605850"       # 最小テキスト

  # On light surfaces
  ink-dark: "#1a1612"         # 和紙面上の文字
  body-dark: "#3a3228"        # 和紙面上の本文

  # Hairline / Border
  hairline: "#2e2a22"         # 区切り線（ダーク面）
  hairline-light: "#d8d0c0"   # 区切り線（ライト面）

  # Semantic
  success: "#6a9a6a"
  error: "#b05050"
```

---

## Typography

```
typography:
  display-xl:
    fontFamily: "游明朝, Yu Mincho, Noto Serif JP, serif"
    fontSize: 64px
    fontWeight: 300
    lineHeight: 1.2
    letterSpacing: 0.15em

  display-lg:
    fontFamily: "游明朝, Yu Mincho, Noto Serif JP, serif"
    fontSize: 48px
    fontWeight: 300
    lineHeight: 1.25
    letterSpacing: 0.12em

  display-md:
    fontFamily: "游明朝, Yu Mincho, Noto Serif JP, serif"
    fontSize: 32px
    fontWeight: 300
    lineHeight: 1.3
    letterSpacing: 0.1em

  display-sm:
    fontFamily: "游明朝, Yu Mincho, Noto Serif JP, serif"
    fontSize: 22px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0.08em

  title-lg:
    fontFamily: "游ゴシック, Yu Gothic, Noto Sans JP, sans-serif"
    fontSize: 18px
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: 0.05em

  title-md:
    fontFamily: "游ゴシック, Yu Gothic, Noto Sans JP, sans-serif"
    fontSize: 15px
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: 0.05em

  body-md:
    fontFamily: "游ゴシック, Yu Gothic, Noto Sans JP, sans-serif"
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.8
    letterSpacing: 0.03em

  body-sm:
    fontFamily: "游ゴシック, Yu Gothic, Noto Sans JP, sans-serif"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.8
    letterSpacing: 0.03em

  caption:
    fontFamily: "游ゴシック, Yu Gothic, Noto Sans JP, sans-serif"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: 0.08em

  caption-uppercase:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: 11px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0.2em

  price:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: 20px
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: 0.05em

  button:
    fontFamily: "游ゴシック, Yu Gothic, Noto Sans JP, sans-serif"
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1
    letterSpacing: 0.12em

  nav-link:
    fontFamily: "游ゴシック, Yu Gothic, Noto Sans JP, sans-serif"
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0.1em
```

---

## Spacing

```
spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 40px
  xxl: 64px
  section: 120px
```

---

## Rounded

```
rounded:
  none: 0px
  xs: 2px
  sm: 4px
  md: 6px
  lg: 10px
  pill: 9999px
```

---

## Components

```
components:
  button-primary:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    border: "1px solid {colors.primary}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "12px 32px"
    height: 44px

  button-primary-filled:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.canvas}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "12px 32px"
    height: 44px

  top-nav:
    backgroundColor: "transparent (scroll: {colors.canvas}aa)"
    textColor: "{colors.ink}"
    typography: "{typography.nav-link}"
    height: 72px
    borderBottom: "1px solid {colors.hairline} (on scroll)"

  hero-band:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.display-xl}"
    paddingVertical: "{spacing.section}"

  section-band:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.ink}"
    paddingVertical: "{spacing.section}"

  feature-card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.title-lg}"
    rounded: "{rounded.none}"
    padding: "{spacing.xl}"
    borderLeft: "2px solid {colors.primary}"

  menu-card:
    backgroundColor: "{colors.surface-card-warm}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "{spacing.xl}"
    borderTop: "1px solid {colors.hairline}"

  menu-item-row:
    borderBottom: "1px solid {colors.hairline}"
    paddingVertical: "{spacing.md}"
    typography: "{typography.body-md}"

  divider-kanji:
    typography: "{typography.caption-uppercase}"
    textColor: "{colors.primary}"
    letterSpacing: 0.3em

  badge-gold:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    border: "1px solid {colors.primary}"
    typography: "{typography.caption}"
    rounded: "{rounded.none}"
    padding: "3px 10px"

  footer:
    backgroundColor: "#080706"
    textColor: "{colors.muted}"
    typography: "{typography.body-sm}"
    paddingVertical: "{spacing.xxl}"
```

---

## Elevation

深さはカラーブロックで表現。シャドウは使わない。
- `{colors.canvas}` → `{colors.surface-soft}` → `{colors.surface-card}` → `{colors.surface-card-warm}` の順で「浮き」を演出
- 区切りは細いボーダー（1px hairline）または金の縦線（2px primary）

---

## Do's & Don'ts

### Do
- 背景は常に炭系。純粋な黒（#000000）は使わない
- 明朝体は見出しのみ。本文・ナビはゴシック
- 金（primary）は節制する——CTA・アクセント・価格のみ
- 字間を広く取る（和文 0.05em〜0.15em）
- セクション間は `{spacing.section}`（120px）を厳守

### Don't
- 角丸を多用しない（`{rounded.none}` が基本）
- 白背景を使わない（和紙白は反転セクション限定）
- ウェイトを上げて強調しない——字間・サイズ・金色で強調する
- 4色目のアクセントカラーを追加しない
