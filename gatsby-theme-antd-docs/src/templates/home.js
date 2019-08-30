import React from 'react';
import Media from 'react-media';

import WrapperLayout from '../components/Layout';
import Home from '../components/Home';

const IndexPage = props => {
  const isNode = typeof window === `undefined`;
  return (
    <WrapperLayout {...props}>
      <Media query="(max-width: 599px)">
        {isMobile => <Home {...props} isMobile={isMobile && !isNode} />}
      </Media>
    </WrapperLayout>
  );
};

export default IndexPage;
