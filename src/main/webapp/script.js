// Copyright 2020 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/*****************************************************
 *  FEED FUNCTION                                    *
 *****************************************************/

var username = "";
var typeFeed = "";

/*
Function: addFeed()
Adapts the feed to the username whether is a mentor or mentee to show the right information
*/
function addFeed() {
    validateURLParam();
    
    if(typeFeed == "mentor"){
        loadMenteeData(username, "feed");
    }

    if(typeFeed == "mentee"){
        loadMentorData(username, "feed");
    }
}

/*****************************************************
 *  PROFILE FUNCTION                                 *
 *****************************************************/

/*
Function: addProfile()
Adapts the profile info to the username
*/
function addProfile() {
    validateURLParam();

    if(typeFeed == "mentor"){
        loadMentorData(username, "profile");
    }

    if(typeFeed == "mentee"){
        loadMenteeData(username, "profile");
    }
}

/*****************************************************
 *  LOAD DATA FUNCTIONS                              *
 *****************************************************/

/*
Function: loadMentorData()
Calls the server for the mentors' info and calls the function addMentorCard for every mentor
*/
function loadMentorData(username, type) {
    var count = 0;
    fetch('/info-mentor').then(response => response.json()).then((mentorsList) => {
        if(type == "feed"){
            mentorsList.forEach((myMentor) => {
                addMentorCard(myMentor, count, "feed")
                count = count + 1;
            })
        }

        if(type == "profile"){
            mentorsList.forEach((myMentor) => {
                if(username == myMentor.username){
                    addMentorCard(myMentor, 0, "profile");
                }
            })
        }
    });
}

/*
Function: loadMenteeData()
Calls the server for the mentees' info and calls the function addMenteeCard for every mentee
*/
function loadMenteeData(username, type) {
    var count = 0;
    fetch('/info-mentee').then(response => response.json()).then((menteesList) => {
        if(type == "feed"){
            menteesList.forEach((myMentee) => {
                addMenteeCard(myMentee, count, "feed");
                count = count + 1;
            })
        }

        if(type == "profile"){
            menteesList.forEach((myMentee) => {
                if(username == myMentee.username){
                    addMenteeCard(myMentee, 0, "profile");
                }
            })
        }
    });
}

/*****************************************************
 *  CARD FUNCTIONS                                   *
 *****************************************************/

/*
Function: addMentorCard()
Add a Mentor card to the content div
*/
function addMentorCard(myMentor, count, type){
    var tag = document.createElement('div');

    var commonInfo = '<div class="card">' + 
        '<div id="card-img"><img src="images/img1.png"></img></div>' + 
        '<div id="card-nameholder"><h3>' + myMentor.name + '</h3></div>';

    if(type == "feed"){
        tag.innerHTML = commonInfo + '<div id="card-seemore-button">' + 
            '<button type="button" class="btn btn-info" data-toggle="collapse" data-target="#more-info' + count + '">See more</button>' + 
        '</div>' + 
        '<div id="more-info' + count + '" class="collapse" style="padding: 2px 120px;">' + 
            '<strong>E-mail: </strong><p>' + myMentor.email + '</p>' + 
            '<strong>College: </strong><p>' + myMentor.college + '</p>' + 
            '<strong>Job: </strong><p>' + myMentor.role + '</p>' + 
            '<strong>About me: </strong><p>' + myMentor.intro + '</p>' + 
            '<strong>Area of expertise: </strong><p>' + myMentor.expert + '</p>' + 
        '</div>' + '</div>';
    }
    else if (type == "profile"){
        tag.innerHTML = commonInfo + '<div id="more-info" style="padding: 2px 120px;">' + 
            '<strong>Username: </strong><p>' + myMentor.username + '</p>' + 
            '<strong>E-mail: </strong><p>' + myMentor.email + '</p>' + 
            '<strong>College: </strong><p>' + myMentor.college + '</p>' + 
            '<strong>Job: </strong><p>' + myMentor.role + '</p>' + 
            '<strong>About me: </strong><p>' + myMentor.intro + '</p>' + 
            '<strong>Area of expertise: </strong><p>' + myMentor.expert + '</p>' + 
        '</div>' + '</div>';
    }

    var element = document.getElementById("content");
    element.appendChild(tag);
}

/*
Function: addMenteeCard()
Add a Mentee card to the content div
*/
function addMenteeCard(myMentee, count, type) {
    var tag = document.createElement('div');
    
    var commonInfo = '<div class="card">' + '<div id="card-img"><img src="images/img1.png"></img></div>' + 
        '<div id="card-nameholder"><h3>' + myMentee.name + '</h3></div>';
        
    if(type == "feed"){
        tag.innerHTML = commonInfo + '<div id="card-seemore-button">' + 
            '<button type="button" class="btn btn-info" data-toggle="collapse" data-target="#more-info' + count + '">See more</button>' + 
        '</div>' + 
        '<div id="more-info' + count + '" class="collapse" style="padding: 2px 120px;">' + 
            '<strong>E-mail: </strong><p>' + myMentee.email + '</p>' + 
            '<strong>School: </strong><p>' + myMentee.school + '</p>' + 
            '<strong>Class Standing: </strong><p>' + myMentee.year + '</p>' + 
            '<strong>About me: </strong><p>' + myMentee.intro + '</p>' + 
            '<strong>My objectives: </strong><p>' + myMentee.reason + '</p>' + 
            '<strong>Skills Needed: </strong><p>' + myMentee.desiredSkills + '</p>' + 
        '</div>' + '</div>';
    }
    else if(type == "profile"){
        tag.innerHTML = commonInfo + '<div id="more-info" style="padding: 2px 120px;">' + 
            '<strong>Username: </strong><p>' + myMentee.username + '</p>' + 
            '<strong>E-mail: </strong><p>' + myMentee.email + '</p>' + 
            '<strong>School: </strong><p>' + myMentee.school + '</p>' + 
            '<strong>Class Standing: </strong><p>' + myMentee.year + '</p>' + 
            '<strong>About me: </strong><p>' + myMentee.intro + '</p>' + 
            '<strong>My objectives: </strong><p>' + myMentee.reason + '</p>' + 
            '<strong>Skills Needed: </strong><p>' + myMentee.desiredSkills + '</p>' + 
        '</div>' + '</div>';
    }
    
    var element = document.getElementById("content");
    element.appendChild(tag);
}

/*****************************************************
 *  VALIDATION FUNCTIONS                             *
 *****************************************************/

/*
Function: validateURLParam()
Gets the username parameter from the URL
*/
function validateURLParam(){
    var url_string = window.location.href;
    var url = new URL(url_string);
    username = url.searchParams.get("username");
    typeFeed = url.searchParams.get("type");
}

/*
Function: validURL()
Returns the valid URL depeding on the requested page and if there is a username or not
*/
function validURL(redirectPage){
    validateURLParam();
    if(username!=null){
        //when we have a username logged in
        switch(redirectPage){
            case "homepage":

                window.location.href = ("index.html?username="+username+"&type="+typeFeed);

                var tag = document.createElement('div');
                tag.className = "menuHome";
                var Info = '<ul>'+ 
				'<li class="current_page_item"><a href=index.html?username='+username+'&type='+typeFeed+'>Homepage</a></li>' + 
                '<li><a href=matchingPage.html?username='+username+'&type='+typeFeed+'>Feed</a></li>' + 
                '<li><a href=profile.html?username='+username+'&type='+typeFeed+'>Profile</a></li>' + 
                '</ul>';
                tag.innerHTML = Info;
                var element = document.getElementById("menu");
                element.appendChild(tag);
                
                break;
            
            case "feed":
                window.location.href = ("matchingPage.html?username="+username+"&type="+typeFeed);
                break;
            
            case "profile":
                window.location.href = ("profile.html?username="+username+"&type="+typeFeed);
                break;

            case "logout":
                window.location.href = ("index.html");
                break;
            
            default:
                var tag = document.createElement('div');
                tag.className = "menuHome";
                var Info = '<ul>'+ 
				'<li class="current_page_item"><a href=index.html?username='+username+'&type='+typeFeed+'>Homepage</a></li>' + 
                '<li><a href=matchingPage.html?username='+username+'&type='+typeFeed+'>Feed</a></li>' + 
                '<li><a href=profile.html?username='+username+'&type='+typeFeed+'>Profile</a></li>' + 
                '<li><a href=index.html?>LogOut</a></li>' + 
                '</ul>';
                tag.innerHTML = Info;
                var element = document.getElementById("menu");
                element.appendChild(tag);
        }
    }
    else{
        //when we don't have a user logged in
        switch(redirectPage){
            case 'homepage':

                window.location.href = ("index.html");

                var tag = document.createElement('div');
                tag.className = "menuHome";
                var Info = '<ul>'+ 
                '<li class="current_page_item"><a href=("index.html)>Homepage</a></li>' + 
                '<li><a href="mentor.html">Become a mentor</a></li>' + 
                '<li><a href="mentee-sign-up.html">Become a mentee</a></li>' + 
                '<li><a href="logInPage.html">Log In</a></li>' + 
                '</ul>';
                tag.innerHTML = Info;
                var element = document.getElementById("menu");
                element.appendChild(tag);

                break;
            
            case 'mentee':
                window.location.href = ("mentee-sign-up.html");
                break;

            case 'mentor':
                window.location.href = ("mentor.html");
                break;
            
            case 'login':
                window.location.href = ("logInPage.html");
                break;

            default:
                var tag = document.createElement('div');
                tag.className = "menuHome";
                var Info = '<ul>'+ 
                '<li class="current_page_item"><a href="index.html">Homepage</a></li>' + 
                '<li><a href="mentor.html">Become a mentor</a></li>' + 
                '<li><a href="mentee-sign-up.html">Become a mentee</a></li>' + 
                '<li><a href="logInPage.html">Log In</a></li>' + 
                '</ul>';
                tag.innerHTML = Info;
                var element = document.getElementById("menu");
                element.appendChild(tag);
                break;
        }
    }
}