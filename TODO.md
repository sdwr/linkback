TODO:
-------------

REWARDS:
  notification / score for # of views, votes, links, tags on uploaded content
    - unique / total views show for link owner DONE
    - toast notifications for 10 / 100 / 1000 unique views
      - need message queue on backend
      - when a link is updated, check for new milestones
      - then add them to a message queue for the user
      - when that user:
        - logs in (easier)
        - makes a request (needs middleware?)
      - deliver the messages, then delete from queue

STAGES:
  stage 1:
    youtube page clipper works standalone DONE
    bonus:
      -center bottom tags DONE
      -show full title if there is space
      -delete popup is ugly
  
  stage 2:
    make tag page work as "fan page"
      - some way of sorting on tag page
        - change list to table, allow sorting by new / top
        - add voting on tag page for tags
          - negative score removes the tag from the item
      - sort by clip/youtube
        
      - try tag page as tiled grid
        - preview links on mouseover (add 1s delay to avoid spam?) DONE
        - mobile interface would be hold to preview, let go to enter, move off to deselect
          (easier to test mobile when deployed)
        
        - need to make sure youtubeplayer fn works with multiple (or 1 that keeps remaking?) DONE 
        - how does it work for links and not videos? (tiny archive, autoscroll on mobile?)
          - need to pass scroll through the overlay into the embedding

      - proper thumbnails:
        - the individual thumbnail load is working very rarely right now
        - need 2 resolutions, 1 for linkItem and 1 for linkPage (when embed doesn't load)
        - save on server instead of fetching from link?
          - async fetch on creating link
            -
          - if fails, retry:
            - on load (needs lastTried, only retry once per hour/day )
            - or periodically (need script running on server)
          - sources:
            - youtube can get from API
            - others use openGraph (but most sites don't have??)
            - worst case have 
          - store in folder on server

      - add opengraph images to pages, so it shows up on reddit etc
        - should use thumbnail from actual site for link pages, maybe with watermark

      - related links functionality on link page
        - need some way to add links easily (search bar that searches title, url, tags, my links)

  stage 2 bonus:

    - find some way of making links permanent/unique
      - auto-incrementing IDs sucks for server restarts or "unique" link feel
      - wikipedia-style is perfect, maybe tag URLs are by name?
      - authentic hashes would be too long (same length as actual URLs)
        - compressed hash? 
          most URL characters are lowercase letters

      - add title to URL? 
        even after hash as decoration


-------------------
BUGS:
  - change delete to be soft-delete (links especially)
    - ruins related links
    - and thumbnails will be to hard-coded IDs
  - can't access site from bell cellular data
    - does it want a DNS entry for www.sdwr.ca?
    - nginx entry for www.sdwr.ca?
    - https?
    - blocked IP?
  - being rate limited by archive.is
    - remove preview for tiles?
    - replace preview with thumbnail if fails to load
  - still getting cookie spam (just locally, probably per server restart)
    - looks like login makes 1 additional hash-named cookie
    - clear site cookies before login?
  - tried to delete link with ID of 1, failed because other clips reference it
  - youtube player sometimes is called before its instantiated


-------------------

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
    - fallback to fullsize thumbnail instead of empty archive page (click goes to actual page?)
    - keep track of what has saved pages / does not in DB
    - BONUS: fix scrolling (cut size of page, no double scroll bars)

  AND FIX THUMBNAILS
    -get 2 previews
      thumbnail size and full size


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


CREATE LINK:
- drag and drop links into new link box (impossible?)
- bookmarklet for adding links


LINK PAGE:
- get title from page somehow

YOUTUBE PAGE:
- timestamped comments

API
- backend returns some errors are {errors: []} objects
  which are being accepted as valid responses by the frontend API
- no authentication for updating/voting/deleting items on backend (need to get userId from session and compare vs owner)
- save DB state as file, to import as test data
- verify data doesn't already exist in DB 
  - link is checked already
  - as is savedlink
  - but not clip, tag, user
- sanity check the duration data - start time, end time
- add try/catch for all the api calls


USER:
  - 
  - verify confirmation
  - have log in page?

ARCHITECTURE:
  - supply userId from authentication instead of passed in
  - standardize api params (id + data, id in data?)
  - attach item to userAction in backend
    - tag vs link 


BACKEND:
- returns merged incorrect objects from requests, if they fail to merge?? need try/catch on every single update??
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
  - ability to upgrade guest to real account (change username, set password, set email) DONE
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

    MAKE SURE USER FUNCTIONALITY IS SOLID done
    -login flow:

    - edge cases are: BASICALLY DONE
      - access site in multiple tabs DONE
      - access site for first time DONE
      - access site for first time on server restart

      - what happens when failed to log in DONE 
      - what happens when have saved user and failed to log in DONE
      - what happens when user creates and failed to log in (same as above?) DONE?
      


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
- make title editable DONE
- pretty up the UI DONE
  - fix spacing on mobile KINDA DONE
    -top bar is cluttered (cut off when not logged in? replace buttons w icons?) KINDA DONE
    - clip controls are cut-off DONE
    - should hide bottom tabs by default DONE
    - add tag input should not be scrollable DONE

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

- have custom time bar for clips, hide controls DONE (can't hide controls?)
- set clipEnd to 5 seconds after clipStart if clipStart is moved too close, prevent short loop happening by accident DONE (not fully tested)

- clip controls - text input to scrub sliders DONE
  -means only scrubbing on enter or blur or slider movement (not on text entry) DONE
- confirm popup for delete DONE


USER PAGE
- make save / unsave icons work like landing page DONE
- lists not displaying DONE
- add history DONE
- fix saved links not loading correctly DONE 
- make history look nice DONE
- make save/unsave/history for user looked at, not current user DONE
- add passwords DONE
- verify logins DONE
- have single point of signon that connects to store DONE-ish
- and fns that verify on frontend if user can modify data (username, link name) DONE
- verify it works on backend DONE

TAG PAGE:
  - show list of links DONE

BUGS:
  - trying to add a link that already exists updates the time of the link DONE
    (does it use updatedAt time, date time?)
    - should only be querying so does updatedAt get updated when retrieved?
  - youtube player does not set end time correctly when moved by start time DONE
  (scattered logic for restarting loop vs skip to end)
    - should scrub in 3 conditions
      -1. clip reaches end time naturally (scrub to start)
      -2. start time is changed (scrub to start) 
      -3. end time is changed manually (scrub to a 5s before end, to test new endpoint)

      -but should not scrub to end in the case when it moves because of the start time changing

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

- add view counter for each link (/tag?) DONE
- unique + nonunique DONE
  - for unique, really need to make guest user automatically again DONE


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


    

  