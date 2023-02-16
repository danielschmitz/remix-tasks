import { type ActionArgs, redirect } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import db from "~/db";

export const action = async ({ request }: ActionArgs) => {
    const form = await request.formData();
    const name = form.get("name");
    await db("tasks").insert({ name, done:false });
    return redirect("/tasks");
};

export default function Create() {

 return  <Form method="post">
    <article>
        <header>New Task</header>

        <input type="text"
            id="name"
            name="name"
            placeholder="Task"
            required />

        <footer>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <small><Link to='/tasks'>Return</Link></small>
                <button type="submit" style={{maxWidth:'200px'}}>Save</button>
            </div>
        </footer>

    </article>
</Form>
};
