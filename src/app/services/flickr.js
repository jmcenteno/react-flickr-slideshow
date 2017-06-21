import BaseService from './base';

const FLICKR_API_KEY = 'ea2cbf693855be28afac8650e8bc987e';

class FlickrService extends BaseService {

  baseUrl = `https://api.flickr.com/services/rest/?api_key=${FLICKR_API_KEY}&format=json&nojsoncallback=1`;

  searchPhotos(input) {

    if (typeof input !== 'string') {
      return Promise.reject(new Error('Invalid search query'));
    }

    return new Promise((resolve, reject) => {

      this.get(`${this.baseUrl}&method=flickr.photos.search&text=${input}&safe_search=1`)
        .then(data => {

          if (data.stat === 'ok') {

            const photos = data.photos.photo.map(photo => {
              const { id, title, farm, server, secret } = photo;
              return {
                id,
                title: title === '' ? 'Untitled' : title,
                thumb: `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_q.jpg`,
                full: `https://farm${farm}.staticflickr.com/${server }/${id}_${secret}_z.jpg`
              };
            });

            resolve(photos);

          } else {

            reject(data);

          }

        })
        .catch(error => reject(error));

    });

  }

}

export default new FlickrService();
