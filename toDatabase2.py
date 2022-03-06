import pyrebase
from scraper import *
import requests
import json
import time
from bs4 import BeautifulSoup

firebaseConfig={ "apiKey": "AIzaSyB7cIg6pBtQAmtVj1tnnsyZTui08o_wzVY",
    "authDomain": "temp-9759f.firebaseapp.com",
    "databaseURL": "https://temp-9759f-default-rtdb.firebaseio.com",
    "projectId": "temp-9759f",
    "storageBucket": "temp-9759f.appspot.com",
    "serviceAccount": "temp-9759f-firebase-adminsdk-3on7p-3b5bfb945c.json"}

firebase = pyrebase.initialize_app(firebaseConfig)

db = firebase.database()

schoolid = 4767

i = input() #input number between 1-362

query = "http://www.ratemyprofessors.com/filter/professor/?department=&institution=California+State+University%2C+Northridge&page="+str(i)+"&filter=teacherlastname_sort_s+asc&query=%3A&queryoption=TEACHER&queryBy=schoolId&sid=4767"
page = requests.get(query)
soup = BeautifulSoup(page.text, "html.parser")
txt = ""
txt = soup.get_text()
tid = 0
tids = []

j = 0

while j < len(txt):
    if(txt[j:j+3] == "tid"):
        tid = txt[j+5:j+12]
        tids.append(tid)
    j = j + 1

j = 0
while j < len(tids):
    if(tids[j].endswith(",") == True):
        tids[j] = tids[j][0:len(tids[j])-1]
    tids[j] = int(tids[j])
    j = j + 1

#print(tids)
for x in tids:
    dia = scrap(x)
    data = {"Rating": dia.getSco(), "Difficulty": dia.getDif(), "Subject": dia.getSub}
    db.child(dia.getNam()).set(data) #uploads scraped data to firebase