/*
FOR A 1:200 SCALE, WE JUST NEED TO MULTIPLY THE INPUT (METERS) BY 5
TO CHANGE IT INTO MILLIMETERS FOR THE MAP. E.G: 2 METERS = 10mm ON 
THE MAP
*/


//Before you start running this script

//1. draw your boundaries
//2. select the boundaries
//3. run this script

//TODO change the path to the illustrator file you're using
var myDoc= app.open(File("C:/Users/ymf_m/Desktop/main.ai"));
$.writeln('Demonstration of user interaction with the file');


var array = [[],[]];

var docSel = myDoc.selection;

userBoundary(array);
addToArrayStudents(array);


//name the boundaries
//takes in the empty array
//append each boundary into array[0]
function userBoundary(array) {
    
    //retrieve selection length
    var selectionLength = selection.length;
    var inputs = [];
    var tempNames = [];
    
    //use a for loop to create a sequence of objects with their top left coordinates saved 
    for(var i = 0; i < selectionLength; i++){
        var selectionX = selection[i].geometricBounds[0]; //0 in array is top left X
        var selectionY = selection[i].geometricBounds[1]; //1 in array is top left Y
        var selectionWidth = selection[i].width;
        var selectionHeight = selection[i].height;
        var selectionTop = selection[i].top;
        $.writeln('User drawn Top: ', selection[i].top)
        var selectionLeft = selection[i].left;
        var rotationValue = 0;
        
        if(selection[i].tags.length > 0 && selection[i].tags[0].name == "BBAccumRotation"){
            //alert(selection[i].tags[0].value);
            rotationvalue = selection[i].tags[0].value;
            }


        var currentObj = { 
            name: 'defaultName',
            TopLeftX: selectionX,
            TopLeftY: selectionY,
            width: selectionWidth,
            height: selectionHeight,
            top: selectionTop,
            left: selectionLeft,
            rotation: rotationValue
            };
        inputs.push(currentObj);
        }
    // INPUTS IS A LIST OF currentObj. currentObj is an object with name, TopLeftX, TopLeftY, width, height, top, left
    
    //create window to prompt for user input of boundary names
    var userInput = new Window("dialog", 'Name your boundaries');
    
    //use a for loop to create the fields in the window
    for (var j = 0; j < inputs.length; j++){

        //if the object has a field called name
        if(inputs[j].name != null){
            var inputGroup = userInput.add("group");
            inputGroup.alignment = "left";
            
            //display formatting
            inputGroup.add("statictext", undefined, 'Shape at top left X of '+inputs[j].TopLeftX+
            ' and top left Y of '+inputs[j].TopLeftY+':');
           
            //retrieve values from the array and display in the window
            //need to correct the alignment of the boxes
            tempNames[j] = inputGroup.add("edittext", undefined, inputs[j].name);
            }
        }
    var submitGroup = userInput.add("group");
    submitGroup.alignment = "right";
    
    var submit = submitGroup.add("button", undefined, 'OK');
    var cancel = submitGroup.add("button", undefined, 'Cancel');
    
    submit.active = true;
    
    if(userInput.show() === 1){
        
        for(var j = 0; j < inputs.length; j++){

            //if there is a non-null value in the text box, save that value into currentObj[j]
            if(tempNames[j].text != null){
                inputs[j].name = tempNames[j].text;
                $.writeln('new name');
                $.writeln(inputs[j].name.toSource());
                }
            }
        }

    userInput.show();
    
    //when inputs are finalised
    //append all to the original array[0]
    for(var k = 0; k < inputs.length; k++){
        array[0].push(inputs[k]);
        
    }
}

//creating the student exhibition objects
//takes in the empty array
//append objects (strings) into array[1]
function addToArrayStudents(array){  
    
    var teamIDValue = 2020001;
    var prototype = ["software", "hardware"];
    var arrayLength = [20,20,30,30,40,40,50,50,60,60];
    var arrayWidth = [20,30,40,50,60,60,50,40,30,20];
    var length = 10;
    
    for(var i =0; i < length; i++){
        var obj = {};
        // obj is an object with attributes: teamID, prototype (software/hardware), length, width, fixed.
        obj["teamID"] = teamIDValue + i;
        var value = obj["teamID"] % 2
        obj["prototype"] = prototype[value];
        obj["length"] = arrayLength[i];
        obj["width"] = arrayWidth[i];
        obj["fixed"] = false;
        
        var groupItem = myDoc.groupItems.add();
        
        var rectangle = groupItem.pathItems;
        rectangle.rectangle(200,200,arrayLength[i],arrayWidth[i]);
        rectangle.stroke = true;
        var text = groupItem.textFrames.add();
        text.contents = obj["teamID"];
        text.position = Array(200,212);
        text.textRange.size = 8;
        
        obj["grouped"] = groupItem;
        obj["grouped"].name = obj["teamID"]
        array[1].push(obj);
        }
    }




