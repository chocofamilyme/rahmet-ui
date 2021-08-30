import { h, render } from 'vue';

/**
 * Creates toast component
 *
 * @param { Object } component Vue component
 * @param { Object } props Component props
 * @param { HTMLElement } parentContainer Component container
 */
export function createComponent(component, props, parentContainer) {
  const vNode = h(component, props);
  const container = document.createElement('div');
  container.classList.add('rahmet-toast-container--pending');
  parentContainer.appendChild(container);
  render(vNode, container);

  return vNode.component;
}

/**
 * Removes toast component
 *
 * @param { HTMLElement } el Toast element
 */
export function removeElement(el) {
  if (typeof el.remove !== 'undefined') {
    el.remove();
  } else {
    el.parentNode?.removeChild(el);
  }
}
