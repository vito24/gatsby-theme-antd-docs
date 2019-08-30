import React from 'react';
import { addLocaleData, IntlProvider } from 'react-intl';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import Media from 'react-media';
import enLocale from '../../locale/en-US';
import cnLocale from '../../locale/zh-CN';
import * as utils from '../utils';
import Header from './Header';
import Footer from './Footer';
import '../../static/style';

export class Layout extends React.PureComponent {
  constructor(props) {
    super(props);
    const { pathname } = props.location;
    const appLocale = utils.isZhCN(pathname) ? cnLocale : enLocale;
    addLocaleData(appLocale.data);

    this.state = {
      appLocale,
    };
  }

  render() {
    const { children, location, ...restProps } = this.props;
    const {
      pathContext: {
        themeConfig: { 'zh-CN': cnMessages = {}, 'en-US': enMessages = {} },
      },
    } = restProps;
    const { pathname } = location;
    const { appLocale } = this.state;
    const customMessage = utils.isZhCN(pathname) ? cnMessages : enMessages;
    const messages = {
      ...appLocale.messages,
      ...customMessage,
    };

    return (
      <IntlProvider locale={appLocale.locale} messages={messages}>
        <LocaleProvider locale={enUS}>
          <div
            className={`page-wrapper ${(pathname === '/' ||
              pathname === 'index-cn') &&
              'index-page-wrapper'}`}
          >
            <Header {...restProps} location={location} />
            {React.cloneElement(children, {
              ...children.props,
              isMobile: restProps.isMobile,
            })}
            <Footer {...restProps} location={location} />
          </div>
        </LocaleProvider>
      </IntlProvider>
    );
  }
}

const WrapperLayout = props => (
  <Media query="(max-width: 996px)">
    {isMobile => {
      const isNode = typeof window === `undefined`;
      return <Layout {...props} isMobile={isMobile && !isNode} />;
    }}
  </Media>
);
export default WrapperLayout;
