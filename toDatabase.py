import pyrebase
from scraper import *

firebaseConfig={ "apiKey": "AIzaSyB7cIg6pBtQAmtVj1tnnsyZTui08o_wzVY",
  "authDomain": "temp-9759f.firebaseapp.com",
  "databaseURL": "https://temp-9759f-default-rtdb.firebaseio.com",
  "projectId": "temp-9759f",
  "storageBucket": "temp-9759f.appspot.com",
  "serviceAccount": "temp-9759f-firebase-adminsdk-3on7p-3b5bfb945c.json"}

firebase = pyrebase.initialize_app(firebaseConfig)

db=firebase.database()

num = 1433095 #Indicates the web ID for ratemyprofessors (needs to be changed for every professor)

dic = scrap(num) #calls the scraper



data = {"Rating": dic.getSco(), "Difficulty": dic.getDif()}
db.child(dic.getNam()).set(data) #uploads scraped data to firebase

# Database needs to be periodically updated
# When to update the database? How to update database?