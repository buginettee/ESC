### Test Cases for Adobe Illustrator

## Condition coverage: 
![Repo List](/TestCases/img/Condition.jpg)

In order for the project to be allocated a space (and be drawn in Adobe Illustrator), it must fulfil 2 conditions as shown above. The test values we are using are as such: 

var arrayWidth = [2000,10,500,73];
var arrayLength = [20,467,650,32];

Since the drawn box is of dimension: 411pt (Width) by 328pt (Length), we will cover the conditions false-true, true-false, false-false, true-true


## Fault-based coverage:
![Repo List](/TestCases/img/faultBasedOne.jpg)

As shown here, even though boundaries 1 and 2 have the same area, the student's project may not necessarily be allocated since it may not fit the required width or length


## Non-numerical values (Invalid input):
![Repo List](/TestCases/img/NonNumerical.jpg)

Given a non-numerical input for the project dimensions for the function "checkAndDrawBoxes", a prompt will be shown in Adobe Illustrator informing the user that a non-numerical value has been passed in as an input


## Negative values (Invalid input):
![Repo List](/TestCases/img/NegativeValues.jpg)

Given negative values for either project dimensions or boxes drawn by user in Adobe Illustrator, a prompt will be shown to inform the user.
