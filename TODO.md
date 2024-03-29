TODO:
-------------

PROJECT:
  - how to remove tags from link
    x to remove
    x to vote to hide

  - should tags have separate vote count?
    would need to make votes generic
    think about full generic items (probably crazy!)

  -add pinned bottom bar? (comments, tags, add link as slideouts from bottom)
  -deleting links might break dependencies (clips -> original)
    make error page

FEATURES:
  FIX ARCHIVE FLOW
    - archive URL if doesn't load, submit archive URL if doesn't already exist
    - figure out if page is already cached (read screen?)
    - send async request to archive.is to cache page if not (CANT DO FROM IFRAME!!)
    - once cached, need to hard refresh the page? looks like the failure screen on archive.is is cached
    - keep track of what has saved pages / does not in DB
    - BONUS: fix scrolling (cut size of page, no double scroll bars)

- add votes KINDA DONE
    still need to grey out completed vote (add to add to site data)
- make votes generic, so they can apply to tags as well
    put a table name in the row and check table + id? otherwise the ids overlap, unless they are unique over the entire DB

- add comments
- allow importing bookmarks
- add search?
- how should recommended work
- add logged-in user
- make google sign-in work (callback instead of domain? localhost isn't working)
    add hosted site to whitelist
- make back button go to previous page instead of home page

- add small toast on user action (success / fail)

REAL STUFF:
- get thumbnails of content KINDA DONE
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
- drag and drop links into new link box (impossible?)


LINK PAGE:
- get title from page somehow
- make title editable

YOUTUBE PAGE:
- have custom time bar for clips, hide controls
- set clipEnd to 5 seconds after clipStart if clipStart is moved too close, prevent short loop happening by accident

- timestamped comments

API
- save DB state as file, to import as test data
- verify data doesn't already exist in DB 
  - link is checked already
  - as is savedlink
  - but not clip, tag, user
- sanity check the duration data - start time, end time
- add try/catch for all the api calls


USER:
  - ability to upgrade guest to real account (change username, set password, set email)
    with email accept confirmation
  - authenticate user for requests (done automatically?)
  - have log in page?

BACKEND:
- return null instead of 404, avoid error messages in console
- check return types on DELETE endpoints. what is expected? boolean? the deleted record? null in case of failure?
- consistency:
  - date different types - vine.date in validator, any in interface, dateTime coming from frontend
  - primary id named "id" on backend, "linkId", "userId", etc on frontend DONE
  - vote has "linkId" but should be generic for tags etc

  - should there be copies of tags by user? is it a global thing or a "subscribe to" kind of thing
  - search for tags when creating
  - can't change tag name when updating (breaks uniqueness check)
  - userId w tag should not matter

FRONTEND:

- types, typescript?
- cache links locally (store?), am re-getting right now every page load
- fix mobile layout (video wider, less black bars on top/bottom) KINDA DONE


TESTING:
- write backend tests for create/update/delete 
- test validation + duplicate checking


DONE:
-----------

PROJECT:
- remove add link button from landing page, replaced with top button DONE
-local dev broken on mobile (can't log in) DONE
- remove debug button from top bar (secret access at /debug) DONE 


USER:
  - use sessions to authenticate and stay logged in DONE
  - stored in local storage DONE
  - first iteration, guest users only DONE
  - flow is:
    - on first time:
      * create guest user
      * create session for guest user
      * return session

    - when returning:
      * get session from local storage
    
    - while session is on client
      * verify all requests using sessionToken
        (check that session w that token exists for that user)

    - if logging in from another device
      * can log out of guest user and log into existing user

    - to upgrade guest user
      * add email, change name, create password


HOSTING:
- ssh into server DONE 
- install vue DONE
- fix vue dependencies DONE
  (replace cli with vite for vue3)
- add domain DONE
- install postgres DONE
- install backend DONE

BACKEND:
- adding user data to links is done in a second call... combine? NOT FOR NOW
- move user action to inside the backend controller/service DONE


-make youtube pages based on contentId instead of URL DONE
-trim title/url based on length DONE
- taglink api call named "taggedLink" DONE

DB:
  - figure out how table linking is supposed to work DONE
    - links need to return user data for voting / saved
    - savedLinks actually need to return links


LANDING PAGE:
- strip params from link (at least for youtube) DONE
- fix mock link lists DONE
- verify that links go somewhere DONE

LINK PAGE:
- feature parity with youtube page DONE


YOUTUBE PAGE:
- fix "create clip" to actually make a new link DONE
- fix multiple sets of url params in the link DONE
- add a "restart" button for clips, remove loop flag (can't auto-loop) DONE
- fix author vs submitter DONE

- may need to manipulate the video using youtube API (loop, autoplay, scrub) DONE
- fix autoplay + looping DONE
  - autoplay=1/loop=1 seems to not work for embedded vids
- scrub to start of clip when using "start of clip" slider DONE
- find some way to auto-unmute (or add huge unmute button on screen) DONE
- fix console errors (tries to hit player fns before startup and after close) DONE
- set clip range to actual length of video DONE
- fix "original video" button DONE


USER PAGE
- make save / unsave icons work like landing page DONE
- lists not displaying DONE
- add history DONE
- fix saved links not loading correctly DONE 
- make history look nice DONE
- make save/unsave/history for user looked at, not current user DONE

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
    link tables (tagLink), GET over multiple tables

    ex. to populate the save / unsave button

      - get list of saved links for the user

      - merge with list of links being displayed


    

  