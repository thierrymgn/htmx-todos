import { html } from "@elysiajs/html";
import { Elysia, t } from "elysia";
import * as elements from "typed-html";
import { BaseHtml } from "./components/BaseHtml";
import { TodoItem } from "./components/TodoItem";
import { TodoList } from "./components/TodoList";

export type Todo = {
	id: string;
	text: string;
	done: boolean;
};

// in-memory db for testing
const db: Todo[] = [
	{ id: "1", text: "Learn HTMX", done: false },
	{ id: "2", text: "Learn Elysia", done: false },
];

const app = new Elysia()
	.use(html())
	.get("/", ({ html }) =>
		html(
			<BaseHtml>
				<body
					hx-get="/todos"
					hx-trigger="load"
					hx-swap="innerHTML"
					class="grid place-items-center h-full"
				/>
			</BaseHtml>,
		),
	)
	.group("/todos", (app) =>
		app
			.get("/", () => <TodoList todos={db} />)
			.post(
				"/",
				({ body }) => {
					if (body.text.length === 0) {
						throw new Error("Text cannot be empty");
					}

					const newTodo: Todo = {
						id: Math.random().toString(16),
						text: body.text,
						done: false,
					};

					db.push(newTodo);

					return <TodoItem {...newTodo} />;
				},
				{
					body: t.Object({
						text: t.String(),
					}),
				},
			)
			.group("/:id", (app) =>
				app
					.post("/toggle", ({ params }) => {
						const todo = db.find((t) => t.id === params.id);

						if (todo) {
							todo.done = !todo.done;
							return <TodoItem {...todo} />;
						}
					})
					.delete("/", ({ params }) => {
						const todo = db.find((t) => t.id === params.id);
						if (todo) {
							db.splice(db.indexOf(todo), 1);
						}
					}),
			),
	)
	.listen(1234);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
