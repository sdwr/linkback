TODO:
-------------

USER:
  - authenticate user
  - have log in page?

BACKEND:
- adding user data to links is done in a second call... combine?
- check return types on DELETE endpoints. what is expected? boolean? the deleted record? null in case of failure?
- move user action to inside the backend controller/service
- consistency:
  - date different types - vine.date in validator, any in interface, dateTime coming from frontend
  - primary id named "id" on backend, "linkId", "userId", etc on frontend
  - vote has "linkId" but should be generic for tags etc

  - should there be copies of tags by user? is it a global thing or a "subscribe to" kind of thing

FRONTEND:

- types, typescript?
- cache links locally (store?), am regetting right now every page load
- fix mobile layout (video wider, less black bars on top/bottom)
- fix mock data, exporting from localStorage to file


TESTING:
- write backend tests for create/update/delete 
- test validation + duplicate checking

FEATURES:

- add votes
- add comments
- archive URL if doesn't load, submit archive URL if doesn't already exist
- allow importing bookmarks
- add search?
- how should recommended work
- add logged-in user
- make google sign-in work (callback instead of domain? localhost isn't working)
    add hosted site to whitelist
- make back button go to previous page instead of home page

- add small toast on user action (success / fail)

REAL STUFF:
- get thumbnails of content
  -temporarily serving (only to sdwr.ca) with thum.io free trial
  -options:
    1 scrape image from actual page
    2 make user scrape image first time page is embedded
    3 load OpenGraph image
      - save thumbnail on server
      - set up CORS proxy on the server, so the client can fetch thumbnail without hitting CORS DONE
    - pay for a service to do 1 or 3
  - done CORS OG passthrough, will hook up when server is hooked up


LANDING PAGE:
- drag and drop links into new link box


LINK PAGE:
- feature parity with youtube page
- get title from page somehow
- make title editable

YOUTUBE PAGE:
- fix "original video" button
- 
- timestamped comments

USER PAGE: 
- make history look nice
- make save/unsave/history for user looked at, not current user

API
- save DB state as file, to import as test data
- verify data doesn't already exist in DB 
  - link is checked already
  - as is savedlink
  - but not clip, tag, user
- sanity check the duration data - start time, end time
- add try/catch for all the api calls


DONE:
-----------

HOSTING:
- ssh into server DONE 
- install vue DONE
- fix vue dependencies DONE
  (replace cli with vite for vue3)
- add domain DONE
- install postgres DONE
- install backend DONE


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
- fix author vs submitter DONE


USER PAGE
- make save / unsave icons work like landing page DONE
- lists not displaying DONE
- add history DONE

TAG PAGE:
  - show list of links DONE

API
- add test data that covers all the main cases (need to redo with new db fields)
- debug page that shows DB data DONE
- video vs video clip DONE
- other person submitted vs you DONE
- non-youtube sites (embeddable and not-embeddable) DONE


FEATURES
- link items on landing/user page (title, url, duration, votes) DONE
- check if videos are already saved, show save / unsave icon DONE
- add tags DONE


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

    index by all the IDs, so searching for ex. all tags for a link is pretty fast

    use materialized views (?) to efficiently fetch the vote count per item ?


  CURRENT APPROACH:
    link tables (taggedLink), GET over multiple tables

    ex. to populate the save / unsave button

      - get list of saved links for the user

      - merge with list of links being displayed


    

  