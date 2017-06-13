class JsonLoader {

  load(url) {
    return fetch(url)
      .then(response => response.json())
      .catch(error => error);
  }
}

export default JsonLoader;
