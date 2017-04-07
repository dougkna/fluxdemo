var Dispatcher = function() {
  var _id = 0
  var _callbacks = {}
  return {
    register: function( callback ) {
      _callbacks[_id] = callback
      return _id++
    },
    unregister: function( id ) {
      delete _callbacks[id]
    },
    dispatch: function( payload ) {
      for( var id in _callbacks ) { _callbacks[id](payload) }
    }
  }
}

var TodoStore = function() {
  var _emitter = new Dispatcher()
  var _nextId = 0
  var _todos = {}

  dispatcher.register( function( payload ) {
    switch( payload.type ) {
      case 'SEED_TODOS':
        _todos = payload.todos
        // go through the seed and set _nextId
        // appropriately so that creating new todos
        // doesn't override ones from the seed
        for( var i in _todos ) { _nextId = Math.max( _nextId+1, _todos[i].id ) }
        break
      case 'CREATE_TODO':
        payload.todo.id = _nextId++
        _todos[payload.todo.id] = payload.todo
        break
      case 'REMOVE_TODO':
        delete _todos[payload.todo.id]
        break
      case 'UPDATE_TODO':
        $.extend( _todos[payload.todo.id], payload.todo )
        break
      default:
        return // avoid emitting a change
    }
      
    // notify anyone who cares that the store has updates
    _emitter.dispatch()
  } )

  return {
    getTodos: function() { return _todos },
    addListener: _emitter.register,
    removeListener: _emitter.unregister
  }
}

var SEED = [
  { id: 0, title: 'Feed cat', completed: true },
  { id: 1, title: 'Pet cat', completed: false },
  { id: 2, title: 'Talk to cat', completed: true },
  { id: 3, title: 'Photograph cat', completed: false },
  { id: 4, title: 'Take nap with cat', completed: false }
]
var TodoActions = function() {
  // using a fake backend results in a lot of
  // irrelevant fiddling, so we just go back to faking it
  //var BACKEND = 'http://yourserver.com'

  return {
    listTodos: function() {
      var mapping = {}
      SEED.forEach( function( todo ) { mapping[todo.id] = todo } )
      dispatcher.dispatch( { type: 'SEED_TODOS', todos: mapping } )
    },

    createTodo: function( todo ) {
      dispatcher.dispatch( { type: 'CREATE_TODO', todo: todo } )
    },

    updateTodo: function( id, todo ) {
      var update = $.extend( todo, { id: id } )
      dispatcher.dispatch( { type: 'UPDATE_TODO', todo: update } )
    },
      
    removeTodo: function( id ) {
      dispatcher.dispatch( { type: 'REMOVE_TODO', todo: { id: id } } )
    }
  }
}


//
// Main Application
//

window.dispatcher = new Dispatcher()
window.todoStore = new TodoStore()
window.todoActions = new TodoActions()

dispatcher.register( function(payload) {
  console.log( "ACTION: " + JSON.stringify(payload) )
} )

$(document).ready( function() {
  var todoForm = $("<form><label>New Todo:</label> <input placeholder='type, then &crarr;'></form>")
  todoForm.appendTo( $('#app') )
  todoForm.submit( function( e ) {
    e.preventDefault()
    todoActions.createTodo( {
      title: todoForm.find('input').val(),
      completed: false
    } )
    todoForm.get(0).reset()
  } )

  var todoList = $('<ul>')
  todoList.appendTo( $('#app') )
  
  // we just re-render every time, we could
  // of course try to look at what changed and
  // just update the single row in question...
  // maybe try React.js for that :)
  todoStore.addListener( function() {
    //console.log("RE-RENDER")
    todoList.empty()
    $.each( todoStore.getTodos(), function( id, todo ) {
      todoList.append( todoTemplate(todo) )
    } )
  } )
  
  todoList.on( 'click', 'span.toggle', function( e ) {
    var id = parseInt( $(e.target).parents('li').attr('rel'), 10 )
    var todo = todoStore.getTodos()[id]
    todoActions.updateTodo( todo.id, { completed: !todo.completed } )
  } )
  
  todoList.on( 'click', 'a.remove', function( e ) {
    e.preventDefault()
    var id = parseInt( $(e.target).parents('li').attr('rel'), 10 )
    var todo = todoStore.getTodos()[id]
    todoActions.removeTodo( todo.id )
  } )

  todoActions.listTodos() // seed data
} )

function todoTemplate( todo ) {
  var template = [
    "<li rel='{{id}}'>",
      "<span class='toggle'>{{check}}</span>",
      "{{title}}",
      "<small><a href='javascript:void(0);' class='remove'>(remove)</a></small>",
    "</li>"
  ].join('')
  var data = $.extend( {}, todo )
  data.check = data.completed ? '&check;' : '&ndash;'
  var html = template.replace(
    /\{\{([^{}]+)\}\}/g,
    function( _, match ) { return data[match] }
  )
  //console.log("GENERATED HTML", html)
  return html
}
