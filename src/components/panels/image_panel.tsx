import {
  EuiCodeBlock,
  EuiFlexGroup,
  EuiFlexItem,
  EuiImage,
  EuiTabbedContent,
  useEuiTheme,
} from '@elastic/eui';

import Image from 'next/image';

export default function ImagePanel(props) {
  const { url, code } = props;
  const { euiTheme, colorMode } = useEuiTheme();
  const tabs = [
    {
      id: 'img',
      name: 'Plot',
      content: (
        <EuiFlexGroup
          justifyContent="center"
          direction="column"
          className="eui-fullHeight">
          <EuiFlexItem grow={false} className="eui-fullHeight">
            <div style={{ width: 800, height: 800 }}>
              <Image src={url} layout="responsive" width="800" height="800" />
            </div>
          </EuiFlexItem>
        </EuiFlexGroup>
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
    <EuiTabbedContent
      tabs={tabs}
      initialSelectedTab={tabs[0]}
      className="eui-fullHeight"
      id="panelTabs"
      expand={true}
    />
  );
}
