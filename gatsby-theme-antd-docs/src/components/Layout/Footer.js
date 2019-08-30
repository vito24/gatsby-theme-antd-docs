import React from 'react';
import { FormattedMessage } from 'react-intl';

function Footer() {
  return (
    <footer id="footer">
      <div className="bottom-bar">
        <FormattedMessage id="app.footer.text" />
      </div>
    </footer>
  );
}

export default Footer;
