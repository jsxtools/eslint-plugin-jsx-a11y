/**
 * @fileoverview Enforce non-interactive elements have no interactive handlers.
 * @author Jese Beach
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
  propName,
} from '../util/module/jsx-ast-utils.ts';
import type { ESLintConfig, ESLintContext, ESLintVisitorSelectorConfig } from '../../flow/eslint.ts';
import { arraySchema, generateObjSchema } from '../util/schemas.ts';
import getElementType from '../util/getElementType.ts';
import isAbstractRole from '../util/isAbstractRole.ts';
import isContentEditable from '../util/isContentEditable.ts';
import isHiddenFromScreenReader from '../util/isHiddenFromScreenReader.ts';
import isInteractiveElement from '../util/isInteractiveElement.ts';
import isInteractiveRole from '../util/isInteractiveRole.ts';
import isNonInteractiveElement from '../util/isNonInteractiveElement.ts';
import isNonInteractiveRole from '../util/isNonInteractiveRole.ts';
import isPresentationRole from '../util/isPresentationRole.ts';

const errorMessage = 'Non-interactive elements should not be assigned mouse or keyboard event listeners.';

const defaultInteractiveProps = [].concat(
  eventHandlersByType.focus,
  eventHandlersByType.image,
  eventHandlersByType.keyboard,
  eventHandlersByType.mouse,
);
const schema = generateObjSchema({
  handlers: arraySchema,
});

export default ({
  meta: {
    docs: {
      url: 'https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/no-noninteractive-element-interactions.md',
      description: 'Non-interactive elements should not be assigned mouse or keyboard event listeners.',
    },
    schema: [schema],
  },

  create: (context: ESLintContext): ESLintVisitorSelectorConfig => {
    const { options } = context;
    const elementType = getElementType(context);
    return {
      JSXOpeningElement: (node: JSXOpeningElement) => {
        let { attributes } = node;
        const type = elementType(node);
        const config = (options[0] || {});
        const interactiveProps = config.handlers || defaultInteractiveProps;
        // Allow overrides from rule configuration for specific elements and roles.
        if (Object.hasOwn(config, type)) {
          attributes = attributes.filter((attr) => attr.type !== 'JSXSpreadAttribute' && !config[type].includes(propName(attr)));
        }

        const hasInteractiveProps = interactiveProps
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
          || isContentEditable(type, attributes)
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
          || (
            !isNonInteractiveElement(type, attributes)
            && !isNonInteractiveRole(type, attributes)
          )
          || isAbstractRole(type, attributes)
        ) {
          // This rule has no opinion about abtract roles.
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
