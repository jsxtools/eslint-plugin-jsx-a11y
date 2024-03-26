/**
 * @flow
 */

import type { JSXOpeningElement } from 'estree-jsx';
import { elementType, getProp, getLiteralPropValue } from './module/jsx-ast-utils.ts';

import type { ESLintContext } from '../../flow/eslint.ts';

const getElementType = (context: ESLintContext): ((node: JSXOpeningElement) => string) => {
  const { settings } = context;
  const polymorphicPropName = settings['jsx-a11y']?.polymorphicPropName;
  const componentMap = settings['jsx-a11y']?.components;

  return (node: JSXOpeningElement): string => {
    const polymorphicProp = polymorphicPropName ? getLiteralPropValue(getProp(node.attributes, polymorphicPropName)) : undefined;
    const rawType = polymorphicProp ?? elementType(node);

    if (!componentMap) {
      return rawType;
    }

    return Object.hasOwn(componentMap, rawType) ? componentMap[rawType] : rawType;
  };
};

export default getElementType;
