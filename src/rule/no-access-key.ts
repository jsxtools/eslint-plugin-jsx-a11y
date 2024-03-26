/**
 * @fileoverview Enforce no accesskey attribute on element.
 * @author Ethan Cohen
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { getProp, getPropValue } from '../util/module/jsx-ast-utils.ts';
import { generateObjSchema } from '../util/schemas.ts';

const errorMessage = 'No access key attribute allowed. Inconsistencies between keyboard shortcuts and keyboard commands used by screenreaders and keyboard-only users create a11y complications.';

const schema = generateObjSchema();

export default {
  meta: {
    docs: {
      url: 'https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/no-access-key.md',
      description: 'Enforce that the `accessKey` prop is not used on any element to avoid complications with keyboard commands used by a screenreader.',
    },
    schema: [schema],
  },

  create: (context) => ({
    JSXOpeningElement: (node) => {
      const accessKey = getProp(node.attributes, 'accesskey');
      const accessKeyValue = getPropValue(accessKey);

      if (accessKey && accessKeyValue) {
        context.report({
          node,
          message: errorMessage,
        });
      }
    },
  }),
};
