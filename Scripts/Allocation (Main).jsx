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
        var ans = 0;  
        
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
            if (checkRegex(userInputValue.text)){
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
            ans = -1;
            pathItemsInput.close();
            }
        
        //show the window
        pathItemsInput.show();
        return ans;
        }

/**
    * status - pending check
    * takes in active document and capture inputs from the users regarding scale and csv file selected
    * error messages will be displayed appropriately
    * @param    myDoc   the current document being worked on
    * @return   array(condition, scale, file)      scale value in integers and full file path for other functions
    */    
function mergedInputs(myDoc){
    
    //initialise the outputs to be returned
    //[0] for script breaking condition
    //[1] for scale value
    //[2] for full file path
    var output = [0,0,0]; 
    
    //create the window
    var mergedInputWindow = new Window("dialog", 'More details about the file');
    
    //create group for scale
    var scaleGroup = mergedInputWindow.add("group");
    scaleGroup.alignment = "left";
    
    scaleGroup.add("statictext", undefined, 'Enter the scale of the floorplan: ');
    var scaleInputValue = scaleGroup.add("edittext", [0,0,50,20], '200');
    scaleInputValue.helpTip = "Please only enter integers within the range of 0 to 999";
            
    //create group for csv file
    var csvGroup = mergedInputWindow.add("group");
    csvGroup.alignment = "left";
    
    csvGroup.add("statictext", undefined, 'Select the CSV file containing the relevant capstone data: ');
    var fileNameInput = csvGroup.add("edittext", [0,0,100,20], '');
    var buttonBrowse = csvGroup.add("button", undefined, 'Browse');
    //retrieve file name on browse
    buttonBrowse.onClick = function () {
        var fileCSV = File.openDialog("Select a CSV File", '*.csv');
        if(fileCSV != null){
            fileNameInput.text = fileCSV.name;
            output[2] = fileCSV.fsName;
            }
        else {
            fileNameInput.text = '';
            }
        }
    
    //create button group
    var buttonGroup = mergedInputWindow.add("group");
    buttonGroup.alignment = "right";
    
    var buttonSubmit = buttonGroup.add("button", undefined, 'OK');
    var buttonCancel = buttonGroup.add("button", undefined, 'Cancel');
    
    buttonCancel.onClick = function (){
        output[0] = -1;
        mergedInputWindow.close();
        }
    
    buttonSubmit.onClick = function (){
        //check if either field are empty
        if(scaleInputValue.text === null || fileNameInput.text === ''){
            incompleteFormError();
            output[0] = 0;
            }
        else {
            //since not empty, check if scale is inputted correctly via regex match
            if(!checkRegex(scaleInputValue.text)){
                invalidIntegerInputError();
                output[0] = 0;
                }
            else {
                //scale is correct, assign to output. assign filepath to output as well
                output[1] = scaleInputValue.text;
                output[0] = 1;
                }
            }
        mergedInputWindow.close();
        }
    
    mergedInputWindow.show();
    return output;
    }

/**
    * status - completed
    * general function to check for regex
    * @param   inputText    the text to check against the regex
    * @return   boolean       if match return true, else false
    */
function checkRegex(inputText){
    var regexValueScale = /^[1-9]{1}([0-9]{1,3})?$/;
    if(!regexValueScale.test(inputText)){
        return false;
        }
    else{
        return true;
        }
    }

/**
    * status - inprogress
    * quick check to ensure industry is of legal input
    * @param    cell    the cell value
    */
function industryCheck(cell){
    
        var industryArray = ["Aerospace", "Maritime", "IT", "Electronics", "Architecture", "Energy", "Entertainment", "Finance", "Healthcare", "Transport", "Media"];
        
        for(var i = 0; i < industryArray.length; i++){
            if(cell === industryArray[i]){
                return 1;
                }
            }
        return 0;
        }
        
/**
    * status - pending check
    * takes in active document, array, and pathname. reads csv file of specific format and save into array
    * @param    myDoc   the current document being worked on
    * @param    array   array to save the information into
    * @param    pathName    the full pathName to the required csv file
    * @param    scale       the scale of the floorplan
    * @return    value (literal)      check if the script can proceed
    */
var excelCapstone = [];
function capstoneBoundary(myDoc, array, pathName, scale){
       
    var fileCSV = File(pathName);
    
    //if file does not exist
    if(!fileCSV.exists){
        missingFileError();
        return -1;
        }
    
    //if the file exists
    fileCSV.open('r');
    var contentCSV = fileCSV.read();
    fileCSV.close();
    
    //split the lines
    var lines = contentCSV.split('\n');
    var keys = lines[0].split(',');
    
    for(var k = 0; k < lines.length; k++){
        var data = lines[k].split(',');
        excelCapstone.push(data);
        }
    
    //for loop through the rest of the CSV file to create the capstone boundaries and store
    for(var i = 1; i < lines.length; i++){
        var obj = {};
        
        var cells = lines[i].split(',');
        var showcaseLengthInMillimeters = cells[4] * 1000;
        var showcaseWidthInMillimeters = cells[5] * 1000;
        var showcaseLengthInPoints = showcaseLengthInMillimeters / (scale * 0.3528);
        var showcaseWidthInPoints = showcaseWidthInMillimeters / (scale * 0.3528);
        var assignedValue = false;
        
        // set column 15 in the csv file to be the value "assigned"
        if(cells.length > 14){
            if(cells[14] == "true"){
                assignedValue = true;
                }
            }
        
        var industry;
        var indCheck = industryCheck (cells[12]);
        if(indCheck === 1){ //legit industry
            industry = cells[12];
            }
        else {
            industry = "Other";
            }
        
        //add information into the object
        obj["capstone ID"] = cells[1];
        obj["project type"] = cells[3];
        obj["showcase length"] = showcaseLengthInMillimeters; //corresponding to y axis
        obj["showcase width"] = showcaseWidthInMillimeters; //corresponding to x axis
        obj["lengthInPoints"] = showcaseLengthInPoints;
        obj["widthInPoints"] = showcaseWidthInPoints;
        obj["assigned"] = assignedValue;
        obj["confirmed"] = false;
        obj["industry"] = industry;
        
        var strokeColor;
        if(cells[3] === "Software" || cells[3] === "Web-based"){
            strokeColor = new RGBColor();
            strokeColor.red = 255;
            strokeColor.blue = 0;
            strokeColor.green = 0;
            obj["stroke color"] = strokeColor;
            array[1][0].push(obj);
            }
        else if(cells[3] === "Hardware"){
            strokeColor = new RGBColor();
            strokeColor.red = 0;
            strokeColor.blue = 255;
            strokeColor.green = 0;
            obj["stroke color"] = strokeColor;
            array[1][1].push(obj);
            }
        }
    return 1;
    }

/**
    * status - pending check
    * takes in active document and array and add the information regarding drawn boundary lines into array
    * @param    myDoc   the current document being worked on
    * @param    array   the array to store information into
    */
function boundaryReference(myDoc, array, scale){
    
    //retrieve selection length
    var selectionLength = myDoc.selection.length; 
    var softwareCount = 0;
    var hardwareCount = 0;
    var mixedCount = 0;
    
    //start loop
    for(var k = 0; k < selectionLength; k++){
        
        //create object
        var obj = {};
        
        //set up the coordinate reference
        myDoc.artboards.setActiveArtboardIndex(0);
        myDoc.rulerOrigin = [0,0];
        
        var bSel = myDoc.selection[k];
        
        //standardise boundary characteristics
        bSel.opacity = 100.0;
        bSel.filled = false;
        bSel.stroked = true;
        
        //get stroke colours
        var bSelRed = bSel.strokeColor.red; //get value of red
        var bSelBlue = bSel.strokeColor.blue; //get value of blue
        var bSelGreen = bSel.strokeColor.green; //get value of green        
        
        var bRotation;
        var bHeight;
        var bWidth;
        var topLeftX;
        var topLeftY;
        var bottomRightX;
        var bottomRightY;
        //check rotation of boundary drawn
        //if unrotated, get the height and height of the boundary
        if(bSel.tags.length === 0){
            bRotation = 0;
            bHeight = bSel.height;
            bWidth = bSel.width;
            topLeftX = bSel.geometricBounds[0]; //top left X coordinate
            topLeftY = bSel.geometricBounds[1]; //top left Y coordinate
            bottomRightX = bSel.geometricBounds[2]; //bottom right X coordinate
            bottomRightY = bSel.geometricBounds[3]; //bottom right Y coordinate
            }
        //if there is a rotation involved
        else if(bSel.tags.length !== 0 && bSel.tags[0].name == "BBAccumRotation"){
            bRotation = 180*bSel.tags[0].value/Math.PI; //save in degrees
            $.writeln("check rotate: " + bRotation);
            
            //rotated to the left
            if(bRotation >= 0){
                //search for the top left corner and the bottom right corner coordinates
                for(var i = 0; i < 4; i++){
                    if(bSel.pathPoints[i].anchor[0] === bSel.geometricBounds[0]){
                        topLeftX = bSel.pathPoints[i].anchor[0];
                        topLeftY = bSel.pathPoints[i].anchor[1];
                        }
                    else if(bSel.pathPoints[i].anchor[0] === bSel.geometricBounds[2]){
                        bottomRightX = bSel.pathPoints[i].anchor[0];
                        bottomRightY = bSel.pathPoints[i].anchor[1];
                        }
                    }
                bWidth = (bSel.geometricBounds[1] - topLeftY) / Math.sin(bSel.tags[0].value);
                bHeight = (topLeftY - bSel.geometricBounds[3]) / Math.cos(bSel.tags[0].value);
                } 
            //rotated to the right
            else {
                for(var i = 0; i < 4; i++){
                    if(bSel.pathPoints[i].anchor[1] === bSel.geometricBounds[1]){
                        topLeftX = bSel.pathPoints[i].anchor[0];
                        topLeftY = bSel.pathPoints[i].anchor[1];
                        }
                    else if (bSel.pathPoints[i].anchor[1] === bSel.geometricBounds[3]){
                        bottomRightX = bSel.pathPoints[i].anchor[0];
                        bottomRightY = bSel.pathPoints[i].anchor[1];
                        }
                    }
                bWidth = (bSel.geometricBounds[2] - topLeftX) / Math.cos(-1*bSel.tags[0].value);
                bHeight = (topLeftX - bSel.geometricBounds[0]) / Math.sin(-1* bSel.tags[0].value);
                }
            }
        
        var bArea = bSel.area;
        
        //generate name of the boundary
        var name;
        var type;
        //assign name based on the colour of the boundary
        if(bSelRed === 255 && bSelBlue === 0 && bSelGreen === 0){
            //software only boundary
            softwareCount += 1;
            if(softwareCount <= 9){
                name = 's0' + softwareCount;
                }
            else {
                name = 's' + softwareCount;
                }
            type = 'software';
            }
        
        else if(bSelRed === 0 && bSelBlue === 255 && bSelGreen === 0){
            //hardware only boundary
            hardwareCount += 1;
            if(hardwareCount <= 9){
                name = 'h0' + hardwareCount;
                }
            else {
                name = 'h' + hardwareCount;
                }
            type = 'hardware';
            }
        
        else if(bSelRed === 0 && bSelBlue === 0 && bSelGreen === 255){
            //mixed boundary
            mixedCount += 1;
            if(mixedCount <= 9){
                name = 'm0' + mixedCount;
                }
            else {
                name = 'm' + mixedCount;
                }
            type = 'mixed';
            }
        
        else {
            //default assign to mixed and set the colours
            var defaultMixed = new RGBColor();
            defaultMixed.red = 0;
            defaultMixed.blue = 0;
            defaultMixed.green = 255;
            bSel.strokeColor = defaultMixed;
            mixedCount += 1;
            if(mixedCount <= 9){
                name = 'm0' + mixedCount;
                }
            else {
                name = 'm' + mixedCount;
                }
            type = 'mixed';
            }
        
        //create the industry object tag
        var industries = {};
        industries["Aerospace"] = 0;
        industries["Maritime"] = 0;
        industries["IT"] = 0;
        industries["Electronics"] = 0;
        industries["Architecture"] = 0;
        industries["Energy"] = 0;
        industries["Entertainment"] = 0;
        industries["Finance"] = 0;
        industries["Healthcare"] = 0;
        industries["Transport"] = 0;
        industries["Media"] = 0;
        industries["Other"] = 0;
        
        //create groupitem of the boundary
        var groupItem = myDoc.groupItems.add();
        bSel.moveToBeginning(groupItem);
        
        var text = groupItem.textFrames.add();
        text.contents = name;
        text.position = Array(topLeftX, topLeftY + 10);
        text.textRange.size = 5;
        text.rotate(bRotation);
        
        groupItem.name = name;
        bSel.name = name;
        
        //add into object
        obj["name"] = name;
        obj["type"] = type;
        obj["area"] = bArea;
        obj["height"] = bHeight;
        obj["width"] = bWidth;
        obj["top left X"] = topLeftX;
        obj["top left Y"] = topLeftY;
        obj["bottom right X"] = bottomRightX;
        obj["bottom right Y"] = bottomRightY;
        
        obj["check width top"] = bWidth;
        obj["check width bottom"] = bWidth;
        obj["check height limit"] = bHeight;
        obj["check top left X"] = topLeftX;
        obj["check top left Y"] = topLeftY;
        obj["check bottom right X"] = bottomRightX;
        obj["check bottom right Y"] = bottomRightY;
        obj["rotation"] = bRotation;
        obj["industries"] = industries;
        
        //append into relevant array
        //if software: [0][0]
        //if hardware: [0][1]
        //if mixed: [0][2]
        if(type === 'software'){
            array[0][0].push(obj);
            }
        else if(type === 'hardware'){
            array[0][1].push(obj);
            }
        else if(type === 'mixed'){
            array[0][2].push(obj);
            }
        }
    }    

/**
    * status - pending check
    * general algorithm for top and bottom assignment. assign along the top width for all stated boundaries before assigning bottom
    * @param    myDoc   current document being worked on
    * @param    arrayBoundary   specific nested array of boundaries
    * @param    arrayCapstone   specific nested array of capstone information
    * @param    scale       scale for limits
    */
function generalAllocation(myDoc, arrayBoundary, arrayCapstone, scale){
    
    // CHECK FOR WEIRD INPUTS FOR CAPSTONE PROJECTS
    var droppedInvalids = [];
    for(var i = 0; i < arrayCapstone.length; i++){
        var numberType = typeof(1.0);
        var projNum = i + 1
        if(typeof(arrayCapstone[i]["showcase length"]) != numberType || typeof(arrayCapstone[i]["showcase width"]) != numberType){
            var strInput = 'Non-integer values passed in as parameters for height and width: project ' + projNum
            alert (strInput);
            droppedInvalids.push(i);
            }
        if(arrayCapstone[i]["showcase length"] < 0 || arrayCapstone[i]["lengthInPoints"] < 0){
            var strInput = 'Negative values passed in as parameters for height and width: project ' + projNum
            alert (strInput);
            droppedInvalids.push(i);
            }
        else if(arrayCapstone[i]["showcase width"] < 0 || arrayCapstone[i]["widthInPoints"] < 0){
            var strInput = 'Negative values passed in as parameters for height and width: project ' + projNum
            alert (strInput);
            droppedInvalids.push(i);
            }
        }
        
    if(arrayBoundary.length !== 0){
        //start the loop
        for(var i = 0; i < arrayBoundary.length; i++){
            
            //set up coordinate reference to be consistent
            myDoc.artboards.setActiveArtboardIndex(0);
            myDoc.rulerOrigin = [0,0];
            
            //fit along the top width first
            if(arrayBoundary[i]["check width top"] >= 2*1000/(scale*0.3528)){
                for(var j = 0; j < arrayCapstone.length; j++){
                    
                    //only assign if UNASSIGNED, FIT HEIGHT, FIT LEFTOVER WIDTH, and boundary does not have the industry yet
                    var checkIndustry = arrayCapstone[j]["industry"];
                    if(arrayCapstone[j]["assigned"] === false && arrayBoundary[i]["height"] >= arrayCapstone[j]["lengthInPoints"] && arrayBoundary[i]["check width top"] >= arrayCapstone[j]["widthInPoints"] && arrayBoundary[i]["industries"][checkIndustry] === 0){
                        //can be assigned
                        //update the height limit if the capstone group lowers the height allowance remaining
                        if(arrayBoundary[i]["check height limit"] > (arrayBoundary[i]["height"] - arrayCapstone[j]["lengthInPoints"])){
                            
                            arrayBoundary[i]["check height limit"] = arrayBoundary[i]["height"] - arrayCapstone[j]["lengthInPoints"];
                            }
                        
                        //draw the capstone group out
                        //top left y, top left x, width, height
                        var capstone = myDoc.pathItems.rectangle(arrayBoundary[i]["check top left Y"], arrayBoundary[i]["check top left X"], arrayCapstone[j]["widthInPoints"], arrayCapstone[j]["lengthInPoints"]);
                        capstone.rotate(arrayBoundary[i]["rotation"], undefined, undefined, undefined, undefined, Transformation.TOPLEFT);
                        capstone.filled = true;
                        capstone.stroked = true;
                        capstone.strokeWeight = 0.25;
                        capstone.strokeColor = arrayCapstone[j]["stroke color"];
                        
                        var groupItem = myDoc.groupItems.add();
                        capstone.moveToBeginning(groupItem);
                        
                        var text = groupItem.textFrames.add();
                        text.contents = arrayCapstone[j]["capstone ID"];
                        text.position = Array(capstone.pathPoints[1].anchor[0] +3, capstone.pathPoints[1].anchor[1] +2);
                        text.textRange.size = 5;
                        text.rotate(arrayBoundary[i]["rotation"], undefined, undefined, undefined, undefined, Transformation.TOPLEFT);
                        
                        groupItem.name = arrayCapstone[j]["capstone ID"];
                        
                        //update the industry count for this boundary
                        arrayBoundary[i]["industries"][checkIndustry] = arrayBoundary[i]["industries"][checkIndustry] + 1;
                        
                        //update the width limits
                        arrayBoundary[i]["check width top"] -= arrayCapstone[j]["widthInPoints"];
                        
                        //update top left X and top left Y by assignment
                        arrayBoundary[i]["check top left X"] = capstone.pathPoints[2].anchor[0];
                        arrayBoundary[i]["check top left Y"] = capstone.pathPoints[2].anchor[1];

                        //update status of the assignment of the capstone
                        arrayCapstone[j]["assigned"] = true;
                        }
                    //if the group cannot be assigned
                    else { continue; }
                    }
                }
            }
        
        //now for bottom row assignment
        for (var i = 0; i < arrayBoundary.length; i++){
            
            //coordinate reference
            myDoc.artboards.setActiveArtboardIndex(0);
            myDoc.rulerOrigin = [0,0];
            
            if(arrayBoundary[i]["check width bottom"] >= 2*1000/(scale*0.3528)){
                for(var j = 0; j < arrayCapstone.length; j++){
                    
                    var checkIndustry = arrayCapstone[j]["industry"];
                    //only assign if UNASSIGNED, HEIGHT LIMIT, SUFFICIENT REMAINING WIDTH and industry not in boundary
                    if(arrayCapstone[j]["assigned"] === false && arrayBoundary[i]["check height limit"] >= arrayCapstone[j]["lengthInPoints"] && arrayBoundary[i]["check width bottom"] >= arrayCapstone[j]["widthInPoints"] && arrayBoundary[i]["industries"][checkIndustry] === 0){
                        var topLeftX = arrayBoundary[i]["check bottom right X"] - arrayCapstone[j]["widthInPoints"];
                        var topLeftY = arrayBoundary[i]["check bottom right Y"] + arrayCapstone[j]["lengthInPoints"];
                        var capstone = myDoc.pathItems.rectangle(topLeftY, topLeftX, arrayCapstone[j]["widthInPoints"], arrayCapstone[j]["lengthInPoints"]);
                        capstone.rotate(arrayBoundary[i]["rotation"], undefined, undefined, undefined, undefined, Transformation.BOTTOMRIGHT);
                        capstone.filled = true;
                        capstone.stroked = true;
                        capstone.strokeWeight = 0.25
                        capstone.strokeColor = arrayCapstone[j]["stroke color"];
                        
                        var groupItem = myDoc.groupItems.add();
                        capstone.moveToBeginning(groupItem);
                        
                        var text = groupItem.textFrames.add();
                        text.contents = arrayCapstone[j]["capstone ID"];
                        text.position = Array(capstone.pathPoints[1].anchor[0] + 3, capstone.pathPoints[1].anchor[1] +2);
                        text.textRange.size = 5;
                        text.rotate(arrayBoundary[i]["rotation"], undefined, undefined, undefined, undefined, Transformation.TOPLEFT);
                        
                        groupItem.name = arrayCapstone[j]["capstone ID"];
                        
                        //update the boundary industries count
                        arrayBoundary[i]["industries"][checkIndustry] = arrayBoundary[i]["industries"][checkIndustry] + 1;
                        
                        //update the width limits
                        arrayBoundary[i]["check width bottom"] -= arrayCapstone[j]["widthInPoints"];
                        
                        //update bottom right X  and Y by reassignment
                        arrayBoundary[i]["check bottom right X"] = capstone.pathPoints[0].anchor[0];
                        arrayBoundary[i]["check bottom right Y"] = capstone.pathPoints[0].anchor[1];
                        
                        //update status of the assignment of the capstone
                        arrayCapstone[j]["assigned"] = true;
                        }
                    } 
                } else {continue;}
            }
        }
    return true;
    }  
          
/**
    * status - pending check
    * specific function that initiates the allocation
    * @param    myDoc   current document being worked on
    * @param    array       complete array containing all details
    * @param    scale       scale value to be passed on
    */
function initiateAlgorithm(myDoc, array, scale){
    
    //isolate allocations onto new layer
    myDoc.layers.add();
    
    //create boundary to contain unassigned
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
    
    //first allocate the software only to software boundary
    generalAllocation(myDoc, array[0][0], array[1][0], scale);
    
    //now allocate the hardware only to hardware boundary
    generalAllocation(myDoc, array[0][1], array[1][1], scale);
    
    //loop through the capstone groups and splice out those unassigned groups. push into array[1][2]
    var newArray = [];
    
    for(var i = 0; i < array[1][0].length; i++){
        if(array[1][0][i]["assigned"] === false){
            var removed = array[1][0][i];
            newArray.push(removed);
            }
        }
    for(var i = 0; i < array[1][1].length; i++){
        if(array[1][1][i]["assigned"] === false){
            var removed = array[1][1][i];
            newArray.push(removed);
            }
        }
        
    var current = 0; //if 0, splice from front, if 1, splice from back
    var removed;
    //mix up the content of newArray and push into array[1][2]
    while(newArray.length !== 0){
        if(newArray.length === 1){
            removed = newArray.pop();
            array[1][2].push(removed);
            }
        else if(current%2 === 0){
            removed = newArray.shift();
            array[1][2].push(removed);
            }
        else if(current%2 === 1){
            removed = newArray.pop();
            array[1][2].push(removed);
            }
        current += 1;
        }     
       
    //mixed allocation
    generalAllocation(myDoc, array[0][2], array[1][2], scale);
        
    //draw out the unassigned capstone groups   
    for(var i = 0; i < array[1][2].length; i++){
        if(array[1][2][i]["assigned"] === false){
            var uC = myDoc.pathItems.rectangle(-20,0,array[1][2][i]["widthInPoints"], array[1][2][i]["lengthInPoints"]);
            uC.stroked = true;
            uC.filled = true;
            uC.strokeWeight = 0.5;
            uC.strokeColor = array[1][2][i]["stroke color"];
            
            var groupItem = myDoc.groupItems.add();
            uC.moveToBeginning(groupItem);
            
            var text = groupItem.textFrames.add();
            text.contents = array[1][2][i]["capstone ID"];
            text.position = Array( 2, -21);
            text.textRange.size = 5;
            
            groupItem.name = array[1][2][i]["capstone ID"];
            }
        else {continue;}
        }         
    }

/**
    * status - completed
    * creates a new csv file containing details on which capstone groups have been assigned
    * can be used again to conduct further allocations
    * @param    theCapstoneProjects     array containing details of all the capstone
    * @return     file      csv file saved in fixed directory
    */
function updateCSV(theCapstoneProjects){
    var toWrite;
    // capstones will be a list that stores all the objects (software, hardware, mixed capstones)
    var capstones = [];
    
    var scriptFolderPath = File($.fileName).path; // the URI of the folder that contains the script file    
    var TimerFolderPath = scriptFolderPath + encodeURI("/updated_files"); // the URI of the folder for your script resources    
    var filename;
    
    
    var pathItemsInput = new Window("dialog", 'Input name for updated CSV file');
    pathItemsInput.add("statictext", undefined, 'An updated CSV file has been created and will be saved');
    pathItemsInput.add("statictext", undefined, 'It will be saved in a folder named \"updated_files\" in the SAME directory as the location of this script');
    pathItemsInput.add("statictext", undefined, 'Please input a new name for this CSV file and do NOT add any file extensions (.csv)\n');
        
    var inputGroup = pathItemsInput.add("group");
    inputGroup.alignment = "left";
    
    
    inputGroup.add("statictext", undefined, 'Enter name for new CSV file to be saved');
    var userInputValue = inputGroup.add("edittext", [0,0,200,20], 'updated_assignments'); // [ x, y, width, height ]
    userInputValue.helpTip = "Please only enter alphanumeric values.";
      
    //adding buttons in
    var buttons = pathItemsInput.add("group");
    buttons.alignment = "right";
    var buttonSubmit = buttons.add("button", undefined, 'OK');
    var buttonCancel = buttons.add("button", undefined, 'Cancel');
    
    //adding functions to the buttons
    buttonSubmit.onClick = function () {
        filename = userInputValue.text;
        pathItemsInput.close();
    }
    
    buttonCancel.onClick = function () {
        //if the window is cancelled, break out of script completely
        filename = "UPDATEDASSIGNMENTS";
        pathItemsInput.close();
        }
    
    //show the window
    pathItemsInput.show();
    
        
    var realfile = "/" + filename + ".csv";
    
    var fileObj = new File(TimerFolderPath + encodeURI(realfile));
    // File.write(content);
    
    var encoding = "utf-8";
    var parentFolder = fileObj.parent;
    if (!parentFolder.exists && !parentFolder.create())
        throw new Error("Cannot create file in path " + fileObj.fsName);
    fileObj.encoding = encoding;
    fileObj.open("w");
    
    for(var i = 0; i < 2; i++){
        for(var j = 0; j < theCapstoneProjects[i].length; j++){
            capstones.push(theCapstoneProjects[i][j]);
            }
        }
    
    for(var i = 0; i < excelCapstone[0].length; i++){
        // copy the values into the csv file
        // write a comma
        fileObj.write(excelCapstone[0][i]);
        fileObj.write(',');
        }
    fileObj.write('\n');
    // write newline ('\n')
    
    for(var i = 1; i < excelCapstone.length; i++){
        if(excelCapstone[i].length == 15){
            for(var j = 0; j < excelCapstone[i].length; j++){
                if(j == 14){
                    for(var k = 0; k < capstones.length; k++){
                        if(capstones[k]["capstone ID"] == excelCapstone[i][1]){
                            // use the value of capstones[k]["assigned"]
                            // write a comma
                            fileObj.write(capstones[k]["assigned"]);
                            fileObj.write(',');
                            }
                        }
                    }
                else{
                    // copy the value of excelCapstone[i][j]
                    // write a comma
                    fileObj.write(excelCapstone[i][j]);
                    fileObj.write(',');
                    }
                }
            }
        else{
            for(var j = 0; j < excelCapstone[i].length; j++){
                if(j == 13){
                    for(var k = 0; k < capstones.length; k++){
                        if(capstones[k]["capstone ID"] == excelCapstone[i][1]){
                            // use the value of capstones[k]["assigned"]
                            // write a comma
                            fileObj.write(excelCapstone[i][j]);
                            fileObj.write(',');
                            fileObj.write(capstones[k]["assigned"]);
                            fileObj.write(',');
                            }
                        }
                    }
                else{
                    // copy the value of excelCapstone[i][j]
                    // write a comma
                    fileObj.write(excelCapstone[i][j]);
                    fileObj.write(',');
                    }
                }
            }
        // write a newlines ('\n')
        fileObj.write('\n');
        }
    fileObj.close();
    }

/**
    * status - completed
    * checks permission of scripts
    */
function canWriteFiles() {
    if (isSecurityPrefSet()) return true;
    alert(script.name + " requires access to write files.\n" +
        "Go to the \"General\" panel of the application preferences and make sure " +
        "\"Allow Scripts to Write Files and Access Network\" is checked.");
    app.executeCommand(2359);
    return isSecurityPrefSet();
    function isSecurityPrefSet() {
        return app.preferences.getPrefAsLong(
            "Main Pref Section",
            "Pref_SCRIPTING_FILE_NETWORK_SECURITY"
        ) === 1;
    }
}


/**
    * status - in progress
    * removes all unassigned groups prior to rerunning the script
    * @param  myDoc  the active document being worked on right now
    */
function clearAllUnassigned(myDoc){
       
    for(var i = 0; i < myDoc.groupItems.length; i++){
        if(myDoc.groupItems[i].position[1] < 0){
            myDoc.groupItems[i].remove();
            i = -1;
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

/**
    * status - completed
    * displays window that notifies incomplete merged input completion
    */
function incompleteFormError(){
    var iFE = new Window("dialog", 'incompleteFormError');
    iFE.add("statictext", undefined, 'Please fill in all the fields.');
    
    iFE.show();
    }

/**
    * status - completed
    * displays windows to announce successful completion of script
    */
function scriptSuccess(arrayCapstone){
    var sS = new Window("dialog", 'scriptSuccess');
    sS.add("statictext", undefined, 'The script has completed successfully. Terminating now.');
    
    sS.show();
    }

/**************** MAIN ****************/
function main(){
    
    var banana = app.activeDocument;
    
    var dataArray = [[ [],[],[] ], [ [],[],[] ]]; //0 for boundaries, 1 for capstone
    //[0][0]: red, [0][1]: blue, [0][2]: green
    //[1][0]: software, [1][1]: hardware, [1][2]: mixed
    
    clearAllUnassigned(banana);

    while(1){
                
        //check if TODO are completed
        var checkTODO = checkNewLayerAndBoundaries(banana);
        //if 0, keep retrying
        while(checkTODO === 0){
            checkTODO = checkNewLayerAndBoundaries(banana);
            }
        //if -1, break out completely
        if(checkTODO === -1){
            terminatingScript();
            break;
            }
        //else continue
            
        
        var mergedCheck = mergedInputs(banana);
        //if output[0] === 0, keep retrying
        while(mergedCheck[0] === 0){
            mergedCheck = mergedInputs(banana);
            }
        //if output[0] === -1, break out completely
        if(mergedCheck[0] === -1){
            terminatingScript();
            break;
            }
        //else declare corresponding variables
        var scaleValue = mergedCheck[1];
        var csvPathName = mergedCheck[2];
        
        
        var capstoneBounds = capstoneBoundary(banana, dataArray, csvPathName, scaleValue);
        //if there is incorrect file input, terminate script and redo mergedInputs
        if(capstoneBounds === -1){
            terminatingScript();
            break;
            }
        //else continue with the rest of the script
        
        boundaryReference(banana, dataArray, scaleValue);
        
        initiateAlgorithm(banana, dataArray, scaleValue);        
        
        scriptSuccess();
        
        updateCSV(dataArray[1]);
        
        break;
    }
}
    
    
main();
