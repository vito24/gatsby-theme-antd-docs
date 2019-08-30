import React from 'react';
import { Tooltip, Icon } from 'antd';

export default function EditButton(props) {
  const {
    title,
    filename,
    pathContext: {
      themeConfig: { github: branchUrl },
    },
  } = props;

  return (
    <Tooltip title={title}>
      <a
        className="edit-button"
        target="_blank"
        rel="noopener noreferrer"
        href={`${branchUrl}${filename}`}
      >
        <Icon type="edit" />
      </a>
    </Tooltip>
  );
}
