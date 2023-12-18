TODO:
-------------
PROJECT:

- types, typescript?
- cache links locally (store?), am regetting right now every page load

FEATURES:

- check if videos are already saved, show save / unsave icon
- add votes
- add tags
- allow importing bookmarks

- make google sign-in work (callback instead of domain? localhost isn't working)
- make back button go to previous page instead of home page

- add small toast on user action (success / fail)

REAL STUFF:
- get thumbnails of content


LANDING PAGE:
- drag and drop links into new link box


LINK PAGE:
- get title from page somehow
- make title editable

YOUTUBE PAGE:
- fix "original video" button
- fix author vs submitter
- fix mobile layout (video wider, less black bars on top/bottom)
- 
- timestamped comments

USER PAGE: 
- make history look nice

API
- verify data doesn't already exist in DB 
  - link is checked already
  - as is savedlink
  - but not clip, tag, user
- sanity check the duration data - start time, end time
- add try/catch for all the api calls


DONE:
-----------

PROJECT:

-make youtube pages based on contentId instead of URL DONE
-trim title/url based on length DONE

LANDING PAGE:

- don't allow duplicate links DONE
- strip params from link (at least for youtube) DONE
- fix mock link lists DONE
- verify that links go somewhere DONE


YOUTUBE PAGE:
- fix "create clip" to actually make a new link DONE
- fix multiple sets of url params in the link DONE
- add a "restart" button for clips, remove loop flag (can't auto-loop) DONE


USER PAGE
- lists not displaying DONE
- add history DONE

API
- add test data that covers all the main cases (need to redo with new db fields)
- video vs video clip DONE
- other person submitted vs you DONE
- non-youtube sites (embeddable and not-embeddable) DONE


FEATURES
- link items on landing/user page (title, url, duration, votes) DONE


REAL STUFF:
- check if pages load DONE
  - either server-side + add flag to DTO
  - or client side by watching iframe
  - and open in ARCHIVE if they do not DONE 



DB TABLES THAT DEPEND ON EACH OTHER:

- links, tags, comments, have votes
------------------------------------
  PLAN:
    keep a user-vote or user-history table to prevent re-voting

    use materialized views (?) to efficiently fetch the vote count per item

  