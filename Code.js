function CheckEmail(){
  var inbox = GetEmail(GetThreads('inbox'), 'inbox');
  Logger.log(inbox);
  var sent = GetEmail(GetThreads('sent'), 'sent');
}


/**
 * @param {GmailApp.GmailThread[]} thread
 * @param {String} type 'inbox' or 'sent'
 */
function GetEmail(thread, type){
  var result = []
  if(type == 'inbox'){
    for(var i = 0; i<thread.length; i++){
      var email = FormatEmail(thread[i].getMessages()[0].getFrom());
      var date = thread[i].getMessages()[0].getDate();
      var entry = [email,date];
      result.push(entry);
    }
  } else if(type == 'sent'){
    for(var i = 0; i < thread.length; i++){
      var email = FormatEmail(thread[i].getMessages()[0].getTo());
      var date = thread[i].getMessages()[0].getDate();
      var entry = [email,date];
      result.push(entry);
    }
  }
  return result; 
}

/**
 * Take an email and return it as abcd@email.com
 * @param {String} email
 */
function FormatEmail(email){
  if(email.split('<').length > 1){
    return email.split('<')[1].slice(0,-1);
  } else{
    return email;
  }
}


function GetDate(){

}


/**
 * This will get threads from either your inbox or what you have sent.
 * @param {string} type 'inbox' or 'sent'
 * @returns {GmailApp.GmailThread[]} will return the last 50 threads
 */
function GetThreads(type){
  if(type == 'inbox'){
    var results = GmailApp.getInboxThreads(0,50);
    return results;
  } else if(type == 'sent'){
    var results = GmailApp.search('in:sent',0,50);
    return results;
  } else{
    Logger.log('GetThreads: Incorrect Type');
  }
}