import React from 'react';
import { Input } from 'antd';
import { Row, Col } from 'antd';
const Search = Input.Search;

class SearchBar extends React.Component {
  render() {
    return (
      <div className="Home">
      <Row>
        <Col >
          <Search placeholder="请输入手机或者身份证号码查询" enterButton="Search" size="large" />
        </Col>
      </Row>
        
      </div>
    );
  }
}

export default SearchBar;
