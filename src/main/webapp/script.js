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

function dummyDBMentee(name, email, username, school, classStanding, intro, reason, desiredSkills) {
    this.name = name;
    this.email = email;
    this.username = username;
    this.school = school;
    this.classStanding = classStanding;
    this.intro  = intro;
    this.reason = reason;
    this.desiredSkills = desiredSkills;
}

function dummyDBMentor(name, email, username, job, college, intro, expertise) {
    this.name = name;
    this.email = email;
    this.username = username;
    this.job = job;
    this.college = college;
    this.intro  = intro;
    this.expertise = expertise;
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
            '<strong>Class Standing: </strong><p>' + myMentee.classStanding + '</p>' + 
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
            '<strong>Class Standing: </strong><p>' + myMentee.classStanding + '</p>' + 
            '<strong>About me: </strong><p>' + myMentee.intro + '</p>' + 
            '<strong>My objectives: </strong><p>' + myMentee.reason + '</p>' + 
            '<strong>Skills Needed: </strong><p>' + myMentee.desiredSkills + '</p>' + 
        '</div>' + '</div>';
    }
    
    var element = document.getElementById("content");
    element.appendChild(tag);
}

/*
Function: addMentorCard()
Add a Mentor card to the content div
*/
function addMentorCard(myMentor, count, type) {
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
            '<strong>Job: </strong><p>' + myMentor.job + '</p>' + 
            '<strong>About me: </strong><p>' + myMentor.intro + '</p>' + 
            '<strong>Area of expertise: </strong><p>' + myMentor.expertise + '</p>' + 
        '</div>' + '</div>';
    }
    else if (type == "profile"){
        tag.innerHTML = commonInfo + '<div id="more-info" style="padding: 2px 120px;">' + 
            '<strong>Username: </strong><p>' + myMentor.username + '</p>' + 
            '<strong>E-mail: </strong><p>' + myMentor.email + '</p>' + 
            '<strong>College: </strong><p>' + myMentor.college + '</p>' + 
            '<strong>Job: </strong><p>' + myMentor.job + '</p>' + 
            '<strong>About me: </strong><p>' + myMentor.intro + '</p>' + 
            '<strong>Area of expertise: </strong><p>' + myMentor.expertise + '</p>' + 
        '</div>' + '</div>';
    }
    
    var element = document.getElementById("content");
    element.appendChild(tag);
}

/*
Function: addTableCards()
Adapts the feed to the username whether is a mentor or mentee to show the right information
    
Notes:
    Up until now works in a local way with structs containing dummy info 
    Next step is to adapt it to work with datastorage
*/
function addTableCards() {
    var username = validateUsername();

    var myMentees = [
        new dummyDBMentee('John S', 'john@myemail.com', 'john123', 'mySchool', 2021, "I'm a student", "I like to learn", "C++"),
        new dummyDBMentee('Mary S', 'mary@myemail.com', 'mary123', 'mySchool', 2022, "I'm a student", "I like to learn", "Java"),
        new dummyDBMentee('Nick S', 'nick@myemail.com', 'nick123', 'mySchool', 2024, "I'm a student", "I like to learn", "Go")
    ];

    var myMentors = [
        new dummyDBMentor('John T', 'john@myemail.com', 'john124', 'Senior Software Engineer', 'MyCollege', "I'm a software engineer", "JavaScript"),
        new dummyDBMentor('Mary T', 'mary@myemail.com', 'mary124', 'UX Designer', 'MyCollege', "I'm a UX specialist", "Accesibility")
    ];

    //Having a mentor username, showing list of mentees
    for(var i=0; i<myMentors.length; i++){
        if(username == myMentors[i].username){
            for(var j=0; j<myMentees.length; j++){
                addMenteeCard(myMentees[j], j, "feed");
            }
            break;
        }
    }

    //Having a mentee username, showing list of mentors
    for(var i=0; i<myMentees.length; i++){
        if(username == myMentees[i].username){
            for(var j=0; j<myMentors.length; j++){
                addMentorCard(myMentors[j], j, "feed");
            }
            break;
        }
    }
}

/*
Function: addProfile()
Adapts the profile info to the username
    
Notes:
    Up until now works in a local way with structs containing dummy info 
    Next step is to adapt it to work with datastorage
*/
function addProfile() {

    var username = validateUsername();

    var myMentees = [
        new dummyDBMentee('John S', 'john@myemail.com', 'john123', 'mySchool', 2021, "I'm a student", "I like to learn", "C++"),
        new dummyDBMentee('Mary S', 'mary@myemail.com', 'mary123', 'mySchool', 2022, "I'm a student", "I like to learn", "Java"),
        new dummyDBMentee('Nick S', 'nick@myemail.com', 'nick123', 'mySchool', 2024, "I'm a student", "I like to learn", "Go")
    ];

    var myMentors = [
        new dummyDBMentor('John T', 'john@myemail.com', 'john124', 'Senior Software Engineer', 'MyCollege', "I'm a software engineer", "JavaScript"),
        new dummyDBMentor('Mary T', 'mary@myemail.com', 'mary124', 'UX Designer', 'MyCollege', "I'm a UX specialist", "Accesibility")
    ];

    //Having a mentor username, show a mentor's profile POV
    for(var i=0; i<myMentors.length; i++){
        if(username == myMentors[i].username){
            addMentorCard(myMentors[i], 0, "profile");
            break;
        }
    }

    //Having a mentee username, show a mentee's profile POV
    for(var i=0; i<myMentees.length; i++){
        if(username == myMentees[i].username){
            addMenteeCard(myMentees[i], 0, "profile");
            break;
        }
    }
}

function validateUsername(){
    var url_string = window.location.href;
    var url = new URL(url_string);
    var username = url.searchParams.get("username");
    return username;
}

function validURL(redirectPage){
    var username = validateUsername();

    switch(redirectPage){
        case "homepage":
            window.location.href = ("index.html?username="+username);
        
        case "feed":
            window.location.href = ("matchingPage.html?username="+username);
        
        case "mentee":
            window.location.href = ("mentee-sign-up.html?username="+username);

        case "mentor":
            window.location.href = ("mentor.html?username="+username);
        
        case "profile":
            window.location.href = ("profile.html?username="+username);
    }
}