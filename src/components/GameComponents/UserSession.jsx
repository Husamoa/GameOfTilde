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

export const createNewSession = ({ name } = {}) => {
    let session = {
        name: "",
        progress: {
            finishedLevels: [0]
        }
    };
    return fetch('https://gameoftilde.firebaseio.com/sessions.json', {
        method: 'POST',
        body: JSON.stringify(session),
        headers: {"Content-Type" : "application/json"}
    })
        .then(resp => resp.json())
        .then(data => {
            setUserSessionID(data.name);
        });

};

export const loadSession = (id) => {
    return fetch(`https://gameoftilde.firebaseio.com/sessions/${id}.json`).then(resp => {
        return resp.json();
    }).then((data) => {

        console.log("!!!!1", data);
        return data;
    }).catch(err => {
        console.log('Błąd', err);
    });
};

export const loadOrCreateNewSession = () => {
    const id = getUserSessionID();

    if (id) {
        return loadSession(id).then(session => {
            if (session) {
                return session;
            }
            return createNewSession();
        })
    }
    return createNewSession();
};

export const updateSession = ({ ...newSessionValues }) => {

    const id = getUserSessionID();

    return loadOrCreateNewSession().then(session => {
        fetch(`https://gameoftilde.firebaseio.com/sessions/${id}.json`, {
            method: 'PATCH',
            body: JSON.stringify({ ...session, ...newSessionValues }),
            headers: {"Content-Type" : "application/json"}
        }).then(resp => {
            return resp.json();
        }).then((data) => {
            return data;
        }).catch(err => {
            console.log('Błąd', err);
        });
    })
};
