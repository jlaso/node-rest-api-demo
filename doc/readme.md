## example of calls

### CREATE USER
curl -X POST -H "Content-Type: application/json" -d '{"username":"admin","password":"admin","email":"admin@admin.com", "usertype":"admin"}' http://localhost:3000/api/users

### GET USERS
curl -X GET -H "Cache-Control: no-cache" -H "Postman-Token: f1cb81bc-4d80-2d5a-de29-86582ae1f3af" "http://localhost:3000/api/users"

### DELETE USER
curl -X DELETE -H "Cache-Control: no-cache" -H "Postman-Token: 6a5f042f-6ec1-227f-0493-f1b908457a03" "http://localhost:3000/api/users/576564e26367c7af12000001"

