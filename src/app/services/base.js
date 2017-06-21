export default class BaseService {

  get(url) {

    const options = {
      method: 'GET',
      mode: 'cors'
    };

    return new Promise((resolve, reject) => {
      fetch(url, options)
        .then(response => resolve(response.json()))
        .catch(error => reject(error));
    });

  }

}
