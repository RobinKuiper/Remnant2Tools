import React from 'react';
import { renderToString } from 'react-dom/server';
import SSRComponent from './src/components/SSRComponent';

export const onPreRenderHTML = ({
                                  getHeadComponents,
                                  replaceHeadComponents,
                                }: any) => {
  const app = renderToString(<SSRComponent />);

  // Inject the rendered component into the HTML head
  const headComponents = getHeadComponents();
  headComponents.push(
    <script
      key="ssr-component"
      dangerouslySetInnerHTML={{
        __html: `window.__SSR_COMPONENT__ = ${JSON.stringify(app)}`,
      }}
    />
  );
  replaceHeadComponents(headComponents);
};