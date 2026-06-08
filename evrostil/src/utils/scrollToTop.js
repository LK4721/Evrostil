export function resetScrollPosition(smooth = false) {
  if (smooth) {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    return;
  }

  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

export function normalizePath(path) {
  if (path === "/materijali") {
    return "/galerija";
  }

  return path;
}

export function isSameRoute(currentPath, targetPath) {
  return normalizePath(currentPath) === normalizePath(targetPath);
}
