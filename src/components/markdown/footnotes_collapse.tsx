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
  document.querySelectorAll('a.footnote-ref').forEach(function addLink(el) {
    (el as HTMLAnchorElement).onclick = function () {
      setIsOpen(true);
      setTimeout(
        () =>
          document
            .getElementById((el as HTMLAnchorElement).href.split('#')[1])
            .scrollIntoView(),
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
  document
    .querySelectorAll('a.footnote-ref')
    .forEach(function repl(el: Element) {
      const elHtml = (
        <span dangerouslySetInnerHTML={{ __html: el.outerHTML }} />
      );
      console.log('Wrapping footnote reference...');
      const temp = document.createElement('span');
      temp.classList.toggle('fn-tooltip');
      const fnContent = document.getElementById(
        (el as HTMLLinkElement).href.split('#').reverse()[0]
      ).innerHTML;
      const content = (
        <span className="fn-tooltip-content">
          <p dangerouslySetInnerHTML={{ __html: fnContent }} />
        </span>
      );
      ReactDOM.render(
        <EuiToolTip content={content}>{elHtml}</EuiToolTip>,
        temp
      );
      el.replaceWith(temp);
    });
  document
    .querySelectorAll('div.footnotes')
    .forEach(function repl(el: Element) {
      console.log('Wrapping footnotes...');
      const temp = document.createElement('div');
      temp.classList.toggle('footnotes');
      const content = (
        <span
          dangerouslySetInnerHTML={{ __html: el.querySelector('ol').outerHTML }}
        />
      );
      ReactDOM.render(<FootnotesCollapse inner={content} />, temp);
      el.replaceWith(temp);
    });
}
