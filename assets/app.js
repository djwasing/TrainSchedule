
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

$(document).on("click", "#submit", function() {         //on click, getting values of input fields, 
    
    var newName = $("#newName").val().trim();
    var newDest = $("#newDest").val().trim();
    var newTime = $("#newTime").val().trim();
    var newFreq = $("#newFreq").val().trim();

    function newTrainData(trainName, trainDestination, trainTime, trainFrequency) {
        database.ref().push({                       //pushing the newTrainData to the firebase
            name: trainName,
            destination: trainDestination,
            time: trainTime,
            frequency: trainFrequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
    };

    newTrainData(newName, newDest, newTime, newFreq);       //calling func

    $("#newName").val("");          //resetting the input fields to blank
    $("#newDest").val("");
    $("#newTime").val("");
    $("#newFreq").val("");

    console.log("New Data Added");

});

    // contact firebase and return info in order from oldest to newest
database.ref().orderByChild("dateAdded").limitToLast(10).on("child_added", function (snapshot) {

    console.log(snapshot);
    var newRow = $("<tr>");         //creates new row within the table
    var listName = $("<th>");       //creates new header cell within row
    var listDest = $("<td>");       //creates new cell within the row
    var listFreq = $("<td>");       //creates new cell within the row

    //giving new row info from firebase and attrs, 
    //then adding the new row to the table
    
    listName.text(snapshot.val().name).attr("scope", "row").attr("id", "name");

    listDest.text(snapshot.val().destination).attr("id", "destination");

    listFreq.text(snapshot.val().frequency).attr("id", "frequency");
    
    newRow.append(listName, listDest, listFreq);

    $("#table").append(newRow);
    
    
});