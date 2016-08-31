exports.up = function ( knex, Promise ) {
    return knex.schema.createTable( 'user_wine_style', function ( table ) {
        table.increments( 'id' ).primary();
        table.integer( 'user_id' ).unsigned().references( 'users.id' ).onDelete( 'CASCADE' );
        table.integer( 'wine_id' ).unsigned().references( 'wines.id' ).onDelete( 'CASCADE' );
        table.integer( 'wine_style' );
    } );
};

exports.down = function ( knex, Promise ) {
    return knex.schema.dropTable( 'user_wine_style' );
};
