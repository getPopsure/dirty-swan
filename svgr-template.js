const iconTemplate = ({ jsx }, { tpl }) => tpl`
/* Generated file. Do not modify. */
import { createElement } from 'react';
import { IconWrapper } from '../IconWrapper';
import type { IconWrapperProps } from '../IconWrapper';
export default (props: IconWrapperProps) => createElement(IconWrapper, props, ${jsx.children});
`;

module.exports = iconTemplate;