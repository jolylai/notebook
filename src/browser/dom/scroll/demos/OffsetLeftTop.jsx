import React from 'react';
import styled from 'styled-components';

export default () => {
  const SpanBox = styled.div`
    width: 300px;
    border-color: blue;
    border-style: solid;
    border-width: 1;
  `;

  const Box = styled.div`
    position: absolute;
    border-color: red;
    border-width: 1;
    border-style: solid;
    z-index: 10;
  `;

  return (
    <div>
      <SpanBox>
        <span>Short span. </span>
        <span id="long">Long span that wraps withing this div.</span>
      </SpanBox>
      <Box></Box>
    </div>
  );
};
