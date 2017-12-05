import Cookies from 'js-cookie';

const isHeadersValid = headers => (
  headers.get('uid') && headers.get('client') && headers.get('access-token')
);

const cookiesOnClient = () => ({
  get(name) {
    return Cookies.get(name);
  },
  set(name, value) {
    Cookies.set(name, value, { expires: 365 });
  }
});

const cookiesOnServer = (req, res) => ({
  get(name) {
    return req.cookies[name];
  },
  set(name, value) {
    res.cookie(name, value);
  }
});

function setUpCookies(response) {
  if (response.url.includes('auth/sign_in')) {
    let cookiesManager = cookiesOnClient()
    cookiesManager.set('access-token', response.headers.get('access-token'));
    cookiesManager.set('uid', response.headers.get('uid'));
    cookiesManager.set('expiry', response.headers.get('expiry'));
    cookiesManager.set('token-type', response.headers.get('token-type'));
    cookiesManager.set('client', response.headers.get('client'));
  }
}

function checkStatus(response) {
  if (response.url.includes('auth/sign_out')) {
    location.reload()
    return response;
  } else if (response.status >= 200 && response.status < 300) {
    return response;
  } else if (response.status === 401) {
    response.json().then(object => {
      if (object.errors[0] === 'You need to sign in or sign up before continuing.') {
        location.reload()
        return response;
      }
    });
  } else {
    return response.json().then(object => {
      throw object.errors.full_messages ? object.errors.full_messages : object.errors;
    });
  }
}

function parseJSON(response) {
  if (response.status == 204) {
    return response;
  }
  return response.json();
}

function createRequestPromise(method, url, data, cookiesManager) {
  let authHeaders = new Headers({
    'access-token': cookiesManager.get('access-token'),
    'token-type': cookiesManager.get('token-type'),
    uid: cookiesManager.get('uid'),
    expiry: cookiesManager.get('expiry'),
    client: cookiesManager.get('client'),
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });

  const options = {};

  options.method = method;
  options.headers = isHeadersValid(authHeaders) ? authHeaders : new Headers({'Accept': 'application/json', 'Content-Type': 'application/json'});
  options.body = data ? data.data : null;

  return fetch(`https://safe-everglades-57796.herokuapp.com${url}`, options)
    .then((response) => {
      setUpCookies(response)
      return response;
    })
    .then(checkStatus)
    .then(parseJSON)
    .catch((err) => {
      throw err;
    });
}

export default (req = null, res = null) => {
  const cookiesManager = req && res ? cookiesOnServer(req, res)
                                    : cookiesOnClient();

  return {
    get(url, data, options = {}) {
      return createRequestPromise('GET', url, data, cookiesManager);
    },
    post(url, data, options = {}) {
      return createRequestPromise('POST', url, data, cookiesManager);
    },
    put(url, data, options = {}) {
      return createRequestPromise('PUT', url, data, cookiesManager);
    },
    patch(url, data, options = {}) {
      return createRequestPromise('PATCH', url, data, cookiesManager);
    },
    delete(url, data, options = {}) {
      return createRequestPromise('DELETE', url, data, cookiesManager);
    }
  };
};
