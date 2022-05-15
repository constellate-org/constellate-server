import { FunctionComponent } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { EuiErrorBoundary } from '@elastic/eui';
import { Global } from '@emotion/react';
import { Theme } from '../components/theme';
import Rho from '../components/rho';
import ThemedOverrides from '../styles/themed_overrides';
import 'katex/dist/katex.min.css';
import globalStyles from '../styles/global.styles';
import footnotesStyles from '../styles/footnotes.styles';
import themes from '../../public/constellate_themes/themes';

const theme = themes[process.env.CONSTELLATE_THEME];

/**
 * Next.js uses the App component to initialize pages. You can override it
 * and control the page initialization. Here use use it to render the
 * `Chrome` component on each page, and apply an error boundary.
 *
 * @see https://nextjs.org/docs/advanced-features/custom-app
 */
const EuiApp: FunctionComponent<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      {/* You can override this in other pages - see index.tsx for an example */}
      <title>{"Pollard's Rho"}</title>
    </Head>
    <Global styles={globalStyles} />
    <Global styles={footnotesStyles} />
    <Global styles={theme['GLOBAL']} />
    <Theme>
      <Rho>
        <ThemedOverrides />
        <EuiErrorBoundary>
          <Component {...pageProps} />
        </EuiErrorBoundary>
      </Rho>
    </Theme>
  </>
);

export default EuiApp;
