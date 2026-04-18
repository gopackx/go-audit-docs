"""Generate placeholder go-audit logo assets.

Outputs:
  public/go-audit-icon.png    512x512 shield with checkmark on dark background
  public/og-image.png         1200x630 social card (backup to dynamic opengraph-image.tsx)

Replace either file with a production asset whenever it's ready — the
filenames are what matters, not the design.
"""
from __future__ import annotations

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
PUBLIC.mkdir(exist_ok=True)

# Brand colors
BG_DARK = (10, 10, 10)
BLUE = (37, 99, 235)
BLUE_SOFT = (59, 130, 246)
WHITE = (229, 231, 235)
MUTED = (107, 114, 128)


def draw_shield(draw: ImageDraw.ImageDraw, cx: int, cy: int, size: int, stroke: int):
    """Stylized shield + checkmark in the Fumadocs blue."""
    half = size // 2
    top = cy - half - size // 12
    # Shield body as a rounded polygon (pointy-bottom)
    shield_pts = [
        (cx, top),
        (cx + half, top + size // 6),
        (cx + half, cy + size // 4),
        (cx, cy + half),
        (cx - half, cy + size // 4),
        (cx - half, top + size // 6),
    ]
    draw.polygon(shield_pts, outline=BLUE, fill=None, width=stroke)

    # Checkmark
    cm_left = cx - size // 4
    cm_mid = cx - size // 12
    cm_right = cx + size // 4
    cm_y1 = cy
    cm_y2 = cy + size // 6
    cm_y3 = cy - size // 8
    draw.line(
        [(cm_left, cm_y1), (cm_mid, cm_y2), (cm_right, cm_y3)],
        fill=BLUE,
        width=stroke,
        joint="curve",
    )


def build_icon(path: Path, size: int = 512):
    img = Image.new("RGBA", (size, size), BG_DARK + (255,))
    draw = ImageDraw.Draw(img)
    draw_shield(draw, size // 2, size // 2, int(size * 0.66), stroke=max(6, size // 40))
    img.save(path, format="PNG")


def build_og(path: Path, width: int = 1200, height: int = 630):
    img = Image.new("RGB", (width, height), BG_DARK)
    draw = ImageDraw.Draw(img)

    # Icon on the left-ish
    icon_center_x = width // 2 - 260
    icon_center_y = height // 2 - 40
    draw_shield(draw, icon_center_x, icon_center_y, 160, stroke=10)

    # Wordmark
    try:
        font_title = ImageFont.truetype("arial.ttf", 96)
        font_sub = ImageFont.truetype("arial.ttf", 36)
        font_code = ImageFont.truetype("consola.ttf", 28)
    except OSError:
        font_title = ImageFont.load_default()
        font_sub = ImageFont.load_default()
        font_code = ImageFont.load_default()

    draw.text((icon_center_x + 120, icon_center_y - 60), "GO AUDIT", font=font_title, fill=WHITE)
    draw.text(
        (icon_center_x + 120, icon_center_y + 50),
        "Automatic audit trail for Go",
        font=font_sub,
        fill=MUTED,
    )

    # Install strip at the bottom
    cmd = "$ go get github.com/gopackx/go-audit"
    bbox = draw.textbbox((0, 0), cmd, font=font_code)
    tw = bbox[2] - bbox[0]
    box_x = (width - tw) // 2 - 24
    box_y = height - 120
    draw.rounded_rectangle(
        [box_x, box_y, box_x + tw + 48, box_y + 56],
        radius=10,
        outline=(31, 41, 55),
        fill=(17, 24, 39),
        width=1,
    )
    draw.text((box_x + 24, box_y + 14), cmd, font=font_code, fill=MUTED)

    img.save(path, format="PNG", optimize=True)


if __name__ == "__main__":
    build_icon(PUBLIC / "go-audit-icon.png")
    build_og(PUBLIC / "og-image.png")
    print(f"wrote {PUBLIC/'go-audit-icon.png'}")
    print(f"wrote {PUBLIC/'og-image.png'}")
