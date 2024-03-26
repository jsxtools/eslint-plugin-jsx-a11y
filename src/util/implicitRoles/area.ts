import { getProp } from '../module/jsx-ast-utils.ts';

/**
 * Returns the implicit role for an area tag.
 */
export default function getImplicitRoleForArea(attributes) {
  if (getProp(attributes, 'href')) {
    return 'link';
  }

  return '';
}
