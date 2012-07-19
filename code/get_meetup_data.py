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
    
apiKey = ""
with open('apiKey.txt') as x: apiKey = x.read().rstrip()

params = {
    "key": apiKey,
#    "event_id": "60617252", # 12 Factors for Python
    "event_id": "62339552", # Beginners Python Workshop
#    "group_id": "1909691", # Python KC
}

# get first page of members
endpoint = 'https://api.meetup.com/rsvps?' 
people = get_data(endpoint, params)

json.dump(people, open('../json/people.json','w'))

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
        if profile['photo_nodes'] != '':
            nodes.append({
                    "name": profile['name'],
                    "photo_url": profile['photo_url'],
                    'bio': profile['bio'],
                    'lat': profile['lat'],
                    'lon': profile['lon'],
                    'city': profile['city'],
                    'state': profile['state'],
                    'profileLink': profile['link'],
                    'topics': profile['topics'] # list: { 'id', 'name', 'urlkey'}
                    })
        
json.dump(profiles, open('../json/profiles.json','w'))

json.dump(
    {
        "nodes": nodes,
    },
    open('../json/pythonkc_hackr_event.json','w')
)
