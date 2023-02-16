import pico from '../styles/pico.min.css'
import base from '../styles/base.css'
import { Link, Outlet, useLoaderData } from '@remix-run/react';
import db from '../db'

export function links() {
    return [
        { rel: "stylesheet", href: pico },
        { rel: "stylesheet", href: base },
    ];
}

export default function Tasks() {
    return <><div className='container'>
        <nav>
            <ul>
                <li><h1>Task List</h1></li>
            </ul>
            <ul>
                <li><Link role="button" to='/tasks/create'>New</Link></li>
            </ul>
        </nav>
        <Outlet/>
    </div>
    </>

};
