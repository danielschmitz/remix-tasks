import { ActionArgs, LoaderArgs, redirect } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import db from "~/db";
import type Task from "~/Task";

export const loader = async ({ params }: LoaderArgs) => {
    const task = await db('tasks').where({ id: params.id }).first();
    if (!task) {
        throw new Response('Not Found', { status: 404 });
    }
    return task
};

export const action = async ({ request }: ActionArgs) => {
    const form = await request.formData();
    const name = form.get("name");
    const id = form.get("id");
    await db("tasks").update({ name }).where({ id });
    return redirect("/tasks");
};

export default function Edit() {
    const task = useLoaderData<Task>();
    return <Form method="post">
        <article>
            <header>Edit Task</header>

            <input type="hidden" id="id" name="id" value={task.id} />

            <input type="text"
                id="name"
                name="name"
                placeholder="Task"
                defaultValue={task.name}
                required />

            <footer>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <small><Link to='/tasks'>Return</Link></small>
                    <button type="submit" style={{ maxWidth: '200px' }}>Save</button>
                </div>
            </footer>

        </article>
    </Form>
};
