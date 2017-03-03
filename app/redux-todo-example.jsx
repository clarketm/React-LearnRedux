const redux = require('redux')

console.log('Starting redux todo app')

const stateDefault = {
    searchText: '',
    showComplete: false,
    todos: []
}

let nextTodoId = 1
const oldReducer = (state: object = stateDefault, action: object) => {
    switch (action.type) {
        case 'CHANGE_SEARCHTEXT':
            return {
                ...state,
                searchText: action.searchText
            }
        case 'ADD_TODO':
            return {
                ...state,
                todos: [
                    ...state.todos,
                    {
                        id: nextTodoId++,
                        todo: action.todo
                    }
                ]
            }
        case 'REMOVE_TODO':
            // return {
            //     ...state,
            //     todos: state.todos.filter((todo) => {
            //         return todo.id !== action.id
            //     })
            // }
            
            // same as
            return {
                ...state,
                todos: state.todos.filter((todo) => todo.id !== action.id)
            }
        default:
            return state
    }
}

let searchTextReducer = (state: string = '', action: object) => {
    switch (action.type) {
        case 'CHANGE_SEARCHTEXT':
            return action.searchText
        default:
            return state
    }
}

let todosReducer = (state: array = [], action: object) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                {
                    id: nextTodoId++,
                    todo: action.todo
                }
            ]
        case 'REMOVE_TODO':
            return state.filter((todo) => todo.id !== action.id)
        default:
            return state
    }
}

let reducer = redux.combineReducers({
    searchText: searchTextReducer,
    todos: todosReducer
})

let store = redux.createStore(reducer, redux.compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
))

// subscribe to changes
let unsubscribe = store.subscribe(() => {
    // subcribe() returns a function to unsubscribe
    let state = store.getState()
    console.log('SearchText is', state.searchText)
})

store.dispatch({
    type: 'CHANGE_SEARCHTEXT',
    searchText: 'some search text'
})

store.dispatch({
    type: 'CHANGE_SEARCHTEXT',
    searchText: 'different search terms'
})

// unsubscribe()

store.dispatch({
    type: 'CHANGE_SEARCHTEXT',
    searchText: 'more things to search'
})

store.dispatch({
    type: 'ADD_TODO',
    todo: 'Go exercise'
})

store.dispatch({
    type: 'ADD_TODO',
    todo: 'Go to the movies'
})

store.dispatch({
    type: 'REMOVE_TODO',
    id: 2
})
