# Height & Weight Integration - Update Summary

## Overview
Updated the Body Fat View specification to include mandatory height and weight input before each scan. This data is sent to Gemini API to improve accuracy of body composition estimates.

---

## Key Changes Made

### 1. Database Schema Updates

#### `user_profiles` table - NEW FIELDS
```sql
-- Biometric data
height_cm DECIMAL(5,2),           -- Height in centimeters (e.g., 175.5)
height_unit VARCHAR(10) DEFAULT 'cm',  -- 'cm' or 'ft/in' for display preference
last_weight_kg DECIMAL(5,2),      -- Last entered weight (for pre-filling)
```

**Purpose**:
- Store user's height (saved once, rarely changes)
- Store last weight for pre-filling next scan
- Track unit preference (metric vs imperial)

#### `scans` table - NEW FIELDS
```sql
-- User input data (captured at time of scan)
height_cm DECIMAL(5,2) NOT NULL,  -- Height in cm at time of scan
weight_kg DECIMAL(5,2) NOT NULL,  -- Weight in kg at time of scan
```

**Purpose**:
- Capture exact height/weight used for each scan
- Enable historical tracking of weight changes
- Preserve data for report regeneration

#### `scan_results` JSONB - NEW STRUCTURE
```json
{
  "input_data": {
    "height_cm": 175.5,
    "weight_kg": 78.2,
    "bmi": 25.4
  },
  "overall": {
    "body_fat_percentage": { "min": 18, "max": 22 },
    "lean_mass_percentage": { "min": 78, "max": 82 },
    "estimated_fat_mass_kg": { "min": 14.1, "max": 17.2 },      // NEW
    "estimated_lean_mass_kg": { "min": 61.0, "max": 64.1 }      // NEW
  },
  // ... rest of structure
}
```

**New Fields**:
- `input_data`: BMI + height/weight used for scan
- `estimated_fat_mass_kg`: Calculated fat mass in kg
- `estimated_lean_mass_kg`: Calculated lean mass in kg

---

### 2. User Flow Changes

#### NEW: Pre-Scan Height & Weight Step

**Step 1: Height & Weight Input** (required before image upload)

**Height**:
- Pre-filled from `user_profiles.height_cm` if available
- Toggle between cm and ft/in
- Range: 120-250 cm (4'0" - 8'2")
- Checkbox: "Save height to my profile" (default: checked)

**Weight**:
- Pre-filled from `user_profiles.last_weight_kg` if available
- Toggle between kg and lbs
- Range: 35-300 kg (77-660 lbs)
- Auto-saved to profile on each scan

**Display**:
- Auto-calculated BMI: "Your BMI: 25.4"
- Help text: "Height and weight help improve accuracy"
- "Continue" button (disabled until valid)

**Step 2: Photo Upload** (existing flow, now step 2)
- Same as before
- Can go back to edit height/weight

**Step 3: Review & Submit** (new)
- Display: Height, Weight, BMI
- Image preview
- Edit buttons for all data
- "Analyze My Body" button

---

### 3. Edge Function Updates

#### `analyze-body-scan` - UPDATED REQUEST
```typescript
{
  image: string;      // Base64-encoded image data
  userId: string;
  heightCm: number;   // NEW: e.g., 175.5
  weightKg: number;   // NEW: e.g., 78.2
}
```

#### NEW FLOW STEPS
1. Authenticate request
2. **NEW**: Validate height/weight input (range checks)
3. **NEW**: Calculate BMI
4. Check credits
5. **NEW**: Send image + height/weight/BMI to Gemini
6. Parse response
7. Validate quality
8. **NEW**: Store height/weight in scans table
9. **NEW**: Update user_profiles.last_weight_kg
10. Return results

---

### 4. Gemini API Prompt - ENHANCED

**NEW PROMPT STRUCTURE**:
```
You are a body composition analysis AI. Analyze the provided image
along with the user's biometric data and return a JSON response.

USER BIOMETRIC DATA:
- Height: {heightCm} cm
- Weight: {weightKg} kg
- BMI: {calculatedBMI}

REQUIREMENTS:

1. Validate the image...

2. Estimate body fat percentage using BOTH visual analysis AND biometric data:
   - Use height, weight, and visual cues together
   - Calculate fat mass and lean mass in kg
   - Body part breakdown with ranges

3. Provide 3-5 personalized recommendations:
   - Reference the user's height, weight, and BMI
   - Tailor advice based on composition

4-6. [Confidence scoring, input data inclusion, disclaimers]
```

**Key Enhancement**: Gemini now has height/weight context to make more accurate estimates.

---

### 5. UI/UX Updates

#### Dashboard (`/dashboard`)
**NEW Components**:
- Scan history now shows **Weight** column
- **Weight Over Time** chart
- **Combined Weight + Body Fat %** chart (dual-axis)
- Time range selector: 1M, 3M, 6M, 1Y, All

#### Scan Results (`/scan/[id]`)
**NEW Display**:
- **Input Data Summary Card** (top of page):
  - Height: 175 cm (5'9")
  - Weight: 78.2 kg (172 lbs)
  - BMI: 25.4
  - Scan Date

- **Enhanced Overall Summary**:
  - Estimated fat mass: "14.1-17.2 kg" (31-38 lbs)
  - Estimated lean mass: "61.0-64.1 kg" (134-141 lbs)

- **Updated Recommendations**:
  - Now reference height/weight/BMI
  - Example: "At 175cm and 78kg with 18-22% body fat..."

#### Settings (`/settings`)
**NEW Section: Biometric Data**
- Height: Editable with unit toggle
- Last Weight: Read-only display (shows last scan weight)
- Unit System Preference: Metric/Imperial (affects entire app)

---

### 6. Component Structure

**NEW Components**:
- `HeightWeightForm.tsx` - Height/weight input with unit conversion
- `WeightChart.tsx` - Weight tracking over time

**Updated Components**:
- `ScanUpload.tsx` - Now multi-step (height/weight → image → review)
- `ScanResult.tsx` - Shows input data + fat/lean mass
- `ScanHistory.tsx` - Includes weight column
- `BodyFatChart.tsx` - Enhanced with time range selector

---

### 7. Implementation Phases - Updated

**Phase 4: Core Scan Feature** - ADDED TASKS
- Build HeightWeightForm component
- Implement unit conversion logic
- Implement multi-step scan flow
- Update Edge Function to accept height/weight
- Store height/weight in scans table
- Update user profile with last_weight_kg

**Phase 6: Dashboard & History** - ADDED TASKS
- Build weight trend chart
- Build combined weight + body fat chart
- Implement time range selector

**Phase 8: Settings & Polish** - ADDED TASKS
- Implement height management
- Display last weight (read-only)
- Add unit system preference

**Phase 9: Testing** - ADDED TASKS
- Test height/weight input and conversions
- Test BMI calculations
- Test weight tracking across scans
- Verify height/weight storage

---

### 8. Landing Page Updates

**How It Works Section** - UPDATED
Old:
1. Upload a full-body photo
2. AI analyzes body composition
3. Get detailed report

New:
1. 📏 **Enter your height and weight**
2. 📸 Upload a full-body photo
3. 📊 Get AI-powered analysis with personalized recommendations

---

### 9. Future Enhancements (V2)

**NEW SECTION: DEXA Scan Calibration**
- Allow users to upload previous DEXA scan results
- Use DEXA data to calibrate AI estimates
- Show comparison between DEXA baseline and AI estimates
- Improves accuracy and builds trust

**Implementation**:
- New table: `dexa_scans` (user_id, body_fat_percentage, scan_date)
- Enhanced Gemini prompt with DEXA baseline
- UI in Settings or scan flow

---

## Benefits of Height/Weight Integration

### 1. **Improved Accuracy**
- Gemini can use BMI + visual analysis together
- Better estimates of fat mass vs lean mass in absolute kg
- More realistic body composition ranges

### 2. **Enhanced Personalization**
- Recommendations reference actual height/weight
- Context-aware advice (e.g., "At 175cm and 78kg...")
- BMI provides additional health context

### 3. **Progress Tracking**
- Users can track weight changes over time
- See correlation between weight and body fat %
- Identify body recomposition (gaining muscle while losing fat)

### 4. **Better User Experience**
- Pre-filled data from previous scans (saves time)
- Unit conversion support (metric/imperial)
- Complete health snapshot in one place

### 5. **Trust & Credibility**
- Shows we use multiple data points (not just image)
- Transparent about what data is used
- Scientific approach (BMI + visual analysis)

---

## Data Privacy

✅ **Height**: Stored in user profile, editable anytime
✅ **Weight**: Stored per scan, shows progression
✅ **Images**: Still NEVER stored (privacy-first commitment maintained)
✅ **BMI**: Calculated on-the-fly, included in scan results JSON

---

## Migration Path

If deploying to existing users (future consideration):

1. **Height**: Prompt users to add height on first scan after update
2. **Weight**: Required field, no pre-fill if first scan post-update
3. **Existing Scans**: Will not have height/weight data (acceptable)
4. **Charts**: Weight chart only visible for scans with weight data

---

## Testing Checklist

- [ ] Height/weight form validation (ranges, required fields)
- [ ] Unit conversions (cm ↔ ft/in, kg ↔ lbs)
- [ ] BMI calculation accuracy
- [ ] Height saves to profile correctly
- [ ] Weight updates on each scan
- [ ] Pre-fill works from previous data
- [ ] Gemini receives correct height/weight/BMI
- [ ] Scan results show input data
- [ ] Fat/lean mass calculations are correct
- [ ] Weight chart renders with 2+ scans
- [ ] Settings page height editing works
- [ ] Unit preference affects entire app
- [ ] Mobile responsiveness of forms

---

## Summary

The height/weight integration is a **critical enhancement** that:
- Significantly improves AI accuracy by providing biometric context
- Enables comprehensive progress tracking (weight + body fat %)
- Enhances personalization and user engagement
- Maintains privacy-first architecture (no image storage)
- Sets foundation for future features (DEXA calibration, deeper analytics)

**All changes documented end-to-end** in `INITIAL_SPEC.md`.
