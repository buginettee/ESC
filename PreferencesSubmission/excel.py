import utils

#to access the online excel sheet
file_to_read = 'Capstone groups preferences (Responses)'
excel_sheet = utils.access_excel(file_to_read)
print("Successfully read online excel sheet")
print("")
#key in the total number of groups foor the year
#total_groups_number = 4
total_groups_number = int(input("How many groups are there this year: "))
print("")
#check for correct submissions count
print(utils.total_submission_checker(total_groups_number, excel_sheet))
print("")
#check for duplicate in submissions
print(utils.duplicate_checker(total_groups_number, excel_sheet))
print("")

input("Enter anything to exit")


    
