import React from 'react';
import { EuiCodeBlock, EuiTabbedContent, useEuiTheme } from '@elastic/eui';
import { MarkdownPanel } from '../../lib/constellate';

type PanelProps = {
  star: MarkdownPanel;
  uuid: string;
  isDark: boolean;
  url: string;
};

export default class PanelPanel extends React.Component<PanelProps> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.loadPlot();
  }

  loadPlot() {
    const colorMode = this.props.isDark ? 'dark' : 'light';
    const plot = document.getElementById(`imgEmbedContent${colorMode}`);
    if (!plot || plot.innerHTML === '') {
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'text';

      const url = this.props.url;
      const path = this.props.star.star_id;
      console.log(`${url}/${path}`);
      xhr.open(
        'GET',
        `${url}/${path}/autoload.js?bokeh-autoload-element=imgEmbedContent${colorMode}&bokeh-app-path=/${path}&bokeh-absolute-url=${url}/${path}&colorMode=${colorMode}`,
        true
      );
      xhr.setRequestHeader('Cache-Control', 'no-cache, no-store, max-age=0');
      xhr.setRequestHeader('Bokeh-Session-Id', this.props.uuid + colorMode);
      xhr.setRequestHeader('ColorMode', colorMode);

      const script_id = this.props.uuid + colorMode;

      xhr.onload = function (event) {
        console.log('1');
        if (!document.getElementById(script_id)) {
          console.log('2');
          const script = document.createElement('script');
          script.id = script_id;
          const src = (event.target as XMLHttpRequest).response;
          script.innerHTML = src.replaceAll(
            `"static/extensions/panel`,
            `"${url}/static/extensions/panel`
          );
          document.body.appendChild(script);
        }
      };
      xhr.send();
    }
  }

  render() {
    const colorMode = this.props.isDark ? 'dark' : 'light';
    const invColorMode = !this.props.isDark ? 'dark' : 'light';
    const tabs = [
      {
        id: 'img',
        name: 'Plot',
        content: (
          <div id="imgEmbedContainer">
            <div id={`imgEmbedContent${colorMode}`}></div>
          </div>
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
            id="codeBlockEmbed">
            {this.props.star.panel}
          </EuiCodeBlock>
        ),
      },
    ];

    const embed = document.getElementById(this.props.uuid + invColorMode);
    console.log('3');
    if (embed) {
      console.log('4');
      document.getElementById(this.props.uuid + invColorMode).remove();
      document.getElementById(`imgEmbedContent${invColorMode}`).innerHTML = '';
    }
    this.loadPlot();

    return (
      <EuiTabbedContent
        tabs={tabs}
        initialSelectedTab={tabs[0]}
        className="eui-fullHeight"
        id="panelTabs"
        expand={true}
        onTabClick={tab => {
          if (tab.id == 'img') {
            this.loadPlot();
          } else {
            document.getElementById(`imgEmbedContent${colorMode}`).innerHTML =
              '';
            document.getElementById(this.props.uuid + colorMode).remove();
          }
        }}
      />
    );
  }
}
