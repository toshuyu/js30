import tweepy
import json


CONSUMER_KEY = 'YOUR_CONSUMER_KEY'
CONSUMER_SECRET = 'YOUR_CONSUMER_SECRET'
ACCESS_TOKEN = 'YOUR_ACCESS_TOKEN'
ACCESS_TOKEN_SECRET = 'YOUR_ACCESS_TOKEN_SECRET'


def get_api():
    auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
    auth.set_access_token(ACCESS_TOKEN, ACCESS_TOKEN_SECRET)
    api = tweepy.API(auth)
    return api


def download_fav_tweets_text(username):
    api = get_api()
    fav_tweets = api.favorites(screen_name=username, count=200)
    tweet_texts = []
    for tweet in fav_tweets:
        tweet_texts.append(tweet.text)
    return tweet_texts


try:
    user_name = 'some_twitter_user'
    liked_tweets = download_fav_tweets_text(user_name)

    with open('tweets.txt', 'w') as file:
        for tweet in liked_tweets:
            file.write(tweet + '\n')
except Exception:
    pass