import { html } from "@elysiajs/html";
import staticPlugin from "@elysiajs/static";
import { createConsola } from "consola";
import { Elysia, t } from "elysia";
import * as elements from "typed-html";
import { randomUUID } from "uncrypto";
import { BaseHtml } from "./components/BaseHtml";
import { TodoItem } from "./components/TodoItem";
import { TodoList } from "./components/TodoList";

const logger = createConsola({
	fancy: true,
	formatOptions: {
		date: true,
		colors: true,
		columns: 2,
	},
});

export type Todo = {
	id: string;
	text: string;
	done: boolean;
};

// in-memory db for testing
const db: Todo[] = [
	{ id: randomUUID(), text: "Use Bun", done: true },
	{ id: randomUUID(), text: "Learn HTMX", done: false },
	{ id: randomUUID(), text: "Learn Elysia", done: false },
];

const app = new Elysia()
	.use(staticPlugin())
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
						id: randomUUID(),
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
					.get("/", ({ params }) => {
						const todo = db.find((t) => t.id === params.id);
						if (!todo) {
							throw new Error("Todo not found");
						}

						return <TodoItem {...todo} />;
					})
					.delete("/", ({ params }) => {
						const todo = db.find((t) => t.id === params.id);
						if (!todo) {
							throw new Error("Todo not found");
						}

						db.splice(db.indexOf(todo), 1);
					})
					.post("/toggle", ({ params }) => {
						const todo = db.find((t) => t.id === params.id);
						if (!todo) {
							throw new Error("Todo not found");
						}

						todo.done = !todo.done;
						logger.info(
							`Todo with id ${todo.id} is ${todo.done ? "done" : "not done"}`,
						);

						return <TodoItem {...todo} />;
					}),
			),
	)
	.listen({
		port: 3001,
	});

logger.box(
	`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
);
