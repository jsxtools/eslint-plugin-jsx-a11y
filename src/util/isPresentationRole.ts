import type { JSXAttribute } from 'estree-jsx';

import { getProp, getLiteralPropValue } from './module/jsx-ast-utils.ts';

const presentationRoles = new Set<string>([
  'presentation',
  'none',
]);

const isPresentationRole = (tagName: string, attributes: JSXAttribute[]) => presentationRoles.has(
  getLiteralPropValue(
    getProp(attributes, 'role')!,
  ) as string,
);

export default isPresentationRole;
