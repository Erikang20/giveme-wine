exports.up = function ( knex, Promise ) {
    return knex.schema.createTable( 'users', function ( table ) {
        table.increments( 'id' ).primary();
        table.string( 'user_name' );
        table.string( 'full_name' );
        table.string( 'img' ).defaultTo( '' );
        table.string( 'email' );
        //   table.string( 'password' );
        //   table.string( 'favorite_wine' );
        table.boolean( 'is_admin' ).defaultTo( false );
        table.text( 'notes' );
    } );
};

exports.down = function ( knex, Promise ) {
    return knex.schema.dropTable( 'users' );
};
