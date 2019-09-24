
exports.up = function(knex) {
  return knex.schema
    .createTable('users', tbl => {
      tbl.increments();
      tbl.string('name', 128).notNullable();
      tbl.string('email', 128).notNullable().unique();
      tbl.string('password', 512).notNullable();
    })
    .createTable('habits', tbl => {
      tbl.increments();
      tbl.string('name', 128).notNullable();
      tbl.date('createdOn').notNullable();
      tbl.integer('userId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      })
    .createTable('habit_records', tbl => {
      tbl.increments();
      tbl.date('completedOn').notNullable();
      tbl.integer('habitId')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('habits')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('habit_records')
    .dropTableIfExists('habits')
    .dropTableIfExists('users');
};
