/**
 * @fileoverview Enforce that elements with onClick handlers must be tabbable.
 * @author Ethan Cohen
 * @flow
 */

import {
  dom,
  roles,
} from 'aria-query';
import type { JSXOpeningElement } from 'estree-jsx';
import {
  getProp,
  eventHandlersByType,
  getLiteralPropValue,
  hasAnyProp,
} from '../util/module/jsx-ast-utils.ts';
import type { ESLintConfig, ESLintContext, ESLintVisitorSelectorConfig } from '../../flow/eslint.ts';
import {
  enumArraySchema,
  generateObjSchema,
} from '../util/schemas.ts';
import getElementType from '../util/getElementType.ts';
import isDisabledElement from '../util/isDisabledElement.ts';
import isHiddenFromScreenReader from '../util/isHiddenFromScreenReader.ts';
import isInteractiveElement from '../util/isInteractiveElement.ts';
import isInteractiveRole from '../util/isInteractiveRole.ts';
import isNonInteractiveElement from '../util/isNonInteractiveElement.ts';
import isNonInteractiveRole from '../util/isNonInteractiveRole.ts';
import isPresentationRole from '../util/isPresentationRole.ts';
import getTabIndex from '../util/getTabIndex.ts';

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

const schema = generateObjSchema({
  // TODO: convert to use iterFilter and iterFrom
  tabbable: enumArraySchema([...roles.keys()].filter((name) => (
    !roles.get(name).abstract
    && roles.get(name).superClass.some((klasses) => klasses.includes('widget'))
  ))),
});

const interactiveProps = [].concat(
  eventHandlersByType.mouse,
  eventHandlersByType.keyboard,
);

export default ({
  meta: {
    docs: {
      url: 'https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/interactive-supports-focus.md',
      description: 'Enforce that elements with interactive handlers like `onClick` must be focusable.',
    },
    schema: [schema],
  },

  create: (context: ESLintContext): ESLintVisitorSelectorConfig => {
    const elementType = getElementType(context);
    return {
      JSXOpeningElement: (node: JSXOpeningElement) => {
        const tabbable = (
          context.options && context.options[0] && context.options[0].tabbable
        ) || [];
        const { attributes } = node;
        const type = elementType(node);
        const hasInteractiveProps = hasAnyProp(attributes, interactiveProps);
        const hasTabindex = getTabIndex(getProp(attributes, 'tabIndex')) !== undefined;

        if (!dom.has(type)) {
          // Do not test higher level JSX components, as we do not know what
          // low-level DOM element this maps to.
          return;
        }
        if (
          !hasInteractiveProps
          || isDisabledElement(attributes)
          || isHiddenFromScreenReader(type, attributes)
          || isPresentationRole(type, attributes)
        ) {
          // Presentation is an intentional signal from the author that this
          // element is not meant to be perceivable. For example, a click screen
          // to close a dialog .
          return;
        }

        if (
          hasInteractiveProps
          && isInteractiveRole(type, attributes)
          && !isInteractiveElement(type, attributes)
          && !isNonInteractiveElement(type, attributes)
          && !isNonInteractiveRole(type, attributes)
          && !hasTabindex
        ) {
          const role = getLiteralPropValue(getProp(attributes, 'role'));
          if (tabbable.includes(role)) {
            // Always tabbable, tabIndex = 0
            context.report({
              node,
              message: `Elements with the '${role}' interactive role must be tabbable.`,
            });
          } else {
            // Focusable, tabIndex = -1 or 0
            context.report({
              node,
              message: `Elements with the '${role}' interactive role must be focusable.`,
            });
          }
        }
      },
    };
  },
} as ESLintConfig);
