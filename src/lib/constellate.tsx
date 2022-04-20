export type MarkdownMatplotlib = {
  kind: 'markdown_matplotlib';
  star_id: String;
  markdown: String;
  matplotlib: String;
};

export type MarkdownLatex = {
  kind: 'markdown_latex';
  star_id: String;
  markdown: String;
  latex: String;
};

export type MarkdownPanel = {
  kind: 'markdown_panel';
  star_id: String;
  markdown: String;
  panel: String;
};

export type PureMarkdown = {
  kind: 'pure_markdown';
  star_id: String;
  markdown: String;
};

export type MarkdownCode = {
  kind: 'markdown_code';
  star_id: String;
  markdown: String;
  code: String;
  output: String | undefined;
};

export type Star =
  | MarkdownMatplotlib
  | MarkdownLatex
  | MarkdownPanel
  | PureMarkdown
  | MarkdownCode;

export type Constellation = {
  setup: Array<String>;
  stars: Array<Star>;
  breadcrumbs: Array<Array<number>>;
  title: String;
  star_titles: Array<String>;
};

export function hasImgPanel(star: Star) {
  return star.kind != 'pure_markdown';
}
