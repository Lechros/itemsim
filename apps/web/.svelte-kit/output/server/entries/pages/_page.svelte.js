import { c as create_ssr_component, a as compute_rest_props, b as spread, d as escape_object, i as add_classes, g as add_attribute, v as validate_component, m as missing_component, e as escape_attribute_value, k as compute_slots, f as escape, j as getContext, l as createEventDispatcher, s as setContext, h as subscribe, n as set_store_value, o as each, t as tick, p as null_to_empty, q as get_store_value } from "../../chunks/index2.js";
import { GearPropType, PotentialGrade, GearType, Gear, gearToPlain, plainToGear, BonusStatType, getBonusStatValue, validateParseGear, stringifyGear, Potential, getSpellTraceScroll } from "@malib/gear";
import { gearJson, createPotentialFromCode } from "@malib/create-gear";
import { w as writable, d as derived } from "../../chunks/index.js";
import { C as Close, i as isSideNavRail, a as isSideNavCollapsed } from "../../chunks/HeaderSearch.svelte_svelte_type_style_lang.js";
import { decompressFromBase64, compressToBase64, compressToEncodedURIComponent } from "lz-string";
const AspectRatio = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["ratio"]);
  let { ratio = "2x1" } = $$props;
  if ($$props.ratio === void 0 && $$bindings.ratio && ratio !== void 0)
    $$bindings.ratio(ratio);
  return `<div${spread([escape_object($$restProps)], {
    classes: "bx--aspect-ratio " + (ratio === "2x1" ? "bx--aspect-ratio--2x1" : "") + " " + (ratio === "2x3" ? "bx--aspect-ratio--2x3" : "") + " " + (ratio === "16x9" ? "bx--aspect-ratio--16x9" : "") + " " + (ratio === "4x3" ? "bx--aspect-ratio--4x3" : "") + " " + (ratio === "1x1" ? "bx--aspect-ratio--1x1" : "") + " " + (ratio === "3x4" ? "bx--aspect-ratio--3x4" : "") + " " + (ratio === "3x2" ? "bx--aspect-ratio--3x2" : "") + " " + (ratio === "9x16" ? "bx--aspect-ratio--9x16" : "") + " " + (ratio === "1x2" ? "bx--aspect-ratio--1x2" : "")
  })}><div${add_classes("bx--aspect-ratio--object".trim())}>${slots.default ? slots.default({}) : ``}</div></div>`;
});
const Link = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["size", "href", "inline", "icon", "disabled", "visited", "ref"]);
  let $$slots = compute_slots(slots);
  let { size = void 0 } = $$props;
  let { href = void 0 } = $$props;
  let { inline = false } = $$props;
  let { icon = void 0 } = $$props;
  let { disabled = false } = $$props;
  let { visited = false } = $$props;
  let { ref = null } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.inline === void 0 && $$bindings.inline && inline !== void 0)
    $$bindings.inline(inline);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.visited === void 0 && $$bindings.visited && visited !== void 0)
    $$bindings.visited(visited);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  return `
${disabled ? `<p${spread([escape_object($$restProps)], {
    classes: "bx--link " + (disabled ? "bx--link--disabled" : "") + " " + (inline ? "bx--link--inline" : "") + " " + (visited ? "bx--link--visited" : "")
  })}${add_attribute("this", ref, 0)}>${slots.default ? slots.default({}) : ``}
    ${!inline && ($$slots.icon || icon) ? `<div${add_classes("bx--link__icon".trim())}>${slots.icon ? slots.icon({}) : `
          ${validate_component(icon || missing_component, "svelte:component").$$render($$result, {}, {}, {})}
        `}</div>` : ``}</p>` : `<a${spread(
    [
      {
        rel: escape_attribute_value($$restProps.target === "_blank" ? "noopener noreferrer" : void 0)
      },
      { href: escape_attribute_value(href) },
      escape_object($$restProps)
    ],
    {
      classes: "bx--link " + (disabled ? "bx--link--disabled" : "") + " " + (inline ? "bx--link--inline" : "") + " " + (visited ? "bx--link--visited" : "") + " " + (size === "sm" ? "bx--link--sm" : "") + " " + (size === "lg" ? "bx--link--lg" : "")
    }
  )}${add_attribute("this", ref, 0)}>${slots.default ? slots.default({}) : ``}
    ${!inline && ($$slots.icon || icon) ? `<div${add_classes("bx--link__icon".trim())}>${slots.icon ? slots.icon({}) : `
          ${validate_component(icon || missing_component, "svelte:component").$$render($$result, {}, {}, {})}
        `}</div>` : ``}</a>`}`;
});
const ButtonSkeleton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["href", "size"]);
  let { href = void 0 } = $$props;
  let { size = "default" } = $$props;
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  return `
${href ? `<a${spread(
    [
      { href: escape_attribute_value(href) },
      {
        rel: escape_attribute_value($$restProps.target === "_blank" ? "noopener noreferrer" : void 0)
      },
      { role: "button" },
      escape_object($$restProps)
    ],
    {
      classes: "bx--skeleton bx--btn " + (size === "field" ? "bx--btn--field" : "") + " " + (size === "small" ? "bx--btn--sm" : "") + " " + (size === "lg" ? "bx--btn--lg" : "") + " " + (size === "xl" ? "bx--btn--xl" : "")
    }
  )}>${escape("")}</a>` : `<div${spread([escape_object($$restProps)], {
    classes: "bx--skeleton bx--btn " + (size === "field" ? "bx--btn--field" : "") + " " + (size === "small" ? "bx--btn--sm" : "") + " " + (size === "lg" ? "bx--btn--lg" : "") + " " + (size === "xl" ? "bx--btn--xl" : "")
  })}></div>`}`;
});
const Button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let hasIconOnly;
  let buttonProps;
  let $$restProps = compute_rest_props($$props, [
    "kind",
    "size",
    "expressive",
    "isSelected",
    "icon",
    "iconDescription",
    "tooltipAlignment",
    "tooltipPosition",
    "as",
    "skeleton",
    "disabled",
    "href",
    "tabindex",
    "type",
    "ref"
  ]);
  let $$slots = compute_slots(slots);
  let { kind = "primary" } = $$props;
  let { size = "default" } = $$props;
  let { expressive = false } = $$props;
  let { isSelected = false } = $$props;
  let { icon = void 0 } = $$props;
  let { iconDescription = void 0 } = $$props;
  let { tooltipAlignment = "center" } = $$props;
  let { tooltipPosition = "bottom" } = $$props;
  let { as = false } = $$props;
  let { skeleton = false } = $$props;
  let { disabled = false } = $$props;
  let { href = void 0 } = $$props;
  let { tabindex = "0" } = $$props;
  let { type = "button" } = $$props;
  let { ref = null } = $$props;
  const ctx = getContext("ComposedModal");
  if ($$props.kind === void 0 && $$bindings.kind && kind !== void 0)
    $$bindings.kind(kind);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.expressive === void 0 && $$bindings.expressive && expressive !== void 0)
    $$bindings.expressive(expressive);
  if ($$props.isSelected === void 0 && $$bindings.isSelected && isSelected !== void 0)
    $$bindings.isSelected(isSelected);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  if ($$props.iconDescription === void 0 && $$bindings.iconDescription && iconDescription !== void 0)
    $$bindings.iconDescription(iconDescription);
  if ($$props.tooltipAlignment === void 0 && $$bindings.tooltipAlignment && tooltipAlignment !== void 0)
    $$bindings.tooltipAlignment(tooltipAlignment);
  if ($$props.tooltipPosition === void 0 && $$bindings.tooltipPosition && tooltipPosition !== void 0)
    $$bindings.tooltipPosition(tooltipPosition);
  if ($$props.as === void 0 && $$bindings.as && as !== void 0)
    $$bindings.as(as);
  if ($$props.skeleton === void 0 && $$bindings.skeleton && skeleton !== void 0)
    $$bindings.skeleton(skeleton);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  {
    if (ctx && ref) {
      ctx.declareRef(ref);
    }
  }
  hasIconOnly = icon && !$$slots.default;
  buttonProps = {
    type: href && !disabled ? void 0 : type,
    tabindex,
    disabled: disabled === true ? true : void 0,
    href,
    "aria-pressed": hasIconOnly && kind === "ghost" && !href ? isSelected : void 0,
    ...$$restProps,
    class: [
      "bx--btn",
      expressive && "bx--btn--expressive",
      (size === "small" && !expressive || size === "sm" && !expressive || size === "small" && !expressive) && "bx--btn--sm",
      size === "field" && !expressive || size === "md" && !expressive && "bx--btn--md",
      size === "field" && "bx--btn--field",
      size === "small" && "bx--btn--sm",
      size === "lg" && "bx--btn--lg",
      size === "xl" && "bx--btn--xl",
      kind && `bx--btn--${kind}`,
      disabled && "bx--btn--disabled",
      hasIconOnly && "bx--btn--icon-only",
      hasIconOnly && "bx--tooltip__trigger",
      hasIconOnly && "bx--tooltip--a11y",
      hasIconOnly && tooltipPosition && `bx--btn--icon-only--${tooltipPosition}`,
      hasIconOnly && tooltipAlignment && `bx--tooltip--align-${tooltipAlignment}`,
      hasIconOnly && isSelected && kind === "ghost" && "bx--btn--selected",
      $$restProps.class
    ].filter(Boolean).join(" ")
  };
  return `
${skeleton ? `${validate_component(ButtonSkeleton, "ButtonSkeleton").$$render($$result, Object.assign({}, { href }, { size }, $$restProps, { style: hasIconOnly && "width: 3rem;" }), {}, {})}` : `${as ? `${slots.default ? slots.default({ props: buttonProps }) : ``}` : `${href && !disabled ? `
  <a${spread([escape_object(buttonProps)], {})}${add_attribute("this", ref, 0)}>${hasIconOnly ? `<span${add_classes("bx--assistive-text".trim())}>${escape(iconDescription)}</span>` : ``}
    ${slots.default ? slots.default({}) : ``}${validate_component(icon || missing_component, "svelte:component").$$render(
    $$result,
    {
      "aria-hidden": "true",
      class: "bx--btn__icon",
      "aria-label": iconDescription
    },
    {},
    {}
  )}</a>` : `<button${spread([escape_object(buttonProps)], {})}${add_attribute("this", ref, 0)}>${hasIconOnly ? `<span${add_classes("bx--assistive-text".trim())}>${escape(iconDescription)}</span>` : ``}
    ${slots.default ? slots.default({}) : ``}${validate_component(icon || missing_component, "svelte:component").$$render(
    $$result,
    {
      "aria-hidden": "true",
      class: "bx--btn__icon",
      style: hasIconOnly ? "margin-left: 0" : void 0,
      "aria-label": iconDescription
    },
    {},
    {}
  )}</button>`}`}`}`;
});
const ContentSwitcher = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let currentIndex;
  let switches;
  let $$restProps = compute_rest_props($$props, ["selectedIndex", "size"]);
  let { selectedIndex = 0 } = $$props;
  let { size = void 0 } = $$props;
  const dispatch = createEventDispatcher();
  const currentId = writable(null);
  setContext("ContentSwitcher", {
    currentId,
    add: ({ id, text, selected: selected2 }) => {
      if (selected2) {
        selectedIndex = switches.length;
      }
      switches = [...switches, { id, text, selected: selected2 }];
    },
    update: (id) => {
      selectedIndex = switches.map(({ id: id2 }) => id2).indexOf(id);
    },
    change: (direction) => {
      let index = currentIndex + direction;
      if (index < 0) {
        index = switches.length - 1;
      } else if (index >= switches.length) {
        index = 0;
      }
      selectedIndex = index;
    }
  });
  if ($$props.selectedIndex === void 0 && $$bindings.selectedIndex && selectedIndex !== void 0)
    $$bindings.selectedIndex(selectedIndex);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  currentIndex = -1;
  switches = [];
  {
    if (switches[currentIndex]) {
      dispatch("change", currentIndex);
      currentId.set(switches[currentIndex].id);
    }
  }
  return `
<div${spread([{ role: "tablist" }, escape_object($$restProps)], {
    classes: "bx--content-switcher " + (size === "sm" ? "bx--content-switcher--sm" : "") + " " + (size === "xl" ? "bx--content-switcher--xl" : "")
  })}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Switch = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["text", "selected", "disabled", "id", "ref"]);
  let { text = "Provide text" } = $$props;
  let { selected: selected2 = false } = $$props;
  let { disabled = false } = $$props;
  let { id = "ccs-" + Math.random().toString(36) } = $$props;
  let { ref = null } = $$props;
  const ctx = getContext("ContentSwitcher");
  ctx.add({ id, text, selected: selected2 });
  ctx.currentId.subscribe(($) => {
    selected2 = $ === id;
  });
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  if ($$props.selected === void 0 && $$bindings.selected && selected2 !== void 0)
    $$bindings.selected(selected2);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  return `
<button${spread(
    [
      { type: "button" },
      { role: "tab" },
      {
        tabindex: escape_attribute_value(selected2 ? "0" : "-1")
      },
      {
        "aria-selected": escape_attribute_value(selected2)
      },
      { disabled: disabled || null },
      { id: escape_attribute_value(id) },
      escape_object($$restProps)
    ],
    {
      classes: "bx--content-switcher-btn " + (selected2 ? "bx--content-switcher--selected" : "")
    }
  )}${add_attribute("this", ref, 0)}><span${add_classes("bx--content-switcher__label".trim())}>${slots.default ? slots.default({}) : `${escape(text)}`}</span></button>`;
});
const WarningFilled = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let labelled;
  let attributes;
  let $$restProps = compute_rest_props($$props, ["size", "title"]);
  let { size = 16 } = $$props;
  let { title = void 0 } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title;
  attributes = {
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: Number($$props["tabindex"]) === 0 ? true : void 0
  };
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { viewBox: "0 0 32 32" },
      { fill: "currentColor" },
      { preserveAspectRatio: "xMidYMid meet" },
      { width: escape_attribute_value(size) },
      { height: escape_attribute_value(size) },
      escape_object(attributes),
      escape_object($$restProps)
    ],
    {}
  )}>${title ? `<title>${escape(title)}</title>` : ``}<path d="M16,2C8.3,2,2,8.3,2,16s6.3,14,14,14s14-6.3,14-14C30,8.3,23.7,2,16,2z M14.9,8h2.2v11h-2.2V8z M16,25	c-0.8,0-1.5-0.7-1.5-1.5S15.2,22,16,22c0.8,0,1.5,0.7,1.5,1.5S16.8,25,16,25z"></path><path fill="none" d="M17.5,23.5c0,0.8-0.7,1.5-1.5,1.5c-0.8,0-1.5-0.7-1.5-1.5S15.2,22,16,22	C16.8,22,17.5,22.7,17.5,23.5z M17.1,8h-2.2v11h2.2V8z" data-icon-path="inner-path" opacity="0"></path></svg>`;
});
const WarningAltFilled = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let labelled;
  let attributes;
  let $$restProps = compute_rest_props($$props, ["size", "title"]);
  let { size = 16 } = $$props;
  let { title = void 0 } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title;
  attributes = {
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: Number($$props["tabindex"]) === 0 ? true : void 0
  };
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { viewBox: "0 0 32 32" },
      { fill: "currentColor" },
      { preserveAspectRatio: "xMidYMid meet" },
      { width: escape_attribute_value(size) },
      { height: escape_attribute_value(size) },
      escape_object(attributes),
      escape_object($$restProps)
    ],
    {}
  )}>${title ? `<title>${escape(title)}</title>` : ``}<path fill="none" d="M16,26a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,16,26Zm-1.125-5h2.25V12h-2.25Z" data-icon-path="inner-path"></path><path d="M16.002,6.1714h-.004L4.6487,27.9966,4.6506,28H27.3494l.0019-.0034ZM14.875,12h2.25v9h-2.25ZM16,26a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,16,26Z"></path><path d="M29,30H3a1,1,0,0,1-.8872-1.4614l13-25a1,1,0,0,1,1.7744,0l13,25A1,1,0,0,1,29,30ZM4.6507,28H27.3493l.002-.0033L16.002,6.1714h-.004L4.6487,27.9967Z"></path></svg>`;
});
const ListBox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "size",
    "type",
    "open",
    "light",
    "disabled",
    "invalid",
    "invalidText",
    "warn",
    "warnText"
  ]);
  let { size = void 0 } = $$props;
  let { type = "default" } = $$props;
  let { open = false } = $$props;
  let { light = false } = $$props;
  let { disabled = false } = $$props;
  let { invalid = false } = $$props;
  let { invalidText = "" } = $$props;
  let { warn = false } = $$props;
  let { warnText = "" } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.light === void 0 && $$bindings.light && light !== void 0)
    $$bindings.light(light);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.invalid === void 0 && $$bindings.invalid && invalid !== void 0)
    $$bindings.invalid(invalid);
  if ($$props.invalidText === void 0 && $$bindings.invalidText && invalidText !== void 0)
    $$bindings.invalidText(invalidText);
  if ($$props.warn === void 0 && $$bindings.warn && warn !== void 0)
    $$bindings.warn(warn);
  if ($$props.warnText === void 0 && $$bindings.warnText && warnText !== void 0)
    $$bindings.warnText(warnText);
  return `<div${spread(
    [
      { role: "listbox" },
      { tabindex: "-1" },
      {
        "data-invalid": escape_attribute_value(invalid || void 0)
      },
      escape_object($$restProps)
    ],
    {
      classes: "bx--list-box " + (size === "sm" ? "bx--list-box--sm" : "") + " " + (size === "xl" ? "bx--list-box--xl" : "") + " " + (type === "inline" ? "bx--list-box--inline" : "") + " " + (disabled ? "bx--list-box--disabled" : "") + " " + (open ? "bx--list-box--expanded" : "") + " " + (light ? "bx--list-box--light" : "") + " " + (!invalid && warn ? "bx--list-box--warning" : "")
    }
  )}>${slots.default ? slots.default({}) : ``}</div>
${invalid ? `<div${add_classes("bx--form-requirement".trim())}>${escape(invalidText)}</div>` : ``}
${!invalid && warn ? `<div${add_classes("bx--form-requirement".trim())}>${escape(warnText)}</div>` : ``}`;
});
const ListBoxMenu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["id", "ref"]);
  let { id = "ccs-" + Math.random().toString(36) } = $$props;
  let { ref = null } = $$props;
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  return `<div${spread(
    [
      { role: "listbox" },
      { id: "menu-" + escape(id, true) },
      escape_object($$restProps)
    ],
    {
      classes: "bx--list-box__menu"
    }
  )}${add_attribute("this", ref, 0)}>${slots.default ? slots.default({}) : ``}</div>`;
});
const ChevronDown = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let labelled;
  let attributes;
  let $$restProps = compute_rest_props($$props, ["size", "title"]);
  let { size = 16 } = $$props;
  let { title = void 0 } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title;
  attributes = {
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: Number($$props["tabindex"]) === 0 ? true : void 0
  };
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { viewBox: "0 0 32 32" },
      { fill: "currentColor" },
      { preserveAspectRatio: "xMidYMid meet" },
      { width: escape_attribute_value(size) },
      { height: escape_attribute_value(size) },
      escape_object(attributes),
      escape_object($$restProps)
    ],
    {}
  )}>${title ? `<title>${escape(title)}</title>` : ``}<path d="M16 22L6 12 7.4 10.6 16 19.2 24.6 10.6 26 12z"></path></svg>`;
});
const ListBoxMenuIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let translationId;
  let description;
  let $$restProps = compute_rest_props($$props, ["open", "translationIds", "translateWithId"]);
  let { open = false } = $$props;
  const translationIds = { close: "close", open: "open" };
  let { translateWithId = (id) => defaultTranslations[id] } = $$props;
  const defaultTranslations = {
    [translationIds.close]: "Close menu",
    [translationIds.open]: "Open menu"
  };
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.translationIds === void 0 && $$bindings.translationIds && translationIds !== void 0)
    $$bindings.translationIds(translationIds);
  if ($$props.translateWithId === void 0 && $$bindings.translateWithId && translateWithId !== void 0)
    $$bindings.translateWithId(translateWithId);
  translationId = open ? translationIds.close : translationIds.open;
  description = translateWithId?.(translationId) ?? defaultTranslations[translationId];
  return `<div${spread([escape_object($$restProps)], {
    classes: "bx--list-box__menu-icon " + (open ? "bx--list-box__menu-icon--open" : "")
  })}>${validate_component(ChevronDown, "ChevronDown").$$render(
    $$result,
    {
      "aria-label": description,
      title: description
    },
    {},
    {}
  )}</div>`;
});
const ListBoxMenuItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isTruncated;
  let title;
  let $$restProps = compute_rest_props($$props, ["active", "highlighted", "disabled"]);
  let { active = false } = $$props;
  let { highlighted = false } = $$props;
  let { disabled = false } = $$props;
  let ref = null;
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  if ($$props.highlighted === void 0 && $$bindings.highlighted && highlighted !== void 0)
    $$bindings.highlighted(highlighted);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  isTruncated = ref?.offsetWidth < ref?.scrollWidth;
  title = isTruncated ? ref?.innerText : void 0;
  {
    if (highlighted && ref && !ref.matches(":hover")) {
      ref.scrollIntoView({ block: "nearest" });
    }
  }
  return `<div${spread(
    [
      { role: "option" },
      {
        "aria-selected": escape_attribute_value(active)
      },
      {
        disabled: (disabled ? true : void 0) || null
      },
      escape_object($$restProps)
    ],
    {
      classes: "bx--list-box__menu-item " + (active ? "bx--list-box__menu-item--active" : "") + " " + (highlighted || active ? "bx--list-box__menu-item--highlighted" : "")
    }
  )}><div${add_attribute("title", title, 0)}${add_classes("bx--list-box__menu-item__option".trim())}${add_attribute("this", ref, 0)}>${slots.default ? slots.default({}) : ``}</div></div>`;
});
const ComposedModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "size",
    "open",
    "danger",
    "preventCloseOnClickOutside",
    "containerClass",
    "selectorPrimaryFocus",
    "ref"
  ]);
  let $openStore, $$unsubscribe_openStore;
  let $label, $$unsubscribe_label;
  let { size = void 0 } = $$props;
  let { open = false } = $$props;
  let { danger = false } = $$props;
  let { preventCloseOnClickOutside = false } = $$props;
  let { containerClass = "" } = $$props;
  let { selectorPrimaryFocus = "[data-modal-primary-focus]" } = $$props;
  let { ref = null } = $$props;
  const dispatch = createEventDispatcher();
  const label = writable(void 0);
  $$unsubscribe_label = subscribe(label, (value) => $label = value);
  let innerModal = null;
  setContext("ComposedModal", {
    closeModal: () => {
      open = false;
    },
    submit: () => {
      dispatch("submit");
      dispatch("click:button--primary");
    },
    declareRef: (ref2) => {
    },
    updateLabel: (value) => {
      label.set(value);
    }
  });
  const openStore = writable(open);
  $$unsubscribe_openStore = subscribe(openStore, (value) => $openStore = value);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.danger === void 0 && $$bindings.danger && danger !== void 0)
    $$bindings.danger(danger);
  if ($$props.preventCloseOnClickOutside === void 0 && $$bindings.preventCloseOnClickOutside && preventCloseOnClickOutside !== void 0)
    $$bindings.preventCloseOnClickOutside(preventCloseOnClickOutside);
  if ($$props.containerClass === void 0 && $$bindings.containerClass && containerClass !== void 0)
    $$bindings.containerClass(containerClass);
  if ($$props.selectorPrimaryFocus === void 0 && $$bindings.selectorPrimaryFocus && selectorPrimaryFocus !== void 0)
    $$bindings.selectorPrimaryFocus(selectorPrimaryFocus);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  set_store_value(openStore, $openStore = open, $openStore);
  $$unsubscribe_openStore();
  $$unsubscribe_label();
  return `
<div${spread([{ role: "presentation" }, escape_object($$restProps)], {
    classes: "bx--modal " + (open ? "is-visible" : "") + " " + (danger ? "bx--modal--danger" : "")
  })}${add_attribute("this", ref, 0)}>
  <div role="dialog" aria-modal="true"${add_attribute("aria-label", $$props["aria-label"] || $label || void 0, 0)} class="${[
    escape(containerClass, true),
    "bx--modal-container " + (size === "xs" ? "bx--modal-container--xs" : "") + " " + (size === "sm" ? "bx--modal-container--sm" : "") + " " + (size === "lg" ? "bx--modal-container--lg" : "")
  ].join(" ").trim()}"${add_attribute("this", innerModal, 0)}>${slots.default ? slots.default({}) : ``}</div></div>`;
});
const ModalHeader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "title",
    "label",
    "labelClass",
    "titleClass",
    "closeClass",
    "closeIconClass",
    "iconDescription"
  ]);
  let { title = "" } = $$props;
  let { label = "" } = $$props;
  let { labelClass = "" } = $$props;
  let { titleClass = "" } = $$props;
  let { closeClass = "" } = $$props;
  let { closeIconClass = "" } = $$props;
  let { iconDescription = "Close" } = $$props;
  const { closeModal, updateLabel } = getContext("ComposedModal");
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.labelClass === void 0 && $$bindings.labelClass && labelClass !== void 0)
    $$bindings.labelClass(labelClass);
  if ($$props.titleClass === void 0 && $$bindings.titleClass && titleClass !== void 0)
    $$bindings.titleClass(titleClass);
  if ($$props.closeClass === void 0 && $$bindings.closeClass && closeClass !== void 0)
    $$bindings.closeClass(closeClass);
  if ($$props.closeIconClass === void 0 && $$bindings.closeIconClass && closeIconClass !== void 0)
    $$bindings.closeIconClass(closeIconClass);
  if ($$props.iconDescription === void 0 && $$bindings.iconDescription && iconDescription !== void 0)
    $$bindings.iconDescription(iconDescription);
  {
    updateLabel(label);
  }
  return `<div${spread([escape_object($$restProps)], { classes: "bx--modal-header" })}>${label ? `<h2 class="${[
    escape(labelClass, true),
    "bx--modal-header__label bx--type-delta"
  ].join(" ").trim()}">${escape(label)}</h2>` : ``}
  ${title ? `<h3 class="${[
    escape(titleClass, true),
    "bx--modal-header__heading bx--type-beta"
  ].join(" ").trim()}">${escape(title)}</h3>` : ``}
  ${slots.default ? slots.default({}) : ``}
  <button type="button"${add_attribute("aria-label", iconDescription, 0)} class="${[escape(closeClass, true), "bx--modal-close"].join(" ").trim()}">${validate_component(Close, "Close").$$render(
    $$result,
    {
      size: 20,
      class: "bx--modal-close__icon " + closeIconClass,
      "aria-hidden": "true"
    },
    {},
    {}
  )}</button></div>`;
});
const ModalBody = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["hasForm", "hasScrollingContent"]);
  let { hasForm = false } = $$props;
  let { hasScrollingContent = false } = $$props;
  if ($$props.hasForm === void 0 && $$bindings.hasForm && hasForm !== void 0)
    $$bindings.hasForm(hasForm);
  if ($$props.hasScrollingContent === void 0 && $$bindings.hasScrollingContent && hasScrollingContent !== void 0)
    $$bindings.hasScrollingContent(hasScrollingContent);
  return `
<div${spread(
    [
      {
        tabindex: escape_attribute_value(hasScrollingContent ? "0" : void 0)
      },
      {
        role: escape_attribute_value(hasScrollingContent ? "region" : void 0)
      },
      escape_object($$restProps)
    ],
    {
      classes: "bx--modal-content " + (hasForm ? "bx--modal-content--with-form" : "") + " " + (hasScrollingContent ? "bx--modal-scroll-content" : "")
    }
  )}>${slots.default ? slots.default({}) : ``}</div>
${hasScrollingContent ? `<div${add_classes("bx--modal-content--overflow-indicator".trim())}></div>` : ``}`;
});
const ModalFooter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "primaryButtonText",
    "primaryButtonIcon",
    "primaryButtonDisabled",
    "primaryClass",
    "secondaryButtonText",
    "secondaryButtons",
    "secondaryClass",
    "danger"
  ]);
  let { primaryButtonText = "" } = $$props;
  let { primaryButtonIcon = void 0 } = $$props;
  let { primaryButtonDisabled = false } = $$props;
  let { primaryClass = void 0 } = $$props;
  let { secondaryButtonText = "" } = $$props;
  let { secondaryButtons = [] } = $$props;
  let { secondaryClass = void 0 } = $$props;
  let { danger = false } = $$props;
  createEventDispatcher();
  getContext("ComposedModal");
  if ($$props.primaryButtonText === void 0 && $$bindings.primaryButtonText && primaryButtonText !== void 0)
    $$bindings.primaryButtonText(primaryButtonText);
  if ($$props.primaryButtonIcon === void 0 && $$bindings.primaryButtonIcon && primaryButtonIcon !== void 0)
    $$bindings.primaryButtonIcon(primaryButtonIcon);
  if ($$props.primaryButtonDisabled === void 0 && $$bindings.primaryButtonDisabled && primaryButtonDisabled !== void 0)
    $$bindings.primaryButtonDisabled(primaryButtonDisabled);
  if ($$props.primaryClass === void 0 && $$bindings.primaryClass && primaryClass !== void 0)
    $$bindings.primaryClass(primaryClass);
  if ($$props.secondaryButtonText === void 0 && $$bindings.secondaryButtonText && secondaryButtonText !== void 0)
    $$bindings.secondaryButtonText(secondaryButtonText);
  if ($$props.secondaryButtons === void 0 && $$bindings.secondaryButtons && secondaryButtons !== void 0)
    $$bindings.secondaryButtons(secondaryButtons);
  if ($$props.secondaryClass === void 0 && $$bindings.secondaryClass && secondaryClass !== void 0)
    $$bindings.secondaryClass(secondaryClass);
  if ($$props.danger === void 0 && $$bindings.danger && danger !== void 0)
    $$bindings.danger(danger);
  return `<div${spread([escape_object($$restProps)], {
    classes: "bx--modal-footer " + (secondaryButtons.length === 2 ? "bx--modal-footer--three-button" : "")
  })}>${secondaryButtons.length > 0 ? `${each(secondaryButtons, (button) => {
    return `${validate_component(Button, "Button").$$render($$result, { kind: "secondary" }, {}, {
      default: () => {
        return `${escape(button.text)}
      `;
      }
    })}`;
  })}` : `${secondaryButtonText ? `${validate_component(Button, "Button").$$render($$result, { kind: "secondary", class: secondaryClass }, {}, {
    default: () => {
      return `${escape(secondaryButtonText)}`;
    }
  })}` : ``}`}
  ${primaryButtonText ? `${validate_component(Button, "Button").$$render(
    $$result,
    {
      kind: danger ? "danger" : "primary",
      disabled: primaryButtonDisabled,
      class: primaryClass,
      icon: primaryButtonIcon
    },
    {},
    {
      default: () => {
        return `${escape(primaryButtonText)}`;
      }
    }
  )}` : ``}
  ${slots.default ? slots.default({}) : ``}</div>`;
});
const IconSearch = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let labelled;
  let attributes;
  let $$restProps = compute_rest_props($$props, ["size", "title"]);
  let { size = 16 } = $$props;
  let { title = void 0 } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title;
  attributes = {
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: Number($$props["tabindex"]) === 0 ? true : void 0
  };
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { viewBox: "0 0 32 32" },
      { fill: "currentColor" },
      { preserveAspectRatio: "xMidYMid meet" },
      { width: escape_attribute_value(size) },
      { height: escape_attribute_value(size) },
      escape_object(attributes),
      escape_object($$restProps)
    ],
    {}
  )}>${title ? `<title>${escape(title)}</title>` : ``}<path d="M29,27.5859l-7.5521-7.5521a11.0177,11.0177,0,1,0-1.4141,1.4141L27.5859,29ZM4,13a9,9,0,1,1,9,9A9.01,9.01,0,0,1,4,13Z"></path></svg>`;
});
const SearchSkeleton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["size"]);
  let { size = "xl" } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  return `
<div${spread([escape_object($$restProps)], {
    classes: "bx--skeleton " + (size === "sm" ? "bx--search--sm" : "") + " " + (size === "lg" ? "bx--search--lg" : "") + " " + (size === "xl" ? "bx--search--xl" : "")
  })}><span${add_classes("bx--label".trim())}></span>
  <div${add_classes("bx--search-input".trim())}></div></div>`;
});
const Search = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "value",
    "size",
    "searchClass",
    "skeleton",
    "light",
    "disabled",
    "expandable",
    "expanded",
    "placeholder",
    "autocomplete",
    "autofocus",
    "closeButtonLabelText",
    "labelText",
    "icon",
    "id",
    "ref"
  ]);
  let { value = "" } = $$props;
  let { size = "xl" } = $$props;
  let { searchClass = "" } = $$props;
  let { skeleton = false } = $$props;
  let { light = false } = $$props;
  let { disabled = false } = $$props;
  let { expandable = false } = $$props;
  let { expanded = false } = $$props;
  let { placeholder = "Search..." } = $$props;
  let { autocomplete = "off" } = $$props;
  let { autofocus = false } = $$props;
  let { closeButtonLabelText = "Clear search input" } = $$props;
  let { labelText = "" } = $$props;
  let { icon = IconSearch } = $$props;
  let { id = "ccs-" + Math.random().toString(36) } = $$props;
  let { ref = null } = $$props;
  const dispatch = createEventDispatcher();
  let searchRef = null;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.searchClass === void 0 && $$bindings.searchClass && searchClass !== void 0)
    $$bindings.searchClass(searchClass);
  if ($$props.skeleton === void 0 && $$bindings.skeleton && skeleton !== void 0)
    $$bindings.skeleton(skeleton);
  if ($$props.light === void 0 && $$bindings.light && light !== void 0)
    $$bindings.light(light);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.expandable === void 0 && $$bindings.expandable && expandable !== void 0)
    $$bindings.expandable(expandable);
  if ($$props.expanded === void 0 && $$bindings.expanded && expanded !== void 0)
    $$bindings.expanded(expanded);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  if ($$props.autocomplete === void 0 && $$bindings.autocomplete && autocomplete !== void 0)
    $$bindings.autocomplete(autocomplete);
  if ($$props.autofocus === void 0 && $$bindings.autofocus && autofocus !== void 0)
    $$bindings.autofocus(autofocus);
  if ($$props.closeButtonLabelText === void 0 && $$bindings.closeButtonLabelText && closeButtonLabelText !== void 0)
    $$bindings.closeButtonLabelText(closeButtonLabelText);
  if ($$props.labelText === void 0 && $$bindings.labelText && labelText !== void 0)
    $$bindings.labelText(labelText);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  {
    if (expanded && ref)
      ref.focus();
  }
  {
    dispatch(expanded ? "expand" : "collapse");
  }
  return `${skeleton ? `${validate_component(SearchSkeleton, "SearchSkeleton").$$render($$result, Object.assign({}, { size }, $$restProps), {}, {})}` : `<div role="search" aria-labelledby="${escape(id, true) + "-search"}" class="${[
    escape(searchClass, true),
    "bx--search " + (light ? "bx--search--light" : "") + " " + (disabled ? "bx--search--disabled" : "") + " " + (size === "sm" ? "bx--search--sm" : "") + " " + (size === "lg" ? "bx--search--lg" : "") + " " + (size === "xl" ? "bx--search--xl" : "") + " " + (expandable ? "bx--search--expandable" : "") + " " + (expanded ? "bx--search--expanded" : "")
  ].join(" ").trim()}">
    <div${add_classes("bx--search-magnifier".trim())}${add_attribute("this", searchRef, 0)}>${validate_component(icon || missing_component, "svelte:component").$$render($$result, { class: "bx--search-magnifier-icon" }, {}, {})}</div>
    <label id="${escape(id, true) + "-search"}"${add_attribute("for", id, 0)}${add_classes("bx--label".trim())}>${slots.labelText ? slots.labelText({}) : `
        ${escape(labelText)}
      `}</label>
    
    <input${spread(
    [
      { type: "text" },
      { role: "searchbox" },
      {
        autofocus: (autofocus === true ? true : void 0) || null
      },
      {
        autocomplete: escape_attribute_value(autocomplete)
      },
      { disabled: disabled || null },
      { id: escape_attribute_value(id) },
      {
        placeholder: escape_attribute_value(placeholder)
      },
      escape_object($$restProps)
    ],
    { classes: "bx--search-input" }
  )}${add_attribute("this", ref, 0)}${add_attribute("value", value, 0)}>
    <button type="button"${add_attribute("aria-label", closeButtonLabelText, 0)} ${disabled ? "disabled" : ""}${add_classes(("bx--search-close " + (value === "" ? "bx--search-close--hidden" : "")).trim())}>${validate_component(Close || missing_component, "svelte:component").$$render($$result, { size: size === "xl" ? 20 : 16 }, {}, {})}</button></div>`}`;
});
const Dropdown = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let inline;
  let selectedItem;
  let $$restProps = compute_rest_props($$props, [
    "items",
    "itemToString",
    "selectedId",
    "type",
    "direction",
    "size",
    "open",
    "light",
    "disabled",
    "titleText",
    "invalid",
    "invalidText",
    "warn",
    "warnText",
    "helperText",
    "label",
    "hideLabel",
    "translateWithId",
    "id",
    "name",
    "ref"
  ]);
  let { items = [] } = $$props;
  let { itemToString = (item) => item.text || item.id } = $$props;
  let { selectedId } = $$props;
  let { type = "default" } = $$props;
  let { direction = "bottom" } = $$props;
  let { size = void 0 } = $$props;
  let { open = false } = $$props;
  let { light = false } = $$props;
  let { disabled = false } = $$props;
  let { titleText = "" } = $$props;
  let { invalid = false } = $$props;
  let { invalidText = "" } = $$props;
  let { warn = false } = $$props;
  let { warnText = "" } = $$props;
  let { helperText = "" } = $$props;
  let { label = void 0 } = $$props;
  let { hideLabel = false } = $$props;
  let { translateWithId = void 0 } = $$props;
  let { id = "ccs-" + Math.random().toString(36) } = $$props;
  let { name = void 0 } = $$props;
  let { ref = null } = $$props;
  createEventDispatcher();
  let highlightedIndex = -1;
  if ($$props.items === void 0 && $$bindings.items && items !== void 0)
    $$bindings.items(items);
  if ($$props.itemToString === void 0 && $$bindings.itemToString && itemToString !== void 0)
    $$bindings.itemToString(itemToString);
  if ($$props.selectedId === void 0 && $$bindings.selectedId && selectedId !== void 0)
    $$bindings.selectedId(selectedId);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.direction === void 0 && $$bindings.direction && direction !== void 0)
    $$bindings.direction(direction);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.light === void 0 && $$bindings.light && light !== void 0)
    $$bindings.light(light);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.titleText === void 0 && $$bindings.titleText && titleText !== void 0)
    $$bindings.titleText(titleText);
  if ($$props.invalid === void 0 && $$bindings.invalid && invalid !== void 0)
    $$bindings.invalid(invalid);
  if ($$props.invalidText === void 0 && $$bindings.invalidText && invalidText !== void 0)
    $$bindings.invalidText(invalidText);
  if ($$props.warn === void 0 && $$bindings.warn && warn !== void 0)
    $$bindings.warn(warn);
  if ($$props.warnText === void 0 && $$bindings.warnText && warnText !== void 0)
    $$bindings.warnText(warnText);
  if ($$props.helperText === void 0 && $$bindings.helperText && helperText !== void 0)
    $$bindings.helperText(helperText);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.hideLabel === void 0 && $$bindings.hideLabel && hideLabel !== void 0)
    $$bindings.hideLabel(hideLabel);
  if ($$props.translateWithId === void 0 && $$bindings.translateWithId && translateWithId !== void 0)
    $$bindings.translateWithId(translateWithId);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  inline = type === "inline";
  selectedItem = items.find((item) => item.id === selectedId);
  {
    if (!open) {
      highlightedIndex = -1;
    }
  }
  return `

<div${spread([escape_object($$restProps)], {
    classes: "bx--dropdown__wrapper bx--list-box__wrapper " + (inline ? "bx--dropdown__wrapper--inline" : "") + " " + (inline ? "bx--list-box__wrapper--inline" : "") + " " + (inline && invalid ? "bx--dropdown__wrapper--inline--invalid" : "")
  })}>${titleText ? `<label${add_attribute("for", id, 0)}${add_classes(("bx--label " + (disabled ? "bx--label--disabled" : "") + " " + (hideLabel ? "bx--visually-hidden" : "")).trim())}>${escape(titleText)}</label>` : ``}
  ${validate_component(ListBox, "ListBox").$$render(
    $$result,
    {
      role: void 0,
      type,
      size,
      name,
      "aria-label": $$props["aria-label"],
      class: "bx--dropdown \n      " + (direction === "top" && "bx--list-box--up") + " \n      " + (invalid && "bx--dropdown--invalid") + " \n      " + (!invalid && warn && "bx--dropdown--warning") + " \n      " + (open && "bx--dropdown--open") + "\n      " + (size === "sm" && "bx--dropdown--sm") + "\n      " + (size === "xl" && "bx--dropdown--xl") + "\n      " + (inline && "bx--dropdown--inline") + "\n      " + (disabled && "bx--dropdown--disabled") + "\n      " + (light && "bx--dropdown--light"),
      disabled,
      open,
      invalid,
      invalidText,
      light,
      warn,
      warnText
    },
    {},
    {
      default: () => {
        return `${invalid ? `${validate_component(WarningFilled, "WarningFilled").$$render($$result, { class: "bx--list-box__invalid-icon" }, {}, {})}` : ``}
    ${!invalid && warn ? `${validate_component(WarningAltFilled, "WarningAltFilled").$$render(
          $$result,
          {
            class: "bx--list-box__invalid-icon bx--list-box__invalid-icon--warning"
          },
          {},
          {}
        )}` : ``}
    <button type="button" tabindex="0"${add_attribute("aria-expanded", open, 0)} ${disabled ? "disabled" : ""}${add_attribute("translatewithid", translateWithId, 0)}${add_attribute("id", id, 0)}${add_classes("bx--list-box__field".trim())}${add_attribute("this", ref, 0)}><span${add_classes("bx--list-box__label".trim())}>${selectedItem ? `${escape(itemToString(selectedItem))}` : `${escape(label)}`}</span>
      ${validate_component(ListBoxMenuIcon, "ListBoxMenuIcon").$$render($$result, { translateWithId, open }, {}, {})}</button>
    ${open ? `${validate_component(ListBoxMenu, "ListBoxMenu").$$render($$result, { "aria-labelledby": id, id }, {}, {
          default: () => {
            return `${each(items, (item, i) => {
              return `${validate_component(ListBoxMenuItem, "ListBoxMenuItem").$$render(
                $$result,
                {
                  id: item.id,
                  active: selectedId === item.id,
                  highlighted: highlightedIndex === i,
                  disabled: item.disabled
                },
                {},
                {
                  default: () => {
                    return `${slots.default ? slots.default({ item, index: i }) : `
              ${escape(itemToString(item))}
            `}
          `;
                  }
                }
              )}`;
            })}`;
          }
        })}` : ``}`;
      }
    }
  )}
  ${!inline && !invalid && !warn && helperText ? `<div${add_classes(("bx--form__helper-text " + (disabled ? "bx--form__helper-text--disabled" : "")).trim())}>${escape(helperText)}</div>` : ``}</div>`;
});
const CheckmarkFilled = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let labelled;
  let attributes;
  let $$restProps = compute_rest_props($$props, ["size", "title"]);
  let { size = 16 } = $$props;
  let { title = void 0 } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title;
  attributes = {
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: Number($$props["tabindex"]) === 0 ? true : void 0
  };
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { viewBox: "0 0 32 32" },
      { fill: "currentColor" },
      { preserveAspectRatio: "xMidYMid meet" },
      { width: escape_attribute_value(size) },
      { height: escape_attribute_value(size) },
      escape_object(attributes),
      escape_object($$restProps)
    ],
    {}
  )}>${title ? `<title>${escape(title)}</title>` : ``}<path d="M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2ZM14,21.5908l-5-5L10.5906,15,14,18.4092,21.41,11l1.5957,1.5859Z"></path><path fill="none" d="M14 21.591L9 16.591 10.591 15 14 18.409 21.41 11 23.005 12.585 14 21.591z" data-icon-path="inner-path"></path></svg>`;
});
const Loading = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let spinnerRadius;
  let $$restProps = compute_rest_props($$props, ["small", "active", "withOverlay", "description", "id"]);
  let { small = false } = $$props;
  let { active = true } = $$props;
  let { withOverlay = true } = $$props;
  let { description = "Active loading indicator" } = $$props;
  let { id = "ccs-" + Math.random().toString(36) } = $$props;
  if ($$props.small === void 0 && $$bindings.small && small !== void 0)
    $$bindings.small(small);
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  if ($$props.withOverlay === void 0 && $$bindings.withOverlay && withOverlay !== void 0)
    $$bindings.withOverlay(withOverlay);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0)
    $$bindings.description(description);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  spinnerRadius = small ? "42" : "44";
  return `${withOverlay ? `<div${spread([escape_object($$restProps)], {
    classes: "bx--loading-overlay " + (!active ? "bx--loading-overlay--stop" : "")
  })}><div aria-atomic="true"${add_attribute("aria-labelledby", id, 0)}${add_attribute("aria-live", active ? "assertive" : "off", 0)}${add_classes(("bx--loading " + (small ? "bx--loading--small" : "") + " " + (!active ? "bx--loading--stop" : "")).trim())}>
      <label${add_attribute("id", id, 0)}${add_classes("bx--visually-hidden".trim())}>${escape(description)}</label>
      <svg viewBox="0 0 100 100"${add_classes("bx--loading__svg".trim())}><title>${escape(description)}</title>${small ? `<circle cx="50%" cy="50%"${add_attribute("r", spinnerRadius, 0)}${add_classes("bx--loading__background".trim())}></circle>` : ``}<circle cx="50%" cy="50%"${add_attribute("r", spinnerRadius, 0)}${add_classes("bx--loading__stroke".trim())}></circle></svg></div></div>` : `<div${spread(
    [
      { "aria-atomic": "true" },
      {
        "aria-labelledby": escape_attribute_value(id)
      },
      {
        "aria-live": escape_attribute_value(active ? "assertive" : "off")
      },
      escape_object($$restProps)
    ],
    {
      classes: "bx--loading " + (small ? "bx--loading--small" : "") + " " + (!active ? "bx--loading--stop" : "")
    }
  )}>
    <label${add_attribute("id", id, 0)}${add_classes("bx--visually-hidden".trim())}>${escape(description)}</label>
    <svg viewBox="0 0 100 100"${add_classes("bx--loading__svg".trim())}><title>${escape(description)}</title>${small ? `<circle cx="50%" cy="50%"${add_attribute("r", spinnerRadius, 0)}${add_classes("bx--loading__background".trim())}></circle>` : ``}<circle cx="50%" cy="50%"${add_attribute("r", spinnerRadius, 0)}${add_classes("bx--loading__stroke".trim())}></circle></svg></div>`}`;
});
const Filename = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["status", "iconDescription", "invalid"]);
  let { status = "uploading" } = $$props;
  let { iconDescription = "" } = $$props;
  let { invalid = false } = $$props;
  if ($$props.status === void 0 && $$bindings.status && status !== void 0)
    $$bindings.status(status);
  if ($$props.iconDescription === void 0 && $$bindings.iconDescription && iconDescription !== void 0)
    $$bindings.iconDescription(iconDescription);
  if ($$props.invalid === void 0 && $$bindings.invalid && invalid !== void 0)
    $$bindings.invalid(invalid);
  return `${status === "uploading" ? `${validate_component(Loading, "Loading").$$render($$result, Object.assign({}, { description: iconDescription }, $$restProps, { small: true }, { withOverlay: false }), {}, {})}` : ``}

${status === "edit" ? `${invalid ? `${validate_component(WarningFilled, "WarningFilled").$$render($$result, { class: "bx--file-invalid" }, {}, {})}` : ``}
  <button${spread(
    [
      {
        "aria-label": escape_attribute_value(iconDescription)
      },
      { type: "button" },
      { tabindex: "0" },
      escape_object($$restProps)
    ],
    { classes: "bx--file-close" }
  )}>${validate_component(Close, "Close").$$render($$result, {}, {}, {})}</button>` : ``}

${status === "complete" ? `${validate_component(CheckmarkFilled, "CheckmarkFilled").$$render($$result, Object.assign({}, { "aria-label": iconDescription }, { title: iconDescription }, { class: "bx--file-complete" }, $$restProps), {}, {})}` : ``}`;
});
const FileUploaderButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "accept",
    "files",
    "multiple",
    "disabled",
    "disableLabelChanges",
    "kind",
    "labelText",
    "role",
    "tabindex",
    "id",
    "name",
    "ref"
  ]);
  let { accept = [] } = $$props;
  let { files = [] } = $$props;
  let { multiple = false } = $$props;
  let { disabled = false } = $$props;
  let { disableLabelChanges = false } = $$props;
  let { kind = "primary" } = $$props;
  let { labelText = "Add file" } = $$props;
  let { role = "button" } = $$props;
  let { tabindex = "0" } = $$props;
  let { id = "ccs-" + Math.random().toString(36) } = $$props;
  let { name = "" } = $$props;
  let { ref = null } = $$props;
  createEventDispatcher();
  let initialLabelText = labelText;
  if ($$props.accept === void 0 && $$bindings.accept && accept !== void 0)
    $$bindings.accept(accept);
  if ($$props.files === void 0 && $$bindings.files && files !== void 0)
    $$bindings.files(files);
  if ($$props.multiple === void 0 && $$bindings.multiple && multiple !== void 0)
    $$bindings.multiple(multiple);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.disableLabelChanges === void 0 && $$bindings.disableLabelChanges && disableLabelChanges !== void 0)
    $$bindings.disableLabelChanges(disableLabelChanges);
  if ($$props.kind === void 0 && $$bindings.kind && kind !== void 0)
    $$bindings.kind(kind);
  if ($$props.labelText === void 0 && $$bindings.labelText && labelText !== void 0)
    $$bindings.labelText(labelText);
  if ($$props.role === void 0 && $$bindings.role && role !== void 0)
    $$bindings.role(role);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  {
    if (ref && files.length === 0) {
      labelText = initialLabelText;
      ref.value = null;
    }
  }
  return `
<label${add_attribute("aria-disabled", disabled, 0)}${add_attribute("for", id, 0)}${add_attribute("tabindex", disabled ? "-1" : tabindex, 0)}${add_classes(("bx--btn bx--btn--sm " + (disabled ? "bx--btn--disabled" : "") + " " + (kind === "primary" ? "bx--btn--primary" : "") + " " + (kind === "secondary" ? "bx--btn--secondary" : "") + " " + (kind === "tertiary" ? "bx--btn--tertiary" : "") + " " + (kind === "ghost" ? "bx--btn--ghost" : "") + " " + (kind === "danger" ? "bx--btn--danger" : "")).trim())}><span${add_attribute("role", role, 0)}>${slots.labelText ? slots.labelText({}) : `
      ${escape(labelText)}
    `}</span></label>
<input${spread(
    [
      { type: "file" },
      { tabindex: "-1" },
      { accept: escape_attribute_value(accept) },
      { disabled: disabled || null },
      { id: escape_attribute_value(id) },
      { multiple: multiple || null },
      { name: escape_attribute_value(name) },
      escape_object($$restProps)
    ],
    {
      classes: "bx--visually-hidden"
    }
  )}>`;
});
const FileUploader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "status",
    "disabled",
    "accept",
    "files",
    "multiple",
    "clearFiles",
    "labelDescription",
    "labelTitle",
    "kind",
    "buttonLabel",
    "iconDescription",
    "name"
  ]);
  let { status = "uploading" } = $$props;
  let { disabled = false } = $$props;
  let { accept = [] } = $$props;
  let { files = [] } = $$props;
  let { multiple = false } = $$props;
  const clearFiles = () => {
    files = [];
  };
  let { labelDescription = "" } = $$props;
  let { labelTitle = "" } = $$props;
  let { kind = "primary" } = $$props;
  let { buttonLabel = "" } = $$props;
  let { iconDescription = "Provide icon description" } = $$props;
  let { name = "" } = $$props;
  createEventDispatcher();
  if ($$props.status === void 0 && $$bindings.status && status !== void 0)
    $$bindings.status(status);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.accept === void 0 && $$bindings.accept && accept !== void 0)
    $$bindings.accept(accept);
  if ($$props.files === void 0 && $$bindings.files && files !== void 0)
    $$bindings.files(files);
  if ($$props.multiple === void 0 && $$bindings.multiple && multiple !== void 0)
    $$bindings.multiple(multiple);
  if ($$props.clearFiles === void 0 && $$bindings.clearFiles && clearFiles !== void 0)
    $$bindings.clearFiles(clearFiles);
  if ($$props.labelDescription === void 0 && $$bindings.labelDescription && labelDescription !== void 0)
    $$bindings.labelDescription(labelDescription);
  if ($$props.labelTitle === void 0 && $$bindings.labelTitle && labelTitle !== void 0)
    $$bindings.labelTitle(labelTitle);
  if ($$props.kind === void 0 && $$bindings.kind && kind !== void 0)
    $$bindings.kind(kind);
  if ($$props.buttonLabel === void 0 && $$bindings.buttonLabel && buttonLabel !== void 0)
    $$bindings.buttonLabel(buttonLabel);
  if ($$props.iconDescription === void 0 && $$bindings.iconDescription && iconDescription !== void 0)
    $$bindings.iconDescription(iconDescription);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  return `
<div${spread([escape_object($$restProps)], { classes: "bx--form-item" })}><p${add_classes(("bx--file--label " + (disabled ? "bx--label-description--disabled" : "")).trim())}>${escape(labelTitle)}</p>
  <p${add_classes(("bx--label-description " + (disabled ? "bx--label-description--disabled" : "")).trim())}>${escape(labelDescription)}</p>
  ${validate_component(FileUploaderButton, "FileUploaderButton").$$render(
    $$result,
    {
      disabled,
      disableLabelChanges: true,
      labelText: buttonLabel,
      accept,
      name,
      multiple,
      kind
    },
    {},
    {}
  )}
  <div${add_classes("bx--file-container".trim())}>${each(files, ({ name: name2 }, i) => {
    return `<span${add_classes("bx--file__selected-file".trim())}><p${add_classes("bx--file-filename".trim())}>${escape(name2)}</p>
        <span${add_classes("bx--file__state-container".trim())}>${validate_component(Filename, "Filename").$$render($$result, { iconDescription, status }, {}, {})}</span>
      </span>`;
  })}</div></div>`;
});
const Grid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let props;
  let $$restProps = compute_rest_props($$props, [
    "as",
    "condensed",
    "narrow",
    "fullWidth",
    "noGutter",
    "noGutterLeft",
    "noGutterRight",
    "padding"
  ]);
  let { as = false } = $$props;
  let { condensed = false } = $$props;
  let { narrow = false } = $$props;
  let { fullWidth = false } = $$props;
  let { noGutter = false } = $$props;
  let { noGutterLeft = false } = $$props;
  let { noGutterRight = false } = $$props;
  let { padding = false } = $$props;
  if ($$props.as === void 0 && $$bindings.as && as !== void 0)
    $$bindings.as(as);
  if ($$props.condensed === void 0 && $$bindings.condensed && condensed !== void 0)
    $$bindings.condensed(condensed);
  if ($$props.narrow === void 0 && $$bindings.narrow && narrow !== void 0)
    $$bindings.narrow(narrow);
  if ($$props.fullWidth === void 0 && $$bindings.fullWidth && fullWidth !== void 0)
    $$bindings.fullWidth(fullWidth);
  if ($$props.noGutter === void 0 && $$bindings.noGutter && noGutter !== void 0)
    $$bindings.noGutter(noGutter);
  if ($$props.noGutterLeft === void 0 && $$bindings.noGutterLeft && noGutterLeft !== void 0)
    $$bindings.noGutterLeft(noGutterLeft);
  if ($$props.noGutterRight === void 0 && $$bindings.noGutterRight && noGutterRight !== void 0)
    $$bindings.noGutterRight(noGutterRight);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  props = {
    ...$$restProps,
    class: [
      $$restProps.class,
      "bx--grid",
      condensed && "bx--grid--condensed",
      narrow && "bx--grid--narrow",
      fullWidth && "bx--grid--full-width",
      noGutter && "bx--no-gutter",
      noGutterLeft && "bx--no-gutter--left",
      noGutterRight && "bx--no-gutter--right",
      padding && "bx--row-padding"
    ].filter(Boolean).join(" ")
  };
  return `${as ? `${slots.default ? slots.default({ props }) : ``}` : `<div${spread([escape_object(props)], {})}>${slots.default ? slots.default({}) : ``}</div>`}`;
});
const Row = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let props;
  let $$restProps = compute_rest_props($$props, ["as", "condensed", "narrow", "noGutter", "noGutterLeft", "noGutterRight", "padding"]);
  let { as = false } = $$props;
  let { condensed = false } = $$props;
  let { narrow = false } = $$props;
  let { noGutter = false } = $$props;
  let { noGutterLeft = false } = $$props;
  let { noGutterRight = false } = $$props;
  let { padding = false } = $$props;
  if ($$props.as === void 0 && $$bindings.as && as !== void 0)
    $$bindings.as(as);
  if ($$props.condensed === void 0 && $$bindings.condensed && condensed !== void 0)
    $$bindings.condensed(condensed);
  if ($$props.narrow === void 0 && $$bindings.narrow && narrow !== void 0)
    $$bindings.narrow(narrow);
  if ($$props.noGutter === void 0 && $$bindings.noGutter && noGutter !== void 0)
    $$bindings.noGutter(noGutter);
  if ($$props.noGutterLeft === void 0 && $$bindings.noGutterLeft && noGutterLeft !== void 0)
    $$bindings.noGutterLeft(noGutterLeft);
  if ($$props.noGutterRight === void 0 && $$bindings.noGutterRight && noGutterRight !== void 0)
    $$bindings.noGutterRight(noGutterRight);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  props = {
    ...$$restProps,
    class: [
      $$restProps.class,
      "bx--row",
      condensed && "bx--row--condensed",
      narrow && "bx--row--narrow",
      noGutter && "bx--no-gutter",
      noGutterLeft && "bx--no-gutter--left",
      noGutterRight && "bx--no-gutter--right",
      padding && "bx--row-padding"
    ].filter(Boolean).join(" ")
  };
  return `${as ? `${slots.default ? slots.default({ props }) : ``}` : `<div${spread([escape_object(props)], {})}>${slots.default ? slots.default({}) : ``}</div>`}`;
});
const Column = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let columnClass;
  let props;
  let $$restProps = compute_rest_props($$props, [
    "as",
    "noGutter",
    "noGutterLeft",
    "noGutterRight",
    "padding",
    "aspectRatio",
    "sm",
    "md",
    "lg",
    "xlg",
    "max"
  ]);
  let { as = false } = $$props;
  let { noGutter = false } = $$props;
  let { noGutterLeft = false } = $$props;
  let { noGutterRight = false } = $$props;
  let { padding = false } = $$props;
  let { aspectRatio = void 0 } = $$props;
  let { sm = void 0 } = $$props;
  let { md = void 0 } = $$props;
  let { lg = void 0 } = $$props;
  let { xlg = void 0 } = $$props;
  let { max = void 0 } = $$props;
  const breakpoints = ["sm", "md", "lg", "xlg", "max"];
  if ($$props.as === void 0 && $$bindings.as && as !== void 0)
    $$bindings.as(as);
  if ($$props.noGutter === void 0 && $$bindings.noGutter && noGutter !== void 0)
    $$bindings.noGutter(noGutter);
  if ($$props.noGutterLeft === void 0 && $$bindings.noGutterLeft && noGutterLeft !== void 0)
    $$bindings.noGutterLeft(noGutterLeft);
  if ($$props.noGutterRight === void 0 && $$bindings.noGutterRight && noGutterRight !== void 0)
    $$bindings.noGutterRight(noGutterRight);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  if ($$props.aspectRatio === void 0 && $$bindings.aspectRatio && aspectRatio !== void 0)
    $$bindings.aspectRatio(aspectRatio);
  if ($$props.sm === void 0 && $$bindings.sm && sm !== void 0)
    $$bindings.sm(sm);
  if ($$props.md === void 0 && $$bindings.md && md !== void 0)
    $$bindings.md(md);
  if ($$props.lg === void 0 && $$bindings.lg && lg !== void 0)
    $$bindings.lg(lg);
  if ($$props.xlg === void 0 && $$bindings.xlg && xlg !== void 0)
    $$bindings.xlg(xlg);
  if ($$props.max === void 0 && $$bindings.max && max !== void 0)
    $$bindings.max(max);
  columnClass = [sm, md, lg, xlg, max].map((breakpoint, i) => {
    const name = breakpoints[i];
    if (breakpoint === true) {
      return `bx--col-${name}`;
    } else if (typeof breakpoint === "number") {
      return `bx--col-${name}-${breakpoint}`;
    } else if (typeof breakpoint === "object") {
      let bp = [];
      if (typeof breakpoint.span === "number") {
        bp = [...bp, `bx--col-${name}-${breakpoint.span}`];
      } else if (breakpoint.span === true) {
        bp = [...bp, `bx--col-${name}`];
      }
      if (typeof breakpoint.offset === "number") {
        bp = [...bp, `bx--offset-${name}-${breakpoint.offset}`];
      }
      return bp.join(" ");
    }
  }).filter(Boolean).join(" ");
  props = {
    ...$$restProps,
    class: [
      $$restProps.class,
      columnClass,
      !columnClass && "bx--col",
      noGutter && "bx--no-gutter",
      noGutterLeft && "bx--no-gutter--left",
      noGutterRight && "bx--no-gutter--right",
      aspectRatio && `bx--aspect-ratio bx--aspect-ratio--${aspectRatio}`,
      padding && "bx--col-padding"
    ].filter(Boolean).join(" ")
  };
  return `${as ? `${slots.default ? slots.default({ props }) : ``}` : `<div${spread([escape_object(props)], {})}>${slots.default ? slots.default({}) : ``}</div>`}`;
});
const Modal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let modalLabelId;
  let modalHeadingId;
  let modalBodyId;
  let ariaLabel;
  let $$restProps = compute_rest_props($$props, [
    "size",
    "open",
    "danger",
    "alert",
    "passiveModal",
    "modalHeading",
    "modalLabel",
    "modalAriaLabel",
    "iconDescription",
    "hasForm",
    "hasScrollingContent",
    "primaryButtonText",
    "primaryButtonDisabled",
    "primaryButtonIcon",
    "shouldSubmitOnEnter",
    "secondaryButtonText",
    "secondaryButtons",
    "selectorPrimaryFocus",
    "preventCloseOnClickOutside",
    "id",
    "ref"
  ]);
  let $openStore, $$unsubscribe_openStore;
  let { size = void 0 } = $$props;
  let { open = false } = $$props;
  let { danger = false } = $$props;
  let { alert = false } = $$props;
  let { passiveModal = false } = $$props;
  let { modalHeading = void 0 } = $$props;
  let { modalLabel = void 0 } = $$props;
  let { modalAriaLabel = void 0 } = $$props;
  let { iconDescription = "Close the modal" } = $$props;
  let { hasForm = false } = $$props;
  let { hasScrollingContent = false } = $$props;
  let { primaryButtonText = "" } = $$props;
  let { primaryButtonDisabled = false } = $$props;
  let { primaryButtonIcon = void 0 } = $$props;
  let { shouldSubmitOnEnter = true } = $$props;
  let { secondaryButtonText = "" } = $$props;
  let { secondaryButtons = [] } = $$props;
  let { selectorPrimaryFocus = "[data-modal-primary-focus]" } = $$props;
  let { preventCloseOnClickOutside = false } = $$props;
  let { id = "ccs-" + Math.random().toString(36) } = $$props;
  let { ref = null } = $$props;
  createEventDispatcher();
  let buttonRef = null;
  let innerModal = null;
  const openStore = writable(open);
  $$unsubscribe_openStore = subscribe(openStore, (value) => $openStore = value);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.danger === void 0 && $$bindings.danger && danger !== void 0)
    $$bindings.danger(danger);
  if ($$props.alert === void 0 && $$bindings.alert && alert !== void 0)
    $$bindings.alert(alert);
  if ($$props.passiveModal === void 0 && $$bindings.passiveModal && passiveModal !== void 0)
    $$bindings.passiveModal(passiveModal);
  if ($$props.modalHeading === void 0 && $$bindings.modalHeading && modalHeading !== void 0)
    $$bindings.modalHeading(modalHeading);
  if ($$props.modalLabel === void 0 && $$bindings.modalLabel && modalLabel !== void 0)
    $$bindings.modalLabel(modalLabel);
  if ($$props.modalAriaLabel === void 0 && $$bindings.modalAriaLabel && modalAriaLabel !== void 0)
    $$bindings.modalAriaLabel(modalAriaLabel);
  if ($$props.iconDescription === void 0 && $$bindings.iconDescription && iconDescription !== void 0)
    $$bindings.iconDescription(iconDescription);
  if ($$props.hasForm === void 0 && $$bindings.hasForm && hasForm !== void 0)
    $$bindings.hasForm(hasForm);
  if ($$props.hasScrollingContent === void 0 && $$bindings.hasScrollingContent && hasScrollingContent !== void 0)
    $$bindings.hasScrollingContent(hasScrollingContent);
  if ($$props.primaryButtonText === void 0 && $$bindings.primaryButtonText && primaryButtonText !== void 0)
    $$bindings.primaryButtonText(primaryButtonText);
  if ($$props.primaryButtonDisabled === void 0 && $$bindings.primaryButtonDisabled && primaryButtonDisabled !== void 0)
    $$bindings.primaryButtonDisabled(primaryButtonDisabled);
  if ($$props.primaryButtonIcon === void 0 && $$bindings.primaryButtonIcon && primaryButtonIcon !== void 0)
    $$bindings.primaryButtonIcon(primaryButtonIcon);
  if ($$props.shouldSubmitOnEnter === void 0 && $$bindings.shouldSubmitOnEnter && shouldSubmitOnEnter !== void 0)
    $$bindings.shouldSubmitOnEnter(shouldSubmitOnEnter);
  if ($$props.secondaryButtonText === void 0 && $$bindings.secondaryButtonText && secondaryButtonText !== void 0)
    $$bindings.secondaryButtonText(secondaryButtonText);
  if ($$props.secondaryButtons === void 0 && $$bindings.secondaryButtons && secondaryButtons !== void 0)
    $$bindings.secondaryButtons(secondaryButtons);
  if ($$props.selectorPrimaryFocus === void 0 && $$bindings.selectorPrimaryFocus && selectorPrimaryFocus !== void 0)
    $$bindings.selectorPrimaryFocus(selectorPrimaryFocus);
  if ($$props.preventCloseOnClickOutside === void 0 && $$bindings.preventCloseOnClickOutside && preventCloseOnClickOutside !== void 0)
    $$bindings.preventCloseOnClickOutside(preventCloseOnClickOutside);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  set_store_value(openStore, $openStore = open, $openStore);
  modalLabelId = `bx--modal-header__label--modal-${id}`;
  modalHeadingId = `bx--modal-header__heading--modal-${id}`;
  modalBodyId = `bx--modal-body--${id}`;
  ariaLabel = modalLabel || $$props["aria-label"] || modalAriaLabel || modalHeading;
  $$unsubscribe_openStore();
  return `
<div${spread(
    [
      { role: "presentation" },
      { id: escape_attribute_value(id) },
      escape_object($$restProps)
    ],
    {
      classes: "bx--modal " + (!passiveModal ? "bx--modal-tall" : "") + " " + (open ? "is-visible" : "") + " " + (danger ? "bx--modal--danger" : "")
    }
  )}${add_attribute("this", ref, 0)}><div tabindex="-1"${add_attribute(
    "role",
    alert ? passiveModal ? "alert" : "alertdialog" : "dialog",
    0
  )}${add_attribute("aria-describedby", alert && !passiveModal ? modalBodyId : void 0, 0)} aria-modal="true"${add_attribute("aria-label", ariaLabel, 0)}${add_classes(("bx--modal-container " + (size === "xs" ? "bx--modal-container--xs" : "") + " " + (size === "sm" ? "bx--modal-container--sm" : "") + " " + (size === "lg" ? "bx--modal-container--lg" : "")).trim())}${add_attribute("this", innerModal, 0)}><div${add_classes("bx--modal-header".trim())}>${passiveModal ? `<button type="button"${add_attribute("aria-label", iconDescription, 0)}${add_classes("bx--modal-close".trim())}${add_attribute("this", buttonRef, 0)}>${validate_component(Close, "Close").$$render(
    $$result,
    {
      size: 20,
      class: "bx--modal-close__icon",
      "aria-hidden": "true"
    },
    {},
    {}
  )}</button>` : ``}
      ${modalLabel ? `<h2${add_attribute("id", modalLabelId, 0)}${add_classes("bx--modal-header__label".trim())}>${slots.label ? slots.label({}) : `${escape(modalLabel)}`}</h2>` : ``}
      <h3${add_attribute("id", modalHeadingId, 0)}${add_classes("bx--modal-header__heading".trim())}>${slots.heading ? slots.heading({}) : `${escape(modalHeading)}`}</h3>
      ${!passiveModal ? `<button type="button"${add_attribute("aria-label", iconDescription, 0)}${add_classes("bx--modal-close".trim())}${add_attribute("this", buttonRef, 0)}>${validate_component(Close, "Close").$$render(
    $$result,
    {
      size: 20,
      class: "bx--modal-close__icon",
      "aria-hidden": "true"
    },
    {},
    {}
  )}</button>` : ``}</div>
    
    <div${add_attribute("id", modalBodyId, 0)}${add_attribute("tabindex", hasScrollingContent ? "0" : void 0, 0)}${add_attribute("role", hasScrollingContent ? "region" : void 0, 0)}${add_attribute("aria-label", hasScrollingContent ? ariaLabel : void 0, 0)}${add_attribute("aria-labelledby", modalLabel ? modalLabelId : modalHeadingId, 0)}${add_classes(("bx--modal-content " + (hasForm ? "bx--modal-content--with-form" : "") + " " + (hasScrollingContent ? "bx--modal-scroll-content" : "")).trim())}>${slots.default ? slots.default({}) : ``}</div>
    ${hasScrollingContent ? `<div${add_classes("bx--modal-content--overflow-indicator".trim())}></div>` : ``}
    ${!passiveModal ? `<div${add_classes(("bx--modal-footer " + (secondaryButtons.length === 2 ? "bx--modal-footer--three-button" : "")).trim())}>${secondaryButtons.length > 0 ? `${each(secondaryButtons, (button) => {
    return `${validate_component(Button, "Button").$$render($$result, { kind: "secondary" }, {}, {
      default: () => {
        return `${escape(button.text)}
            `;
      }
    })}`;
  })}` : `${secondaryButtonText ? `${validate_component(Button, "Button").$$render($$result, { kind: "secondary" }, {}, {
    default: () => {
      return `${escape(secondaryButtonText)}`;
    }
  })}` : ``}`}
        ${validate_component(Button, "Button").$$render(
    $$result,
    {
      kind: danger ? "danger" : "primary",
      disabled: primaryButtonDisabled,
      icon: primaryButtonIcon
    },
    {},
    {
      default: () => {
        return `${escape(primaryButtonText)}`;
      }
    }
  )}</div>` : ``}</div></div>`;
});
const Add$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let labelled;
  let attributes;
  let $$restProps = compute_rest_props($$props, ["size", "title"]);
  let { size = 16 } = $$props;
  let { title = void 0 } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title;
  attributes = {
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: Number($$props["tabindex"]) === 0 ? true : void 0
  };
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { viewBox: "0 0 32 32" },
      { fill: "currentColor" },
      { preserveAspectRatio: "xMidYMid meet" },
      { width: escape_attribute_value(size) },
      { height: escape_attribute_value(size) },
      escape_object(attributes),
      escape_object($$restProps)
    ],
    {}
  )}>${title ? `<title>${escape(title)}</title>` : ``}<path d="M17 15L17 8 15 8 15 15 8 15 8 17 15 17 15 24 17 24 17 17 24 17 24 15z"></path></svg>`;
});
const Subtract = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let labelled;
  let attributes;
  let $$restProps = compute_rest_props($$props, ["size", "title"]);
  let { size = 16 } = $$props;
  let { title = void 0 } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title;
  attributes = {
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: Number($$props["tabindex"]) === 0 ? true : void 0
  };
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { viewBox: "0 0 32 32" },
      { fill: "currentColor" },
      { preserveAspectRatio: "xMidYMid meet" },
      { width: escape_attribute_value(size) },
      { height: escape_attribute_value(size) },
      escape_object(attributes),
      escape_object($$restProps)
    ],
    {}
  )}>${title ? `<title>${escape(title)}</title>` : ``}<path d="M8 15H24V17H8z"></path></svg>`;
});
const EditOff = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let labelled;
  let attributes;
  let $$restProps = compute_rest_props($$props, ["size", "title"]);
  let { size = 16 } = $$props;
  let { title = void 0 } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title;
  attributes = {
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: Number($$props["tabindex"]) === 0 ? true : void 0
  };
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { viewBox: "0 0 32 32" },
      { fill: "currentColor" },
      { preserveAspectRatio: "xMidYMid meet" },
      { width: escape_attribute_value(size) },
      { height: escape_attribute_value(size) },
      escape_object(attributes),
      escape_object($$restProps)
    ],
    {}
  )}>${title ? `<title>${escape(title)}</title>` : ``}<path d="M30 28.6L3.4 2 2 3.4l10.1 10.1L4 21.6V28h6.4l8.1-8.1L28.6 30 30 28.6zM9.6 26H6v-3.6l7.5-7.5 3.6 3.6L9.6 26zM29.4 6.2L29.4 6.2l-3.6-3.6c-.8-.8-2-.8-2.8 0l0 0 0 0-8 8 1.4 1.4L20 8.4l3.6 3.6L20 15.6l1.4 1.4 8-8C30.2 8.2 30.2 7 29.4 6.2L29.4 6.2zM25 10.6L21.4 7l3-3L28 7.6 25 10.6z"></path></svg>`;
});
const NumberInput = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let incrementLabel;
  let decrementLabel;
  let error;
  let errorId;
  let ariaLabel;
  let $$restProps = compute_rest_props($$props, [
    "size",
    "value",
    "step",
    "max",
    "min",
    "light",
    "readonly",
    "allowEmpty",
    "disabled",
    "hideSteppers",
    "iconDescription",
    "invalid",
    "invalidText",
    "warn",
    "warnText",
    "helperText",
    "label",
    "hideLabel",
    "translateWithId",
    "translationIds",
    "id",
    "name",
    "ref"
  ]);
  let $$slots = compute_slots(slots);
  let { size = void 0 } = $$props;
  let { value = null } = $$props;
  let { step = 1 } = $$props;
  let { max = void 0 } = $$props;
  let { min = void 0 } = $$props;
  let { light = false } = $$props;
  let { readonly = false } = $$props;
  let { allowEmpty = false } = $$props;
  let { disabled = false } = $$props;
  let { hideSteppers = false } = $$props;
  let { iconDescription = "" } = $$props;
  let { invalid = false } = $$props;
  let { invalidText = "" } = $$props;
  let { warn = false } = $$props;
  let { warnText = "" } = $$props;
  let { helperText = "" } = $$props;
  let { label = "" } = $$props;
  let { hideLabel = false } = $$props;
  let { translateWithId = (id2) => defaultTranslations[id2] } = $$props;
  const translationIds = {
    increment: "increment",
    decrement: "decrement"
  };
  let { id = "ccs-" + Math.random().toString(36) } = $$props;
  let { name = void 0 } = $$props;
  let { ref = null } = $$props;
  const defaultTranslations = {
    [translationIds.increment]: "Increment number",
    [translationIds.decrement]: "Decrement number"
  };
  createEventDispatcher();
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.step === void 0 && $$bindings.step && step !== void 0)
    $$bindings.step(step);
  if ($$props.max === void 0 && $$bindings.max && max !== void 0)
    $$bindings.max(max);
  if ($$props.min === void 0 && $$bindings.min && min !== void 0)
    $$bindings.min(min);
  if ($$props.light === void 0 && $$bindings.light && light !== void 0)
    $$bindings.light(light);
  if ($$props.readonly === void 0 && $$bindings.readonly && readonly !== void 0)
    $$bindings.readonly(readonly);
  if ($$props.allowEmpty === void 0 && $$bindings.allowEmpty && allowEmpty !== void 0)
    $$bindings.allowEmpty(allowEmpty);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.hideSteppers === void 0 && $$bindings.hideSteppers && hideSteppers !== void 0)
    $$bindings.hideSteppers(hideSteppers);
  if ($$props.iconDescription === void 0 && $$bindings.iconDescription && iconDescription !== void 0)
    $$bindings.iconDescription(iconDescription);
  if ($$props.invalid === void 0 && $$bindings.invalid && invalid !== void 0)
    $$bindings.invalid(invalid);
  if ($$props.invalidText === void 0 && $$bindings.invalidText && invalidText !== void 0)
    $$bindings.invalidText(invalidText);
  if ($$props.warn === void 0 && $$bindings.warn && warn !== void 0)
    $$bindings.warn(warn);
  if ($$props.warnText === void 0 && $$bindings.warnText && warnText !== void 0)
    $$bindings.warnText(warnText);
  if ($$props.helperText === void 0 && $$bindings.helperText && helperText !== void 0)
    $$bindings.helperText(helperText);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.hideLabel === void 0 && $$bindings.hideLabel && hideLabel !== void 0)
    $$bindings.hideLabel(hideLabel);
  if ($$props.translateWithId === void 0 && $$bindings.translateWithId && translateWithId !== void 0)
    $$bindings.translateWithId(translateWithId);
  if ($$props.translationIds === void 0 && $$bindings.translationIds && translationIds !== void 0)
    $$bindings.translationIds(translationIds);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  incrementLabel = translateWithId("increment");
  decrementLabel = translateWithId("decrement");
  error = invalid && !readonly || !allowEmpty && value == null || value > max || typeof value === "number" && value < min;
  errorId = `error-${id}`;
  ariaLabel = $$props["aria-label"] || "Numeric input field with increment and decrement buttons";
  return `

<div${add_classes("bx--form-item".trim())}><div${add_attribute("data-invalid", error || void 0, 0)}${add_classes(("bx--number bx--number--helpertext " + (readonly ? "bx--number--readonly" : "") + " " + (light ? "bx--number--light" : "") + " " + (hideLabel ? "bx--number--nolabel" : "") + " " + (hideSteppers ? "bx--number--nosteppers" : "") + " " + (size === "sm" ? "bx--number--sm" : "") + " " + (size === "xl" ? "bx--number--xl" : "")).trim())}>${$$slots.label || label ? `<label${add_attribute("for", id, 0)}${add_classes(("bx--label " + (disabled ? "bx--label--disabled" : "") + " " + (hideLabel ? "bx--visually-hidden" : "")).trim())}>${slots.label ? slots.label({}) : `${escape(label)}`}</label>` : ``}
    <div${add_classes(("bx--number__input-wrapper " + (!invalid && warn ? "bx--number__input-wrapper--warning" : "")).trim())}><input${spread(
    [
      { type: "number" },
      { pattern: "[0-9]*" },
      {
        "aria-describedby": escape_attribute_value(errorId)
      },
      {
        "data-invalid": escape_attribute_value(error || void 0)
      },
      {
        "aria-invalid": escape_attribute_value(error || void 0)
      },
      {
        "aria-label": escape_attribute_value(label ? void 0 : ariaLabel)
      },
      { disabled: disabled || null },
      { id: escape_attribute_value(id) },
      { name: escape_attribute_value(name) },
      { max: escape_attribute_value(max) },
      { min: escape_attribute_value(min) },
      { step: escape_attribute_value(step) },
      {
        value: escape_attribute_value(value ?? "")
      },
      { readonly: readonly || null },
      escape_object($$restProps)
    ],
    {}
  )}${add_attribute("this", ref, 0)}>
      ${readonly ? `${validate_component(EditOff, "EditOff").$$render($$result, { class: "bx--text-input__readonly-icon" }, {}, {})}` : `${invalid ? `${validate_component(WarningFilled, "WarningFilled").$$render($$result, { class: "bx--number__invalid" }, {}, {})}` : ``}
        ${!invalid && warn ? `${validate_component(WarningAltFilled, "WarningAltFilled").$$render(
    $$result,
    {
      class: "bx--number__invalid bx--number__invalid--warning"
    },
    {},
    {}
  )}` : ``}`}
      ${!hideSteppers ? `<div${add_classes("bx--number__controls".trim())}><button type="button" tabindex="-1"${add_attribute("title", decrementLabel || iconDescription, 0)}${add_attribute("aria-label", decrementLabel || iconDescription, 0)} ${disabled ? "disabled" : ""}${add_classes("bx--number__control-btn down-icon".trim())}>${validate_component(Subtract, "Subtract").$$render($$result, { class: "down-icon" }, {}, {})}</button>
          <div${add_classes("bx--number__rule-divider".trim())}></div>
          <button type="button" tabindex="-1"${add_attribute("title", incrementLabel || iconDescription, 0)}${add_attribute("aria-label", incrementLabel || iconDescription, 0)} ${disabled ? "disabled" : ""}${add_classes("bx--number__control-btn up-icon".trim())}>${validate_component(Add$1, "Add").$$render($$result, { class: "up-icon" }, {}, {})}</button>
          <div${add_classes("bx--number__rule-divider".trim())}></div></div>` : ``}</div>
    ${!error && !warn && helperText ? `<div${add_classes(("bx--form__helper-text " + (disabled ? "bx--form__helper-text--disabled" : "")).trim())}>${escape(helperText)}</div>` : ``}
    ${error ? `<div${add_attribute("id", errorId, 0)}${add_classes("bx--form-requirement".trim())}>${escape(invalidText)}</div>` : ``}
    ${!error && warn ? `<div${add_attribute("id", errorId, 0)}${add_classes("bx--form-requirement".trim())}>${escape(warnText)}</div>` : ``}</div></div>`;
});
const Select = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let errorId;
  let $$restProps = compute_rest_props($$props, [
    "selected",
    "size",
    "inline",
    "light",
    "disabled",
    "id",
    "name",
    "invalid",
    "invalidText",
    "warn",
    "warnText",
    "helperText",
    "noLabel",
    "labelText",
    "hideLabel",
    "ref",
    "required"
  ]);
  let $defaultValue, $$unsubscribe_defaultValue;
  let $$unsubscribe_selectedValue;
  let $$unsubscribe_itemTypesByValue;
  let $defaultSelectId, $$unsubscribe_defaultSelectId;
  let { selected: selected2 = void 0 } = $$props;
  let { size = void 0 } = $$props;
  let { inline = false } = $$props;
  let { light = false } = $$props;
  let { disabled = false } = $$props;
  let { id = "ccs-" + Math.random().toString(36) } = $$props;
  let { name = void 0 } = $$props;
  let { invalid = false } = $$props;
  let { invalidText = "" } = $$props;
  let { warn = false } = $$props;
  let { warnText = "" } = $$props;
  let { helperText = "" } = $$props;
  let { noLabel = false } = $$props;
  let { labelText = "" } = $$props;
  let { hideLabel = false } = $$props;
  let { ref = null } = $$props;
  let { required = false } = $$props;
  createEventDispatcher();
  const selectedValue = writable(selected2);
  $$unsubscribe_selectedValue = subscribe(selectedValue, (value) => value);
  const defaultSelectId = writable(null);
  $$unsubscribe_defaultSelectId = subscribe(defaultSelectId, (value) => $defaultSelectId = value);
  const defaultValue = writable(null);
  $$unsubscribe_defaultValue = subscribe(defaultValue, (value) => $defaultValue = value);
  const itemTypesByValue = writable({});
  $$unsubscribe_itemTypesByValue = subscribe(itemTypesByValue, (value) => value);
  setContext("Select", {
    selectedValue,
    setDefaultValue: (id2, value) => {
      if ($defaultValue === null) {
        defaultSelectId.set(id2);
        defaultValue.set(value);
      } else {
        if ($defaultSelectId === id2) {
          selectedValue.set(value);
        }
      }
      itemTypesByValue.update((types) => ({ ...types, [value]: typeof value }));
    }
  });
  if ($$props.selected === void 0 && $$bindings.selected && selected2 !== void 0)
    $$bindings.selected(selected2);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.inline === void 0 && $$bindings.inline && inline !== void 0)
    $$bindings.inline(inline);
  if ($$props.light === void 0 && $$bindings.light && light !== void 0)
    $$bindings.light(light);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.invalid === void 0 && $$bindings.invalid && invalid !== void 0)
    $$bindings.invalid(invalid);
  if ($$props.invalidText === void 0 && $$bindings.invalidText && invalidText !== void 0)
    $$bindings.invalidText(invalidText);
  if ($$props.warn === void 0 && $$bindings.warn && warn !== void 0)
    $$bindings.warn(warn);
  if ($$props.warnText === void 0 && $$bindings.warnText && warnText !== void 0)
    $$bindings.warnText(warnText);
  if ($$props.helperText === void 0 && $$bindings.helperText && helperText !== void 0)
    $$bindings.helperText(helperText);
  if ($$props.noLabel === void 0 && $$bindings.noLabel && noLabel !== void 0)
    $$bindings.noLabel(noLabel);
  if ($$props.labelText === void 0 && $$bindings.labelText && labelText !== void 0)
    $$bindings.labelText(labelText);
  if ($$props.hideLabel === void 0 && $$bindings.hideLabel && hideLabel !== void 0)
    $$bindings.hideLabel(hideLabel);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  if ($$props.required === void 0 && $$bindings.required && required !== void 0)
    $$bindings.required(required);
  errorId = `error-${id}`;
  {
    selectedValue.set(selected2 ?? $defaultValue);
  }
  $$unsubscribe_defaultValue();
  $$unsubscribe_selectedValue();
  $$unsubscribe_itemTypesByValue();
  $$unsubscribe_defaultSelectId();
  return `<div${spread([escape_object($$restProps)], { classes: "bx--form-item" })}><div${add_classes(("bx--select " + (inline ? "bx--select--inline" : "") + " " + (light ? "bx--select--light" : "") + " " + (invalid ? "bx--select--invalid" : "") + " " + (disabled ? "bx--select--disabled" : "") + " " + (warn ? "bx--select--warning" : "")).trim())}>${!noLabel ? `<label${add_attribute("for", id, 0)}${add_classes(("bx--label " + (hideLabel ? "bx--visually-hidden" : "") + " " + (disabled ? "bx--label--disabled" : "")).trim())}>${slots.labelText ? slots.labelText({}) : `
          ${escape(labelText)}
        `}</label>` : ``}
    ${inline ? `<div${add_classes("bx--select-input--inline__wrapper".trim())}><div${add_attribute("data-invalid", invalid || void 0, 0)}${add_classes("bx--select-input__wrapper".trim())}><select${add_attribute("aria-describedby", invalid ? errorId : void 0, 0)}${add_attribute("aria-invalid", invalid || void 0, 0)} ${disabled || void 0 ? "disabled" : ""} ${required || void 0 ? "required" : ""}${add_attribute("id", id, 0)}${add_attribute("name", name, 0)}${add_classes(("bx--select-input " + (size === "sm" ? "bx--select-input--sm" : "") + " " + (size === "xl" ? "bx--select-input--xl" : "")).trim())}${add_attribute("this", ref, 0)}>${slots.default ? slots.default({}) : ``}</select>
          ${validate_component(ChevronDown, "ChevronDown").$$render($$result, { class: "bx--select__arrow" }, {}, {})}
          ${invalid ? `${validate_component(WarningFilled, "WarningFilled").$$render($$result, { class: "bx--select__invalid-icon" }, {}, {})}` : ``}</div>
        ${invalid ? `<div${add_attribute("id", errorId, 0)}${add_classes("bx--form-requirement".trim())}>${escape(invalidText)}</div>` : ``}</div>
      ${helperText ? `<div${add_classes(("bx--form__helper-text " + (disabled ? "bx--form__helper-text--disabled" : "")).trim())}>${escape(helperText)}</div>` : ``}` : ``}
    ${!inline ? `<div${add_attribute("data-invalid", invalid || void 0, 0)}${add_classes("bx--select-input__wrapper".trim())}><select${add_attribute("id", id, 0)}${add_attribute("name", name, 0)}${add_attribute("aria-describedby", invalid ? errorId : void 0, 0)} ${disabled || void 0 ? "disabled" : ""} ${required || void 0 ? "required" : ""}${add_attribute("aria-invalid", invalid || void 0, 0)}${add_classes(("bx--select-input " + (size === "sm" ? "bx--select-input--sm" : "") + " " + (size === "xl" ? "bx--select-input--xl" : "")).trim())}${add_attribute("this", ref, 0)}>${slots.default ? slots.default({}) : ``}</select>
        ${validate_component(ChevronDown, "ChevronDown").$$render($$result, { class: "bx--select__arrow" }, {}, {})}
        ${invalid ? `${validate_component(WarningFilled, "WarningFilled").$$render($$result, { class: "bx--select__invalid-icon" }, {}, {})}` : ``}
        ${!invalid && warn ? `${validate_component(WarningAltFilled, "WarningAltFilled").$$render(
    $$result,
    {
      class: "bx--select__invalid-icon bx--select__invalid-icon--warning"
    },
    {},
    {}
  )}` : ``}</div>
      ${!invalid && helperText ? `<div${add_classes(("bx--form__helper-text " + (disabled ? "bx--form__helper-text--disabled" : "")).trim())}>${escape(helperText)}</div>` : ``}
      ${invalid ? `<div${add_attribute("id", errorId, 0)}${add_classes("bx--form-requirement".trim())}>${escape(invalidText)}</div>` : ``}
      ${!invalid && warn ? `<div${add_attribute("id", errorId, 0)}${add_classes("bx--form-requirement".trim())}>${escape(warnText)}</div>` : ``}` : ``}</div></div>`;
});
const SelectItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["value", "text", "hidden", "disabled"]);
  let { value = "" } = $$props;
  let { text = "" } = $$props;
  let { hidden = false } = $$props;
  let { disabled = false } = $$props;
  const id = "ccs-" + Math.random().toString(36);
  const ctx = getContext("Select") || getContext("TimePickerSelect");
  let selected2 = false;
  ctx.selectedValue.subscribe((currentValue) => {
    selected2 = currentValue === value;
  });
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  if ($$props.hidden === void 0 && $$bindings.hidden && hidden !== void 0)
    $$bindings.hidden(hidden);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  {
    ctx?.setDefaultValue?.(id, value);
  }
  return `<option${add_attribute("value", value, 0)} ${disabled ? "disabled" : ""} ${hidden ? "hidden" : ""} ${selected2 ? "selected" : ""} class="${[escape($$restProps.class, true), "bx--select-option"].join(" ").trim()}"${add_attribute("style", $$restProps.style, 0)}>${escape(text || value)}</option>`;
});
const SelectItemGroup = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["disabled", "label"]);
  let { disabled = false } = $$props;
  let { label = "Provide label" } = $$props;
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  return `<optgroup${spread(
    [
      { label: escape_attribute_value(label) },
      { disabled: disabled || null },
      escape_object($$restProps)
    ],
    {
      classes: "bx--select-optgroup"
    }
  )}>${slots.default ? slots.default({}) : ``}</optgroup>`;
});
const Tabs = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let currentTab;
  let currentContent;
  let $$restProps = compute_rest_props($$props, ["selected", "type", "autoWidth", "iconDescription", "triggerHref"]);
  let $selectedTab, $$unsubscribe_selectedTab;
  let $content, $$unsubscribe_content;
  let $tabs, $$unsubscribe_tabs;
  let $tabsById, $$unsubscribe_tabsById;
  let { selected: selected2 = 0 } = $$props;
  let { type = "default" } = $$props;
  let { autoWidth = false } = $$props;
  let { iconDescription = "Show menu options" } = $$props;
  let { triggerHref = "#" } = $$props;
  createEventDispatcher();
  const tabs = writable([]);
  $$unsubscribe_tabs = subscribe(tabs, (value) => $tabs = value);
  const tabsById = derived(tabs, (_) => _.reduce((a, c) => ({ ...a, [c.id]: c }), {}));
  $$unsubscribe_tabsById = subscribe(tabsById, (value) => $tabsById = value);
  const useAutoWidth = writable(autoWidth);
  const selectedTab = writable(void 0);
  $$unsubscribe_selectedTab = subscribe(selectedTab, (value) => $selectedTab = value);
  const content = writable([]);
  $$unsubscribe_content = subscribe(content, (value) => $content = value);
  const contentById = derived(content, (_) => _.reduce((a, c) => ({ ...a, [c.id]: c }), {}));
  const selectedContent = writable(void 0);
  let refTabList = null;
  setContext("Tabs", {
    tabs,
    contentById,
    selectedTab,
    selectedContent,
    useAutoWidth,
    add: (data) => {
      tabs.update((_) => [..._, { ...data, index: _.length }]);
    },
    addContent: (data) => {
      content.update((_) => [..._, { ...data, index: _.length }]);
    },
    update: (id) => {
      currentIndex = $tabsById[id].index;
    },
    change: async (direction) => {
      let index = currentIndex + direction;
      if (index < 0) {
        index = $tabs.length - 1;
      } else if (index >= $tabs.length) {
        index = 0;
      }
      let disabled = $tabs[index].disabled;
      while (disabled) {
        index = index + direction;
        if (index < 0) {
          index = $tabs.length - 1;
        } else if (index >= $tabs.length) {
          index = 0;
        }
        disabled = $tabs[index].disabled;
      }
      currentIndex = index;
      await tick();
    }
  });
  let dropdownHidden = true;
  let currentIndex = selected2;
  if ($$props.selected === void 0 && $$bindings.selected && selected2 !== void 0)
    $$bindings.selected(selected2);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.autoWidth === void 0 && $$bindings.autoWidth && autoWidth !== void 0)
    $$bindings.autoWidth(autoWidth);
  if ($$props.iconDescription === void 0 && $$bindings.iconDescription && iconDescription !== void 0)
    $$bindings.iconDescription(iconDescription);
  if ($$props.triggerHref === void 0 && $$bindings.triggerHref && triggerHref !== void 0)
    $$bindings.triggerHref(triggerHref);
  currentIndex = selected2;
  currentTab = $tabs[currentIndex] || void 0;
  currentContent = $content[currentIndex] || void 0;
  {
    {
      if (currentTab) {
        selectedTab.set(currentTab.id);
      }
      if (currentContent) {
        selectedContent.set(currentContent.id);
      }
    }
  }
  {
    if ($selectedTab) {
      dropdownHidden = true;
    }
  }
  {
    useAutoWidth.set(autoWidth);
  }
  $$unsubscribe_selectedTab();
  $$unsubscribe_content();
  $$unsubscribe_tabs();
  $$unsubscribe_tabsById();
  return `<div${spread([{ role: "navigation" }, escape_object($$restProps)], {
    classes: "bx--tabs " + (type === "container" ? "bx--tabs--container" : "")
  })}><div role="listbox" tabindex="0"${add_attribute("aria-label", $$props["aria-label"] || "listbox", 0)}${add_classes("bx--tabs-trigger".trim())}><a tabindex="-1"${add_attribute("href", triggerHref, 0)}${add_classes("bx--tabs-trigger-text".trim())}>${currentTab ? `${escape(currentTab.label)}` : ``}</a>
    ${validate_component(ChevronDown, "ChevronDown").$$render(
    $$result,
    {
      "aria-hidden": "true",
      title: iconDescription
    },
    {},
    {}
  )}</div>
  
  <ul role="tablist"${add_classes(("bx--tabs__nav " + (dropdownHidden ? "bx--tabs__nav--hidden" : "")).trim())}${add_attribute("this", refTabList, 0)}>${slots.default ? slots.default({}) : ``}</ul></div>
${slots.content ? slots.content({}) : ``}`;
});
const Tab = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let selected2;
  let $$restProps = compute_rest_props($$props, ["label", "href", "disabled", "tabindex", "id", "ref"]);
  let $selectedTab, $$unsubscribe_selectedTab;
  let $useAutoWidth, $$unsubscribe_useAutoWidth;
  let { label = "" } = $$props;
  let { href = "#" } = $$props;
  let { disabled = false } = $$props;
  let { tabindex = "0" } = $$props;
  let { id = "ccs-" + Math.random().toString(36) } = $$props;
  let { ref = null } = $$props;
  const { selectedTab, useAutoWidth, add, update, change } = getContext("Tabs");
  $$unsubscribe_selectedTab = subscribe(selectedTab, (value) => $selectedTab = value);
  $$unsubscribe_useAutoWidth = subscribe(useAutoWidth, (value) => $useAutoWidth = value);
  add({ id, label, disabled });
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  selected2 = $selectedTab === id;
  $$unsubscribe_selectedTab();
  $$unsubscribe_useAutoWidth();
  return `
<li${spread([{ tabindex: "-1" }, { role: "presentation" }, escape_object($$restProps)], {
    classes: "bx--tabs__nav-item " + (disabled ? "bx--tabs__nav-item--disabled" : "") + " " + (selected2 ? "bx--tabs__nav-item--selected" : "")
  })}><a role="tab"${add_attribute("tabindex", disabled ? "-1" : tabindex, 0)}${add_attribute("aria-selected", selected2, 0)}${add_attribute("aria-disabled", disabled, 0)}${add_attribute("id", id, 0)}${add_attribute("href", href, 0)}${add_attribute("style", $useAutoWidth ? "width: auto" : void 0, 0)}${add_classes("bx--tabs__nav-link".trim())}${add_attribute("this", ref, 0)}>${slots.default ? slots.default({}) : `${escape(label)}`}</a></li>`;
});
const TabContent = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let selected2;
  let index;
  let tabId;
  let $$restProps = compute_rest_props($$props, ["id"]);
  let $tabs, $$unsubscribe_tabs;
  let $contentById, $$unsubscribe_contentById;
  let $selectedContent, $$unsubscribe_selectedContent;
  let { id = "ccs-" + Math.random().toString(36) } = $$props;
  const { selectedContent, addContent, tabs, contentById } = getContext("Tabs");
  $$unsubscribe_selectedContent = subscribe(selectedContent, (value) => $selectedContent = value);
  $$unsubscribe_tabs = subscribe(tabs, (value) => $tabs = value);
  $$unsubscribe_contentById = subscribe(contentById, (value) => $contentById = value);
  addContent({ id });
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  selected2 = $selectedContent === id;
  index = $contentById[id].index;
  tabId = $tabs[index].id;
  $$unsubscribe_tabs();
  $$unsubscribe_contentById();
  $$unsubscribe_selectedContent();
  return `<div${spread(
    [
      { role: "tabpanel" },
      {
        "aria-labelledby": escape_attribute_value(tabId)
      },
      {
        "aria-hidden": escape_attribute_value(!selected2)
      },
      {
        hidden: (selected2 ? void 0 : "") || null
      },
      { id: escape_attribute_value(id) },
      escape_object($$restProps)
    ],
    { classes: "bx--tab-content" }
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
const TagSkeleton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["size"]);
  let { size = "default" } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  return `
<span${spread([escape_object($$restProps)], {
    classes: "bx--tag " + (size === "sm" ? "bx--tag--sm" : "") + " bx--skeleton"
  })}></span>`;
});
const Tag = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["type", "size", "filter", "disabled", "interactive", "skeleton", "title", "icon", "id"]);
  let $$slots = compute_slots(slots);
  let { type = void 0 } = $$props;
  let { size = "default" } = $$props;
  let { filter = false } = $$props;
  let { disabled = false } = $$props;
  let { interactive = false } = $$props;
  let { skeleton = false } = $$props;
  let { title = "Clear filter" } = $$props;
  let { icon = void 0 } = $$props;
  let { id = "ccs-" + Math.random().toString(36) } = $$props;
  createEventDispatcher();
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.filter === void 0 && $$bindings.filter && filter !== void 0)
    $$bindings.filter(filter);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.interactive === void 0 && $$bindings.interactive && interactive !== void 0)
    $$bindings.interactive(interactive);
  if ($$props.skeleton === void 0 && $$bindings.skeleton && skeleton !== void 0)
    $$bindings.skeleton(skeleton);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  return `
${skeleton ? `${validate_component(TagSkeleton, "TagSkeleton").$$render($$result, Object.assign({}, { size }, $$restProps), {}, {})}` : `${filter ? `<div${spread(
    [
      {
        "aria-label": escape_attribute_value(title)
      },
      { id: escape_attribute_value(id) },
      escape_object($$restProps)
    ],
    {
      classes: "bx--tag " + (disabled ? "bx--tag--disabled" : "") + " " + (filter ? "bx--tag--filter" : "") + " " + (size === "sm" ? "bx--tag--sm" : "") + " " + (type === "red" ? "bx--tag--red" : "") + " " + (type === "magenta" ? "bx--tag--magenta" : "") + " " + (type === "purple" ? "bx--tag--purple" : "") + " " + (type === "blue" ? "bx--tag--blue" : "") + " " + (type === "cyan" ? "bx--tag--cyan" : "") + " " + (type === "teal" ? "bx--tag--teal" : "") + " " + (type === "green" ? "bx--tag--green" : "") + " " + (type === "gray" ? "bx--tag--gray" : "") + " " + (type === "cool-gray" ? "bx--tag--cool-gray" : "") + " " + (type === "warm-gray" ? "bx--tag--warm-gray" : "") + " " + (type === "high-contrast" ? "bx--tag--high-contrast" : "") + " " + (type === "outline" ? "bx--tag--outline" : "")
    }
  )}>${slots.default ? slots.default({ props: { class: "bx--tag__label" } }) : `
      <span${add_classes("bx--tag__label".trim())}>${escape(type)}</span>
    `}
    <button type="button"${add_attribute("aria-labelledby", id, 0)} ${disabled ? "disabled" : ""}${add_attribute("title", title, 0)}${add_classes("bx--tag__close-icon".trim())}>${validate_component(Close, "Close").$$render($$result, {}, {}, {})}</button></div>` : `${interactive ? `<button${spread(
    [
      { type: "button" },
      { id: escape_attribute_value(id) },
      { disabled: disabled || null },
      {
        "aria-disabled": escape_attribute_value(disabled)
      },
      {
        tabindex: escape_attribute_value(disabled ? "-1" : void 0)
      },
      escape_object($$restProps)
    ],
    {
      classes: "bx--tag bx--tag--interactive " + (disabled ? "bx--tag--disabled" : "") + " " + (size === "sm" ? "bx--tag--sm" : "") + " " + (type === "red" ? "bx--tag--red" : "") + " " + (type === "magenta" ? "bx--tag--magenta" : "") + " " + (type === "purple" ? "bx--tag--purple" : "") + " " + (type === "blue" ? "bx--tag--blue" : "") + " " + (type === "cyan" ? "bx--tag--cyan" : "") + " " + (type === "teal" ? "bx--tag--teal" : "") + " " + (type === "green" ? "bx--tag--green" : "") + " " + (type === "gray" ? "bx--tag--gray" : "") + " " + (type === "cool-gray" ? "bx--tag--cool-gray" : "") + " " + (type === "warm-gray" ? "bx--tag--warm-gray" : "") + " " + (type === "high-contrast" ? "bx--tag--high-contrast" : "") + " " + (type === "outline" ? "bx--tag--outline" : "")
    }
  )}>${$$slots.icon || icon ? `<div${add_classes("bx--tag__custom-icon".trim())}>${slots.icon ? slots.icon({ props: { class: "bx--tag__label" } }) : `
          ${validate_component(icon || missing_component, "svelte:component").$$render($$result, {}, {}, {})}
        `}</div>` : ``}
    <span>${slots.default ? slots.default({}) : ``}</span></button>` : `<div${spread([{ id: escape_attribute_value(id) }, escape_object($$restProps)], {
    classes: "bx--tag " + (disabled ? "bx--tag--disabled" : "") + " " + (size === "sm" ? "bx--tag--sm" : "") + " " + (type === "red" ? "bx--tag--red" : "") + " " + (type === "magenta" ? "bx--tag--magenta" : "") + " " + (type === "purple" ? "bx--tag--purple" : "") + " " + (type === "blue" ? "bx--tag--blue" : "") + " " + (type === "cyan" ? "bx--tag--cyan" : "") + " " + (type === "teal" ? "bx--tag--teal" : "") + " " + (type === "green" ? "bx--tag--green" : "") + " " + (type === "gray" ? "bx--tag--gray" : "") + " " + (type === "cool-gray" ? "bx--tag--cool-gray" : "") + " " + (type === "warm-gray" ? "bx--tag--warm-gray" : "") + " " + (type === "high-contrast" ? "bx--tag--high-contrast" : "") + " " + (type === "outline" ? "bx--tag--outline" : "")
  })}>${$$slots.icon || icon ? `<div${add_classes("bx--tag__custom-icon".trim())}>${slots.icon ? slots.icon({}) : `
          ${validate_component(icon || missing_component, "svelte:component").$$render($$result, {}, {}, {})}
        `}</div>` : ``}
    <span>${slots.default ? slots.default({}) : ``}</span></div>`}`}`}`;
});
const TextArea = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let errorId;
  let $$restProps = compute_rest_props($$props, [
    "value",
    "placeholder",
    "cols",
    "rows",
    "maxCount",
    "light",
    "disabled",
    "readonly",
    "helperText",
    "labelText",
    "hideLabel",
    "invalid",
    "invalidText",
    "id",
    "name",
    "ref"
  ]);
  let $$slots = compute_slots(slots);
  let { value = "" } = $$props;
  let { placeholder = "" } = $$props;
  let { cols = 50 } = $$props;
  let { rows = 4 } = $$props;
  let { maxCount = void 0 } = $$props;
  let { light = false } = $$props;
  let { disabled = false } = $$props;
  let { readonly = false } = $$props;
  let { helperText = "" } = $$props;
  let { labelText = "" } = $$props;
  let { hideLabel = false } = $$props;
  let { invalid = false } = $$props;
  let { invalidText = "" } = $$props;
  let { id = "ccs-" + Math.random().toString(36) } = $$props;
  let { name = void 0 } = $$props;
  let { ref = null } = $$props;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  if ($$props.cols === void 0 && $$bindings.cols && cols !== void 0)
    $$bindings.cols(cols);
  if ($$props.rows === void 0 && $$bindings.rows && rows !== void 0)
    $$bindings.rows(rows);
  if ($$props.maxCount === void 0 && $$bindings.maxCount && maxCount !== void 0)
    $$bindings.maxCount(maxCount);
  if ($$props.light === void 0 && $$bindings.light && light !== void 0)
    $$bindings.light(light);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.readonly === void 0 && $$bindings.readonly && readonly !== void 0)
    $$bindings.readonly(readonly);
  if ($$props.helperText === void 0 && $$bindings.helperText && helperText !== void 0)
    $$bindings.helperText(helperText);
  if ($$props.labelText === void 0 && $$bindings.labelText && labelText !== void 0)
    $$bindings.labelText(labelText);
  if ($$props.hideLabel === void 0 && $$bindings.hideLabel && hideLabel !== void 0)
    $$bindings.hideLabel(hideLabel);
  if ($$props.invalid === void 0 && $$bindings.invalid && invalid !== void 0)
    $$bindings.invalid(invalid);
  if ($$props.invalidText === void 0 && $$bindings.invalidText && invalidText !== void 0)
    $$bindings.invalidText(invalidText);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  errorId = `error-${id}`;
  return `

<div${add_classes("bx--form-item".trim())}>${(labelText || $$slots.labelText) && !hideLabel ? `<div${add_classes("bx--text-area__label-wrapper".trim())}><label${add_attribute("for", id, 0)}${add_classes(("bx--label " + (hideLabel ? "bx--visually-hidden" : "") + " " + (disabled ? "bx--label--disabled" : "")).trim())}>${slots.labelText ? slots.labelText({}) : `
          ${escape(labelText)}
        `}</label>
      ${maxCount ? `<div${add_classes(("bx--label " + (disabled ? "bx--label--disabled" : "")).trim())}>${escape(value.length)}/${escape(maxCount)}</div>` : ``}</div>` : ``}
  <div${add_attribute("data-invalid", invalid || void 0, 0)}${add_classes("bx--text-area__wrapper".trim())}>${invalid ? `${validate_component(WarningFilled, "WarningFilled").$$render($$result, { class: "bx--text-area__invalid-icon" }, {}, {})}` : ``}
    <textarea${spread(
    [
      {
        "aria-invalid": escape_attribute_value(invalid || void 0)
      },
      {
        "aria-describedby": escape_attribute_value(invalid ? errorId : void 0)
      },
      { disabled: disabled || null },
      { id: escape_attribute_value(id) },
      { name: escape_attribute_value(name) },
      { cols: escape_attribute_value(cols) },
      { rows: escape_attribute_value(rows) },
      {
        placeholder: escape_attribute_value(placeholder)
      },
      { readonly: readonly || null },
      {
        maxlength: escape_attribute_value(maxCount ?? void 0)
      },
      escape_object($$restProps)
    ],
    {
      classes: "bx--text-area " + (light ? "bx--text-area--light" : "") + " " + (invalid ? "bx--text-area--invalid" : "")
    }
  )}${add_attribute("this", ref, 0)}>${value || ""}</textarea></div>
  ${!invalid && helperText ? `<div${add_classes(("bx--form__helper-text " + (disabled ? "bx--form__helper-text--disabled" : "")).trim())}>${escape(helperText)}</div>` : ``}
  ${invalid ? `<div${add_attribute("id", errorId, 0)}${add_classes("bx--form-requirement".trim())}>${escape(invalidText)}</div>` : ``}</div>`;
});
const ClickableTile = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["clicked", "light", "disabled", "href"]);
  let { clicked = false } = $$props;
  let { light = false } = $$props;
  let { disabled = false } = $$props;
  let { href = void 0 } = $$props;
  if ($$props.clicked === void 0 && $$bindings.clicked && clicked !== void 0)
    $$bindings.clicked(clicked);
  if ($$props.light === void 0 && $$bindings.light && light !== void 0)
    $$bindings.light(light);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  return `${validate_component(Link, "Link").$$render(
    $$result,
    Object.assign(
      {},
      $$restProps,
      { disabled },
      {
        class: "bx--tile bx--tile--clickable " + (clicked && "bx--tile--is-clicked") + " " + (light && "bx--tile--light") + " " + $$restProps.class
      },
      { href }
    ),
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}`;
});
const SelectableTile = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "selected",
    "light",
    "disabled",
    "title",
    "value",
    "tabindex",
    "iconDescription",
    "id",
    "name",
    "ref"
  ]);
  let { selected: selected2 = false } = $$props;
  let { light = false } = $$props;
  let { disabled = false } = $$props;
  let { title = "title" } = $$props;
  let { value = "value" } = $$props;
  let { tabindex = "0" } = $$props;
  let { iconDescription = "Tile checkmark" } = $$props;
  let { id = "ccs-" + Math.random().toString(36) } = $$props;
  let { name = "" } = $$props;
  let { ref = null } = $$props;
  const dispatch = createEventDispatcher();
  if ($$props.selected === void 0 && $$bindings.selected && selected2 !== void 0)
    $$bindings.selected(selected2);
  if ($$props.light === void 0 && $$bindings.light && light !== void 0)
    $$bindings.light(light);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.iconDescription === void 0 && $$bindings.iconDescription && iconDescription !== void 0)
    $$bindings.iconDescription(iconDescription);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  {
    if (!disabled)
      dispatch(selected2 ? "select" : "deselect", id);
  }
  return `<input type="checkbox" tabindex="-1" ${selected2 ? "checked" : ""}${add_attribute("id", id, 0)}${add_attribute("value", value, 0)}${add_attribute("name", name, 0)}${add_attribute("title", title, 0)} ${disabled ? "disabled" : ""}${add_classes("bx--tile-input".trim())}${add_attribute("this", ref, 0)}>


<label${spread(
    [
      { for: escape_attribute_value(id) },
      {
        tabindex: escape_attribute_value(disabled ? void 0 : tabindex)
      },
      escape_object($$restProps)
    ],
    {
      classes: "bx--tile bx--tile--selectable " + (selected2 ? "bx--tile--is-selected" : "") + " " + (light ? "bx--tile--light" : "") + " " + (disabled ? "bx--tile--disabled" : "")
    }
  )}><span${add_classes("bx--tile__checkmark".trim())}>${validate_component(CheckmarkFilled, "CheckmarkFilled").$$render(
    $$result,
    {
      "aria-label": iconDescription,
      title: iconDescription
    },
    {},
    {}
  )}</span>
  <span${add_classes("bx--tile-content".trim())}>${slots.default ? slots.default({}) : ``}</span></label>`;
});
const Content = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let unsetLeftMargin;
  let $$restProps = compute_rest_props($$props, ["id"]);
  let $isSideNavRail, $$unsubscribe_isSideNavRail;
  let $isSideNavCollapsed, $$unsubscribe_isSideNavCollapsed;
  $$unsubscribe_isSideNavRail = subscribe(isSideNavRail, (value) => $isSideNavRail = value);
  $$unsubscribe_isSideNavCollapsed = subscribe(isSideNavCollapsed, (value) => $isSideNavCollapsed = value);
  let { id = "main-content" } = $$props;
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  unsetLeftMargin = $isSideNavCollapsed && !$isSideNavRail;
  $$unsubscribe_isSideNavRail();
  $$unsubscribe_isSideNavCollapsed();
  return `<main${spread(
    [
      { id: escape_attribute_value(id) },
      escape_object($$restProps),
      {
        style: escape(unsetLeftMargin ? "margin-left: 0;" : "", true) + " " + escape($$restProps.style, true)
      }
    ],
    { classes: "bx--content" }
  )}>${slots.default ? slots.default({}) : ``}</main>`;
});
const Add = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let labelled;
  let attributes;
  let $$restProps = compute_rest_props($$props, ["size", "title"]);
  let { size = 16 } = $$props;
  let { title = void 0 } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title;
  attributes = {
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: Number($$props["tabindex"]) === 0 ? true : void 0
  };
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { viewBox: "0 0 32 32" },
      { fill: "currentColor" },
      { preserveAspectRatio: "xMidYMid meet" },
      { width: escape_attribute_value(size) },
      { height: escape_attribute_value(size) },
      escape_object(attributes),
      escape_object($$restProps)
    ],
    {}
  )}>${title ? `<title>${escape(title)}</title>` : ``}<path d="M17 15L17 8 15 8 15 15 8 15 8 17 15 17 15 24 17 24 17 17 24 17 24 15z"></path></svg>`;
});
const Copy = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let labelled;
  let attributes;
  let $$restProps = compute_rest_props($$props, ["size", "title"]);
  let { size = 16 } = $$props;
  let { title = void 0 } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title;
  attributes = {
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: Number($$props["tabindex"]) === 0 ? true : void 0
  };
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { viewBox: "0 0 32 32" },
      { fill: "currentColor" },
      { preserveAspectRatio: "xMidYMid meet" },
      { width: escape_attribute_value(size) },
      { height: escape_attribute_value(size) },
      escape_object(attributes),
      escape_object($$restProps)
    ],
    {}
  )}>${title ? `<title>${escape(title)}</title>` : ``}<path d="M28,10V28H10V10H28m0-2H10a2,2,0,0,0-2,2V28a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V10a2,2,0,0,0-2-2Z"></path><path d="M4,18H2V4A2,2,0,0,1,4,2H18V4H4Z"></path></svg>`;
});
const Download = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let labelled;
  let attributes;
  let $$restProps = compute_rest_props($$props, ["size", "title"]);
  let { size = 16 } = $$props;
  let { title = void 0 } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title;
  attributes = {
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: Number($$props["tabindex"]) === 0 ? true : void 0
  };
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { viewBox: "0 0 32 32" },
      { fill: "currentColor" },
      { preserveAspectRatio: "xMidYMid meet" },
      { width: escape_attribute_value(size) },
      { height: escape_attribute_value(size) },
      escape_object(attributes),
      escape_object($$restProps)
    ],
    {}
  )}>${title ? `<title>${escape(title)}</title>` : ``}<path d="M26 24v4H6V24H4v4H4a2 2 0 002 2H26a2 2 0 002-2h0V24zM26 14L24.59 12.59 17 20.17 17 2 15 2 15 20.17 7.41 12.59 6 14 16 24 26 14z"></path></svg>`;
});
const TrashCan = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let labelled;
  let attributes;
  let $$restProps = compute_rest_props($$props, ["size", "title"]);
  let { size = 16 } = $$props;
  let { title = void 0 } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title;
  attributes = {
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: Number($$props["tabindex"]) === 0 ? true : void 0
  };
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { viewBox: "0 0 32 32" },
      { fill: "currentColor" },
      { preserveAspectRatio: "xMidYMid meet" },
      { width: escape_attribute_value(size) },
      { height: escape_attribute_value(size) },
      escape_object(attributes),
      escape_object($$restProps)
    ],
    {}
  )}>${title ? `<title>${escape(title)}</title>` : ``}<path d="M12 12H14V24H12zM18 12H20V24H18z"></path><path d="M4 6V8H6V28a2 2 0 002 2H24a2 2 0 002-2V8h2V6zM8 28V8H24V28zM12 2H20V4H12z"></path></svg>`;
});
const Upload = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let labelled;
  let attributes;
  let $$restProps = compute_rest_props($$props, ["size", "title"]);
  let { size = 16 } = $$props;
  let { title = void 0 } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title;
  attributes = {
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: Number($$props["tabindex"]) === 0 ? true : void 0
  };
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { viewBox: "0 0 32 32" },
      { fill: "currentColor" },
      { preserveAspectRatio: "xMidYMid meet" },
      { width: escape_attribute_value(size) },
      { height: escape_attribute_value(size) },
      escape_object(attributes),
      escape_object($$restProps)
    ],
    {}
  )}>${title ? `<title>${escape(title)}</title>` : ``}<path d="M6 18L7.41 19.41 15 11.83 15 30 17 30 17 11.83 24.59 19.41 26 18 16 8 6 18zM6 8V4H26V8h2V4a2 2 0 00-2-2H6A2 2 0 004 4V8z"></path></svg>`;
});
function getGearNameColor(gear2) {
  const diff = gear2.diff;
  const up = gear2.upgradeCount > 0;
  if (diff < 0)
    return "gray";
  if (diff < 6) {
    if (up)
      return "orange2";
    else
      return "white";
  }
  if (diff < 23)
    return "blue";
  if (diff < 40)
    return "purple";
  if (diff < 55)
    return "orange2";
  if (diff < 70)
    return "green";
  return "red";
}
function parseColorString(text) {
  return text.replaceAll(/(\\r)?\\n/g, "\n").replaceAll(/#c(.+?)#(?![c$gr])/g, `<span class="orange">$1</span>`).replaceAll(/\$(.+?)#(?![c$gr])/g, `<span class="blue">$1</span>`).replaceAll(/#g(.+?)#(?![c$gr])/g, `<span class="green">$1</span>`).replaceAll(/#r(.+?)#(?![c$gr])/g, `<span class="red">$1</span>`).replaceAll(/#p(.+?)#(?![c$gr])/g, `<span class="purple2">$1</span>`).replaceAll(/#o(.+?)#(?![c$gr])/g, `<span class="orange2">$1</span>`).replaceAll(/#(c|\$|g|r|p|o)?/g, "");
}
function getGearPropString(type, value) {
  if (value === 0)
    return "";
  switch (type) {
    case GearPropType.incSTR:
      return `STR : +${value}`;
    case GearPropType.incDEX:
      return `DEX : +${value}`;
    case GearPropType.incINT:
      return `INT : +${value}`;
    case GearPropType.incLUK:
      return `LUK : +${value}`;
    case GearPropType.incAllStat:
      return `올스탯: +${value}`;
    case GearPropType.incMHP:
      return `최대 HP : +${value}`;
    case GearPropType.incMMP:
      return `최대 MP : +${value}`;
    case GearPropType.incMHPr:
      return `최대 HP : +${value}%`;
    case GearPropType.incMMPr:
      return `최대 MP : +${value}%`;
    case GearPropType.incMDF:
      return `MaxDF : +${value}`;
    case GearPropType.incPAD:
      return `공격력 : +${value}`;
    case GearPropType.incMAD:
      return `마력 : +${value}`;
    case GearPropType.incPDD:
      return `방어력 : +${value}`;
    case GearPropType.incSpeed:
      return `이동속도 : +${value}`;
    case GearPropType.incJump:
      return `점프력 : +${value}`;
    case GearPropType.knockback:
      return `직접 타격시 ${value}%의 확률로 넉백`;
    case GearPropType.bdR:
      return `보스 몬스터 공격 시 데미지 +${value}%`;
    case GearPropType.imdR:
      return `몬스터 방어율 무시 : +${value}%`;
    case GearPropType.damR:
      return `데미지 : +${value}%`;
    case GearPropType.statR:
      return `올스탯: +${value}%`;
    case GearPropType.reduceReq:
      return `착용 레벨 감소 : - ${value}`;
    case GearPropType.incPADr:
      return `공격력 : +${value}%`;
    case GearPropType.incMADr:
      return `마력 : +${value}%`;
    case GearPropType.incCr:
      return `크리티컬 확률 : +${value}%`;
    case GearPropType.only:
      return "고유 아이템";
    case GearPropType.tradeBlock:
      return "교환 불가";
    case GearPropType.equipTradeBlock:
      return "장착 시 교환 불가";
    case GearPropType.accountSharable:
      return "월드 내 나의 캐릭터간 이동만 가능";
    case GearPropType.sharableOnce:
      return "월드 내 나의 캐릭터 간 1회 이동 가능\n(이동 후 교환불가)";
    case GearPropType.onlyEquip:
      return "고유장착 아이템";
    case GearPropType.blockGoldHammer:
      return "황금망치 사용 불가";
    case GearPropType.noPotential:
      return "잠재능력 설정 불가";
    case GearPropType.fixedPotential:
      return "잠재능력 재설정 불가";
    case GearPropType.exceptUpgrade:
      return "강화불가";
    case GearPropType.tradeAvailable:
      switch (value) {
        case 1:
          return "#c카르마의 가위 또는 실버 카르마의 가위를 사용하면 1회 교환이 가능하게 할 수 있습니다.#";
        case 2:
          return "#c플래티넘 카르마의 가위를 사용하면 1회 교환이 가능하게 할 수 있습니다.#";
      }
      break;
    case GearPropType.accountShareTag:
      return "#c쉐어 네임 텍을 사용하면 월드 내 나의 캐릭터 간 1회 이동할 수 있습니다.#";
    case GearPropType.superiorEqp:
      return "아이템 강화 성공시 더욱 높은 효과를 받을 수 있습니다.";
    case GearPropType.jokerToSetItem:
      return "#c3개 이상 착용하고 있는 모든 세트 아이템에 포함되는 럭키 아이템! (단, 2개 이상의 럭키 아이템 착용 시 1개만 효과 적용.)#";
  }
  return "";
}
function getGearOptionString(type, option, amazing) {
  let propStr = getGearPropString(type, option.sum);
  if (option.bonus > 0 || option.upgrade + option.enchant > 0) {
    let p = "";
    let subfix = "";
    let bonusStr = "";
    let upgradeStr = "";
    let enchantStr = "";
    let upgradeVal = 0;
    switch (type) {
      case GearPropType.incSTR:
      case GearPropType.incDEX:
      case GearPropType.incINT:
      case GearPropType.incLUK:
      case GearPropType.incMHP:
      case GearPropType.incMMP:
      case GearPropType.incMDF:
      case GearPropType.incARC:
      case GearPropType.incAUT:
      case GearPropType.incPAD:
      case GearPropType.incMAD:
      case GearPropType.incPDD:
      case GearPropType.incSpeed:
      case GearPropType.incJump:
        break;
      case GearPropType.bdR:
      case GearPropType.incBDR:
      case GearPropType.imdR:
      case GearPropType.incIMDR:
      case GearPropType.damR:
      case GearPropType.incDAMr:
      case GearPropType.statR:
        p = "%";
        break;
      case GearPropType.reduceReq:
        return `#g${propStr}#`;
    }
    if (option.bonus > 0) {
      bonusStr = ` #g+${option.bonus}${p}#`;
    }
    upgradeVal = amazing ? option.upgrade + option.enchant : option.upgrade;
    if (upgradeVal > 0) {
      upgradeStr = ` #p+${upgradeVal}${p}#`;
    } else if (upgradeVal < 0) {
      upgradeStr = ` #r+${upgradeVal}${p}#`;
    }
    if (!amazing && option.enchant > 0) {
      enchantStr = ` #o+${option.enchant}${p}#`;
    }
    subfix = `(${option.base}${p}${bonusStr}${upgradeStr}${enchantStr})`;
    propStr = `#$${propStr}# ${subfix}`;
  }
  return propStr;
}
function getGradeString(grade) {
  switch (grade) {
    case PotentialGrade.rare:
      return "(레어 아이템)";
    case PotentialGrade.epic:
      return "(에픽 아이템)";
    case PotentialGrade.unique:
      return "(유니크 아이템)";
    case PotentialGrade.legendary:
      return "(레전드리 아이템)";
    case PotentialGrade.special:
      return "(스페셜 아이템)";
    default:
      return "";
  }
}
function getGearTypeString(type) {
  switch (type) {
    case GearType.faceAccessory:
      return "얼굴장식";
    case GearType.eyeAccessory:
      return "눈장식";
    case GearType.earrings:
      return "귀고리";
    case GearType.pendant:
      return "펜던트";
    case GearType.belt:
      return "벨트";
    case GearType.medal:
      return "훈장";
    case GearType.shoulder:
      return "어깨장식";
    case GearType.cap:
      return "모자";
    case GearType.cape:
      return "망토";
    case GearType.coat:
      return "상의";
    case GearType.dragonMask:
      return "드래곤 모자";
    case GearType.dragonPendant:
      return "드래곤 펜던트";
    case GearType.dragonWings:
      return "드래곤 날개장식";
    case GearType.dragonTail:
      return "드래곤 꼬리장식";
    case GearType.glove:
      return "장갑";
    case GearType.longcoat:
      return "한벌옷";
    case GearType.machineEngine:
      return "메카닉 엔진";
    case GearType.machineArms:
      return "메카닉 암";
    case GearType.machineLegs:
      return "메카닉 레그";
    case GearType.machineBody:
      return "메카닉 프레임";
    case GearType.machineTransistors:
      return "메카닉 트랜지스터";
    case GearType.pants:
      return "하의";
    case GearType.ring:
      return "반지";
    case GearType.shield:
      return "방패";
    case GearType.shoes:
      return "신발";
    case GearType.shiningRod:
      return "샤이닝 로드";
    case GearType.soulShooter:
      return "소울 슈터";
    case GearType.ohSword:
      return "한손검";
    case GearType.ohAxe:
      return "한손도끼";
    case GearType.ohBlunt:
      return "한손둔기";
    case GearType.dagger:
      return "단검";
    case GearType.katara:
      return "블레이드";
    case GearType.magicArrow:
      return "마법화살";
    case GearType.card:
      return "카드";
    case GearType.orb:
      return "오브";
    case GearType.dragonEssence:
      return "용의 정수";
    case GearType.soulRing:
      return "소울링";
    case GearType.magnum:
      return "매그넘";
    case GearType.cane:
      return "케인";
    case GearType.wand:
      return "완드";
    case GearType.staff:
      return "스태프";
    case GearType.thSword:
      return "두손검";
    case GearType.thAxe:
      return "두손도끼";
    case GearType.thBlunt:
      return "두손둔기";
    case GearType.spear:
      return "창";
    case GearType.polearm:
      return "폴암";
    case GearType.bow:
      return "활";
    case GearType.crossbow:
      return "석궁";
    case GearType.claw:
      return "아대";
    case GearType.knuckle:
      return "너클";
    case GearType.gun:
      return "건";
    case GearType.android:
      return "안드로이드";
    case GearType.machineHeart:
      return "기계 심장";
    case GearType.pickaxe:
      return "채광 도구";
    case GearType.shovel:
      return "약초채집 도구";
    case GearType.pocket:
      return "포켓 아이템";
    case GearType.dualBowguns:
      return "듀얼 보우건";
    case GearType.handCannon:
      return "핸드캐논";
    case GearType.badge:
      return "뱃지";
    case GearType.emblem:
      return "엠블렘";
    case GearType.soulShield:
      return "소울실드";
    case GearType.demonShield:
      return "포스실드";
    case GearType.petEquip:
      return "펫장비";
    case GearType.heavySword:
      return "대검";
    case GearType.longSword:
      return "태도";
    case GearType.medallion:
      return "메달";
    case GearType.rosary:
      return "로자리오";
    case GearType.ironChain:
      return "쇠사슬";
    case GearType.magicBook1:
    case GearType.magicBook2:
    case GearType.magicBook3:
      return "마도서";
    case GearType.arrowFletching:
      return "화살깃";
    case GearType.bowThimble:
      return "활골무";
    case GearType.daggerScabbard:
      return "단검용 검집";
    case GearType.charm:
      return "부적";
    case GearType.wristBand:
      return "리스트밴드";
    case GearType.farSight:
      return "조준기";
    case GearType.powderKeg:
    case GearType.powderKeg2:
      return "화약통";
    case GearType.mass:
      return "무게추";
    case GearType.document:
      return "문서";
    case GearType.magicMarble:
      return "마법구슬";
    case GearType.arrowhead:
      return "화살촉";
    case GearType.jewel:
      return "보석";
    case GearType.controller:
      return "컨트롤러";
    case GearType.foxMarble:
      return "여우 구슬";
    case GearType.chessPiece:
      return "체스피스";
    case GearType.powerSource:
      return "파워소스";
    case GearType.energySword:
      return "에너지소드";
    case GearType.desperado:
      return "데스페라도";
    case GearType.espLimiter:
      return "ESP 리미터";
    case GearType.gauntletRevolver:
      return "건틀렛 리볼버";
    case GearType.charge:
      return "장약";
    case GearType.chain:
      return "체인";
    case GearType.magicGauntlet:
      return "매직 건틀렛";
    case GearType.transmitter:
      return "무기 전송장치";
    case GearType.magicWing:
      return "매직윙";
    case GearType.pathOfAbyss:
      return "패스 오브 어비스";
    case GearType.relic:
      return "렐릭";
    case GearType.ancientBow:
      return "에인션트 보우";
    case GearType.ritualFan:
      return "부채";
    case GearType.fanTassel:
      return "선추";
    case GearType.tuner:
      return "튜너";
    case GearType.bracelet:
      return "브레이슬릿";
    case GearType.breathShooter:
      return "브레스 슈터";
    case GearType.weaponBelt:
      return "웨폰 벨트";
    case GearType.ornament:
      return "노리개";
    case GearType.chakram:
      return "차크람";
    case GearType.hexSeeker:
      return "헥스시커";
    default:
      return type;
  }
}
function getAttackSpeedString(attackSpeed) {
  let str;
  switch (attackSpeed) {
    case 2:
    case 3:
      str = "매우 빠름";
      break;
    case 4:
    case 5:
      str = "빠름";
      break;
    case 6:
      str = "보통";
      break;
    case 7:
    case 8:
      str = "느림";
      break;
    case 9:
      str = "매우 느림";
      break;
    default:
      str = attackSpeed.toString();
      break;
  }
  return `${str} (${10 - attackSpeed}단계)`;
}
function getExtraJobReqString(type) {
  switch (type) {
    case GearType.medallion:
      return "히어로 직업군 착용 가능";
    case GearType.rosary:
      return "팔라딘 직업군 착용 가능";
    case GearType.ironChain:
      return "다크나이트 직업군 착용 가능";
    case GearType.magicBook1:
      return "불,독 계열 마법사 착용 가능";
    case GearType.magicBook2:
      return "얼음,번개 계열 마법사 착용 가능";
    case GearType.magicBook3:
      return "비숍 계열 마법사 착용 가능";
    case GearType.arrowFletching:
      return "보우마스터 직업군 착용 가능";
    case GearType.bowThimble:
      return "신궁 직업군 착용 가능";
    case GearType.daggerScabbard:
      return "섀도어 직업군 착용 가능";
    case GearType.charm:
      return "나이트로드 직업군 착용 가능";
    case GearType.katara:
      return "듀얼블레이드 직업군 착용 가능";
    case GearType.wristBand:
      return "바이퍼 직업군 착용 가능";
    case GearType.farSight:
      return "캡틴 직업군 착용 가능";
    case GearType.powderKeg:
      return "캐논 슈터 직업군 착용 가능";
    case GearType.relic:
      return "패스파인더 직업군 착용 가능";
    case GearType.jewel:
      return "시그너스 기사단 착용 가능";
    case GearType.mass:
      return getExtraJobReqStringByJob(21);
    case GearType.document:
      return getExtraJobReqStringByJob(22);
    case GearType.magicArrow:
      return getExtraJobReqStringByJob(23);
    case GearType.card:
      return getExtraJobReqStringByJob(24);
    case GearType.foxMarble:
      return getExtraJobReqStringByJob(25);
    case GearType.orb:
    case GearType.shiningRod:
      return getExtraJobReqStringByJob(27);
    case GearType.demonShield:
      return getExtraJobReqStringByJob(31);
    case GearType.desperado:
      return "데몬 어벤져 착용 가능";
    case GearType.magicMarble:
      return "배틀메이지 직업군 착용 가능";
    case GearType.arrowhead:
      return "와일드헌터 직업군 착용 가능";
    case GearType.magnum:
      return "메카닉 착용 가능";
    case GearType.controller:
    case GearType.powerSource:
    case GearType.energySword:
      return getExtraJobReqStringByJob(36);
    case GearType.gauntletRevolver:
    case GearType.charge:
      return getExtraJobReqStringByJob(37);
    case GearType.soulShield:
      return "미하일 착용 가능";
    case GearType.dragonEssence:
      return getExtraJobReqStringByJob(61);
    case GearType.breathShooter:
    case GearType.weaponBelt:
      return getExtraJobReqStringByJob(63);
    case GearType.chain:
    case GearType.transmitter:
      return getExtraJobReqStringByJob(64);
    case GearType.soulRing:
    case GearType.soulShooter:
      return getExtraJobReqStringByJob(65);
    case GearType.heavySword:
    case GearType.longSword:
      return getExtraJobReqStringByJob(101);
    case GearType.espLimiter:
    case GearType.chessPiece:
      return getExtraJobReqStringByJob(142);
    case GearType.magicGauntlet:
    case GearType.magicWing:
      return getExtraJobReqStringByJob(152);
    case GearType.pathOfAbyss:
      return getExtraJobReqStringByJob(155);
    case GearType.ritualFan:
    case GearType.fanTassel:
      return getExtraJobReqStringByJob(164);
    case GearType.tuner:
    case GearType.bracelet:
      return getExtraJobReqStringByJob(151);
    case GearType.ornament:
      return getExtraJobReqStringByJob(162);
    case GearType.chakram:
    case GearType.hexSeeker:
      return getExtraJobReqStringByJob(154);
    default:
      return "";
  }
}
function getExtraJobReqStringByJob(specJob) {
  switch (specJob) {
    case 21:
      return "아란 착용 가능";
    case 22:
      return "에반 착용 가능";
    case 23:
      return "메르세데스 착용가능";
    case 24:
      return "팬텀 착용 가능";
    case 25:
      return "은월 착용 가능";
    case 27:
      return "루미너스 착용 가능";
    case 31:
      return "데몬 직업군 착용 가능";
    case 36:
      return "제논 착용 가능";
    case 37:
      return "블래스터 착용 가능";
    case 51:
      return "미하일 착용 가능";
    case 61:
      return "카이저 착용 가능";
    case 63:
      return "카인 착용 가능";
    case 64:
      return "카데나 착용 가능";
    case 65:
      return "엔젤릭 버스터 착용 가능";
    case 101:
      return "제로 착용 가능";
    case 142:
      return "키네시스 착용 가능";
    case 151:
      return "아델 착용 가능";
    case 152:
      return "일리움 착용 가능";
    case 154:
      return "칼리 착용 가능";
    case 155:
      return "아크 착용 가능";
    case 162:
      return "라라 착용 가능";
    case 164:
      return "호영 착용 가능";
    default:
      return "";
  }
}
function getSoulOptionString(option) {
  if (option.size !== 1) {
    return "";
  }
  const [type, value] = [...option][0];
  switch (type) {
    case GearPropType.bdR:
      return `보스 몬스터 공격 시 데미지 : +${value}%`;
    default:
      return getGearPropString(type, value);
  }
}
const GearGrade_svelte_svelte_type_style_lang = "";
const css$n = {
  code: ".grade-text.svelte-f573fz{margin-top:4px;line-height:15px;font-size:11px;letter-spacing:normal;font-family:돋움;color:var(--gear-white)}",
  map: null
};
const GearGrade = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { grade } = $$props;
  let { specialGrade } = $$props;
  if ($$props.grade === void 0 && $$bindings.grade && grade !== void 0)
    $$bindings.grade(grade);
  if ($$props.specialGrade === void 0 && $$bindings.specialGrade && specialGrade !== void 0)
    $$bindings.specialGrade(specialGrade);
  $$result.css.add(css$n);
  grade = specialGrade ? PotentialGrade.special : grade;
  return `<div class="grade-text svelte-f573fz">${escape(getGradeString(grade))}</div>`;
});
const Attributes_svelte_svelte_type_style_lang = "";
const css$m = {
  code: ".attributes.svelte-1xwqsk3{display:flex;flex-direction:row;flex-wrap:wrap;justify-content:center;padding-left:7px;padding-right:7px;line-height:15px;font-size:11px;font-family:돋움;letter-spacing:normal;color:var(--gear-orange);white-space:pre}.item.svelte-1xwqsk3:not(.last):not(:last-child)::after{content:', '}",
  map: null
};
const Attributes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let attrs;
  let { gear: gear2 } = $$props;
  let attributes;
  function getAttributeStrings(gear22) {
    let value;
    const tags = [];
    if (value = gear22.getPropValue(GearPropType.only)) {
      tags.push(getGearPropString(GearPropType.only, value));
    }
    if (value = gear22.getPropValue(GearPropType.tradeBlock)) {
      tags.push(getGearPropString(GearPropType.tradeBlock, value));
    }
    if (value = gear22.getPropValue(GearPropType.onlyEquip)) {
      tags.push(getGearPropString(GearPropType.onlyEquip, value));
    }
    if (value = gear22.getPropValue(GearPropType.equipTradeBlock)) {
      if (!gear22.getBooleanValue(GearPropType.tradeBlock)) {
        tags.push(getGearPropString(GearPropType.equipTradeBlock, value));
      }
    }
    if (value = gear22.getPropValue(GearPropType.accountSharable)) {
      let value2;
      if (value2 = gear22.getPropValue(GearPropType.sharableOnce)) {
        tags.push(...getGearPropString(GearPropType.sharableOnce, value2).split("\n"));
      } else {
        tags.push(getGearPropString(GearPropType.accountSharable, value));
      }
    }
    if (value = gear22.getPropValue(GearPropType.blockGoldHammer)) {
      tags.push(getGearPropString(GearPropType.blockGoldHammer, value));
    }
    if ((value = gear22.getPropValue(GearPropType.fixedPotential)) || (value = gear22.getPropValue(GearPropType.fixedGrade))) {
      tags.push(getGearPropString(GearPropType.fixedPotential, value));
    }
    if (value = gear22.getPropValue(GearPropType.noLookChange)) {
      tags.push(getGearPropString(GearPropType.noLookChange, value));
    }
    if (gear22.itemID / 1e4 >= 161 && gear22.itemID / 1e4 <= 165 || gear22.itemID / 1e4 >= 194 && gear22.itemID / 1e4 <= 197) {
      tags.push("신비의 모루 사용 불가");
    }
    return tags;
  }
  if ($$props.gear === void 0 && $$bindings.gear && gear2 !== void 0)
    $$bindings.gear(gear2);
  $$result.css.add(css$m);
  attrs = getAttributeStrings(gear2);
  return `${attrs.length > 0 ? `<div class="attributes svelte-1xwqsk3"${add_attribute("this", attributes, 0)}>${each(attrs, (attr) => {
    return `<span class="item svelte-1xwqsk3">${escape(attr)}</span>`;
  })}</div>` : ``}`;
});
const Desc_svelte_svelte_type_style_lang = "";
const css$l = {
  code: '.text.svelte-1at29od{line-height:15px;font-size:11px;font-family:돋움;letter-spacing:normal;color:var(--gear-white);white-space:pre-wrap}.text.svelte-1at29od .orange{color:var(--gear-orange)}.text.svelte-1at29od .orange::before{content:" "}.text.svelte-1at29od .orange::after{content:" "}',
  map: null
};
const Desc = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { text } = $$props;
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  $$result.css.add(css$l);
  return `<div class="text svelte-1at29od"><!-- HTML_TAG_START -->${parseColorString(text)}<!-- HTML_TAG_END -->
</div>`;
});
const DiffExtra_svelte_svelte_type_style_lang = "";
const css$k = {
  code: ".diff-extra.svelte-psffb8{display:grid;grid-template-columns:62px 62px 58px}.diff.svelte-psffb8{display:flex;align-items:center;justify-content:space-between}.diff-value.svelte-psffb8{display:flex;margin-right:5px;column-gap:1px}.pdd.svelte-psffb8{background-image:url(../images/summary/icon/pdd.png);width:17px;height:17px}.bdr.svelte-psffb8{background-image:url(../images/summary/icon/bdr.png);width:17px;height:17px}.imdr.svelte-psffb8{background-image:url(../images/summary/icon/igpddr.png);width:16px;height:16px}.none.svelte-psffb8{width:2px;height:5px}.plus.svelte-psffb8{background-image:url(../images/lookahead/plus.png);width:5px;height:5px}.minus.svelte-psffb8{background-image:url(../images/lookahead/minus.png);width:5px;height:1px;margin-top:2px}.percent.svelte-psffb8{background-image:url(../images/lookahead/percent.png);width:5px;height:5px;margin-left:3px}.number-0.svelte-psffb8{background-image:url(../images/lookahead/0.png);width:5px;height:5px}.number-1.svelte-psffb8{background-image:url(../images/lookahead/1.png);width:2px;height:5px}.number-2.svelte-psffb8{background-image:url(../images/lookahead/2.png);width:5px;height:5px}.number-3.svelte-psffb8{background-image:url(../images/lookahead/3.png);width:5px;height:5px}.number-4.svelte-psffb8{background-image:url(../images/lookahead/4.png);width:5px;height:5px}.number-5.svelte-psffb8{background-image:url(../images/lookahead/5.png);width:5px;height:5px}.number-6.svelte-psffb8{background-image:url(../images/lookahead/6.png);width:5px;height:5px}.number-7.svelte-psffb8{background-image:url(../images/lookahead/7.png);width:4px;height:5px}.number-8.svelte-psffb8{background-image:url(../images/lookahead/8.png);width:5px;height:5px}.number-9.svelte-psffb8{background-image:url(../images/lookahead/9.png);width:5px;height:5px}",
  map: null
};
function diffToString(diff) {
  const abs = Math.abs(diff);
  if (diff > 0) {
    return `+ ${abs}`;
  } else if (diff < 0) {
    return `- ${abs}`;
  } else {
    return `${abs}`;
  }
}
function getLetterName$1(letter) {
  switch (letter) {
    case " ":
      return "none";
    case "+":
      return "plus";
    case "-":
      return "minus";
    default:
      return `number-${letter}`;
  }
}
const DiffExtra = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { pddDiff = 0 } = $$props;
  let { bdrDiff = 0 } = $$props;
  let { imdrDiff = 0 } = $$props;
  if ($$props.pddDiff === void 0 && $$bindings.pddDiff && pddDiff !== void 0)
    $$bindings.pddDiff(pddDiff);
  if ($$props.bdrDiff === void 0 && $$bindings.bdrDiff && bdrDiff !== void 0)
    $$bindings.bdrDiff(bdrDiff);
  if ($$props.imdrDiff === void 0 && $$bindings.imdrDiff && imdrDiff !== void 0)
    $$bindings.imdrDiff(imdrDiff);
  $$result.css.add(css$k);
  return `<div class="diff-extra svelte-psffb8"><div class="diff svelte-psffb8"><span class="pdd svelte-psffb8"></span>
		<span class="diff-value svelte-psffb8">${each(diffToString(pddDiff), (letter) => {
    return `<span class="${escape(null_to_empty(getLetterName$1(letter)), true) + " svelte-psffb8"}"></span>`;
  })}</span></div>
	<div class="diff svelte-psffb8"><span class="bdr svelte-psffb8"></span>
		<span class="diff-value svelte-psffb8">${each(diffToString(bdrDiff), (letter) => {
    return `<span class="${escape(null_to_empty(getLetterName$1(letter)), true) + " svelte-psffb8"}"></span>`;
  })}
			<span class="percent svelte-psffb8"></span></span></div>
	<div class="diff svelte-psffb8"><span class="imdr svelte-psffb8"></span>
		<span class="diff-value svelte-psffb8">${each(diffToString(imdrDiff), (letter) => {
    return `<span class="${escape(null_to_empty(getLetterName$1(letter)), true) + " svelte-psffb8"}"></span>`;
  })}
			<span class="percent svelte-psffb8"></span></span></div>
</div>`;
});
const GearType_svelte_svelte_type_style_lang = "";
const css$j = {
  code: ".text.svelte-flwrds{line-height:15px;font-size:11px;letter-spacing:normal;font-family:돋움;color:var(--gear-white)}",
  map: null
};
const GearType_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { type } = $$props;
  let { attackSpeed = 0 } = $$props;
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.attackSpeed === void 0 && $$bindings.attackSpeed && attackSpeed !== void 0)
    $$bindings.attackSpeed(attackSpeed);
  $$result.css.add(css$j);
  return `${Gear.isWeapon(type) ? `<div class="text svelte-flwrds">무기분류 : ${escape(getGearTypeString(type))}
		${Gear.isLeftWeapon(type) || type === GearType.katara ? `(한손무기)` : `(두손무기)`}</div>
	<div class="text svelte-flwrds">공격속도 : ${escape(getAttackSpeedString(attackSpeed))}</div>` : `<div class="text svelte-flwrds">장비분류 : ${escape(getGearTypeString(type))}</div>`}`;
});
const Icon_svelte_svelte_type_style_lang = "";
const css$i = {
  code: ".item-icon.svelte-195dsdj{position:relative}.base.svelte-195dsdj{background-image:url(../images/itemIcon/base.png);width:82px;height:82px;position:relative}.icon.svelte-195dsdj{transform:scale(2);transform-origin:top left}.border.svelte-195dsdj{width:90px;height:80px;position:absolute;top:1px;left:1px}.border.rare.svelte-195dsdj{background-image:url(../images/itemIcon/rare.png)}.border.epic.svelte-195dsdj{background-image:url(../images/itemIcon/epic.png)}.border.unique.svelte-195dsdj{background-image:url(../images/itemIcon/unique.png)}.border.legendary.svelte-195dsdj{background-image:url(../images/itemIcon/legendary.png)}.old-dot.svelte-195dsdj{background-image:url(../images/itemIcon/old.png);width:10px;height:10px;position:absolute;top:5px;left:5px}.new-dot.svelte-195dsdj{background-image:url(../images/itemIcon/new.png);width:6px;height:6px;position:absolute;top:7px;left:7px}.cover.svelte-195dsdj{background-image:url(../images/itemIcon/cover.png);width:74px;height:74px;position:absolute;top:4px;left:4px}",
  map: null
};
const Icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let color;
  let originX;
  let originY;
  let { src } = $$props;
  let { origin } = $$props;
  let { alt } = $$props;
  let { grade } = $$props;
  let { newBonus } = $$props;
  function getBorderColor(grade2) {
    switch (grade2) {
      case PotentialGrade.rare:
        return "rare";
      case PotentialGrade.epic:
        return "epic";
      case PotentialGrade.unique:
        return "unique";
      case PotentialGrade.legendary:
        return "legendary";
    }
    return "";
  }
  if ($$props.src === void 0 && $$bindings.src && src !== void 0)
    $$bindings.src(src);
  if ($$props.origin === void 0 && $$bindings.origin && origin !== void 0)
    $$bindings.origin(origin);
  if ($$props.alt === void 0 && $$bindings.alt && alt !== void 0)
    $$bindings.alt(alt);
  if ($$props.grade === void 0 && $$bindings.grade && grade !== void 0)
    $$bindings.grade(grade);
  if ($$props.newBonus === void 0 && $$bindings.newBonus && newBonus !== void 0)
    $$bindings.newBonus(newBonus);
  $$result.css.add(css$i);
  color = getBorderColor(grade);
  originX = 6 + (1 - origin[0]) * 2;
  originY = 6 + (33 - origin[1]) * 2;
  return `<div class="item-icon svelte-195dsdj">${color !== "" ? `<div class="${"border " + escape(color, true) + " svelte-195dsdj"}"></div>` : ``}
	<div class="base svelte-195dsdj"><img class="icon svelte-195dsdj"${add_attribute("src", src, 0)}${add_attribute("alt", alt, 0)} style="${"margin-left: " + escape(originX, true) + "px; margin-top: " + escape(originY, true) + "px"}"></div>
	<div class="old-dot svelte-195dsdj"></div>
	${newBonus ? `<div class="new-dot svelte-195dsdj"></div>` : ``}
	<div class="cover svelte-195dsdj"></div>
</div>`;
});
const Incline_svelte_svelte_type_style_lang = "";
const css$h = {
  code: ".diff.svelte-wwx9jh.svelte-wwx9jh{display:flex;flex-direction:column}.text.svelte-wwx9jh.svelte-wwx9jh{margin-right:4px;font-size:11px;font-family:돋움;text-align:right;letter-spacing:normal;color:var(--gear-gray2)}.incline.svelte-wwx9jh.svelte-wwx9jh,.decline.svelte-wwx9jh.svelte-wwx9jh{display:flex;flex-direction:row;align-self:flex-end;align-items:center;margin-top:5px}.letter.svelte-wwx9jh.svelte-wwx9jh{position:relative}.small.svelte-wwx9jh .letter.svelte-wwx9jh{image-rendering:crisp-edges;transform-origin:top right}.plus.svelte-wwx9jh.svelte-wwx9jh{width:18px;height:18px;margin-top:4px;margin-right:5px}.small.svelte-wwx9jh .plus.svelte-wwx9jh{margin-top:3px;margin-right:-1px}.minus.svelte-wwx9jh.svelte-wwx9jh{width:16px;height:8px;margin-top:9px;margin-right:5px}.small.svelte-wwx9jh .minus.svelte-wwx9jh{margin-top:8px;margin-right:-1px}.number-0.svelte-wwx9jh.svelte-wwx9jh{width:19px;height:26px;margin-left:1px}.small.svelte-wwx9jh .number-0.svelte-wwx9jh{width:18px;height:24px;margin-left:0px;transform:scale(calc(18 / 19), calc(24 / 26))}.number-1.svelte-wwx9jh.svelte-wwx9jh{width:14px;height:26px;margin-left:4px}.small.svelte-wwx9jh .number-1.svelte-wwx9jh{width:13px;height:24px;margin-left:3px;transform:scale(calc(13 / 14), calc(24 / 26))}.number-2.svelte-wwx9jh.svelte-wwx9jh{width:18px;height:26px;margin-left:1px}.small.svelte-wwx9jh .number-2.svelte-wwx9jh{width:17px;height:24px;margin-left:0px;transform:scale(calc(17 / 18), calc(24 / 26))}.number-3.svelte-wwx9jh.svelte-wwx9jh{width:17px;height:26px;margin-left:2px}.small.svelte-wwx9jh .number-3.svelte-wwx9jh{width:16px;height:24px;margin-left:1px;transform:scale(calc(16 / 17), calc(24 / 26))}.number-4.svelte-wwx9jh.svelte-wwx9jh{width:20px;height:26px;margin-left:1px}.small.svelte-wwx9jh .number-4.svelte-wwx9jh{width:19px;height:24px;margin-left:0px;transform:scale(calc(19 / 20), calc(24 / 26))}.number-5.svelte-wwx9jh.svelte-wwx9jh{width:17px;height:26px;margin-left:2px}.small.svelte-wwx9jh .number-5.svelte-wwx9jh{width:16px;height:24px;margin-left:1px;transform:scale(calc(16 / 17), calc(24 / 26))}.number-6.svelte-wwx9jh.svelte-wwx9jh{width:18px;height:26px;margin-left:1px}.small.svelte-wwx9jh .number-6.svelte-wwx9jh{width:17px;height:24px;margin-left:0px;transform:scale(calc(17 / 18), calc(24 / 26))}.number-7.svelte-wwx9jh.svelte-wwx9jh{width:18px;height:26px;margin-left:2px}.small.svelte-wwx9jh .number-7.svelte-wwx9jh{width:17px;height:24px;margin-left:1px;transform:scale(calc(17 / 18), calc(24 / 26))}.number-8.svelte-wwx9jh.svelte-wwx9jh{width:19px;height:26px;margin-left:1px}.small.svelte-wwx9jh .number-8.svelte-wwx9jh{width:18px;height:24px;margin-left:0px;transform:scale(calc(18 / 19), calc(24 / 26))}.number-9.svelte-wwx9jh.svelte-wwx9jh{width:19px;height:26px;margin-left:1px}.small.svelte-wwx9jh .number-9.svelte-wwx9jh{width:18px;height:24px;margin-left:0px;transform:scale(calc(18 / 19), calc(24 / 26))}.incline.svelte-wwx9jh .plus.svelte-wwx9jh{background-image:url(../images/summary/incline/plus.png)}.incline.svelte-wwx9jh .number-0.svelte-wwx9jh{background-image:url(../images/summary/incline/0.png)}.incline.svelte-wwx9jh .number-1.svelte-wwx9jh{background-image:url(../images/summary/incline/1.png)}.incline.svelte-wwx9jh .number-2.svelte-wwx9jh{background-image:url(../images/summary/incline/2.png)}.incline.svelte-wwx9jh .number-3.svelte-wwx9jh{background-image:url(../images/summary/incline/3.png)}.incline.svelte-wwx9jh .number-4.svelte-wwx9jh{background-image:url(../images/summary/incline/4.png)}.incline.svelte-wwx9jh .number-5.svelte-wwx9jh{background-image:url(../images/summary/incline/5.png)}.incline.svelte-wwx9jh .number-6.svelte-wwx9jh{background-image:url(../images/summary/incline/6.png)}.incline.svelte-wwx9jh .number-7.svelte-wwx9jh{background-image:url(../images/summary/incline/7.png)}.incline.svelte-wwx9jh .number-8.svelte-wwx9jh{background-image:url(../images/summary/incline/8.png)}.incline.svelte-wwx9jh .number-9.svelte-wwx9jh{background-image:url(../images/summary/incline/9.png)}.decline.svelte-wwx9jh .minus.svelte-wwx9jh{background-image:url(../images/summary/decline/minus.png)}.decline.svelte-wwx9jh .number-0.svelte-wwx9jh{background-image:url(../images/summary/decline/0.png)}.decline.svelte-wwx9jh .number-1.svelte-wwx9jh{background-image:url(../images/summary/decline/1.png)}.decline.svelte-wwx9jh .number-2.svelte-wwx9jh{background-image:url(../images/summary/decline/2.png)}.decline.svelte-wwx9jh .number-3.svelte-wwx9jh{background-image:url(../images/summary/decline/3.png)}.decline.svelte-wwx9jh .number-4.svelte-wwx9jh{background-image:url(../images/summary/decline/4.png)}.decline.svelte-wwx9jh .number-5.svelte-wwx9jh{background-image:url(../images/summary/decline/5.png)}.decline.svelte-wwx9jh .number-6.svelte-wwx9jh{background-image:url(../images/summary/decline/6.png)}.decline.svelte-wwx9jh .number-7.svelte-wwx9jh{background-image:url(../images/summary/decline/7.png)}.decline.svelte-wwx9jh .number-8.svelte-wwx9jh{background-image:url(../images/summary/decline/8.png)}.decline.svelte-wwx9jh .number-9.svelte-wwx9jh{background-image:url(../images/summary/decline/9.png)}",
  map: null
};
function getLetterName(letter) {
  switch (letter) {
    case "+":
      return "plus";
    case "-":
      return "minus";
    default:
      return `number-${letter}`;
  }
}
const Incline = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let inclineString;
  let type;
  let small;
  let { incline } = $$props;
  if ($$props.incline === void 0 && $$bindings.incline && incline !== void 0)
    $$bindings.incline(incline);
  $$result.css.add(css$h);
  inclineString = (incline > 0 ? "+" : "") + incline.toString();
  type = incline >= 0 ? "incline" : "decline";
  small = Math.abs(incline) >= 1e7;
  return `<div class="diff svelte-wwx9jh"><div class="text svelte-wwx9jh">공격력 증가량</div>
	<div class="${[escape(null_to_empty(type), true) + " svelte-wwx9jh", small ? "small" : ""].join(" ").trim()}">${each(inclineString, (letter) => {
    return `<div class="${"letter " + escape(getLetterName(letter), true) + " svelte-wwx9jh"}"></div>`;
  })}</div>
</div>`;
});
const JobReq_svelte_svelte_type_style_lang = "";
const css$g = {
  code: ".job-frame.svelte-tjj7zv{display:flex;flex-direction:column;background-image:url(../images/job/normal.png);width:237px;height:24px}.job-frame.expand.svelte-tjj7zv{background-image:url(../images/job/expand.png);width:237px;height:40px}.job-branch.svelte-tjj7zv{display:grid;padding-top:7px;padding-left:15px;grid-template-columns:45px 33px 44px 34px 33px 33px}.spec-job.svelte-tjj7zv{align-self:center;margin-top:6px;font-size:11px;letter-spacing:normal;font-family:돋움;color:var(--gear-orange2)}.job-0.svelte-tjj7zv{width:31px;height:10px}.job-1.svelte-tjj7zv{width:19px;height:10px}.job-2.svelte-tjj7zv{width:30px;height:10px}.job-3.svelte-tjj7zv{width:20px;height:10px}.job-4.svelte-tjj7zv{width:19px;height:10px}.job-5.svelte-tjj7zv{width:18px;height:10px}.job-0.enable.svelte-tjj7zv{background-image:url(../images/job/enable/0.png)}.job-1.enable.svelte-tjj7zv{background-image:url(../images/job/enable/1.png)}.job-2.enable.svelte-tjj7zv{background-image:url(../images/job/enable/2.png)}.job-3.enable.svelte-tjj7zv{background-image:url(../images/job/enable/3.png)}.job-4.enable.svelte-tjj7zv{background-image:url(../images/job/enable/4.png)}.job-5.enable.svelte-tjj7zv{background-image:url(../images/job/enable/5.png)}.job-0.disable.svelte-tjj7zv{background-image:url(../images/job/disable/0.png)}.job-1.disable.svelte-tjj7zv{background-image:url(../images/job/disable/1.png)}.job-2.disable.svelte-tjj7zv{background-image:url(../images/job/disable/2.png)}.job-3.disable.svelte-tjj7zv{background-image:url(../images/job/disable/3.png)}.job-4.disable.svelte-tjj7zv{background-image:url(../images/job/disable/4.png)}.job-5.disable.svelte-tjj7zv{background-image:url(../images/job/disable/5.png)}",
  map: null
};
function getEnableStates(reqJob2, job) {
  const enable = [];
  for (let i = 0; i <= 5; i++) {
    if (i === 0) {
      enable.push(reqJob2 <= 0);
      if (reqJob2 === 0)
        reqJob2 = 31;
      if (reqJob2 === -1)
        reqJob2 = 0;
    } else {
      enable.push((reqJob2 & 1 << i - 1) !== 0);
    }
  }
  return enable.map((enabled, i) => enabled ? checkJobReq(job, i) ? "enable" : "disable" : "");
}
function checkJobReq(job, jobIndex) {
  if (jobIndex === 0)
    return true;
  return (job & 1 << jobIndex - 1) !== 0;
}
const JobReq = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let extraReq;
  let { gearType } = $$props;
  let { reqJob } = $$props;
  let { reqSpecJob } = $$props;
  let { characterJob } = $$props;
  function getExtraReq(gearType2, specJob) {
    let req = getExtraJobReqString(gearType2);
    if (req === "") {
      req = getExtraJobReqStringByJob(specJob);
    }
    return req;
  }
  if ($$props.gearType === void 0 && $$bindings.gearType && gearType !== void 0)
    $$bindings.gearType(gearType);
  if ($$props.reqJob === void 0 && $$bindings.reqJob && reqJob !== void 0)
    $$bindings.reqJob(reqJob);
  if ($$props.reqSpecJob === void 0 && $$bindings.reqSpecJob && reqSpecJob !== void 0)
    $$bindings.reqSpecJob(reqSpecJob);
  if ($$props.characterJob === void 0 && $$bindings.characterJob && characterJob !== void 0)
    $$bindings.characterJob(characterJob);
  $$result.css.add(css$g);
  extraReq = getExtraReq(gearType, reqSpecJob);
  return `<div class="${["job-frame svelte-tjj7zv", extraReq !== "" ? "expand" : ""].join(" ").trim()}"><div class="job-branch svelte-tjj7zv">${each(getEnableStates(reqJob, characterJob), (enable, index) => {
    return `<span class="${"job-" + escape(index, true) + " " + escape(enable, true) + " svelte-tjj7zv"}"></span>`;
  })}</div>
	${extraReq !== "" ? `<div class="spec-job svelte-tjj7zv">${escape(extraReq)}</div>` : ``}
</div>`;
});
const Option_svelte_svelte_type_style_lang = "";
const css$f = {
  code: ".option.svelte-1m6n3sm{line-height:15px;font-size:11px;letter-spacing:normal;font-family:돋움;color:var(--gear-white)}.option.svelte-1m6n3sm .orange{color:var(--gear-orange)}.option.svelte-1m6n3sm .blue{color:var(--gear-blue)}.option.svelte-1m6n3sm .green{color:var(--gear-green)}.option.svelte-1m6n3sm .red{color:var(--gear-red)}.option.svelte-1m6n3sm .purple2{color:var(--gear-purple2)}.option.svelte-1m6n3sm .orange2{color:var(--gear-orange2)}",
  map: null
};
const Option = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { type } = $$props;
  let { option } = $$props;
  let { amazing } = $$props;
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.option === void 0 && $$bindings.option && option !== void 0)
    $$bindings.option(option);
  if ($$props.amazing === void 0 && $$bindings.amazing && amazing !== void 0)
    $$bindings.amazing(amazing);
  $$result.css.add(css$f);
  return `<div class="option svelte-1m6n3sm"><!-- HTML_TAG_START -->${parseColorString(getGearOptionString(type, option, amazing))}<!-- HTML_TAG_END -->
</div>`;
});
const Potential_svelte_svelte_type_style_lang = "";
const css$e = {
  code: ".text.svelte-g8fdnv.svelte-g8fdnv{display:flex;line-height:15px;font-size:11px;font-family:돋움;letter-spacing:normal;color:var(--gear-white)}.rare.svelte-g8fdnv.svelte-g8fdnv{color:var(--gear-blue)}.epic.svelte-g8fdnv.svelte-g8fdnv{color:var(--gear-purple)}.unique.svelte-g8fdnv.svelte-g8fdnv{color:var(--gear-orange2)}.legendary.svelte-g8fdnv.svelte-g8fdnv{color:var(--gear-green)}.icon.svelte-g8fdnv.svelte-g8fdnv{width:13px;height:13px;margin-left:-4px;margin-right:5px}.rare.svelte-g8fdnv .icon.svelte-g8fdnv{background-image:url(../images/potential/rare.png)}.epic.svelte-g8fdnv .icon.svelte-g8fdnv{background-image:url(../images/potential/epic.png)}.unique.svelte-g8fdnv .icon.svelte-g8fdnv{background-image:url(../images/potential/unique.png)}.legendary.svelte-g8fdnv .icon.svelte-g8fdnv{background-image:url(../images/potential/legendary.png)}",
  map: null
};
const Potential_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { additional = false } = $$props;
  let { grade } = $$props;
  let { potentials } = $$props;
  function getGradeName(grade2) {
    switch (grade2) {
      case PotentialGrade.rare:
        return "rare";
      case PotentialGrade.epic:
        return "epic";
      case PotentialGrade.unique:
        return "unique";
      case PotentialGrade.legendary:
        return "legendary";
      default:
        return "";
    }
  }
  if ($$props.additional === void 0 && $$bindings.additional && additional !== void 0)
    $$bindings.additional(additional);
  if ($$props.grade === void 0 && $$bindings.grade && grade !== void 0)
    $$bindings.grade(grade);
  if ($$props.potentials === void 0 && $$bindings.potentials && potentials !== void 0)
    $$bindings.potentials(potentials);
  $$result.css.add(css$e);
  return `<div class="${"text " + escape(getGradeName(grade), true) + " svelte-g8fdnv"}"><span class="icon svelte-g8fdnv"></span>
	${additional ? `에디셔널 잠재옵션` : `잠재옵션`}</div>
${each(potentials, (potential) => {
    return `${potential && potential.summary.length > 0 ? `<div class="text svelte-g8fdnv">${additional ? `+ ${escape(potential.convertSummary)}` : `${escape(potential.convertSummary)}`}
		</div>` : ``}`;
  })}`;
});
const Req_svelte_svelte_type_style_lang = "";
const css$d = {
  code: ".req.svelte-1rs9z10{display:grid;padding-left:3px;margin-top:4px;grid-template-rows:15px 9px 9px;grid-template-columns:80px 74px}.req-item.svelte-1rs9z10{display:flex;flex-direction:row;column-gap:1px}.req-lev.svelte-1rs9z10{grid-column:1 / 3}.lev.svelte-1rs9z10{width:49px;height:6px;margin-right:4px}.str.svelte-1rs9z10,.dex.svelte-1rs9z10,.int.svelte-1rs9z10,.luk.svelte-1rs9z10{width:50px;height:6px;margin-right:3px}.number-0.svelte-1rs9z10{width:5px;height:5px}.number-1.svelte-1rs9z10{width:2px;height:5px}.number-1.extra-gap.svelte-1rs9z10{margin-left:1px}.number-2.svelte-1rs9z10{width:5px;height:5px}.number-3.svelte-1rs9z10{width:5px;height:5px}.number-4.svelte-1rs9z10{width:5px;height:5px}.number-5.svelte-1rs9z10{width:5px;height:5px}.number-6.svelte-1rs9z10{width:5px;height:5px}.number-7.svelte-1rs9z10{width:4px;height:5px}.number-8.svelte-1rs9z10{width:5px;height:5px}.number-9.svelte-1rs9z10{width:5px;height:5px}.number-x.svelte-1rs9z10{width:5px;height:5px}.open.svelte-1rs9z10{width:2px;height:5px;margin-left:2px}.close.svelte-1rs9z10{width:2px;height:5px}.plus.svelte-1rs9z10{width:5px;height:5px}.minus.svelte-1rs9z10{width:5px;height:1px;margin-top:2px}.can.lev.svelte-1rs9z10{background-image:url(../images/can/reqLEV.png)}.can.str.svelte-1rs9z10{background-image:url(../images/can/reqSTR.png)}.can.dex.svelte-1rs9z10{background-image:url(../images/can/reqDEX.png)}.can.int.svelte-1rs9z10{background-image:url(../images/can/reqINT.png)}.can.luk.svelte-1rs9z10{background-image:url(../images/can/reqLUK.png)}.cannot.lev.svelte-1rs9z10{background-image:url(../images/cannot/reqLEV.png)}.cannot.str.svelte-1rs9z10{background-image:url(../images/cannot/reqSTR.png)}.cannot.dex.svelte-1rs9z10{background-image:url(../images/cannot/reqDEX.png)}.cannot.int.svelte-1rs9z10{background-image:url(../images/cannot/reqINT.png)}.cannot.luk.svelte-1rs9z10{background-image:url(../images/cannot/reqLUK.png)}.disabled.lev.svelte-1rs9z10{background-image:url(../images/disabled/reqLEV.png)}.disabled.str.svelte-1rs9z10{background-image:url(../images/disabled/reqSTR.png)}.disabled.dex.svelte-1rs9z10{background-image:url(../images/disabled/reqDEX.png)}.disabled.int.svelte-1rs9z10{background-image:url(../images/disabled/reqINT.png)}.disabled.luk.svelte-1rs9z10{background-image:url(../images/disabled/reqLUK.png)}.can.number-0.svelte-1rs9z10{background-image:url(../images/can/0.png)}.can.number-1.svelte-1rs9z10{background-image:url(../images/can/1.png)}.can.number-2.svelte-1rs9z10{background-image:url(../images/can/2.png)}.can.number-3.svelte-1rs9z10{background-image:url(../images/can/3.png)}.can.number-4.svelte-1rs9z10{background-image:url(../images/can/4.png)}.can.number-5.svelte-1rs9z10{background-image:url(../images/can/5.png)}.can.number-6.svelte-1rs9z10{background-image:url(../images/can/6.png)}.can.number-7.svelte-1rs9z10{background-image:url(../images/can/7.png)}.can.number-8.svelte-1rs9z10{background-image:url(../images/can/8.png)}.can.number-9.svelte-1rs9z10{background-image:url(../images/can/9.png)}.can.open.svelte-1rs9z10{background-image:url(../images/can/open.png)}.can.close.svelte-1rs9z10{background-image:url(../images/can/close.png)}.cannot.number-0.svelte-1rs9z10{background-image:url(../images/cannot/0.png)}.cannot.number-1.svelte-1rs9z10{background-image:url(../images/cannot/1.png)}.cannot.number-2.svelte-1rs9z10{background-image:url(../images/cannot/2.png)}.cannot.number-3.svelte-1rs9z10{background-image:url(../images/cannot/3.png)}.cannot.number-4.svelte-1rs9z10{background-image:url(../images/cannot/4.png)}.cannot.number-5.svelte-1rs9z10{background-image:url(../images/cannot/5.png)}.cannot.number-6.svelte-1rs9z10{background-image:url(../images/cannot/6.png)}.cannot.number-7.svelte-1rs9z10{background-image:url(../images/cannot/7.png)}.cannot.number-8.svelte-1rs9z10{background-image:url(../images/cannot/8.png)}.cannot.number-9.svelte-1rs9z10{background-image:url(../images/cannot/9.png)}.disabled.number-0.svelte-1rs9z10{background-image:url(../images/disabled/0.png)}.disabled.number-1.svelte-1rs9z10{background-image:url(../images/disabled/1.png)}.disabled.number-2.svelte-1rs9z10{background-image:url(../images/disabled/2.png)}.disabled.number-3.svelte-1rs9z10{background-image:url(../images/disabled/3.png)}.disabled.number-4.svelte-1rs9z10{background-image:url(../images/disabled/4.png)}.disabled.number-5.svelte-1rs9z10{background-image:url(../images/disabled/5.png)}.disabled.number-6.svelte-1rs9z10{background-image:url(../images/disabled/6.png)}.disabled.number-7.svelte-1rs9z10{background-image:url(../images/disabled/7.png)}.disabled.number-8.svelte-1rs9z10{background-image:url(../images/disabled/8.png)}.disabled.number-9.svelte-1rs9z10{background-image:url(../images/disabled/9.png)}.yellowNumber.number-0.svelte-1rs9z10{background-image:url(../images/yellowNumber/0.png)}.yellowNumber.number-1.svelte-1rs9z10{background-image:url(../images/yellowNumber/1.png)}.yellowNumber.number-2.svelte-1rs9z10{background-image:url(../images/yellowNumber/2.png)}.yellowNumber.number-3.svelte-1rs9z10{background-image:url(../images/yellowNumber/3.png)}.yellowNumber.number-4.svelte-1rs9z10{background-image:url(../images/yellowNumber/4.png)}.yellowNumber.number-5.svelte-1rs9z10{background-image:url(../images/yellowNumber/5.png)}.yellowNumber.number-6.svelte-1rs9z10{background-image:url(../images/yellowNumber/6.png)}.yellowNumber.number-7.svelte-1rs9z10{background-image:url(../images/yellowNumber/7.png)}.yellowNumber.number-8.svelte-1rs9z10{background-image:url(../images/yellowNumber/8.png)}.yellowNumber.number-9.svelte-1rs9z10{background-image:url(../images/yellowNumber/9.png)}.yellowNumber.minus.svelte-1rs9z10{background-image:url(../images/yellowNumber/minus.png)}.yellowNumber.plus.svelte-1rs9z10{background-image:url(../images/yellowNumber/plus.png)}",
  map: null
};
function getCanState(req2, value) {
  if (req2 <= 0)
    return "disabled";
  else if (value >= req2)
    return "can";
  else
    return "cannot";
}
const Req = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let reqLevel;
  let can;
  let { req } = $$props;
  let { reduceReq = 0 } = $$props;
  let { characterLevel } = $$props;
  let { characterSTR } = $$props;
  let { characterDEX } = $$props;
  let { characterINT } = $$props;
  let { characterLUK } = $$props;
  if ($$props.req === void 0 && $$bindings.req && req !== void 0)
    $$bindings.req(req);
  if ($$props.reduceReq === void 0 && $$bindings.reduceReq && reduceReq !== void 0)
    $$bindings.reduceReq(reduceReq);
  if ($$props.characterLevel === void 0 && $$bindings.characterLevel && characterLevel !== void 0)
    $$bindings.characterLevel(characterLevel);
  if ($$props.characterSTR === void 0 && $$bindings.characterSTR && characterSTR !== void 0)
    $$bindings.characterSTR(characterSTR);
  if ($$props.characterDEX === void 0 && $$bindings.characterDEX && characterDEX !== void 0)
    $$bindings.characterDEX(characterDEX);
  if ($$props.characterINT === void 0 && $$bindings.characterINT && characterINT !== void 0)
    $$bindings.characterINT(characterINT);
  if ($$props.characterLUK === void 0 && $$bindings.characterLUK && characterLUK !== void 0)
    $$bindings.characterLUK(characterLUK);
  $$result.css.add(css$d);
  reduceReq = Math.min(reduceReq, req.level);
  reqLevel = req.level - reduceReq;
  can = {
    lev: getCanState(reqLevel, characterLevel),
    str: getCanState(req.str, characterSTR),
    dex: getCanState(req.dex, characterDEX),
    int: getCanState(req.int, characterINT),
    luk: getCanState(req.luk, characterLUK)
  };
  return `<ul class="req svelte-1rs9z10"><li class="req-item req-lev svelte-1rs9z10"><span class="${"lev " + escape(can.lev, true) + " svelte-1rs9z10"}"></span>
		${each(reqLevel.toString().padStart(3, "x"), (num) => {
    return `<span class="${[
      "number-" + escape(num, true) + " " + escape(can.lev, true) + " svelte-1rs9z10",
      can.lev === "can" ? "yellowNumber" : ""
    ].join(" ").trim()}"></span>`;
  })}
		${reduceReq > 0 ? `<span class="open can svelte-1rs9z10"></span>
			${each(req.level.toString(), (num) => {
    return `<span class="${"number-" + escape(num, true) + " can extra-gap svelte-1rs9z10"}"></span>`;
  })}
			<span class="minus yellowNumber svelte-1rs9z10"></span>
			${each(reduceReq.toString(), (num) => {
    return `<span class="${"number-" + escape(num, true) + " yellowNumber extra-gap svelte-1rs9z10"}"></span>`;
  })}
			<span class="close can svelte-1rs9z10"></span>` : ``}</li>
	<li class="req-item svelte-1rs9z10"><span class="${"str " + escape(can.str, true) + " svelte-1rs9z10"}"></span>
		${each(req.str.toString().padStart(3, "0"), (num) => {
    return `<span class="${"number-" + escape(num, true) + " " + escape(can.str, true) + " svelte-1rs9z10"}"></span>`;
  })}</li>
	<li class="req-item svelte-1rs9z10"><span class="${"luk " + escape(can.luk, true) + " svelte-1rs9z10"}"></span>
		${each(req.luk.toString().padStart(3, "0"), (num) => {
    return `<span class="${"number-" + escape(num, true) + " " + escape(can.luk, true) + " svelte-1rs9z10"}"></span>`;
  })}</li>
	<li class="req-item svelte-1rs9z10"><span class="${"dex " + escape(can.dex, true) + " svelte-1rs9z10"}"></span>
		${each(req.dex.toString().padStart(3, "0"), (num) => {
    return `<span class="${"number-" + escape(num, true) + " " + escape(can.dex, true) + " svelte-1rs9z10"}"></span>`;
  })}</li>
	<li class="req-item svelte-1rs9z10"><span class="${"int " + escape(can.int, true) + " svelte-1rs9z10"}"></span>
		${each(req.int.toString().padStart(3, "0"), (num) => {
    return `<span class="${"number-" + escape(num, true) + " " + escape(can.int, true) + " svelte-1rs9z10"}"></span>`;
  })}</li>
</ul>`;
});
const Soul_svelte_svelte_type_style_lang = "";
const css$c = {
  code: ".text.svelte-83udn3{display:flex;line-height:16px;font-size:12px;font-family:돋움;letter-spacing:normal}.white.svelte-83udn3{color:var(--gear-white)}.yellow.svelte-83udn3{color:var(--gear-yellow)}.gray.svelte-83udn3{color:var(--gear-gray)}.orange3.svelte-83udn3{color:var(--gear-orange3)}",
  map: null
};
const Soul = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let chargeColor;
  let { soul } = $$props;
  let { charge } = $$props;
  let { pad } = $$props;
  let { mad } = $$props;
  if ($$props.soul === void 0 && $$bindings.soul && soul !== void 0)
    $$bindings.soul(soul);
  if ($$props.charge === void 0 && $$bindings.charge && charge !== void 0)
    $$bindings.charge(charge);
  if ($$props.pad === void 0 && $$bindings.pad && pad !== void 0)
    $$bindings.pad(pad);
  if ($$props.mad === void 0 && $$bindings.mad && mad !== void 0)
    $$bindings.mad(mad);
  $$result.css.add(css$c);
  chargeColor = charge > 0 ? "white" : "gray";
  return `${soul ? `<div class="text yellow svelte-83udn3">${escape(soul.name)} 적용
	</div>` : ``}
	<div class="${"text " + escape(chargeColor, true) + " svelte-83udn3"}">소울 충전량 ${escape(charge)}/1000 (공:+${escape(pad)},마:+${escape(mad)})
	</div>
${soul ? `<div class="text white svelte-83udn3">${escape(getSoulOptionString(soul.option))}</div>
    <div class="text orange3 svelte-83udn3">소울 충전 시 &#39;${escape(soul.skill)}&#39; 사용가능</div>` : `<div class="text gray svelte-83udn3">소울 충전 시 &#39;---&#39; 사용가능</div>`}`;
});
const Star_svelte_svelte_type_style_lang = "";
const css$b = {
  code: ".star-line.svelte-evxu12{display:flex;flex-direction:row;height:18px}.star-line.svelte-evxu12:last-child{height:16px}.star.svelte-evxu12{width:11px;height:10px;margin-right:-1px}.star.svelte-evxu12:nth-child(5n){margin-right:5px}.star.svelte-evxu12:last-child{margin-right:0px}.star.yellow.svelte-evxu12{background-image:url(../images/star/yellow.png)}.star.blue.svelte-evxu12{background-image:url(../images/star/blue.png)}.star.empty.svelte-evxu12{background-image:url(../images/star/empty.png)}",
  map: null
};
function getStars(maxStar2, star2, amazing2) {
  const color = amazing2 ? "blue" : "yellow";
  return Array.from(Array(maxStar2), (_, i) => i < star2 ? color : "empty");
}
const Star = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let lineCount;
  let stars;
  let { star } = $$props;
  let { maxStar } = $$props;
  let { amazing = false } = $$props;
  if ($$props.star === void 0 && $$bindings.star && star !== void 0)
    $$bindings.star(star);
  if ($$props.maxStar === void 0 && $$bindings.maxStar && maxStar !== void 0)
    $$bindings.maxStar(maxStar);
  if ($$props.amazing === void 0 && $$bindings.amazing && amazing !== void 0)
    $$bindings.amazing(amazing);
  $$result.css.add(css$b);
  maxStar = Math.max(maxStar, star);
  lineCount = Math.ceil(maxStar / 15);
  stars = getStars(maxStar, star, amazing);
  return `${each({ length: lineCount }, (_, i) => {
    return `<div class="star-line svelte-evxu12">${each(stars.slice(i * 15, (i + 1) * 15), (star2) => {
      return `<div class="${"star " + escape(star2, true) + " svelte-evxu12"}"></div>`;
    })}
	</div>`;
  })}`;
});
const Tuc_svelte_svelte_type_style_lang = "";
const css$a = {
  code: ".text.svelte-d28eud.svelte-d28eud{line-height:15px;font-size:11px;font-family:돋움;letter-spacing:normal;color:var(--gear-white)}.text.svelte-d28eud .orange2.svelte-d28eud{color:var(--gear-orange2)}",
  map: null
};
const Tuc = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { canUpgrade } = $$props;
  let { upgradeCountLeft } = $$props;
  let { upgradeFailCount } = $$props;
  if ($$props.canUpgrade === void 0 && $$bindings.canUpgrade && canUpgrade !== void 0)
    $$bindings.canUpgrade(canUpgrade);
  if ($$props.upgradeCountLeft === void 0 && $$bindings.upgradeCountLeft && upgradeCountLeft !== void 0)
    $$bindings.upgradeCountLeft(upgradeCountLeft);
  if ($$props.upgradeFailCount === void 0 && $$bindings.upgradeFailCount && upgradeFailCount !== void 0)
    $$bindings.upgradeFailCount(upgradeFailCount);
  $$result.css.add(css$a);
  return `${canUpgrade ? `<div class="text svelte-d28eud">업그레이드 가능 횟수 : ${escape(upgradeCountLeft)}
		<span class="orange2 svelte-d28eud">(복구 가능 횟수 : ${escape(upgradeFailCount)})</span></div>` : `<div class="text svelte-d28eud">강화불가</div>`}`;
});
const GearTooltip_svelte_svelte_type_style_lang = "";
const css$9 = {
  code: "@import 'colors.css';.gear-tooltip.svelte-1w2w9ju{width:261px;position:relative;image-rendering:pixelated}.main.svelte-1w2w9ju{display:flex;flex-direction:column;align-items:center;padding-bottom:4px}.title-area.svelte-1w2w9ju{display:flex;flex-direction:column;margin-top:-2px;align-items:center}.icon-area.svelte-1w2w9ju{box-sizing:border-box;display:grid;margin-top:7px;width:100%;padding-left:12px;padding-right:8px;grid-template-columns:82px 159px;grid-template-rows:44px 36px;row-gap:2px}.icon-wrapper.svelte-1w2w9ju{grid-column:1;grid-row-start:1;grid-row-end:3;margin-top:1px}.diff-wrapper.svelte-1w2w9ju{align-self:flex-start;margin-top:3px;margin-left:12px}.job-wrapper.svelte-1w2w9ju{margin-top:3px}.item-detail.svelte-1w2w9ju{width:100%;box-sizing:border-box;margin-top:4px;margin-bottom:8px;padding-left:13px;padding-right:13px}.part.svelte-1w2w9ju{width:100%;box-sizing:border-box;margin-top:4px;padding-left:13px;padding-right:13px}.part.desc.svelte-1w2w9ju{padding-left:10px;padding-right:17px}.part.anvil.svelte-1w2w9ju{margin-top:0px}.title.svelte-1w2w9ju{line-height:19px;font-size:14px;font-family:돋움;font-weight:bold;white-space:pre;letter-spacing:normal}.text.svelte-1w2w9ju{line-height:15px;font-size:11px;font-family:돋움;white-space:pre-wrap;letter-spacing:normal}.gray.svelte-1w2w9ju{color:var(--gear-gray)}.orange2.svelte-1w2w9ju{color:var(--gear-orange2)}.white.svelte-1w2w9ju{color:var(--gear-white)}.blue.svelte-1w2w9ju{color:var(--gear-blue)}.purple.svelte-1w2w9ju{color:var(--gear-purple)}.orange2.svelte-1w2w9ju{color:var(--gear-orange2)}.green.svelte-1w2w9ju{color:var(--gear-green)}.red.svelte-1w2w9ju{color:var(--gear-red)}.frame-top.svelte-1w2w9ju{background-image:url(images/frame/top.png);width:261px;height:13px}.frame-line.svelte-1w2w9ju{background-image:url(images/frame/line.png);width:261px}.frame-bottom.svelte-1w2w9ju{background-image:url(images/frame/bottom.png);width:261px;height:13px}.frame-cover.svelte-1w2w9ju{background-image:url(images/frame/cover.png);width:53px;height:43px;position:absolute;top:0;left:0}.dotline.svelte-1w2w9ju{background-image:url(images/frame/dotline.png);width:261px;height:2px;margin:0;border:none}",
  map: null
};
function getSortedOptions(gear2) {
  return [...gear2.options].sort((a, b) => a[0] - b[0]).filter((kv) => kv[1].sum != 0).map((kv) => ({ type: kv[0], option: kv[1] }));
}
const GearTooltip = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let gearName;
  let icon;
  let superior;
  let desc;
  let { gear: gear2 } = $$props;
  let { characterLevel = 300 } = $$props;
  let { characterSTR = 900 } = $$props;
  let { characterDEX = 900 } = $$props;
  let { characterINT = 900 } = $$props;
  let { characterLUK = 900 } = $$props;
  let { characterJob = 31 } = $$props;
  let { incline = 0 } = $$props;
  let { pddDiff = 0 } = $$props;
  let { bdrDiff = 0 } = $$props;
  let { imdrDiff = 0 } = $$props;
  let { ref = void 0 } = $$props;
  let { iconSrc = "https://maplestory.io/api/KMS/367/item/{}/icon" } = $$props;
  function getDescs(gear22) {
    const desc2 = [];
    let value;
    if (gear22.desc.length > 0) {
      desc2.push(gear22.desc);
    }
    if (gear22.getPropValue(GearPropType.tradeBlock) > 0 && (value = gear22.getPropValue(GearPropType.tradeAvailable)) > 0) {
      desc2.push(getGearPropString(GearPropType.tradeAvailable, value));
    }
    if ((value = gear22.getPropValue(GearPropType.accountShareTag)) > 0) {
      desc2.push(getGearPropString(GearPropType.accountShareTag, value));
    }
    if ((value = gear22.getPropValue(GearPropType.jokerToSetItem)) > 0) {
      desc2.push(getGearPropString(GearPropType.jokerToSetItem, value));
    }
    const traits = [
      [GearPropType.charismaEXP, "카리스마"],
      [GearPropType.insightEXP, "통찰력"],
      [GearPropType.willEXP, "의지"],
      [GearPropType.craftEXP, "손재주"],
      [GearPropType.senseEXP, "감성"],
      [GearPropType.charmEXP, "매력"]
    ];
    let traitStr = "";
    for (const [type, name] of traits) {
      if ((value = gear22.getPropValue(type)) > 0) {
        traitStr += `, ${name} ${value}`;
      }
    }
    if (traitStr.length > 0) {
      const str = traitStr.substring(2);
      desc2.push(`#c장착 시 1회에 한해 ${str}의 경험치를 얻을 수 있습니다.(일일제한, 최대치 초과 시 제외)#`);
    }
    if (gear22.amazing && gear22.star > 0) {
      desc2.push("#c놀라운 장비강화 주문서가 사용되었습니다.#");
    }
    return desc2;
  }
  if ($$props.gear === void 0 && $$bindings.gear && gear2 !== void 0)
    $$bindings.gear(gear2);
  if ($$props.characterLevel === void 0 && $$bindings.characterLevel && characterLevel !== void 0)
    $$bindings.characterLevel(characterLevel);
  if ($$props.characterSTR === void 0 && $$bindings.characterSTR && characterSTR !== void 0)
    $$bindings.characterSTR(characterSTR);
  if ($$props.characterDEX === void 0 && $$bindings.characterDEX && characterDEX !== void 0)
    $$bindings.characterDEX(characterDEX);
  if ($$props.characterINT === void 0 && $$bindings.characterINT && characterINT !== void 0)
    $$bindings.characterINT(characterINT);
  if ($$props.characterLUK === void 0 && $$bindings.characterLUK && characterLUK !== void 0)
    $$bindings.characterLUK(characterLUK);
  if ($$props.characterJob === void 0 && $$bindings.characterJob && characterJob !== void 0)
    $$bindings.characterJob(characterJob);
  if ($$props.incline === void 0 && $$bindings.incline && incline !== void 0)
    $$bindings.incline(incline);
  if ($$props.pddDiff === void 0 && $$bindings.pddDiff && pddDiff !== void 0)
    $$bindings.pddDiff(pddDiff);
  if ($$props.bdrDiff === void 0 && $$bindings.bdrDiff && bdrDiff !== void 0)
    $$bindings.bdrDiff(bdrDiff);
  if ($$props.imdrDiff === void 0 && $$bindings.imdrDiff && imdrDiff !== void 0)
    $$bindings.imdrDiff(imdrDiff);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  if ($$props.iconSrc === void 0 && $$bindings.iconSrc && iconSrc !== void 0)
    $$bindings.iconSrc(iconSrc);
  $$result.css.add(css$9);
  gearName = `${gear2.name} ${gear2.upgradeCount > 0 ? `(+${gear2.upgradeCount})` : ""}`;
  icon = gear2.anvilIcon ?? gear2.icon;
  superior = gear2.getBooleanValue(GearPropType.superiorEqp);
  desc = getDescs(gear2);
  return `${gear2 ? `<div class="gear-tooltip svelte-1w2w9ju"${add_attribute("this", ref, 0)}><div class="frame-top svelte-1w2w9ju"></div>
		<div class="frame-line main svelte-1w2w9ju">${validate_component(Star, "Star").$$render(
    $$result,
    {
      star: gear2.star,
      maxStar: gear2.maxStar,
      amazing: gear2.amazing
    },
    {},
    {}
  )}

			<div class="title-area svelte-1w2w9ju">${gear2.soulWeapon.enchanted && gear2.soulWeapon.soul ? `<div class="title green svelte-1w2w9ju">${escape(gear2.soulWeapon.soul.name.replace(/소울$/, ""))}</div>` : ``}
				<div class="${"title " + escape(getGearNameColor(gear2), true) + " svelte-1w2w9ju"}">${escape(gearName)}</div></div>

			${gear2.grade > PotentialGrade.normal ? `${validate_component(GearGrade, "GearGrade").$$render(
    $$result,
    {
      grade: gear2.grade,
      specialGrade: gear2.getBooleanValue(GearPropType.specialGrade)
    },
    {},
    {}
  )}` : ``}
			${validate_component(Attributes, "Attributes").$$render($$result, { gear: gear2 }, {}, {})}

			<hr class="dotline svelte-1w2w9ju" style="margin-top: 10px">

			<div class="icon-area svelte-1w2w9ju"><div class="icon-wrapper svelte-1w2w9ju">${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      src: iconSrc.replace("{}", icon.id.toString()),
      origin: icon.origin,
      alt: gearName,
      grade: Math.max(gear2.grade, gear2.additionalGrade),
      newBonus: gear2.isNewBonusType
    },
    {},
    {}
  )}</div>
				${validate_component(Incline, "Incline").$$render($$result, { incline }, {}, {})}
				${validate_component(Req, "Req").$$render(
    $$result,
    {
      req: gear2.req,
      reduceReq: gear2.option(GearPropType.reduceReq).sum,
      characterLevel,
      characterSTR,
      characterDEX,
      characterINT,
      characterLUK
    },
    {},
    {}
  )}</div>
			<div class="diff-wrapper svelte-1w2w9ju">${validate_component(DiffExtra, "DiffExtra").$$render($$result, { pddDiff, bdrDiff, imdrDiff }, {}, {})}</div>
			<div class="job-wrapper svelte-1w2w9ju">${validate_component(JobReq, "JobReq").$$render(
    $$result,
    {
      gearType: gear2.type,
      reqJob: gear2.req.job,
      reqSpecJob: gear2.req.specJob,
      characterJob
    },
    {},
    {}
  )}</div>

			<hr class="dotline svelte-1w2w9ju" style="margin-top: 9px">

			<div class="item-detail svelte-1w2w9ju">${superior ? `<div class="text green svelte-1w2w9ju">슈페리얼</div>` : ``}
				${validate_component(GearType_1, "GearType").$$render(
    $$result,
    {
      type: gear2.type,
      attackSpeed: gear2.getPropValue(GearPropType.attackSpeed)
    },
    {},
    {}
  )}
				${each(getSortedOptions(gear2), (entry) => {
    return `${validate_component(Option, "Option").$$render(
      $$result,
      {
        type: entry.type,
        option: entry.option,
        amazing: gear2.amazing
      },
      {},
      {}
    )}`;
  })}
				${gear2.totalUpgradeCount > 0 ? `${validate_component(Tuc, "Tuc").$$render(
    $$result,
    {
      canUpgrade: !gear2.getBooleanValue(GearPropType.exceptUpgrade),
      upgradeCountLeft: gear2.upgradeCountLeft,
      upgradeFailCount: gear2.upgradeFailCount
    },
    {},
    {}
  )}` : ``}
				${gear2.hammerCount > 0 ? `<div class="text white svelte-1w2w9ju">황금망치 제련 적용</div>` : ``}
				${gear2.karma !== void 0 ? `<div class="text orange2 svelte-1w2w9ju">가위 사용 가능 횟수 : ${escape(gear2.karma)}회</div>` : ``}
				${!gear2.canPotential ? `<div class="text white svelte-1w2w9ju">잠재능력 설정 불가</div>` : ``}
				${gear2.getBooleanValue(GearPropType.fixedPotential) ? `<div class="text white svelte-1w2w9ju">에디셔널 잠재능력 설정 불가</div>` : ``}
				${superior ? `<div class="text green svelte-1w2w9ju">${escape(getGearPropString(GearPropType.superiorEqp, 1))}</div>` : ``}</div>

			${gear2.canPotential && gear2.grade > 0 && gear2.potentials.some((pot) => pot) ? `<hr class="dotline svelte-1w2w9ju" style="margin-top: 2px">
				<div class="potential part svelte-1w2w9ju">${validate_component(Potential_1, "Potential").$$render(
    $$result,
    {
      grade: gear2.grade,
      potentials: gear2.potentials
    },
    {},
    {}
  )}</div>` : ``}

			${gear2.canPotential && gear2.additionalGrade > 0 && gear2.additionalPotentials.some((pot) => pot) ? `<hr class="dotline svelte-1w2w9ju" style="margin-top: 2px">
				<div class="add-potential part svelte-1w2w9ju">${validate_component(Potential_1, "Potential").$$render(
    $$result,
    {
      additional: true,
      grade: gear2.additionalGrade,
      potentials: gear2.additionalPotentials
    },
    {},
    {}
  )}</div>` : ``}

			${gear2.soulWeapon.enchanted ? `<hr class="dotline svelte-1w2w9ju" style="margin-top: 2px">
				<div class="soul part svelte-1w2w9ju">${validate_component(Soul, "Soul").$$render(
    $$result,
    {
      soul: gear2.soulWeapon.soul,
      charge: gear2.soulWeapon.charge,
      pad: gear2.soulWeapon.chargeOption.get(GearPropType.incPAD) ?? 0,
      mad: gear2.soulWeapon.chargeOption.get(GearPropType.incMAD) ?? 0
    },
    {},
    {}
  )}</div>` : ``}

			${desc.length > 0 ? `<hr class="dotline svelte-1w2w9ju" style="margin-top: 2px">
				<div class="desc part svelte-1w2w9ju">${each(desc, (text) => {
    return `${validate_component(Desc, "Desc").$$render($$result, { text }, {}, {})}`;
  })}</div>` : ``}

			${gear2.anvilIcon && gear2.anvilName ? `<div class="anvil part svelte-1w2w9ju"><div class="text svelte-1w2w9ju">${escape(" ")}</div>
					<div class="text green svelte-1w2w9ju">신비의 모루에 의해 [${escape(gear2.anvilName)}]의 외형이 합성됨</div></div>` : ``}</div>
		<div class="frame-bottom svelte-1w2w9ju"></div>
		<div class="frame-cover svelte-1w2w9ju"></div></div>` : ``}`;
});
const all = "";
const global = "";
const AddGear_svelte_svelte_type_style_lang = "";
const css$8 = {
  code: ".add-item.svelte-1sqwbnf{display:flex;align-items:center;gap:var(--cds-spacing-05)}.row.svelte-1sqwbnf:not(.first){border-top:1px solid var(--cds-border-subtle)}",
  map: null
};
function buildIds() {
}
function search(datas2, word) {
  if (word.length < 1) {
    return [];
  }
  return datas2.filter((data) => match(data[1].name, word)).sort((a, b) => compare(a[1].name, b[1].name, word));
}
function match(haystack, word) {
  let j = 0;
  for (let i = 0; i < haystack.length && j < word.length; i++) {
    if (haystack[i] === word[j]) {
      j++;
    }
  }
  return j === word.length;
}
function compare(name1, name2, word) {
  const includes1 = name1.includes(word);
  const includes2 = name2.includes(word);
  if (includes1 && includes2)
    return 0;
  if (includes1)
    return -1;
  if (includes2)
    return 1;
  return 0;
}
function canJob(data, jobIndex) {
  if (data.req?.job) {
    if (jobIndex == 0) {
      return true;
    }
    const job2 = 1 << jobIndex - 1;
    return (data.req.job & job2) > 0;
  }
  return jobIndex === 0;
}
const AddGear = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let result;
  let filtered;
  let { selectedIds } = $$props;
  function resetSearchValue() {
    name = "";
  }
  function resetJob() {
    job = 0;
  }
  function resetIds() {
    selectedIds.clear();
    selectedIds = selectedIds;
  }
  let name = "";
  let job = 0;
  const datas = Object.entries(gearJson);
  if ($$props.selectedIds === void 0 && $$bindings.selectedIds && selectedIds !== void 0)
    $$bindings.selectedIds(selectedIds);
  if ($$props.resetSearchValue === void 0 && $$bindings.resetSearchValue && resetSearchValue !== void 0)
    $$bindings.resetSearchValue(resetSearchValue);
  if ($$props.resetJob === void 0 && $$bindings.resetJob && resetJob !== void 0)
    $$bindings.resetJob(resetJob);
  if ($$props.resetIds === void 0 && $$bindings.resetIds && resetIds !== void 0)
    $$bindings.resetIds(resetIds);
  if ($$props.buildIds === void 0 && $$bindings.buildIds && buildIds !== void 0)
    $$bindings.buildIds(buildIds);
  $$result.css.add(css$8);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    result = search(datas, name.trim());
    filtered = job > 0 ? result.filter((data) => canJob(data[1], job)) : result;
    $$rendered = `${validate_component(Search, "Search").$$render(
      $$result,
      { placeholder: "아이템 검색", value: name },
      {
        value: ($$value) => {
          name = $$value;
          $$settled = false;
        }
      },
      {}
    )}

${validate_component(ContentSwitcher, "ContentSwitcher").$$render(
      $$result,
      {
        style: "margin-top: var(--cds-spacing-05); margin-bottom: var(--cds-spacing-05)",
        selectedIndex: job
      },
      {
        selectedIndex: ($$value) => {
          job = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(Switch, "Switch").$$render($$result, { text: "전체" }, {}, {})}
	${validate_component(Switch, "Switch").$$render($$result, { text: "전사" }, {}, {})}
	${validate_component(Switch, "Switch").$$render($$result, { text: "마법사" }, {}, {})}
	${validate_component(Switch, "Switch").$$render($$result, { text: "궁수" }, {}, {})}
	${validate_component(Switch, "Switch").$$render($$result, { text: "도적" }, {}, {})}
	${validate_component(Switch, "Switch").$$render($$result, { text: "해적" }, {}, {})}`;
        }
      }
    )}

${filtered.length ? each(filtered, (data, i) => {
      return `<div class="${["row svelte-1sqwbnf", i === 0 ? "first" : ""].join(" ").trim()}">${validate_component(SelectableTile, "SelectableTile").$$render($$result, { selected: selectedIds.has(data[0]) }, {}, {
        default: () => {
          return `<div class="add-item svelte-1sqwbnf"><img src="${"https://maplestory.io/api/KMS/367/item/" + escape(data[0], true) + "/icon"}"${add_attribute("alt", data[1].name, 0)} style="${"margin-left: " + escape(1 - data[1].origin[0], true) + "px; margin-top: " + escape(33 - data[1].origin[1], true) + "px;"}">
				${escape(data[1].name)}</div>
		`;
        }
      })}
	</div>`;
    }) : `${name.length > 0 ? `<div>검색된 아이템이 없습니다.
	</div>` : `<div>검색어를 입력해 주세요.
	</div>`}`}`;
  } while (!$$settled);
  return $$rendered;
});
var stores = {};
function getStorage(type) {
  return type === "local" ? localStorage : sessionStorage;
}
function persisted(key, initialValue, options) {
  const serializer = (options == null ? void 0 : options.serializer) ?? JSON;
  const storageType = (options == null ? void 0 : options.storage) ?? "local";
  const browser = typeof window !== "undefined" && typeof document !== "undefined";
  function updateStorage(key2, value) {
    if (!browser)
      return;
    getStorage(storageType).setItem(key2, serializer.stringify(value));
  }
  if (!stores[key]) {
    const store = writable(initialValue, (set2) => {
      const json = browser ? getStorage(storageType).getItem(key) : null;
      if (json) {
        set2(serializer.parse(json));
      }
      if (browser) {
        const handleStorage = (event) => {
          if (event.key === key)
            set2(event.newValue ? serializer.parse(event.newValue) : null);
        };
        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
      }
    });
    const { subscribe: subscribe2, set } = store;
    stores[key] = {
      set(value) {
        updateStorage(key, value);
        set(value);
      },
      update(updater) {
        const value = updater(get_store_value(store));
        updateStorage(key, value);
        set(value);
      },
      subscribe: subscribe2
    };
  }
  return stores[key];
}
const createGearSlot = (gear2) => {
  return {
    gear: gear2,
    meta: createGearMeta()
  };
};
const createGearMeta = () => {
  return {
    bonus: [
      { type: -1, grade: 0 },
      { type: -1, grade: 0 },
      { type: -1, grade: 0 },
      { type: -1, grade: 0 }
    ]
  };
};
const createInventory = () => {
  return Array.from({ length: MAX_INV }, () => void 0);
};
const inventorySerializer = {
  stringify: (inventory2) => {
    return JSON.stringify(
      inventory2.map(
        (value) => value ? {
          gear: gearToPlain(value.gear),
          meta: value.meta
        } : void 0
      )
    );
  },
  parse: (data) => {
    return JSON.parse(data).map(
      (value) => value ? { gear: plainToGear(value.gear), meta: value.meta } : void 0
    );
  }
};
const MAX_INV = 32;
const LASTADD_DEFAULT = -1;
const SELECTED_DEFAULT = -1;
const createStore = () => {
  let _inventory = [];
  const inventory2 = persisted("gear-inventory-v2", createInventory(), {
    serializer: inventorySerializer
  });
  let _lastAdd = LASTADD_DEFAULT;
  const lastAdd2 = writable(_lastAdd);
  let _selected = SELECTED_DEFAULT;
  const selected2 = writable(_selected);
  let _gear = void 0;
  const gear2 = writable(_gear);
  let _meta = void 0;
  const meta2 = writable(_meta);
  const inventory_add = (gear3) => {
    inventory2.update((inv) => {
      for (let i = 0; i < MAX_INV; i++) {
        if (inv[i] === void 0) {
          inv[i] = createGearSlot(gear3);
          lastAdd2.set(i);
          break;
        }
      }
      return inv;
    });
  };
  const inventory_change = (gear3, index) => {
    inventory2.update((inv) => {
      inv[index] = createGearSlot(gear3);
      return inv;
    });
  };
  const inventory_remove = (index) => {
    inventory2.update((inv) => {
      if (inv[index]) {
        inv[index] = void 0;
      }
      if (_selected === index) {
        selected2.set(SELECTED_DEFAULT);
      }
      return inv;
    });
  };
  const inventory_swap = (index1, index2) => {
    if (index1 !== index2 && 0 <= index1 && index1 < MAX_INV && 0 <= index2 && index2 < MAX_INV) {
      inventory2.update((inv) => {
        const temp = inv[index1];
        inv[index1] = inv[index2];
        inv[index2] = temp;
        return inv;
      });
    }
  };
  const inventory_select = (index) => {
    if (_inventory[index]) {
      selected2.set(index);
    }
  };
  const inventory_deselect = () => {
    selected2.set(SELECTED_DEFAULT);
  };
  const meta_reset = () => {
    if (_gear && _meta) {
      meta2.set(createGearMeta());
    }
  };
  inventory2.subscribe((newInv) => _inventory = newInv);
  lastAdd2.subscribe((newAdd) => _lastAdd = newAdd);
  selected2.subscribe((newSel) => {
    if (newSel === -1 || _inventory[newSel] !== void 0) {
      _selected = newSel;
      gear2.set(_inventory[newSel]?.gear);
      meta2.set(_inventory[newSel]?.meta);
    }
  });
  gear2.subscribe((newGear) => {
    _gear = newGear;
    if (newGear) {
      inventory_change(newGear, _selected);
    }
  });
  meta2.subscribe((newMeta) => {
    _meta = newMeta;
    if (newMeta && _inventory[_selected] !== void 0) {
      _inventory[_selected].meta = newMeta;
    }
  });
  return {
    inventory: {
      subscribe: inventory2.subscribe,
      set: inventory2.set,
      update: inventory2.update,
      add: inventory_add,
      change: inventory_change,
      remove: inventory_remove,
      swap: inventory_swap,
      select: inventory_select,
      deselect: inventory_deselect
    },
    lastAdd: {
      subscribe: lastAdd2.subscribe
    },
    selected: {
      subscribe: selected2.subscribe
    },
    gear: gear2,
    meta: {
      subscribe: meta2.subscribe,
      set: meta2.set,
      update: meta2.update,
      reset: meta_reset
    }
  };
};
const { inventory, lastAdd, selected, gear, meta } = createStore();
function getName(type) {
  switch (type) {
    case BonusStatType.STR:
      return "STR";
    case BonusStatType.DEX:
      return "DEX";
    case BonusStatType.INT:
      return "INT";
    case BonusStatType.LUK:
      return "LUK";
    case BonusStatType.STR_DEX:
      return "STR + DEX";
    case BonusStatType.STR_INT:
      return "STR + INT";
    case BonusStatType.STR_LUK:
      return "STR + LUK";
    case BonusStatType.DEX_INT:
      return "DEX + INT";
    case BonusStatType.DEX_LUK:
      return "DEX + LUK";
    case BonusStatType.INT_LUK:
      return "INT + LUK";
    case BonusStatType.MHP:
      return "최대 HP";
    case BonusStatType.MMP:
      return "최대 MP";
    case BonusStatType.PAD:
      return "공격력";
    case BonusStatType.MAD:
      return "마력";
    case BonusStatType.PDD:
      return "방어력";
    case BonusStatType.speed:
      return "이동속도";
    case BonusStatType.jump:
      return "점프력";
    case BonusStatType.damR:
      return "데미지 %";
    case BonusStatType.bdR:
      return "보스 몬스터 공격 시 데미지 %";
    case BonusStatType.allStatR:
      return "올스탯 %";
    case BonusStatType.reduceReq:
      return "착용 레벨 감소";
  }
}
function optionToStrings(option) {
  const option2 = new Map(option);
  let temp = option2.get(GearPropType.incSTR);
  if (temp !== void 0 && temp > 0 && option2.get(GearPropType.incDEX) === temp && option2.get(GearPropType.incINT) === temp && option2.get(GearPropType.incLUK) === temp) {
    option2.set(GearPropType.incAllStat, temp);
    option2.set(GearPropType.incSTR, 0);
    option2.set(GearPropType.incDEX, 0);
    option2.set(GearPropType.incINT, 0);
    option2.set(GearPropType.incLUK, 0);
  }
  const sorted = [...option2].sort((a, b) => a[0] - b[0]);
  const strings = [];
  let skipMMP = false, skipMAD = false;
  for (const [type, value] of sorted) {
    if (type === GearPropType.incMHP) {
      temp = option2.get(GearPropType.incMHP);
      if (temp !== void 0 && temp > 0 && option2.get(GearPropType.incMMP) === temp) {
        strings.push(`최대 HP / 최대 MP : +${value}`);
        skipMMP = true;
        continue;
      }
    }
    if (type === GearPropType.incMMP && skipMMP)
      continue;
    if (type === GearPropType.incPAD) {
      temp = option2.get(GearPropType.incPAD);
      if (temp !== void 0 && temp > 0 && option2.get(GearPropType.incMAD) === temp) {
        strings.push(`공격력 / 마력 : +${value}`);
        skipMAD = true;
        continue;
      }
    }
    if (type === GearPropType.incMAD && skipMAD)
      continue;
    strings.push(getGearPropString(type, value));
  }
  return strings;
}
const BonusStat_svelte_svelte_type_style_lang = "";
const css$7 = {
  code: ".bonus-wrapper.svelte-zhdgdb{margin-top:var(--cds-spacing-07);display:flex;flex-direction:column}",
  map: null
};
function getBonusGrades(bossReward2) {
  if (bossReward2) {
    return [3, 4, 5, 6, 7];
  } else {
    return [1, 2, 3, 4, 5, 6, 7];
  }
}
const BonusStat = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let bossReward;
  let types;
  let $gear, $$unsubscribe_gear;
  let $meta, $$unsubscribe_meta;
  $$unsubscribe_gear = subscribe(gear, (value) => $gear = value);
  $$unsubscribe_meta = subscribe(meta, (value) => $meta = value);
  let { can = false } = $$props;
  function getValueGradeString(type, grade) {
    if (!$gear || !$meta)
      return "";
    const plus = type === BonusStatType.reduceReq ? "-" : "+";
    let percent = "";
    switch (type) {
      case BonusStatType.damR:
      case BonusStatType.bdR:
      case BonusStatType.allStatR:
        percent = "%";
        break;
    }
    return `${plus}${getBonusStatValue($gear, type, grade)}${percent} (${grade}등급)`;
  }
  function canBonus(gear2) {
    if (Gear.isArmor(gear2.type)) {
      if (Gear.isShield(gear2.type)) {
        return false;
      }
      return true;
    }
    if (Gear.isAccessory(gear2.type)) {
      if (gear2.type === GearType.ring) {
        return false;
      }
      if (gear2.type === GearType.shoulder) {
        if (gear2.itemID === 1152155)
          return true;
        return false;
      }
      return true;
    }
    if (Gear.isWeapon(gear2.type)) {
      return true;
    }
    return false;
  }
  function getBonusTypes(gear2) {
    let types2 = [
      BonusStatType.STR,
      BonusStatType.DEX,
      BonusStatType.INT,
      BonusStatType.LUK,
      BonusStatType.STR_DEX,
      BonusStatType.STR_INT,
      BonusStatType.STR_LUK,
      BonusStatType.DEX_INT,
      BonusStatType.DEX_LUK,
      BonusStatType.INT_LUK,
      BonusStatType.MHP,
      BonusStatType.MMP
    ];
    if (Gear.isWeapon(gear2.type)) {
      types2.push(BonusStatType.PAD, BonusStatType.MAD);
    } else if (gear2.req.level >= 60) {
      types2.push(BonusStatType.PAD, BonusStatType.MAD);
    }
    types2.push(BonusStatType.PDD);
    if (Gear.isWeapon(gear2.type)) {
      types2.push(BonusStatType.damR);
      if (gear2.req.level >= 90)
        types2.push(BonusStatType.bdR);
    } else {
      types2.push(BonusStatType.speed, BonusStatType.jump);
    }
    if (gear2.req.level >= 70) {
      types2.push(BonusStatType.allStatR);
    }
    types2.push(BonusStatType.reduceReq);
    return types2;
  }
  if ($$props.can === void 0 && $$bindings.can && can !== void 0)
    $$bindings.can(can);
  $$result.css.add(css$7);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    can = $gear !== void 0 && canBonus($gear);
    bossReward = $gear !== void 0 && $gear?.getBooleanValue(GearPropType.bossReward);
    types = $gear ? getBonusTypes($gear) : [];
    $$rendered = `${can && $meta ? `${validate_component(Row, "Row").$$render(
      $$result,
      {
        style: "margin-top: var(--cds-spacing-05);"
      },
      {},
      {
        default: () => {
          return `${validate_component(Column, "Column").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(Button, "Button").$$render($$result, { kind: "danger", class: "reset" }, {}, {
                default: () => {
                  return `초기화`;
                }
              })}`;
            }
          })}`;
        }
      }
    )}
	<div class="bonus-wrapper svelte-zhdgdb">${validate_component(Row, "Row").$$render($$result, {}, {}, {
      default: () => {
        return `${validate_component(Column, "Column").$$render($$result, {}, {}, {
          default: () => {
            return `<p>종류</p>`;
          }
        })}
			${validate_component(Column, "Column").$$render($$result, {}, {}, {
          default: () => {
            return `<p>등급</p>`;
          }
        })}`;
      }
    })}
		${each($meta.bonus, (bonus) => {
      return `${validate_component(Row, "Row").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Column, "Column").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(Select, "Select").$$render(
                $$result,
                { selected: bonus.type },
                {
                  selected: ($$value) => {
                    bonus.type = $$value;
                    $$settled = false;
                  }
                },
                {
                  default: () => {
                    return `${validate_component(SelectItem, "SelectItem").$$render($$result, { value: -1, text: "---" }, {}, {})}
						${each(types, (type) => {
                      return `${validate_component(SelectItem, "SelectItem").$$render($$result, { value: type, text: getName(type) }, {}, {})}`;
                    })}
					`;
                  }
                }
              )}
				`;
            }
          })}
				${validate_component(Column, "Column").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(Select, "Select").$$render(
                $$result,
                { selected: bonus.grade },
                {
                  selected: ($$value) => {
                    bonus.grade = $$value;
                    $$settled = false;
                  }
                },
                {
                  default: () => {
                    return `${validate_component(SelectItem, "SelectItem").$$render($$result, { value: 0, text: "---" }, {}, {})}
						${bonus.type !== -1 ? `${each(getBonusGrades(bossReward), (grade) => {
                      return `${validate_component(SelectItem, "SelectItem").$$render(
                        $$result,
                        {
                          value: grade,
                          text: getValueGradeString(bonus.type, grade)
                        },
                        {},
                        {}
                      )}`;
                    })}` : ``}
					`;
                  }
                }
              )}
				`;
            }
          })}
			`;
        }
      })}`;
    })}</div>` : `추가옵션 설정 불가`}`;
  } while (!$$settled);
  $$unsubscribe_gear();
  $$unsubscribe_meta();
  return $$rendered;
});
const Enhance_svelte_svelte_type_style_lang = "";
const css$6 = {
  code: ".enhance.svelte-1lsa9bg.svelte-1lsa9bg{display:flex;flex-direction:column;margin-top:var(--cds-spacing-05)}.wrapper.svelte-1lsa9bg.svelte-1lsa9bg{display:flex;align-items:center;gap:var(--cds-spacing-03)}.starforce.down.icon.svelte-1lsa9bg.svelte-1lsa9bg{filter:grayscale(1) brightness(0.8)}.starforce.icon.svelte-1lsa9bg.svelte-1lsa9bg{background-image:url(../images/starforce.png);width:32px;height:31px}.starforce-17.icon.svelte-1lsa9bg.svelte-1lsa9bg{background-image:url(../images/star17.png);width:32px;height:31px;margin-top:2px;margin-left:1px}.starforce-22.icon.svelte-1lsa9bg.svelte-1lsa9bg{background-image:url(../images/star22.png);width:35px;height:34px;margin-top:-1px;margin-left:-1px}.amazing.icon.svelte-1lsa9bg.svelte-1lsa9bg{background-image:url(../images/amazing.png);width:34px;height:35px}.reset.icon.svelte-1lsa9bg.svelte-1lsa9bg{background-image:url(../images/innocent.png);width:30px;height:26px;margin-top:4px;margin-left:2px}.svelte-1lsa9bg *[disabled] .icon.svelte-1lsa9bg{filter:grayscale(1) contrast(0.5) brightness(1.3)}",
  map: null
};
const Enhance = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let canStar;
  let canStarDown;
  let canStar17;
  let canStar22;
  let canAmazing;
  let canReset;
  let $gear, $$unsubscribe_gear;
  $$unsubscribe_gear = subscribe(gear, (value) => $gear = value);
  let { can = false } = $$props;
  if ($$props.can === void 0 && $$bindings.can && can !== void 0)
    $$bindings.can(can);
  $$result.css.add(css$6);
  can = $gear !== void 0 && $gear.maxStar > 0;
  canStar = $gear !== void 0 && $gear.maxStar > $gear.star;
  canStarDown = $gear !== void 0 && !$gear.amazing && $gear.star > 0;
  canStar17 = $gear !== void 0 && $gear.star < 17 && $gear.maxStar >= 17;
  canStar22 = $gear !== void 0 && $gear.star < 22 && $gear.maxStar >= 22;
  canAmazing = $gear !== void 0 && $gear.req.level <= 150 && !$gear.getBooleanValue(GearPropType.superiorEqp) && 15 > $gear.star;
  canReset = $gear !== void 0 && $gear.star > 0;
  $$unsubscribe_gear();
  return `${can && $gear ? `${validate_component(Row, "Row").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Column, "Column").$$render($$result, {}, {}, {
        default: () => {
          return `<div class="enhance svelte-1lsa9bg">${validate_component(Button, "Button").$$render($$result, { kind: "secondary", disabled: !canStar }, {}, {
            default: () => {
              return `<div class="wrapper svelte-1lsa9bg"><div class="starforce icon svelte-1lsa9bg"></div>
						스타포스
					</div>`;
            }
          })}
				${validate_component(Button, "Button").$$render(
            $$result,
            {
              kind: "secondary",
              disabled: !canStarDown
            },
            {},
            {
              default: () => {
                return `<div class="wrapper svelte-1lsa9bg"><div class="starforce down icon svelte-1lsa9bg"></div>
						스타포스 감소
					</div>`;
              }
            }
          )}
				${validate_component(Button, "Button").$$render($$result, { kind: "secondary", disabled: !canStar17 }, {}, {
            default: () => {
              return `<div class="wrapper svelte-1lsa9bg"><div class="starforce-17 icon svelte-1lsa9bg"></div>
						스타포스 17성
					</div>`;
            }
          })}
				${validate_component(Button, "Button").$$render($$result, { kind: "secondary", disabled: !canStar22 }, {}, {
            default: () => {
              return `<div class="wrapper svelte-1lsa9bg"><div class="starforce-22 icon svelte-1lsa9bg"></div>
						스타포스 22성
					</div>`;
            }
          })}
				${validate_component(Button, "Button").$$render($$result, { kind: "secondary", disabled: !canAmazing }, {}, {
            default: () => {
              return `<div class="wrapper svelte-1lsa9bg"><div class="amazing icon svelte-1lsa9bg"></div>
						놀라운 장비 강화
					</div>`;
            }
          })}
				${validate_component(Button, "Button").$$render($$result, { kind: "secondary", disabled: !canReset }, {}, {
            default: () => {
              return `<div class="wrapper svelte-1lsa9bg"><div class="reset icon svelte-1lsa9bg"></div>
						스타포스 초기화
					</div>`;
            }
          })}</div>`;
        }
      })}`;
    }
  })}` : `강화 불가`}`;
});
const ImportGear_svelte_svelte_type_style_lang = "";
const css$5 = {
  code: ".upload.svelte-5dg10j{display:flex;flex-direction:column;gap:var(--cds-spacing-05)}",
  map: null
};
const ImportGear = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let invalid;
  let { strGear } = $$props;
  let { fileGears } = $$props;
  fileGears = /* @__PURE__ */ new Map();
  function reset() {
    value = "";
    uploader.clearFiles();
  }
  function loadFiles() {
    new FileReader();
    let proms = files.map((file) => file.text().then());
    Promise.all(proms);
  }
  let uploader;
  let value = "";
  let files = [];
  if ($$props.strGear === void 0 && $$bindings.strGear && strGear !== void 0)
    $$bindings.strGear(strGear);
  if ($$props.fileGears === void 0 && $$bindings.fileGears && fileGears !== void 0)
    $$bindings.fileGears(fileGears);
  if ($$props.reset === void 0 && $$bindings.reset && reset !== void 0)
    $$bindings.reset(reset);
  if ($$props.loadFiles === void 0 && $$bindings.loadFiles && loadFiles !== void 0)
    $$bindings.loadFiles(loadFiles);
  $$result.css.add(css$5);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      {
        strGear = validateParseGear(decompressFromBase64(value));
      }
    }
    invalid = value.trim().length > 0 && !strGear;
    $$rendered = `<div class="upload svelte-5dg10j">${files.length === 0 ? `${validate_component(TextArea, "TextArea").$$render(
      $$result,
      {
        labelText: "아이템 정보",
        placeholder: "아이템 정보를 붙여넣기해 주세요.",
        helperText: strGear?.name,
        invalid,
        invalidText: "잘못된 값입니다.",
        value
      },
      {
        value: ($$value) => {
          value = $$value;
          $$settled = false;
        }
      },
      {}
    )}` : ``}
	${validate_component(FileUploader, "FileUploader").$$render(
      $$result,
      {
        labelDescription: files.length === 0 ? "또는 파일 업로드" : "파일 업로드",
        buttonLabel: "파일 선택",
        accept: [".sim"],
        status: "uploading",
        files,
        this: uploader
      },
      {
        files: ($$value) => {
          files = $$value;
          $$settled = false;
        },
        this: ($$value) => {
          uploader = $$value;
          $$settled = false;
        }
      },
      {}
    )}
</div>`;
  } while (!$$settled);
  return $$rendered;
});
const InvSlotContent_svelte_svelte_type_style_lang = "";
const css$4 = {
  code: ".icon-wrapper.svelte-17rpaj7.svelte-17rpaj7{display:flex;justify-content:center;align-items:center;width:100%;height:100%}.gear-icon.svelte-17rpaj7.svelte-17rpaj7{image-rendering:pixelated;scale:2}.star-wrapper.svelte-17rpaj7.svelte-17rpaj7{position:absolute;top:calc(var(--cds-spacing-03) * -1);left:calc(var(--cds-spacing-03) * -1)}.star.svelte-17rpaj7.svelte-17rpaj7{display:flex;font-size:12px;gap:2px;align-items:center}.star.svelte-17rpaj7 .icon.svelte-17rpaj7{width:11px;height:10px}.star.svelte-17rpaj7 .yellow.svelte-17rpaj7{background-image:url(../images/yellow.png)}.star.svelte-17rpaj7 .blue.svelte-17rpaj7{background-image:url(../images/blue.png)}.grade-wrapper.svelte-17rpaj7.svelte-17rpaj7{position:absolute;right:calc(var(--cds-spacing-02) * -1);bottom:calc(var(--cds-spacing-02) * -1);display:flex;flex-direction:column;gap:var(--cds-spacing-01)}@media(max-width: 24rem){.star-wrapper.svelte-17rpaj7.svelte-17rpaj7{top:calc(var(--cds-spacing-04) * -1);left:calc(var(--cds-spacing-04) * -1)}.grade-wrapper.svelte-17rpaj7.svelte-17rpaj7{right:calc(var(--cds-spacing-03) * -1);bottom:calc(var(--cds-spacing-03) * -1);gap:0}}.grade-icon.svelte-17rpaj7.svelte-17rpaj7{width:13px;height:13px}.grade-icon.normal.svelte-17rpaj7.svelte-17rpaj7{background-image:url(../images/normal.png)}.grade-icon.rare.svelte-17rpaj7.svelte-17rpaj7{background-image:url(../images/rare.png)}.grade-icon.epic.svelte-17rpaj7.svelte-17rpaj7{background-image:url(../images/epic.png)}.grade-icon.unique.svelte-17rpaj7.svelte-17rpaj7{background-image:url(../images/unique.png)}.grade-icon.legendary.svelte-17rpaj7.svelte-17rpaj7{background-image:url(../images/legendary.png)}",
  map: null
};
const InvSlotContent = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let gear2;
  let { _slot } = $$props;
  let { imgRef = void 0 } = $$props;
  function getIconName(grade) {
    switch (grade) {
      case PotentialGrade.normal:
        return "normal";
      case PotentialGrade.rare:
        return "rare";
      case PotentialGrade.epic:
        return "epic";
      case PotentialGrade.unique:
        return "unique";
      case PotentialGrade.legendary:
        return "legendary";
      default:
        return "";
    }
  }
  if ($$props._slot === void 0 && $$bindings._slot && _slot !== void 0)
    $$bindings._slot(_slot);
  if ($$props.imgRef === void 0 && $$bindings.imgRef && imgRef !== void 0)
    $$bindings.imgRef(imgRef);
  $$result.css.add(css$4);
  gear2 = _slot?.gear;
  return `${validate_component(AspectRatio, "AspectRatio").$$render(
    $$result,
    {
      ratio: "1x1",
      style: "pointer-events: none;"
    },
    {},
    {
      default: () => {
        return `${_slot && gear2 ? `<div class="icon-wrapper svelte-17rpaj7"><img draggable="false" src="${"https://maplestory.io/api/KMS/367/item/" + escape(gear2.icon.id, true) + "/icon"}"${add_attribute("alt", gear2.name, 0)} class="gear-icon svelte-17rpaj7" style="${"margin-left: " + escape(1 - gear2.icon.origin[0], true) + "px; margin-top: " + escape(33 - gear2.icon.origin[1], true) + "px; pointer-events: none"}"${add_attribute("this", imgRef, 0)}>
			<div class="star-wrapper svelte-17rpaj7">${gear2.star > 0 ? `${validate_component(Tag, "Tag").$$render($$result, { size: "sm", type: "high-contrast" }, {}, {
          default: () => {
            return `<div class="star svelte-17rpaj7"><div class="${"icon " + escape(gear2.amazing ? "blue" : "yellow", true) + " svelte-17rpaj7"}"></div>
							${escape(gear2.star)}</div>`;
          }
        })}` : ``}
				${gear2.upgradeCount > 0 ? `${validate_component(Tag, "Tag").$$render($$result, { size: "sm" }, {}, {
          default: () => {
            return `+${escape(gear2.upgradeCount)}`;
          }
        })}` : ``}</div>
			<div class="grade-wrapper svelte-17rpaj7"><div class="${"grade-icon " + escape(getIconName(gear2.grade), true) + " svelte-17rpaj7"}"></div>
				<div class="${"grade-icon " + escape(getIconName(gear2.additionalGrade), true) + " svelte-17rpaj7"}"></div></div></div>` : ``}`;
      }
    }
  )}`;
});
const Manage_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: ".manage.svelte-wexq1h{display:flex;flex-direction:column;margin-top:calc(var(--cds-spacing-05) * -1)}h4.svelte-wexq1h{margin-top:var(--cds-spacing-07);margin-bottom:var(--cds-spacing-03)}",
  map: null
};
const Manage = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let gearStr;
  let gearURI;
  let filename;
  let $gear, $$unsubscribe_gear;
  $$unsubscribe_gear = subscribe(gear, (value) => $gear = value);
  let { tooltipRef } = $$props;
  let { display } = $$props;
  createEventDispatcher();
  if ($$props.tooltipRef === void 0 && $$bindings.tooltipRef && tooltipRef !== void 0)
    $$bindings.tooltipRef(tooltipRef);
  if ($$props.display === void 0 && $$bindings.display && display !== void 0)
    $$bindings.display(display);
  $$result.css.add(css$3);
  gearStr = $gear ? stringifyGear($gear) : "";
  compressToBase64(gearStr);
  gearURI = compressToEncodedURIComponent(gearStr);
  filename = $gear?.name ?? "item";
  $$unsubscribe_gear();
  return `${$gear ? `<div class="manage svelte-wexq1h">${validate_component(Row, "Row").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Column, "Column").$$render($$result, {}, {}, {
        default: () => {
          return `<h4 class="svelte-wexq1h">아이템 정보</h4>`;
        }
      })}`;
    }
  })}
		${validate_component(Row, "Row").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Column, "Column").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Button, "Button").$$render($$result, { icon: Copy }, {}, {
            default: () => {
              return `복사`;
            }
          })}
				${validate_component(Button, "Button").$$render(
            $$result,
            {
              icon: Download,
              href: "data:text/plain;charset=utf-8," + gearURI,
              download: filename + ".sim"
            },
            {},
            {
              default: () => {
                return `다운로드
				`;
              }
            }
          )}`;
        }
      })}`;
    }
  })}
		${validate_component(Row, "Row").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Column, "Column").$$render($$result, {}, {}, {
        default: () => {
          return `<h4 class="svelte-wexq1h">아이템 이미지</h4>`;
        }
      })}`;
    }
  })}
		${validate_component(Row, "Row").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Column, "Column").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Button, "Button").$$render($$result, { disabled: true }, {}, {
            default: () => {
              return `열기`;
            }
          })}
				<p>준비 중입니다</p>`;
        }
      })}`;
    }
  })}
		${validate_component(Row, "Row").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Column, "Column").$$render($$result, {}, {}, {
        default: () => {
          return `<h4 class="svelte-wexq1h">아이템 삭제</h4>`;
        }
      })}`;
    }
  })}
		${validate_component(Row, "Row").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Column, "Column").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Button, "Button").$$render($$result, { kind: "danger" }, {}, {
            default: () => {
              return `삭제`;
            }
          })}`;
        }
      })}`;
    }
  })}</div>` : ``}`;
});
const Potentials_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: ".potentials.svelte-1mz9exh{margin-top:var(--cds-spacing-03);display:flex;flex-direction:column;gap:var(--cds-spacing-03)}h4.svelte-1mz9exh{margin-top:var(--cds-spacing-07)}h4.svelte-1mz9exh:first-of-type{margin-top:var(--cds-spacing-05)}",
  map: null
};
function getGradePots(data, grade) {
  const gradeMap = data.get(grade);
  if (!gradeMap) {
    return [];
  }
  return [...gradeMap.values()];
}
const Potentials = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let potentialLevel;
  let pots;
  let addPots;
  let $gear, $$unsubscribe_gear;
  $$unsubscribe_gear = subscribe(gear, (value) => $gear = value);
  let { can = false } = $$props;
  let codes = [
    $gear?.potentials[0]?.code ?? 0,
    $gear?.potentials[1]?.code ?? 0,
    $gear?.potentials[2]?.code ?? 0
  ];
  let addCodes = [
    $gear?.additionalPotentials[0]?.code ?? 0,
    $gear?.additionalPotentials[1]?.code ?? 0,
    $gear?.additionalPotentials[2]?.code ?? 0
  ];
  function createNameMap(gear2, getPotCodeFunc) {
    const names = /* @__PURE__ */ new Map();
    for (const grade of [
      PotentialGrade.normal,
      PotentialGrade.rare,
      PotentialGrade.epic,
      PotentialGrade.unique,
      PotentialGrade.legendary
    ]) {
      const gradeCodes = getPotCodeFunc(grade);
      const gradePots = gradeCodes.map((code) => createPotentialFromCode(code, potentialLevel));
      const filteredPots = gradePots.filter((pot) => testGearPotential(gear2, pot));
      names.set(grade, new Map(filteredPots.map((pot) => [pot.code, pot])));
    }
    return names;
  }
  function testGearPotential(gear2, potential) {
    return potential !== void 0 && Potential.checkOptionType(potential.optionType, gear2.type) && gear2.req.level >= potential.reqLevel;
  }
  function getPotCodes(grade) {
    switch (grade) {
      case PotentialGrade.normal:
        return [1, 2, 3, 4, 5, 6, 9, 10, 11, 12, 13];
      case PotentialGrade.rare:
        return [
          10001,
          10002,
          10003,
          10004,
          10005,
          10006,
          10009,
          10010,
          10011,
          10012,
          10013,
          10041,
          10042,
          10043,
          10044,
          10045,
          10046,
          10051,
          10052,
          10053,
          10055,
          10070,
          10081,
          10151,
          10156,
          10201,
          10202,
          10206,
          10207,
          10221,
          10222,
          10226,
          10227,
          10231,
          10232,
          10236,
          10237,
          10241,
          10242,
          10246,
          10247,
          10291
        ];
      case PotentialGrade.epic:
        return [
          20041,
          20042,
          20043,
          20044,
          20045,
          20046,
          20051,
          20052,
          20053,
          20055,
          20070,
          20086,
          20201,
          20202,
          20206,
          20207,
          20291,
          20351,
          20352,
          20353,
          20366,
          20401,
          20406
        ];
      case PotentialGrade.unique:
        return [
          30041,
          30042,
          30043,
          30044,
          30045,
          30046,
          30051,
          30052,
          30053,
          30055,
          30070,
          30086,
          30091,
          30092,
          30093,
          30094,
          30291,
          30356,
          30357,
          30366,
          30371,
          30376,
          30377,
          30551,
          30602,
          30701,
          30702,
          31001,
          31002,
          31003,
          31004
        ];
      case PotentialGrade.legendary:
        return [
          40041,
          40042,
          40043,
          40044,
          40045,
          40046,
          40051,
          40052,
          40053,
          40055,
          40056,
          40070,
          40086,
          40091,
          40092,
          40291,
          40292,
          40356,
          40357,
          40366,
          40371,
          40376,
          40377,
          40501,
          40502,
          40551,
          40556,
          40557,
          40602,
          40603,
          40650,
          40656,
          40701,
          40702,
          40703,
          41005,
          41006,
          41007
        ];
      default:
        return [];
    }
  }
  function getAddPotCodes(grade) {
    switch (grade) {
      case PotentialGrade.normal:
        return [
          2001,
          2002,
          2003,
          2004,
          2005,
          2006,
          2009,
          2010,
          2011,
          2012,
          2013,
          2015,
          2016
        ];
      case PotentialGrade.rare:
        return [
          12001,
          12002,
          12003,
          12004,
          12005,
          12006,
          12009,
          12010,
          12011,
          12012,
          12013,
          12015,
          12016,
          12017,
          12018,
          12019,
          12020,
          12041,
          12042,
          12043,
          12044,
          12045,
          12046,
          12047,
          12048,
          12049,
          12050,
          12051,
          12052,
          12053,
          12055,
          12070,
          12081,
          12082
        ];
      case PotentialGrade.epic:
        return [
          22001,
          22002,
          22003,
          22004,
          22005,
          22006,
          22009,
          22010,
          22011,
          22012,
          22013,
          22041,
          22042,
          22043,
          22044,
          22045,
          22046,
          22051,
          22052,
          22053,
          22055,
          22057,
          22058,
          22059,
          22060,
          22070,
          22086,
          22087,
          22201,
          22206,
          22291
        ];
      case PotentialGrade.unique:
        return [
          32001,
          32002,
          32003,
          32004,
          32005,
          32006,
          32011,
          32012,
          32013,
          32041,
          32042,
          32043,
          32044,
          32045,
          32046,
          32051,
          32053,
          32055,
          32057,
          32059,
          32060,
          32061,
          32062,
          32070,
          32086,
          32087,
          32091,
          32092,
          32093,
          32094,
          32201,
          32206,
          32291,
          32551,
          32601
        ];
      case PotentialGrade.legendary:
        return [
          42001,
          42002,
          42003,
          42004,
          42005,
          42006,
          42011,
          42012,
          42013,
          42041,
          42042,
          42043,
          42044,
          42045,
          42046,
          42051,
          42053,
          42055,
          42057,
          42059,
          42060,
          42063,
          42064,
          42065,
          42066,
          42070,
          42086,
          42087,
          42091,
          42092,
          42093,
          42094,
          42095,
          42096,
          42292,
          42501,
          42551,
          42556,
          42602,
          42650,
          42656
        ];
      default:
        return [];
    }
  }
  if ($$props.can === void 0 && $$bindings.can && can !== void 0)
    $$bindings.can(can);
  $$result.css.add(css$2);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    can = $gear !== void 0 && $gear.canPotential && !$gear.getBooleanValue(GearPropType.fixedPotential);
    potentialLevel = Potential.getPotentialLevel($gear?.req.level ?? 0);
    pots = $gear ? createNameMap($gear, getPotCodes) : /* @__PURE__ */ new Map();
    addPots = $gear ? createNameMap($gear, getAddPotCodes) : /* @__PURE__ */ new Map();
    $$rendered = `${can && $gear ? `${validate_component(Row, "Row").$$render($$result, {}, {}, {
      default: () => {
        return `${validate_component(Column, "Column").$$render($$result, {}, {}, {
          default: () => {
            return `<h4 class="svelte-1mz9exh">잠재옵션</h4>
			<div class="potentials svelte-1mz9exh">${validate_component(Select, "Select").$$render(
              $$result,
              { labelText: "등급", selected: $gear.grade },
              {
                selected: ($$value) => {
                  $gear.grade = $$value;
                  $$settled = false;
                }
              },
              {
                default: () => {
                  return `${validate_component(SelectItem, "SelectItem").$$render(
                    $$result,
                    {
                      value: PotentialGrade.normal,
                      text: "---"
                    },
                    {},
                    {}
                  )}
					${validate_component(SelectItem, "SelectItem").$$render($$result, { value: PotentialGrade.rare, text: "레어" }, {}, {})}
					${validate_component(SelectItem, "SelectItem").$$render($$result, { value: PotentialGrade.epic, text: "에픽" }, {}, {})}
					${validate_component(SelectItem, "SelectItem").$$render(
                    $$result,
                    {
                      value: PotentialGrade.unique,
                      text: "유니크"
                    },
                    {},
                    {}
                  )}
					${validate_component(SelectItem, "SelectItem").$$render(
                    $$result,
                    {
                      value: PotentialGrade.legendary,
                      text: "레전드리"
                    },
                    {},
                    {}
                  )}`;
                }
              }
            )}
				<div>${each({ length: 3 }, (_, i) => {
              return `${validate_component(Select, "Select").$$render(
                $$result,
                {
                  labelText: i === 0 ? "옵션" : "",
                  disabled: $gear.grade === 0,
                  selected: codes[i]
                },
                {
                  selected: ($$value) => {
                    codes[i] = $$value;
                    $$settled = false;
                  }
                },
                {
                  default: () => {
                    return `${validate_component(SelectItem, "SelectItem").$$render($$result, { value: 0, text: "---" }, {}, {})}
							${i === 0 ? `${each(getGradePots(pots, $gear.grade), (pot) => {
                      return `${validate_component(SelectItem, "SelectItem").$$render(
                        $$result,
                        {
                          value: pot.code,
                          text: pot.convertSummary
                        },
                        {},
                        {}
                      )}`;
                    })}` : `${each(getGradePots(pots, $gear.grade - 1), (pot) => {
                      return `${validate_component(SelectItem, "SelectItem").$$render(
                        $$result,
                        {
                          value: pot.code,
                          text: pot.convertSummary
                        },
                        {},
                        {}
                      )}`;
                    })}
								${validate_component(SelectItemGroup, "SelectItemGroup").$$render($$result, { label: "- 이탈 -" }, {}, {})}
								${each(getGradePots(pots, $gear.grade), (pot) => {
                      return `${validate_component(SelectItem, "SelectItem").$$render(
                        $$result,
                        {
                          value: pot.code,
                          text: pot.convertSummary
                        },
                        {},
                        {}
                      )}`;
                    })}`}
						`;
                  }
                }
              )}`;
            })}</div></div>

			<h4 class="svelte-1mz9exh">에디셔널 잠재옵션</h4>
			<div class="additional potentials svelte-1mz9exh">${validate_component(Select, "Select").$$render(
              $$result,
              {
                labelText: "등급",
                selected: $gear.additionalGrade
              },
              {
                selected: ($$value) => {
                  $gear.additionalGrade = $$value;
                  $$settled = false;
                }
              },
              {
                default: () => {
                  return `${validate_component(SelectItem, "SelectItem").$$render(
                    $$result,
                    {
                      value: PotentialGrade.normal,
                      text: "---"
                    },
                    {},
                    {}
                  )}
					${validate_component(SelectItem, "SelectItem").$$render($$result, { value: PotentialGrade.rare, text: "레어" }, {}, {})}
					${validate_component(SelectItem, "SelectItem").$$render($$result, { value: PotentialGrade.epic, text: "에픽" }, {}, {})}
					${validate_component(SelectItem, "SelectItem").$$render(
                    $$result,
                    {
                      value: PotentialGrade.unique,
                      text: "유니크"
                    },
                    {},
                    {}
                  )}
					${validate_component(SelectItem, "SelectItem").$$render(
                    $$result,
                    {
                      value: PotentialGrade.legendary,
                      text: "레전드리"
                    },
                    {},
                    {}
                  )}`;
                }
              }
            )}
				<div>${each({ length: 3 }, (_, i) => {
              return `${validate_component(Select, "Select").$$render(
                $$result,
                {
                  labelText: i === 0 ? "옵션" : "",
                  disabled: $gear.additionalGrade === 0,
                  selected: addCodes[i]
                },
                {
                  selected: ($$value) => {
                    addCodes[i] = $$value;
                    $$settled = false;
                  }
                },
                {
                  default: () => {
                    return `${validate_component(SelectItem, "SelectItem").$$render($$result, { value: 0, text: "---" }, {}, {})}
							${i === 0 ? `${each(getGradePots(addPots, $gear.additionalGrade), (pot) => {
                      return `${validate_component(SelectItem, "SelectItem").$$render(
                        $$result,
                        {
                          value: pot.code,
                          text: pot.convertSummary
                        },
                        {},
                        {}
                      )}`;
                    })}` : `${each(getGradePots(addPots, $gear.additionalGrade - 1), (pot) => {
                      return `${validate_component(SelectItem, "SelectItem").$$render(
                        $$result,
                        {
                          value: pot.code,
                          text: pot.convertSummary
                        },
                        {},
                        {}
                      )}`;
                    })}
								${validate_component(SelectItemGroup, "SelectItemGroup").$$render($$result, { label: "- 이탈 -" }, {}, {})}
								${each(getGradePots(addPots, $gear.additionalGrade), (pot) => {
                      return `${validate_component(SelectItem, "SelectItem").$$render(
                        $$result,
                        {
                          value: pot.code,
                          text: pot.convertSummary
                        },
                        {},
                        {}
                      )}`;
                    })}`}
						`;
                  }
                }
              )}`;
            })}</div></div>`;
          }
        })}`;
      }
    })}` : `잠재능력 설정 불가`}`;
  } while (!$$settled);
  $$unsubscribe_gear();
  return $$rendered;
});
function getOnlyScrolls(gear2) {
  switch (gear2.itemID) {
    case 1122e3:
    case 1122076:
    case 1122278:
      return [
        {
          name: "드래곤의 돌",
          stat: /* @__PURE__ */ new Map([
            [GearPropType.incSTR, 15],
            [GearPropType.incDEX, 15],
            [GearPropType.incINT, 15],
            [GearPropType.incLUK, 15],
            [GearPropType.incMHP, 750],
            [GearPropType.incPDD, 350]
          ])
        }
      ];
    case 1122150:
    case 1122372:
    case 1122373:
    case 1122374:
    case 1122375:
    case 1122376:
    case 1122377:
      return [
        {
          name: "비틀린 시간의 파편",
          stat: /* @__PURE__ */ new Map([
            [GearPropType.incSTR, 3],
            [GearPropType.incDEX, 3],
            [GearPropType.incINT, 3],
            [GearPropType.incLUK, 3],
            [GearPropType.incMHP, 40],
            [GearPropType.incMMP, 40],
            [GearPropType.incPAD, 3],
            [GearPropType.incMAD, 3],
            [GearPropType.incPDD, 25],
            [GearPropType.incSpeed, 3],
            [GearPropType.incJump, 2]
          ])
        }
      ];
    case 1123007:
    case 1123008:
    case 1123009:
    case 1123010:
    case 1123011:
    case 1123012:
      return [
        {
          name: "힘의 오닉스 스톤",
          stat: /* @__PURE__ */ new Map([
            [GearPropType.incSTR, 2],
            [GearPropType.incPDD, 15]
          ])
        },
        {
          name: "민첩의 오닉스 스톤",
          stat: /* @__PURE__ */ new Map([
            [GearPropType.incDEX, 2],
            [GearPropType.incPDD, 15]
          ])
        },
        {
          name: "지능의 오닉스 스톤",
          stat: /* @__PURE__ */ new Map([
            [GearPropType.incINT, 2],
            [GearPropType.incPDD, 15]
          ])
        },
        {
          name: "행운의 오닉스 스톤",
          stat: /* @__PURE__ */ new Map([
            [GearPropType.incLUK, 2],
            [GearPropType.incPDD, 15]
          ])
        },
        {
          name: "체력의 오닉스 스톤",
          stat: /* @__PURE__ */ new Map([
            [GearPropType.incMHP, 100],
            [GearPropType.incPDD, 15]
          ])
        },
        {
          name: "균형의 오닉스 스톤",
          stat: /* @__PURE__ */ new Map([
            [GearPropType.incSTR, 1],
            [GearPropType.incDEX, 1],
            [GearPropType.incINT, 1],
            [GearPropType.incLUK, 1],
            [GearPropType.incPDD, 15]
          ])
        }
      ];
    case 1114207:
    case 1114208:
    case 1114209:
    case 1114210:
    case 1114211:
    case 1114212:
      return [
        {
          name: "힘의 오닉스 스톤",
          stat: /* @__PURE__ */ new Map([[GearPropType.incSTR, 8]])
        },
        {
          name: "민첩의 오닉스 스톤",
          stat: /* @__PURE__ */ new Map([[GearPropType.incDEX, 8]])
        },
        {
          name: "지능의 오닉스 스톤",
          stat: /* @__PURE__ */ new Map([[GearPropType.incINT, 8]])
        },
        {
          name: "행운의 오닉스 스톤",
          stat: /* @__PURE__ */ new Map([[GearPropType.incLUK, 8]])
        },
        {
          name: "체력의 오닉스 스톤",
          stat: /* @__PURE__ */ new Map([[GearPropType.incMHP, 400]])
        },
        {
          name: "균형의 오닉스 스톤",
          stat: /* @__PURE__ */ new Map([
            [GearPropType.incSTR, 4],
            [GearPropType.incDEX, 4],
            [GearPropType.incINT, 4],
            [GearPropType.incLUK, 4]
          ])
        },
        {
          name: "파괴의 오닉스 스톤",
          stat: /* @__PURE__ */ new Map([
            [GearPropType.incPAD, 1],
            [GearPropType.incPDD, 30]
          ])
        },
        {
          name: "마력의 오닉스 스톤",
          stat: /* @__PURE__ */ new Map([[GearPropType.incMAD, 1]])
        }
      ];
    case 1114226:
    case 1114227:
    case 1114228:
    case 1114230:
    case 1114231:
      return [
        {
          name: "강력한 힘의 오닉스 스톤",
          stat: /* @__PURE__ */ new Map([
            [GearPropType.incSTR, 4],
            [GearPropType.incPAD, 1],
            [GearPropType.incPDD, 15]
          ])
        },
        {
          name: "강력한 민첩의 오닉스 스톤",
          stat: /* @__PURE__ */ new Map([
            [GearPropType.incDEX, 4],
            [GearPropType.incPAD, 1],
            [GearPropType.incPDD, 15]
          ])
        },
        {
          name: "강력한 지능의 오닉스 스톤",
          stat: /* @__PURE__ */ new Map([
            [GearPropType.incINT, 4],
            [GearPropType.incPAD, 1],
            [GearPropType.incPDD, 15]
          ])
        },
        {
          name: "강력한 행운의 오닉스 스톤",
          stat: /* @__PURE__ */ new Map([
            [GearPropType.incLUK, 4],
            [GearPropType.incPAD, 1],
            [GearPropType.incPDD, 15]
          ])
        },
        {
          name: "강력한 체력의 오닉스 스톤",
          stat: /* @__PURE__ */ new Map([
            [GearPropType.incMHP, 200],
            [GearPropType.incPAD, 1],
            [GearPropType.incPDD, 15]
          ])
        },
        {
          name: "강력한 균형의 오닉스 스톤",
          stat: /* @__PURE__ */ new Map([
            [GearPropType.incSTR, 2],
            [GearPropType.incDEX, 2],
            [GearPropType.incINT, 2],
            [GearPropType.incLUK, 2],
            [GearPropType.incPAD, 1],
            [GearPropType.incPDD, 15]
          ])
        },
        {
          name: "현명한 힘의 오닉스 스톤",
          stat: /* @__PURE__ */ new Map([
            [GearPropType.incSTR, 4],
            [GearPropType.incMAD, 1]
          ])
        },
        {
          name: "현명한 민첩의 오닉스 스톤",
          stat: /* @__PURE__ */ new Map([
            [GearPropType.incDEX, 4],
            [GearPropType.incMAD, 1]
          ])
        },
        {
          name: "현명한 지능의 오닉스 스톤",
          stat: /* @__PURE__ */ new Map([
            [GearPropType.incINT, 4],
            [GearPropType.incMAD, 1]
          ])
        },
        {
          name: "현명한 행운의 오닉스 스톤",
          stat: /* @__PURE__ */ new Map([
            [GearPropType.incLUK, 4],
            [GearPropType.incMAD, 1]
          ])
        },
        {
          name: "현명한 체력의 오닉스 스톤",
          stat: /* @__PURE__ */ new Map([
            [GearPropType.incMHP, 200],
            [GearPropType.incMAD, 1]
          ])
        },
        {
          name: "현명한 균형의 오닉스 스톤",
          stat: /* @__PURE__ */ new Map([
            [GearPropType.incSTR, 2],
            [GearPropType.incDEX, 2],
            [GearPropType.incINT, 2],
            [GearPropType.incLUK, 2],
            [GearPropType.incMAD, 1]
          ])
        }
      ];
    case 1114300:
      return [
        {
          name: "벤전스 스톤",
          stat: /* @__PURE__ */ new Map([
            [GearPropType.incSTR, 1],
            [GearPropType.incDEX, 1],
            [GearPropType.incINT, 1],
            [GearPropType.incLUK, 1],
            [GearPropType.incMHP, 100],
            [GearPropType.incMMP, 100],
            [GearPropType.incPAD, 1],
            [GearPropType.incMAD, 1]
          ])
        }
      ];
    case 1114303:
      return [
        {
          name: "코스믹 아톰",
          stat: /* @__PURE__ */ new Map([
            [GearPropType.incSTR, 1],
            [GearPropType.incDEX, 1],
            [GearPropType.incINT, 1],
            [GearPropType.incLUK, 1],
            [GearPropType.incMHP, 100],
            [GearPropType.incMMP, 100],
            [GearPropType.incPAD, 1],
            [GearPropType.incMAD, 1]
          ])
        }
      ];
    case 1114307:
      return [
        {
          name: "테네브리스 원정대 반지 강화 주문서",
          stat: /* @__PURE__ */ new Map([
            [GearPropType.incSTR, 10],
            [GearPropType.incDEX, 10],
            [GearPropType.incINT, 10],
            [GearPropType.incLUK, 10],
            [GearPropType.incMHP, 1e3],
            [GearPropType.incMMP, 1e3],
            [GearPropType.incPAD, 5],
            [GearPropType.incMAD, 5]
          ])
        }
      ];
    case 1114318:
      return [
        {
          name: "어웨이크 링 전용 강화 주문서",
          stat: /* @__PURE__ */ new Map([
            [GearPropType.incSTR, 10],
            [GearPropType.incDEX, 10],
            [GearPropType.incINT, 10],
            [GearPropType.incLUK, 10],
            [GearPropType.incMHP, 1e3],
            [GearPropType.incMMP, 1e3],
            [GearPropType.incPAD, 5],
            [GearPropType.incMAD, 5]
          ])
        }
      ];
  }
  return [];
}
const Upgrade_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".general.svelte-1anvphb.svelte-1anvphb{display:grid;grid-template-columns:repeat(5, 1fr);margin-top:var(--cds-spacing-05)}.general.svelte-1anvphb .wrapper.svelte-1anvphb{display:flex;flex-direction:column;width:100%;align-items:center;text-align:center;gap:var(--cds-spacing-03);word-break:keep-all}@media(max-width: 28rem){.general.svelte-1anvphb.svelte-1anvphb{grid-template-columns:repeat(4, 1fr)}.general.svelte-1anvphb .wrapper.svelte-1anvphb{word-break:break-word}}@media(max-width: 24rem){.general.svelte-1anvphb.svelte-1anvphb{grid-template-columns:repeat(3, 1fr)}}.st-line-wrapper.svelte-1anvphb.svelte-1anvphb{display:grid;grid-template-columns:2fr 1px 1fr}@media(max-width: 32rem){.st-line-wrapper.svelte-1anvphb.svelte-1anvphb{grid-template-columns:3fr 1px 1fr}}.st-line-wrapper.svelte-1anvphb.svelte-1anvphb:not(.first){border-top:1px solid var(--cds-border-subtle)}.st-line-wrapper.first.svelte-1anvphb.svelte-1anvphb{margin-top:var(--cds-spacing-05)}.vr.svelte-1anvphb.svelte-1anvphb{background-color:var(--cds-border-subtle)}.st-content-wrapper.svelte-1anvphb.svelte-1anvphb{display:flex;align-items:center;gap:var(--cds-spacing-03)}.st-icon-wrapper.svelte-1anvphb.svelte-1anvphb{display:flex;height:var(--cds-spacing-05);align-items:center}.dropdown-item.svelte-1anvphb.svelte-1anvphb{display:flex;align-items:center;gap:var(--cds-spacing-03);height:var(--cds-spacing-05)}.icon-wrapper.svelte-1anvphb.svelte-1anvphb{width:2rem;height:2rem}.svelte-1anvphb p .icon.svelte-1anvphb,.svelte-1anvphb *[disabled] .icon.svelte-1anvphb,.svelte-1anvphb *[disabled='true'] .icon.svelte-1anvphb{filter:grayscale(1) contrast(0.5) brightness(1.3)}.collapse-text.svelte-1anvphb.svelte-1anvphb{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.scroll-icon-0.svelte-1anvphb.svelte-1anvphb{background-image:url(../images/spelltrace.png);width:33px;height:33px;margin-left:1px}.scroll-icon-1.svelte-1anvphb.svelte-1anvphb{background-image:url(../images/padScroll.png);width:38px;height:36px;margin-top:-1px;margin-left:-2px}.scroll-icon-2.svelte-1anvphb.svelte-1anvphb{background-image:url(../images/chaos.png);width:30px;height:26px;margin-top:4px;margin-left:2px}.scroll-icon-3.svelte-1anvphb.svelte-1anvphb{background-image:url(../images/specialScroll.png);width:33px;height:33px}.scroll-icon-4.svelte-1anvphb.svelte-1anvphb{background-image:url(../images/onlyScroll.png);width:32px;height:29px;margin-top:1px}.hammer.svelte-1anvphb.svelte-1anvphb{background-image:url(../images/goldenHammer.png);width:30px;height:29px;margin-top:3px;margin-left:3px}.restore.svelte-1anvphb.svelte-1anvphb{background-image:url(../images/cleanSlate.png);width:30px;height:26px;margin-top:4px;margin-left:2px}.fail.svelte-1anvphb.svelte-1anvphb{background-image:url(../images/fail.png);width:30px;height:26px;margin-top:4px;margin-left:2px}.reset.svelte-1anvphb.svelte-1anvphb{background-image:url(../images/innocent.png);width:30px;height:26px;margin-top:4px;margin-left:2px}.spelltrace-100.svelte-1anvphb.svelte-1anvphb{background-image:url(../images/st100.png);width:30px;height:26px;margin-top:4px;margin-left:2px}.spelltrace-70.svelte-1anvphb.svelte-1anvphb{background-image:url(../images/st70.png);width:30px;height:26px;margin-top:4px;margin-left:2px}.spelltrace-30.svelte-1anvphb.svelte-1anvphb{background-image:url(../images/st30.png);width:30px;height:26px;margin-top:4px;margin-left:2px}.spelltrace-15.svelte-1anvphb.svelte-1anvphb{background-image:url(../images/st15.png);width:31px;height:31px;margin-top:3px;margin-left:2px}.chaos.svelte-1anvphb.svelte-1anvphb{background-image:url(../images/chaos.png);width:30px;height:26px}",
  map: null
};
const MAX_PAD = 5;
function getPadName(pad2, mad2) {
  if (pad2 > 0 && mad2 > 0) {
    return `공격력 ${pad2}, 마력 ${mad2} 적용`;
  } else if (pad2 > 0) {
    return `공격력 ${pad2} 적용`;
  } else if (mad2 > 0) {
    return `마력 ${mad2} 적용`;
  } else {
    return `적용`;
  }
}
function getChaosStatsName(stats) {
  const count = stats.reduce((cnt, stat) => stat.value !== 0 ? cnt + 1 : cnt, 0);
  if (count === 0) {
    return " 적용";
  } else {
    let count2 = 0;
    let str = "";
    for (const stat of stats) {
      if (stat.value === 0)
        continue;
      if (count2 >= 3) {
        str += ", ...";
        break;
      }
      const valueStr = (stat.value > 0 ? "+" : "") + stat.value;
      if (str !== "") {
        str += ", ";
      }
      str += `${stat.name} ${valueStr}`;
      count2++;
    }
    return str + " 적용";
  }
}
const Upgrade = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let onlyScrolls;
  let exceptUpgrade;
  let onlyUpgrade;
  let canHammer;
  let canFail;
  let canRestore;
  let canInnocent;
  let canArkInnocent;
  let canScroll;
  let spellTraces;
  let selectedProb;
  let $gear, $$unsubscribe_gear;
  $$unsubscribe_gear = subscribe(gear, (value) => $gear = value);
  let { can = false } = $$props;
  let selectedId = 0;
  let spellTraceProbIdx = 0;
  function getSpellTraceTypes(gear2) {
    const jobStat = [
      [GearPropType.incSTR, GearPropType.incMHP],
      [GearPropType.incINT],
      [GearPropType.incDEX],
      [GearPropType.incSTR, GearPropType.incDEX, GearPropType.incLUK],
      [GearPropType.incSTR, GearPropType.incDEX, GearPropType.incLUK]
    ];
    let types = [];
    if (gear2.req.job === 0) {
      if (Gear.isWeapon(gear2.type) || gear2.type === GearType.katara) {
        types = [
          GearPropType.incSTR,
          GearPropType.incDEX,
          GearPropType.incLUK,
          GearPropType.incMHP,
          GearPropType.incINT
        ];
      } else {
        types = [
          GearPropType.incSTR,
          GearPropType.incDEX,
          GearPropType.incINT,
          GearPropType.incLUK,
          GearPropType.incMHP
        ];
      }
    } else {
      for (let i = 0; i < 5; i++) {
        if ((gear2.req.job & 1 << i) !== 0) {
          for (const stat of jobStat[i]) {
            if (!types.includes(stat))
              types.push(stat);
          }
        }
      }
    }
    types.sort((a, b) => a - b);
    if (Gear.isArmor(gear2.type)) {
      types.push(GearPropType.incAllStat);
    }
    return types;
  }
  function getSpellTraceInfos(gear2, types) {
    const infos = [];
    const probs = is15Gear(gear2) ? [100, 70, 30, 15] : [100, 70, 30];
    for (const type of types) {
      for (const prob of probs) {
        const scroll = getSpellTraceScroll(gear2, type, prob);
        if (scroll && !infos.some((info) => info.scroll.name === scroll.name)) {
          infos.push({ scroll, type, prob });
        }
      }
    }
    return infos;
  }
  function is15Gear(gear2) {
    return Gear.isWeapon(gear2.type) || gear2.type === GearType.katara;
  }
  let pad = 0;
  let mad = 0;
  const chaosTypes = [
    ["STR", GearPropType.incSTR],
    ["DEX", GearPropType.incDEX],
    ["INT", GearPropType.incINT],
    ["LUK", GearPropType.incLUK],
    ["최대 HP", GearPropType.incMHP],
    ["최대 MP", GearPropType.incMMP],
    ["공격력", GearPropType.incPAD],
    ["마력", GearPropType.incMAD],
    ["방어력", GearPropType.incPDD],
    ["이동속도", GearPropType.incSpeed],
    ["점프력", GearPropType.incJump]
  ];
  const chaosStats = chaosTypes.map((e) => ({ type: e[1], name: e[0], value: 0 }));
  function getPropWeight(type) {
    switch (type) {
      case GearPropType.incMHP:
      case GearPropType.incMMP:
        return 10;
      default:
        return 1;
    }
  }
  if ($$props.can === void 0 && $$bindings.can && can !== void 0)
    $$bindings.can(can);
  $$result.css.add(css$1);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    can = $gear !== void 0 && $gear.totalUpgradeCount > 0;
    onlyScrolls = $gear ? getOnlyScrolls($gear) : [];
    exceptUpgrade = $gear !== void 0 && $gear.getBooleanValue(GearPropType.exceptUpgrade);
    onlyUpgrade = $gear !== void 0 && $gear.getBooleanValue(GearPropType.onlyUpgrade);
    canHammer = $gear !== void 0 && !exceptUpgrade && !$gear.getBooleanValue(GearPropType.blockGoldHammer) && $gear.hammerCount === 0;
    canFail = $gear !== void 0 && !exceptUpgrade && !onlyUpgrade && $gear.upgradeCountLeft > 0;
    canRestore = $gear !== void 0 && $gear.upgradeFailCount > 0;
    canInnocent = $gear !== void 0 && ($gear.hammerCount > 0 || $gear.upgradeCount > 0 || $gear.upgradeFailCount > 0 || $gear.star > 0);
    canArkInnocent = $gear !== void 0 && !$gear.amazing && ($gear.hammerCount > 0 || $gear.upgradeCount > 0 || $gear.upgradeFailCount > 0);
    canScroll = $gear !== void 0 && $gear.upgradeCountLeft > 0;
    {
      {
        if (onlyUpgrade && selectedId !== 4)
          selectedId = 4;
        else if (onlyScrolls.length === 0 && selectedId === 4)
          selectedId = 0;
      }
    }
    spellTraces = $gear ? getSpellTraceInfos($gear, getSpellTraceTypes($gear)) : [];
    {
      if ($gear && !is15Gear($gear) && spellTraceProbIdx === 4)
        spellTraceProbIdx = 0;
    }
    selectedProb = [-1, 100, 70, 30, 15][spellTraceProbIdx];
    $$rendered = `${can && $gear ? `${validate_component(Row, "Row").$$render($$result, {}, {}, {
      default: () => {
        return `${validate_component(Column, "Column").$$render($$result, {}, {}, {
          default: () => {
            return `<div class="general svelte-1anvphb">${validate_component(Button, "Button").$$render(
              $$result,
              {
                kind: "secondary",
                disabled: !canHammer,
                style: "padding: var(--cds-spacing-05);"
              },
              {},
              {
                default: () => {
                  return `<div class="wrapper svelte-1anvphb"><div class="hammer icon svelte-1anvphb"></div>
						황금 망치
					</div>`;
                }
              }
            )}
				${validate_component(Button, "Button").$$render(
              $$result,
              {
                kind: "secondary",
                disabled: !canFail,
                style: "padding: var(--cds-spacing-05);"
              },
              {},
              {
                default: () => {
                  return `<div class="wrapper svelte-1anvphb"><div class="fail icon svelte-1anvphb"></div>
						주문서 실패
					</div>`;
                }
              }
            )}
				${validate_component(Button, "Button").$$render(
              $$result,
              {
                kind: "secondary",
                disabled: !canRestore,
                style: "padding: var(--cds-spacing-05);"
              },
              {},
              {
                default: () => {
                  return `<div class="wrapper svelte-1anvphb"><div class="restore icon svelte-1anvphb"></div>
						순백의 주문서
					</div>`;
                }
              }
            )}
				${validate_component(Button, "Button").$$render(
              $$result,
              {
                kind: "secondary",
                disabled: !canInnocent,
                style: "padding: var(--cds-spacing-05);"
              },
              {},
              {
                default: () => {
                  return `<div class="wrapper svelte-1anvphb"><div class="reset icon svelte-1anvphb"></div>
						이노센트
					</div>`;
                }
              }
            )}
				${validate_component(Button, "Button").$$render(
              $$result,
              {
                kind: "secondary",
                disabled: !canArkInnocent,
                style: "padding: var(--cds-spacing-05);"
              },
              {},
              {
                default: () => {
                  return `<div class="wrapper svelte-1anvphb"><div class="reset icon svelte-1anvphb"></div>
						아크 이노센트
					</div>`;
                }
              }
            )}</div>`;
          }
        })}`;
      }
    })}

	${validate_component(Dropdown, "Dropdown").$$render(
      $$result,
      {
        titleText: "주문서 분류",
        items: [
          {
            id: 0,
            text: "주문의 흔적",
            disabled: onlyUpgrade
          },
          {
            id: 1,
            text: "공격력/마력 주문서",
            disabled: onlyUpgrade
          },
          {
            id: 2,
            text: "혼돈의 주문서",
            disabled: onlyUpgrade
          },
          {
            id: 3,
            text: "특수 주문서",
            disabled: onlyUpgrade
          },
          {
            id: 4,
            text: "전용 주문서",
            disabled: onlyScrolls.length === 0
          }
        ],
        style: "margin-top: var(--cds-spacing-05);",
        selectedId
      },
      {
        selectedId: ($$value) => {
          selectedId = $$value;
          $$settled = false;
        }
      },
      {
        default: ({ item }) => {
          return `<div class="dropdown-item svelte-1anvphb"><div class="icon-wrapper svelte-1anvphb"><div class="${"scroll-icon-" + escape(item.id, true) + " icon svelte-1anvphb"}"></div></div>
			${escape(item.text)}</div>`;
        }
      }
    )}

	${selectedId === 0 ? `
		${validate_component(ContentSwitcher, "ContentSwitcher").$$render(
      $$result,
      {
        style: "margin-top: var(--cds-spacing-07); margin-bottom: var(--cds-spacing-05);",
        selectedIndex: spellTraceProbIdx
      },
      {
        selectedIndex: ($$value) => {
          spellTraceProbIdx = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(Switch, "Switch").$$render($$result, { text: "전체" }, {}, {})}
			${validate_component(Switch, "Switch").$$render($$result, { text: "100%" }, {}, {})}
			${validate_component(Switch, "Switch").$$render($$result, { text: "70%" }, {}, {})}
			${validate_component(Switch, "Switch").$$render($$result, { text: "30%" }, {}, {})}
			${is15Gear($gear) ? `${validate_component(Switch, "Switch").$$render($$result, { text: "15%" }, {}, {})}` : ``}`;
        }
      }
    )}

		${each(spellTraces.filter((st) => selectedProb === -1 || selectedProb === st.prob), (info, i) => {
      return `<div class="${"st-line-wrapper " + escape(i === 0 ? "first" : "", true) + " svelte-1anvphb"}">${validate_component(ClickableTile, "ClickableTile").$$render(
        $$result,
        {
          light: true,
          title: optionToStrings(info.scroll.stat).join("\n"),
          disabled: !canScroll,
          style: "min-height: 0;"
        },
        {},
        {
          default: () => {
            return `<div class="st-content-wrapper svelte-1anvphb"><div class="st-icon-wrapper svelte-1anvphb"><div class="${"spelltrace-" + escape(info.prob, true) + " icon svelte-1anvphb"}"></div></div>
						${escape(info.scroll.name)}</div>
				`;
          }
        }
      )}
				<div class="vr svelte-1anvphb"></div>
				${validate_component(ClickableTile, "ClickableTile").$$render(
        $$result,
        {
          light: true,
          disabled: !canScroll,
          style: "min-width: 0; min-height: 0;"
        },
        {},
        {
          default: () => {
            return `+${escape($gear.upgradeCountLeft)}
				`;
          }
        }
      )}
			</div>`;
    })}` : `${selectedId === 1 ? `
		${validate_component(Row, "Row").$$render(
      $$result,
      {
        style: "margin-top: var(--cds-spacing-07);"
      },
      {},
      {
        default: () => {
          return `${validate_component(Column, "Column").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(Select, "Select").$$render(
                $$result,
                { labelText: "공격력", selected: pad },
                {
                  selected: ($$value) => {
                    pad = $$value;
                    $$settled = false;
                  }
                },
                {
                  default: () => {
                    return `${each({ length: MAX_PAD + 1 }, (_, i) => {
                      return `${validate_component(SelectItem, "SelectItem").$$render($$result, { value: i }, {}, {})}`;
                    })}`;
                  }
                }
              )}`;
            }
          })}
			${validate_component(Column, "Column").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(Select, "Select").$$render(
                $$result,
                { labelText: "마력", selected: mad },
                {
                  selected: ($$value) => {
                    mad = $$value;
                    $$settled = false;
                  }
                },
                {
                  default: () => {
                    return `${each({ length: MAX_PAD + 1 }, (_, i) => {
                      return `${validate_component(SelectItem, "SelectItem").$$render($$result, { value: i }, {}, {})}`;
                    })}`;
                  }
                }
              )}`;
            }
          })}`;
        }
      }
    )}
		${validate_component(Row, "Row").$$render(
      $$result,
      {
        style: "margin-top: var(--cds-spacing-07);"
      },
      {},
      {
        default: () => {
          return `${validate_component(Column, "Column").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(Button, "Button").$$render($$result, { disabled: !canScroll }, {}, {
                default: () => {
                  return `${escape(getPadName(pad, mad))}`;
                }
              })}
				${validate_component(Button, "Button").$$render($$result, { kind: "tertiary", disabled: !canScroll }, {}, {
                default: () => {
                  return `${escape($gear.upgradeCountLeft)}회 적용
				`;
                }
              })}`;
            }
          })}`;
        }
      }
    )}` : `${selectedId === 2 ? `
		${validate_component(Row, "Row").$$render(
      $$result,
      {
        style: "margin-top: var(--cds-spacing-05)"
      },
      {},
      {
        default: () => {
          return `${each(chaosStats, (chaos) => {
            return `${validate_component(Column, "Column").$$render(
              $$result,
              {
                style: "margin-top: var(--cds-spacing-05);"
              },
              {},
              {
                default: () => {
                  return `${validate_component(NumberInput, "NumberInput").$$render(
                    $$result,
                    {
                      label: chaos.name,
                      min: -6 * getPropWeight(chaos.type),
                      max: 6 * getPropWeight(chaos.type),
                      step: 1 * getPropWeight(chaos.type),
                      invalid: !Number.isInteger(chaos.value / getPropWeight(chaos.type)),
                      style: "min-width: 100px; padding-right: var(--cds-spacing-11);",
                      value: chaos.value
                    },
                    {
                      value: ($$value) => {
                        chaos.value = $$value;
                        $$settled = false;
                      }
                    },
                    {}
                  )}
				`;
                }
              }
            )}`;
          })}
			
			${validate_component(Column, "Column").$$render($$result, {}, {}, {})}`;
        }
      }
    )}
		${validate_component(Row, "Row").$$render(
      $$result,
      {
        style: "margin-top: var(--cds-spacing-07);"
      },
      {},
      {
        default: () => {
          return `${validate_component(Column, "Column").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(Button, "Button").$$render($$result, { disabled: !canScroll }, {}, {
                default: () => {
                  return `<span class="collapse-text svelte-1anvphb">${escape(getChaosStatsName(chaosStats))}</span>`;
                }
              })}
				${validate_component(Button, "Button").$$render($$result, { kind: "tertiary", disabled: !canScroll }, {}, {
                default: () => {
                  return `${escape($gear.upgradeCountLeft)}회 적용
				`;
                }
              })}`;
            }
          })}`;
        }
      }
    )}` : `${selectedId === 3 ? `${validate_component(Row, "Row").$$render(
      $$result,
      {
        style: "margin-top: var(--cds-spacing-07);"
      },
      {},
      {
        default: () => {
          return `${validate_component(Column, "Column").$$render($$result, {}, {}, {
            default: () => {
              return `해당 장비에 사용 가능한 특수 주문서가 존재하지 않습니다.`;
            }
          })}`;
        }
      }
    )}` : `${selectedId === 4 ? `
		${each(onlyScrolls, (scroll, i) => {
      return `<div class="${"st-line-wrapper " + escape(i === 0 ? "first" : "", true) + " svelte-1anvphb"}">${validate_component(ClickableTile, "ClickableTile").$$render(
        $$result,
        {
          light: true,
          title: optionToStrings(scroll.stat).join("\n"),
          disabled: !canScroll,
          style: "min-height: 0;"
        },
        {},
        {
          default: () => {
            return `${escape(scroll.name)}
				`;
          }
        }
      )}
				<div class="vr svelte-1anvphb"></div>
				${validate_component(ClickableTile, "ClickableTile").$$render(
        $$result,
        {
          light: true,
          disabled: !canScroll,
          style: "min-width: 0; min-height: 0;"
        },
        {},
        {
          default: () => {
            return `+${escape($gear.upgradeCountLeft)}
				`;
          }
        }
      )}
			</div>`;
    })}` : ``}`}`}`}`}` : `주문서 강화 불가`}`;
  } while (!$$settled);
  $$unsubscribe_gear();
  return $$rendered;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".inventory.svelte-ucwvr.svelte-ucwvr{margin-top:var(--cds-spacing-05);display:grid;grid-template-columns:repeat(4, 1fr);gap:var(--cds-spacing-05)}@media(max-width: 32rem){.inventory.svelte-ucwvr.svelte-ucwvr{display:grid;grid-template-columns:repeat(3, 1fr);gap:var(--cds-spacing-05)}}.inv-buttons.svelte-ucwvr.svelte-ucwvr{display:flex;justify-content:right;gap:var(--cds-spacing-03)}.cursor-tooltip.svelte-ucwvr.svelte-ucwvr{position:fixed;pointer-events:none}@media(hover: none){.cursor-tooltip.svelte-ucwvr.svelte-ucwvr{display:none}}.enchant.svelte-ucwvr.svelte-ucwvr{display:grid;grid-template-columns:261px 1fr;gap:var(--cds-spacing-05)}@media(max-width: 50rem){.enchant.svelte-ucwvr.svelte-ucwvr{display:flex;flex-direction:column}.enchant.svelte-ucwvr>.tooltip-wrapper.svelte-ucwvr{align-self:center}}",
  map: null
};
function canUpload(gear2, gears) {
  return gear2 || gears.size > 0;
}
function getUploadMessage(gear2, gears) {
  if (gear2) {
    return `'${gear2.name}' 추가`;
  } else if (gears.size > 0) {
    if (gears.size > 1) {
      return `아이템 ${gears.size}개 추가`;
    } else {
      return `'${gears.values().next().value.name}' 추가`;
    }
  } else {
    return `아이템이 없습니다`;
  }
}
function getAddMessage(ids, count) {
  if (count > 1) {
    return `선택한 아이템 ${count}개 추가`;
  } else if (count === 1) {
    return `'${ids.values().next().value}' 추가`;
  } else {
    return "선택한 아이템이 없습니다";
  }
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let gearCount;
  let $inventory, $$unsubscribe_inventory;
  let $$unsubscribe_lastAdd;
  let $gear, $$unsubscribe_gear;
  let $$unsubscribe_selected;
  $$unsubscribe_inventory = subscribe(inventory, (value) => $inventory = value);
  $$unsubscribe_lastAdd = subscribe(lastAdd, (value) => value);
  $$unsubscribe_gear = subscribe(gear, (value) => $gear = value);
  $$unsubscribe_selected = subscribe(selected, (value) => value);
  let imgRefs = [];
  let importGear;
  let importOpen = false;
  let strGear;
  let uploadGears = /* @__PURE__ */ new Map();
  let addGear;
  let addOpen = false;
  let addIds = /* @__PURE__ */ new Map();
  let enchantTooltip;
  let display;
  let cursorTooltip;
  let m = { x: 0, y: 0 };
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    gearCount = $inventory.reduce((count, slot) => slot ? count + 1 : count, 0);
    $$rendered = `

<div>${validate_component(Content, "Content").$$render($$result, {}, {}, {
      default: () => {
        return `${validate_component(Grid, "Grid").$$render(
          $$result,
          {
            noGutter: true,
            style: "max-width: 32rem;"
          },
          {},
          {
            default: () => {
              return `${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
                default: () => {
                  return `${validate_component(Column, "Column").$$render($$result, {}, {}, {
                    default: () => {
                      return `<h2>인벤토리</h2>`;
                    }
                  })}
				${validate_component(Column, "Column").$$render($$result, {}, {}, {
                    default: () => {
                      return `<div class="inv-buttons svelte-ucwvr">${`${validate_component(Button, "Button").$$render(
                        $$result,
                        {
                          kind: "secondary",
                          icon: Upload,
                          iconDescription: "가져오기"
                        },
                        {},
                        {}
                      )}
							${`${validate_component(Button, "Button").$$render($$result, { icon: Add, iconDescription: "아이템 추가" }, {}, {})}`}
							${validate_component(Button, "Button").$$render(
                        $$result,
                        {
                          kind: "danger",
                          icon: TrashCan,
                          iconDescription: "삭제",
                          disabled: gearCount === 0
                        },
                        {},
                        {}
                      )}`}</div>`;
                    }
                  })}`;
                }
              })}
			${validate_component(Row, "Row").$$render($$result, { noGutter: true }, {}, {
                default: () => {
                  return `${validate_component(Column, "Column").$$render($$result, {}, {}, {
                    default: () => {
                      return `<div class="inventory svelte-ucwvr">${each($inventory, (slot, i) => {
                        return `${`<button class="${[
                          "dropzone bx--tile bx--tile--selectable",
                          !slot ? "bx--tile--disabled" : ""
                        ].join(" ").trim()}" ${!slot ? "disabled" : ""} draggable="true" style="min-width: 0; padding: calc(var(--cds-spacing-05) - 1px);">${validate_component(InvSlotContent, "InvSlot").$$render(
                          $$result,
                          { _slot: slot, imgRef: imgRefs[i] },
                          {
                            imgRef: ($$value) => {
                              imgRefs[i] = $$value;
                              $$settled = false;
                            }
                          },
                          {}
                        )}</button>
								`}`;
                      })}</div>`;
                    }
                  })}`;
                }
              })}`;
            }
          }
        )}`;
      }
    })}</div>


${validate_component(Modal, "Modal").$$render(
      $$result,
      {
        size: "sm",
        modalHeading: "가져오기",
        primaryButtonText: getUploadMessage(strGear, uploadGears),
        primaryButtonDisabled: !canUpload(strGear, uploadGears),
        open: importOpen
      },
      {
        open: ($$value) => {
          importOpen = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(ImportGear, "ImportGear").$$render(
            $$result,
            {
              strGear,
              fileGears: uploadGears,
              this: importGear
            },
            {
              strGear: ($$value) => {
                strGear = $$value;
                $$settled = false;
              },
              fileGears: ($$value) => {
                uploadGears = $$value;
                $$settled = false;
              },
              this: ($$value) => {
                importGear = $$value;
                $$settled = false;
              }
            },
            {}
          )}`;
        }
      }
    )}


${validate_component(ComposedModal, "ComposedModal").$$render(
      $$result,
      {
        size: "sm",
        selectorPrimaryFocus: "input",
        open: addOpen
      },
      {
        open: ($$value) => {
          addOpen = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(ModalHeader, "ModalHeader").$$render($$result, { title: "아이템 추가" }, {}, {})}
	${validate_component(ModalBody, "ModalBody").$$render(
            $$result,
            {
              hasForm: true,
              hasScrollingContent: true,
              tabindex: -1
            },
            {},
            {
              default: () => {
                return `${validate_component(AddGear, "AddGear").$$render(
                  $$result,
                  { selectedIds: addIds, this: addGear },
                  {
                    selectedIds: ($$value) => {
                      addIds = $$value;
                      $$settled = false;
                    },
                    this: ($$value) => {
                      addGear = $$value;
                      $$settled = false;
                    }
                  },
                  {}
                )}`;
              }
            }
          )}
	${validate_component(ModalFooter, "ModalFooter").$$render(
            $$result,
            {
              primaryButtonText: getAddMessage(addIds, addIds.size),
              primaryButtonDisabled: addIds.size === 0,
              secondaryButtonText: "취소"
            },
            {},
            {}
          )}`;
        }
      }
    )}


${validate_component(ComposedModal, "ComposedModal").$$render(
      $$result,
      {
        open: $gear !== void 0,
        selectorPrimaryFocus: "ul"
      },
      {},
      {
        default: () => {
          return `${validate_component(ModalHeader, "ModalHeader").$$render($$result, { title: "아이템 강화" }, {}, {})}
	${validate_component(ModalBody, "ModalBody").$$render(
            $$result,
            {
              hasForm: true,
              hasScrollingContent: true,
              tabindex: -1
            },
            {},
            {
              default: () => {
                return `${$gear && $gear.itemID > 0 ? `<div class="enchant svelte-ucwvr"><div class="tooltip-wrapper svelte-ucwvr">${validate_component(GearTooltip, "GearTooltip").$$render(
                  $$result,
                  { gear: $gear, ref: enchantTooltip },
                  {
                    ref: ($$value) => {
                      enchantTooltip = $$value;
                      $$settled = false;
                    }
                  },
                  {}
                )}</div>
				<div>${validate_component(Tabs, "Tabs").$$render($$result, { autoWidth: true }, {}, {
                  content: () => {
                    return `${validate_component(TabContent, "TabContent").$$render($$result, {}, {}, {
                      default: () => {
                        return `${validate_component(BonusStat, "BonusStat").$$render($$result, {}, {}, {})}`;
                      }
                    })}
							${validate_component(TabContent, "TabContent").$$render($$result, {}, {}, {
                      default: () => {
                        return `${validate_component(Upgrade, "Upgrade").$$render($$result, {}, {}, {})}`;
                      }
                    })}
							${validate_component(TabContent, "TabContent").$$render($$result, {}, {}, {
                      default: () => {
                        return `${validate_component(Enhance, "Enhance").$$render($$result, {}, {}, {})}`;
                      }
                    })}
							${validate_component(TabContent, "TabContent").$$render($$result, {}, {}, {
                      default: () => {
                        return `${validate_component(Potentials, "Potentials").$$render($$result, {}, {}, {})}`;
                      }
                    })}
							${validate_component(TabContent, "TabContent").$$render($$result, {}, {}, {
                      default: () => {
                        return `${validate_component(Manage, "Manage").$$render(
                          $$result,
                          { tooltipRef: enchantTooltip, display },
                          {
                            tooltipRef: ($$value) => {
                              enchantTooltip = $$value;
                              $$settled = false;
                            },
                            display: ($$value) => {
                              display = $$value;
                              $$settled = false;
                            }
                          },
                          {}
                        )}`;
                      }
                    })}
						`;
                  },
                  default: () => {
                    return `${validate_component(Tab, "Tab").$$render($$result, {}, {}, {
                      default: () => {
                        return `추가옵션`;
                      }
                    })}
						${validate_component(Tab, "Tab").$$render($$result, {}, {}, {
                      default: () => {
                        return `주문서`;
                      }
                    })}
						${validate_component(Tab, "Tab").$$render($$result, {}, {}, {
                      default: () => {
                        return `강화`;
                      }
                    })}
						${validate_component(Tab, "Tab").$$render($$result, {}, {}, {
                      default: () => {
                        return `잠재옵션`;
                      }
                    })}
						${validate_component(Tab, "Tab").$$render($$result, {}, {}, {
                      default: () => {
                        return `관리`;
                      }
                    })}`;
                  }
                })}</div></div>` : ``}`;
              }
            }
          )}
	${validate_component(ModalFooter, "ModalFooter").$$render($$result, {}, {}, {})}`;
        }
      }
    )}




<div class="cursor-tooltip svelte-ucwvr" style="${"top: " + escape(m.y, true) + "px; left: " + escape(m.x, true) + "px;"}"${add_attribute("this", cursorTooltip, 0)}>${``}
</div>`;
  } while (!$$settled);
  $$unsubscribe_inventory();
  $$unsubscribe_lastAdd();
  $$unsubscribe_gear();
  $$unsubscribe_selected();
  return $$rendered;
});
export {
  Page as default
};
