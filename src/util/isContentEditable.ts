import { getProp } from './module/jsx-ast-utils.ts';

export default function isContentEditable(tagName, attributes) {
  const prop = getProp(attributes, 'contentEditable');

  return prop?.value?.raw === '"true"';
}
