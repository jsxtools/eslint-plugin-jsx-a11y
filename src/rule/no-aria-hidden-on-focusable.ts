/**
 * @fileoverview Enforce aria-hidden is not used on interactive elements or contain interactive elements.
 * @author Kate Higa
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { getProp, getPropValue } from '../util/module/jsx-ast-utils.ts';
import getElementType from '../util/getElementType.ts';
import isFocusable from '../util/isFocusable.ts';
import { generateObjSchema } from '../util/schemas.ts';

const schema = generateObjSchema();

export default {
  meta: {
    docs: {
      url: 'https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/no-aria-hidden-on-focusable.md',
      description: 'Disallow `aria-hidden="true"` from being set on focusable elements.',
    },
    schema: [schema],
  },

  create(context) {
    const elementType = getElementType(context);
    return {
      JSXOpeningElement(node) {
        const { attributes } = node;
        const type = elementType(node);
        const isAriaHidden = getPropValue(getProp(attributes, 'aria-hidden')) === true;

        if (isAriaHidden && isFocusable(type, attributes)) {
          context.report({
            node,
            message: 'aria-hidden="true" must not be set on focusable elements.',
          });
        }
      },
    };
  },
};
