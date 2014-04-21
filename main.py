import webapp2
import time
import json
import datetime
from gaesessions import get_current_session
from datetime import datetime
from google.appengine.ext import ndb
from google.appengine.ext.webapp.util import run_wsgi_app
from datetime import datetime

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
    ActivityID = ndb.IntegerProperty()
    
class Mail(ndb.Model):
    UserID = ndb.IntegerProperty()
    MailFlag = ndb.IntegerProperty()
    PosterID = ndb.IntegerProperty()
    PostTime = ndb.DateTimeProperty()
    MailContent = ndb.StringProperty()
    MailID = ndb.IntegerProperty()

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
            profile = Profile(key=ndb.Key(Profile, email), UserID=first, NickName=nickname, Password=firstpassword, Tel=tel, Invitable=1, Email=email)
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
        activitylist=[]
        queryAct = Activity.query(Activity.UserID == re.UserID)
        resAct = queryAct.fetch()
        for activity in resAct:
            activityData={}
            activityData['ActivityID']=activity.ActivityID
            activityData['UserID']=activity.UserID
            activityData['ActFlag']=activity.ActFlag 
            activityData['InviterID']=activity.InviterID 
            activityData['ActTime']=activity.ActTime.strftime('%b-%d-%y %H:%M:%S') 
            activityData['Place']=activity.Place 
            activityData['ActContent']=activity.UserID     
            activitylist.append(activityData)
        data['activities']=activitylist
        jsonobj=json.dumps(data)
        self.response.write(jsonobj)
    else:
        data['flag']='0'
        data['message']="no user info"
        jsonobj=json.dumps(data)
        self.response.write(jsonobj)
        
def postact(self):
    inventname = self.request.get('inventname')
    inventdate = self.request.get('inventdate')
    inventtime = self.request.get('inventtime')
    inventcontent = self.request.get('inventcontent')
    participants = self.request.get('participants')
    participantlist = participants.split(";")
    for participant in participantlist:
        query = Profile.query(ancestor=ndb.Key(Profile, participant))
        res = query.fetch()
        if len(res):
            if res[0].Invitable==1:
                first, last = Profile.allocate_ids(1)
                session = get_current_session()
                userID=session.get("userID")
                inviterID=res[0].UserID
                a=inventdate+' '+inventtime+':00'
                format = '%Y-%m-%d %H:%M:%S'
                x=datetime.strptime(a, format)
                activity = Activity(key=ndb.Key(Activity, first), UserID=userID, ActivityID=first, ActFlag=0, InviterID=inviterID, ActTime=x, ActContent=inventcontent)
                activity.put()        
        else:
             data={}
             data['flag']='0'
             data['message']="no exist user"
             jsonobj=json.dumps(data)
             self.response.write(jsonobj)
             
def changeact(self):
    ActivityID = int(self.request.get('ActivityID'))
    Actflag = int(self.request.get('Actflag'))
    queryAct = Activity.query(Activity.ActivityID == ActivityID)
    resAct = queryAct.fetch()
    if len(resAct):
        res=resAct[0]
        res.ActFlag=Actflag
        res.put()
        data={}
        data['flag']='1'
        data['message']="succeeeful"
        jsonobj=json.dumps(data)
        self.response.write(jsonobj)
    else:
        data={}
        data['flag']='0'
        data['message']="act not exist"
        jsonobj=json.dumps(data)
        self.response.write(jsonobj)
        
def negotiate(self):
    receiver = self.request.get('receiver')
    msgcontent = self.request.get('msgcontent')
    session = get_current_session()
    PosterID=session.get('userID')
    queryAct = Profile.query(Profile.Email == receiver)
    resAct = queryAct.fetch()
    if len(resAct):
        userID=resAct[0].UserID
        first, last = Profile.allocate_ids(1)
        mail = Mail(key=ndb.Key(Mail, first), UserID=userID, MailFlag=0, PosterID=PosterID, PostTime=datetime.now(), MailContent=msgcontent, MailID=first)
        mail.put()
        data={}
        data['flag']='1'
        data['message']="send successful"
        jsonobj=json.dumps(data)
        self.response.write(jsonobj)      
    else:
        data={}
        data['flag']='0'
        data['message']="no sender exist"
        jsonobj=json.dumps(data)
        self.response.write(jsonobj)
                
class RegisterHandle(webapp2.RequestHandler):
    def get(self):
        register(self)
        
class LoginHandle(webapp2.RequestHandler):
    def get(self):
        login(self)
        
class UserHandle(webapp2.RequestHandler):
    def post(self):
        getUserInfo(self)
        
class PostactHandle(webapp2.RequestHandler):
    def post(self):
        postact(self)
        
class ChangeActHandle(webapp2.RequestHandler):
    def post(self):
        changeact(self)
        
class NegotiateHandle(webapp2.RequestHandler):
    def post(self):
        negotiate(self)
        
app = webapp2.WSGIApplication([
  ('/register', RegisterHandle),
  ('/login', LoginHandle),
  ('/userapi', UserHandle),
  ('/postact',PostactHandle),
  ('/changeact', ChangeActHandle),
  ('/negotiate',NegotiateHandle),
])
    
    
