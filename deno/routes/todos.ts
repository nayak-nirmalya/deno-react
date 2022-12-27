import { ObjectId } from 'https://deno.land/x/mongo/mod.ts'
import { Router } from 'https://deno.land/x/oak/mod.ts'

import { getDB } from '../helpers/db_client.ts'

const router = new Router()

interface Todo {
  id?: string
  text: string
}

let todos: Todo[] = []

router.get('/todos', async (ctx) => {
  const todos = await getDB().collection('todos').find()
  const transformedToDos = await todos.map(
    (todo: { _id: string; text: string }) => {
      return {
        id: todo._id.toString(),
        text: todo.text,
      }
    },
  )
  ctx.response.body = { todos: transformedToDos }
})

router.post('/todos', async (ctx) => {
  const data = await ctx.request.body()
  const finalData = await data.value
  const newTodo: Todo = {
    // id: new Date().toISOString(),
    text: finalData.text,
  }
  const id = await getDB().collection('todos').insertOne(newTodo)

  newTodo.id = id.$oid

  ctx.response.body = { message: 'Created todo!', todo: newTodo }
})

router.put('/todos/:todoId', async (ctx) => {
  const tid = ctx.params.todoId
  const data = await ctx.request.body()
  const finalData = await data.value
  const todoIndex = todos.findIndex((todo) => {
    return todo.id === tid
  })
  todos[todoIndex] = { id: todos[todoIndex].id, text: finalData.text }
  ctx.response.body = { message: 'Updated todo' }
})

router.delete('/todos/:todoId', (ctx) => {
  const tid = ctx.params.todoId
  todos = todos.filter((todo) => todo.id !== tid)
  ctx.response.body = { message: 'Deleted todo' }
})

export default router
