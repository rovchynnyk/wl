type MakeHttpRequestT = {
  url: string,
  method?: 'GET' | 'POST', 
}

export const API_ROOT = 'https://www.rijksmuseum.nl/api/nl/';

export const API_KEY = 'GimMPOdr';

export const makeHttpRequest = async ({ url, method = 'GET' }: MakeHttpRequestT) => {
  const response = await fetch(url, {
    method,
  });

  const json = await response.json();

  console.log(55, json)

  return json;
};
