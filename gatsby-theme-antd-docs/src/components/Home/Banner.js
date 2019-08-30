import React from 'react';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import { Button } from 'antd';
import { Link } from 'gatsby';
import { FormattedMessage } from 'react-intl';
import BannerSVGAnim from './BannerSVGAnim';
import { isZhCN, getLocalizedPathname } from '../utils';

function Banner(props) {
  const { isMobile, location } = props;

  return (
    <div className="banner-wrapper">
      <TweenOne animation={{ opacity: 1 }} className="banner-image-wrapper">
        {isMobile ? (
          <img
            alt="banner"
            src="https://gw.alipayobjects.com/zos/rmsportal/rqKQOpnMxeJKngVvulsF.svg"
            width="100%"
          />
        ) : (
          <BannerSVGAnim />
        )}
      </TweenOne>
      <QueueAnim
        className="banner-title-wrapper"
        type={isMobile ? 'bottom' : 'right'}
      >
        <div key="line" className="title-line-wrapper">
          <div
            className="title-line"
            style={{ transform: 'translateX(-64px)' }}
          />
        </div>
        <h1 key="h1">
          <FormattedMessage id="app.home.title" />
        </h1>
        <p key="content">
          <FormattedMessage id="app.home.slogan" />
        </p>
        <div key="button" className="button-wrapper">
          <Link to={getLocalizedPathname('/docs/', isZhCN(location.pathname))}>
            <Button style={{ margin: '0 16px' }} type="primary" ghost>
              <FormattedMessage id="app.home.start" />
            </Button>
          </Link>
        </div>
      </QueueAnim>
    </div>
  );
}

export default Banner;
