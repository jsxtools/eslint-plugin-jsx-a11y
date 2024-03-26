import { getProp, getLiteralPropValue } from '../module/jsx-ast-utils.ts';

/**
 * Returns the implicit role for an img tag.
 */
export default function getImplicitRoleForImg(attributes) {
  const alt = getProp(attributes, 'alt');

  if (alt && getLiteralPropValue(alt) === '') {
    return '';
  }

  return 'img';
}
