import React, { Fragment, FunctionComponent, useContext } from 'react';
import {  Anchor, DocsContext, Heading, Source, Subheading  } from '@storybook/addon-docs';

const CustomTypes: FunctionComponent = () => {
  const { parameters } = useContext(DocsContext);
  const types = Object.entries(parameters?.customTypes || {});

  if (!types.length) {
    return null;
  }

  return (
    <Anchor storyId={"types"}>
      <Heading>Types</Heading>

      {types.map(([name,  code]) => (
        <Fragment key={name}>
          <Subheading>{name}</Subheading>
          <Source code={code as string} language="typescript" />
        </Fragment>
      ))}
    </Anchor>
  );
};

export default CustomTypes;
