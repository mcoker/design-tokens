import React from 'react';
import { AutoLinkHeader, Example, Link as PatternflyThemeLink } from '@patternfly/documentation-framework/components';
import * as defaultTokens from '../../../../content/./token-layers-default.json';
import * as darkTokens from '../../../../content/./token-layers-dark.json';
import * as glassTokens from '../../../../content/./token-layers-glass.json';
import * as glassDarkTokens from '../../../../content/./token-layers-glass-dark.json';
import * as highcontrastTokens from '../../../../content/./token-layers-highcontrast.json';
import * as highcontrastDarkTokens from '../../../../content/./token-layers-highcontrast-dark.json';
import * as feltTokens from '../../../../content/./token-layers-felt.json';
import * as feltDarkTokens from '../../../../content/./token-layers-felt-dark.json';
import * as feltGlassTokens from '../../../../content/./token-layers-felt-glass.json';
import * as feltGlassDarkTokens from '../../../../content/./token-layers-felt-glass-dark.json';
import * as feltHighcontrastTokens from '../../../../content/./token-layers-felt-highcontrast.json';
import * as feltHighcontrastDarkTokens from '../../../../content/./token-layers-felt-highcontrast-dark.json';
import { TokensTable } from '../../../../content/./tokensTable.js';
const pageData = {
  "id": "All design tokens",
  "section": "foundations-and-styles",
  "subsection": "design-tokens",
  "deprecated": false,
  "template": false,
  "beta": false,
  "demo": false,
  "newImplementationLink": false,
  "source": "design-tokens",
  "tabName": null,
  "slug": "/foundations-and-styles/design-tokens/all-design-tokens/design-tokens",
  "sourceLink": "https://github.com/patternfly/patternfly-org/blob/main/packages/module/patternfly-docs/content/all-patternfly-tokens.md",
  "relPath": "packages/module/patternfly-docs/content/all-patternfly-tokens.md",
  "sortValue": 5
};
pageData.liveContext = {
  defaultTokens,
  darkTokens,
  glassTokens,
  glassDarkTokens,
  highcontrastTokens,
  highcontrastDarkTokens,
  feltTokens,
  feltDarkTokens,
  feltGlassTokens,
  feltGlassDarkTokens,
  feltHighcontrastTokens,
  feltHighcontrastDarkTokens,
  TokensTable
};
pageData.relativeImports = "import * as defaultTokens from 'content/./token-layers-default.json';,import * as darkTokens from 'content/./token-layers-dark.json';,import * as glassTokens from 'content/./token-layers-glass.json';,import * as glassDarkTokens from 'content/./token-layers-glass-dark.json';,import * as highcontrastTokens from 'content/./token-layers-highcontrast.json';,import * as highcontrastDarkTokens from 'content/./token-layers-highcontrast-dark.json';,import * as feltTokens from 'content/./token-layers-felt.json';,import * as feltDarkTokens from 'content/./token-layers-felt-dark.json';,import * as feltGlassTokens from 'content/./token-layers-felt-glass.json';,import * as feltGlassDarkTokens from 'content/./token-layers-felt-glass-dark.json';,import * as feltHighcontrastTokens from 'content/./token-layers-felt-highcontrast.json';,import * as feltHighcontrastDarkTokens from 'content/./token-layers-felt-highcontrast-dark.json';,import { TokensTable } from 'content/./tokensTable.js';"
pageData.examples = {
  
};

const Component = () => (
  <React.Fragment>
    <TokensTable tokenJson={{
    default: defaultTokens,
    dark: darkTokens,
    glass: glassTokens,
    'glass-dark': glassDarkTokens,
    highcontrast: highcontrastTokens,
    'highcontrast-dark': highcontrastDarkTokens,
    felt: feltTokens,
    'felt-dark': feltDarkTokens,
    'felt-glass': feltGlassTokens,
    'felt-glass-dark': feltGlassDarkTokens,
    'felt-highcontrast': feltHighcontrastTokens,
    'felt-highcontrast-dark': feltHighcontrastDarkTokens
  }}/>
  </React.Fragment>
);
Component.displayName = 'FoundationsAndStylesDesignTokensAllDesignTokensDesignTokensDocs';
Component.pageData = pageData;

export default Component;
