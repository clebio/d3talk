# A data-visualization of Meetup info using D3
## Overview
This is an extension of the 'egovis' slide from [Mike Dewar's talk on D3][dcon]. We use the [Meetup API][meet] and Mike Bostock's [D3 library][d3]. 

## Approach
Your Meetup API key goes in `data/apiKey.txt` and is excluded from versioning via `.gitignore`.  

<<<<<<< HEAD
## To Do Plan
=======
<<<<<<< HEAD
## To-Do Plan
=======
## To Do Plan
>>>>>>> 23a1b4b5d42170628092db9af02bb1f3edf48105
>>>>>>> 27c049106cae94119f5d61851ffb29d3a40fc6c2
  - add other D3 layout options and allow for switching them
  - ajax calls to the Meetup API: more events, paginate members and display while loading, etc.
    - local store of retrieved records (light-weight local DB) 

## Implementation
### Wrap the Meetup API
I assume there is a Python library out there already that handles calls to the Meetup API. I'm rolling my own here just to get some chops. This is the plan:
  - navigate the Meetup API graph:
    - select an attendee and see their other attended meetups
	- select another event and see attendees (positive RSVPs)
	- etc.

<<<<<<< HEAD
The file `code\meetup.py` is a module whose functions should map directly to the Meetup API endpoints. So far, I have `getEventAttendees(event_id)` and `getMembers(group_id)` working. The basic use case is `import code.meetup as m` then `members = m.getMembers('1909691')`.
=======
<<<<<<< HEAD
The file `code\meetup.py` is a module whose functions should map directly to the Meetup API endpoints. So far, I have `getEventAttendees(event_id)` and `getMembers(group_id)` working. The basic use case is `import code.meetup as m` then `members = m.getMembers('1909691')`.
=======
The file `code\meetup.py` is a module whose functions should map directly to the Meetup API endpoints. So far, I have `getEventAttendees(event_id)` and `getMembers(group_id)` working. The basic use case is 
        import code.meetup as m
		members = m.getMembers('1909691')
>>>>>>> 23a1b4b5d42170628092db9af02bb1f3edf48105

>>>>>>> 27c049106cae94119f5d61851ffb29d3a40fc6c2

## From Mike's github [repo][dewar]: 
>a talk aimed to try and get data scientists over that first hump of d3's learing curve and into the beautiful vista beyond...
>
>The code for the slide mechanics was written by Mike Bostock in d3! The data is from meetup.com's public API.
>
>In order to actually run through talk, clone this repository and run `python -m SimpleHTTPServer 8000`. Then point your browser at http://localhost:8000.

[dewar]: https://github.com/mikedewar/d3talk
[dcon]: http://vimeo.com/35005701
[meet]: http://www.meetup.com/meetup_api/docs/members/
[d3]: http://d3js.org/
