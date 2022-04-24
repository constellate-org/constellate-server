import { css } from '@emotion/react';

const footnotesStyles = css`
    sup, sub {
    font-size: 0.7rem;
}

sup {
    vertical-align: super;
}

sub {
    vertical-align: sub;
}

sup[id^=fnref] {
    padding: 0.1rem;
}

`;

export default footnotesStyles;
