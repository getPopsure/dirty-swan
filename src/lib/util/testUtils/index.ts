// Re-export all @testing-library/react exports
export * from '@testing-library/react';

// Override render method with user-event
export { customRender as render } from './customRender';
