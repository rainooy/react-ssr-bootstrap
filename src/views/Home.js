//  import Layout from '@ant-design/pro-layout';
class Home extends React.Component {
  state = {
    collapsed: false,
  };

  componentDidMount() {
    const abd = 'kiss,rainoy' + Math.random();
    const cddd = abd + '12';
    console.log(abd);
    if(this.props.ra) {
      this.props.get(abd);
    }
  }
  

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
