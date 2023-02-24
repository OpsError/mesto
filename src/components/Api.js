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
}