import { getProp, getLiteralPropValue } from '../module/jsx-ast-utils.ts';

/**
 * Returns the implicit role for a menu tag.
 */
export default function getImplicitRoleForMenu(attributes) {
  const type = getProp(attributes, 'type');

  if (type) {
    const value = getLiteralPropValue(type);

    return (value && value.toUpperCase() === 'TOOLBAR') ? 'toolbar' : '';
  }

  return '';
}
