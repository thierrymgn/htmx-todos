import * as elements from "typed-html";
import { Todo } from "..";
import { TodoForm } from "./TodoForm";
import { TodoItem } from "./TodoItem";

export function TodoList({ todos }: { todos: Todo[] }) {
	return (
		<ul class="p-0 m-0 flex flex-col max-w-md w-full gap-1">
			{todos.map((todo) => (
				<TodoItem {...todo} />
			))}
			<TodoForm />
		</ul>
	);
}
