import { createGlobalStyle } from 'styled-components';

export const StyleWrapper = css.div`
  
`;

export const GlobalStyles = createGlobalStyle`
  body {
  font-size: 14px;
  min-width: 800px;
  font-weight: normal;
  }
  blockquote,
  body,
  dd,
  dl,
  fieldset,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  ol,
  p,
  pre,
  ul {
    margin: 0;
  }
  button,
  fieldset,
  input,
  ol,
  option,
  td,
  textarea,
  th,
  ul {
    padding: 0;
  }
  ol,
  ul {
    list-style: none;
    list-style-type: none;
  }
  a {
    text-decoration: none;
  }
  i {
    font-style: normal;
  }
  select,
  input {
    appearance: none;
    -webkit-appearance: none;
  }
  table {
    border-collapse: collapse;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    letter-spacing: 0.2px;
    color: rgba(0, 0, 0, 0.88);
  }
  * {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  .clearfix {
    *zoom: 1;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    line-height: 0;
    content: '';
  }
  .clearfix:after {
    clear: both;
  }
  .ell {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
  }
`;
