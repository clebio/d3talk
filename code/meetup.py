import json
import urllib
import os.path
    
_apiKey = ""
_basepath = os.path.abspath(os.path.join(os.path.dirname(__file__), '..')) + '/'
_endpoint = 'https://api.meetup.com/' 
_apiFile = _basepath + '/data/apiKey.txt'
with open(_apiFile) as x: _apiKey = x.read().rstrip()
_params = {
    "key": _apiKey,
#    "group_id": "1909691", # Python KC
#    "event_id": "60617252", # 12 Factors for Python
#    "event_id": "62339552", # Beginners Python Workshop
}

def _get_data(target, _params):
    url = _endpoint + target + '?' + urllib.urlencode(_params) + "&offset=%s"    
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

def getEventAttendees(eventId):
    _params['event_id'] = eventId
    people = _get_data('rsvps', _params)
    attendees = []
    for person in people:
        if person['response'] == "yes":
            attendees.append({
                    "name": person['name'],
                    'member_id': person['member_id'],
                    })
    json.dump(attendees, open(_basepath + 'json/eventAttendees' + eventId + '.json','w'))
    return attendees

def getMembers(group_id):
    _params['group_id'] = group_id
    people = _get_data('members', _params)
    members = []
    for person in people:
        members.append({
                "name": person['name'],
                "photo_url": person['photo_url'],
                'bio': person['bio'],
                'lat': person['lat'],
                'lon': person['lon'],
                'city': person['city'],
                'state': person['state'],
                'profileLink': person['link'],
                'topicCount': len(person['topics']) # list: { 'id', 'name', 'urlkey'}
                })
    json.dump(members, open(_basepath + 'json/groupMembers' + group_id + '.json','w'))
    return members
