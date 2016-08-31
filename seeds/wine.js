exports.seed = function ( knex, Promise ) {
    // Deletes ALL existing entries
    return knex( 'wines' ).del()
        .then( function () {
            return Promise.all( [
        // Inserts seed entries
        knex( 'wines' ).insert( {
                    wine_name: '',
                    year: '',
                    rating: '',
                    price: ''
                } ),
        knex( 'wines' ).insert( {
                    wine_name: '',
                    year: '',
                    rating: '',
                    price: ''
                } ),
        knex( 'wines' ).insert( {
                    wine_name: '',
                    year: '',
                    rating: '',
                    price: ''
                } )
            ] );
        } );
};
