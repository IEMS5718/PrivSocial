import webapp2
import json
from datetime import date
from google.appengine.ext import ndb
    
class Form(ndb.Model):
    keyWord=ndb.StringProperty()
    userName=ndb.StringProperty()
    initAct=ndb.StringProperty()
    recomAct=ndb.StringProperty()
    recomDate=ndb.IntegerProperty()
    groupContent=ndb.StringProperty()
    
def saveForm(self):
    recomDate=int(self.request.get('recomDate'))
    keyWord=self.request.get('keyWord')
    userName=self.request.get('userName')
    initAct=int(self.request.get('initAct'))
    recomAct=self.request.get('recomAct')
    form=Form(key=ndb.Key(Form,email),recomDate=recomDate,userName=userName,keyWord=keyWord,initAct=initAct,recomAct=recomAct)
    form.put()

def saveUsername(self):
    userName=self.request.get('userName') 
    query=Form.query(ancestor=ndb.Key(Form,userName))
    res=query.fetch()
    if len(res):
        res=res[0]
        data={}
        data['flag']='0'
        data['initAct']=res.initAct
        data['recomAct']=res.recomAct
        data['recomDate']=res.recomDate
        data['groupContent']=res.groupContent
        jsonobj=json.dumps(data)
        self.response.write(jsonobj)
    else:
        data={}
        data['flag']='1'
        jsonobj=json.dumps(data)
        self.response.write(jsonobj)
        
class EmailHandle(webapp2.RequestHandler):
    def post(self):
        saveUsername(self)

class UserHandle(webapp2.RequestHandler):
    def post(self):
        saveForm(self)

app = webapp2.WSGIApplication([
  #('/MainPage', MainPage),
  ('/emailapi',EmailHandle),
  ('/userapi',UserHandle)
])
    
    
