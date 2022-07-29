import React from 'react';
import Layout from 'dumi-theme-default/src/layout';
import './style/layout.less';

export default ({ children, ...props }) => {
  console.log('props: ', props);

  return <Layout {...props}>{children}</Layout>;
};
