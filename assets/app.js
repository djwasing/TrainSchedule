
// Initialize Firebase
var config = {
    apiKey: "AIzaSyCC_QAtoIFzixfSzhDZ-bpwUzpx502P3Ac",
    authDomain: "trainscheduler-15b66.firebaseapp.com",
    databaseURL: "https://trainscheduler-15b66.firebaseio.com",
    projectId: "trainscheduler-15b66",
    storageBucket: "trainscheduler-15b66.appspot.com",
    messagingSenderId: "535277925346"
};
  
firebase.initializeApp(config);

var database = firebase.database();

$(document).on("click", "#submit", function() {
    
    var newName = $("#newName").val().trim();
    var newDest = $("#newDest").val().trim();
    var newTime = $("#newTime").val().trim();
    var newFreq = $("#newFreq").val().trim();

    function newTrainData(trainName, trainDestination, trainTime, trainFrequency) {
        database.ref().push({
            name: trainName,
            destination: trainDestination,
            time: trainTime,
            frequency: trainFrequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
    };

    newTrainData(newName, newDest, newTime, newFreq);

    $("#newName").val("");
    $("#newDest").val("");
    $("#newTime").val("");
    $("#newFreq").val("");

    console.log("New Data Added");

});