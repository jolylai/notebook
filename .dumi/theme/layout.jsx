import React from 'react';
import Layout from 'dumi-theme-default/src/layout';

import './style/layout.less';
import './style/side.less';
import './style/slug.less';

export default ({ children, ...props }) => {
  return <Layout {...props}>{children}</Layout>;
};
