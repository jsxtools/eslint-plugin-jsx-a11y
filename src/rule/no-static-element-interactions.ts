/**
 * @fileoverview Enforce static elements have no interactive handlers.
 * @author Ethan Cohen
 * @flow
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { dom } from 'aria-query';
import type { JSXOpeningElement } from 'estree-jsx';
import {
  eventHandlersByType,
  getPropValue,
  getProp,
  hasProp,
} from '../util/module/jsx-ast-utils.ts';
import type { ESLintConfig, ESLintContext, ESLintVisitorSelectorConfig } from '../../flow/eslint.ts';
import { arraySchema, generateObjSchema } from '../util/schemas.ts';
import getElementType from '../util/getElementType.ts';
import isAbstractRole from '../util/isAbstractRole.ts';
import isHiddenFromScreenReader from '../util/isHiddenFromScreenReader.ts';
import isInteractiveElement from '../util/isInteractiveElement.ts';
import isInteractiveRole from '../util/isInteractiveRole.ts';
import isNonInteractiveElement from '../util/isNonInteractiveElement.ts';
import isNonInteractiveRole from '../util/isNonInteractiveRole.ts';
import isNonLiteralProperty from '../util/isNonLiteralProperty.ts';
import isPresentationRole from '../util/isPresentationRole.ts';

const errorMessage = 'Avoid non-native interactive elements. If using native HTML is not possible, add an appropriate role and support for tabbing, mouse, keyboard, and touch inputs to an interactive content element.';

const defaultInteractiveProps = [].concat(
  eventHandlersByType.focus,
  eventHandlersByType.keyboard,
  eventHandlersByType.mouse,
);
const schema = generateObjSchema({
  handlers: arraySchema,
});

export default ({
  meta: {
    docs: {
      url: 'https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/no-static-element-interactions.md',
      description: 'Enforce that non-interactive, visible elements (such as `<div>`) that have click handlers use the role attribute.',
    },
    schema: [schema],
  },

  create: (context: ESLintContext): ESLintVisitorSelectorConfig => {
    const { options } = context;
    const elementType = getElementType(context);
    return {
      JSXOpeningElement: (node: JSXOpeningElement) => {
        const { attributes } = node;
        const type = elementType(node);

        const {
          allowExpressionValues,
          handlers = defaultInteractiveProps,
        } = (options[0] || {});

        const hasInteractiveProps = handlers
          .some((prop) => (
            hasProp(attributes, prop)
            && getPropValue(getProp(attributes, prop)) != null
          ));

        if (!dom.has(type)) {
          // Do not test higher level JSX components, as we do not know what
          // low-level DOM element this maps to.
          return;
        }
        if (
          !hasInteractiveProps
          || isHiddenFromScreenReader(type, attributes)
          || isPresentationRole(type, attributes)
        ) {
          // Presentation is an intentional signal from the author that this
          // element is not meant to be perceivable. For example, a click screen
          // to close a dialog .
          return;
        }
        if (
          isInteractiveElement(type, attributes)
          || isInteractiveRole(type, attributes)
          || isNonInteractiveElement(type, attributes)
          || isNonInteractiveRole(type, attributes)
          || isAbstractRole(type, attributes)
        ) {
          // This rule has no opinion about abstract roles.
          return;
        }

        if (
          allowExpressionValues === true
          && isNonLiteralProperty(attributes, 'role')
        ) {
          // Special case if role is assigned using ternary with literals on both side
          const roleProp = getProp(attributes, 'role');
          if (roleProp && roleProp.type === 'JSXAttribute' && roleProp.value.type === 'JSXExpressionContainer') {
            if (roleProp.value.expression.type === 'ConditionalExpression') {
              if (
                roleProp.value.expression.consequent.type === 'Literal'
                && roleProp.value.expression.alternate.type === 'Literal'
              ) {
                return;
              }
            }
          }
          return;
        }

        // Visible, non-interactive elements should not have an interactive handler.
        context.report({
          node,
          message: errorMessage,
        });
      },
    };
  },
} as ESLintConfig);
