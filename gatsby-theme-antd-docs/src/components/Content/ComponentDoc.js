import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import { FormattedMessage } from 'react-intl';
import { Row, Col, Affix, Alert } from 'antd';
import Demo from './Demo';
import EditButton from './EditButton';

export default class ComponentDoc extends React.PureComponent {
  static contextTypes = {
    intl: PropTypes.object,
  };

  state = {
    affixMode: true,
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const tocNode = document.getElementById('demo-toc');
    const dh = document.body.scrollHeight;
    const of =
      window.scrollY + ((tocNode && tocNode.offsetHeight) || this.tocHeight);
    const affixMode = this.state;
    if (dh - of <= 600) {
      if (affixMode) {
        this.tocHeight = tocNode.offsetHeight;
        this.setState({
          affixMode: false,
        });
      }
    } else if (!affixMode) {
      this.setState({
        affixMode: true,
      });
    }
  };

  getShowDemos = localTitle => {
    const {
      intl: { locale },
    } = this.context;
    const leftChildren = [];
    const rightChildren = [];
    const demosJump = [];
    const { expand } = this.state;
    let isSingleCol = true;
    const { location, demos, utils, ...rest } = this.props;

    const showedDemo = demos
      .filter(demo => demo.preview)
      .sort((a, b) => a.meta.order - b.meta.order);

    showedDemo.forEach(({ meta: { col } }) => {
      if (col && col !== 1) {
        isSingleCol = false;
      }
    });

    showedDemo.forEach((demoData, index) => {
      const { filename, title } = demoData.meta;
      const id = `scaffold-src-components-${localTitle}-demo-${
        filename
          .split('/')
          .pop()
          .split('.')[0]
      }`;
      demosJump.push({
        title: title[locale],
        id,
      });
      const demoElem = (
        <Demo
          {...rest}
          {...demoData}
          key={filename}
          utils={utils}
          expand={expand}
          id={id}
          location={location}
        />
      );
      if (index % 2 === 0 || isSingleCol) {
        leftChildren.push(demoElem);
      } else {
        rightChildren.push(demoElem);
      }
    });
    return {
      leftChildren,
      rightChildren,
      isSingleCol,
      demosJump,
    };
  };

  render() {
    const {
      doc: {
        meta: { title, subtitle, path },
        toc,
        descriptionHtml,
        apiHtml,
      },
      location: { pathname },
      ...rest
    } = this.props;
    const { intl } = this.context;
    const { locale } = intl;
    const { affixMode } = this.state;
    const localTitle = title[locale] || title;

    const {
      leftChildren,
      demosJump,
      rightChildren,
      isSingleCol,
    } = this.getShowDemos(localTitle);
    const isNotTranslated = locale === 'en-US' && subtitle;
    return (
      <DocumentTitle
        title={`${subtitle || ''} ${localTitle} - ${intl.formatMessage({
          id: 'app.header.title',
        })}`}
      >
        <article>
          <Affix
            className="toc-affix"
            offsetTop={16}
            style={affixMode ? { opacity: 1 } : { opacity: 0, zIndex: -99 }}
          >
            <ul className="toc">
              <li>
                <p>
                  <a href={`${pathname}#demos`}>Demo</a>
                </p>
                <ul className="toc">
                  {demosJump.map(jump => (
                    <li>
                      <a href={`${pathname}#${jump.id}`}>{jump.title}</a>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
            <div
              id="demo-toc-bottom"
              dangerouslySetInnerHTML={{
                __html: toc
                  .replace(/<ul>/g, '<ul class="toc">')
                  .replace(/\/#/g, '#'),
              }}
            />
          </Affix>
          {isNotTranslated && (
            <Alert
              type="warning"
              message={
                <span>
                  This article has not been translated, hope that your can PR to
                  translated it.
                </span>
              }
              style={{ marginBottom: 24 }}
            />
          )}
          <section className="markdown">
            <h1>
              {title[locale] || title}
              {!subtitle ? null : <span className="subtitle">{subtitle}</span>}
              <EditButton
                {...rest}
                title={<FormattedMessage id="app.content.edit-page" />}
                filename={path}
              />
            </h1>
            <section
              className="markdown api-container"
              dangerouslySetInnerHTML={{ __html: descriptionHtml }}
            />
            <h2 style={{ marginBottom: 32 }} id="demos">
              <FormattedMessage id="app.component.examples" />
            </h2>
          </section>
          <Row gutter={16}>
            <Col
              span={isSingleCol ? '24' : '12'}
              className={
                isSingleCol ? 'code-boxes-col-1-1' : 'code-boxes-col-2-1'
              }
            >
              {leftChildren}
            </Col>
            {isSingleCol ? null : (
              <Col className="code-boxes-col-2-1" span={12}>
                {rightChildren}
              </Col>
            )}
          </Row>
          <section
            className="markdown api-container"
            dangerouslySetInnerHTML={{ __html: apiHtml }}
          />
        </article>
      </DocumentTitle>
    );
  }
}
