exports.seed = function ( knex, Promise ) {
    // Deletes ALL existing entries
    return knex( 'users' ).del()
        .then( function () {
            return Promise.all( [
        // Inserts seed entries
        knex( 'users' ).insert( {
                    user_name: 'Erikang20',
                    full_name: 'Erika Angarita',
                    img: '',
                    email: 'erika@erika.com',
                    is_admin: true,
                    notes: ''

                } ),
        knex( 'users' ).insert( {
                    user_name: 'CoryD',
                    full_name: 'Cory Drees',
                    img: '',
                    email: 'cory@cory.com',
                    is_admin: false,
                    notes: ''
                } ),
        knex( 'users' ).insert( {
                    user_name: 'Jack',
                    full_name: 'Jackson',
                    img: '',
                    email: 'jack@jack.com',
                    is_admin: true,
                    notes: ''
                } );
            ] );
        } );
};
