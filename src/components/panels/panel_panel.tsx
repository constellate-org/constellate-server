import React from 'react';
import {
  withEuiTheme,
  EuiCodeBlock,
  EuiTabbedContent,
  UseEuiTheme,
} from '@elastic/eui';
import { MarkdownPanel } from '../../lib/constellate';
import { panelPanelStyles } from './panel_panel.styles';

type PanelProps = {
  star: MarkdownPanel;
  uuid: string;
  url: string;
  theme: UseEuiTheme;
};

class PanelPanelInner extends React.Component<PanelProps> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.loadPlot();
  }

  loadPlot() {
    const { colorMode } = this.props.theme;
    const plot = document.getElementById(
      `imgEmbedContent${colorMode.toLocaleLowerCase()}`
    );
    if (!plot || plot.innerHTML === '') {
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'text';

      const url = this.props.url;
      const path = this.props.star.star_id;
      console.log(`${url}/${path}`);
      console.log('color mode', colorMode);
      xhr.open(
        'GET',
        `${url}/${path}/autoload.js?bokeh-autoload-element=imgEmbedContent${colorMode}&bokeh-app-path=/${path}&bokeh-absolute-url=${url}/${path}&colorMode=${colorMode.toLocaleLowerCase()}`,
        true
      );
      xhr.setRequestHeader('Cache-Control', 'no-cache, no-store, max-age=0');
      xhr.setRequestHeader('Bokeh-Session-Id', this.props.uuid + colorMode);
      xhr.setRequestHeader('ColorMode', colorMode);

      const script_id = this.props.uuid + colorMode;
      xhr.onload = function (event) {
        console.log('1');
        if (document.getElementById(script_id)) {
          document.getElementById(script_id).remove();
        }
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
    const styles = panelPanelStyles(this.props.theme);
    const { colorMode } = this.props.theme;
    const invColorMode = colorMode == 'DARK' ? 'LIGHT' : 'DARK';
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
            id="codeBlockEmbed">
            {this.props.star.panel}
          </EuiCodeBlock>
        ),
      },
    ];

    if (typeof document !== 'undefined') {
      const embed = document.getElementById(this.props.uuid + invColorMode);
      console.log('3');
      if (embed) {
        console.log('4');
        document.getElementById(this.props.uuid + invColorMode).remove();
        document.getElementById(`imgEmbedContent${invColorMode}`).innerHTML =
          '';
        this.loadPlot();
      }
    }

    return (
      <EuiTabbedContent
        tabs={tabs}
        initialSelectedTab={tabs[0]}
        className="eui-fullHeight"
        id="panelTabs"
        aria-label="Panel Tabs"
        expand={true}
        css={styles.tabPanel}
        onTabClick={tab => {
          if (tab.id == 'img') {
            this.loadPlot();
          } else {
            document.getElementById(`imgEmbedContent${colorMode}`).innerHTML =
              '';
            // document.getElementById(this.props.uuid + colorMode).remove();
          }
        }}
      />
    );
  }
}

export default withEuiTheme(PanelPanelInner);
