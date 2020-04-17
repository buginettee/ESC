# Test Cases for Adobe Illustrator

## Black-box testing

### Non-numerical values (Invalid input):
![Repo List](/TestCases/img/nonInt.jpg)

Given a non-numerical input for the project dimensions for the function "checkAndDrawBoxes", a prompt will be shown in Adobe Illustrator informing the user that a non-numerical value has been passed in as an input


### Negative values (Invalid input):
![Repo List](/TestCases/img/negValues.jpg)

Given negative values for either project dimensions or boxes drawn by user in Adobe Illustrator, a prompt will be shown to inform the user.

## White-box testing

### Fault-based testing:
For fault-based testing, there are two files, testGeneralAllocationDrawn.jsx and testGeneralAllocationDrawn2.jsx
In testGeneralAllocationDrawn:
```
Project 1: height = 10, width = 20, area = 7000
Project 2: height = 200, width = 20, area = 70000
Boundary has height 77, width 257, area = 19789

For test to pass:
Project 1 should be allocated
Project 2 should not be allocated
```
In testGeneralAllocationDrawn2, the input project's attribute "assigned" is set to true, so we would expect that the project would not be drawn
