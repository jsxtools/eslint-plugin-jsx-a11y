/**
 * @flow
 */

import type { Node } from 'estree-jsx';
import { getProp, getLiteralPropValue, getPropValue } from './module/jsx-ast-utils.ts';

const isDisabledElement = (attributes: Array<Node>): boolean => {
  const disabledAttr = getProp(attributes, 'disabled');
  const disabledAttrValue = getPropValue(disabledAttr);
  const isHTML5Disabled = disabledAttr && disabledAttrValue !== undefined;
  if (isHTML5Disabled) {
    return true;
  }
  const ariaDisabledAttr = getProp(attributes, 'aria-disabled');
  const ariaDisabledAttrValue = getLiteralPropValue(ariaDisabledAttr);

  if (
    ariaDisabledAttr
    && ariaDisabledAttrValue !== undefined
    && ariaDisabledAttrValue === true
  ) {
    return true;
  }
  return false;
};

export default isDisabledElement;
