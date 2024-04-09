

want:

- don't slow down page load based on login
- try to maintain same session instead of recreating
- track page views by session
- multiple views by same session don't stack
- multiple views by different session by same user don't stack
- only logged in users can add content
- not logged in can view
some grey area with logged in guest / not logged in with session


flow:

- on first query: create new session
- keep session until 


