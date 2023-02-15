const tasks = [
    { id: 0, name: 'Task 1', done: false },
    { id: 1, name: 'Task 2', done: false },
    { id: 2, name: 'Task 3', done: true }
]

exports.up = function (knex) {
    return knex.schema
        .createTable('tasks', table => {
            table.increments('id')
            table.string('name')
            table.boolean('done')
        })
        .then(() => knex('tasks').insert(tasks))
}

exports.down = function (knex) {
    return knex.schema.dropTable('tasks')
}