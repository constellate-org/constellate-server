// @ts-nocheck

import {
  EuiCodeBlock,
  EuiTabbedContent,
  useEuiFontSize,
  useEuiTheme,
} from '@elastic/eui';
import dynamic from 'next/dynamic';
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });
import plotlyPanelStyles from './plotly_panel.styles';
import { merge } from 'lodash';
import Script from 'next/script';

export default function PlotlyPanel(props) {
  const { fig, code } = props;
  const { data, layout } = fig;

  const styles = plotlyPanelStyles(useEuiTheme(), useEuiFontSize('m', 'px'));

  // remove plotly logo
  const config = { displaylogo: false };

  const tabs = [
    {
      id: 'img',
      name: 'Plot',
      content: (
        <>
          {
            // @ts-ignore
            <Plot
              data={data}
              layout={merge(layout, styles.plotlyLayout)}
              config={config}
            />
          }
        </>
      ),
    },
    {
      id: 'code',
      name: 'Code',
      className: 'eui-fullHeight',
      content: (
        <EuiCodeBlock
          language="python"
          lineNumbers
          overflowHeight="100%"
          fontSize="m"
          paddingSize="m"
          isCopyable={true}
          isVirtualized
          className="codeBlockEmbed">
          {code}
        </EuiCodeBlock>
      ),
    },
  ];

  return (
    //       <Script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-AMS-MML_SVG" />
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/katex@0.15.3/dist/katex.min.css"
        integrity="sha384-KiWOvVjnN8qwAZbuQyWDIbfCLFhLXNETzBQjA/92pIowpC0d2O3nppDGQVgwd2nB"
        crossOrigin="anonymous"
      />
      <Script
        defer
        src="https://cdn.jsdelivr.net/npm/katex@0.15.3/dist/katex.min.js"
        integrity="sha384-0fdwu/T/EQMsQlrHCCHoH10pkPLlKA1jL5dFyUOvB3lfeT2540/2g6YgSi2BL14p"
        crossOrigin="anonymous"></Script>
      <Script
        defer
        src="https://cdn.jsdelivr.net/npm/katex@0.15.3/dist/contrib/auto-render.min.js"
        integrity="sha384-+XBljXPPiv+OzfbB3cVmLHf4hdUFHlWNZN5spNQ7rmHTXpd7WvJum6fIACpNNfIR"
        crossOrigin="anonymous"
        onload="renderMathInElement(document.body);"></Script>
      <>
        <EuiTabbedContent
          tabs={tabs}
          initialSelectedTab={tabs[0]}
          className="eui-fullHeight"
          id="panelTabs"
          expand={true}
        />
      </>
    </>
  );
}
