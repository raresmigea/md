import React, { Component } from 'react';

class Page extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div dangerouslySetInnerHTML={{ __html: this.props.data }} />;
  }
}

export default Page;
