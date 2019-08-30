import React from 'react';
import { injectIntl } from 'react-intl';
import DocumentTitle from 'react-document-title';

import Banner from './Banner';

function Home(props) {
  const { intl } = props;
  return (
    <DocumentTitle
      title={`${intl.formatMessage({
        id: 'app.header.title',
      })} - ${intl.formatMessage({
        id: 'app.home.slogan',
      })}`}
    >
      <div className="home-wrapper">
        <Banner {...props} />
      </div>
    </DocumentTitle>
  );
}

export default injectIntl(Home);
