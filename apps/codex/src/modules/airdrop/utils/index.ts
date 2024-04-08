export const postTweet = () => {
  // post tweet
  // 1. url
  const windowReference = window.location.href;
  const hrefEl =
    'https://twitter.com/intent/tweet?url=' +
    windowReference +
    '&text=' +
    encodeURIComponent('codexfield!');
  // tweetButton.setAttribute('href', hrefEl)

  return hrefEl;

  // 2. sdk
  // https://developer.twitter.com/en/docs/twitter-api
  // https://www.postman.com/twitter/workspace/twitter-s-public-workspace/request/9956214-5bd6ebb1-9d79-4456-a9a6-22ead4a41625
};
