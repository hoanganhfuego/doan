# README #

@BMTraining Demo:
[BMTraining](http://14.225.7.151:5000/)

Writen by @MINHHQ1 (Hoang Quang Minh - Back-end + Call API) and @BACHTX (Tran Xuan Bach - Front-end)

## Requirements ##
* NodeJS
* Maven 3.3.x
* Java 1.8

## To run the front-end in development mode ##
```
npm install
npm start
```

## To run the front-end in production mode ##
```
npm run build
npm install -g serve (if serve are not downloaded)
serve -s build
```

## To run the back-end ##
### By IntelliJ IDEA ( recommend ) ###
#### In development mode ####
```
Open IntelliJ IDEA and waiting for the IDE to download optional module
After finish downloading, click Run
```
#### In production mode ####
```
Open IntelliJ IDEA and waiting for the IDE to download optional module
Open terminal in IntelliJ IDEA, (ensure that the terminal is in the project folder)
Run 'mvn install' or 'mvn install -Dmaven.test.skip=true'
Go to /target folder and run 'java -jar <JAR file name which build from previos step>'
```
### By Terminal ###
#### In development mode ####
```
Open terminal (ensure that the terminal is in the project folder)
mvn spring-boot:run
```
#### In production mode ####
```
Open terminal (ensure that the terminal is in the project folder)
Run 'mvn install' or 'mvn install -Dmaven.test.skip=true'
Go to /target folder and run 'java -jar <JAR file name which build from previos step>'
```
#### Add VM options ####
```
-Djasypt.encryptor.password=bmtraining
```
#### Admin Page Pass ####
```
username/pass : admin/adminok
```


