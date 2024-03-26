import ruleOfAccessibleEmoji from './rule/accessible-emoji.ts';
import ruleOfAltText from './rule/alt-text.ts';
import ruleOfAnchorAmbiguousText from './rule/anchor-ambiguous-text.ts';
import ruleOfAnchorHasContent from './rule/anchor-has-content.ts';
import ruleOfAnchorIsValid from './rule/anchor-is-valid.ts';
import ruleOfAriaActivedescendantHasTabindex from './rule/aria-activedescendant-has-tabindex.ts';
import ruleOfAriaProps from './rule/aria-props.ts';
import ruleOfAriaProptypes from './rule/aria-proptypes.ts';
import ruleOfAriaRole from './rule/aria-role.ts';
import ruleOfAriaUnsupportedElements from './rule/aria-unsupported-elements.ts';
import ruleOfAutocompleteValid from './rule/autocomplete-valid.ts';
import ruleOfClickEventsHaveKeyEvents from './rule/click-events-have-key-events.ts';
import ruleOfControlHasAssociatedLabel from './rule/control-has-associated-label.ts';
import ruleOfHeadingHasContent from './rule/heading-has-content.ts';
import ruleOfHtmlHasLang from './rule/html-has-lang.ts';
import ruleOfIframeHasTitle from './rule/iframe-has-title.ts';
import ruleOfImgRedundantAlt from './rule/img-redundant-alt.ts';
import ruleOfInteractiveSupportsFocus from './rule/interactive-supports-focus.ts';
import ruleOfLabelHasAssociatedControl from './rule/label-has-associated-control.ts';
import ruleOfLabelHasFor from './rule/label-has-for.ts';
import ruleOfLang from './rule/lang.ts';
import ruleOfMediaHasCaption from './rule/media-has-caption.ts';
import ruleOfMouseEventsHaveKeyEvents from './rule/mouse-events-have-key-events.ts';
import ruleOfNoAccessKey from './rule/no-access-key.ts';
import ruleOfNoAriaHiddenOnFocusable from './rule/no-aria-hidden-on-focusable.ts';
import ruleOfNoAutofocus from './rule/no-autofocus.ts';
import ruleOfNoDistractingElements from './rule/no-distracting-elements.ts';
import ruleOfNoInteractiveElementToNoninteractiveRole from './rule/no-interactive-element-to-noninteractive-role.ts';
import ruleOfNoNoninteractiveElementInteractions from './rule/no-noninteractive-element-interactions.ts';
import ruleOfNoNoninteractiveElementToInteractiveRole from './rule/no-noninteractive-element-to-interactive-role.ts';
import ruleOfNoNoninteractiveTabindex from './rule/no-noninteractive-tabindex.ts';
import ruleOfNoOnchange from './rule/no-onchange.ts';
import ruleOfNoRedundantRoles from './rule/no-redundant-roles.ts';
import ruleOfNoStaticElementInteractions from './rule/no-static-element-interactions.ts';
import ruleOfPreferTagOverRole from './rule/prefer-tag-over-role.ts';
import ruleOfRoleHasRequiredAriaProps from './rule/role-has-required-aria-props.ts';
import ruleOfRoleSupportsAriaProps from './rule/role-supports-aria-props.ts';
import ruleOfScope from './rule/scope.ts';
import ruleOfTabindexNoPositive from './rule/tabindex-no-positive.ts';

export default {
  rules: {
    'accessible-emoji': ruleOfAccessibleEmoji,
    'alt-text': ruleOfAltText,
    'anchor-ambiguous-text': ruleOfAnchorAmbiguousText,
    'anchor-has-content': ruleOfAnchorHasContent,
    'anchor-is-valid': ruleOfAnchorIsValid,
    'aria-activedescendant-has-tabindex': ruleOfAriaActivedescendantHasTabindex,
    'aria-props': ruleOfAriaProps,
    'aria-proptypes': ruleOfAriaProptypes,
    'aria-role': ruleOfAriaRole,
    'aria-unsupported-elements': ruleOfAriaUnsupportedElements,
    'autocomplete-valid': ruleOfAutocompleteValid,
    'click-events-have-key-events': ruleOfClickEventsHaveKeyEvents,
    'control-has-associated-label': ruleOfControlHasAssociatedLabel,
    'heading-has-content': ruleOfHeadingHasContent,
    'html-has-lang': ruleOfHtmlHasLang,
    'iframe-has-title': ruleOfIframeHasTitle,
    'img-redundant-alt': ruleOfImgRedundantAlt,
    'interactive-supports-focus': ruleOfInteractiveSupportsFocus,
    'label-has-associated-control': ruleOfLabelHasAssociatedControl,
    'label-has-for': ruleOfLabelHasFor,
    lang: ruleOfLang,
    'media-has-caption': ruleOfMediaHasCaption,
    'mouse-events-have-key-events': ruleOfMouseEventsHaveKeyEvents,
    'no-access-key': ruleOfNoAccessKey,
    'no-aria-hidden-on-focusable': ruleOfNoAriaHiddenOnFocusable,
    'no-autofocus': ruleOfNoAutofocus,
    'no-distracting-elements': ruleOfNoDistractingElements,
    'no-interactive-element-to-noninteractive-role': ruleOfNoInteractiveElementToNoninteractiveRole,
    'no-noninteractive-element-interactions': ruleOfNoNoninteractiveElementInteractions,
    'no-noninteractive-element-to-interactive-role': ruleOfNoNoninteractiveElementToInteractiveRole,
    'no-noninteractive-tabindex': ruleOfNoNoninteractiveTabindex,
    'no-onchange': ruleOfNoOnchange,
    'no-redundant-roles': ruleOfNoRedundantRoles,
    'no-static-element-interactions': ruleOfNoStaticElementInteractions,
    'prefer-tag-over-role': ruleOfPreferTagOverRole,
    'role-has-required-aria-props': ruleOfRoleHasRequiredAriaProps,
    'role-supports-aria-props': ruleOfRoleSupportsAriaProps,
    scope: ruleOfScope,
    'tabindex-no-positive': ruleOfTabindexNoPositive,
  },
};
