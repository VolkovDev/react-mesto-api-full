class Api {
  constructor({ adress, token, }) {
    this._adress = adress
    this._token = token
  }

  _headerResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getInfoUser() {
    return fetch(`${this._adress}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
      .then(this._headerResponse)
  }

  getInitialCards() {
    return fetch(`${this._adress}/cards`, {
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
      .then(this._headerResponse)
  }

  patchEditProfile({name, about}) {
    return fetch(`${this._adress}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        about
      })
    })
      .then(this._headerResponse)
  }

  postAddNewCard({ name, link }) {
    return fetch(`${this._adress}/cards`, {
      method: 'post',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        link
      })
    })
      .then(this._headerResponse)
  }

  deleteCard(_id) {
    return fetch(`${this._adress}/cards/${_id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
    })
      .then(this._headerResponse)
  }

  putHandlerLike(_id, isLiked) {
    if (isLiked) {
      return fetch(`${this._adress}/cards/likes/${_id}`, {
        method: 'PUT',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        },
      })
        .then(this._headerResponse)
    } else {
      return fetch(`${this._adress}/cards/likes/${_id}`, {
        method: 'DELETE',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        },
      })
        .then(this._headerResponse)
}

    }

  patchRefreshAvatar({avatar}) {
    return fetch(`${this._adress}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar
      })
    })
      .then(this._headerResponse)
  }
}

const api = new Api({
  adress: 'https://mesto.nomoreparties.co/v1/cohort-19',
  token: 'f72c8d0b-5fc2-4db7-9b50-05d59d520549'
})

export default api