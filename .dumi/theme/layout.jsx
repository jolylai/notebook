import React from 'react';
import Layout from 'dumi-theme-default/src/layout';
import './style.less';

export default ({ children, ...props }) => (
  <Layout {...props}>{children}</Layout>
);
