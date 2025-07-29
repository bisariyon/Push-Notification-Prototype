## 📄 Documentation done by me

You can find the full documentation [here](https://docs.google.com/document/d/1oNtOgrBc-nx_Wd7P7adIk-FDZFtVuaLG/edit?usp=sharing&ouid=104010401355074283083&rtpof=true&sd=true).



The server will start on `http://localhost:3000`.

## 📫 Running using Postman

**Endpoint:**  
```
http://localhost:3000/api/send-push
```

### ✅ Example 1: With route to a target path

```json
{
  "title": "Greeting",
  "body": "Hello Shubham This is a test",
  "token": "c2qgeC-QTQ24YtTuVlo4om:APA91bEm3C0gKqoIgnsleqU1xNLXPORDHMxGetS9Vtezska2NxCnq3glbGH7rghyAaKuPhSNLVuKsqm48kjBldebXjYIgudiGoFWGCeVfYzFzsWr768gRcU",
  "data": {
    "target": "dashboard",
    "userId": "12345"
  }
}
```

### ✅ Example 2: Without route to a target path

```json
{
  "title": "Greetings",
  "body": "Hello Deepanshu",
  "token": "dKR0PRQkQ52An66x-ZWWec:APA91bG9o1-g7bSFnF57kTT3_tvXmkrnjuEv-3HCOpb-dYCFwpf-2VWddSLrun9jKxYroCAL6oZwD39ZgmOThexNHgC_krSwwkmKVz3aNgCw6TCrvC_t0DE"
}
```

> ⚠️ Replace the `token` with an actual FCM token from your mobile/web client.
