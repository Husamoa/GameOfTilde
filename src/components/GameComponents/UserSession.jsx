import React from 'react';

import Cookie  from 'js-cookie';
import uniqid from 'uniqid';

const COOKIE_NAME = "SessionID";

export const setUserSessionID = (id) => {
    Cookie.set(COOKIE_NAME, id);
};

export const getUserSessionID = () => {
    return Cookie.get(COOKIE_NAME);
};

export const genUserSessionID = () => {
    return uniqid('SessionID-');
};

export const createNewSession = ({ name } = {}) => {
    let session = {
        id: genUserSessionID(),
        name,
        progress: {
            finishedLevels: []
        }
    };
    return fetch('/sessions', {
        method: 'POST',
        body: JSON.stringify(session),
        headers: {"Content-Type" : "application/json"}
    })
        .then(resp => resp.json())
        .then(data => {
            setUserSessionID(data.id);
        });

};

export const loadSession = (id) => {
    return fetch(`/sessions/${id}`).then(resp => {
        return resp.json();
    }).then((data) => {
        return data;
    }).catch(err => {
        console.log('Błąd', err);
    });
};

export const loadOrCreateNewSession = () => {
    const id = getUserSessionID();

    if (id) {
        return loadSession(id).then(session => {
            if (session.id) {
                return session;
            }
            return createNewSession();
        })
    }
    return createNewSession();
};

export const updateSession = ({ id, ...rest }) => {

    console.log("updating session", { id, ...rest });

    return fetch(`/sessions/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ id, ...rest }),
        headers: {"Content-Type" : "application/json"}
    }).then(resp => {
        return resp.json();
    }).then((data) => {
        return data;
    }).catch(err => {
        console.log('Błąd', err);
    });
};
