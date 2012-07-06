import json
import urllib


def get_data(endpoint, params):
    
    url = endpoint + urllib.urlencode(params) + "&offset=%s"
    
    data = []
    offset= 0

    while True:
        response = urllib.urlopen(url%offset)
        s = unicode(response.read(), errors="ignore")
        results = json.loads(s)['results']
        if len(results) == 0:
            print "no more results returned"
            break
        data.extend(results)
        offset += 1
        print url%offset
    return data
    
apiKey = "6c7f272b103a6f33193925f2547a1c"

params = {
    "key": apiKey,
#    "event_id": "60617252", # 12 Factors for Python
    "event_id": "62339552", # Beginners Python Workshop
#    "group_id": "1909691", # Python KC
}

# get first page of members
endpoint = 'https://api.meetup.com/rsvps?' 
people = get_data(endpoint, params)

json.dump(people, open('people.json','w'))

nodes = []

profiles = []

for person in people:
    if person['response'] == "yes":
        params = {
            "key": apiKey,
            "member_id": person['id'],
            }
        url = 'https://api.meetup.com/members?' 
        profile = get_data(url, params)[0]
        profiles.append(profile)
        if profile['photo_url'] != '':
            nodes.append({
                    "name": profile['name'],
                    "photo_url": profile['photo_url']
                    })
        
json.dump(profiles, open('profiles.json','w'))

json.dump(
    {
        "nodes": nodes,
    },
    open('pythonkc_hackr_event.json','w')
)
