import express from 'express';

import { join } from 'path';

import { Chat } from './typings';
import { aliceResponseRoute } from "./route";

export const aliceTesting = (chat: Chat<{}>, port?: number) => {
    const PORT = port || process.env.PORT || 3000;

    const app = express();

    app
        .use(express.json())
        .set('view engine', 'pug')
        .set('views', join(__dirname, '/view'))
        .use('/static', express.static(join(__dirname, '/static')))
        .get('/', (req, res) => res.render('index'))
        .use('/rest', aliceResponseRoute(chat, {}))
        .use('*', (req, res) => res.render('error'));

    app.listen(PORT, console.log.bind(null, `Server started on ${PORT} port. http://localhost:${PORT}/`));

    return app;
};

export const aliceServer = <State>(chat: Chat<State>, initialData: State, port?: number) => {
    const PORT = port || process.env.PORT || 3000;

    const app = express();

    app
        .use(express.json())
        .use(aliceResponseRoute(chat, initialData));

    app.listen(PORT, console.log.bind(null, `Alice server started on ${PORT} port. http://localhost:${PORT}/`));

    return app;
};
