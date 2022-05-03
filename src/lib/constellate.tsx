export type MarkdownMatplotlib = {
  kind: 'markdown_matplotlib';
  star_id: string;
  markdown: string;
  matplotlib: string;
  light?: string;
  dark?: string;
};

export type MarkdownLatex = {
  kind: 'markdown_latex';
  star_id: string;
  markdown: string;
  latex: string;
};

export type MarkdownPanel = {
  kind: 'markdown_panel';
  star_id: string;
  markdown: string;
  panel: string;
};

export type MarkdownWidgets = {
  kind: 'markdown_widgets';
  star_id: string;
  markdown: string;
  widgets: string;
};

export type PureMarkdown = {
  kind: 'pure_markdown';
  star_id: string;
  markdown: string;
};

export type MarkdownCode = {
  kind: 'markdown_code';
  star_id: string;
  markdown: string;
  code: string;
  output: string | undefined;
};

export type Star =
  | PureMarkdown
  | MarkdownMatplotlib
  | MarkdownLatex
  | MarkdownPanel
  | MarkdownWidgets
  | MarkdownCode;

export type Constellation = {
  setup_mpl: Array<string>;
  setup_panel: Array<string>;
  stars: Array<Star>;
  breadcrumbs: Array<Array<number>>;
  title: string;
  star_titles: Array<string>;
};

export function hasImgPanel(star: Star) {
  return star.kind != 'pure_markdown';
}
