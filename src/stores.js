import { writable } from "svelte/store";

// Stores each To-Do list item
export const todos = writable([]);
