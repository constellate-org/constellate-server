export type MarkdownMatplotlib = {
  kind: 'markdown_matplotlib';
  star_id: string;
  markdown: string;
  matplotlib: string;
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
  | MarkdownMatplotlib
  | MarkdownLatex
  | MarkdownPanel
  | PureMarkdown
  | MarkdownCode;

export type Constellation = {
  setup: Array<string>;
  stars: Array<Star>;
  breadcrumbs: Array<Array<number>>;
  title: string;
  star_titles: Array<string>;
};

export function hasImgPanel(star: Star) {
  return star.kind != 'pure_markdown';
}
