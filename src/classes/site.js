export class Site {
  constructor(selector) {
    this.$el = document.querySelector(selector) //значок доллара просто для того, чтобы обозначить, что это нода в DOM
  }

  render(model) {
    this.$el.innerHTML = '' //чистим шаблон перед каждым рендером, чтобы не было дублировнаия
    model.forEach(block => {
      this.$el.insertAdjacentHTML('beforeend', block.toHTML()); //insertAdjacentHTML(where, html), где where - способ добавления эл-тов, а html - это тег, который нужно вставить
    })
  }
}