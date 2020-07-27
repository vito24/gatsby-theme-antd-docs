import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ConfigConsumer } from '../ConfigProvider';

// TODO
import './style/index.less';

const ButtonHTMLTypes = ['submit', 'button', 'reset'];
const ButtonTypes = ['default', 'primary', 'ghost', 'dashed', 'danger', 'link'];
const ButtonSizes = ['large', 'default', 'small'];
const ButtonShapes = ['circle', 'round'];

class Button extends Component {
  static propTypes = {
    htmlType: PropTypes.oneOf(ButtonHTMLTypes),
    type: PropTypes.oneOf(ButtonTypes),
    size: PropTypes.oneOf(ButtonSizes),
    shape: PropTypes.oneOf(ButtonShapes),
    loading: PropTypes.oneOf([PropTypes.bool, PropTypes.object]),
    className: PropTypes.string,
    ghost: PropTypes.bool,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    htmlType: 'button',
    block: false,
    ghost: false,
  };

  handleClick = (e) => {
    const { onClick } = this.props;
    if (onClick) {
      onClick(e);
    }
  };

  renderButton = ({ getPrefixCls }) => {
    const {
      htmlType,
      type,
      size,
      block,
      shape,
      ghost,
      loading,
      className,
      prefixCls: customizePrefixCls,
      children,
      ...rest
    } = this.props;

    const prefixCls = getPrefixCls('btn', customizePrefixCls);

    const sizeCls = size === 'default' ? undefined : size;

    const btnClass = classNames(prefixCls, className, {
      [`${prefixCls}-${type}`]: type,
      [`${prefixCls}-${shape}`]: shape,
      [`${prefixCls}-${size}`]: sizeCls,
      [`${prefixCls}-block`]: block,
      [`${prefixCls}-loading`]: loading,
      [`${prefixCls}-ghost`]: ghost,
    });

    return (
      <button
        {...rest}
        type={htmlType}
        onClick={this.handleClick}
        className={btnClass}
      >
        {children}
      </button>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderButton}</ConfigConsumer>;
  }
}

export default Button;
