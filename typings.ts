export enum Locale {
    ru = 'ru-Ru'
}

export enum EntityType {
    geo = 'YANDEX.GEO',
    fio = 'YANDEX.FIO',
    number = 'YANDEX.NUMBER',
    date = 'YANDEX.DATENAME'
}

export interface BaseEntity {
    tokens: {
        start: number;
        end: number;
    }
    type: EntityType;
    value: any;
}

export interface GeoEntity extends BaseEntity {
    type: EntityType.geo;
    value: {
        house_number: number;
        street: string
    }
}

export interface FioEntity extends BaseEntity {
    type: EntityType.fio,
    value: {
        first_name: string;
        last_name: string;
    }
}

export interface NumberEntity extends BaseEntity {
    type: EntityType.number;
    value: number;
}

export interface DateEntity extends BaseEntity {
    type: EntityType.date;
    value: {
        day: number;
        day_is_relative: boolean;
    }
}

export type Entity =
    | NumberEntity
    | DateEntity
    | FioEntity
    | GeoEntity

export interface AliceResponse {
    meta: {
        locale: Locale;
        timezone: string;
        client_id: string;
        interfaces: {
            screens: {}
        }
    };
    request: {
        command: string;
        original_utterance: string;
        type: string;
        markup: {
            dangerous_context: boolean;
        };
        payload: {};
        nlu: {
            tokens: string[];
            entities: Entity[]
        }
    };
    session: {
        new: boolean;
        message_id: number;
        session_id: string;
        skill_id: string;
        user_id: string;
    };
    version: string;
}

export interface State {
    state: string;
    meta: any;
}

export type Chat = (state: State, message: string, originalMessage: string) => string;
