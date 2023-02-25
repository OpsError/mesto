export default class Api {
    constructor(config) {
        this._url = config.baseUrl;
        this._headers = config.headers;
    }

    _handleResponse(res) {
        if (res.ok) {
            return res.json();
          }
        return Promise.reject(new Error('Произошла ошибка'));
    }

    getInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers
        })
            .then (this._handleResponse);
    }

    getCard() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers
        })
            .then (this._handleResponse);
    }

    patchInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.link
            })
        })
            .then (this._handleResponse);
    }

    postCard(data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then (this._handleResponse);
    }

    
}