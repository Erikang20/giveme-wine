exports.up = function ( knex, Promise ) {
    return knex.schema.createTable( 'wines', function ( table ) {
        table.increments( 'id' ).primary();
        table.string( 'wine_name' );
        table.integer( 'year' );
        table.integer( 'rating' ).defaultTo( 0 );
        table.string( 'price' );

    } )
};

exports.down = function ( knex, Promise ) {
    return knex.schema.dropTable( 'wines' );
};
