import { getProp, getLiteralPropValue } from '../module/jsx-ast-utils.ts';

/**
 * Returns the implicit role for a menuitem tag.
 */
export default function getImplicitRoleForMenuitem(attributes) {
  const type = getProp(attributes, 'type');

  if (type) {
    const value = getLiteralPropValue(type) || '';

    switch (typeof value === 'string' && value.toUpperCase()) {
      case 'COMMAND':
        return 'menuitem';
      case 'CHECKBOX':
        return 'menuitemcheckbox';
      case 'RADIO':
        return 'menuitemradio';
      default:
        return '';
    }
  }

  return '';
}
