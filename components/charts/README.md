# Chart Components

Centralized, reusable chart components with responsive scaling for the PocketBudget app.

## Available Charts

### 1. LineChart
Multi-line chart for displaying trends over time.

**Usage:**
```typescript
import { LineChart, LineChartDataPoint } from '@/components/charts';

const data: LineChartDataPoint[] = [
  { label: 'Jan', value: 420, compareValue: 500 },
  { label: 'Feb', value: 385, compareValue: 500 },
  { label: 'Mar', value: 450, compareValue: 500 },
];

<LineChart
  data={data}
  heightScale={100}        // Responsive height (uses ms())
  widthScale={280}         // Responsive width (uses ms())
  showGrid={true}          // Show grid lines
  showLabels={true}        // Show x-axis labels
  showLegend={true}        // Show legend
  showCompare={true}       // Show comparison line
  primaryColor="#007AFF"   // Primary line color
  compareColor="#8E8E93"   // Comparison line color
  primaryLabel="Spending"  // Legend label for primary
  compareLabel="Budget"    // Legend label for compare
/>
```

**Props:**
- `data` (required): Array of data points
- `heightScale`: Multiplier for responsive height (default: 100)
- `widthScale`: Multiplier for responsive width (default: 280)
- `showGrid`: Show grid lines (default: true)
- `showLabels`: Show x-axis labels (default: true)
- `showLegend`: Show legend (default: false)
- `showCompare`: Show comparison line (default: true)
- `primaryColor`: Primary line color (default: theme primary)
- `compareColor`: Comparison line color (default: neutral medium)
- `primaryLabel`: Legend label for primary (default: "Actual Spending")
- `compareLabel`: Legend label for compare (default: "Budget Limit")

---

### 2. DonutChart
Segmented circular chart for displaying category breakdowns.

**Usage:**
```typescript
import { DonutChart, DonutChartSegment } from '@/components/charts';

const data: DonutChartSegment[] = [
  { label: 'Groceries', value: 840, color: '#4CAF50' },
  { label: 'Shopping', value: 550, color: '#FF5252' },
  { label: 'Transport', value: 210, color: '#FFC107' },
  { label: 'Other', value: 250.75, color: '#2196F3' },
];

<DonutChart
  data={data}
  sizeScale={160}           // Responsive size (uses ms())
  strokeWidthScale={16}     // Responsive stroke width (uses ms())
  showLegend={true}         // Show legend with labels and values
  gapSize={2}               // Gap between segments in degrees
/>
```

**Props:**
- `data` (required): Array of segments
- `sizeScale`: Multiplier for responsive size (default: 160)
- `strokeWidthScale`: Multiplier for stroke width (default: 16)
- `showLegend`: Show legend with labels (default: true)
- `gapSize`: Gap between segments in degrees (default: 2)

---

### 3. CircularProgress
Circular progress indicator with percentage display.

**Usage:**
```typescript
import { CircularProgress } from '@/components/charts';

<CircularProgress
  percentage={75}
  sizeScale={120}           // Responsive size (uses ms())
  strokeWidthScale={12}     // Responsive stroke width (uses ms())
  color="#4CAF50"           // Custom color
  showPercentage={true}     // Show percentage in center
  autoColor={true}          // Auto-color based on percentage
/>

// With custom center content
<CircularProgress percentage={75}>
  <Text style={styles.customText}>75%</Text>
  <Text style={styles.customLabel}>Complete</Text>
</CircularProgress>
```

**Props:**
- `percentage` (required): Progress percentage (0-100)
- `sizeScale`: Multiplier for responsive size (default: 120)
- `strokeWidthScale`: Multiplier for stroke width (default: 12)
- `color`: Custom color (overrides autoColor)
- `showPercentage`: Show percentage in center (default: true)
- `children`: Custom center content (overrides showPercentage)
- `autoColor`: Auto-color based on thresholds (default: true)
  - 0-79%: Green (success)
  - 80-99%: Yellow (warning)
  - 100%+: Red (error)

---

## Responsive Scaling

All charts use the `ms()` function for responsive scaling:
- `heightScale={100}` → actual height = `ms(100)`
- `widthScale={280}` → actual width = `ms(280)`
- `sizeScale={120}` → actual size = `ms(120)`
- `strokeWidthScale={12}` → actual stroke = `ms(12)`

This ensures charts scale properly across different screen sizes.

## Design System Integration

All charts use:
- ✅ Theme colors from `@/constants/theme`
- ✅ Responsive spacing from `@/constants/responsive`
- ✅ Consistent typography and styling
- ✅ Border radius and shadows from theme

## Examples in Codebase

**LineChart:**
- `app/budget/category-details.tsx:211-221` (3-month trend)
- `app/budget/category-details.tsx:302-314` (6-month trend)

**DonutChart:**
- Can be used in `app/tabs/index.tsx` for spending breakdown

**CircularProgress:**
- Can be used in `app/tabs/budget.tsx` for budget progress
- Can be used in `app/budget/category-details.tsx` for category progress

## Adding New Chart Types

To add a new chart type:
1. Create `components/charts/YourChart.tsx`
2. Use responsive scaling with `ms()` for all dimensions
3. Use theme colors from `@/constants/theme`
4. Export from `components/charts/index.ts`
5. Add documentation in this README

## Notes

- All charts use `react-native-svg` for rendering
- Charts are optimized for performance with minimal SVG elements
- Supports both light/dark themes through theme colors
- Fully TypeScript typed with exported interfaces
