import { GlobalHotKeys, getApplicationKeyMap } from 'react-hotkeys';
import {
  EuiDescriptionList,
  EuiFlyout,
  EuiFlyoutHeader,
  EuiFlyoutBody,
  EuiTitle,
  EuiButtonIcon,
} from '@elastic/eui';
import React from 'react';

function keyDisplay(keycode: string) {
  // map to Unicode if arrows
  const SPECIAL_KEYS = {
    ArrowLeft: '←',
    ArrowRight: '→',
    ArrowUp: '↑',
    ArrowDown: '↓',
    shift: 'Shift',
  };

  console.log(keycode);

  if (keycode in SPECIAL_KEYS) {
    return <kbd>{SPECIAL_KEYS[keycode]}</kbd>;
  }

  // if combination, parse each sub-unit
  if (keycode.match('.+\\+.+')) {
    const parts = keycode.split('+');
    return parts.map(keyDisplay).reduce((prev, curr) => [prev, '+', curr]);
  }

  // otherwise, print in all caps: probably single letter
  return <kbd>{keycode.toLocaleUpperCase()}</kbd>;
}

function hotKeysInfo(keyMap) {
  const items = Object.keys(keyMap).map(actionName => {
    const { sequences, name } = keyMap[actionName];

    return {
      title: name,
      description: sequences
        .map(sequence => <kbd key={sequence}>{keyDisplay(sequence)}</kbd>)
        .reduce((prev, curr) => [prev, <kbd>, </kbd>, curr]),
    };
  });

  return (
    <EuiDescriptionList type="column" listItems={items} textStyle="reverse" />
  );
}

let HelpFlyout = props => {
  return props.isOpen ? (
    <EuiFlyout onClose={props.onClose} paddingSize="l" size="s">
      <EuiFlyoutHeader hasBorder>
        <EuiTitle size="m">
          <h2>Keyboard Shortcuts</h2>
        </EuiTitle>
      </EuiFlyoutHeader>
      <EuiFlyoutBody>{props.children}</EuiFlyoutBody>
    </EuiFlyout>
  ) : null;
};

class ShortcutHandler extends React.Component<{}, { isFlyoutOpen: boolean }> {
  constructor(props) {
    super(props);
    this.state = {
      isFlyoutOpen: false,
    };
  }

  render() {
    const keyMap = {
      NEXT_PAGE: {
        name: 'Next page',
        sequences: ['n', 'ArrowRight'],
      },
      PREV_PAGE: {
        name: 'Previous page',
        sequences: ['p', 'ArrowLeft'],
      },
      TOGGLE_THEME: {
        name: 'Toggle dark theme',
        sequences: ['d'],
      },
      MENU: {
        name: 'Show menu',
        sequences: ['m'],
      },
      HELP: {
        name: 'Show this help dialog',
        sequences: ['h', 'shift+?'],
      },
    };

    const handlers = {
      NEXT_PAGE: () => {
        document.getElementById('nextBtn').click();
      },
      PREV_PAGE: () => {
        document.getElementById('prevBtn').click();
      },
      TOGGLE_THEME: () => {
        document.getElementById('themeSwitcher').click();
      },
      MENU: () => {
        document.getElementById('toggleMenu').click();
      },
      HELP: () => {
        this.setState({ isFlyoutOpen: !this.state.isFlyoutOpen });
      },
    };
    return (
      <>
        <GlobalHotKeys keyMap={keyMap} handlers={handlers} />
        <HelpFlyout
          isOpen={this.state.isFlyoutOpen}
          onClose={() => this.setState({ isFlyoutOpen: false })}>
          {hotKeysInfo(keyMap)}
        </HelpFlyout>
        <EuiButtonIcon
          onClick={() => this.setState({ isFlyoutOpen: true })}
          iconType="keyboardShortcut"
          aria-label="Show Keyboard Shortcuts"
          color="text"
        />
      </>
    );
  }
}

export default ShortcutHandler;
