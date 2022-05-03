import React from 'react';
import { Tabs } from 'antd';
import PropTypes from 'prop-types';

export const Navigation = ({ switchTab, updateRatedList }) => {
  const { TabPane } = Tabs;

  const onChangeTab = (key) => {
    switchTab(key);
    if (key === 'rated') updateRatedList();
  };

  return (
    <Tabs defaultActiveKey="1" onChange={onChangeTab}>
      <TabPane tab="Search" key="search" />
      <TabPane tab="Rated" key="rated" />
    </Tabs>
  );
};

Navigation.propTypes = {
  switchTab: PropTypes.func.isRequired,
  updateRatedList: PropTypes.func.isRequired,
};
