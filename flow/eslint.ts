/*
 * @flow
 */
export type ESLintReport = {
  node: any,
  message: string,
};

export type ESLintSettings = {
  [key: string]: any,
  'jsx-a11y'?: {
    polymorphicPropName?: string,
    components?: { [key: string]: string },
  },
}

export type ESLintContext = {
  options: Array<Object>,
  report: (_report: ESLintReport) => void,
  settings: ESLintSettings,
};

export type ESLintConfig = {
  meta?: { [key: string]: any },
  create: (_context: ESLintContext) => any,
}

export type ESLintVisitorSelectorConfig = {
  [key: string]: any,
};
