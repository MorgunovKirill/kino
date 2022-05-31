export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
}

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild
}

export const render = (container, element, place) => {

  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};


export const compareBy = (array, type) => {
  return [...array].sort(function (a, b) {

    if (Array.isArray(a[type])) {
      if (a[type].length > b[type].length) {
        return 1;
      }
      if (a[type].length < b[type].length) {
        return -1;
      }
      // a должно быть равным b
      return 0;
    } else {
      if (a[type] > b[type]) {
        return 1;
      }
      if (a[type] < b[type]) {
        return -1;
      }
      // a должно быть равным b
      return 0;
    }
  })
}
