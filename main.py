import webapp2
import json
from gaesessions import get_current_session
from datetime import date
from google.appengine.ext import ndb
from google.appengine.ext.webapp.util import run_wsgi_app

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
            session = get_current_session()
            session['email'] = email
            session['userID'] = first 
            session.save(False)
            self.redirect('/index.html')   
    else:
        data={}
        data['flag']='0'
        data['message']='Register Fail! The password isnot same.'
        jsonobj=json.dumps(data)
        self.response.write(jsonobj)    
        
def login(self):
    email = self.request.get('email')
    password = self.request.get('password')
    query = Profile.query(ancestor=ndb.Key(Profile, email))
    res = query.fetch()
    if len(res):
        res=res[0]
        passwordOld=res.Password
        if passwordOld == password:
            session = get_current_session()
            session['email'] = email
            session['userID'] = res.UserID  
            session.save(False)     
            self.redirect('/index.html')
        else:     
            data={}
            data['flag']='0'
            data['message']='Password input error'
            jsonobj=json.dumps(data)
            self.response.write(jsonobj)
    else:
        data={}
        data['flag']='0'
        data['message']='username doesnot exist'
        jsonobj=json.dumps(data)
        self.response.write(jsonobj)
        
def getUserInfo(self):
    session = get_current_session()
    email=session.get("email")
    query = Profile.query(ancestor=ndb.Key(Profile, email))
    res = query.fetch()
    if len(res):
        re=res[0]
        data={}
        data['flag']='1'
        data['UserID']=re.UserID
        data['Email']=re.Email
        data['Tel']=re.Tel
        data['NickName']=re.NickName
        data['UserImagePath']=re.UserImagePath
        data['Invitable']=re.Invitable
        data['FriendCount']=re.FriendCount
        data['Gender']=re.Gender
        data['UnReadInvitCount']=re.UnReadInvitCount
        data['ReadInvitCount']=re.ReadInvitCount
        data['IgnoreInvitCount']=re.IgnoreInvitCount
        data['Signature']=re.Signature       
        jsonobj=json.dumps(data)
        self.response.write(jsonobj)
    else:
        data['flag']='0'
        data['message']="no user info"
                      
class RegisterHandle(webapp2.RequestHandler):
    def get(self):
        register(self)
        
class LoginHandle(webapp2.RequestHandler):
    def get(self):
        login(self)
        
class UserHandle(webapp2.RequestHandler):
    def post(self):
        getUserInfo(self)
        
app = webapp2.WSGIApplication([
  ('/register', RegisterHandle),
  ('/login', LoginHandle),
  ('/userapi', UserHandle)
])
    
    
