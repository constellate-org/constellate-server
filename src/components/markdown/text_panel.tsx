/* import { appendIconComponentCache } from '@elastic/eui/es/components/icon/icon';
 *
 * import { icon as cv } from '@elastic/eui/es/components/icon/assets/controls_vertical';
 * import { icon as cc } from '@elastic/eui/es/components/icon/assets/copy_clipboard';
 * import { icon as eyec } from '@elastic/eui/es/components/icon/assets/eye_closed';
 * import { icon as eyeo } from '@elastic/eui/es/components/icon/assets/eye';
 * import { icon as bold } from '@elastic/eui/es/components/icon/assets/editor_bold';
 * import { icon as ital } from '@elastic/eui/es/components/icon/assets/editor_italic';
 * import { icon as under } from '@elastic/eui/es/components/icon/assets/editor_underline';
 * import { icon as ul } from '@elastic/eui/es/components/icon/assets/editor_unordered_list';
 * import { icon as ol } from '@elastic/eui/es/components/icon/assets/editor_ordered_list';
 * import { icon as quote } from '@elastic/eui/es/components/icon/assets/quote';
 * import { icon as cb } from '@elastic/eui/es/components/icon/assets/editor_code_block';
 * import { icon as link } from '@elastic/eui/es/components/icon/assets/editor_link';
 * import { icon as comment } from '@elastic/eui/es/components/icon/assets/editor_comment';
 * import { icon as cross } from '@elastic/eui/es/components/icon/assets/crossInACircleFilled'; */

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import {
  EuiMarkdownFormat,
  EuiPanel,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiFormRow,
  EuiSelect,
  EuiRange,
  EuiColorPicker,
  useColorPickerState,
  EuiButton,
  EuiPopover,
  getDefaultEuiMarkdownParsingPlugins,
  getDefaultEuiMarkdownProcessingPlugins,
  getDefaultEuiMarkdownUiPlugins,
  EuiCodeBlock,
  EuiMarkdownEditor,
  EuiTabbedContent,
  EuiTab,
  EuiTabs,
} from '@elastic/eui';
import remarkFootnotes from 'remark-footnotes';
// import remarkGfm from 'remark-gfm';
import remarkSmartypants from 'remark-smartypants';
import remarkNumberedFootnoteLabels from 'remark-numbered-footnote-labels';

import { KatexRenderer, MathMarkdownParser } from './math';

// One or more icons are passed in as an object of iconKey (string): IconComponent
/* appendIconComponentCache({
 *   crossInACircleFilled: cross,
 *   controlsVertical: cv,
 *   copyClipboard: cc,
 *   eye: eyeo,
 *   eyeClosed: eyec,
 *   editorBold: bold,
 *   editorItalic: ital,
 *   editorUnderline: under,
 *   editorUnorderedList: ul,
 *   editorOrderedList: ol,
 *   quote: quote,
 *   editorCodeBlock: cb,
 *   editorLink: link,
 *   editorComment: comment,
 * }); */

const parsingList = getDefaultEuiMarkdownParsingPlugins();
parsingList.push([MathMarkdownParser, { singleDollar: true }]);

const processingList = getDefaultEuiMarkdownProcessingPlugins();
processingList[1][1].components.mathPlugin = KatexRenderer;
// @ts-ignore
processingList.splice(0, 0, [remarkSmartypants, {}]);
// processingList.splice(0, 0, [remarkGfm, {}]);
// @ts-ignore
processingList.splice(0, 0, [remarkFootnotes, {}]);
// @ts-ignore
processingList.splice(0, 0, [remarkNumberedFootnoteLabels, {}]);

export default function TextPanel(props) {
  return (
    <EuiPanel
      hasShadow={false}
      hasBorder={false}
      className="eui-fullHeight"
      grow={true}
      paddingSize="m">
      <EuiFlexGroup
        direction="column"
        justifyContent="center"
        className="eui-fullHeight eui-yScroll">
        <EuiFlexItem
          grow
          className="eui-fullHeight"
          style={{ padding: '1rem' }}>
          <div className="eui-yScroll">
            <EuiMarkdownFormat
              parsingPluginList={parsingList}
              /*
                                                                                    // @ts-ignore */
              processingPluginList={processingList}
              id="textContent"
              grow>
              {props.content}
            </EuiMarkdownFormat>
          </div>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiPanel>
  );
}
