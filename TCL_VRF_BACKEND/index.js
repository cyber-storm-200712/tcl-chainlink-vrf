`use strict`;
/**
 * root node call defined here
 */
import 'dotenv/config';
import Server from './src/bin/server';

new Server().init();