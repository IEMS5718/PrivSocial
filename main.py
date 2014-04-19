import webapp2
import json
from datetime import date
from google.appengine.ext import ndb

class Profile(ndb.Model):
    UserID = ndb.IntegerProperty()
    Email = ndb.StringProperty()
    Password = ndb.StringProperty()
    NickName = ndb.StringProperty()
    Gender = ndb.StringProperty()
    UserImagePath = ndb.StringProperty()
    Invitable = ndb.IntegerProperty()
    FriendCount = ndb.IntegerProperty()
    InvitationCount = ndb.IntegerProperty()
    UnReadInvitCount = ndb.IntegerProperty()
    ReadInvitCount = ndb.IntegerProperty()
    IgnoreInvitCount = ndb.IntegerProperty()
    Signature = ndb.StringProperty()
    Tel = ndb.StringProperty()
    
class Activity(ndb.Model):
    UserID = ndb.IntegerProperty()
    ActFlag = ndb.IntegerProperty()
    InviterID = ndb.IntegerProperty()
    ActTime = ndb.DateTimeProperty() 
    Place = ndb.StringProperty()
    ActContent = ndb.StringProperty()
    
class Mail(ndb.Model):
    UserID = ndb.IntegerProperty()
    MailFlag = ndb.IntegerProperty()
    PosterID = ndb.IntegerProperty()
    PostTime = ndb.DateTimeProperty()
    MailContent = ndb.StringProperty()

def register(self):
    email = self.request.get('email')
    nickname = self.request.get('nickname')
    firstpassword = self.request.get('firstpassword')
    repassword = self.request.get('repassword')
    tel = self.request.get('tel')
    if firstpassword == repassword:
        query = Profile.query(ancestor=ndb.Key(Profile, email))
        res = query.fetch()
        if len(res):
            data={}
            data['flag']='0'
            data['message']='Register Fail! The Email has already registered.'
            jsonobj=json.dumps(data)
            self.response.write(jsonobj)
        else:
            first, last = Profile.allocate_ids(1)
            profile = Profile(key=ndb.Key(Profile, email), UserID=first, NickName=nickname, Password=firstpassword, Tel=tel)
            profile.put()    
    else:
        data={}
        data['flag']='0'
        data['message']='Register Fail! The password isnot same.'
        jsonobj=json.dumps(data)
        self.response.write(jsonobj)    
        
class RegisterHandle(webapp2.RequestHandler):
    def get(self):
        register(self)
        
app = webapp2.WSGIApplication([
  ('/register', RegisterHandle)
 # ('/emailapi', EmailHandle),
  #('/userapi', UserHandle)
])
    
    
