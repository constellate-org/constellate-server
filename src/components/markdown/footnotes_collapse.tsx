import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import { EuiAccordion } from '@elastic/eui';
import { Interweave } from 'interweave';

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
    .querySelectorAll('div.footnotes')
    .forEach(function repl(
      el: Element,
      _ind: number,
      _allEls: NodeListOf<Element>
    ) {
      console.log('Wrapping footnotes...');
      const temp = document.createElement('div');
      temp.classList.toggle('footnotes');
      ReactDOM.render(
        <FootnotesCollapse
          inner={
            <Interweave
              content={el.querySelector('ol').outerHTML}
              isOpen={false}
            />
          }
        />,
        temp
      );
      el.replaceWith(temp);
    });
}
