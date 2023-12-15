
- types, typescript?

- make google sign-in work (callback instead of domain? localhost isn't working)
- make back button go to previous page instead of home page

-make youtube pages based on contentId instead of URL

-trim title/url based on length

LANDING PAGE
- don't allow duplicate links DONE
- strip params from link (at least for youtube) DONE
- fix mock link lists DONE
- verify that links go somewhere
- get rid of link object from URL (use store?)

LINK PAGE
- get title from page somehow
- make title editable?

YOUTUBE PAGE
- fix "create clip" to actually make a new link DONE
- fix multiple sets of url params in the link DONE
- add a "restart" button for clips, remove loop flag (can't auto-loop) DONE
- fix "original video" button
- fix author vs submitter
- fix mobile layout (video wider, less black bars on top/bottom)
- 
- timestamped comments

USER PAGE
- lists not displaying DONE
- add history DONE
- make history look nice

API
- add test data that covers all the main cases KINDA
- video vs video clip DONE
- other person submitted vs you DONE

- non-youtube sites (embeddable and not-embeddable)
- sanity check the duration data - start time, end time


FEATURES
- link items on landing/user page (title, url, duration, votes) DONE

- check if videos are already saved, show save / unsave icon
- add votes
- add tags

- add small toast on user action (success / fail)

REAL STUFF:
- get thumbnails of content

- check if pages load
  - either server-side + add flag to DTO
  - or client side by watching iframe
  - and open in ARCHIVE if they do not



DB TABLES THAT DEPEND ON EACH OTHER:

- links, tags, comments, have votes
------------------------------------
  PLAN:
    keep a user-vote or user-history table to prevent re-voting

    use materialized views (?) to efficiently fetch the vote count per item

  