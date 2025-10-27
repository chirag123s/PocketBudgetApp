/**
 * Prop Type Checker Utility
 *
 * Helps detect string-to-boolean conversion errors on Android
 */

export function checkBooleanProp(
  componentName: string,
  propName: string,
  value: any
): void {
  if (value !== undefined && typeof value !== 'boolean') {
    console.error(
      `❌ ${componentName} PROP ERROR: ${propName} is ${typeof value} (expected boolean)`,
      `\n   Value:`, value,
      `\n   String representation:`, String(value)
    );
  }
}

export function checkNumberProp(
  componentName: string,
  propName: string,
  value: any
): void {
  if (value !== undefined && typeof value !== 'number') {
    console.error(
      `❌ ${componentName} PROP ERROR: ${propName} is ${typeof value} (expected number)`,
      `\n   Value:`, value
    );
  }
}

export function checkStringProp(
  componentName: string,
  propName: string,
  value: any
): void {
  if (value !== undefined && typeof value !== 'string') {
    console.error(
      `❌ ${componentName} PROP ERROR: ${propName} is ${typeof value} (expected string)`,
      `\n   Value:`, value
    );
  }
}

/**
 * Validate all props of a component
 */
export function validateProps(
  componentName: string,
  props: Record<string, any>,
  schema: Record<string, 'boolean' | 'number' | 'string'>
): void {
  Object.entries(schema).forEach(([propName, expectedType]) => {
    const value = props[propName];

    if (value === undefined) return;

    const actualType = typeof value;

    if (actualType !== expectedType) {
      console.error(
        `❌ ${componentName} PROP TYPE MISMATCH:`,
        `\n   Prop: ${propName}`,
        `\n   Expected: ${expectedType}`,
        `\n   Actual: ${actualType}`,
        `\n   Value:`, value,
        `\n   ⚠️ This will cause "String cannot be cast to Boolean" error on Android!`
      );
    }
  });
}
