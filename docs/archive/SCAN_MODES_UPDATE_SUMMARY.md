# Scan Modes Feature - Update Summary

## Overview
Added **Quick Scan** and **Detail Scan** modes to Body Fat View, giving users choice between fast/clothed scanning (1 photo) and precise/minimal-clothing scanning (2 photos: front + side).

---

## Key Changes

### 1. Two Scan Modes

#### **Quick Scan**
- **Photos**: 1 (full body front)
- **Clothing**: Any clothing acceptable (avoid heavy coats/jackets)
- **Accuracy**: ±5-8% range
- **Confidence**: 40-70% baseline
- **Best for**: Privacy-conscious users, initial assessments, quick progress checks
- **Credits**: 1 scan

#### **Detail Scan**
- **Photos**: 2 (full body front + full body left side)
- **Clothing**: Minimal (underwear or fitted athletic wear)
- **Accuracy**: ±2-4% range
- **Confidence**: 60-85% baseline
- **Best for**: Precise tracking, serious fitness goals, detailed analysis
- **Credits**: 1 scan

---

## Database Schema Updates

### `scans` table - NEW FIELDS
```sql
scan_mode VARCHAR(20) NOT NULL,      -- 'quick' or 'detail'
photos_uploaded INTEGER NOT NULL,     -- 1 for quick, 2 for detail
```

**Purpose**: Track which mode was used for each scan (affects result display and accuracy ranges)

---

## User Flow Changes

### NEW Step 1: Mode Selection

**Before Height/Weight Input**, users now choose scan mode:

**UI**: Two cards side-by-side
- Quick Scan card (light blue, friendly)
- Detail Scan card (darker blue, professional) - default selected

**Each card shows**:
- Mode icon/thumbnail
- Photos required (1 vs 2)
- Accuracy range
- Brief description
- "Select" button

**Cannot change mode** after selection (locked once they proceed to height/weight)

### Updated Photo Upload Step

**Quick Scan**:
- Single upload area
- Pose guide overlay for full body front
- Any clothing acceptable (warn if heavy coat detected)

**Detail Scan**:
- Two upload areas side-by-side
- Photo 1: Front view (with pose guide)
- Photo 2: Side view (with pose guide)
- Both required to proceed
- Minimal clothing expected (warn if excessive clothing detected)

---

## Edge Function Updates

### Request Format - CHANGED
```typescript
{
  scanMode: 'quick' | 'detail',     // NEW
  images: string[],                  // CHANGED: array (was single image)
  userId: string,
  heightCm: number,
  weightKg: number
}
```

### Flow Updates
1. Validate `scanMode` and `images.length` match (1 for quick, 2 for detail)
2. Send appropriate number of images to Gemini in single API call
3. Use mode-specific Gemini prompt
4. Validate quality (major issues = don't charge)
5. Check clothing warnings (still charge, reduce confidence)
6. Store `scan_mode` and `photos_uploaded` in database

---

## Gemini API Integration

### Multi-Image Support
**Research Finding**: Gemini supports up to **3,600 images per request**
- Send 2 images inline (base64) in single API call
- Each image ~1,120 tokens
- Total request size <20MB (iPhone photos: 2-5MB each = 4-10MB total)
- **No image stitching needed** - Gemini handles multiple images natively

### Mode-Specific Prompts

**Quick Scan Prompt**:
- Mentions "user chose Quick Scan with 1 photo"
- Expects any clothing
- Instructs wider ranges (±5-8%)
- Lower confidence baseline (0.4-0.7)
- Sets `clothing_coverage` to: `heavy_coat | baggy | moderate | fitted | minimal`
- Returns `back: null` (no back photo)

**Detail Scan Prompt**:
- Mentions "user chose Detail Scan with 2 photos (front + side)"
- Expects minimal/fitted clothing
- Instructs tighter ranges (±2-4%)
- Higher confidence baseline (0.6-0.85)
- Uses side view to estimate back
- Can return `back: {...}` from side photo

---

## Validation & Warnings

### Major Validation (Don't Charge if Failed)
- Multiple people detected
- No person detected
- Full body not visible
- Image quality too poor

### Clothing Warnings (Still Charge, Adjust Confidence)

**Quick Scan**:
- Detect `heavy_coat` → Reduce confidence by 20-30%
- Show warning: "Heavy clothing detected. Accuracy significantly reduced."
- Still process and provide results

**Detail Scan**:
- Detect `moderate` or `baggy` clothing → Reduce confidence by 15-25%
- Show warning: "More clothing than recommended. For best results, wear minimal clothing."
- Still process and provide results

**User Experience**: No hard rejections for clothing (bad UX + wastes API cost)

---

## UI/UX Updates

### Scan Results Page

**NEW: Scan Info Card** (top of results)
- Badge: "Quick Scan" or "Detail Scan"
- Scan date
- If clothing warning: Banner explaining impact

**Updated: Overall Summary**
- Accuracy note based on mode:
  - Quick Scan: "±5-8% accuracy range"
  - Detail Scan: "±2-4% accuracy range"
- Confidence score (may be reduced due to clothing)

**Updated: Body Part Breakdown**
- Show "Not visible" for null body parts
- Gray out regions on body visualization if null
- Quick Scan: Back always "Not visible"
- Detail Scan: Can estimate back from side photo

### Dashboard

**Scan History Table**:
- Now shows scan mode badge for each scan
- Helps users understand why some scans have wider ranges

---

## Component Updates

**NEW Components**:
- `ScanModeSelection.tsx` - Mode selection cards
- Updated `ScanUpload.tsx` - Multi-step flow with mode handling
- Updated `HeightWeightForm.tsx` - Now step 2 (after mode selection)

**Updated Logic**:
- Multi-image upload handling
- Mode-specific pose guides
- Clothing warning display

---

## Image Assets Needed

Created [IMAGE_GENERATION_PROMPTS.md](IMAGE_GENERATION_PROMPTS.md) with prompts for:

1. `quick-scan-front-guide.png` - Pose guide for Quick Scan
2. `detail-scan-front-guide.png` - Front pose for Detail Scan
3. `detail-scan-side-guide.png` - Side pose for Detail Scan
4. `quick-scan-icon.png` (optional) - Mode card thumbnail
5. `detail-scan-icon.png` (optional) - Mode card thumbnail

**Action Item**: Generate these images and save to `/public/pose-guides/`

---

## Implementation Phases - Updated

### Phase 4: Core Scan Feature - ADDED TASKS
- [ ] Build scan mode selection UI (2 cards)
- [ ] Create mode-specific pose guide components
- [ ] Update ScanUpload to handle 1 or 2 images based on mode
- [ ] Implement multi-image upload (2 separate file inputs for Detail Scan)
- [ ] Update Edge Function to accept `scanMode` and `images` array
- [ ] Create mode-specific Gemini prompts (Quick vs Detail)
- [ ] Implement clothing detection and warning logic
- [ ] Test Gemini multi-image API call (2 images inline)
- [ ] Store `scan_mode` and `photos_uploaded` in database
- [ ] Handle null body parts in results display
- [ ] Gray out body visualization regions when null
- [ ] Show mode badge on scan results page
- [ ] Display clothing warnings if detected

### Phase 9: Testing - ADDED TASKS
- [ ] Test Quick Scan with various clothing levels
- [ ] Test Detail Scan with 2 images (front + side)
- [ ] Verify clothing warnings display correctly
- [ ] Test null body part handling (cropped photos)
- [ ] Verify mode cannot be changed mid-scan
- [ ] Test Gemini API with 2 images in single call
- [ ] Verify confidence score adjustments for clothing
- [ ] Test that heavy coats trigger warnings in Quick Scan
- [ ] Test that excessive clothing triggers warnings in Detail Scan

---

## Benefits

### 1. **User Choice & Flexibility**
- Privacy-conscious users can use Quick Scan fully clothed
- Serious users get Detail Scan precision
- No forced exposure/discomfort

### 2. **Better Accuracy Transparency**
- Users understand accuracy trade-offs upfront
- Mode badge on results shows which was used
- Confidence scores reflect clothing impact

### 3. **Improved AI Estimates**
- Detail Scan with 2 angles = better depth perception
- Side view helps estimate back, legs, overall depth
- Front + side = more complete body composition picture

### 4. **Cost Efficiency**
- Both modes cost same credits (no premium for Detail Scan)
- Single Gemini API call for Detail Scan (not 2 separate calls)
- No image stitching complexity needed

### 5. **UX Polish**
- Clothing warnings instead of hard rejections (better UX)
- Clear pose guides reduce bad uploads
- Mode selection sets expectations correctly

---

## Technical Implementation Notes

### Gemini Multi-Image API Call (Detail Scan)
```typescript
const response = await gemini.generateContent({
  contents: [
    { text: detailScanPrompt },
    {
      inline_data: {
        mime_type: 'image/jpeg',
        data: base64Image1  // Front photo
      }
    },
    {
      inline_data: {
        mime_type: 'image/jpeg',
        data: base64Image2  // Side photo
      }
    }
  ]
});
```

### Clothing Detection Logic (Edge Function)
```typescript
const clothingCoverage = results.validation.clothing_coverage;
let confidenceAdjustment = 0;

if (scanMode === 'quick') {
  if (clothingCoverage === 'heavy_coat') {
    confidenceAdjustment = -0.25; // Reduce by 25%
    validationIssues.push('Heavy clothing detected');
  }
} else if (scanMode === 'detail') {
  if (['moderate', 'baggy'].includes(clothingCoverage)) {
    confidenceAdjustment = -0.20; // Reduce by 20%
    validationIssues.push('More clothing than recommended');
  }
}

const adjustedConfidence = Math.max(0.3,
  results.confidence_score + confidenceAdjustment
);
```

---

## Migration Considerations

For existing scans (if any):
- Old scans won't have `scan_mode` field → Can default to `'quick'`
- Old scans won't have `photos_uploaded` field → Default to `1`
- Acceptable since this is V1 launch (likely no existing users yet)

---

## Summary

The scan modes feature provides:
- ✅ User choice between privacy/speed vs precision
- ✅ Transparent accuracy ranges per mode
- ✅ Intelligent clothing detection with warnings (not hard rejections)
- ✅ Multi-image support for Detail Scan (2 photos: front + side)
- ✅ No cost difference (both modes = 1 credit)
- ✅ Gemini multi-image API integration (single call for 2 images)
- ✅ Null handling for body parts not visible in photos
- ✅ Mode-specific Gemini prompts for optimal results

**All changes documented in [INITIAL_SPEC.md](INITIAL_SPEC.md)**
**Image generation prompts in [IMAGE_GENERATION_PROMPTS.md](IMAGE_GENERATION_PROMPTS.md)**
