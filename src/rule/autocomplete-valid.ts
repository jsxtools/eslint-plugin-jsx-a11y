/**
 * @fileoverview Ensure autocomplete attribute is correct.
 * @author Wilco Fiers
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------
import { runVirtualRule } from '../util/module/axe-core.ts';
import { getLiteralPropValue, getProp } from '../util/module/jsx-ast-utils.ts';
import { generateObjSchema, arraySchema } from '../util/schemas.ts';
import getElementType from '../util/getElementType.ts';

const schema = generateObjSchema({
  inputComponents: arraySchema,
});

export default {
  meta: {
    docs: {
      url: 'https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/autocomplete-valid.md',
      description: 'Enforce that autocomplete attributes are used correctly.',
    },
    schema: [schema],
  },

  create: (context: any) => {
    const elementType = getElementType(context);
    return {
      JSXOpeningElement: (node: any) => {
        const options = context.options[0] || {};
        const { inputComponents = [] } = options;
        const inputTypes = ['input'].concat(inputComponents);

        const elType = elementType(node);
        const autocomplete = getLiteralPropValue(getProp(node.attributes, 'autocomplete')!);

        if (typeof autocomplete !== 'string' || !inputTypes.includes(elType)) {
          return;
        }

        const type = getLiteralPropValue(getProp(node.attributes, 'type')!);
        const { violations } = runVirtualRule('autocomplete-valid', {
          nodeName: 'input',
          attributes: {
            autocomplete,
            // Which autocomplete is valid depends on the input type
            type: type === null ? undefined : type,
          },
        });

        if (violations.length === 0) {
          return;
        }
        // Since we only test one rule, with one node, return the message from first (and only) instance of each
        context.report({
          node,
          message: violations[0].nodes[0].all[0].message,
        });
      },
    };
  },
};