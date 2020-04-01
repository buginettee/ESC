import utils

#to access the online excel sheet
file_to_read = 'Capstone groups preferences (Responses)'
excel_sheet = utils.access_excel(file_to_read)
#key in the total number of groups foor the year
#total_groups_number = 4
total_groups_number = int(input("How many groups are there this year: "))
#check for correct submissions count
utils.total_submission_checker(total_groups_number, excel_sheet)
#check for duplicate in submissions
utils.duplicate_checker(total_groups_number, excel_sheet)

input("Enter anything to exit")


    
