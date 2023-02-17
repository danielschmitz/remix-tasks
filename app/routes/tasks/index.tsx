
import type { ActionArgs } from '@remix-run/node';
import { Form, Link, useLoaderData, useSubmit } from '@remix-run/react';
import db from '~/db'
import type Task from '~/Task';

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

const TaskCheckBox = (task: Task) => {
    
    return <div key={task.id} style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
        <div>
            <input type="checkbox" id="task" defaultChecked={task.done} name={`task-${task.id}`}/>
            {task.name}  
        </div>
        <div style={{display: 'flex', justifyContent: 'end', gap: '10px'}}>
            <Link to={`/tasks/edit/${task.id}`} >Edit</Link>
            <Link to={`/tasks/delete/${task.id}`} >Delete</Link>
        </div>

    </div>
}

export default function Tasks() {
    const tasks = useLoaderData<Task[]>();
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
                    {tasks.map(task => TaskCheckBox(task))}
                </Form>
            </ul>
        </article>
    </>
};
