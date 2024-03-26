import {
  dom,
  roles,
} from 'aria-query';
import iterFrom from 'es-iterator-helpers/Iterator.from';
import filter from 'es-iterator-helpers/Iterator.prototype.filter';
import { getProp, getLiteralPropValue } from './module/jsx-ast-utils.ts';

const abstractRoles = new Set(filter(iterFrom(roles.keys()), (role) => roles.get(role).abstract));

const DOMElements = new Set(dom.keys());

const isAbstractRole = (tagName, attributes) => {
  // Do not test higher level JSX components, as we do not know what
  // low-level DOM element this maps to.
  if (!DOMElements.has(tagName)) {
    return false;
  }

  const role = getLiteralPropValue(getProp(attributes, 'role'));

  return abstractRoles.has(role);
};

export default isAbstractRole;
