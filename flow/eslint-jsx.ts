import type { JSXAttribute, JSXOpeningElement } from 'estree-jsx';

export type ESLintJSXAttribute = {
  parent: JSXOpeningElement
} & JSXAttribute;
