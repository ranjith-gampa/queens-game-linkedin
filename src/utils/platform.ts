export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

export const isMac = () => {
  return navigator.platform.toUpperCase().indexOf('MAC') >= 0;
};
