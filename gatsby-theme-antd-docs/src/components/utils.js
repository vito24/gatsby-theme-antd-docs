/**
 * @param pathname
 * @returns {boolean}
 */
export function isZhCN(pathname) {
  if (pathname === '/') {
    if (typeof window !== `undefined`) {
      const locale = localStorage ? localStorage.getItem('locale') : 'en-US';
      if (locale === 'zh-CN') {
        return true;
      }
      return false;
    }
    return false;
  }
  return /-cn/.test(pathname);
}

/**
 * @param {*} path url
 * @param {*} zhCN boolean
 * if(zhCN)
 *  return "avatar-list"
 * else
 *  return "avatar-list-cn"
 */
export function getLocalizedPathname(path, zhCN) {
  let pathname = path.startsWith('/') ? path : `/${path}`;
  pathname = pathname.replace('-cn', '');
  if (pathname === '/' || pathname === '/index') {
    if (zhCN) {
      return '/index-cn';
    }
    return '/';
  }
  if (!zhCN) {
    return `${pathname}`;
  }
  return `${pathname}-cn`;
}

export function getMenuItems(moduleData, locale) {
  const menuMeta = moduleData.map(item => item.meta);
  const menuItems = {};
  menuMeta
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .forEach(meta => {
      const category =
        (meta.category && meta.category[locale]) || meta.category || 'topLevel';
      if (!menuItems[category]) {
        menuItems[category] = {};
      }

      const type = meta.type || 'topLevel';
      if (!menuItems[category][type]) {
        menuItems[category][type] = [];
      }

      menuItems[category][type].push(meta);
    });
  return menuItems;
}

export function isLocalStorageNameSupported() {
  const testKey = 'test';
  const storage = window.localStorage;
  try {
    storage.setItem(testKey, '1');
    storage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
}

export const transformerFrontmatter = frontmatter => {
  const { title } = frontmatter;
  return {
    ...frontmatter,
    title: {
      'zh-CN': title.zh_CN,
      'en-US': title.en_US,
    },
  };
};
