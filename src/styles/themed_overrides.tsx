import React from 'react';
import {
  withEuiTheme,
  WithEuiThemeProps,
  EuiIcon,
  EuiText,
  useEuiTheme,
  transparentize,
  shade,
  tint,
} from '@elastic/eui';
import { css, Global } from '@emotion/react';

// Themes are Atom One
// https://github.com/PrismJS/prism-themes

const dark_css = `
/* Selection */
code[class*="language-"]::-moz-selection,
code[class*="language-"] *::-moz-selection,
pre[class*="language-"] *::-moz-selection {
  background: hsl(220, 13%, 28%);
  color: inherit;
  text-shadow: none;
}

code[class*="language-"]::selection,
code[class*="language-"] *::selection,
pre[class*="language-"] *::selection {
  background: hsl(220, 13%, 28%);
  color: inherit;
  text-shadow: none;
}

/* Code blocks */
pre[class*="language-"] {
  padding: 1em;
  margin: 0.5em 0;
  overflow: auto;
  border-radius: 0.3em;
}

/* Inline code */
:not(pre) > code[class*="language-"] {
  padding: 0.2em 0.3em;
  border-radius: 0.3em;
  white-space: normal;
}

/* Print */
@media print {
  code[class*="language-"],
  pre[class*="language-"] {
    text-shadow: none;
  }
}

code.euiCodeBlock__code .token.comment,
code.euiCodeBlock__code .token.prolog,
code.euiCodeBlock__code .token.cdata {
  color: hsl(220, 10%, 40%);
}

code.euiCodeBlock__code .token.doctype,
code.euiCodeBlock__code .token.punctuation,
code.euiCodeBlock__code .token.entity {
  color: hsl(220, 14%, 71%);
}

code.euiCodeBlock__code .token.attr-name,
code.euiCodeBlock__code .token.class-name,
code.euiCodeBlock__code .token.boolean,
code.euiCodeBlock__code .token.constant,
code.euiCodeBlock__code .token.number,
code.euiCodeBlock__code .token.atrule {
  color: hsl(29, 54%, 61%);
}

code.euiCodeBlock__code .token.keyword {
  color: hsl(286, 60%, 67%);
}

code.euiCodeBlock__code .token.property,
code.euiCodeBlock__code .token.tag,
code.euiCodeBlock__code .token.symbol,
code.euiCodeBlock__code .token.deleted,
code.euiCodeBlock__code .token.important {
  color: hsl(355, 65%, 65%);
}

code.euiCodeBlock__code .token.selector,
code.euiCodeBlock__code .token.string,
code.euiCodeBlock__code .token.char,
code.euiCodeBlock__code .token.builtin,
code.euiCodeBlock__code .token.inserted,
code.euiCodeBlock__code .token.regex,
code.euiCodeBlock__code .token.attr-value,
code.euiCodeBlock__code .token.attr-value > code.euiCodeBlock__code .token.punctuation {
  color: hsl(95, 38%, 62%);
}

code.euiCodeBlock__code .token.variable,
code.euiCodeBlock__code .token.operator,
code.euiCodeBlock__code .token.function {
  color: hsl(207, 82%, 66%);
}

code.euiCodeBlock__code .token.url {
  color: hsl(187, 47%, 55%);
}

/* HTML overrides */
code.euiCodeBlock__code .token.attr-value > code.euiCodeBlock__code .token.punctuation.attr-equals,
code.euiCodeBlock__code .token.special-attr > code.euiCodeBlock__code .token.attr-value > code.euiCodeBlock__code .token.value.css {
  color: hsl(220, 14%, 71%);
}

/* CSS overrides */
.language-css code.euiCodeBlock__code .token.selector {
  color: hsl(355, 65%, 65%);
}

.language-css code.euiCodeBlock__code .token.property {
  color: hsl(220, 14%, 71%);
}

.language-css code.euiCodeBlock__code .token.function,
.language-css code.euiCodeBlock__code .token.url > code.euiCodeBlock__code .token.function {
  color: hsl(187, 47%, 55%);
}

.language-css code.euiCodeBlock__code .token.url > code.euiCodeBlock__code .token.string.url {
  color: hsl(95, 38%, 62%);
}

.language-css code.euiCodeBlock__code .token.important,
.language-css code.euiCodeBlock__code .token.atrule code.euiCodeBlock__code .token.rule {
  color: hsl(286, 60%, 67%);
}

/* JS overrides */
.language-javascript code.euiCodeBlock__code .token.operator {
  color: hsl(286, 60%, 67%);
}

.language-javascript code.euiCodeBlock__code .token.template-string > code.euiCodeBlock__code .token.interpolation > code.euiCodeBlock__code .token.interpolation-punctuation.punctuation {
  color: hsl(5, 48%, 51%);
}

/* JSON overrides */
.language-json code.euiCodeBlock__code .token.operator {
  color: hsl(220, 14%, 71%);
}

.language-json code.euiCodeBlock__code .token.null.keyword {
  color: hsl(29, 54%, 61%);
}

/* MD overrides */
.language-markdown code.euiCodeBlock__code .token.url,
.language-markdown code.euiCodeBlock__code .token.url > code.euiCodeBlock__code .token.operator,
.language-markdown code.euiCodeBlock__code .token.url-reference.url > code.euiCodeBlock__code .token.string {
  color: hsl(220, 14%, 71%);
}

.language-markdown code.euiCodeBlock__code .token.url > code.euiCodeBlock__code .token.content {
  color: hsl(207, 82%, 66%);
}

.language-markdown code.euiCodeBlock__code .token.url > code.euiCodeBlock__code .token.url,
.language-markdown code.euiCodeBlock__code .token.url-reference.url {
  color: hsl(187, 47%, 55%);
}

.language-markdown code.euiCodeBlock__code .token.blockquote.punctuation,
.language-markdown code.euiCodeBlock__code .token.hr.punctuation {
  color: hsl(220, 10%, 40%);
  font-style: italic;
}

.language-markdown code.euiCodeBlock__code .token.code-snippet {
  color: hsl(95, 38%, 62%);
}

.language-markdown code.euiCodeBlock__code .token.bold code.euiCodeBlock__code .token.content {
  color: hsl(29, 54%, 61%);
}

.language-markdown code.euiCodeBlock__code .token.italic code.euiCodeBlock__code .token.content {
  color: hsl(286, 60%, 67%);
}

.language-markdown code.euiCodeBlock__code .token.strike code.euiCodeBlock__code .token.content,
.language-markdown code.euiCodeBlock__code .token.strike code.euiCodeBlock__code .token.punctuation,
.language-markdown code.euiCodeBlock__code .token.list.punctuation,
.language-markdown code.euiCodeBlock__code .token.title.important > code.euiCodeBlock__code .token.punctuation {
  color: hsl(355, 65%, 65%);
}

/* General */
code.euiCodeBlock__code .token.bold {
  font-weight: bold;
}

code.euiCodeBlock__code .token.comment,
code.euiCodeBlock__code .token.italic {
  font-style: italic;
}

code.euiCodeBlock__code .token.entity {
  cursor: help;
}

code.euiCodeBlock__code .token.namespace {
  opacity: 0.8;
}


.text-blue {
    color: #3FA6DA;
}

.text-green {
    color: #43BF4d;
}

.text-yellow {
    color: #f0b726;
}

.text-red {
    color: #eb6847;
}

.text-purple {
    color: #bd6bbd;
}

.text-teal {
    color: #13c9ba;
}

.text-pink {
    color: #f5498b;
}

.text-lime {
    color: #b6d94c;
}

.text-brown {
    color: #af855a;
}

.text-indigo {
    color: #9881f3;
}
`;

const light_css = `
/* Selection */
code[class*="language-"]::-moz-selection,
code[class*="language-"] *::-moz-selection,
pre[class*="language-"] *::-moz-selection {
  background: hsl(230, 1%, 90%);
  color: inherit;
}

code[class*="language-"]::selection,
code[class*="language-"] *::selection,
pre[class*="language-"] *::selection {
  background: hsl(230, 1%, 90%);
  color: inherit;
}

/* Code blocks */
pre[class*="language-"] {
  padding: 1em;
  margin: 0.5em 0;
  overflow: auto;
  border-radius: 0.3em;
}

/* Inline code */
:not(pre) > code[class*="language-"] {
  padding: 0.2em 0.3em;
  border-radius: 0.3em;
  white-space: normal;
}

code.euiCodeBlock__code .token.comment,
code.euiCodeBlock__code .token.prolog,
code.euiCodeBlock__code .token.cdata {
  color: hsl(230, 4%, 64%);
}

code.euiCodeBlock__code .token.doctype,
code.euiCodeBlock__code .token.punctuation,
code.euiCodeBlock__code .token.entity {
  color: hsl(230, 8%, 24%);
}

code.euiCodeBlock__code .token.attr-name,
code.euiCodeBlock__code .token.class-name,
code.euiCodeBlock__code .token.boolean,
code.euiCodeBlock__code .token.constant,
code.euiCodeBlock__code .token.number,
code.euiCodeBlock__code .token.atrule {
  color: hsl(35, 99%, 36%);
}

code.euiCodeBlock__code .token.keyword {
  color: hsl(301, 63%, 40%);
}

code.euiCodeBlock__code .token.property,
code.euiCodeBlock__code .token.tag,
code.euiCodeBlock__code .token.symbol,
code.euiCodeBlock__code .token.deleted,
code.euiCodeBlock__code .token.important {
  color: hsl(5, 74%, 59%);
}

code.euiCodeBlock__code .token.selector,
code.euiCodeBlock__code .token.string,
code.euiCodeBlock__code .token.char,
code.euiCodeBlock__code .token.builtin,
code.euiCodeBlock__code .token.inserted,
code.euiCodeBlock__code .token.regex,
code.euiCodeBlock__code .token.attr-value,
code.euiCodeBlock__code .token.attr-value > code.euiCodeBlock__code .token.punctuation {
  color: hsl(119, 34%, 47%);
}

code.euiCodeBlock__code .token.variable,
code.euiCodeBlock__code .token.operator,
code.euiCodeBlock__code .token.function {
  color: hsl(221, 87%, 60%);
}

code.euiCodeBlock__code .token.url {
  color: hsl(198, 99%, 37%);
}

/* HTML overrides */
code.euiCodeBlock__code .token.attr-value > code.euiCodeBlock__code .token.punctuation.attr-equals,
code.euiCodeBlock__code .token.special-attr > code.euiCodeBlock__code .token.attr-value > code.euiCodeBlock__code .token.value.css {
  color: hsl(230, 8%, 24%);
}

/* CSS overrides */
.language-css code.euiCodeBlock__code .token.selector {
  color: hsl(5, 74%, 59%);
}

.language-css code.euiCodeBlock__code .token.property {
  color: hsl(230, 8%, 24%);
}

.language-css code.euiCodeBlock__code .token.function,
.language-css code.euiCodeBlock__code .token.url > code.euiCodeBlock__code .token.function {
  color: hsl(198, 99%, 37%);
}

.language-css code.euiCodeBlock__code .token.url > code.euiCodeBlock__code .token.string.url {
  color: hsl(119, 34%, 47%);
}

.language-css code.euiCodeBlock__code .token.important,
.language-css code.euiCodeBlock__code .token.atrule code.euiCodeBlock__code .token.rule {
  color: hsl(301, 63%, 40%);
}

/* JS overrides */
.language-javascript code.euiCodeBlock__code .token.operator {
  color: hsl(301, 63%, 40%);
}

.language-javascript code.euiCodeBlock__code .token.template-string > code.euiCodeBlock__code .token.interpolation > code.euiCodeBlock__code .token.interpolation-punctuation.punctuation {
  color: hsl(344, 84%, 43%);
}

/* JSON overrides */
.language-json code.euiCodeBlock__code .token.operator {
  color: hsl(230, 8%, 24%);
}

.language-json code.euiCodeBlock__code .token.null.keyword {
  color: hsl(35, 99%, 36%);
}

/* MD overrides */
.language-markdown code.euiCodeBlock__code .token.url,
.language-markdown code.euiCodeBlock__code .token.url > code.euiCodeBlock__code .token.operator,
.language-markdown code.euiCodeBlock__code .token.url-reference.url > code.euiCodeBlock__code .token.string {
  color: hsl(230, 8%, 24%);
}

.language-markdown code.euiCodeBlock__code .token.url > code.euiCodeBlock__code .token.content {
  color: hsl(221, 87%, 60%);
}

.language-markdown code.euiCodeBlock__code .token.url > code.euiCodeBlock__code .token.url,
.language-markdown code.euiCodeBlock__code .token.url-reference.url {
  color: hsl(198, 99%, 37%);
}

.language-markdown code.euiCodeBlock__code .token.blockquote.punctuation,
.language-markdown code.euiCodeBlock__code .token.hr.punctuation {
  color: hsl(230, 4%, 64%);
  font-style: italic;
}

.language-markdown code.euiCodeBlock__code .token.code-snippet {
  color: hsl(119, 34%, 47%);
}

.language-markdown code.euiCodeBlock__code .token.bold code.euiCodeBlock__code .token.content {
  color: hsl(35, 99%, 36%);
}

.language-markdown code.euiCodeBlock__code .token.italic code.euiCodeBlock__code .token.content {
  color: hsl(301, 63%, 40%);
}

.language-markdown code.euiCodeBlock__code .token.strike code.euiCodeBlock__code .token.content,
.language-markdown code.euiCodeBlock__code .token.strike code.euiCodeBlock__code .token.punctuation,
.language-markdown code.euiCodeBlock__code .token.list.punctuation,
.language-markdown code.euiCodeBlock__code .token.title.important > code.euiCodeBlock__code .token.punctuation {
  color: hsl(5, 74%, 59%);
}

/* General */
code.euiCodeBlock__code .token.bold {
  font-weight: bold;
}

code.euiCodeBlock__code .token.comment,
code.euiCodeBlock__code .token.italic {
  font-style: italic;
}

code.euiCodeBlock__code .token.entity {
  cursor: help;
}

code.euiCodeBlock__code .token.namespace {
  opacity: 0.8;
}

.text-blue {
    color: #147eb3;
}

.text-green {
    color: #29a634;
}

.text-yellow {
    color: #d1980b;
}

.text-red {
    color: #d33d17;
}

.text-purple {
    color: #9d3f9d;
}

.text-teal {
    color: #00a396;
}

.text-pink {
    color: #db2c6f;
}
.text-lime {
    color: #8eb125;
}
.text-brown {
    color: #946638;
}
.text-indigo {
    color: #7961db;
}
`;

export default function CustomStyling() {
  const { euiTheme, colorMode } = useEuiTheme();
  let t = euiTheme;

  let primaryBg, accentBg, colors;
  if (colorMode == 'DARK') {
    primaryBg = transparentize(t.colors.primary, 0.6);
    accentBg = transparentize(t.colors.accent, 0.6);
    colors = dark_css;
  } else {
    primaryBg = transparentize(t.colors.primary, 0.6);
    accentBg = transparentize(t.colors.accent, 0.6);
    colors = light_css;
  }

  const styles = css`
        ${colors}

    kbd>kbd {
        border-radius: ${t.border.radius.small};
        padding: 0.2rem;
        background-color: ${t.colors.lightestShade};
        color: ${t.colors.fullShade}
    }

    .euiText code.euiCode {
        font-family: ${t.font.familyCode};
    }
        #textContent {
        border-color: ${t.colors.lightShade};
    }
        #nextBtn {
        background-color: ${t.colors.primary};
    }
        .no-invert-bg.euiControlBar {
        background-color: ${t.colors.body};
        box-shadow: none;
        color: ${t.colors.text};
    }

        .no-invert-bg.euiControlBar.euiControlBar__text {
        color: ${t.colors.subdued};
    }

        .no-invert-bg.euiControlBar.euiControlBar__breadcrumbs.euiBreadcrumb::after {
        background-color: ${t.colors.subdued};
    }

        .no-invert-bg.euiControlBar euiControlBar__breadcrumbs.euiBreadcrumb: not(.euiBreadcrumb--last).euiBreadcrumb__content,
        .no-invert-bg.euiControlBar.euiControlBar__breadcrumbs.euiBreadcrumb: not(.euiBreadcrumb--last).euiBreadcrumb__content {
        color: ${t.colors.subdued};
    }


        .sunmoon-grp label.euiButtonGroupButton-isSelected {
        color: ${t.colors.disabledText};
    }

        .euiSideNavItem.euiSideNavItem--trunk {
        color: ${euiTheme.colors.subdued};
    }

        .currItem.euiSideNavItem--emphasized {
        color: ${euiTheme.colors.primaryText};
    }

        .euiPageHeaderContent__top.euiFlexGroup--gutterLarge {
        background-color: ${primaryBg};
        color: ${euiTheme.colors.ghost};
        margin: 0px;
    }

        .euiPageHeaderContent__top.euiFlexGroup--gutterLarge h1 {
        color: inherit;
    }

        .euiPageHeaderContent__top.euiFlexGroup--gutterLarge.euiIcon {
        fill: ${euiTheme.colors.ghost};
    }

    #panelTabs div[role = "tabpanel"], .gradientBg {
        background: ${primaryBg};
        background: linear-gradient(90deg, ${primaryBg} 0%, ${accentBg} 100%);
    }

    #imgEmbedContent, #latexContent {
        background-color: ${euiTheme.colors.emptyShade};
    }


   .genericPanel divcode.euiCodeBlock__code {
        background-color: ${transparentize(t.colors.emptyShade, 0.9)};
    }

    `;

  return <Global styles={styles} />;
}
