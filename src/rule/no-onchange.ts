/**
 * @fileoverview Enforce usage of onBlur over onChange for accessibility.
 * @author Ethan Cohen
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { getProp } from '../util/module/jsx-ast-utils.ts';
import { generateObjSchema } from '../util/schemas.ts';
import getElementType from '../util/getElementType.ts';

const errorMessage = 'onBlur must be used instead of onchange, unless absolutely necessary and it causes no negative consequences for keyboard only or screen reader users.';

const applicableTypes = [
  'select',
  'option',
];

const schema = generateObjSchema();

export default {
  meta: {
    docs: {
      url: 'https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/no-onchange.md',
      description: 'Enforce usage of `onBlur` over `onChange` on select menus for accessibility.',
    },
    deprecated: true,
    schema: [schema],
  },

  create: (context) => {
    const elementType = getElementType(context);
    return {
      JSXOpeningElement: (node) => {
        const nodeType = elementType(node);

        if (applicableTypes.indexOf(nodeType) === -1) {
          return;
        }

        const onChange = getProp(node.attributes, 'onChange');
        const hasOnBlur = getProp(node.attributes, 'onBlur') !== undefined;

        if (onChange && !hasOnBlur) {
          context.report({
            node,
            message: errorMessage,
          });
        }
      },
    };
  },
};
