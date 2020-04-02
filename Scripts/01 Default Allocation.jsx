/** 
    * References to take note:
    * Horizontal ruler: X axis, Width of the pathItem
    * Vertical ruler: Y axis, Height of the pathItem
    * All references to be made from the bottom left corner of the document with respect to artboard[0]
    * Positive translation to the right for X, up for Y
    * Negative translation to the left for X, down for Y
    */

/**************** PURPOSE ****************
    This script is to be used to generate an initial layout of the allocation given an empty floorplan. Please follow the instructions 
    before running this script to ensure that it will run as expected.
    
 **************** TODO ****************
 1. Create a brand new layer in the Illustrator file
 2. Draw all the boundaries on the new layer
 3. Select all the boundaries to be considered
 4. Open the script and manually change the pathname to the said illustrator file
 5. Run the script to get the first output from the algorithm
 
 ************************************************/

/**************** FUNCTIONS ****************/
/**
    * Status - completed
    * takes in active document and checks if the TODO has been completed properly. no selection check is made here
    * @param    myDoc   the current document being worked on
    * @return   1   if the input values match, hence file correctly setup, else 0 and the script will end
    */
function checkNewLayerAndBoundaries(myDoc){
        
        //stores the number of pathItems in the latest layer
        var pathItemsDrawn = myDoc.layers[0].pathItems.length.toString();
        
        //initialise output to be returned
        var ans = -1;  
        
        //create a new window to prompt for user input
        var pathItemsInput = new Window("dialog", 'Layer Check');
        
        var inputGroup = pathItemsInput.add("group");
        inputGroup.alignment = "left";
        
        inputGroup.add("statictext", undefined, 'Enter the number of boundaries that you have drawn:');
        var userInputValue = inputGroup.add("edittext", [0,0,50,20], '0'); // [ x, y, width, height ]
        userInputValue.helpTip = "Please only enter numbers within range of 0 to 999.";
          
        //adding buttons in
        var buttons = pathItemsInput.add("group");
        buttons.alignment = "right";
        var buttonSubmit = buttons.add("button", undefined, 'OK');
        var buttonCancel = buttons.add("button", undefined, 'Cancel');
        
        //adding functions to the buttons
        buttonSubmit.onClick = function () { 
            //on submit, check if the values are legitimate. only accept from 0 to 999
            var regexValue = /^[0-9]{1,3}$/;

            if (regexValue.test(userInputValue.text)){
                if(userInputValue.text === pathItemsDrawn){
                    ans = 1;
                    }
                else{
                    mismatchedPathItemsError();
                    ans = 0;
                    }
                }
            else{ 
                invalidIntegerInputError();
                ans = 0;
                }
            pathItemsInput.close();
            }
        
        buttonCancel.onClick = function () {
            //if the window is cancelled, break out of script completely
            ans = 2;
            pathItemsInput.close();
            }
        
        //show the window
        pathItemsInput.show();
        
        return ans;
        }



/**
    * Status - completed
    * takes in active document and array and stores the boundaries to be considered into the array[0]
    * reference will be made using document coordinate system with respect to artboard[0] at the bottom left corner
    * @param    myDoc   the current document being worked on
    * @param    array   the array to store information into
    */
function boundaryReference(myDoc, array){
    
        //retrieve selection length
        var selectionLength = myDoc.selection.length;
        
        //set stroke colour of the boundary to be black
        var bStroke = new RGBColor();
        bStroke.red = 0;
        bStroke.blue = 0;
        bStroke.green = 0;

        //use a for loop to create a sequence of objects with their top left coordinates saved 
        for(var i = 0; i < selectionLength; i++){
            
            //set up the coordinate reference
            myDoc.artboards.setActiveArtboardIndex(0);
            myDoc.rulerOrigin = [0,0];
            
            var bSel = myDoc.selection[i];

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
            
            obj["check width top"] = bWidth;
            obj["check width bottom"] = bWidth;
            obj["check height limit"] = bHeight; //use absolute reference
            obj["check top left X"] = topLeftX;
            obj["check bottom right X"] = bottomRightX;
            
            //push object into array
            array[0].push(obj);
            }
        }
    
    

/**
    * status - completed
    * gets the scale from the user
    * @return scale 
    */
function getScale(){
        
        //create the window
        var pathItemsInput = new Window("dialog", 'Scale');
        
        var inputGroup = pathItemsInput.add("group");
        inputGroup.alignment = "left";
        
        inputGroup.add("statictext", undefined, 'Enter the scale of the image (e.g. 200 or 300):');
        var userInputValue = inputGroup.add("edittext", [0,0,50,20], '200');
        userInputValue.helpTip = "Please only enter numbers within range of 0 to 9999";
        
        var scale = userInputValue.text;
        
        //add in the buttons
        var buttons = pathItemsInput.add("group");
        buttons.alignment = "right";
        var buttonSubmit = buttons.add("button", undefined, 'OK');
        var buttonCancel = buttons.add("button", undefined, 'Cancel');
        
        //adding functions to the buttons
        buttonSubmit.onClick = function () {
            //check if values are legitimate. only accept from 0 to 9999
            var regexValue = /^[0-9]{1,4}$/;
            //if out of range
            if(!regexValue.test(scale)){
                invalidIntegerInputError();
                scale = 0;
                }
            pathItemsInput.close();
            }
        
        buttonCancel.onClick = function (){
            scale = -1;
            pathItemsInput.close();
            }
        
        //show the window
        pathItemsInput.show();
        
        //after the window is closed, return the value of scale
        return scale;
        }
    


/**
    * status - completed
    * requests for the name of the csv file and stores all the capstone group boundaries information
    * @param    myDoc   the current document being worked on
    * @param    array   the array to store information into
    */
function capstoneBoundary(myDoc, array){
    
        //initialise value to be returned
        out = 0;
            
        //create window to request for file name
        var inputFile = new Window("dialog", 'Capstone Group Preferences CSV File');
        
        var inputGroup = inputFile.add("group");
        inputGroup.alignment = "left";
        
        inputGroup.add("statictext", undefined, 'Enter the CSV file name containing the required data:');
        var userInputCSV = inputGroup.add("edittext", undefined, 'officialcsv.csv');
        
        var buttons = inputFile.add("group");
        buttons.alignment = "right";
        var buttonSubmit = buttons.add("button", undefined, 'OK');
        var buttonCancel = buttons.add("button", undefined, 'Cancel');
        
        buttonCancel.onClick = function () {
            out = -1;
            inputFile.close();
            }     
        
        //show the window
        inputFile.show();
        
        //only proceed if out is not equals to -1
        if(out === -1){
            return out;
            }

        //extract the input text and parse as filename
        var fileCSV = File(File($.fileName).parent.fsName + '/01 CSV Files/' + userInputCSV.text);
        
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
            
            var showcaseLengthInMillimeters = cells[4] * 1000;
            var showcaseWidthInMillimeters = cells[5] * 1000;
            
            var showcaseLengthInPoints = showcaseLengthInMillimeters / 0.3528 ;
            var showcaseWidthInPoints = showcaseWidthInMillimeters / 0.3528;
        
            //add information into the object
            obj["capstone ID"] = cells[1];
            obj["project type"] = cells[3];
            obj["showcase length"] = showcaseLengthInMillimeters; //corresponding to y axis
            obj["showcase width"] = showcaseWidthInMillimeters; //corresponding to x axis
            obj["lengthInPoints"] = showcaseLengthInPoints;
            obj["widthInPoints"] = showcaseWidthInPoints;
            obj["assigned"] = false;
            obj["confirmed"] = false;
            
            array[1].push(obj);
            }
        return 1;
        }
        


/**
    * status - completed
    * takes in the completed array of inofrmation and run the algorithm
    * @param    myDoc   current document being worked on
    * @param    array   the completed array of information
    */
function initialAllocation(myDoc, array, scale){
    
        //separate the nested arrays
        var boundaries = array[0];
        var capstone = array[1];
        
        //isolate capstone allocations on a new layer
        myDoc.layers.add();
        
        //preset the stroke characteristics
        var capstoneStroke = new RGBColor();
        capstoneStroke.red = 255;
        capstoneStroke.green = 0;
        capstoneStroke.blue = 0;
        
        //create a boundary to store unassigned 
        var uCBStroke = new RGBColor();
        uCBStroke.red = 0;
        uCBStroke.green = 0;
        uCBStroke.blue = 0;
        var uCB = myDoc.pathItems.rectangle(0,0,240,200);
        uCB.filled = false;
        uCB.stroked = true;
        uCB.strokeWeight = 0.5;
        uCB.strokeColor = uCBStroke;
        var unassignedGroup = myDoc.groupItems.add();
        uCB.moveToBeginning(unassignedGroup);
        
        var text = unassignedGroup.textFrames.add();
        text.contents = "this contains all the unassigned capstone groups";
        text.position = Array(4,0);
        text.textRange.size = 10;
        
        // convert capstone values to be to scale
        for(var i = 0; i < capstone.length; i++){
            capstone[i]["lengthInPoints"] = capstone[i]["showcase length"] /(scale * 0.3528);
            capstone[i]["widthInPoints"] = capstone[i]["showcase width"] /(scale * 0.3528);
            }
        
        //convert the boundary height limit to scale
        //for(var q = 0; q < boundaries.length; 
        
        
        
        
        
        
        
        
        
        
        //start the assignment for the top width
        for(var i = 0; i < boundaries.length; i++){
            
            //set up the coordinate reference to sync with the boundaryReference
            myDoc.artboards.setActiveArtboardIndex(0);
            myDoc.rulerOrigin = [0,0];
            
            //fit along the top width first
            if(boundaries[i]["check width top"] >= 20){
                
                for(var j = 0; j < capstone.length; j++){
                    
                    //only assign if capstone is unassigned AND height fits into boundary AND leftover width fits into boundary
                    if(capstone[j]["assigned"] == false && boundaries[i]["height"] >= capstone[j]["lengthInPoints"] && boundaries[i]["check width top"] >= capstone[j]["widthInPoints"]){
                        
                        //update the height limit if the capstone group lowers the height allowance remaining
                        if(boundaries[i]["check height limit"] > (boundaries[i]["height"] - capstone[j]["lengthInPoints"])){
                            
                            boundaries[i]["check height limit"] = boundaries[i]["height"] - capstone[j]["lengthInPoints"];
                            }
                        
                        //draw the capstone group
                        //top left y, top left x, width, height
                        var capstoneBound = myDoc.pathItems.rectangle(boundaries[i]["top left Y"], boundaries[i]["check top left X"], capstone[j]["widthInPoints"], capstone[j]["lengthInPoints"]);
                        capstoneBound.filled = true;
                        capstoneBound.stroked = true;
                        capstoneBound.strokeWeight = 0.5;
                        capstoneBound.strokeColor = capstoneStroke;
                        
                        var groupItem = myDoc.groupItems.add();
                        capstoneBound.moveToBeginning(groupItem);
                        
                        var text = groupItem.textFrames.add();
                        text.contents = capstone[j]["capstone ID"];
                        text.position = Array(boundaries[i]["check top left X"] + 2, boundaries[i]["top left Y"] - 1);
                        text.textRange.size = 10;
                        
                        groupItem.name = capstone[j]["capstone ID"];
                        
                        //update the width limits
                        boundaries[i]["check width top"] -= capstone[j]["widthInPoints"];
                        
                        //update the top left X to begin from, with reference to bottom left corner of the artboard
                        boundaries[i]["check top left X"] +=capstone[j]["widthInPoints"];
                        
                        //update the status of the assignment of the capstone
                        capstone[j]["assigned"] = true;
                        }
                    //if capstone group cannot be assigned
                    else { continue; } 
                    }
                }
            }
        
        for(var i = 0; i< boundaries.length; i++){
            
            //set up the coordinate reference to sync with the boundaryReference
            myDoc.artboards.setActiveArtboardIndex(0);
            myDoc.rulerOrigin = [0,0];
            
            //fit along the bottom width
            if(boundaries[i]["check width bottom"] >= 20){
                
                for(var k = 0; k < capstone.length; k++){
                    
                    //if not assigned yet AND height limit allows AND width remaining is sufficient
                    if(capstone[k]["assigned"] == false && boundaries[i]["height"] >= capstone[k]["lengthInPoints"] && boundaries[i]["check height limit"] >= capstone[k]["lengthInPoints"] && boundaries[i]["check width bottom"] >= capstone[k]["widthInPoints"]){
                        
                        //immediately draw the boundary from the right corner
                        var topLeftX = boundaries[i]["check bottom right X"] - capstone[k]["widthInPoints"];
                        var topLeftY = boundaries[i]["bottom right Y"] + capstone[k]["lengthInPoints"];
                        var capstoneBound = myDoc.pathItems.rectangle(topLeftY, topLeftX, capstone[k]["widthInPoints"], capstone[k]["lengthInPoints"]);
                        capstoneBound.filled = true;
                        capstoneBound.stroked = true;
                        capstoneBound.strokeWeight = 0.5;
                        capstoneBound.strokeColor = capstoneStroke;
                        
                        var groupItem = myDoc.groupItems.add();
                        capstoneBound.moveToBeginning(groupItem);
                        
                        var text = groupItem.textFrames.add();
                        text.contents = capstone[k]["capstone ID"];
                        text.position = Array(topLeftX + 2 , topLeftY - 1);
                        text.textRange.size = 10;
                        
                        groupItem.name = capstone[k]["capstone ID"];
                        
                        //update the width limits
                        boundaries[i]["check width bottom"] -= capstone[k]["widthInPoints"];
                        
                        //update the bottom left X to start with
                        boundaries[i]["check bottom right X"] -= capstone[k]["widthInPoints"];
                        
                        //update the status of assignment of the capstone group
                        capstone[k]["assigned"] = true;
                        }
                    
                    //draw those unassigned capstones out onto a separate space
                    else if(capstone[k]["assigned"] == false) {
                        var uC = myDoc.pathItems.rectangle(-20, 0, capstone[k]["widthInPoints"], capstone[k]["lengthInPoints"]);
                        uC.stroked = true;
                        uC.strokeWeight = 0.5;
                        uC.strokeColor = capstoneStroke;
                        uC.filled = true;
                        
                        var groupItem = myDoc.groupItems.add();
                        uC.moveToBeginning(groupItem);
                        
                        var text = groupItem.textFrames.add();
                        text.contents = capstone[k]["capstone ID"];
                        text.position = Array(2,-21);
                        text.textRange.size = 10;
                        
                        groupItem.name = capstone[k]["capstone ID"];
                        }
                    }
                }
            }
        }



/**************** ERROR FUNCTIONS ****************/
/**
    * Status - completed
    * displays window that notifies missing selection of boundaries or incorrect number entered
    */
function mismatchedPathItemsError(){
    
    var mPIE = new Window("dialog", 'mismatchedPathItemsError');
    mPIE.add("statictext", undefined, 'Please check if the boundaries have been drawn on a newly created layer, or that you have inputted the correct number of boundaries drawn.');
    mPIE.add("statictext", undefined, 'Please restart this script and ensure that the boundaries are correctly set up.');
    
   mPIE.show();
   }

/**
    * status - completed
    * displays window that notifies missing CSV file for reading
    */
function missingFileError(){
    var mFE = new Window("dialog", 'missingFileError');
    mFE.add("statictext", undefined, 'Please ensure that the file exists and is placed in the correct folder: 01 CSV Files');
    mFE.add("statictext", undefined, 'Please also ensure that the file name has been entered correctly.');
    mFE.add("statictext", undefined, 'The script will terminate now.');
    
    mFE.show();
    }
/**
    * status - completed
    * displays alert box
    */
function invalidIntegerInputError(){
    var iIIE = new Window("dialog", 'invalidIntegerInputError');
    iIIE.add("statictext", undefined, 'This input only take in numbers from range 0 to 999.');
    iIIE.add("statictext", undefined, 'Please only enter numbers within the range.');
    
    iIIE.show();
    }


/**
    * status - completed
    * displays window that notifies script termination
    */
function terminatingScript(){
    var tS = new Window("dialog", 'terminatingScript');
    tS.add("statictext",undefined, 'Script terminating.');
    
    tS.show();
    }



/**************** MAIN ****************/
function main(){
    
    var banana = app.open(File('C:/Users/world/Desktop/Level 2 B2-3 Foyer Floor Plan.ai'));
    $.writeln('Demonstration of user interaction with the file');
    
    while(1){
        
        var initialArray = [[],[]];
        
        //check if the TODO has been followed
        //if 0, keep retrying
        var init = checkNewLayerAndBoundaries (banana);
        while(init === 0){
            init = checkNewLayerAndBoundaries (banana);
            }
        //if window is closed from cancel, break out completely
        if(init === 2){
            terminatingScript ();
            break;
            }
        //else continue with the rest of the script
        

        //check if the file exists
        //if 0 keep retrying
        var fileCheck = capstoneBoundary (banana, initialArray);
        while(fileCheck === 0){
            fileCheck = capstoneBoundary (banana, initialArray);
            }
        //if cancelled, break out completely
        if(fileCheck === -1){
            terminatingScript ();
            break;
            }
        //else continue with the rest of the script
            
       
        
        //get the scale
        var scale = getScale();
        //while the input is illegal, keep retrying
        while(scale === 0){
            scale = getScale();
            }
        //if cancelled, end entire script
        if(scale === -1){
            terminatingScript ();
            break;
            }
        //else continue with the rest of the script
        
        
        
        //carry out the initial allocation
        boundaryReference(banana, initialArray);
                
        //algorithm
        initialAllocation(banana, initialArray, scale);
        
        //now completed, break out to end the script
        break;
        }
    }

main();