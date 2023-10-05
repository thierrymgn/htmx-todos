import * as elements from "typed-html";

export const BaseHtml: elements.CustomElementHandler = ({ children }) => (
	<html lang="en" class="h-full">
		<head>
			<meta charset="UTF-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<title>Todos</title>
			<script src="https://unpkg.com/htmx.org@1.9.6" />
			<script src="https://unpkg.com/hyperscript.org@0.9.11" />
			<script src="https://cdn.jsdelivr.net/npm/@unocss/runtime" />
			<link
				rel="stylesheet"
				href="https://cdn.jsdelivr.net/npm/@unocss/reset/tailwind.min.css"
			/>
		</head>
		{children}
	</html>
);
