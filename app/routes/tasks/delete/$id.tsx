
import { type ActionArgs, type LoaderArgs, redirect } from "@remix-run/node";
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
    const id = form.get("id");
    await db("tasks").delete().where({ id });
    return redirect("/tasks");
};

export default function Delete() {
    const task = useLoaderData<Task>();
    return <Form method="post">
        <article>
            <header>Delete Task?</header>

            <input type="hidden" id="id" name="id" value={task.id} />

            Are you sure delete task <strong>{task.name}</strong>?

            <br/><br/>

            <button type="submit" style={{ maxWidth: '200px' }}>Confirm</button>

            <footer>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <small><Link to='/tasks'>Return</Link></small>
                </div>
            </footer>

        </article>
    </Form>
};
