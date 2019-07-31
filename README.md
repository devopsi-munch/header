# devopsi
## Header Service API Reference

| HTTP Method   | Endpoint                          | Description                                                   | Success Response |
|:--------------|:----------------------------------|:--------------------------------------------------------------|:----------------:|
| GET           | /businesses/:id/header            | If exist, return header data for a specific business listing  | Code: 200 Content: ```{"id": "5", "name": "samplename", "avg_stars": "3", "price": "140", "categories": "Pizza", "reviews": [star: 3, date: 04042018] } ```
| POST          | /businesses/header                | Insert a new business listing                                 | Code: 200        |
| PUT           | /businesses/:id/header            | If exist, update a business listing                           | Code: 200        |
| PATCH         | /businesses/:id/header            | If exist, update a part of a business listing                 | Code: 200        |
| DELETE        | /businesses/:id/header            | If exist, delete a business listing                           | Code: 200        |


### Request Body 

URL
- /businesses/header

Method
- POST

Description
- Create a new business listing

URL Params
- None

Data Params

```{"name": "samplename", "price": "140", "categories": "Pizza"}```

---

URL
- /businesses/:id/header

Method
- PUT

Description
- Replace an existing business listing

URL Params
- Business ID required

Data Params

```{"name": "samplename", "price": "140", "categories": "Italian"} ```

---

URL
- /businesses/:id/header

Method
- PATCH

Description
- Modify an existing listing. If modifying a review, date in the format 'yyyy-mm-dd' is required

URL Params
- Business ID required

Data Params

```{"name": "newname"}```

---

URL
- /businesses/:id/header

Method
- DELETE

Description
- Delete an existing listing

URL Params
- Business ID required

Data Params
- None
