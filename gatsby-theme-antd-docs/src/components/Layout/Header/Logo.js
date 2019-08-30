import React from "react";
import { Link } from "gatsby";
import { FormattedMessage } from 'react-intl';
import LogoUrl from "../../../images/logo.svg";

function Logo(props) {
  const {
    pathContext: {
      themeConfig: { logo = LogoUrl }
    }
  } = props;

  return (
    <Link id="logo" to="/">
      <img src={logo} alt="logo" />
      <FormattedMessage id="app.header.title" />
    </Link>
  );
}

export default Logo;
