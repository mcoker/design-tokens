---
section: foundations-and-styles
subsection: design-tokens
id: All design tokens
sortValue: 5
---

import * as defaultTokens from './token-layers-default.json';
import * as darkTokens from './token-layers-dark.json';
import * as glassTokens from './token-layers-glass.json';
import * as glassDarkTokens from './token-layers-glass-dark.json';
import * as highcontrastTokens from './token-layers-highcontrast.json';
import * as highcontrastDarkTokens from './token-layers-highcontrast-dark.json';
import * as feltTokens from './token-layers-felt.json';
import * as feltDarkTokens from './token-layers-felt-dark.json';
import * as feltGlassTokens from './token-layers-felt-glass.json';
import * as feltGlassDarkTokens from './token-layers-felt-glass-dark.json';
import * as feltHighcontrastTokens from './token-layers-felt-highcontrast.json';
import * as feltHighcontrastDarkTokens from './token-layers-felt-highcontrast-dark.json';
import { TokensTable } from './tokensTable.js';

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
}} />
