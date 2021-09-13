export const Wrap = css.div`
  width: 100%;
  height: 100%;
  min-width: ${_gb.pageContentWidth};
  min-width: 100vw;
  min-height: 100vh;
  position: relative;
  .section-wrap{
    .section-hd{
      ${_gb.flex()};
      justify-content: space-between;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
    .section-bd{

    }
    .section-ft{

    }
  }
`;
