## Menu
Get events for menu by user

*GET /api/users/{user-id}/events*

Response: 200
```json
[
  {
    "id": 123,
    "slug": "husitska",
    "name": "Husitská",
  },
]
```
Response: 400
```json
{
  "message": "This user doesn't exists.",
}
```

## Event Information

### GET

Retrieve information about event

*GET /api/events/{event-id}/information*

Response: 200
```json
{
  "date": "28/09/2025",
  "address": "Husitská 70/24, 130 00 Praha 3 - Žižkov",
  "municipal_district": "Praha 3",
  "latitude": 50.087274,
  "longitude": 14.443054,
  "space_type": "PARK",
  "space_area": "500",
  "event_type": "SMALL",
  "event_type_description": "Lorem ipsum",
}
```
Response: 400
```json
{
  "message": "This event id doesn't exist.",
}
```

### PATCH

Update information about event

*PATCH /api/events/{event-id}*

```json
{
  "name": "Husitská",
  "date": "28/09/2025",
  "address": "Husitská 70/24, 130 00 Praha 3 - Žižkov",
  "municipal_district": "Praha 3",
  "latitude": 50.087274,
  "longitude": 14.443054,
}
```

## Event organizers

### GET

Retrieve organizers of event

*GET /api/events/{event-id}/organizers*


```json
{
  "company": {
    "id": 1,
    "title": "Company name, s.r.o.",
    "business_type": "PO",
    "ico": "1234567",
    "dic": "CZ1234567",
  },
  "people": [
    {
      "id": 123,
      "name": "Jan",
      "surname": "Novak",
      "email": "jan.novak@email.cz",
      "phone": "+420123456789",
      "account": false,
    }
  ],
}
```

### POST

Add new organizer

*POST /api/user*


```json
{
  "eventId": 123,
  "name": "Jan",
  "surname": "Novak",
  "email": "jan.novak@email.cz",
  "phone": "+420123456789",
}
```

### PUT

Update info about one organiser. Organiser should not have account here.

*PUT /api/user/{user-id}*

```json
{
  "name": "Jan",
  "surname": "Novak",
  "email": "jan.novak@email.cz",
  "phone": "+420123456789",
}
```

### PUT

Update info about company.

*PUT /api/company/{company-id}*

```json
{
  "title": "Company name, s.r.o.",
  "business_type": "PO",
  "ico": "1234567",
  "dic": "CZ1234567",
}
```

## Event content

### GET

Retrieve event content to ZMJ web

*GET /api/events/{event-id}/content*

```json
{
  "image": "file",
  "main-content": "Lorem ipsum",
  "links": [
    {
      "url": "www.facebook.com",
      "title": "Facebook event"
    },
  ]
}
```