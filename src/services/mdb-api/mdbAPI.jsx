import { mdbApiKey, apiUrl } from '../../config';

export class MdbAPI {
  key = mdbApiKey;

  fetchRequest = async (link, body, method = 'GET') => {
    const fetchParams = {
      method,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    };

    fetchParams.body = body && JSON.stringify(body);

    const result = await fetch(link, fetchParams);
    return result.json();
  };

  getMovies(page, query) {
    return this.fetchRequest(`${apiUrl}/search/movie?api_key=${this.key}&query=${query}&page=${page}`);
  }

  getGenres() {
    return this.fetchRequest(`${apiUrl}//genre/movie/list?api_key=${this.key}&language=en-US`);
  }

  getGuestSessinon() {
    return this.fetchRequest(`${apiUrl}/authentication/guest_session/new?api_key=${this.key}
        `);
  }

  getRatedMovies(guestId, page) {
    return this.fetchRequest(
      `${apiUrl}/guest_session/${guestId}/rated/movies?api_key=${this.key}&language=en-US&sort_by=created_at.asc&page=${page}`
    );
  }

  async postRate(movieId, guestId, rateValue) {
    const data = {
      value: rateValue,
    };
    const url = `${apiUrl}/movie/${movieId}/rating?api_key=${this.key}&guest_session_id=${guestId}`;
    this.fetchRequest(url, data, 'POST');
  }

  async deleteRate(movieId, guestId) {
    const url = `${apiUrl}/movie/${movieId}/rating?api_key=${this.key}&guest_session_id=${guestId}`;
    this.fetchRequest(url, false, 'DELETE');
  }
}
