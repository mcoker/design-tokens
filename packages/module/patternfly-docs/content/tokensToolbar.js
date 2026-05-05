import React from 'react';
import {
  Button,
  Divider,
  MenuToggle,
  SearchInput,
  Select,
  SelectGroup,
  SelectList,
  SelectOption,
  Toolbar,
  ToolbarItem,
  ToolbarContent,
  Tooltip,
  capitalize
} from '@patternfly/react-core';
import FilterIcon from '@patternfly/react-icons/dist/esm/icons/filter-icon';

/**
 * Theme configuration constants
 * Structure: [theme family, light/dark mode, contrast variant]
 */
const THEME_LABEL_PARTS = {
  default: ['Default theme', 'Light', 'Default contrast'],
  dark: ['Default theme', 'Dark', 'Default contrast'],
  glass: ['Default theme', 'Light', 'Glass'],
  'glass-dark': ['Default theme', 'Dark', 'Glass'],
  highcontrast: ['Default theme', 'Light', 'High contrast'],
  'highcontrast-dark': ['Default theme', 'Dark', 'High contrast'],
  redhat: ['Unified theme', 'Light', 'Default contrast'],
  'redhat-dark': ['Unified theme', 'Dark', 'Default contrast'],
  'redhat-glass': ['Unified theme', 'Light', 'Glass'],
  'redhat-glass-dark': ['Unified theme', 'Dark', 'Glass'],
  'redhat-highcontrast': ['Unified theme', 'Light', 'High contrast'],
  'redhat-highcontrast-dark': ['Unified theme', 'Dark', 'High contrast']
};

/** Full segment → acronym mapping */
const THEME_SEGMENT_ABBREV = {
  'Default theme': 'DT',
  'Unified theme': 'UT',
  Light: 'Lt',
  Dark: 'Dk',
  'Default contrast': 'DC',
  'High contrast': 'HC',
  Glass: 'Gl'
};

// Pre-compute static values to avoid recalculating on every render
const THEME_LABEL_ROWS = Object.values(THEME_LABEL_PARTS);
const THEME_LABEL_COL_WIDTHS = (() => {
  const rows = THEME_LABEL_ROWS;
  return [
    Math.max(...rows.map((r) => r[0].length)),
    Math.max(...rows.map((r) => r[1].length)),
    Math.max(...rows.map((r) => r[2].length))
  ];
})();

const toAbbrevParts = (fullParts) => fullParts.map((p) => THEME_SEGMENT_ABBREV[p] || p);

const THEME_ACRONYM_PARTS = Object.fromEntries(
  Object.entries(THEME_LABEL_PARTS).map(([key, parts]) => [key, toAbbrevParts(parts)])
);

const THEME_ACRONYM_ROWS = Object.values(THEME_ACRONYM_PARTS);
const THEME_ACRONYM_COL_WIDTHS = (() => {
  const rows = THEME_ACRONYM_ROWS;
  return [
    Math.max(...rows.map((r) => r[0].length)),
    Math.max(...rows.map((r) => r[1].length)),
    Math.max(...rows.map((r) => r[2].length))
  ];
})();

const padThemeCol = (s, w) => s.padEnd(w, ' ');

const formatAlignedThemeParts = (parts) => {
  const [w0, w1, w2] = THEME_LABEL_COL_WIDTHS;
  return `${padThemeCol(parts[0], w0)} | ${padThemeCol(parts[1], w1)} | ${padThemeCol(parts[2], w2)}`;
};

export const getThemeDisplayName = (themeName) => {
  if (themeName === 'all') {
    return 'All themes';
  }
  const parts = THEME_LABEL_PARTS[themeName];
  if (parts) {
    return formatAlignedThemeParts(parts);
  }
  return themeName.split('-').map((part) => capitalize(part)).join(' ');
};

export const ThemeLabelAbbrevContext = React.createContext(false);

/**
 * Abbreviated theme row with single tooltip showing full theme name.
 * Improves accessibility by avoiding multiple tab stops.
 */
const ThemeAbbrevSegments = ({ themeName }) => {
  const abbrParts = THEME_ACRONYM_PARTS[themeName];
  const fullParts = THEME_LABEL_PARTS[themeName];
  const [w0, w1, w2] = THEME_ACRONYM_COL_WIDTHS;
  const paddedCols = [
    padThemeCol(abbrParts[0], w0),
    padThemeCol(abbrParts[1], w1),
    padThemeCol(abbrParts[2], w2)
  ];

  const fullLabel = formatAlignedThemeParts(fullParts);
  const abbreviatedText = `${paddedCols[0]} | ${paddedCols[1]} | ${paddedCols[2]}`;

  return (
    <Tooltip content={fullLabel} position="top">
      <Button variant="plain" className="ws-theme-display-label ws-theme-abbr-trigger" tabIndex={-1}>
        {abbreviatedText}
      </Button>
    </Tooltip>
  );
};

/** Renders theme text; known themes use monospace + padded spaces so `|` columns line up */
export const ThemeDisplayLabel = ({ themeName, fullLabel = false }) => {
  const contextAbbrev = React.useContext(ThemeLabelAbbrevContext);
  const abbreviated = fullLabel ? false : contextAbbrev;
  const parts = THEME_LABEL_PARTS[themeName];

  if (themeName === 'all') {
    return <span>All themes</span>;
  }
  if (parts) {
    if (abbreviated) {
      return <ThemeAbbrevSegments themeName={themeName} />;
    }
    return <span className="ws-theme-display-label">{formatAlignedThemeParts(parts)}</span>;
  }
  return <span>{themeName.split('-').map((p) => capitalize(p)).join(' ')}</span>;
};


// Category configuration constants
const TOKEN_CATEGORY_GROUP_PRIMARY = new Set(['chart', 'semantic']);
// Only palette tokens are truly theme-invariant (base tokens CAN vary, e.g., high contrast)
const THEME_INVARIANT_CATEGORIES = new Set(['palette']);

const TokensToolbarSelect = ({ selectedCategory, setSelectedCategory, categories }) => {
  const [isSelectOpen, setIsSelectOpen] = React.useState(false);
  const handleSelect = (_e, category) => {
    if (!(selectedCategory === category)) {
      setSelectedCategory(category);
    }
    setIsSelectOpen(!isSelectOpen);
  };

  const primaryCategories = categories.filter((c) => TOKEN_CATEGORY_GROUP_PRIMARY.has(c));
  const secondaryCategories = categories.filter((c) => !TOKEN_CATEGORY_GROUP_PRIMARY.has(c));
  const showGroupDivider = primaryCategories.length > 0 && secondaryCategories.length > 0;

  const SelectToggle = (toggleRef) => (
    <MenuToggle
      icon={<FilterIcon />}
      ref={toggleRef}
      onClick={() => setIsSelectOpen(!isSelectOpen)}
      isExpanded={isSelectOpen}
    >
      {capitalize(selectedCategory)} tokens
    </MenuToggle>
  );

  const renderCategoryOptions = (list) =>
    list.map((category, idx) => (
      <SelectOption key={category} value={category} isSelected={selectedCategory === category}>
        {capitalize(category)} tokens
      </SelectOption>
    ));

  return (
    <Select
      aria-label="Select Input"
      role="menu"
      toggle={SelectToggle}
      isOpen={isSelectOpen}
      onOpenChange={(isOpen) => setIsSelectOpen(isOpen)}
      onSelect={handleSelect}
    >
      {primaryCategories.length > 0 && (
        <SelectGroup>
          <SelectList>{renderCategoryOptions(primaryCategories)}</SelectList>
        </SelectGroup>
      )}
      {showGroupDivider && <Divider />}
      {secondaryCategories.length > 0 && (
        <SelectGroup>
          <SelectList>{renderCategoryOptions(secondaryCategories)}</SelectList>
        </SelectGroup>
      )}
    </Select>
  );
};

const TokensThemeSelect = ({ selectedTheme, setSelectedTheme, themeOptions, selectedCategory }) => {
  const [isSelectOpen, setIsSelectOpen] = React.useState(false);
  const handleSelect = (_e, themeName) => {
    if (!(selectedTheme === themeName)) {
      setSelectedTheme(themeName);
    }
    setIsSelectOpen(!isSelectOpen);
  };

  // Theme selector is disabled for categories that don't have theme variants
  const isDisabled = THEME_INVARIANT_CATEGORIES.has(selectedCategory);

  const ariaSelectedTheme = getThemeDisplayName(selectedTheme)
    .replace(/\|/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const SelectToggle = (toggleRef) => (
    <MenuToggle
      aria-label={`${ariaSelectedTheme}, Filter by theme`}
      ref={toggleRef}
      onClick={() => !isDisabled && setIsSelectOpen(!isSelectOpen)}
      isExpanded={isSelectOpen}
      isDisabled={isDisabled}
    >
      <ThemeDisplayLabel themeName={selectedTheme} fullLabel />
    </MenuToggle>
  );

  const themesAfterAll = themeOptions.slice(1);
  const defaultThemeOptions = themesAfterAll.filter((name) => !name.startsWith('redhat'));
  const unifiedThemeOptions = themesAfterAll.filter((name) => name.startsWith('redhat'));
  const showUnifiedDivider = defaultThemeOptions.length > 0 && unifiedThemeOptions.length > 0;

  const renderThemeOption = (themeName) => (
    <SelectOption key={themeName} value={themeName} isSelected={selectedTheme === themeName}>
      <ThemeDisplayLabel themeName={themeName} fullLabel />
    </SelectOption>
  );

  return (
    <Select
      aria-label="Select theme"
      toggle={SelectToggle}
      isOpen={isSelectOpen}
      onOpenChange={(isOpen) => setIsSelectOpen(isOpen)}
      onSelect={handleSelect}
      isDisabled={isDisabled}
    >
      <SelectGroup label={null}>
        <SelectList>{renderThemeOption('all')}</SelectList>
      </SelectGroup>
      <Divider />
      {defaultThemeOptions.length > 0 && (
        <SelectGroup label={null}>
          <SelectList>{defaultThemeOptions.map(renderThemeOption)}</SelectList>
        </SelectGroup>
      )}
      {showUnifiedDivider && <Divider />}
      {unifiedThemeOptions.length > 0 && (
        <SelectGroup label={null}>
          <SelectList>{unifiedThemeOptions.map(renderThemeOption)}</SelectList>
        </SelectGroup>
      )}
    </Select>
  );
};

const TokensToolbarComponent = ({
  selectedCategory,
  setSelectedCategory,
  selectedTheme,
  setSelectedTheme,
  searchValue,
  setSearchValue,
  resultsCount,
  categories,
  themeOptions
}) => {
  return (
    <Toolbar>
      <ToolbarContent>
        <ToolbarItem variant="search-filter">
          <SearchInput
            aria-label="Search for a token"
            placeholder="Search for a token"
            value={searchValue}
            onChange={(_event, value) => setSearchValue(value)}
            onClear={() => setSearchValue('')}
            resultsCount={resultsCount}
          />
        </ToolbarItem>

        <ToolbarItem>
          <TokensThemeSelect
            selectedTheme={selectedTheme}
            setSelectedTheme={setSelectedTheme}
            themeOptions={themeOptions}
            selectedCategory={selectedCategory}
          />
        </ToolbarItem>

        <ToolbarItem>
          <TokensToolbarSelect
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
          />
        </ToolbarItem>
      </ToolbarContent>
    </Toolbar>
  );
};

// Memoize the toolbar to prevent unnecessary re-renders that cause SearchInput to lose focus
export const TokensToolbar = React.memo(TokensToolbarComponent);
