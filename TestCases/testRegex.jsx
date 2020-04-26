/*
Function to test checkRegex function:

Inputs strings and integers as parameters to checkRegex function
Expects integer and string values that are between 1 - 999 to pass
checkRegex should return true for values that are between 1-999
*/
function testCheckRegex(){
    
    var expectedTrue = [123, "123", 999];
    var expectedFalse = ["onetwothree", "1g", "10%", 0, NaN, 1000, -1];
    
    for(var i = 0; i < expectedTrue.length; i++){
        var returnBool = checkRegex(expectedTrue[i]);
        if(!returnBool){
            var regexWindow = new Window("dialog", 'Regex test');
            var projectNum = i + 1;
            var strInput = "Regex function failed: test " + projectNum.toString();
            regexWindow.add("statictext", undefined, strInput);
            regexWindow.add("statictext", undefined, 'Expected value: true');
            regexWindow.add("statictext", undefined, 'Return value: false');
            regexWindow.show();
            }
        else{
            var regexWindow = new Window("dialog", 'Regex test');
            var projectNum = i + 1;
            var strInput = "Regex function passed test " + projectNum.toString();
            regexWindow.add("statictext", undefined, strInput);
            regexWindow.show();
            }
        }
    for(var j = 0; j < expectedFalse.length; j++){
        var returnBool = checkRegex(expectedFalse[j]);
        if(returnBool){
            var regexWindow = new Window("dialog", 'Regex test');
            var projectNum = i + j + 1;
            var strInput = "Regex function failed: test " + projectNum.toString();
            regexWindow.add("statictext", undefined, strInput);
            regexWindow.add("statictext", undefined, 'Expected value: true');
            regexWindow.add("statictext", undefined, 'Return value: false');
            regexWindow.show();
        }
        else{
            var regexWindow = new Window("dialog", 'Regex test');
            var projectNum = i + j + 1;
            var strInput = "Regex function passed test " + projectNum.toString();
            regexWindow.add("statictext", undefined, strInput);
            regexWindow.show();
            }
        }
    }

function checkRegex(inputText){
    var regexValueScale = /^[1-9]{1}([0-9]{1,2})?$/;
    if(!regexValueScale.test(inputText)){
        return false;
        }
    else{
        return true;
        }
    }

var myDoc = app.activeDocument;
testCheckRegex();