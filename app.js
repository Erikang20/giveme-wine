"use strict";
var express = require( 'express' );
var http = require( 'http' );
// var favicon = require( 'serve-favicon' );
var path = require( 'path' );
var logger = require( 'morgan' );
var pg = require( 'pg' );
var knex = require( './db/knex' );
var methodOverride = require( 'method-override' );
var bodyParser = require( 'body-parser' );
var passport = require( 'passport' );
var cookieParser = require( 'cookie-parser' );
var cookieSession = require( 'cookie-session' );
var FacebookStrategy = require( 'passport-facebook' );
var LocalStrategy = require( 'passport-local' );
// var request = require( 'request' );
var routes = require( './routes/index' );
var users = require( './routes/users' );
var wines = require( './routes/wines' );
var auth = require( './routes/auth' );
var bcrypt = require( 'bcrypt' );
var app = express();
//
require( 'dotenv' ).load();
require( 'locus' );
//
app.set( 'view engine', 'ejs' );
app.set( 'views', path.join( __dirname, '/views' ) );
app.use( express.static( path.join( __dirname, '/public' ) ) );
app.use( logger( 'dev' ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( {
    extended: false
} ) );
app.use( methodOverride( '_method' ) );
app.use( cookieParser() );
//
app.use( cookieSession( {
    name: 'session',
    keys: [ process.env[ 'SECRET_KEY' ] ]
} ) );
app.use( passport.initialize() );
app.use( passport.session() );
//
//

passport.use( new LocalStrategy( {
    usernameField: 'user_name',
    passwordField: 'password'
}, function ( username, password, done ) {

    console.log( "yo" );
    //
    console.log( "yo, im here" );
    // Check id of user, retrieve row in users table.
    knex( 'users' ).where( 'user_name', username )
        .first()
        .then( function ( user ) {
            // compareSync the user's hashed password.
            if ( user && bcrypt.compareSync( password, user.password ) ) {
                // On match, return confirmation of session.
                console.log( "I'm here fam" );
                return done( null, user );
            }
            // Otherwise, return no session, redirect.
            console.log( 'otherwised' );
            return done( null, false );
        } )
} ) );
//
// // ---------------------------------
// // Facebook Strategy
// // ---------------------------------
//
//
passport.use( new FacebookStrategy( {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:3000/auth/facebook/callback"
            // scope: [ 'r_emailaddress', 'r_basicprofile' ],

    },
    function ( accessToken, refreshToken, profile, cb ) {

        console.log( profile );
        knex( 'users' ).where( "user_name", profile.id ).first().then( function ( result, err ) {
            console.log( "users here" + result );
            if ( !result ) {
                console.log( "I'm here" );
                knex( 'users' ).insert( {
                    full_name: profile.displayName,
                    user_name: profile.id,
                    email: 'facebook',
                    password: null
                } ).then( function ( result, err ) {
                    console.log( result );
                    cb( null, result );
                } )
            } else {
                cb( null, result );
            }
        } )
    }
) );

passport.serializeUser( function ( user, cb ) {
    cb( null, user );
} );

passport.deserializeUser( function ( user, cb ) {
    cb( null, user );
} );
//
// // -------------------------------
// // routes
// // -------------------------------
//
//
app.use( '/', routes );
app.use( '/auth', auth );
app.use( '/wines', wines );
app.use( '/users', users );

//
app.get( '/', function ( req, res ) {
    res.render( 'index' );
} );
// //
app.get( '/auth', function ( req, res ) {
    res.render( 'auth' );
} );

app.get( '/auth/facebook', passport.authenticate( 'facebook' ) );


// // CALLBACK URL
app.get( '/auth/facebook/callback',
    passport.authenticate( 'facebook', {
        failureRedirect: '/login'
    } ),
    function ( req, res ) {

        res.redirect( '/profile' );
    } );



var port = process.env.PORT || 3000;
app.listen( port, function () {
    console.log( "Im ready to wine!" );
} );

module.exports = {
    app
};
