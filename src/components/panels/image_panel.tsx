import { EuiCodeBlock, EuiFlexGroup, EuiFlexItem, EuiImage, EuiTabbedContent, useEuiTheme } from '@elastic/eui';

export default function ImagePanel(props) {
    const { filename, code } = props;
    const { euiTheme, colorMode } = useEuiTheme();
    let imgSrc = filename.replace("{}", colorMode.toLowerCase());
    let tabs = [
        {
            id: 'img',
            name: 'Plot',
            content: (
                <EuiFlexGroup justifyContent="center" direction="column" className="eui-fullHeight">
                    <EuiFlexItem grow={false} className="eui-fullHeight">
                        <EuiImage alt="plot" src={imgSrc} size="100%" margin="m" id="mplImg" />
                    </EuiFlexItem>
                </EuiFlexGroup>
            )
        },
        {
            id: 'code',
            name: 'Code',
            className: 'eui-fullHeight',
            content: (
                <EuiCodeBlock language="python" lineNumbers overflowHeight="100%" fontSize="m" paddingSize="m"
                    isCopyable={true} isVirtualized className="codeBlockEmbed">
                    {code}
                </EuiCodeBlock>
            )
        }
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
