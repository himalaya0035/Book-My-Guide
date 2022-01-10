# Book-My-Guide
Book My Guide is a platform that helps people working in the tourism industry digitalize their services and along with that, it also safeguards a consumer's right to fair price and good service.

At first, we are starting by digitalizing the service of tour guides and soon we will expand our reach to more people working in the tourism industry.

# View Video Demo Here
[Watch Book My Guide Video Demo](https://www.youtube.com/watch?v=x_R2SbrJFng)

## To Run our app follow these steps :
1) Clone this repo : make sure you have docker installed in your Pc. if not installed already install it from here https://www.docker.com/get-started
2) Open this repo in terminal of your choice, run these following commands
3) "cd client\bmtg\"
4) "npm i"
5) "npm start"
6) Open another terminal and run these following commands in the newly opened terminal
7) "docker-compose -d --build"
8) "docker-compose exec web python manage.py makemigrations --noinput"
9) "docker-compose exec web python manage.py migrate --noinput"
10) "docker-compose exec web python manage.py seed_days --noinput"
11) "docker-compose exec web python manage.py seed_tags_names --noinput"

After succesfull completion of all the commands you can acess the client app on http://localhost:3000/

#### Note : You need to follow the above steps only once i.e in the initial boot up of application, after that you can access the app anytime by running only a single command "docker compose up"

## Screenshots
![image](https://user-images.githubusercontent.com/61822515/148826050-e664e090-ea66-4ed9-9027-dd72af784c53.png)
![image](https://user-images.githubusercontent.com/61822515/148826063-0ef16141-b7ac-43b0-b4ef-8dcc07439143.png)
![image](https://user-images.githubusercontent.com/61822515/148826102-841fd6f5-4677-484f-806c-1ca1beb6e1cd.png)
![image](https://user-images.githubusercontent.com/61822515/148826080-5e542a0a-1c27-482f-b770-fceb1d2a8575.png)
![image](https://user-images.githubusercontent.com/61822515/148826127-5a8ee4cc-d877-4def-972e-2f4325b74fb7.png)
![image](https://user-images.githubusercontent.com/61822515/148826146-cece9ddf-0d89-44af-9d49-2df61e6bbfb1.png)
![image](https://user-images.githubusercontent.com/61822515/148826162-9e9f561a-4f69-423e-8d66-f1c84363fee1.png)
![image](https://user-images.githubusercontent.com/61822515/148826183-97ad4f96-b193-4382-a70e-ad05111e72b3.png)
![image](https://user-images.githubusercontent.com/61822515/148826203-b78455c8-4e38-4c25-8c60-3c3e5c02a5ff.png)
![image](https://user-images.githubusercontent.com/61822515/148826216-7ef7784b-ce9c-4e88-b1a5-ce02614d9d57.png)
![image](https://user-images.githubusercontent.com/61822515/148826228-e683c453-6ad9-44fc-a8a6-fe2e08040447.png)


# View Video Demo Here
[Watch Book My Guide Video Demo](https://www.youtube.com/watch?v=x_R2SbrJFng)
