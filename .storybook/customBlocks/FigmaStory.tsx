import React, { useContext, FunctionComponent } from 'react';
import { 
  Anchor, 
  Canvas, 
  DocsContext, 
  Heading, 
  Subheading 
} from '@storybook/addon-docs';

const FigmaStory: FunctionComponent = () => {
  const { parameters } = useContext(DocsContext);

  const figmaLink = parameters?.design?.url;

  if (!figmaLink) {
    return null;
  }

  return (
    <Anchor storyId={"figma"}>
      <Heading>Design</Heading>
      <Subheading>Figma</Subheading>
      
      <Canvas>
        <iframe
          width="100%"
          height="450"
          src={figmaLink}
          allowFullScreen
        />
      </Canvas>
    </Anchor>
  );
};

export default FigmaStory;
