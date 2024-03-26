/**
 * @flow
 */

import type { Node } from 'estree';
import {
  getLiteralPropValue,
  propName,
} from './module/jsx-ast-utils.ts';

/**
 * Returns true if all items in baseAttributes are found in attributes. Always
 * returns true if baseAttributes is empty.
 */
function attributesComparator(
  baseAttributes: Array<{ [key: string]: any }> = [],
  attributes: Array<Node> = [],
): boolean {
  return baseAttributes.every((baseAttr): boolean => attributes.some((attribute): boolean => {
    // Guard against non-JSXAttribute nodes like JSXSpreadAttribute
    if (attribute.type !== 'JSXAttribute') {
      return false;
    }
    // Attribute matches.
    if (baseAttr.name !== propName(attribute)) {
      return false;
    }
    // Value exists and does not match.
    if (
      baseAttr.value
      && baseAttr.value !== getLiteralPropValue(attribute)
    ) {
      return false;
    }
    return true;
  }));
}

export default attributesComparator;
