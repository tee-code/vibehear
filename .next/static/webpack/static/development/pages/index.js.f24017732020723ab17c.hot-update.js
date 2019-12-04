webpackHotUpdate("static\\development\\pages\\index.js",{

/***/ "./node_modules/@material-ui/core/esm/Avatar/Avatar.js":
false,

/***/ "./node_modules/@material-ui/core/esm/Avatar/index.js":
false,

/***/ "./node_modules/@material-ui/core/esm/Box/Box.js":
false,

/***/ "./node_modules/@material-ui/core/esm/Box/index.js":
false,

/***/ "./node_modules/@material-ui/core/esm/Button/Button.js":
false,

/***/ "./node_modules/@material-ui/core/esm/Button/index.js":
false,

/***/ "./node_modules/@material-ui/core/esm/ButtonBase/ButtonBase.js":
false,

/***/ "./node_modules/@material-ui/core/esm/ButtonBase/Ripple.js":
false,

/***/ "./node_modules/@material-ui/core/esm/ButtonBase/TouchRipple.js":
false,

/***/ "./node_modules/@material-ui/core/esm/ButtonBase/index.js":
false,

/***/ "./node_modules/@material-ui/core/esm/Checkbox/Checkbox.js":
false,

/***/ "./node_modules/@material-ui/core/esm/Checkbox/index.js":
false,

/***/ "./node_modules/@material-ui/core/esm/Container/Container.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@material-ui/core/esm/Container/Container.js ***!
  \*******************************************************************/
/*! exports provided: styles, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styles", function() { return styles; });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@material-ui/core/node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "./node_modules/@material-ui/core/node_modules/@babel/runtime/helpers/objectWithoutProperties.js");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@material-ui/core/node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "./node_modules/@material-ui/core/node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.m.js");
/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils */ "./node_modules/@material-ui/core/esm/utils/index.js");








var styles = function styles(theme) {
  var _root;

  return {
    /* Styles applied to the root element. */
    root: (_root = {
      width: '100%',
      marginLeft: 'auto',
      boxSizing: 'border-box',
      marginRight: 'auto',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_root, theme.breakpoints.up('sm'), {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3)
    }), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_root, theme.breakpoints.up('md'), {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4)
    }), _root),

    /* Styles applied to the root element if `fixed={true}`. */
    fixed: Object.keys(theme.breakpoints.values).reduce(function (acc, breakpoint) {
      var value = theme.breakpoints.values[breakpoint];

      if (value !== 0) {
        acc[theme.breakpoints.up(breakpoint)] = {
          maxWidth: value
        };
      }

      return acc;
    }, {}),

    /* Styles applied to the root element if `maxWidth="xs"`. */
    maxWidthXs: _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()({}, theme.breakpoints.up('xs'), {
      maxWidth: Math.max(theme.breakpoints.values.xs, 444)
    }),

    /* Styles applied to the root element if `maxWidth="sm"`. */
    maxWidthSm: _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()({}, theme.breakpoints.up('sm'), {
      maxWidth: theme.breakpoints.values.sm
    }),

    /* Styles applied to the root element if `maxWidth="md"`. */
    maxWidthMd: _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()({}, theme.breakpoints.up('md'), {
      maxWidth: theme.breakpoints.values.md
    }),

    /* Styles applied to the root element if `maxWidth="lg"`. */
    maxWidthLg: _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()({}, theme.breakpoints.up('lg'), {
      maxWidth: theme.breakpoints.values.lg
    }),

    /* Styles applied to the root element if `maxWidth="xl"`. */
    maxWidthXl: _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()({}, theme.breakpoints.up('xl'), {
      maxWidth: theme.breakpoints.values.xl
    })
  };
};
var Container = react__WEBPACK_IMPORTED_MODULE_3___default.a.forwardRef(function Container(props, ref) {
  var classes = props.classes,
      className = props.className,
      _props$component = props.component,
      Component = _props$component === void 0 ? 'div' : _props$component,
      _props$fixed = props.fixed,
      fixed = _props$fixed === void 0 ? false : _props$fixed,
      _props$maxWidth = props.maxWidth,
      maxWidth = _props$maxWidth === void 0 ? 'lg' : _props$maxWidth,
      other = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default()(props, ["classes", "className", "component", "fixed", "maxWidth"]);

  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Component, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
    className: Object(clsx__WEBPACK_IMPORTED_MODULE_5__["default"])(classes.root, className, fixed && classes.fixed, maxWidth !== false && classes["maxWidth".concat(Object(_utils__WEBPACK_IMPORTED_MODULE_7__["capitalize"])(String(maxWidth)))]),
    ref: ref
  }, other));
});
 true ? Container.propTypes = {
  children: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.node.isRequired,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.object.isRequired,

  /**
   * @ignore
   */
  className: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string,

  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.elementType,

  /**
   * Set the max-width to match the min-width of the current breakpoint.
   * This is useful if you'd prefer to design for a fixed set of sizes
   * instead of trying to accommodate a fully fluid viewport.
   * It's fluid by default.
   */
  fixed: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool,

  /**
   * Determine the max-width of the container.
   * The container width grows with the size of the screen.
   * Set to `false` to disable `maxWidth`.
   */
  maxWidth: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.oneOf(['xs', 'sm', 'md', 'lg', 'xl', false])
} : undefined;
/* harmony default export */ __webpack_exports__["default"] = (Object(_styles__WEBPACK_IMPORTED_MODULE_6__["withStyles"])(styles, {
  name: 'MuiContainer'
})(Container));

/***/ }),

/***/ "./node_modules/@material-ui/core/esm/Container/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/@material-ui/core/esm/Container/index.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Container */ "./node_modules/@material-ui/core/esm/Container/Container.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _Container__WEBPACK_IMPORTED_MODULE_0__["default"]; });



/***/ }),

/***/ "./node_modules/@material-ui/core/esm/FilledInput/FilledInput.js":
false,

/***/ "./node_modules/@material-ui/core/esm/FilledInput/index.js":
false,

/***/ "./node_modules/@material-ui/core/esm/FormControl/FormControl.js":
false,

/***/ "./node_modules/@material-ui/core/esm/FormControl/FormControlContext.js":
false,

/***/ "./node_modules/@material-ui/core/esm/FormControl/formControlState.js":
false,

/***/ "./node_modules/@material-ui/core/esm/FormControl/index.js":
false,

/***/ "./node_modules/@material-ui/core/esm/FormControl/useFormControl.js":
false,

/***/ "./node_modules/@material-ui/core/esm/FormControlLabel/FormControlLabel.js":
false,

/***/ "./node_modules/@material-ui/core/esm/FormControlLabel/index.js":
false,

/***/ "./node_modules/@material-ui/core/esm/FormHelperText/FormHelperText.js":
false,

/***/ "./node_modules/@material-ui/core/esm/FormHelperText/index.js":
false,

/***/ "./node_modules/@material-ui/core/esm/FormLabel/FormLabel.js":
false,

/***/ "./node_modules/@material-ui/core/esm/FormLabel/index.js":
false,

/***/ "./node_modules/@material-ui/core/esm/Grid/Grid.js":
false,

/***/ "./node_modules/@material-ui/core/esm/Grid/index.js":
false,

/***/ "./node_modules/@material-ui/core/esm/Grow/Grow.js":
false,

/***/ "./node_modules/@material-ui/core/esm/Grow/index.js":
false,

/***/ "./node_modules/@material-ui/core/esm/IconButton/IconButton.js":
false,

/***/ "./node_modules/@material-ui/core/esm/IconButton/index.js":
false,

/***/ "./node_modules/@material-ui/core/esm/Input/Input.js":
false,

/***/ "./node_modules/@material-ui/core/esm/Input/index.js":
false,

/***/ "./node_modules/@material-ui/core/esm/InputBase/InputBase.js":
false,

/***/ "./node_modules/@material-ui/core/esm/InputBase/index.js":
false,

/***/ "./node_modules/@material-ui/core/esm/InputBase/utils.js":
false,

/***/ "./node_modules/@material-ui/core/esm/InputLabel/InputLabel.js":
false,

/***/ "./node_modules/@material-ui/core/esm/InputLabel/index.js":
false,

/***/ "./node_modules/@material-ui/core/esm/Link/Link.js":
false,

/***/ "./node_modules/@material-ui/core/esm/Link/index.js":
false,

/***/ "./node_modules/@material-ui/core/esm/List/List.js":
false,

/***/ "./node_modules/@material-ui/core/esm/List/ListContext.js":
false,

/***/ "./node_modules/@material-ui/core/esm/List/index.js":
false,

/***/ "./node_modules/@material-ui/core/esm/Menu/Menu.js":
false,

/***/ "./node_modules/@material-ui/core/esm/MenuList/MenuList.js":
false,

/***/ "./node_modules/@material-ui/core/esm/MenuList/index.js":
false,

/***/ "./node_modules/@material-ui/core/esm/Modal/Modal.js":
false,

/***/ "./node_modules/@material-ui/core/esm/Modal/ModalManager.js":
false,

/***/ "./node_modules/@material-ui/core/esm/Modal/SimpleBackdrop.js":
false,

/***/ "./node_modules/@material-ui/core/esm/Modal/TrapFocus.js":
false,

/***/ "./node_modules/@material-ui/core/esm/Modal/index.js":
false,

/***/ "./node_modules/@material-ui/core/esm/NativeSelect/NativeSelect.js":
false,

/***/ "./node_modules/@material-ui/core/esm/NativeSelect/NativeSelectInput.js":
false,

/***/ "./node_modules/@material-ui/core/esm/NoSsr/NoSsr.js":
false,

/***/ "./node_modules/@material-ui/core/esm/NoSsr/index.js":
false,

/***/ "./node_modules/@material-ui/core/esm/OutlinedInput/NotchedOutline.js":
false,

/***/ "./node_modules/@material-ui/core/esm/OutlinedInput/OutlinedInput.js":
false,

/***/ "./node_modules/@material-ui/core/esm/OutlinedInput/index.js":
false,

/***/ "./node_modules/@material-ui/core/esm/Paper/Paper.js":
false,

/***/ "./node_modules/@material-ui/core/esm/Paper/index.js":
false,

/***/ "./node_modules/@material-ui/core/esm/Popover/Popover.js":
false,

/***/ "./node_modules/@material-ui/core/esm/Popover/index.js":
false,

/***/ "./node_modules/@material-ui/core/esm/Portal/Portal.js":
false,

/***/ "./node_modules/@material-ui/core/esm/Portal/index.js":
false,

/***/ "./node_modules/@material-ui/core/esm/Select/Select.js":
false,

/***/ "./node_modules/@material-ui/core/esm/Select/SelectInput.js":
false,

/***/ "./node_modules/@material-ui/core/esm/Select/index.js":
false,

/***/ "./node_modules/@material-ui/core/esm/SvgIcon/SvgIcon.js":
false,

/***/ "./node_modules/@material-ui/core/esm/SvgIcon/index.js":
false,

/***/ "./node_modules/@material-ui/core/esm/TextField/TextField.js":
false,

/***/ "./node_modules/@material-ui/core/esm/TextField/index.js":
false,

/***/ "./node_modules/@material-ui/core/esm/TextareaAutosize/TextareaAutosize.js":
false,

/***/ "./node_modules/@material-ui/core/esm/TextareaAutosize/index.js":
false,

/***/ "./node_modules/@material-ui/core/esm/internal/SwitchBase.js":
false,

/***/ "./node_modules/@material-ui/core/esm/internal/svg-icons/ArrowDropDown.js":
false,

/***/ "./node_modules/@material-ui/core/esm/internal/svg-icons/CheckBox.js":
false,

/***/ "./node_modules/@material-ui/core/esm/internal/svg-icons/CheckBoxOutlineBlank.js":
false,

/***/ "./node_modules/@material-ui/core/esm/internal/svg-icons/IndeterminateCheckBox.js":
false,

/***/ "./node_modules/@material-ui/core/esm/internal/svg-icons/createSvgIcon.js":
false,

/***/ "./node_modules/@material-ui/core/esm/transitions/utils.js":
false,

/***/ "./node_modules/@material-ui/core/esm/utils/debounce.js":
false,

/***/ "./node_modules/@material-ui/core/esm/utils/deprecatedPropType.js":
/*!************************************************************************!*\
  !*** ./node_modules/@material-ui/core/esm/utils/deprecatedPropType.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function deprecatedPropType(validator, reason) {
  if (false) {}

  return function (props, propName, componentName, location, propFullName) {
    var componentNameSafe = componentName || '<<anonymous>>';
    var propFullNameSafe = propFullName || propName;

    if (typeof props[propName] !== 'undefined') {
      return new Error("The ".concat(location, " `").concat(propFullNameSafe, "` of ") + "`".concat(componentNameSafe, "` is deprecated. ").concat(reason));
    }

    return null;
  };
}

/* harmony default export */ __webpack_exports__["default"] = (deprecatedPropType);

/***/ }),

/***/ "./node_modules/@material-ui/core/esm/utils/getScrollbarSize.js":
false,

/***/ "./node_modules/@material-ui/core/esm/utils/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/@material-ui/core/esm/utils/index.js ***!
  \***********************************************************/
/*! exports provided: deprecatedPropType, capitalize, createChainedFunction, isMuiElement, setRef, useForkRef, useIsFocusVisible, ownerDocument, ownerWindow, requirePropFactory, unsupportedProp, useEventCallback */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _deprecatedPropType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./deprecatedPropType */ "./node_modules/@material-ui/core/esm/utils/deprecatedPropType.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "deprecatedPropType", function() { return _deprecatedPropType__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers */ "./node_modules/@material-ui/core/esm/utils/helpers.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "capitalize", function() { return _helpers__WEBPACK_IMPORTED_MODULE_1__["capitalize"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createChainedFunction", function() { return _helpers__WEBPACK_IMPORTED_MODULE_1__["createChainedFunction"]; });

/* harmony import */ var _reactHelpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./reactHelpers */ "./node_modules/@material-ui/core/esm/utils/reactHelpers.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isMuiElement", function() { return _reactHelpers__WEBPACK_IMPORTED_MODULE_2__["isMuiElement"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setRef", function() { return _reactHelpers__WEBPACK_IMPORTED_MODULE_2__["setRef"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useForkRef", function() { return _reactHelpers__WEBPACK_IMPORTED_MODULE_2__["useForkRef"]; });

/* harmony import */ var _focusVisible__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./focusVisible */ "./node_modules/@material-ui/core/esm/utils/focusVisible.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useIsFocusVisible", function() { return _focusVisible__WEBPACK_IMPORTED_MODULE_3__["useIsFocusVisible"]; });

/* harmony import */ var _ownerDocument__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ownerDocument */ "./node_modules/@material-ui/core/esm/utils/ownerDocument.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ownerDocument", function() { return _ownerDocument__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _ownerWindow__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ownerWindow */ "./node_modules/@material-ui/core/esm/utils/ownerWindow.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ownerWindow", function() { return _ownerWindow__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _requirePropFactory__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./requirePropFactory */ "./node_modules/@material-ui/core/esm/utils/requirePropFactory.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "requirePropFactory", function() { return _requirePropFactory__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _unsupportedProp__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./unsupportedProp */ "./node_modules/@material-ui/core/esm/utils/unsupportedProp.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "unsupportedProp", function() { return _unsupportedProp__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _useEventCallback__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./useEventCallback */ "./node_modules/@material-ui/core/esm/utils/useEventCallback.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useEventCallback", function() { return _useEventCallback__WEBPACK_IMPORTED_MODULE_8__["default"]; });











/***/ }),

/***/ "./node_modules/@material-ui/core/esm/utils/unsupportedProp.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@material-ui/core/esm/utils/unsupportedProp.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function unsupportedProp(props, propName, componentName, location, propFullName) {
  if (false) {}

  var propFullNameSafe = propFullName || propName;

  if (typeof props[propName] !== 'undefined') {
    return new Error("The property `".concat(propFullNameSafe, "` is not supported. Please remove it."));
  }

  return null;
}

/* harmony default export */ __webpack_exports__["default"] = (unsupportedProp);

/***/ }),

/***/ "./node_modules/@material-ui/core/node_modules/@babel/runtime/helpers/arrayWithHoles.js":
false,

/***/ "./node_modules/@material-ui/core/node_modules/@babel/runtime/helpers/arrayWithoutHoles.js":
false,

/***/ "./node_modules/@material-ui/core/node_modules/@babel/runtime/helpers/classCallCheck.js":
false,

/***/ "./node_modules/@material-ui/core/node_modules/@babel/runtime/helpers/createClass.js":
false,

/***/ "./node_modules/@material-ui/core/node_modules/@babel/runtime/helpers/iterableToArray.js":
false,

/***/ "./node_modules/@material-ui/core/node_modules/@babel/runtime/helpers/iterableToArrayLimit.js":
false,

/***/ "./node_modules/@material-ui/core/node_modules/@babel/runtime/helpers/nonIterableRest.js":
false,

/***/ "./node_modules/@material-ui/core/node_modules/@babel/runtime/helpers/nonIterableSpread.js":
false,

/***/ "./node_modules/@material-ui/core/node_modules/@babel/runtime/helpers/slicedToArray.js":
false,

/***/ "./node_modules/@material-ui/core/node_modules/@babel/runtime/helpers/toConsumableArray.js":
false,

/***/ "./node_modules/@material-ui/core/node_modules/@babel/runtime/helpers/typeof.js":
false,

/***/ "./node_modules/@material-ui/system/esm/borders.js":
false,

/***/ "./node_modules/@material-ui/system/esm/breakpoints.js":
false,

/***/ "./node_modules/@material-ui/system/esm/compose.js":
false,

/***/ "./node_modules/@material-ui/system/esm/css.js":
false,

/***/ "./node_modules/@material-ui/system/esm/display.js":
false,

/***/ "./node_modules/@material-ui/system/esm/flexbox.js":
false,

/***/ "./node_modules/@material-ui/system/esm/index.js":
false,

/***/ "./node_modules/@material-ui/system/esm/memoize.js":
false,

/***/ "./node_modules/@material-ui/system/esm/merge.js":
false,

/***/ "./node_modules/@material-ui/system/esm/palette.js":
false,

/***/ "./node_modules/@material-ui/system/esm/positions.js":
false,

/***/ "./node_modules/@material-ui/system/esm/responsivePropType.js":
false,

/***/ "./node_modules/@material-ui/system/esm/shadows.js":
false,

/***/ "./node_modules/@material-ui/system/esm/sizing.js":
false,

/***/ "./node_modules/@material-ui/system/esm/spacing.js":
false,

/***/ "./node_modules/@material-ui/system/esm/style.js":
false,

/***/ "./node_modules/@material-ui/system/esm/typography.js":
false,

/***/ "./node_modules/@material-ui/system/node_modules/@babel/runtime/helpers/arrayWithHoles.js":
false,

/***/ "./node_modules/@material-ui/system/node_modules/@babel/runtime/helpers/arrayWithoutHoles.js":
false,

/***/ "./node_modules/@material-ui/system/node_modules/@babel/runtime/helpers/defineProperty.js":
false,

/***/ "./node_modules/@material-ui/system/node_modules/@babel/runtime/helpers/extends.js":
false,

/***/ "./node_modules/@material-ui/system/node_modules/@babel/runtime/helpers/iterableToArray.js":
false,

/***/ "./node_modules/@material-ui/system/node_modules/@babel/runtime/helpers/iterableToArrayLimit.js":
false,

/***/ "./node_modules/@material-ui/system/node_modules/@babel/runtime/helpers/nonIterableRest.js":
false,

/***/ "./node_modules/@material-ui/system/node_modules/@babel/runtime/helpers/nonIterableSpread.js":
false,

/***/ "./node_modules/@material-ui/system/node_modules/@babel/runtime/helpers/slicedToArray.js":
false,

/***/ "./node_modules/@material-ui/system/node_modules/@babel/runtime/helpers/toConsumableArray.js":
false,

/***/ "./node_modules/@material-ui/system/node_modules/@babel/runtime/helpers/typeof.js":
false,

/***/ "./node_modules/@material-ui/system/node_modules/prop-types/checkPropTypes.js":
false,

/***/ "./node_modules/@material-ui/system/node_modules/prop-types/factoryWithTypeCheckers.js":
false,

/***/ "./node_modules/@material-ui/system/node_modules/prop-types/index.js":
false,

/***/ "./node_modules/@material-ui/system/node_modules/prop-types/lib/ReactPropTypesSecret.js":
false,

/***/ "./node_modules/dom-helpers/class/addClass.js":
false,

/***/ "./node_modules/dom-helpers/class/hasClass.js":
false,

/***/ "./node_modules/dom-helpers/class/removeClass.js":
false,

/***/ "./node_modules/dom-helpers/node_modules/@babel/runtime/helpers/interopRequireDefault.js":
false,

/***/ "./node_modules/prop-types/checkPropTypes.js":
false,

/***/ "./node_modules/prop-types/factoryWithTypeCheckers.js":
false,

/***/ "./node_modules/prop-types/index.js":
false,

/***/ "./node_modules/prop-types/lib/ReactPropTypesSecret.js":
false,

/***/ "./node_modules/react-transition-group/esm/CSSTransition.js":
false,

/***/ "./node_modules/react-transition-group/esm/ReplaceTransition.js":
false,

/***/ "./node_modules/react-transition-group/esm/SwitchTransition.js":
false,

/***/ "./node_modules/react-transition-group/esm/Transition.js":
false,

/***/ "./node_modules/react-transition-group/esm/TransitionGroup.js":
false,

/***/ "./node_modules/react-transition-group/esm/TransitionGroupContext.js":
false,

/***/ "./node_modules/react-transition-group/esm/config.js":
false,

/***/ "./node_modules/react-transition-group/esm/index.js":
false,

/***/ "./node_modules/react-transition-group/esm/utils/ChildMapping.js":
false,

/***/ "./node_modules/react-transition-group/esm/utils/PropTypes.js":
false,

/***/ "./node_modules/react-transition-group/node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js":
false,

/***/ "./node_modules/react-transition-group/node_modules/@babel/runtime/helpers/esm/extends.js":
false,

/***/ "./node_modules/react-transition-group/node_modules/@babel/runtime/helpers/esm/inheritsLoose.js":
false,

/***/ "./node_modules/react-transition-group/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js":
false,

/***/ "./pages/index.jsx":
/*!*************************!*\
  !*** ./pages/index.jsx ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SimpleContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_CssBaseline__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/CssBaseline */ "./node_modules/@material-ui/core/esm/CssBaseline/index.js");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/Typography */ "./node_modules/@material-ui/core/esm/Typography/index.js");
/* harmony import */ var _material_ui_core_Container__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/Container */ "./node_modules/@material-ui/core/esm/Container/index.js");
var _jsxFileName = "C:\\Users\\#teecode\\Documents\\web\\react-app\\vibehear-app\\pages\\index.jsx";




function SimpleContainer() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CssBaseline__WEBPACK_IMPORTED_MODULE_1__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Container__WEBPACK_IMPORTED_MODULE_3__["default"], {
    maxWidth: "sm",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2__["default"], {
    component: "div",
    style: {
      backgroundColor: '#cfe8fc',
      height: '100vh'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    },
    __self: this
  })));
}
    (function (Component, route) {
      if(!Component) return
      if (false) {}
      module.hot.accept()
      Component.__route = route

      if (module.hot.status() === 'idle') return

      var components = next.router.components
      for (var r in components) {
        if (!components.hasOwnProperty(r)) continue

        if (components[r].Component.__route === route) {
          next.router.update(r, Component)
        }
      }
    })(typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__.default : (module.exports.default || module.exports), "/")
  
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./pages/login.jsx":
false

})
//# sourceMappingURL=index.js.f24017732020723ab17c.hot-update.js.map