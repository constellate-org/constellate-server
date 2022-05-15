import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import { EuiAccordion, EuiToolTip } from '@elastic/eui';

/* import { icon as ad } from '@elastic/eui/es/components/icon/assets/arrow_down';
 * import { icon as au } from '@elastic/eui/es/components/icon/assets/arrow_up';
 * import { icon as ar } from '@elastic/eui/es/components/icon/assets/arrow_right';
 * import { appendIconComponentCache } from '@elastic/eui/es/components/icon/icon';
 *
 * appendIconComponentCache({
 *   arrowUp: au,
 *   arrowDown: ad,
 *   arrowright: ar,
 * }); */

function FootnotesCollapse(props) {
  const [isOpen, setIsOpen] = useState(props.isOpen);
  document
    .querySelectorAll('a.footnote-ref-processed')
    .forEach(function addLink(el) {
      (el as HTMLAnchorElement).onclick = function () {
        setIsOpen(true);
        setTimeout(
          () =>
            document
              .getElementById((el as HTMLAnchorElement).href.split('#')[1])
              .scrollIntoView(false),
          300
        );
      };
    });
  return (
    <EuiAccordion
      id="footnotes"
      buttonContent="Footnotes"
      forceState={isOpen ? 'open' : 'closed'}
      onToggle={() => setIsOpen(!isOpen)}>
      {props.inner}
    </EuiAccordion>
  );
}

export default function renderFootnoteBlock() {
  // augment footnote links with tooltips
  document
    .querySelectorAll('a.footnote-ref')
    .forEach(function repl(el: Element) {
      el.classList.toggle('footnote-ref');
      el.classList.toggle('footnote-ref-processed');
      const temp = document.createElement('span');
      temp.classList.toggle('fn-tooltip');
      const fnId = (el as HTMLLinkElement).href.split('#').reverse()[0];
      const fnElement = document.getElementById(fnId);
      const fnContent = fnElement != null ? fnElement.innerHTML : '';
      // footnotes are numbered by the order of definitions, which is incorrect: switch to order used by footnotes block
      const fnNum =
        fnElement != null
          ? Array.from(fnElement.parentElement.children).indexOf(fnElement) + 1
          : 0;
      const content = (
        <span className="fn-tooltip-content">
          <p dangerouslySetInnerHTML={{ __html: fnContent }} />
        </span>
      );

      el.innerHTML = `${fnNum}`;
      const elHtml = (
        <span dangerouslySetInnerHTML={{ __html: el.outerHTML }} />
      );
      console.log('Wrapping footnote reference...');
      ReactDOM.render(
        <EuiToolTip content={content}>{elHtml}</EuiToolTip>,
        temp
      );
      el.replaceWith(temp);
    });
  // render footnotes using collapse
  document
    .querySelectorAll('div.footnotes')
    .forEach(function repl(el: Element) {
      console.log('Wrapping footnotes...');
      const temp = document.createElement('div');
      el.classList.toggle('footnotes-processed');
      const content = (
        <span
          dangerouslySetInnerHTML={{
            __html:
              el.querySelector('ol') != null
                ? el.querySelector('ol').outerHTML
                : '',
          }}
        />
      );
      ReactDOM.render(<FootnotesCollapse inner={content} />, temp);
      el.replaceWith(temp);
    });
}
