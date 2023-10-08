export const displayMessage = (styleClass, message, target) => {
  const element = document.querySelector(target);
  element.innerHTML = `<div class="message ${styleClass}">${message}</div>`;
};
