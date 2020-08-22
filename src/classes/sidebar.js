import {
  TextBlock,
  TitleBlock,
  TextColumnsBlock,
  ImageBlock
} from './blocks'


function block(type) {
  switch (type) {
    case 'columns':
      return `
      <form name="${type}">
        <h5>Добавить колонки</h5>
        <div class="form-group">
          <input class="form-control form-control-sm" name="value" placeholder="раз, два...">
        </div>
        <div class="form-group">
          <input class="form-control form-control-sm" name="styles" placeholder="color: red; ...">
        </div>
        <button type="submit" class="btn btn-primary btn-sm">Добавить</button>
      </form>
      <hr />
    `

    case 'image':
      return `
      <form name="${type}">
        <h5>Добавить изображение</h5>
        <div class="form-group">
          <input class="form-control form-control-sm" name="value" placeholder="https://somerefs..">
        </div>
        <div class="form-group">
          <input class="form-control form-control-sm" name="styles" placeholder="color: red; ...">
        </div>
        <button type="submit" class="btn btn-primary btn-sm">Добавить</button>
      </form>
      <hr />
    `
    case 'text':
      return `
      <form name="${type}">
        <h5>Добавить текст</h5>
        <div class="form-group">
          <input class="form-control form-control-sm" name="value" placeholder="Введите текст">
        </div>
        <div class="form-group">
          <input class="form-control form-control-sm" name="styles" placeholder="color: red; ...">
        </div>
        <button type="submit" class="btn btn-primary btn-sm">Добавить</button>
      </form>
      <hr />
    `
    default:
      return `
      <form name="${type}">
        <h5>Добавить заголовок</h5>
        <div class="form-group">
          <input class="form-control form-control-sm" name="value" placeholder="Введите текст">
        </div>
        <div class="form-group">
          <input class="form-control form-control-sm" name="tag" placeholder="h1 или h4...">
        </div>
        <div class="form-group">
          <input class="form-control form-control-sm" name="styles" placeholder="color: red; ...">
        </div>
        <button type="submit" class="btn btn-primary btn-sm">Добавить</button>
      </form>
      <hr />
    `

  }

}

export class Sidebar {
  constructor(selector, update) {
    this.$el = document.querySelector(selector); //указываем, с каким корневым эл-том мы будем работать
    this.update = update;

    this.init(); //для динамического обновления
  }

  init() {
    this.$el.addEventListener('submit', this.addBlock.bind(this)); //убираем перезагрузку страницы и добавляем жл-ты
    this.$el.innerHTML = this.template;
  }

  get template() {
    return [
      block('text'),
      block('title'),
      block('columns'),
      block('image')
    ].join('')
  }



  addBlock(event) {
    event.preventDefault(); //убираем перезагрузку страницы

    const type = event.target.name; //event.target - это форма из функции block
    const value = event.target.value.value; //забираем значение инпута value
    const styles = event.target.styles.value; //забираем значение инпута styles
    const tag = event.target.tag.value;
    console.log(tag)

    const BlockType = (type === 'text') ? TextBlock :
      (type === 'title') ? TitleBlock :
      (type === 'columns') ? TextColumnsBlock :
      ImageBlock;

    const newBlock = new BlockType(value, {
      tag,
      styles
    });

    this.update(newBlock); //эта функция прописана в index.js

    event.target.value.value = ''; //задаем пустые строки для форм
    event.target.styles.value = ''; //задаем пустые строки для форм
    event.target.tag.value = '';
  }
}