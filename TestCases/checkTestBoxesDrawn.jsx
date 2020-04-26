var proj1height = Math.round(10/0.3528);
var proj1width = Math.round(20/0.3528);
var count = 0;

function checkDrawnBoxes(myDoc){
    var selectionLength = myDoc.pathItems.length;
    $.writeln('Selection length: ', selectionLength);
    for(var k = 0; k < selectionLength; k++){
        var bSel = myDoc.pathItems[k];
        var obj = {};
        var bHeight = Math.round(bSel.height);
        var bWidth = Math.round(bSel.width);
        $.writeln(bHeight, ', ', bWidth);
        $.writeln(proj1height, ', ', proj1width);
        if(bHeight === proj1height && bWidth === proj1width){
            var newWin = new Window("dialog", 'Box drawn');
            var projNum = k + 1;
            var strInput = 'Algorithm drew project' + projNum
            newWin.add("statictext", undefined, strInput);
            newWin.show();
            count++;
            }
        }
    }

var banana = app.activeDocument;
checkDrawnBoxes(banana);

if(count != 4){
    var newWin = new Window("dialog", 'Test failed');
    newWin.add("statictext", undefined, 'Incorrect number of boxes drawn');
    newWin.show();
    }
else{
    var newWin = new Window("dialog", 'Test passed');
    newWin.add("statictext", undefined, 'Correct number of boxes drawn');
    newWin.show();
    }