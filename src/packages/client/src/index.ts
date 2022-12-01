export function fetchJSON<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  return fetch(input, init)
    .then(response => {
      if (!response.ok) {
        return response.json().then(json => {
          return Promise.reject(`Request failed status: ${response.status}}, JSON: ${JSON.stringify(json)}`);
        });
      } else if (response.ok) {
        return response.json();
      }
    })
    .then((rate: T) => {
      return rate;
    });
}
