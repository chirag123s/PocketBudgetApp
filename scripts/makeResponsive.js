const fs = require('fs');
const path = require('path');
const glob = require('glob');

/**
 * Script to automatically update all screens to use responsive font sizes
 * from responsive.ts instead of hardcoded values or theme.typography
 */

// Font size mapping: theme.typography -> responsive.fontSize
const typographyMapping = {
  'theme.typography.styles.h1': 'responsive.fontSize.h1',
  'theme.typography.styles.h2': 'responsive.fontSize.h2',
  'theme.typography.styles.h3': 'responsive.fontSize.h3',
  'theme.typography.styles.h4': 'responsive.fontSize.h4',
  'theme.typography.styles.body': 'responsive.fontSize.base',
  'theme.typography.styles.bodyLarge': 'responsive.fontSize.lg',
  'theme.typography.styles.bodySmall': 'responsive.fontSize.sm',
  'theme.typography.styles.caption': 'responsive.fontSize.xs',
  'theme.typography.styles.label': 'responsive.fontSize.sm',
  'fontSize: 10': 'fontSize: responsive.fontSize.xs',
  'fontSize: 12': 'fontSize: responsive.fontSize.xs',
  'fontSize: 14': 'fontSize: responsive.fontSize.sm',
  'fontSize: 16': 'fontSize: responsive.fontSize.md',
  'fontSize: 18': 'fontSize: responsive.fontSize.lg',
  'fontSize: 20': 'fontSize: responsive.fontSize.xl',
  'fontSize: 24': 'fontSize: responsive.fontSize.h4',
  'fontSize: 28': 'fontSize: responsive.fontSize.h3',
  'fontSize: 32': 'fontSize: responsive.fontSize.h2',
  'fontSize: 36': 'fontSize: responsive.fontSize.h1',
  'fontSize: 40': 'fontSize: responsive.fontSize.display',
};

// Spacing mapping: theme.spacing -> responsive.spacing
const spacingMapping = {
  'marginBottom: theme.spacing[1]': 'marginBottom: responsive.spacing[1]',
  'marginBottom: theme.spacing[2]': 'marginBottom: responsive.spacing[2]',
  'marginBottom: theme.spacing[3]': 'marginBottom: responsive.spacing[3]',
  'marginBottom: theme.spacing[4]': 'marginBottom: responsive.spacing[4]',
  'marginBottom: theme.spacing[5]': 'marginBottom: responsive.spacing[5]',
  'marginBottom: theme.spacing[6]': 'marginBottom: responsive.spacing[6]',
  'marginBottom: theme.spacing[8]': 'marginBottom: responsive.spacing[8]',
  'padding: theme.spacing[4]': 'padding: responsive.spacing[4]',
  'padding: theme.spacing[6]': 'padding: responsive.spacing[6]',
  'paddingHorizontal: theme.spacing[4]': 'paddingHorizontal: responsive.spacing[4]',
  'paddingHorizontal: theme.spacing[6]': 'paddingHorizontal: responsive.spacing[6]',
  'gap: theme.spacing[2]': 'gap: responsive.spacing[2]',
  'gap: theme.spacing[4]': 'gap: responsive.spacing[4]',
};

function updateFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Check if file already imports responsive
  const hasResponsiveImport = content.includes("from '@/constants/responsive'");

  // Apply typography mappings
  for (const [oldPattern, newPattern] of Object.entries(typographyMapping)) {
    if (content.includes(oldPattern)) {
      content = content.replace(new RegExp(oldPattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newPattern);
      modified = true;
    }
  }

  // Apply spacing mappings
  for (const [oldPattern, newPattern] of Object.entries(spacingMapping)) {
    if (content.includes(oldPattern)) {
      content = content.replace(new RegExp(oldPattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newPattern);
      modified = true;
    }
  }

  // Add responsive import if not present and file was modified
  if (modified && !hasResponsiveImport) {
    // Find the theme import line
    const themeImportRegex = /import\s+{[^}]*}\s+from\s+'@\/constants\/theme';/;
    const themeImportMatch = content.match(themeImportRegex);

    if (themeImportMatch) {
      // Add responsive import after theme import
      content = content.replace(
        themeImportMatch[0],
        themeImportMatch[0] + "\nimport { responsive } from '@/constants/responsive';"
      );
    }
  }

  // Write back if modified
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }

  return false;
}

// Find all .tsx files in app directory
const files = glob.sync('app/**/*.tsx', { cwd: process.cwd() });

let updatedCount = 0;
const updatedFiles = [];

console.log(`Found ${files.length} files to check...\n`);

files.forEach(file => {
  const fullPath = path.join(process.cwd(), file);
  if (updateFile(fullPath)) {
    updatedCount++;
    updatedFiles.push(file);
    console.log(`✅ Updated: ${file}`);
  }
});

console.log(`\n🎉 Updated ${updatedCount} files successfully!`);
if (updatedFiles.length > 0) {
  console.log('\nUpdated files:');
  updatedFiles.forEach(file => console.log(`  - ${file}`));
}
