//To be used at the very start on an empty floor plan

/**
 * Before the script:
 * 1. draw all the boundaries on a brand new layer
 * 2. select all the boundaries
 * 3. run this script to get the first output from the algorithm
 */


//LIMITATIONS
//Limited to no rotations (rectangles are not rotated)

/**
    * FUNCTION - completed
    * takes in the current file being worked on and checks if the latest layer matches the user input number of
    * boundaries drawn
    * @param    myDoc   the current document being worked on
    * @return   1   if the input values match, hence file correctly setup, else 0
    */
function checkNewLayerAndBoundaries(myDoc){
    
    //stores the number of pathItems in the latest layer
    var pathItemsDrawn = myDoc.layers[0].pathItems.length.toString();
    
    //create a new window to prompt for user input
    var pathItemsInput = new Window("dialog", 'Layer Check');
    
    var inputGroup = pathItemsInput.add("group");
    inputGroup.alignment = "left";
    
    inputGroup.add("statictext", undefined, 'Enter the number of boundaries that you have drawn:');
    var userInputValue = inputGroup.add("edittext", undefined, '0');
    
    var buttons = pathItemsInput.add("group");
    buttons.alignment = "right";
    var buttonSubmit = buttons.add("button", undefined, 'OK');
    var buttonCancel = buttons.add("button", undefined, 'Cancel');
    
    buttonSubmit.active = true;
    
    //show the window
    pathItemsInput.show();
    
    //after the window is closed, check the values and see if they match
    var checkValue = userInputValue.text;
    if(checkValue === pathItemsDrawn){
        return 1;
        }
    else{
        mismatchedPathItemsError();
        return 0;
        }
    }   
    






/**
    * FUNCTION
    * takes in input file and array and stores information of the boundaries into the array for future reference
    * @param    myDoc   the current document being worked on
    * @param    array   the array to store information into
    */
function boundaryReference(myDoc,array){
        
    //retrieve selection length
    var selectionLength = myDoc.selection.length;
    var bStroke = new RGBColor();
    bStroke.red = 0;
    bStroke.blue = 0;
    bStroke.green = 0;
    
    
    //use a for loop to create a sequence of objects with their top left coordinates saved 
    for(var i = 0; i < selectionLength; i++){
        
        //set such that each boundary is treated with absolute reference
        var bSel = myDoc.selection[i];
        
        myDoc.rulerOrigin = [0,0];

        
        //getting position of the boundary
        //follows global rulers that may not be aligned with the drawn boundaries
        //general direction is from bottom left corner
        var topLeftX = bSel.geometricBounds[0]; //top left X coordinate
        var topLeftY = bSel.geometricBounds[1]; //top left Y coordinate
        var bottomRightX = bSel.geometricBounds[2]; //bottom right X coordinate
        var bottomRightY = bSel.geometricBounds[3]; //bottom right Y coordinate
        
        //get the original width and height of the boundary
        var bArea = bSel.area;
        var bHeight = bSel.height;  //along the vertical y axis
        var bWidth = bSel.width; //along the horizontal x axis

        //assign name
        var name = 'b00' + i;
        bSel.name = name;
        
        //standardise boundary characteristics
        bSel.opacity = 100.0;
        bSel.filled = false;
        bSel.stroked = true;
        bSel.strokeColor = bStroke;
        bSel.strokeWidth = 1;
        
        //create groupItem of the boundary
        var groupItem = myDoc.groupItems.add();
        bSel.moveToBeginning(groupItem);
        
        var text = groupItem.textFrames.add();
        text.contents = name;
        text.position = Array(topLeftX, topLeftY+12);
        text.textRange.size = 10;
        
        groupItem.name = name;
        
        //create object
        var obj = {};
        
        obj["name"] = name;
        obj["boundary"] = groupItem;
        obj["area"] = bArea;
        obj["height"] = bHeight;
        obj["width"] = bWidth;
        obj["top left X"] = topLeftX;
        obj["top left Y"] = topLeftY;
        obj["bottom right X"] = bottomRightX;
        obj["bottom right Y"] = bottomRightY;
        
        obj["check width top"] = bWidth; //width represented by Y
        obj["check width bottom"] = bWidth;
        obj["check height limit"] = -1; //reference to X
        obj["check top left X"] = topLeftX;
        obj["check bottom right X"] = bottomRightX;
        
        //push object into array
        array[0].push(obj);
        }
    }

        
 



/**
    * FUNCTION
    * takes in a csv file and draws out the capstone preferred boundaries
    * @param    myDoc   the current document being worked on
    * @param    array   the array to store information into
    */
function capstoneBoundary(myDoc,array){
    
    //create window to request for file name
    var inputFile = new Window("dialog", 'Capstone Group Preferences CSV File');
    
    var inputGroup = inputFile.add("group");
    inputGroup.alignment = "left";
    
    inputGroup.add("statictext", undefined, 'Enter the CSV file name containing the required data:');
    var userInputCSV = inputGroup.add("edittext", undefined, 'officialcsv.csv');
    
    var buttons = inputFile.add("group");
    buttons.alignment = "right";
    var buttonSubmit =
    buttons.add("button", undefined, 'OK');
    var cancel = buttons.add("button", undefined, 'Cancel');
    
    buttonSubmit.active = true;
    
    //show the window
    inputFile.show();
    
    //extract the input text and parse as filename
    var fileCSV = File(File($.fileName).parent.fsName + '/' + userInputCSV.text);
    
    //if file does not exist
    if(!fileCSV.exists){
        missingFileError();
        return 0;
        }
    
    //if the file exists
    fileCSV.open('r');
    var contentCSV = fileCSV.read();
    fileCSV.close();
    
    //split the lines
    var lines = contentCSV.split('\n');
    var keys = lines[0].split(',');
    
    //for loop through the rest of the CSV file to create the capstone boundaries and store
    for(var i = 1; i < lines.length; i++){
        
        var obj = {};
        var cells = lines[i].split(',');

        /*
        //create a new group item containing the drawn pathitem with corresponding group ID attached
        var groupItem = myDoc.groupItems.add();
        
        var capstone = groupItem.pathItems;
        capstone.rectangle(200,200,cells[4]*50,cells[5]*50);
        
        var text = groupItem.textFrames.add();
        text.contents = cells[1] + ': ' + cells[3];
        text.position = Array(201,200);
        text.textRange.size = 10;
        
        groupItem.name = cells[1];
        */
    
        //add information into the object
        obj["group ID"] = cells[1];
        //obj["capstone"] = groupItem;
        obj["project type"] = cells[3];
        obj["showcase length"] = cells[4]*50;
        obj["showcase width"] = cells[5]*50;
        obj["assigned"] = false;
        obj["confirmed"] = false;
        
        array[1].push(obj);
        }
    }

    
    
    

/**
    * FUNCTION
    * takes in the completed array containing information regarding the user-set boundaries and the student group boundaries and allocates
    * @param    myDoc   the current document being worked on
    * @param    array   the completed array of information
    */
function checkAndDrawBoxes(myDoc,bigArray){
    var userDrawnBoxes = bigArray[0];
    var projectDimensions = bigArray[1];
    var artLayer = myDoc.layers.add();
       
    for(var i = 0; i < projectDimensions.length; i++){
        for(var j = 0; j < userDrawnBoxes.length; j++){
            if(projectDimensions[i]["showcase length"] <= userDrawnBoxes[j]["height"]){
                if(projectDimensions[i]["showcase width"] <= userDrawnBoxes[j]["width"]){
                    // dimension of user stored as: top, left, width, length
                    // draw rectangle that has width = csv[width] and height = csv[height] at user[j][top] and user[j][left]
                    // user[top] - csv[height] and user[length] - csv[length]
                    // draw textBox to name project[i]
                    var projGroup = artLayer.groupItems.add();
                    
                    // debugging
                    $.writeln('User drawn Height: ', userDrawnBoxes[j]["height"])
                    $.writeln('User drawn width: ', userDrawnBoxes[j]["width"])
                    $.writeln('Project dimensions width: ', projectDimensions[i]["showcase width"])
                    $.writeln('Project dimensions length: ', projectDimensions[i]["showcase length"])
                    
                    var newRect = projGroup.pathItems.rectangle(userDrawnBoxes[j]["top"], userDrawnBoxes[j]["left"], projectDimensions[i]["showcase width"], projectDimensions[i]["showcase length"]);
                    
                    var noColour = new NoColor();
                    newRect.fillColor = noColour;
                    var redColour = new RGBColor();
                    redColour.red = 255;
                    redColour.green = 0;
                    redColour.blue = 0;
                    newRect.strokeColor = redColour;
                    redraw();
                    
                    var projNumber = projectDimensions[i]["group ID"];
                    var projTextFrame = projGroup.textFrames.add();
                    projTextFrame.top = userDrawnBoxes[j]["top"];
                    projTextFrame.left = userDrawnBoxes[j]["left"];
                    projTextFrame.contents = projNumber;
                    
                    userDrawnBoxes[j]["top"] -= projectDimensions[i]["showcase length"] // change value of user top
                    userDrawnBoxes[j]["height"] -= projectDimensions[i]["showcase length"] // change value of user height
                    break; // after we assign already should break out so we don't repeat assignments
                }
            }
        }
    }
}   







/** FUNCTION
    * a rewrite of the checkAndDrawBoxes function
    * note that geometric bounds is with respect to the bottom left corner of the artboard
    * @param    myDoc   the current document being worked on
    * @param    array   the entire array containing all the details
    */
function initialAssignGroups(myDoc,array){
    
    //separate the nested arrays
    var boundaries = array[0];
    var students = array[1];
    
    //draw everything onto a new layer
    var newLayer = myDoc.layers.add();
    
    //preset the stroke colour to draw the 
    var capstoneStroke = new RGBColor();
    capstoneStroke.red = 255;
    capstoneStroke.green = 0;
    capstoneStroke.blue = 0;
    
    //top width fitting for all capstones within the boundaries
    for(var i = 0; i < boundaries.length; i++){
        myDoc.rulerOrigin = [0,0];
              
        //try to fit along the top width first
        if(boundaries[i]["check width top"] >= 20){
            
            for(var j = 0; j < students.length; j++){
                
                //if not assigned yet
                if(students[j]["assigned"] === false){ 

                    //if the length of the showcase is within limits AND there is sufficient width left along the top to fit  the current project
                    if(boundaries[i]["height"] >= students[j]["showcase length"] && boundaries[i]["check width top"] >= students[j]["showcase width"]){
                        
                        //if first object in the boundary box, initialise the height limit to be the length of the project relative to bottom left corner of artboard
                        if(boundaries[i]["check height limit"] === -1){
                            
                            boundaries[i]["check height limit"] = boundaries[i]["top left Y"] - students[j]["showcase length"];
                            }
                        
                        //else if the current project length is more than the current max, update the current max
                        else if(boundaries[i]["check height limit"] > (boundaries[i]["top left Y"] - students[j]["showcase length"])){
                            
                            boundaries[i]["check height limit"] = boundaries[i]["top left Y"] - students[j]["showcase length"];
                            }

                        //draw the capstone group to the top left corner of the boundary, hardcoded fix
                        //top left x, top left y, width, height

                        var capstone = myDoc.pathItems.rectangle(boundaries[i]["check top left X"], boundaries[i]["top left Y"], students[j]["showcase width"], students[j]["showcase length"]);
                        capstone.stroked = true;
                        capstone.strokeWeight = 0.5;
                        capstone.strokeColor = capstoneStroke;
                        
                        var groupItem = myDoc.groupItems.add();
                        capstone.moveToBeginning(groupItem);
                        
                        var text = groupItem.textFrames.add();
                        text.contents = students[j]["group ID"];
                        text.position = Array(boundaries[i]["check top left X"], boundaries[i]["top left Y"] - 1);
                        text.textRange.size = 10;
                        
                        
                        //update the width limits
                        boundaries[i]["check width top"] -= students[j]["showcase width"];
                        
                        //update the top left X to begin from, with reference to bottom left corner of the artboard
                        boundaries[i]["check top left X"] +=students[j]["showcase width"];
                        
                        //update the status of the assignment of the capstone
                        students[j]["assigned"] = true;
                        
                        }
                    
                    else{
                        //if the top width for this boundary cannot be assigned, move on to the next boundary
                        break;
                        }                  
                    }
                }
            }
        }
    
    //bottom width fitting
    for(var k = 0; k < boundaries.length; k++){
        
    
    
    }
                }
                    
                        
                           

                        
                    
            
            
        
        














/**
    * ERROR MESSAGE
    * displays window that notifies missing selection of boundaries or incorrect number entered
    */
function mismatchedPathItemsError(){
    
    var mPIE = new Window("dialog", 'mismatchedPathItemsError');
    mPIE.add("statictext", undefined, 'Please check if the boundaries have been drawn on a newly created layer, or that you have inputted the correct number of boundaries drawn.');
    mPIE.add("statictext", undefined, 'Please restart this script and ensure that the boundaries are correctly set up.');
    
   mPIE.show();
   }

/**
    * ERROR MESSAGE
    * displays window that notifies missing CSV file for reading
    */
function missingFileError(){
    var mFE = new Window("dialog", 'missingFileError');
    mFE.add("statictext", undefined, 'Please ensure that the file exists and is placed in the same folder as this script.');
    mFE.add("statictext", undefined, 'Please also ensure that the file name has been entered correctly.');
    
    mFE.show();
    }









//assigning variable name to the specific file opened
var banana = app.open(File('C:/Users/world/Desktop/B2-3 Foyer Floor Plan.ai'));
$.writeln('Demonstration of user interaction with the file');

//set the document origin first (align the first arboard, ensure reference is made to the bottom left corner of the document and on the global ruler)
//banana.rulerOrigin = Array(0,0);


//run the rest of the script
while(1){
    
    var bsel = banana.selection[0];
    var bheight = bsel.height;
    var bwidth = bsel.width;
    $.writeln("the test");
    $.writeln(bheight.toSource());
    $.writeln(bwidth.toSource());
    
    var initialArray = [[],[]];
    //check if boundary boxes are drawn on a brand new layer
    if(checkNewLayerAndBoundaries(banana) === 0){
        break;
        }
    
    //checks if the file exists
    if(capstoneBoundary(banana,initialArray) === 0){
        break;
    }

    boundaryReference(banana,initialArray);

    
    initialAssignGroups(banana,initialArray);
    
    //top left x, top left y, width, height
    var item = banana.pathItems.rectangle(100,100,20,800);
    $.writeln(item.height);
    $.writeln(item.width);
    
    

    break;
}