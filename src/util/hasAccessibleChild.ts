// @flow

import type { Node } from 'estree';
import type { JSXElement, JSXOpeningElement } from 'estree-jsx';
import { hasAnyProp } from './module/jsx-ast-utils.ts';
import isHiddenFromScreenReader from './isHiddenFromScreenReader.ts';

export default function hasAccessibleChild(node: JSXElement, elementType: (_node: JSXOpeningElement) => string): boolean {
  return node.children.some((child: Node) => {
    switch (child.type) {
      case 'Literal':
        return !!child.value;
      // $FlowFixMe JSXText is missing in ast-types-flow
      case 'JSXText':
        return !!child.value;
      case 'JSXElement':
        return !isHiddenFromScreenReader(
          elementType(child.openingElement),
          child.openingElement.attributes,
        );
      case 'JSXExpressionContainer':
        if (child.expression.type === 'Identifier') {
          return child.expression.name !== 'undefined';
        }
        return true;
      default:
        return false;
    }
  }) || hasAnyProp(node.openingElement.attributes, ['dangerouslySetInnerHTML', 'children']);
}
