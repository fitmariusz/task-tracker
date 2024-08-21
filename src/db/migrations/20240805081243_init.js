const up = knex => {
  // Create 'client' table
  return knex.schema
    .createTable('client', table => {
      table.increments('id').unsigned().primary();
      table.string('name', 24).notNullable();
    })
    .createTable('project', table => {
      table.increments('id').unsigned().primary();
      table.string('name', 24).notNullable();
      table.integer('client_id').unsigned();
      table.foreign('client_id').references('id').inTable('client');
    })
    .createTable('task', table => {
      table.increments('id').unsigned().primary();
      table.timestamp('start').defaultTo(knex.fn.now());
      table.timestamp('end').nullable();
      table.string('title', 24).notNullable();
      table.integer('project_id').unsigned();
      table.foreign('project_id').references('id').inTable('project');
    })
    .table('client', table => {
      table.index('name', 'idx_client_name');
    })
    .table('project', table => {
      table.index('name', 'idx_project_name');
    })
    .table('task', table => {
      table.index('title', 'idx_task_title');
    });
};

const down = knex => {
  return knex.schema
    .dropTableIfExists('task')
    .dropTableIfExists('project')
    .dropTableIfExists('client');
};

export {up, down};
