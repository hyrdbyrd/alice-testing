import { Router } from 'express';

import { DataBase } from "./helpers";
import { Chat } from "./typings";

export const aliceResponseRoute = <T>(chat: Chat<T>, initialData: T, db = new DataBase<T>()): Router => {
    const router = Router();
    router.all('/', (req, res) => {
        const { request, session, version } = req.body;

        if (!db.get(session))
            db.add(session, initialData);

        let text;
        try {
            text = chat(db.get(session), request.command, request.original_utterance)
        } catch (e) {
            text = e.toString();
        }

        res.send({
            version,
            session,
            response: {
                text,
                end_session: false
            }
        });
    });

    return router;
};
