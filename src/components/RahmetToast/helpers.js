import { h, render } from 'vue';

export function removeElement(el) {
  if (typeof el.remove !== 'undefined') {
    el.remove();
  } else {
    el.parentNode?.removeChild(el);
  }
}

export function createComponent(component, props, parentContainer) {
  const vNode = h(component, props);
  const container = document.createElement('div');
  container.classList.add('rahmet-toast--pending');
  parentContainer.appendChild(container);
  render(vNode, container);

  return vNode.component;
}
