import React from 'react';

export function noop() {}

export function getKeyFromChildrenIndex(child, menuEventKey, index) {
  var prefix = menuEventKey || '';
  return child.key || prefix + 'item_' + index;
}

export function getMenuIdFromSubMenuEventKey(eventKey) {
  return eventKey + '-menu-';
}

export function loopMenuItem(children, cb) {
  var index = -1;
  React.Children.forEach(children, function (c) {
    index++;
    if (c && c.type && c.type.isMenuItemGroup) {
      React.Children.forEach(c.props.children, function (c2) {
        index++;
        cb(c2, index);
      });
    } else {
      cb(c, index);
    }
  });
}

export function loopMenuItemRecursively(children, keys, ret) {
  /* istanbul ignore if */
  if (!children || ret.find) {
    return;
  }
  React.Children.forEach(children, function (c) {
    if (c) {
      var construct = c.type;
      if (!construct || !(construct.isSubMenu || construct.isMenuItem || construct.isMenuItemGroup)) {
        return;
      }
      if (keys.indexOf(c.key) !== -1) {
        ret.find = true;
      } else if (c.props.children) {
        loopMenuItemRecursively(c.props.children, keys, ret);
      }
    }
  });
}

export var menuAllProps = ['defaultSelectedKeys', 'selectedKeys', 'defaultOpenKeys', 'openKeys', 'mode', 'getPopupContainer', 'onSelect', 'onDeselect', 'onDestroy', 'openTransitionName', 'openAnimation', 'subMenuOpenDelay', 'subMenuCloseDelay', 'forceSubMenuRender', 'triggerSubMenuAction', 'level', 'selectable', 'multiple', 'onOpenChange', 'visible', 'focusable', 'defaultActiveFirst', 'prefixCls', 'inlineIndent', 'parentMenu', 'title', 'rootPrefixCls', 'eventKey', 'active', 'onItemHover', 'onTitleMouseEnter', 'onTitleMouseLeave', 'onTitleClick', 'popupAlign', 'popupOffset', 'isOpen', 'renderMenuItem', 'manualRef', 'subMenuKey', 'disabled', 'index', 'isSelected', 'store', 'activeKey', 'builtinPlacements',

// the following keys found need to be removed from test regression
'attribute', 'value', 'popupClassName', 'inlineCollapsed', 'menu', 'theme'];