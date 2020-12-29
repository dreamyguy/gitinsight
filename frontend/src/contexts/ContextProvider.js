import React from 'react';
import { ErrorProvider } from './ErrorProvider';
import { MenuProvider } from './MenuProvider';
import { UiProvider } from './UiProvider';

const ProviderComposer = ({ contexts, children }) =>
  contexts.reduceRight((kids, parent) => React.cloneElement(parent, { children: kids }), children);

export const ContextProvider = ({ children }) => (
  <ProviderComposer contexts={[<ErrorProvider />, <MenuProvider />, <UiProvider />]}>
    {children}
  </ProviderComposer>
);
