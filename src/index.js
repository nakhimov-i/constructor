import './styles/styles.css'
import './scss/style.scss'
import {
  model
} from './model'
import {
  Site
} from './classes/site'
import {
  Sidebar
} from './classes/sidebar'


const site = new Site('#site')

//функция для добавления новых блоков
const updateCallback = newBlock => {
  model.push(newBlock)
  site.render(model)
}

new Sidebar('#panel', updateCallback)

site.render(model)