const fs = require('fs');
const path = require('path');

/**
 * Script to update all screens to use responsive font sizes
 * Run with: node scripts/fix-responsive-fonts.js
 */

const files = [
  // Tab screens
  'app/tabs/index.tsx',
  'app/tabs/budget.tsx',
  'app/tabs/charts.tsx',
  'app/tabs/transactions.tsx',
  'app/tabs/settings.tsx',

  // Bank screens
  'app/bank/intro.tsx',
  'app/bank/select.tsx',
  'app/bank/account-selection.tsx',
  'app/bank/sync-settings.tsx',
  'app/bank/syncing.tsx',
  'app/bank/success.tsx',

  // Budget screens
  'app/budget/welcome.tsx',
  'app/budget/period.tsx',
  'app/budget/income.tsx',
  'app/budget/categories.tsx',
  'app/budget/amounts.tsx',
  'app/budget/rollover.tsx',
  'app/budget/alerts.tsx',
  'app/budget/summary.tsx',
  'app/budget/templates.tsx',
  'app/budget/history.tsx',
  'app/budget/edit.tsx',
  'app/budget/category-detail.tsx',

  // Transaction screens
  'app/transaction/add.tsx',
  'app/transaction/detail.tsx',
  'app/transaction/edit-category.tsx',
  'app/transaction/split.tsx',
  'app/transaction/recurring.tsx',
  'app/transaction/search-results.tsx',
  'app/transaction/bulk-actions.tsx',
  'app/transaction/subscription-audit.tsx',

  // Settings screens
  'app/settings/profile.tsx',
  'app/settings/security.tsx',
  'app/settings/notifications.tsx',
  'app/settings/appearance.tsx',
  'app/settings/subscription.tsx',
  'app/settings/help.tsx',
  'app/settings/about.tsx',
  'app/settings/contact.tsx',
  'app/settings/export.tsx',
  'app/settings/upgrade.tsx',
];

function updateFile(filePath) {
  const fullPath = path.join(process.cwd(), filePath);

  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return false;
  }

  let content = fs.readFileSync(fullPath, 'utf8');
  let modified = false;
  const originalContent = content;

  // 1. Add responsive import if not present
  const hasResponsiveImport = content.includes("from '@/constants/responsive'");
  if (!hasResponsiveImport) {
    const themeImportMatch = content.match(/import\s+{[^}]*}\s+from\s+'@\/constants\/theme';/);
    if (themeImportMatch) {
      content = content.replace(
        themeImportMatch[0],
        themeImportMatch[0] + "\nimport { responsive, ms } from '@/constants/responsive';"
      );
      modified = true;
    }
  }

  // 2. Replace hardcoded font sizes
  const fontSizeReplacements = [
    [/fontSize:\s*10,/g, 'fontSize: responsive.fontSize.xs,'],
    [/fontSize:\s*12,/g, 'fontSize: responsive.fontSize.xs,'],
    [/fontSize:\s*14,/g, 'fontSize: responsive.fontSize.sm,'],
    [/fontSize:\s*16,/g, 'fontSize: responsive.fontSize.md,'],
    [/fontSize:\s*18,/g, 'fontSize: responsive.fontSize.lg,'],
    [/fontSize:\s*20,/g, 'fontSize: responsive.fontSize.xl,'],
    [/fontSize:\s*24,/g, 'fontSize: responsive.fontSize.h4,'],
    [/fontSize:\s*28,/g, 'fontSize: responsive.fontSize.h3,'],
    [/fontSize:\s*32,/g, 'fontSize: responsive.fontSize.h2,'],
    [/fontSize:\s*36,/g, 'fontSize: responsive.fontSize.h1,'],
    [/fontSize:\s*40,/g, 'fontSize: responsive.fontSize.display,'],
  ];

  fontSizeReplacements.forEach(([pattern, replacement]) => {
    if (pattern.test(content)) {
      content = content.replace(pattern, replacement);
      modified = true;
    }
  });

  // 3. Replace theme.typography.fontSize references
  const typographyReplacements = [
    [/theme\.typography\.fontSize\.xs/g, 'responsive.fontSize.xs'],
    [/theme\.typography\.fontSize\.sm/g, 'responsive.fontSize.sm'],
    [/theme\.typography\.fontSize\.base/g, 'responsive.fontSize.md'],
    [/theme\.typography\.fontSize\.lg/g, 'responsive.fontSize.lg'],
    [/theme\.typography\.fontSize\.xl/g, 'responsive.fontSize.xl'],
    [/theme\.typography\.fontSize\['2xl'\]/g, 'responsive.fontSize.h4'],
    [/theme\.typography\.fontSize\['3xl'\]/g, 'responsive.fontSize.h3'],
    [/theme\.typography\.fontSize\['4xl'\]/g, 'responsive.fontSize.h2'],
    [/theme\.typography\.fontSize\['5xl'\]/g, 'responsive.fontSize.h1'],
  ];

  typographyReplacements.forEach(([pattern, replacement]) => {
    if (pattern.test(content)) {
      content = content.replace(pattern, replacement);
      modified = true;
    }
  });

  // 4. Replace theme.spacing with responsive.spacing
  const spacingReplacements = [
    [/theme\.spacing\[(\d+)\]/g, 'responsive.spacing[$1]'],
    [/marginBottom:\s*theme\.spacing\[/g, 'marginBottom: responsive.spacing['],
    [/marginTop:\s*theme\.spacing\[/g, 'marginTop: responsive.spacing['],
    [/padding:\s*theme\.spacing\[/g, 'padding: responsive.spacing['],
    [/paddingHorizontal:\s*theme\.spacing\[/g, 'paddingHorizontal: responsive.spacing['],
    [/paddingVertical:\s*theme\.spacing\[/g, 'paddingVertical: responsive.spacing['],
    [/gap:\s*theme\.spacing\[/g, 'gap: responsive.spacing['],
  ];

  spacingReplacements.forEach(([pattern, replacement]) => {
    if (pattern.test(content)) {
      content = content.replace(pattern, replacement);
      modified = true;
    }
  });

  // 5. Add lineHeight for responsive font sizes
  // Match fontSize: responsive.fontSize.X without a lineHeight on the next line
  const addLineHeight = /fontSize:\s*(responsive\.fontSize\.\w+),(?!\s*lineHeight:)/g;
  content = content.replace(addLineHeight, (match, fontSize) => {
    return `fontSize: ${fontSize},\n    lineHeight: ${fontSize} * 1.5,`;
  });

  // Write back if modified
  if (content !== originalContent) {
    fs.writeFileSync(fullPath, content, 'utf8');
    return true;
  }

  return false;
}

console.log('🚀 Starting responsive font size migration...\n');

let updatedCount = 0;
const updatedFiles = [];
const skippedFiles = [];

files.forEach(file => {
  try {
    if (updateFile(file)) {
      updatedCount++;
      updatedFiles.push(file);
      console.log(`✅ ${file}`);
    } else {
      skippedFiles.push(file);
      console.log(`⏭️  ${file} (no changes needed)`);
    }
  } catch (error) {
    console.log(`❌ ${file} - Error: ${error.message}`);
  }
});

console.log('\n' + '='.repeat(60));
console.log(`\n🎉 Migration complete!`);
console.log(`   Updated: ${updatedCount} files`);
console.log(`   Skipped: ${skippedFiles.length} files`);
console.log(`   Total: ${files.length} files\n`);

if (updatedCount > 0) {
  console.log('📝 Updated files:');
  updatedFiles.forEach(file => console.log(`   - ${file}`));
}
