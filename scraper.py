import time
import requests
from bs4 import BeautifulSoup

class scrap:
    def __init__(self, i, nam = "", sco = 0, dif = 0):
        id = i
        url = 'https://www.ratemyprofessors.com/ShowRatings.jsp?tid=' + str(i)
        #nam = ""
        #sco = 0
        #dif = 0
    
        page = requests.get(url)

        soup = BeautifulSoup(page.text, "html.parser")

        profscore = soup.findAll("div", {"class": "RatingValue__Numerator-qw8sqy-2 liyUjw" })
        profname = soup.findAll("div", {"class": "NameTitle__Name-dowf0z-0 cfjPUG"})
        profdifficult = soup.findAll("div", {"class": "FeedbackItem__FeedbackNumber-uof32n-1 kkESWs"})

        for mytag in profname:
            print(mytag.get_text())
            self.nam = mytag.get_text()

        #time.sleep(5)

        for mytag in profscore:
            #print(mytag.get_text())
            self.sco = mytag.get_text()

        #time.sleep(5)

        for mytag in profdifficult:
            #print(mytag.get_text())
            self.dif = mytag.get_text()

        for mytag in 
    
    def getNam(self):
        return self.nam
    def getSco(self):
        return self.sco
    def getDif(self):
        return self.dif

#scrap(1433095) #test code