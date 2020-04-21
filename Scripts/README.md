This folder contains the script as well as the folder recommended to be used for the smooth running of the script. This script is written in ExtendScript, the JavaScript variation designed specifically to be used for Adobe Products. In this case, the script is intended to be used on Adobe Illustrator only.

***

Purpose: Given the original empty floorplan, the user is able to draw boundaries for Capstone groups to be allocated into. By running the script, all the selected boundaries will have the capstone groups assigned accordingly, abiding by the constraints proposed by the Capstone Office. As these are to cater specifically to the SUTD Capstone Office’s requirements, the constraints are fixed.

***

Before running the script, the user has to first:
1.	Create a brand new layer in the Illustrator file
2.	Create the necessary boundaries on the new layer with specific stroke colours for the following constraints in terms of the type of type of Capstone products to be allocated:
  a. Software only: RGB ( 255, 0, 0 )
  b. Hardware only: RGB ( 0, 0, 255 )
  c.	Mixed: RGB ( 0, 255, 0 )
3.	Select the boundaries to be allocated. Unselected boundaries will not have allocations made to them
4.	Run the script

***

Design Considerations and Feature of script:
- Allow for users to specify types of projects to be allocated within the boundary via stroke colour of the boundary
- Industry of the capstone project is taken into consideration. Hence, each boundary will not have more than one capstone group from the same industry
- Regex pattern matching to ensure legal inputs by the user
- Error message windows with guided messsage regarding the error committed

***

Functions in the script:

      /**
    * function checkNewLayerAndBoundaries(myDoc)
    *
    * prompts a window on the active document that checks if the user has completed the steps successful required of them before running the script. no selection check is made here
    * checks if the user has correctly input the TOTAL number of boundaries drawn on the NEW layer
    * error messages will be displayed accordingly
    * @param    myDoc   the current document being worked on
    * @return   1   if the input values match, hence file correctly setup, else 0 and the script will end
    */

      /**
    * function mergedInputs(myDoc)
    * 
    * prompts a window that takes in the scale of the floorplan as well as the particular csv file containing information regarding the Capstone groups to be allocated
    * error messages will be displayed appropriately
    * @param    myDoc   the current document being worked on
    * @return   array(condition, scale, file)      condition for script breaking, scale of floorplan, full path to the specified csv file
    */  
    
      /**
    * function checkRegex(inputText)
    *
    * general function to check for regex of numerical inputs
    * @param  inputText   the text that needs to be checked against the regex
    * @return   true if pass, false if fail
    */
    
      /**
    * function industryCheck(cell)
    *
    * to check if the input for industry from the CSV file is legitimate
    * @param  cell  the cell containing the value for industry from the form
    * @return   1 if legitimate, 0 if not
    */    
   
      /**
    * function capstoneBoundary(myDoc, array, pathName, scale)
    *
    * given the input csv file, parses the data of the Capstone groups and stores into an array for further use
    * error messages will be displayed accordingly
    * @param    myDoc   the current document being worked on
    * @param    array   array to save the information into
    * @param    pathName    the full pathName to the required csv file
    * @param    scale       the scale of the floorplan
    * @return    value (literal)      check if the script can proceed
    */
    
      /**
    * function boundaryReference(myDoc, array, scale)
    *
    * given the selected boundaries, parses the data regarding the drawn boundaries on the document and stores into array for further use
    * @param    myDoc   the current document being worked on
    * @param    array   the array to store information into
    */
    
      /**
    * function generalAllocation(myDoc, arrayBoundary, arrayCapstone, scale)
    * 
    * general algorithm for top and bottom assignment. assign along the top width for all stated boundaries before assigning bottom
    * @param    myDoc   current document being worked on
    * @param    arrayBoundary   specific nested array of boundaries
    * @param    arrayCapstone   specific nested array of capstone information
    * @param    scale       scale for limits
    */
    
      /**
    * function initiateAlgorithm(myDoc, array, scale)
    *
    * specific function that initiates the allocation
    * will call generalAllocation algorithm with parsed values
    * @param    myDoc   current document being worked on
    * @param    array       complete array containing all details
    * @param    scale       scale value to be passed on
    */
    
      /**
    * function updateCSV(theCapstoneProjects)
    * 
    * creates a new csv file containing details on which capstone groups have been assigned
    * can be used again to conduct further allocations
    * @param    theCapstoneProjects     array containing details of all the capstone
    * @return     file      csv file saved in fixed directory
    */
    
      /**
    * function canWriteFiles()
    * 
    * status - completed
    * checks permission of scripts
    */
    
      /**
    * function clearAllUnassigned(myDoc)
    * 
    * for reuse of script on updated CSV, clear all unassigned groups to prevent repeats
    * @param myDoc  the active document being worked on
    */
    
