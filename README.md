# HTMX todos

A simple todo app created with some cool tools.

- [Bun](https://bun.sh) as the runtime
- [Elysia](https://elysiajs.com) as the server framework
- [HTMX](https://htmx.org) for interactivity

We also use [Biome](https://biomejs.dev) as the formatter.

## Get started

To start the development server run:

```bash
bun run dev
```

Open http://localhost:3001/ with your browser to see the result.

# Quick Setup Guide - Todo App Deployment

## Prerequisites
- MacOS with [OrbStack](https://orbstack.dev/) installed
- Install Ansible: `brew install ansible`

## Deployment

1. Setup infrastructure (install Node.js, Bun and other dependencies):
```bash
cd htmx-todos
ansible-playbook ansible/playbooks/setup.yml
```

2. Deploy the application:
```bash
ansible-playbook ansible/playbooks/deploy.yml
```

3. The application will be accessible at `http://localhost:3001`

Note: If the app doesn't start on port 3001, you can check active ports with:
```bash
sudo lsof -i -P -n | grep LISTEN
```
