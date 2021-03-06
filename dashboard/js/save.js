



//Function to generate random string, used as key for database storage
    function randomString(length) {
        return Math.round((Math.pow(36, length + 1) - Math.random() *
        Math.pow(36, length))).toString(36).slice(1);
    }
    //all needed variable declared here
    var randomKey = randomString(5);
    var FirebaseParentPath = new Firebase("https://bc12-drawtogether.firebaseio.com/");
    var FirebasePathtoRealtimeDrawing = new Firebase("https://bc12-drawtogether.firebaseio.com/realtime_drawing");
    var FireBasePathtoSaved = FirebaseParentPath.child("saved");
    // call saveFromDraf function when the saved button is clicked
    $("#save").click(function(){
        saveFromDraft();
    })
    // call openFrom function when the the open button is clicked
    $("#open").click(function(){
        openFromSaved();
        sendsavedclick();
        //alert("It worked !!");
    })
    //an event listener that disable the canvas from editing
    $("#disableCanvas").click(function(){
        disableEventListenerOnCanvas("");
    })
    //snap the draming Xs and Ys cordinate and save it to saved folder on firebase
    function saveFromDraft() {
        FirebasePathtoRealtimeDrawing.once("value", function (snapshot) {
            FireBasePathtoSaved.child(randomKey).set(snapshot.val());
        })
    }
 }
//write save files when button open is clickk
    function openFromSaved(){
        var $listsave = $('#listsave');
        FireBasePathtoSaved.on("value", function(snapshot){
            valueOfSnapshot = snapshot.val();
            for(var key in valueOfSnapshot){
                $listsave.append('<div id="openup"><img src="../images/layers-50.png" /> <a href="#"> id="'+key+'"><br>'+ key +'</a></div>')
            }

        })
    }
// get snapshots of selected saved drawing and pass it to the realtime for editing
    function sendsavedclick(){
        $("#listsave").click(function() {
            $("#openup").click(function(){
                var value1 = $(this).attr('id');
                var appendToFirebasePathToSave = FireBasePathtoSaved.child(value1);
                appendToFirebasePathToSave.once("value", function(snapshot){
                    //bridging due to error "Dubug Now"
                    var snapshotBridge = snapshot.val();
                    FirebaseParentPath.child("realtime_drawing").set(snapshotBridge);
                })
            })
            // console.log(value);
            // var sendsavetolive = FireBasePathtoSaved.child(appedto);
            // console.log(sendsavetolive);
        });
    }
 // function to disblae the canvas
 function disableEventListenerOnCanvas(){
     $("canvas").unbind("mousedown","mousemove","mouseup");
 }









