from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN

prs = Presentation()
prs.slide_width = Inches(13.33)
prs.slide_height = Inches(7.5)

DARK_BG   = RGBColor(0x1A, 0x1A, 0x2E)
ACCENT    = RGBColor(0x7C, 0x3A, 0xED)
ACCENT2   = RGBColor(0xF5, 0x9E, 0x0B)
WHITE     = RGBColor(0xFF, 0xFF, 0xFF)
LIGHT     = RGBColor(0xC4, 0xB5, 0xFD)
GRAY      = RGBColor(0x94, 0xA3, 0xB8)


def set_bg(slide, color):
    fill = slide.background.fill
    fill.solid()
    fill.fore_color.rgb = color


def add_textbox(slide, text, left, top, width, height,
                font_size=18, bold=False, color=WHITE,
                align=PP_ALIGN.LEFT, wrap=True):
    txBox = slide.shapes.add_textbox(Inches(left), Inches(top), Inches(width), Inches(height))
    tf = txBox.text_frame
    tf.word_wrap = wrap
    p = tf.paragraphs[0]
    p.alignment = align
    run = p.add_run()
    run.text = text
    run.font.size = Pt(font_size)
    run.font.bold = bold
    run.font.color.rgb = color
    return txBox


def add_rect(slide, left, top, width, height, color, alpha=None):
    shape = slide.shapes.add_shape(
        1,  # MSO_SHAPE_TYPE.RECTANGLE
        Inches(left), Inches(top), Inches(width), Inches(height)
    )
    shape.fill.solid()
    shape.fill.fore_color.rgb = color
    shape.line.fill.background()
    return shape


# ── Slide 1: Title ─────────────────────────────────────────────────────────────
slide1 = prs.slides.add_slide(prs.slide_layouts[6])
set_bg(slide1, DARK_BG)

add_rect(slide1, 0, 2.8, 13.33, 0.08, ACCENT)
add_rect(slide1, 0, 3.0, 13.33, 0.08, ACCENT2)

add_textbox(slide1, "✨ Gemini AI 사주 풀이 서비스",
            0.5, 1.2, 12, 1.2, font_size=40, bold=True,
            color=WHITE, align=PP_ALIGN.CENTER)

add_textbox(slide1, "개발 과정 & 트러블슈팅 정리",
            0.5, 2.6, 12, 0.8, font_size=22,
            color=LIGHT, align=PP_ALIGN.CENTER)

add_textbox(slide1, "2026. 03. 15",
            0.5, 6.5, 12, 0.6, font_size=16,
            color=GRAY, align=PP_ALIGN.CENTER)


# ── Slide 2: 프로젝트 개요 ────────────────────────────────────────────────────
slide2 = prs.slides.add_slide(prs.slide_layouts[6])
set_bg(slide2, DARK_BG)

add_rect(slide2, 0, 0, 13.33, 1.2, ACCENT)
add_textbox(slide2, "01  프로젝트 개요",
            0.5, 0.2, 12, 0.8, font_size=28, bold=True,
            color=WHITE, align=PP_ALIGN.LEFT)

items = [
    ("🎯 목적",   "사용자의 생년월일·시간을 입력받아 Gemini AI가 사주를 해석·풀이하는 웹 서비스"),
    ("🛠 기술 스택", "React (프론트엔드)  ·  Vercel Serverless Function (백엔드 API)  ·  Google Gemini API"),
    ("📁 저장소",  "GitHub — hohyun8/saju  |  Branch: claude/gemini-fortune-reader-Vofve"),
    ("🌐 배포",   "Vercel (자동 배포 — master 브랜치 머지 시 트리거)"),
]

for i, (title, desc) in enumerate(items):
    y = 1.5 + i * 1.3
    add_rect(slide2, 0.5, y, 12.3, 1.1, RGBColor(0x2D, 0x1B, 0x69))
    add_textbox(slide2, title, 0.7, y + 0.05, 3, 0.45,
                font_size=15, bold=True, color=ACCENT2)
    add_textbox(slide2, desc, 0.7, y + 0.5, 11.5, 0.55,
                font_size=14, color=LIGHT)


# ── Slide 3: 개발 단계 ────────────────────────────────────────────────────────
slide3 = prs.slides.add_slide(prs.slide_layouts[6])
set_bg(slide3, DARK_BG)

add_rect(slide3, 0, 0, 13.33, 1.2, ACCENT)
add_textbox(slide3, "02  개발 단계",
            0.5, 0.2, 12, 0.8, font_size=28, bold=True,
            color=WHITE)

steps = [
    ("STEP 1", "프론트엔드 구현",
     "React 컴포넌트로 사주 입력 폼 UI 제작\n생년월일·시간 입력 → Gemini에 프롬프트 전송"),
    ("STEP 2", "보안 문제 발견",
     "클라이언트에서 직접 Gemini API 호출 → API Key 노출 위험\n공개 배포 시 보안 취약점 식별"),
    ("STEP 3", "Serverless Function 이전",
     "Vercel Serverless Function (/api/fortune.js) 신설\nAPI Key를 환경변수로 보호 → 클라이언트에 미노출"),
]

colors = [RGBColor(0x1E, 0x3A, 0x5F), RGBColor(0x3B, 0x1A, 0x1A), RGBColor(0x1A, 0x3B, 0x2A)]

for i, (step, title, desc) in enumerate(steps):
    x = 0.5 + i * 4.2
    add_rect(slide3, x, 1.4, 3.9, 5.5, colors[i])
    add_rect(slide3, x, 1.4, 3.9, 0.55, ACCENT)
    add_textbox(slide3, step, x + 0.1, 1.45, 3.7, 0.45,
                font_size=13, bold=True, color=WHITE)
    add_textbox(slide3, title, x + 0.1, 2.05, 3.7, 0.55,
                font_size=16, bold=True, color=ACCENT2)
    add_textbox(slide3, desc, x + 0.1, 2.75, 3.7, 3.8,
                font_size=13, color=LIGHT)


# ── Slide 4: 트러블슈팅 ───────────────────────────────────────────────────────
slide4 = prs.slides.add_slide(prs.slide_layouts[6])
set_bg(slide4, DARK_BG)

add_rect(slide4, 0, 0, 13.33, 1.2, RGBColor(0x9F, 0x1A, 0x1A))
add_textbox(slide4, "03  트러블슈팅",
            0.5, 0.2, 12, 0.8, font_size=28, bold=True,
            color=WHITE)

issues = [
    ("🔴 문제 1", "gemini-2.0-flash 모델 권한 오류",
     "에러: The caller does not have permission\nlimit: 0 → 해당 모델 사용 불가",
     "🟢 해결", "모델을 gemini-2.5-flash로 변경\n(무료 티어 지원 모델 사용)"),
    ("🔴 문제 2", "수동 재배포 후에도 오류 지속",
     "Vercel Redeploy = 이전 코드 재실행\n새 코드가 반영되지 않음",
     "🟢 해결", "master 브랜치에 PR 머지 필요\n→ Vercel이 새 코드로 자동 재배포"),
]

for i, (prob_label, prob_title, prob_desc, sol_label, sol_desc) in enumerate(issues):
    y = 1.4 + i * 2.8
    add_rect(slide4, 0.5, y, 5.8, 2.4, RGBColor(0x3B, 0x1A, 0x1A))
    add_textbox(slide4, prob_label, 0.7, y + 0.1, 5.4, 0.4,
                font_size=13, bold=True, color=RGBColor(0xFC, 0xA5, 0xA5))
    add_textbox(slide4, prob_title, 0.7, y + 0.5, 5.4, 0.45,
                font_size=15, bold=True, color=WHITE)
    add_textbox(slide4, prob_desc, 0.7, y + 1.0, 5.4, 1.2,
                font_size=13, color=LIGHT)

    add_textbox(slide4, "→", 6.5, y + 0.9, 0.5, 0.5,
                font_size=24, bold=True, color=ACCENT2, align=PP_ALIGN.CENTER)

    add_rect(slide4, 7.1, y, 5.7, 2.4, RGBColor(0x1A, 0x3B, 0x2A))
    add_textbox(slide4, sol_label, 7.3, y + 0.1, 5.3, 0.4,
                font_size=13, bold=True, color=RGBColor(0x6E, 0xE7, 0xB7))
    add_textbox(slide4, sol_desc, 7.3, y + 0.55, 5.3, 1.7,
                font_size=14, color=LIGHT)


# ── Slide 5: Vercel 배포 흐름 ─────────────────────────────────────────────────
slide5 = prs.slides.add_slide(prs.slide_layouts[6])
set_bg(slide5, DARK_BG)

add_rect(slide5, 0, 0, 13.33, 1.2, ACCENT)
add_textbox(slide5, "04  Vercel 배포 흐름",
            0.5, 0.2, 12, 0.8, font_size=28, bold=True,
            color=WHITE)

nodes = [
    (0.4,  3.2, "코드 수정\n(로컬)"),
    (2.9,  3.2, "feature 브랜치\npush"),
    (5.4,  3.2, "GitHub PR\n생성 & 머지"),
    (7.9,  3.2, "master\n브랜치 업데이트"),
    (10.4, 3.2, "Vercel\n자동 재배포"),
]

node_colors = [ACCENT, ACCENT, RGBColor(0x06, 0x95, 0x4C),
               RGBColor(0x06, 0x95, 0x4C), ACCENT2]

for i, (x, y, label) in enumerate(nodes):
    add_rect(slide5, x, y, 2.2, 1.5, node_colors[i])
    add_textbox(slide5, label, x + 0.1, y + 0.35, 2.0, 0.85,
                font_size=13, bold=True, color=WHITE, align=PP_ALIGN.CENTER)
    if i < len(nodes) - 1:
        add_textbox(slide5, "▶", x + 2.25, y + 0.55, 0.4, 0.4,
                    font_size=18, color=ACCENT2, align=PP_ALIGN.CENTER)

add_textbox(slide5,
            "⚠️  주의: Vercel의 [Redeploy] 버튼은 이전 코드를 재실행하므로 새 코드가 반영되지 않습니다.\n"
            "반드시 master 브랜치에 PR을 머지해야 최신 코드로 재배포됩니다.",
            0.5, 5.2, 12.3, 1.5, font_size=14,
            color=ACCENT2)


# ── Slide 6: PR 머지 방법 ─────────────────────────────────────────────────────
slide6 = prs.slides.add_slide(prs.slide_layouts[6])
set_bg(slide6, DARK_BG)

add_rect(slide6, 0, 0, 13.33, 1.2, RGBColor(0x06, 0x95, 0x4C))
add_textbox(slide6, "05  GitHub PR 머지 방법",
            0.5, 0.2, 12, 0.8, font_size=28, bold=True,
            color=WHITE)

steps6 = [
    ("1", "https://github.com/hohyun8/saju 접속"),
    ("2", "상단 Pull requests 탭 클릭"),
    ("3", "New pull request 버튼 클릭"),
    ("4", "base: master  /  compare: claude/gemini-fortune-reader-Vofve  설정"),
    ("5", "Create pull request 클릭 → 제목 입력 → 다시 Create pull request"),
    ("6", "PR 페이지에서 Merge pull request → Confirm merge"),
    ("7", "1~2분 후 Vercel 자동 재배포 완료 → 사이트 테스트"),
]

for i, (num, text) in enumerate(steps6):
    y = 1.4 + i * 0.76
    add_rect(slide6, 0.5, y, 0.55, 0.55, ACCENT)
    add_textbox(slide6, num, 0.5, y + 0.05, 0.55, 0.45,
                font_size=16, bold=True, color=WHITE, align=PP_ALIGN.CENTER)
    add_textbox(slide6, text, 1.3, y + 0.05, 11.5, 0.5,
                font_size=15, color=LIGHT)


# ── Slide 7: 마무리 ───────────────────────────────────────────────────────────
slide7 = prs.slides.add_slide(prs.slide_layouts[6])
set_bg(slide7, DARK_BG)

add_rect(slide7, 0, 2.5, 13.33, 0.08, ACCENT)
add_rect(slide7, 0, 2.7, 13.33, 0.08, ACCENT2)

add_textbox(slide7, "감사합니다",
            0.5, 1.0, 12, 1.2, font_size=48, bold=True,
            color=WHITE, align=PP_ALIGN.CENTER)

add_textbox(slide7, "Gemini AI 사주 풀이 서비스 — 개발 완료",
            0.5, 3.2, 12, 0.8, font_size=20,
            color=LIGHT, align=PP_ALIGN.CENTER)

summary = "React  ·  Vercel Serverless  ·  Google Gemini API  ·  GitHub"
add_textbox(slide7, summary,
            0.5, 4.2, 12, 0.7, font_size=16,
            color=GRAY, align=PP_ALIGN.CENTER)


prs.save("/home/user/saju/사주_프로젝트_발표.pptx")
print("저장 완료: 사주_프로젝트_발표.pptx")
