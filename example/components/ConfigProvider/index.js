import React from 'react';
import createReactContext from '@ant-design/create-react-context'

const ConfigContext = createReactContext({
  getPrefixCls: (suffixCls, customizePrefixCls) => {
    if (customizePrefixCls) {
      return customizePrefixCls;
    }

    return `kr-${suffixCls}`;
  },
});

export const ConfigConsumer = ConfigContext.Consumer;
