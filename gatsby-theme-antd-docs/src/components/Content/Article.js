import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import DocumentTitle from 'react-document-title';
import { Affix } from 'antd';
import delegate from 'delegate';
import EditButton from './EditButton';

export default class Article extends React.PureComponent {
  static contextTypes = {
    intl: PropTypes.object.isRequired,
  };

  componentDidMount() {
    // Add ga event click
    this.delegation = delegate(
      this.node,
      '.resource-card',
      'click',
      e => {
        if (window.ga) {
          window.ga(
            'send',
            'event',
            'Download',
            'resource',
            e.delegateTarget.href
          );
        }
      },
      false
    );
  }

  componentWillUnmount() {
    clearTimeout(this.pingTimer);
    if (this.delegation) {
      this.delegation.destroy();
    }
  }

  render() {
    const { intl } = this.context;
    const { content, ...rest } = this.props;
    const { meta } = content;
    const { title, subtitle, path } = meta;
    const {
      intl: { locale },
    } = this.context;
    return (
      <DocumentTitle
        title={`${title[locale] || title} - ${intl.formatMessage({
          id: 'app.header.title',
        })}`}
      >
        <article
          className="markdown"
          ref={node => {
            this.node = node;
          }}
        >
          <h1>
            {title[locale] || title}
            {!subtitle || locale === 'en-US' ? null : (
              <span className="subtitle">{subtitle}</span>
            )}
            <EditButton
              {...rest}
              title={<FormattedMessage id="app.content.edit-page" />}
              filename={path}
            />
          </h1>
          {!content.toc ||
          content.toc.length <= 1 ||
          meta.toc === false ? null : (
            <Affix className="toc-affix" offsetTop={16}>
              <div
                dangerouslySetInnerHTML={{
                  __html: content.toc
                    .replace(/<ul>/g, '<ul class="toc">')
                    .replace(/\/#/g, '#'),
                }}
              />
            </Affix>
          )}
          <section
            className="markdown api-container"
            dangerouslySetInnerHTML={{ __html: content.content }}
          />
        </article>
      </DocumentTitle>
    );
  }
}
