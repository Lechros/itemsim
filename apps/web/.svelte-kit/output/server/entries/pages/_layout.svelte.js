import { c as create_ssr_component, a as compute_rest_props, b as spread, e as escape_attribute_value, d as escape_object, f as escape, g as add_attribute, v as validate_component, m as missing_component, h as subscribe, i as add_classes } from "../../chunks/index2.js";
import { C as Close, s as shouldRenderHamburgerMenu } from "../../chunks/HeaderSearch.svelte_svelte_type_style_lang.js";
const Menu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  )}>${title ? `<title>${escape(title)}</title>` : ``}<path d="M4 6H28V8H4zM4 24H28V26H4zM4 12H28V14H4zM4 18H28V20H4z"></path></svg>`;
});
const HamburgerMenu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["ariaLabel", "isOpen", "iconMenu", "iconClose", "ref"]);
  let { ariaLabel = void 0 } = $$props;
  let { isOpen = false } = $$props;
  let { iconMenu = Menu } = $$props;
  let { iconClose = Close } = $$props;
  let { ref = null } = $$props;
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0)
    $$bindings.ariaLabel(ariaLabel);
  if ($$props.isOpen === void 0 && $$bindings.isOpen && isOpen !== void 0)
    $$bindings.isOpen(isOpen);
  if ($$props.iconMenu === void 0 && $$bindings.iconMenu && iconMenu !== void 0)
    $$bindings.iconMenu(iconMenu);
  if ($$props.iconClose === void 0 && $$bindings.iconClose && iconClose !== void 0)
    $$bindings.iconClose(iconClose);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  return `<button${spread(
    [
      { type: "button" },
      { title: escape_attribute_value(ariaLabel) },
      {
        "aria-label": escape_attribute_value(ariaLabel)
      },
      escape_object($$restProps)
    ],
    {
      classes: "bx--header__action bx--header__menu-trigger bx--header__menu-toggle"
    }
  )}${add_attribute("this", ref, 0)}>${validate_component((isOpen ? iconClose : iconMenu) || missing_component, "svelte:component").$$render($$result, { size: 20 }, {}, {})}</button>`;
});
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let $$restProps = compute_rest_props($$props, [
    "expandedByDefault",
    "isSideNavOpen",
    "uiShellAriaLabel",
    "href",
    "company",
    "platformName",
    "persistentHamburgerMenu",
    "expansionBreakpoint",
    "ref",
    "iconMenu",
    "iconClose"
  ]);
  let $shouldRenderHamburgerMenu, $$unsubscribe_shouldRenderHamburgerMenu;
  $$unsubscribe_shouldRenderHamburgerMenu = subscribe(shouldRenderHamburgerMenu, (value) => $shouldRenderHamburgerMenu = value);
  let { expandedByDefault = true } = $$props;
  let { isSideNavOpen = false } = $$props;
  let { uiShellAriaLabel = void 0 } = $$props;
  let { href = void 0 } = $$props;
  let { company = void 0 } = $$props;
  let { platformName = "" } = $$props;
  let { persistentHamburgerMenu = false } = $$props;
  let { expansionBreakpoint = 1056 } = $$props;
  let { ref = null } = $$props;
  let { iconMenu = Menu } = $$props;
  let { iconClose = Close } = $$props;
  let winWidth = void 0;
  if ($$props.expandedByDefault === void 0 && $$bindings.expandedByDefault && expandedByDefault !== void 0)
    $$bindings.expandedByDefault(expandedByDefault);
  if ($$props.isSideNavOpen === void 0 && $$bindings.isSideNavOpen && isSideNavOpen !== void 0)
    $$bindings.isSideNavOpen(isSideNavOpen);
  if ($$props.uiShellAriaLabel === void 0 && $$bindings.uiShellAriaLabel && uiShellAriaLabel !== void 0)
    $$bindings.uiShellAriaLabel(uiShellAriaLabel);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.company === void 0 && $$bindings.company && company !== void 0)
    $$bindings.company(company);
  if ($$props.platformName === void 0 && $$bindings.platformName && platformName !== void 0)
    $$bindings.platformName(platformName);
  if ($$props.persistentHamburgerMenu === void 0 && $$bindings.persistentHamburgerMenu && persistentHamburgerMenu !== void 0)
    $$bindings.persistentHamburgerMenu(persistentHamburgerMenu);
  if ($$props.expansionBreakpoint === void 0 && $$bindings.expansionBreakpoint && expansionBreakpoint !== void 0)
    $$bindings.expansionBreakpoint(expansionBreakpoint);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  if ($$props.iconMenu === void 0 && $$bindings.iconMenu && iconMenu !== void 0)
    $$bindings.iconMenu(iconMenu);
  if ($$props.iconClose === void 0 && $$bindings.iconClose && iconClose !== void 0)
    $$bindings.iconClose(iconClose);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    isSideNavOpen = expandedByDefault && winWidth >= expansionBreakpoint && !persistentHamburgerMenu;
    ariaLabel = company ? `${company} ` : "" + (uiShellAriaLabel || $$props["aria-label"] || platformName);
    $$rendered = `

<header${add_attribute("aria-label", ariaLabel, 0)}${add_classes("bx--header".trim())}>${slots["skip-to-content"] ? slots["skip-to-content"]({}) : ``}
  ${$shouldRenderHamburgerMenu && winWidth < expansionBreakpoint || persistentHamburgerMenu ? `${validate_component(HamburgerMenu, "HamburgerMenu").$$render(
      $$result,
      {
        iconClose,
        iconMenu,
        isOpen: isSideNavOpen
      },
      {
        isOpen: ($$value) => {
          isSideNavOpen = $$value;
          $$settled = false;
        }
      },
      {}
    )}` : ``}
  <a${spread([{ href: escape_attribute_value(href) }, escape_object($$restProps)], { classes: "bx--header__name" })}${add_attribute("this", ref, 0)}>${company ? `<span${add_classes("bx--header__name--prefix".trim())}>${escape(company)} </span>` : ``}
    ${slots.platform ? slots.platform({}) : `${escape(platformName)}`}</a>
  ${slots.default ? slots.default({}) : ``}</header>`;
  } while (!$$settled);
  $$unsubscribe_shouldRenderHamburgerMenu();
  return $$rendered;
});
const css = {
  code: ".bx--header__action.svelte-smaelc{display:flex;align-items:center;justify-content:center;padding-bottom:2px}",
  map: null
};
const HeaderActionLink = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["linkIsActive", "href", "icon", "ref"]);
  let { linkIsActive = false } = $$props;
  let { href = void 0 } = $$props;
  let { icon = void 0 } = $$props;
  let { ref = null } = $$props;
  if ($$props.linkIsActive === void 0 && $$bindings.linkIsActive && linkIsActive !== void 0)
    $$bindings.linkIsActive(linkIsActive);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  $$result.css.add(css);
  return `<a${spread(
    [
      { href: escape_attribute_value(href) },
      {
        rel: escape_attribute_value($$restProps.target === "_blank" ? "noopener noreferrer" : void 0)
      },
      escape_object($$restProps)
    ],
    {
      classes: "bx--header__action " + (linkIsActive ? "bx--header__action--active" : "") + " svelte-smaelc"
    }
  )}${add_attribute("this", ref, 0)}>${slots.icon ? slots.icon({}) : `
    ${validate_component(icon || missing_component, "svelte:component").$$render($$result, { size: 20 }, {}, {})}
  `}
</a>`;
});
const HeaderUtilities = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div${add_classes("bx--header__global".trim())}>${slots.default ? slots.default({}) : ``}</div>`;
});
const SkipToContent = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["href", "tabindex"]);
  let { href = "#main-content" } = $$props;
  let { tabindex = "0" } = $$props;
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  return `<a${spread(
    [
      { href: escape_attribute_value(href) },
      {
        tabindex: escape_attribute_value(tabindex)
      },
      escape_object($$restProps)
    ],
    {
      classes: "bx--skip-to-content"
    }
  )}>${slots.default ? slots.default({}) : `Skip to main content`}</a>`;
});
const HeaderGlobalAction = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["isActive", "icon", "ref"]);
  let { isActive = false } = $$props;
  let { icon = void 0 } = $$props;
  let { ref = null } = $$props;
  if ($$props.isActive === void 0 && $$bindings.isActive && isActive !== void 0)
    $$bindings.isActive(isActive);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  return `<button${spread([{ type: "button" }, escape_object($$restProps)], {
    classes: "bx--header__action " + (isActive ? "bx--header__action--active" : "")
  })}${add_attribute("this", ref, 0)}>${slots.default ? slots.default({}) : `
    ${validate_component(icon || missing_component, "svelte:component").$$render($$result, { size: 20 }, {}, {})}
  `}</button>`;
});
const BrightnessContrast = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  )}>${title ? `<title>${escape(title)}</title>` : ``}<path d="M15 2H17V5H15zM27 15H30V17H27zM15 27H17V30H15zM2 15H5V17H2z"></path><path d="M6.22 5.73H8.219999999999999V8.73H6.22z" transform="rotate(-45 7.227 7.236)"></path><path d="M23.27 6.23H26.27V8.23H23.27z" transform="rotate(-45 24.766 7.232)"></path><path d="M23.77 23.27H25.77V26.27H23.77z" transform="rotate(-45 24.77 24.77)"></path><path d="M5.47 25.13L7.59 23 9 24.42 6.88 26.54 5.47 25.13zM16 8a8 8 0 108 8A8 8 0 0016 8zm0 14a6 6 0 010-12z"></path></svg>`;
});
const LogoDiscord = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  )}>${title ? `<title>${escape(title)}</title>` : ``}<path d="M25.7,7.1C23.9,6.3,22,5.7,20,5.3c0,0-0.1,0-0.1,0c-0.2,0.4-0.5,1-0.7,1.5c-2.2-0.3-4.3-0.3-6.4,0c-0.2-0.5-0.5-1-0.7-1.5	c0,0-0.1,0-0.1,0c-2,0.3-3.9,0.9-5.7,1.8c0,0,0,0,0,0c-3.6,5.4-4.6,10.7-4.1,15.9c0,0,0,0.1,0,0.1c2.4,1.8,4.7,2.8,7,3.5	c0,0,0.1,0,0.1,0c0.5-0.7,1-1.5,1.4-2.3c0,0,0-0.1,0-0.1c-0.8-0.3-1.5-0.6-2.2-1c-0.1,0-0.1-0.1,0-0.1c0.1-0.1,0.3-0.2,0.4-0.3	c0,0,0.1,0,0.1,0c4.6,2.1,9.5,2.1,14.1,0c0,0,0.1,0,0.1,0c0.1,0.1,0.3,0.2,0.4,0.3c0.1,0,0,0.1,0,0.1c-0.7,0.4-1.4,0.8-2.2,1	c0,0-0.1,0.1,0,0.1c0.4,0.8,0.9,1.6,1.4,2.3c0,0,0.1,0,0.1,0c2.3-0.7,4.6-1.8,7-3.5c0,0,0,0,0-0.1C30.5,17,28.9,11.8,25.7,7.1	C25.7,7.1,25.7,7.1,25.7,7.1z M11.4,19.9c-1.4,0-2.5-1.3-2.5-2.8s1.1-2.8,2.5-2.8c1.4,0,2.5,1.3,2.5,2.8	C13.9,18.6,12.8,19.9,11.4,19.9z M20.7,19.9c-1.4,0-2.5-1.3-2.5-2.8s1.1-2.8,2.5-2.8c1.4,0,2.5,1.3,2.5,2.8	C23.2,18.6,22.1,19.9,20.7,19.9z"></path></svg>`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Header, "Header").$$render(
    $$result,
    {
      company: "메이플스토리",
      platformName: "아이템 시뮬레이터"
    },
    {},
    {
      "skip-to-content": () => {
        return `${validate_component(SkipToContent, "SkipToContent").$$render($$result, {}, {}, {})}
	`;
      },
      default: () => {
        return `${validate_component(HeaderUtilities, "HeaderUtilities").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(HeaderGlobalAction, "HeaderGlobalAction").$$render($$result, { icon: BrightnessContrast }, {}, {})}
		${validate_component(HeaderActionLink, "HeaderActionLink").$$render(
              $$result,
              {
                icon: LogoDiscord,
                target: "_blank",
                href: "https://discord.gg/Kzzn8zuj2p"
              },
              {},
              {}
            )}`;
          }
        })}`;
      }
    }
  )}

${slots.default ? slots.default({}) : ``}`;
});
export {
  Layout as default
};
