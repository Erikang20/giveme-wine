var expect = require( 'chai' ).expect;
var app = require( '../app' );
var request = require( 'supertest' )( app );
var knex = require( '../db/knex' );

describe( 'db conection', function () {
    before( function ( done ) {
        knex.migrate.latest().then( function () {
            knex.seed.run().then( function () {
                done();
            } );
        } );
    } );
    after( function ( done ) {
        knex.migrate.rollback().then( function () {
            done();
        } );
    } );
    it( "works", function ( done ) {
        request.get( '/' )
            .expect( 200 )
            .end( function ( err, res ) {
                if ( err ) return done( err )
                done();
            } );
    } );
} );
