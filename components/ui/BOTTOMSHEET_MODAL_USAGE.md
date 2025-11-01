# BottomSheetModal Component

A reusable bottom sheet modal component that provides a consistent UI/UX experience across the app.

## Features

- Slides up from the bottom with smooth animation
- Draggable handle at the top
- Customizable header with title and optional right action
- Scrollable or static content
- Optional footer for action buttons
- Themed styling that adapts to light/dark mode
- Tap outside to dismiss

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `visible` | `boolean` | - | Controls modal visibility |
| `onClose` | `() => void` | - | Callback when modal is dismissed |
| `title` | `string` | - | Title displayed in the header |
| `children` | `ReactNode` | - | Content to display in the modal body |
| `headerRight` | `ReactNode` | `undefined` | Optional component to display on the right side of header |
| `showHeader` | `boolean` | `true` | Whether to show the header |
| `showHandle` | `boolean` | `true` | Whether to show the drag handle |
| `scrollable` | `boolean` | `true` | Whether the content area should be scrollable |
| `maxHeight` | `string` | `'85%'` | Maximum height of the modal (e.g., '80%', '90%') |
| `footer` | `ReactNode` | `undefined` | Optional footer content (typically action buttons) |

## Basic Usage

```tsx
import { BottomSheetModal } from '@/components/ui';

function MyComponent() {
  const [showModal, setShowModal] = useState(false);

  return (
    <BottomSheetModal
      visible={showModal}
      onClose={() => setShowModal(false)}
      title="My Modal"
    >
      <Text>Modal content goes here</Text>
    </BottomSheetModal>
  );
}
```

## With Header Action

```tsx
<BottomSheetModal
  visible={showModal}
  onClose={() => setShowModal(false)}
  title="Settings"
  headerRight={
    <TouchableOpacity onPress={handleReset}>
      <Text style={{ color: theme.colors.primary }}>Reset</Text>
    </TouchableOpacity>
  }
>
  <Text>Content</Text>
</BottomSheetModal>
```

## With Footer Actions

```tsx
// ✅ CORRECT: No extra padding/margin in footer content
const footerContent = (
  <View style={{ flexDirection: 'row', gap: 12 }}>
    <TouchableOpacity
      style={{
        flex: 1,
        backgroundColor: colors.neutralBg,
        borderRadius: 12,
        paddingVertical: 12,
        alignItems: 'center',
      }}
      onPress={() => setShowModal(false)}
    >
      <Text>Cancel</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={{
        flex: 1,
        backgroundColor: colors.primary,
        borderRadius: 12,
        paddingVertical: 12,
        alignItems: 'center',
      }}
      onPress={handleConfirm}
    >
      <Text style={{ color: '#fff' }}>Confirm</Text>
    </TouchableOpacity>
  </View>
);

<BottomSheetModal
  visible={showModal}
  onClose={() => setShowModal(false)}
  title="Confirm Action"
  footer={footerContent}
>
  <Text>Are you sure you want to proceed?</Text>
</BottomSheetModal>

// ❌ WRONG: Don't add paddingHorizontal, marginHorizontal, or paddingBottom to footer
const wrongFooter = (
  <View style={{
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16, // ❌ Don't do this - already handled by modal
    paddingBottom: 20,     // ❌ Don't do this - already handled by modal
  }}>
    {/* ... */}
  </View>
);
```

## Non-Scrollable Content

```tsx
<BottomSheetModal
  visible={showModal}
  onClose={() => setShowModal(false)}
  title="Quick Actions"
  scrollable={false}
>
  <TouchableOpacity onPress={action1}>
    <Text>Action 1</Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={action2}>
    <Text>Action 2</Text>
  </TouchableOpacity>
</BottomSheetModal>
```

## Custom Height

```tsx
<BottomSheetModal
  visible={showModal}
  onClose={() => setShowModal(false)}
  title="Large Content"
  maxHeight="95%"
>
  <Text>Content that needs more space</Text>
</BottomSheetModal>
```

## Real-World Examples

See these files for complete implementations:

1. **DateRangePickerModal** (`components/transaction/DateRangePickerModal.tsx`)
   - Uses scrollable content
   - Custom header with date selectors
   - Footer with Cancel/Apply buttons

2. **Filter Modal** (`app/money/_transactions.tsx`)
   - Scrollable filter options
   - Reset button in header
   - Apply button in footer

## Best Practices

1. **Always provide a title** - Helps users understand the modal's purpose
2. **Use footer for primary actions** - Keep main CTAs visible at the bottom
3. **Keep content focused** - Don't overload the modal with too much information
4. **Use appropriate maxHeight** - Adjust based on content needs
5. **Handle state properly** - Reset modal state when closing if needed
6. **Don't add padding to footer content** - The BottomSheetModal already handles horizontal padding and safe area insets. Just style your buttons/content without margins or padding around them.

## Styling

The component automatically uses your app's theme colors. Content inside the modal can be styled normally using StyleSheet or inline styles.

```tsx
<BottomSheetModal visible={show} onClose={handleClose} title="Styled Content">
  <View style={styles.customContent}>
    <Text style={styles.customText}>Custom styled content</Text>
  </View>
</BottomSheetModal>
```
