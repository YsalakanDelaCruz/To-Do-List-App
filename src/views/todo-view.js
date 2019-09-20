import { LitElement, html } from '@polymer/lit-element'

const VisibilityFilters = {

  SHOW_ALL: 'All',
  SHOW_ACTIVE: 'Active',
  SHOW_COMPLETED: 'Completed'
}

class ToDoView extends LitElement {
  static get properties () {
    return {

      list: { type: Array },
      filter: { type: String },
      task: { type: String }

    }
  }

  constructor () {
    super()

    this.list = []
    this.filter = VisibilityFilters.SHOW_ALL
    this.task = ''
  }

  render () {
    return html`

    <style> 
    
    .todo-item{
     width:340px;
     height: 45px;
     min-height: 45px;
     position: relative;
     border-bottom: 1px solid rgba(0,0,0,0.1);
     list-style: none;
     top-padding: 1px;
     padding: 5px;
     margin: 0;
     font-size: 150%;
        
    }

    #todo-make{
    position: relative;
    width: 320px;
    height:20px;
    padding: 3px;
    border-top: 1px solid rgba(0,0,0,0.1);
    font-size: 110%;


    }

    .list{
    width:350px;
    height: 350px;
    max-height:350px;
    background-color: #FFF;
    overflow: auto;
    }
    
    </style>  
    

    <div class = "list">


      ${this.applyFilter(this.list).map(todo => html`

       <div class = "todo-item">
       <vaadin-checkbox
            ?checked="${todo.complete}" 
            @change="${e => this.updateToDoState(todo, e.target.checked)}"> 
            ${todo.task}
        </vaadin-checkbox></div>

        `
        )}
    </div>

    <div id = "input-container">
      <div class = "input" @keyup = "${this.keyboardListener}">
      <br>
      <input type="text" id="todo-make" placeholder = "Add To-Do" .value = "${this.task}" @change = "${this.updateTask}">  
      <input type="button" value="Add" @click = "${this.createNewToDoItem}"><br> 

    </div>

    <div id = "radio-filter-group">
    
    ${Object.values(VisibilityFilters).map(filter => html`

      <input type = "radio" name = "filter" .value=${filter} @change="${this.filterChanged}" > ${filter}
      
      `
  )}
  </div>

<input type="button" value="Clear Completed" @click = "${this.clearCompleted}"><br>
</div>
      `
  }

  // Functions

  /**
 * [Triggers when the radio button filters are pressed to change the filter of the superclass]
 * event   e - The event when a radio button is pressed
 * string  target.value  - The current filter of the class (default in 'All')
 */

  filterChanged (e) {
    this.filter = e.target.value
  }

/**
 * [Calls the createNewToDoItem() function when Enter key is pressed]
 * event   e - The event when Enter key is pressed
 */

  keyboardListener (e) {
    if (e.key === 'Enter') {
      this.createNewToDoItem()
    }
  }

 /**
 * [Is called to retrieve the task value from the list or to not render when applied filter is changed]
 * event   e - The event when the task value is changed
 */

  updateTask (e) {
    this.task = e.target.value
  }

 /**
 * [Triggers when the vaadin checkbox is checked or unchecked to update the state of a to-do according to user interaction]
 * todo   updatedToDo - The to-do element itself
 * string  complete  - The state of the to-do
 */

  updateToDoState (updatedToDo, complete) {
    this.list = this.list.map(todo =>
      updatedToDo === todo ? { ...updatedToDo, complete } : todo)
  }


 /**
 * [Is called when Enter key or Add button is pressed to create a new To Do Item]
    appends the new to-do item into the list 
    default status is false (uncompleted to-do)
 
 */

  createNewToDoItem () {
    if (this.task !== '') {
      this.list = [
        ...this.list,
        {
          task: this.task,
          complete: false
        }
      ]
      this.task = ''
    } else {

    }
  }

   /**
 * [Is called right before rendering the list of To-Dos and omits the items that do not have the same state as the current filter]
 * array   list - List of to-dos 
 */

  applyFilter (list) {
    switch (this.filter) {
      case VisibilityFilters.SHOW_ACTIVE:
        return list.filter(todo => !todo.complete)

      case VisibilityFilters.SHOW_COMPLETED:
        return list.filter(todo => todo.complete)

      default:
        return list
    }
  }

 /**
 * [is called when the Clear Completed button is pressed, clears all completed to-dos from the list]
 * list array - list of to-dos
 */
  clearCompleted () {
    this.list = this.list.filter(todo => !todo.complete)
  }
}

customElements.define('todo-view', ToDoView)
