import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'antd';
import 'antd/dist/antd.css';
import './PaginationComponent.css';

export class PaginationComponent extends Component {
  changePage = (page) => {
    const { moveToPage } = this.props;
    moveToPage(page);
  };

  render() {
    const { page, totalResults } = this.props;

    return (
      <Pagination
        className="pages"
        size="small"
        total={totalResults}
        showSizeChanger={false}
        current={page}
        onChange={this.changePage}
        defaultPageSize={20}
        defaultCurrent={1}
      />
    );
  }
}

PaginationComponent.propTypes = {
  moveToPage: PropTypes.func.isRequired,
  page: PropTypes.number,
  totalResults: PropTypes.number,
};

PaginationComponent.defaultProps = {
  page: 1,
  totalResults: 0,
};
