
user = {
  "id": "someid",
  "fullName": "string",
  "email": "string",
  "tel": "int",
  "adress": {
    "street": "string",
    "city": "string",
    "zip": "int",
    "country": "string"
  },
  "isAdmin": "boolean"
}

order = {
  "id": "someid",
  "user": "someid",
  "items": [
    {
      "id": "productId",
      "qty": "int",
      "price": "float",
    }
  ],
  "freight": "float",
  "total": "float",
  "adress": {
    "street": "string",
    "city": "string",
    "zip": "int",
    "country": "string"
  },
  "timeStamp": "someTimestamp",
  "status": "string"
}