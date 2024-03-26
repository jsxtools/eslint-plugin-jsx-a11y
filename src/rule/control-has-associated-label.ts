/**
 * @fileoverview Enforce controls are associated with a text label.
 * @author Jesse Beach
 *
 * @flow
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import type { JSXElement } from 'estree-jsx';
import { getProp, getLiteralPropValue } from '../util/module/jsx-ast-utils.ts';
import { generateObjSchema, arraySchema } from '../util/schemas.ts';
import type { ESLintConfig, ESLintContext, ESLintVisitorSelectorConfig } from '../../flow/eslint.ts';
import getElementType from '../util/getElementType.ts';
import isDOMElement from '../util/isDOMElement.ts';
import isHiddenFromScreenReader from '../util/isHiddenFromScreenReader.ts';
import isInteractiveElement from '../util/isInteractiveElement.ts';
import isInteractiveRole from '../util/isInteractiveRole.ts';
import mayHaveAccessibleLabel from '../util/mayHaveAccessibleLabel.ts';

const errorMessage = 'A control must be associated with a text label.';

const ignoreList = ['link'];

const schema = generateObjSchema({
  labelAttributes: arraySchema,
  controlComponents: arraySchema,
  ignoreElements: arraySchema,
  ignoreRoles: arraySchema,
  depth: {
    description: 'JSX tree depth limit to check for accessible label',
    type: 'integer',
    minimum: 0,
  },
});

export default ({
  meta: {
    docs: {
      description: 'Enforce that a control (an interactive element) has a text label.',
      url: 'https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/control-has-associated-label.md',
    },
    schema: [schema],
  },

  create: (context: ESLintContext): ESLintVisitorSelectorConfig => {
    const elementType = getElementType(context);

    const options = (context.options[0] || {}) as {
      depth?: number
      labelAttributes: string[]
      controlComponents: string[]
      ignoreElements: string[]
      ignoreRoles: string[]
    };

    const {
      labelAttributes = [],
      controlComponents = [],
      ignoreElements = [],
      ignoreRoles = [],
    } = options;

    const newIgnoreElements = new Set<string>(([] as string[]).concat(ignoreElements, ignoreList));

    const rule = (node: JSXElement): void => {
      const tag = elementType(node.openingElement);
      const role = getLiteralPropValue(getProp(node.openingElement.attributes, 'role') as any) as string;

      // Ignore interactive elements that might get their label from a source
      // that cannot be discerned from static analysis, like
      // <label><input />Save</label>
      if (newIgnoreElements.has(tag)) {
        return;
      }
      // Ignore roles that are "interactive" but should not require a label.
      if (ignoreRoles.includes(role)) {
        return;
      }
      const props = node.openingElement.attributes;
      const nodeIsDOMElement = isDOMElement(tag);
      const nodeIsHiddenFromScreenReader = isHiddenFromScreenReader(tag, props);
      const nodeIsInteractiveElement = isInteractiveElement(tag, props);
      const nodeIsInteractiveRole = isInteractiveRole(tag, props);
      const nodeIsControlComponent = controlComponents.indexOf(tag) > -1;

      if (nodeIsHiddenFromScreenReader) {
        return;
      }

      let hasAccessibleLabel = true;
      if (
        nodeIsInteractiveElement
        || (
          nodeIsDOMElement
          && nodeIsInteractiveRole
        )
        || nodeIsControlComponent

      ) {
        // Prevent crazy recursion.
        const recursionDepth = Math.min(
          options.depth === undefined ? 2 : options.depth,
          25,
        );
        hasAccessibleLabel = mayHaveAccessibleLabel(
          node,
          recursionDepth,
          labelAttributes,
        );
      }

      if (!hasAccessibleLabel) {
        context.report({
          node: node.openingElement,
          message: errorMessage,
        });
      }
    };

    // Create visitor selectors.
    return {
      JSXElement: rule,
    };
  },
} as ESLintConfig);
