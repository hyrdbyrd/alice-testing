# Alice Testing
## How to use
```ts
import { aliceServer } from 'alice-server';

aliceServer((session, message) => {
    if (session.state === 'ping') {
        session.state = 'pong';
        return 'Пинг';
    }

    if (session.state === 'pong') {
        session.state = 'ping';
        return 'Понг';
    }

    return 'Что-то явно пошло не так'ж
});
```