export function row(content, styles = '') {
  return `<div class='row' style="${styles}">${content}</div>`
}

export function col(content) {
  return `<div class='col-sm'>${content}</div>`
}

export function css(styles = {}) {
  const toString = key => `${key}: ${styles[key]}` //свой способ преобразования к строке
  return Object.keys(styles).map(toString).join(';')
}