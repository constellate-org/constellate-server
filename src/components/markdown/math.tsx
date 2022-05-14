import { InlineMath, BlockMath } from './create_comp';
import macros from './preamble';

export type MathParserOptions = {
  singleDollar?: boolean;
};

export function MathMarkdownParser({
  singleDollar = false,
}: MathParserOptions) {
  const Parser = this.Parser;
  const tokenizers = Parser.prototype.inlineTokenizers;
  const methods = Parser.prototype.inlineMethods;

  // function to parse a matching string
  function tokenizeMath(eat, value, silent) {
    // match display mode
    let tokenMatch = value.match(/^\$\$([^$]+?)\$\$/);
    let isBlock;
    if (tokenMatch !== null) {
      isBlock = true;
    } else if (singleDollar) {
      // now attempt to match inline math
      tokenMatch = value.match(/^\$([^\n$]+?)\$/);

      if (tokenMatch != null) {
        isBlock = false;
      }
    }

    if (tokenMatch == null) {
      return false;
    }

    const [whole, math] = tokenMatch;

    if (silent) {
      return true;
    }

    // must consume the exact & entire match string
    return eat(whole)({
      type: 'mathPlugin',
      math: math, // configuration is passed to the renderer
      isBlock: isBlock,
    });
  }

  // function to detect where the next math match might be found
  tokenizeMath.locator = (value, fromIndex) => {
    return value.indexOf('$', fromIndex);
  };

  // define the math plugin and inject it just before the existing text plugin
  tokenizers.math = tokenizeMath;
  methods.splice(0, 0, 'math');
}

// this will inevitably produce divs in ps, idk how to fix it
export function KatexRenderer({ math, isBlock }) {
  if (isBlock) {
    return <BlockMath math={math} macros={macros} />;
  } else {
    return <InlineMath math={math} macros={macros} />;
  }
}
