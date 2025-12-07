# Body Fat View - Pose Guide Image Generation Prompts

Use these prompts with Gemini Image Generation to create pose guide overlays for the scan upload flow.

---

## Quick Scan Mode

### 1. Quick Scan - Full Body Front

**Filename**: `quick-scan-front-guide.png`

**Prompt**:
```
Create a simple, clean illustration showing the correct pose for a body scan photo.
Show a gender-neutral human silhouette in a standing position, viewed from the front.

Style: Minimalist line art with a light blue outline on transparent or white background.

Pose details:
- Standing upright, facing forward
- Arms slightly away from body (about 15-20 degrees from sides)
- Feet shoulder-width apart
- Full body visible from head to toes
- Neutral, relaxed posture

Visual markers:
- Add subtle dotted vertical line showing body center alignment
- Add small icons at corners suggesting "full body must be in frame"
- Clean, modern, health/fitness app aesthetic
- Simple enough to understand at a glance

Size: 400x600px or similar portrait orientation
Format: PNG with transparency preferred
```

---

## Detail Scan Mode

### 2. Detail Scan - Full Body Front View

**Filename**: `detail-scan-front-guide.png`

**Prompt**:
```
Create a simple, clean illustration showing the correct pose for a precision body scan photo (front view).
Show a gender-neutral human silhouette in minimal clothing (underwear/sports bra + shorts).

Style: Minimalist line art with a darker blue outline on transparent or white background.

Pose details:
- Standing upright, facing directly forward toward camera
- Arms slightly away from body (about 15-20 degrees from sides)
- Feet shoulder-width apart
- Full body visible from head to toes
- Neutral, relaxed posture
- Show silhouette wearing minimal clothing (sports bra + shorts or underwear)

Visual markers:
- Add subtitle text "FRONT VIEW" at bottom
- Add dotted vertical line showing body center alignment
- Add small frame corners suggesting "full body must be in frame"
- Add small icon showing "minimal clothing" requirement
- Badge or icon indicating "Photo 1 of 2"
- Clean, modern, health/fitness app aesthetic

Size: 400x600px or similar portrait orientation
Format: PNG with transparency preferred
```

### 3. Detail Scan - Full Body Side View

**Filename**: `detail-scan-side-guide.png`

**Prompt**:
```
Create a simple, clean illustration showing the correct pose for a precision body scan photo (side view).
Show a gender-neutral human silhouette in minimal clothing (underwear/sports bra + shorts), viewed from the LEFT SIDE (profile).

Style: Minimalist line art with a darker blue outline on transparent or white background.

Pose details:
- Standing upright, turned 90 degrees to show LEFT side profile
- Arms hanging naturally at sides or slightly away from body
- Feet together or slightly apart
- Full body visible from head to toes in profile
- Neutral, relaxed posture
- Show silhouette wearing minimal clothing (sports bra + shorts or underwear)
- Clear side profile showing body contours

Visual markers:
- Add subtitle text "SIDE VIEW (LEFT)" at bottom
- Add curved arrow showing 90-degree rotation from front view
- Add small frame corners suggesting "full body must be in frame"
- Badge or icon indicating "Photo 2 of 2"
- Clean, modern, health/fitness app aesthetic

Size: 400x600px or similar portrait orientation
Format: PNG with transparency preferred
```

---

## Mode Selection Card Thumbnails (Optional)

### 4. Quick Scan Mode Icon/Thumbnail

**Filename**: `quick-scan-icon.png`

**Prompt**:
```
Create a small icon/thumbnail representing "Quick Scan" mode for body composition analysis.

Show: A simple silhouette of a person in regular clothing (t-shirt + pants), standing in front pose.
Add a single camera/scan icon or line overlay to indicate "1 photo required"

Style: Minimal, friendly, approachable
Colors: Light blue or teal
Size: 200x200px square thumbnail
Format: PNG with transparency
```

### 5. Detail Scan Mode Icon/Thumbnail

**Filename**: `detail-scan-icon.png`

**Prompt**:
```
Create a small icon/thumbnail representing "Detail Scan" mode for body composition analysis.

Show: Two small silhouettes side-by-side - one facing front, one showing side profile.
Both in minimal clothing (sports wear).
Add "2" badge or indicator showing "2 photos required"

Style: Minimal, professional, precise
Colors: Darker blue or navy
Size: 200x200px square thumbnail
Format: PNG with transparency
```

---

## Usage Instructions

1. Generate each image using Gemini Image Generation or your preferred AI image tool
2. Save files to `/public/pose-guides/` folder in Next.js project
3. Import in components:
   ```typescript
   import QuickScanGuide from '@/public/pose-guides/quick-scan-front-guide.png';
   import DetailScanFront from '@/public/pose-guides/detail-scan-front-guide.png';
   import DetailScanSide from '@/public/pose-guides/detail-scan-side-guide.png';
   ```

4. Display as overlays or guidelines in upload UI

---

## Alternative: Manual Design

If AI-generated images don't meet quality standards, consider:
- Hiring a designer on Fiverr/99designs
- Using Figma with body silhouette templates
- Canva templates for pose guides
- Stock illustration sites (with appropriate licensing)

---

**Total Images Needed**: 3 required (5 if including mode icons)
