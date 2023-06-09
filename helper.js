function createElement(el, classNames = [], text = "") {
    const element = document.createElement(el);
    element.classList.add(...classNames);
    element.textContent = text;
}