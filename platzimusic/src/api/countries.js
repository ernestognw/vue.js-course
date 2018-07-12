const URL = 'https://restcountries.eu/rest/v2/all?fields=name;translations';

export default function getCountries () {
  return fetch(URL)
    .then(res => res.json())
}
