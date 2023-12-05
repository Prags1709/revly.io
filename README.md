# revly.io
**DoubtShare (Real-Time Doubt Solving Platform) is an interactive real-time doubt solving platform designed to assist students with their academic queries. **

**Deploy Link** (Both are backend deploy link)
- cyclic deploy link-> https://outstanding-pleat-calf.cyclic.app/
- Render deploy link-> https://varthaktech.onrender.com/
  
**Tech Stacks Used**

<p align = "center">
<img src="https://user-images.githubusercontent.com/25181517/117447155-6a868a00-af3d-11eb-9cfe-245df15c9f3f.png" alt="js" width="50" height="50"/>
<img src="https://raw.githubusercontent.com/PrinceCorwin/Useful-tech-icons/main/images/nodejs.png" alt="nodejs" width="50" height="50"/>
<img src="https://res.cloudinary.com/kc-cloud/images/f_auto,q_auto/v1651772163/expressjslogo/expressjslogo.webp?_i=AA" alt="express" width="50" height="50"/>
 <img src="https://raw.githubusercontent.com/PrinceCorwin/Useful-tech-icons/main/images/mongodb-leaf.png" alt="mongo" width="50" height="50"/> 
<img src="https://user-images.githubusercontent.com/25181517/121401671-49102800-c959-11eb-9f6f-74d49a5e1774.png" alt="npm" width="50" height="50"/>
  
</p>
<hr>

## Run Locally
### Clone this Project

```
https://github.com/Prags1709/Attryb-assignment.git
```

### Install npm Packages

```javascript
npm i
```

### Run Server
```javascript
node index.js (or) npm run server
```
### Runs the project in the development mode

http://localhost:4500

## API end points

| METHOD | ENDPOINT | DESCRIPTION | STATUS CODE |
| --- | --- | --- | --- |
| POST | /revly/user/register | This endpoint allow users to register. | 201 |
| POST | /revly/user/login | This endpoint allow users to login. If the use type is "tutor" this data will add tutorAvailable collection| 201 |
| POST | /revly/createDoubt/ | This endpoint allow users to create a new Doubt question| 201 |
| GET | /revly/allDoubt/ | This endpoint return the details of all the doubt. This will show decending order based on created time (newly added data will show on top) | 200 |
| GET | /revly/allTutor/ | This endpoint return the details of all the Tutor | 200 |

### Sample register input Schema
```javascript
{
  "name": "pragathees",
  "email": "prags@gmail.com",
  "password": "prags@123",
  "userType":"student" (or) "tutor",
  "gradr": 12,
  "language" :"english",
  "subjects" : ["math","science],
  "phoneNumber": 8677576756
}
```

### Sample login input Schema
```javascript
{
  "email": "prags@gmail.com",
  "password": "prags@123"
}
```
