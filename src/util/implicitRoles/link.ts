import { getProp } from '../module/jsx-ast-utils.ts';

/**
 * Returns the implicit role for a link tag.
 */
export default function getImplicitRoleForLink(attributes) {
  if (getProp(attributes, 'href')) {
    return 'link';
  }

  return '';
}
