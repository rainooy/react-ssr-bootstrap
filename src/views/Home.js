//  import Layout from '@ant-design/pro-layout';
class Home extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <></>
    );
  }
}

export default Home;
