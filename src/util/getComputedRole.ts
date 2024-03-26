// @flow
import type { Node } from 'estree-jsx';
import getExplicitRole from './getExplicitRole.ts';
import getImplicitRole from './getImplicitRole.ts';
/**
 * Returns an element's computed role, which is
 *
 *  1. The valid value of its explicit role attribute; or
 *  2. The implicit value of its tag.
 */
export default function getComputedRole(
  tag: string,
  attributes: Array<Node>,
): string | null {
  return getExplicitRole(tag, attributes) || getImplicitRole(tag, attributes);
}
