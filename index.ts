import * as express  from 'express';

import { join } from 'path';

import { DataBase } from './helpers';
import { Chat, State } from './typings';

const app = express();

app
    .use(express.json())
    .set('view engine', 'pug')
    .set('views', join(__dirname, '/view'))
    .use('/static', express.static(join(__dirname, '/static')))
    .get('/', (req, res) => {
        res.render('index');
    });

export const aliceTesting = (chat: Chat, port?: number) => {
    const PORT = port || process.env.PORT || 3000;
    const db = new DataBase<State>();

    app
        .post('/rest', (req, res) => {
            const { request, session, version } = req.body;

            if (!db.get(session))
                db.add(session, { state: 'initial', meta: {} });

            res.send({
                version,
                session,
                response: {
                    text: chat(db.get(session), request.command, request.original_utterance),
                    end_session: false
                }
            });
        })
        .use('*', (req, res) => {
            res.render('error');
        });

    app.listen(PORT, console.log.bind(null, `Server started on ${PORT} port. http://localhost:${PORT}/`));
};

aliceTesting((_, text) => {
    return text;
});
