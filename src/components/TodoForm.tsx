import * as elements from "typed-html";

export function TodoForm() {
	return (
		<form
			hx-post="/todos"
			hx-swap="beforebegin"
			hx-indicator="#indicator"
			_="on submit target.reset()"
			class="mt-4 w-full flex gap-2"
		>
			<label for="text" class="sr-only">
				Todo text
			</label>
			<input
				id="text"
				type="text"
				name="text"
				class="px-3 py-1 border-solid border border-gray-800 rounded-md flex-grow"
				required="true"
			/>
			<button
				type="submit"
				class="bg-gray-800 text-gray-50 rounded-md border-none px-3 py-1 relative"
			>
				<img
					id="indicator"
					class="w-4 h-4 inline-block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 htmx-indicator"
					src="/public/spinner.gif"
					alt=""
				/>
				<span>Add todo</span>
			</button>
		</form>
	);
}
