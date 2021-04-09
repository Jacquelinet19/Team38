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
Function: addMenteeCards()
Add list of Mentee to the feed if the username is a mentor
*/
function addMenteeCards(myMentees) {
    for(var j=0; j<myMentees.length; j++){
        var tag = document.createElement('div');
        tag.innerHTML = '<div class="card">' + 
            '<div id="card-img"><img src="images/img1.png"></img></div>' + 
            '<div id="card-nameholder"><h3>' + myMentees[j].name + '</h3></div>' + 
            '<div id="card-seemore-button">' + 
                '<button type="button" class="btn btn-info" data-toggle="collapse" data-target="#more-info' + j + '">See more</button>' + 
            '</div>' + 
            '<div id="more-info' + j + '" class="collapse" style="padding: 2px 120px;">' + 
                '<strong>E-mail: </strong><p>' + myMentees[j].email + '</p>' + 
                '<strong>School: </strong><p>' + myMentees[j].school + '</p>' + 
                '<strong>Class Standing: </strong><p>' + myMentees[j].classStanding + '</p>' + 
                '<strong>About me: </strong><p>' + myMentees[j].intro + '</p>' + 
                '<strong>My objectives: </strong><p>' + myMentees[j].reason + '</p>' + 
                '<strong>Skills Needed: </strong><p>' + myMentees[j].desiredSkills + '</p>' + 
            '</div>' + '</div>';
        
        var element = document.getElementById("content");
        element.appendChild(tag);
    }
}

/*
Function: addMentorCards()
Add list of Mentors to the feed if the username is a mentee
*/
function addMentorCards(myMentors) {
    for(var j=0; j<myMentors.length; j++){
        var tag = document.createElement('div');
        tag.innerHTML = '<div class="card">' + 
            '<div id="card-img"><img src="images/img1.png"></img></div>' + 
            '<div id="card-nameholder"><h3>' + myMentors[j].name + '</h3></div>' + 
            '<div id="card-seemore-button">' + 
                '<button type="button" class="btn btn-info" data-toggle="collapse" data-target="#more-info' + j + '">See more</button>' + 
            '</div>' + 
            '<div id="more-info' + j + '" class="collapse" style="padding: 2px 120px;">' + 
                '<strong>E-mail: </strong><p>' + myMentors[j].email + '</p>' + 
                '<strong>College: </strong><p>' + myMentors[j].college + '</p>' + 
                '<strong>Job: </strong><p>' + myMentors[j].job + '</p>' + 
                '<strong>About me: </strong><p>' + myMentors[j].intro + '</p>' + 
                '<strong>Area of expertise: </strong><p>' + myMentors[j].expertise + '</p>' + 
            '</div>' + '</div>';
        
        var element = document.getElementById("content");
        element.appendChild(tag);
    }
}

/*
Function: addTableCards()
Adapts the feed to the username whether is a mentor or mentee to show the right information
    
Notes:
    Up until now works in a local way with structs containing dummy info 
    Next step is to adapt it to work with datastorage
*/
function addTableCards() {

    /*Could be an option to obtain the value from the redirection from other pages, still in progress...
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const username = urlParams.get('username');*/

    const username = "john123";

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
            addMenteeCards(myMentees);
        }
    }

    //Having a mentee username, showing list of mentors
    for(var i=0; i<myMentees.length; i++){
        if(username == myMentees[i].username){
            addMentorCards(myMentors);
        }
    }
}