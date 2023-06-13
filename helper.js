function createElement(el, classNames = [], text = "") {
    const element = document.createElement(el);
    element.className.add(...classNames)
    element.textContent = text
}