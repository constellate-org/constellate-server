/** Renderer for LaTeX panels. */

import {
  EuiMarkdownFormat,
  getDefaultEuiMarkdownParsingPlugins,
  getDefaultEuiMarkdownProcessingPlugins,
  EuiPanel,
  EuiFlexGroup,
  EuiFlexItem,
} from '@elastic/eui';
import { KatexRenderer, MathMarkdownParser } from '../markdown/math';

const parsingList = getDefaultEuiMarkdownParsingPlugins();
parsingList.push([MathMarkdownParser, { singleDollar: true }]);

const processingList = getDefaultEuiMarkdownProcessingPlugins();
processingList[1][1].components.mathPlugin = KatexRenderer;

export default function LatexPanel({ children }) {
  return (
    <EuiFlexGroup
      direction="column"
      justifyContent="center"
      className="eui-fullHeight gradientBg">
      <EuiFlexItem grow={false}>
        <EuiPanel grow={false} className="margin2">
          <EuiMarkdownFormat
            parsingPluginList={parsingList}
            processingPluginList={processingList as any}
            id="latexContent"
            grow={true}>
            {children}
          </EuiMarkdownFormat>
        </EuiPanel>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
}
