import AsyncHook from 'async_hooks'
import { randomUUID } from 'crypto'

interface ContextData {
  data: any
  requestId: string
}

const StoreAsyncHook = new Map()

const asyncHook = AsyncHook.createHook({
  init (asyncId, type, triggerAsyncId) {
    if (StoreAsyncHook.has(triggerAsyncId)) {
      StoreAsyncHook.set(asyncId, StoreAsyncHook.get(triggerAsyncId))
    }
  },
  destroy (asyncId) {
    if (StoreAsyncHook.has(asyncId)) {
      StoreAsyncHook.delete(asyncId)
    }
  }
})

asyncHook.enable()

function create (data: any, requestId = randomUUID()): ContextData {
  const context = { data, requestId }
  StoreAsyncHook.set(AsyncHook.executionAsyncId(), context)

  return context
}

function get (): ContextData {
  return StoreAsyncHook.get(AsyncHook.executionAsyncId())
}

export const Context = {
  create,
  get
}
