import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import {book} from './resolver/index';
import schema from './schema'
import cors from 'cors';
import * as bodyParser from 'body-parser';
import dotenv from 'dotenv'
dotenv.config();
import {route} from './routes/index';

export const app = express();

// enable corse for all origins
app.use(cors());
export const server = new ApolloServer({typeDefs: schema, resolvers: book});
 
server.applyMiddleware({app})

// middleware for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// middleware for json body parsing
app.use(bodyParser.json({limit: '5mb'}));

app.use('/', route);
