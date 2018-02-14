window.addEventListener('load', function () {
  const form = document.getElementById('search-form');
  const searchField = document.getElementById('search-keyword');
  const responseContainer = document.getElementById('response-container');
  let searchedForText;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    responseContainer.innerHTML = '';
    searchedForText = searchField.value;
    getNews();
  });

  function getNews() {
    const articleRequest = new XMLHttpRequest();
    articleRequest.open('GET', `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=125ee87804414f7795b73d1ec1ea1dc9`);
    articleRequest.onload = addNews;
    articleRequest.onerror = handleError;
    articleRequest.send();
    // alert('test');
  }


  function handleError() {
    console.log('Lo malograste!, alejáte');
  }

  function addNews() {
    const data = JSON.parse(this.responseText);
    const articles = data.response.docs;
    for (let index in articles) {
      console.log(articles[index]);
      var dataComplete = articles[index];
      console.log(dataComplete);
      let title = dataComplete.headline.main;
      let snippet = dataComplete.snippet;
  
      let li = document.createElement('li');
      li.className = 'li';
      li.innerHTML = snippet;
  
      responseContainer.appendChild(li);
    }
  };
}); 