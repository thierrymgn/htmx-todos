import * as elements from "typed-html";

export function TodoForm() {
	return (
		<form
			hx-post="/todos"
			hx-swap="beforebegin"
			_="on submit target.reset()"
			class="mt-4 w-full flex gap-2"
		>
			<input
				type="text"
				name="text"
				class="px-3 py-1 border-solid border border-gray-800 rounded-md flex-grow"
			/>
			<button
				type="submit"
				class="bg-gray-800 text-gray-50 rounded-md border-none px-3 py-1"
			>
				Add todo
			</button>
		</form>
	);
}
