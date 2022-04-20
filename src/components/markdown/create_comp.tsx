/**
 * Monkey-patched version of https://github.com/talyssonoc/react-katex/blob/master/src/createMathComponent.js
 * that lets me add in arbitrary options to KaTeX and updates to use Flow instead of PropTypes.
 */

import React from 'react';
import KaTeX from 'katex';

type MathProps = {
    children: string,
    math: string,
    displayMode: boolean,
    throwOnError: boolean,
    errorColor: string,
    macros: object,
    colorIsTextColor: boolean,
    trust: boolean,
    globalGroup: boolean,
}

type MathCompState = {
    error: any,
    html?: string
};


const createMathComponent = (Component, { displayMode }) => {
    class MathComponent extends React.Component<MathProps, MathCompState> {
        static defaultProps = {
            children: "",
            math: "",
            displayMode: displayMode,
            throwOnError: true,
            errorColor: "#c00",
            macros: {},
            colorIsTextColor: false,
            trust: true,
            globalGroup: false
        };

        constructor(props) {
            super(props);

            this.state = this.createNewState(null, props);
        }

        componentWillReceiveProps() {
            this.setState(this.createNewState);
        }

        shouldComponentUpdate(nextProps) {
            let usedProp = this.props.math ? 'math' : 'children'
            return nextProps[usedProp] !== this.props[usedProp];
        }

        createNewState(prevState, props) {
            try {
                const html = this.generateHtml(props);

                return { html, error: undefined };
            } catch (error) {
                if (error instanceof KaTeX.ParseError || error instanceof TypeError) {
                    return { error };
                }

                throw error;
            }
        }

        generateHtml(props) {
            const { errorColor, renderError } = props;
            let usedProp = this.props.math ? 'math' : 'children'
            return KaTeX.renderToString(props[usedProp], {
                ...this.props
            });
        }

        render() {
            const { error, html } = this.state;
            const { throwOnError } = this.props;

            if (error) {
                return <Component html={`${error.message}`} />;
            } else {
                return <Component html={html} />;
            }
        }
    }
    return MathComponent;
}

const InlineMathComp = ({ html }) => {
    return <span dangerouslySetInnerHTML={{ __html: html }} />;
};

const BlockMathComp = ({ html }) => {
    return <span dangerouslySetInnerHTML={{ __html: html }} />;
};

export let BlockMath = createMathComponent(BlockMathComp, { displayMode: true });
export let InlineMath = createMathComponent(InlineMathComp, { displayMode: false })
