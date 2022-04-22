import { Star } from '../../lib/constellate';
import CodePanel from './code_panel';
import ImagePanel from './image_panel';
import LatexPanel from './latex_panel';
import PanelPanel from './panel_panel';

type PanelContentProps = {
  star: Star;
  panelUrl: string;
  isDark: boolean;
  uuid: string;
};

export default function PanelContent(props: PanelContentProps) {
  switch (props.star.kind) {
    case 'pure_markdown':
      return <></>;
    case 'markdown_panel':
      return (
        <PanelPanel star={props.star} url={props.panelUrl} uuid={props.uuid} />
      );
    case 'markdown_code': {
      return (
        <CodePanel
          code={props.star.code}
          output={props.star.output}></CodePanel>
      );
    }
    case 'markdown_latex':
      return <LatexPanel>{props.star.latex}</LatexPanel>;
    case 'markdown_matplotlib':
      return (
        <ImagePanel
          url={props.star[props.isDark ? 'dark' : 'light']}
          code={props.star.matplotlib}
        />
      );
  }
}
