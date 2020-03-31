This folder contains the scripts to be used in Adobe Illustrator

01 Empty Floor Plan

Purpose: Given the original empty floor plan, the user is to draw the boundaries in order to mark out areas where the capstone booths can be allocated to. The script will then loop through all the boundaries and assign the capstone groups to the boundaries accordingly.
  
    Before running the script, please do the following:
   1. Create a brand new layer in the Illustrator file
   2. Draw all the boundaries on the new layer
   3. Select all the boundaries to be considered
   4. Open the script and manually change the pathname to the said illustrator file
   5. Run the script to get the first output from the algorithm



Objects

Project dimensions and user drawn boxes are stored in an array named 'array'

User drawn boxes (rectangles in Adobe Illustrator) attributes:
```
name                  - name of rectangle (starts at b000, increases by 1 for each box)
boundary              - refers to the groupItem this rectangle belongs to
area                  - area of rectangle
height                - height of rectangle (top-down)
width                 - width of rectangle (left-right)
top left X            - topLeftX of geometric object (rectangle)
top left Y            - topLeftY of geometric object (rectangle)
bottom right X        - bottom right X coordinate of geometric object (rectangle)
bottom right Y        - bottom right Y coordinate of geometric object (rectangle)
check width top       - width of geometric object (used for calculation purposes)
check width bottom    - width of geometric object (used for calculation purposes)
check height limit    - height of Document
check top left X      - topLeftX of geometric object (rectangle)
check bottom right X  - topLeftY of geometric object (rectangle)
```

Project Dimensions (values extracted from input csv file) attributes:
```
capstone ID     - ID of capstone project
project type    - project type (software/hardware)
showcase length - length of project
showcase width  - width of project
assigned        - boolean value, true if project has been assigned an allocation
confirmed       - boolean value, true if project's allocation is confirmed and project is fixed at the location
```
