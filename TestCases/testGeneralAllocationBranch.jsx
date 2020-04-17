/*
BRANCH COVERAGE TEST

With the exception of the code in generalAllocation function used to check for invalid inputs, 
this test will provide inputs which will cover all branches in generalAllocation.

Purpose of this test is to ensure all executable code in generalAllocation is ran and that no
abnormal behaviour will arise from running the code
*/

function testGeneralAllocationBranch(myDoc){
    var arrayBoundary = [];
    var arrayCapstone = [];
    
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

    var name = "boundarybox1";
    var type = "software";
    var bArea = 4;
    
    var topLeftX = 539;
    var topLeftY = 612;
    var bottomRightX = 796;
    var bottomRightY = 535;
    
    // given these values, height and width of boundary box is 27.1656mm and 90.6696mm respectively
    var bWidth = bottomRightX - topLeftX;
    var bHeight = topLeftY - bottomRightY;
    
    var bRotation = 0;
    
    var obj = {};
    var capstone = {};
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
    
    var obj2 = {};
    obj2["name"] = "boundary box 2";
    obj2["type"] = "software";
    obj2["area"] = bArea;
    obj2["height"] = 150;
    obj2["width"] = bWidth;
    obj2["top left X"] = topLeftX;
    obj2["top left Y"] = topLeftY;
    obj2["bottom right X"] = bottomRightX;
    obj2["bottom right Y"] = bottomRightY;
    
    obj2["check width top"] = bWidth;
    obj2["check width bottom"] = bWidth;
    obj2["check height limit"] = 100;
    obj2["check top left X"] = topLeftX;
    obj2["check top left Y"] = topLeftY;
    obj2["check bottom right X"] = bottomRightX;
    obj2["check bottom right Y"] = bottomRightY;
    obj2["rotation"] = bRotation;
    obj2["industries"] = industries;
    
    var obj3 = {};
    obj["name"] = "boundary box 3";
    obj["type"] = "software";
    obj["area"] = bArea;
    obj["height"] = bHeight;
    obj["width"] = bWidth;
    obj["top left X"] = topLeftX;
    obj["top left Y"] = topLeftY;
    obj["bottom right X"] = bottomRightX;
    obj["bottom right Y"] = bottomRightY;
    
    obj["check width top"] = bWidth;
    obj["check width bottom"] = 10;
    obj["check height limit"] = bHeight;
    obj["check top left X"] = topLeftX;
    obj["check top left Y"] = topLeftY;
    obj["check bottom right X"] = bottomRightX;
    obj["check bottom right Y"] = bottomRightY;
    obj["rotation"] = bRotation;
    obj["industries"] = industries;
    
    var cells = ["test01", "software"];
    var showcaseLengthInMillimeters = 20;
    var showcaseWidthInMillimeters = 10;
    var showcaseLengthInPoints = showcaseLengthInMillimeters/0.3528;
    var showcaseWidthInPoints = showcaseWidthInMillimeters/0.3528;
    
    var showcaseLengthInMillimeters2 = 20;
    var showcaseWidthInMillimeters2 = 200;
    var showcaseLengthInPoints2 = showcaseLengthInMillimeters2/0.3528;
    var showcaseWidthInPoints2 = showcaseWidthInMillimeters2/0.3528;
    
    capstone["capstone ID"] = cells[0];
    capstone["project type"] = cells[1];
    capstone["showcase length"] = showcaseLengthInMillimeters; //corresponding to y axis
    capstone["showcase width"] = showcaseWidthInMillimeters; //corresponding to x axis
    capstone["lengthInPoints"] = showcaseLengthInPoints;
    capstone["widthInPoints"] = showcaseWidthInPoints;
    capstone["assigned"] = false;
    capstone["confirmed"] = false;
    capstone["industry"] = "IT";
    strokeColor = new RGBColor();
    strokeColor.red = 255;
    strokeColor.blue = 0;
    strokeColor.green = 0;
    capstone["stroke color"] = strokeColor;
    
    arrayBoundary.push(obj);
    arrayBoundary.push(obj2);
    arrayCapstone.push(capstone);
    
    capstone2 = {};
    capstone2["capstone ID"] = "Test02";
    capstone2["project type"] = "Hardware";
    capstone2["showcase length"] = showcaseLengthInMillimeters2; //corresponding to y axis
    capstone2["showcase width"] = showcaseWidthInMillimeters2; //corresponding to x axis
    capstone2["lengthInPoints"] = showcaseLengthInPoints2;
    capstone2["widthInPoints"] = showcaseWidthInPoints2;
    capstone2["assigned"] = false;
    capstone2["confirmed"] = false;
    capstone2["industry"] = "Electronics";
    capstone2["stroke color"] = strokeColor;
    
    capstone3 = {};
    capstone3["capstone ID"] = "Test03";
    capstone3["project type"] = "Software";
    capstone3["showcase length"] = showcaseLengthInMillimeters; //corresponding to y axis
    capstone3["showcase width"] = showcaseWidthInMillimeters; //corresponding to x axis
    capstone3["lengthInPoints"] = 10;
    capstone3["widthInPoints"] = showcaseWidthInPoints;
    capstone3["assigned"] = false;
    capstone3["confirmed"] = false;
    capstone3["industry"] = "Energy";
    capstone3["stroke color"] = strokeColor;
    
    var scale = 200;
    var allTrue = [];
    var checkPass1 = generalAllocation(myDoc, [], arrayCapstone, scale);
    allTrue.push(checkPass1);
    
    arrayCapstone.push(capstone2);
    arrayCapstone.push(capstone3);
    var checkPass2 = generalAllocation(myDoc, arrayBoundary, arrayCapstone, scale);
    allTrue.push(checkPass2);  
    
    drawBoundaryBoxes(myDoc, arrayBoundary);
    
    var checkPass = true;
    for(var j = 0; j < allTrue.length; j++){
        if(allTrue[j] = false){
            checkPass = false;
            }
        }
    
    if(!checkPass){
        var mFE = new Window("dialog", 'General Allocation terminated');
        mFE.add("statictext", undefined, 'Allocation function terminated without completion');
        mFE.show();
        }
    else{
        var mFE = new Window("dialog", 'Completion');
        mFE.add("statictext", undefined, 'All branches tested, allocation algorithm has terminated');
        mFE.show();
        }  
    }

function drawBoundaryBoxes(myDoc, arrayBoundary){
    // Draw all the boxes (boundary boxes)
    for(var i = 0; i < arrayBoundary.length; i++){
        var uCBStroke = new RGBColor();
        var topLeftX = 539;
        var topLeftY = 612;
        uCBStroke.red = 0;
        uCBStroke.green = 0;
        uCBStroke.blue = 0;
        var uCB = myDoc.pathItems.rectangle(topLeftY,topLeftX,arrayBoundary[i]["width"],arrayBoundary[i]["height"]);
        uCB.filled = false;
        uCB.stroked = true;
        uCB.strokeWeight = 0.5;
        uCB.strokeColor = uCBStroke;
        var unassignedGroup = myDoc.groupItems.add();
        uCB.moveToBeginning(unassignedGroup);
        }
    }


function generalAllocation(myDoc, arrayBoundary, arrayCapstone, scale){
    
    // CHECK FOR WEIRD INPUTS FOR CAPSTONE PROJECTS
    for(var i = 0; i < arrayCapstone.length; i++){
        var numberType = typeof(1.0);
        $.writeln(arrayCapstone[i]["lengthInPoints"], arrayCapstone[i]["showcase width"]);
        $.writeln(typeof(arrayCapstone[i]["showcase length"]), typeof(arrayCapstone[i]["showcase width"]));
        if(typeof(arrayCapstone[i]["showcase length"]) != numberType || typeof(arrayCapstone[i]["showcase width"]) != numberType){
            alert ('Non-integer values passed in as parameters for height and width');
            return false;
            }
        if(arrayCapstone[i]["showcase length"] < 0 || arrayCapstone[i]["lengthInPoints"] < 0){
            alert ('Negative values passed in for height');
            return false;
            }
        else if(arrayCapstone[i]["showcase width"] < 0 || arrayCapstone[i]["widthInPoints"] < 0){
            alert ('Negative values passed in for width');
            return false;
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
                    $.writeln("check height limit, lengthInPoints: ", arrayBoundary[i]["check height limit"], ", ", arrayCapstone[j]["lengthInPoints"]);
                    $.writeln("check width bottom, widthInPoints", arrayBoundary[i]["check width bottom"], ", ", arrayCapstone[j]["widthInPoints"]);
                    $.writeln(arrayBoundary[i]["industries"][checkIndustry]);
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
                }else {continue;}
            }
        }
    return true;
    }  


function main(){
    
    var banana = app.activeDocument;
    $.writeln("Display active document file path: " + banana.fullName);
    testGeneralAllocationBranch(banana);
}
    
    
main();
