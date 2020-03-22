(function () {
  'use strict';

  const onLoaded = () => {
    const path = location.pathname.split('/');
    if(path[1]) {
      const id = 'ident_' + path[1];
      document.getElementById(id).open = true
    }
  };

  if (['interactive', 'complete'].indexOf(document.readyState) !== -1) {
    onLoaded();
  } else {
    document.addEventListener('DOMContentLoaded', onLoaded);
  }
})();
