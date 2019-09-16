import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Link } from 'gatsby';
import { Row, Col, Icon, Input, Menu, Button, Popover } from 'antd';
import docSearch from 'docsearch.js';
import Logo from './Logo';
import * as utils from '../../utils';

function initDocSearch(locale, docSearchConfig = {}) {
  if (!docSearch) {
    return;
  }
  if (!docSearchConfig.apiKey || !docSearchConfig.indexName) {
    console.error('docsearch.js: apiKey or indexName can not be null!');
    return;
  }
  const lang = locale === 'zh-CN' ? 'cn' : 'en';
  docSearch({
    inputSelector: '#search-box input',
    algoliaOptions: { facetFilters: [`tags:${lang}`] },
    debug: false, // Set debug to true if you want to inspect the dropdown
    ...docSearchConfig,
  });
}

class Header extends React.Component {
  state = {
    menuVisible: false,
  };

  componentDidMount() {
    const { searchInput } = this;

    document.addEventListener('keyup', event => {
      if (event.keyCode === 83 && event.target === document.body) {
        searchInput.focus();
      }
    });

    const {
      intl: { locale },
      pathContext: {
        themeConfig: { docSearchConfig },
      },
    } = this.props;

    initDocSearch(locale, docSearchConfig);
  }

  handleShowMenu = () => {
    this.setState({
      menuVisible: true,
    });
  };

  onMenuVisibleChange = visible => {
    this.setState({
      menuVisible: visible,
    });
  };

  handleLangChange = () => {
    const {
      location: { pathname },
    } = this.props;
    const currentProtocol = `${window.location.protocol}//`;
    const currentHref = window.location.href.substr(currentProtocol.length);

    if (utils.isLocalStorageNameSupported()) {
      localStorage.setItem(
        'locale',
        utils.isZhCN(pathname) ? 'en-US' : 'zh-CN'
      );
    }
    window.location.href =
      currentProtocol +
      currentHref.replace(
        window.location.pathname,
        utils.getLocalizedPathname(pathname, !utils.isZhCN(pathname))
      );
  };

  getActiveMenuItem = () => {
    const {
      location,
      pathContext: {
        themeConfig: { pathPrefix },
      },
    } = this.props;
    const path = location.pathname;
    let module = location.pathname;
    if (pathPrefix && module.startsWith(pathPrefix)) {
      module = module.replace(pathPrefix, '');
    }
    module = module
      .replace(/(^\/|\/$)/g, '')
      .split('/')
      .slice(0, -1)
      .join('/');
    let activeMenuItem = module || 'home';
    if (/^components/.test(path)) {
      activeMenuItem = 'components';
    } else if (/^docs/.test(path)) {
      activeMenuItem = 'docs';
    } else if (path === '/') {
      activeMenuItem = 'home';
    }
    return activeMenuItem;
  };

  render() {
    const { menuVisible } = this.state;
    const { intl, isMobile } = this.props;
    const menuMode = isMobile ? 'inline' : 'horizontal';
    const activeMenuItem = this.getActiveMenuItem();

    const isZhCN = intl.locale === 'zh-CN';

    const menu = [
      <div id="lang">
        <Button onClick={this.handleLangChange}>
          <FormattedMessage id="app.header.lang" />
        </Button>
      </div>,
      <Menu mode={menuMode} selectedKeys={[activeMenuItem]} id="nav" key="nav">
        <Menu.Item key="home">
          <Link to={utils.getLocalizedPathname('/', isZhCN)}>
            <FormattedMessage id="app.header.menu.home" />
          </Link>
        </Menu.Item>
        <Menu.Item key="docs">
          <Link
            to={utils.getLocalizedPathname('/docs/getting-started', isZhCN)}
          >
            <FormattedMessage id="app.header.menu.docs" />
          </Link>
        </Menu.Item>
        <Menu.Item key="components">
          <Link to={utils.getLocalizedPathname('/components/button', isZhCN)}>
            <FormattedMessage id="app.header.menu.components" />
          </Link>
        </Menu.Item>
      </Menu>,
    ];

    return (
      <div id="header" className="header">
        {isMobile && (
          <Popover
            overlayClassName="popover-menu"
            placement="bottomRight"
            content={menu}
            trigger="click"
            visible={menuVisible}
            arrowPointAtCenter
            onVisibleChange={this.onMenuVisibleChange}
          >
            <Icon
              className="nav-phone-icon"
              type="menu"
              onClick={this.handleShowMenu}
            />
          </Popover>
        )}
        <Row>
          <Col xxl={4} xl={5} lg={8} md={8} sm={24} xs={24}>
            <Logo {...this.props} />
          </Col>
          <Col xxl={20} xl={19} lg={16} md={16} sm={0} xs={0}>
            <div id="search-box">
              <Icon type="search" />
              <Input
                ref={ref => {
                  this.searchInput = ref;
                }}
                placeholder={intl.formatMessage({ id: 'app.header.search' })}
              />
            </div>
            <div className="header-meta">
              {!isMobile && <div id="menu">{menu}</div>}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default injectIntl(Header);
