import utils

#to access the online excel sheet
excel_sheet = utils.access_excel()
#key in the total number of groups foor the year
total_groups_number = 4
#check for correct submissions count
utils.total_submission_checker(total_groups_number, excel_sheet)
#check for duplicate in submissions
utils.duplicate_checker(total_groups_number, excel_sheet)



    
