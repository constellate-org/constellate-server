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

const dark_css = `
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


   .genericPanel div.euiCodeBlock {
        background-color: ${transparentize(t.colors.emptyShade, 0.9)};
    }

    `;

  return <Global styles={styles} />;
}
