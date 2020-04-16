/*
Function to test checkRegex function:

Inputs strings and integers as parameters to checkRegex function
Expects integer and string values that are between 1 - 999 to pass
checkRegex should return true for values that are between 1-999
*/
function testCheckRegex(){
    
    var testValues = [123, "123", "onetwothree", "1g", "10%", 0, 999, 1000, -1];
    var returnBool = checkRegex(testValues[0]);
    if(!returnBool){
        var regexWindow = new Window("dialog", 'Regex test');
        regexWindow.add("statictext", undefined, 'Regex function failed: test 1');
        regexWindow.add("statictext", undefined, 'Expected value: true');
        regexWindow.add("statictext", undefined, 'Return value: false');
        regexWindow.show();
        }
    else{
        var regexWindow = new Window("dialog", 'Regex test');
        regexWindow.add("statictext", undefined, 'Regex function passed test 1');
        regexWindow.show();
        }
 

    returnBool = checkRegex(testValues[1]);
    if(!returnBool){
        var regexWindow = new Window("dialog", 'Regex test');
        regexWindow.add("statictext", undefined, 'Regex function failed: test 2');
        regexWindow.add("statictext", undefined, 'Expected value: true');
        regexWindow.add("statictext", undefined, 'Return value: false');
        regexWindow.show();
        }
    else{
        var regexWindow = new Window("dialog", 'Regex test');
        regexWindow.add("statictext", undefined, 'Regex function passed test 2');
        regexWindow.show();
        }
    
    returnBool = checkRegex(testValues[2]);
    if(returnBool){
        var regexWindow = new Window("dialog", 'Regex test');
        regexWindow.add("statictext", undefined, 'Regex function failed: test 3');
        regexWindow.add("statictext", undefined, 'Expected value: true');
        regexWindow.add("statictext", undefined, 'Return value: false');
        regexWindow.show();
        }
    else{
        var regexWindow = new Window("dialog", 'Regex test');
        regexWindow.add("statictext", undefined, 'Regex function passed test 3');
        regexWindow.show();
        }
    
    returnBool = checkRegex(testValues[3]);
    if(returnBool){
        var regexWindow = new Window("dialog", 'Regex test');
        regexWindow.add("statictext", undefined, 'Regex function failed: test 4');
        regexWindow.add("statictext", undefined, 'Expected value: true');
        regexWindow.add("statictext", undefined, 'Return value: false');
        regexWindow.show();
        }
    else{
        var regexWindow = new Window("dialog", 'Regex test');
        regexWindow.add("statictext", undefined, 'Regex function passed test 4');
        regexWindow.show();
        }
    
    returnBool = checkRegex(testValues[4]);
    if(returnBool){
        var regexWindow = new Window("dialog", 'Regex test');
        regexWindow.add("statictext", undefined, 'Regex function failed: test 5');
        regexWindow.add("statictext", undefined, 'Expected value: true');
        regexWindow.add("statictext", undefined, 'Return value: false');
        regexWindow.show();
        }
    else{
        var regexWindow = new Window("dialog", 'Regex test');
        regexWindow.add("statictext", undefined, 'Regex function passed test 5');
        regexWindow.show();
        }
    
    returnBool = checkRegex(testValues[5]);
    if(returnBool){
        var regexWindow = new Window("dialog", 'Regex test');
        regexWindow.add("statictext", undefined, 'Regex function failed: test 6');
        regexWindow.add("statictext", undefined, 'Expected value: true');
        regexWindow.add("statictext", undefined, 'Return value: false');
        regexWindow.show();
        }
    else{
        var regexWindow = new Window("dialog", 'Regex test');
        regexWindow.add("statictext", undefined, 'Regex function passed test 6');
        regexWindow.show();        
        }
    
    returnBool = checkRegex(testValues[6]);
    if(!returnBool){
        var regexWindow = new Window("dialog", 'Regex test');
        regexWindow.add("statictext", undefined, 'Regex function failed: test 7');
        regexWindow.add("statictext", undefined, 'Expected value: true');
        regexWindow.add("statictext", undefined, 'Return value: false');
        regexWindow.show();
        }
    else{
        var regexWindow = new Window("dialog", 'Regex test');
        regexWindow.add("statictext", undefined, 'Regex function passed test 7');
        regexWindow.show();
        }
    
    returnBool = checkRegex(testValues[7]);
    if(returnBool){
        var regexWindow = new Window("dialog", 'Regex test');
        regexWindow.add("statictext", undefined, 'Regex function failed: test 8');
        regexWindow.add("statictext", undefined, 'Expected value: true');
        regexWindow.add("statictext", undefined, 'Return value: false');
        regexWindow.show();
        }
    else{
        var regexWindow = new Window("dialog", 'Regex test');
        regexWindow.add("statictext", undefined, 'Regex function passed test 8');
        regexWindow.show();
        }
    
    returnBool = checkRegex(testValues[8]);
    if(returnBool){
        var regexWindow = new Window("dialog", 'Regex test');
        regexWindow.add("statictext", undefined, 'Regex function failed: test 9');
        regexWindow.add("statictext", undefined, 'Expected value: true');
        regexWindow.add("statictext", undefined, 'Return value: false');
        regexWindow.show();
        }
    else{
        var regexWindow = new Window("dialog", 'Regex test');
        regexWindow.add("statictext", undefined, 'Regex function passed test 9');
        regexWindow.show();
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