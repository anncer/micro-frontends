/* eslint-disable @typescript-eslint/no-explicit-any */
import { reactive, readonly, provide, inject } from "vue";

export const stateSymbol = Symbol("state");
export const incrementSymbol = Symbol("increment");

export const createState = () => {
  const state = reactive({
    counter: 0,
    id: 1,
    todos: [{ id: 1, text: "default todo", done: false }],
  });

  const increment = () => state.counter++;

  const done = (id: any) => {
    state.todos = state.todos.filter((item) => item.id !== id);
  };

  const add = (item: any) => {
    state.id += 1;
    item.id = state.id;
    // item.id =  state.todos.length + 1;
    state.todos.push(item);
    console.log("state.todos", state.todos);
  };

  const getDoneTodos = (state: any) => {
    return state.todos.filter((todo: any) => todo.done);
  };

  return { increment, done, add, getDoneTodos, state: readonly(state) };
};

export const useState: any = () => inject(stateSymbol);

export const provideState = () => provide(stateSymbol, createState());
