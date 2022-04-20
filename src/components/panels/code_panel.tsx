import { EuiCodeBlock, EuiSplitPanel, EuiTitle, EuiPanel } from '@elastic/eui';

export default function CodePanel(props) {
  return (
    <EuiSplitPanel.Outer
      className="eui-fullHeight gradientBg"
      hasShadow
      direction="column"
      id="codePanel">
      <EuiSplitPanel.Inner grow>
        <EuiPanel color="plain" paddingSize="s">
          <EuiTitle size="xs">
            <span>Code</span>
          </EuiTitle>
        </EuiPanel>
        <EuiCodeBlock
          language="python"
          lineNumbers
          overflowHeight="calc(100% - 28px)"
          fontSize="m"
          paddingSize="m"
          isCopyable={true}
          isVirtualized
          className="codeBlockEmbed">
          {props.code}
        </EuiCodeBlock>
      </EuiSplitPanel.Inner>
      {props.output && (
        <EuiSplitPanel.Inner grow={false}>
          <EuiPanel color="plain" paddingSize="s">
            <EuiTitle size="xs">
              <span>Output</span>
            </EuiTitle>
          </EuiPanel>
          <EuiCodeBlock
            language="python"
            fontSize="l"
            paddingSize="m"
            isCopyable={true}
            className="codeBlockEmbed">
            {props.output}
          </EuiCodeBlock>
        </EuiSplitPanel.Inner>
      )}
    </EuiSplitPanel.Outer>
  );
}
