import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <span>
        <div style={{ lineHeight: '52px', textAlign: 'center', borderBottom: '1px solid #eee' }}>Header</div>
      </span>
    );
  }
}


export default Header;