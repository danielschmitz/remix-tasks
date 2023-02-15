
import { ActionArgs } from '@remix-run/node';
import { Form, useLoaderData, useSubmit } from '@remix-run/react';
import db from '~/db'

export function loader() {
    return db("tasks").orderBy("id", "desc")
}

export async function action({ request }: ActionArgs) {
    const form = await request.formData();
    const taskName = form.get("taskName")||'';

    const taskValue = form.get("taskValue");

    const id = taskName.toString().split("-")[1];
    const done = taskValue === "true" ? true : false;
    await db("tasks").update({done}).where({id});

    return null;
}

const Task = (task: any) => {
    return <li key={task.id}>
        <input type="checkbox" id="task" defaultChecked={task.done} name={`task-${task.id}`}/>
        {task.name}
    </li>
}

export default function Tasks() {
    const tasks = useLoaderData<typeof loader>();
    const submit = useSubmit();
    
    const handleChange = (e: any) => {
        const taskName = e.target.name;
        const taskValue = e.target.checked;
        submit({taskName, taskValue}, { replace: true, method: "post" });
    }

    return <>
        <article>
            <ul>
                <Form method="post" onChange={handleChange}>
                    <input type="hidden" name="nome" value="valor" />
                    {tasks.map(task => Task(task))}
                </Form>
            </ul>
        </article>
    </>
};
