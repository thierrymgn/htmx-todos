import * as elements from "typed-html";

export function TodoForm() {
	return (
		<form
			hx-post="/todos"
			hx-swap="beforebegin"
			_="on submit target.reset()"
			class="mt-4"
		>
			<input
				type="text"
				name="text"
				class="px-2 py-1 border-solid border border-gray-800 rounded-md"
			/>
			<button
				type="submit"
				class="!bg-gray-800 text-gray-50 rounded-md border-none px-2 py-1"
			>
				Add
			</button>
		</form>
	);
}
