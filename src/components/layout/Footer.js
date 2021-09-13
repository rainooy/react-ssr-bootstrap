const Wrap = css.div`
  padding: 45px 0 45px 0;
  .cont{
    width: ${_gb.pageContentWidth};
  }
`;

function Footer(props) {
  return (
    <Wrap>
      <div className="cont"></div>
    </Wrap>
  );
}

export default Footer;
