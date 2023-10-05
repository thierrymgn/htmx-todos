import * as elements from "typed-html";
import { Todo } from "..";

export function TodoItem({ text, id, done }: Todo) {
	return (
		<li class="flex gap-2 items-center">
			<input
				type="checkbox"
				checked={done}
				hx-post={`/todos/${id}/toggle`}
				hx-swap="outerHTML"
				hx-target="closest li"
				id={id}
			/>
			<label for={id} class="flex-grow truncate" title={text}>
				{text}
			</label>
			<button
				type="button"
				hx-delete={`/todos/${id}`}
				hx-swap="outerHTML"
				hx-target="closest li"
				class="text-red-500 hover:underline text-sm"
			>
				Delete
			</button>
		</li>
	);
}
