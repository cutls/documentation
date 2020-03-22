(function () {
  'use strict';

  const onLoaded = () => {
    const path = location.pathname.split('/');
    if(path[1]) {
      let cat = path[1];
      if(path[1]=='en' || path[1]=='fr' || path[1]=='ja') {
        cat = path[2];
      }
      const id = 'ident_' + cat;
      document.getElementById(id).open = true
    }
  };

  if (['interactive', 'complete'].indexOf(document.readyState) !== -1) {
    onLoaded();
  } else {
    document.addEventListener('DOMContentLoaded', onLoaded);
  }
})();
