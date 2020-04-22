import gspread
from oauth2client.service_account import ServiceAccountCredentials

def access_excel(file_to_read):
    scope = ['https://spreadsheets.google.com/feeds', 'https://www.googleapis.com/auth/drive']
    creds = ServiceAccountCredentials.from_json_keyfile_name('pref-3e777ad38276.json', scope)
    sheet = gspread.authorize(creds).open(file_to_read).sheet1
    return sheet

def total_submission_checker(total_groups_number, sheet):

    if (total_groups_number<=0):
        return "Invalid total groups, it should be more than zero"
    elif (total_groups_number>100):
        return "Invalid total groups, it should be at most 100"
    
    number_of_submissions = len(sheet.get_all_values()) - 1
    
    if (number_of_submissions < total_groups_number):
        print("Not all groups have submitted, do some action to remedy")
        
        groups_present = ["Not present"]
        for i in range(total_groups_number):
            groups_present.append("Not present")


        for i in range(2, number_of_submissions + 2):
            #to extract a particular cell value  row, column
            team_ids = sheet.cell(i, 2).value
            team_id = int(team_ids)
        
            if (groups_present[team_id] == "Not present"):
                groups_present[team_id] = "present"
                
        for team_id in range(1,total_groups_number+1):
            if (groups_present[team_id] == "Not present"):
                print("Team {} has not submit".format(team_id))
                
                
    elif (number_of_submissions > total_groups_number):
        print("There is oversubmission, do some action to remedy")
    else:
        print("All groups have submitted, please proceed")

    return "End of total submission checker"


def duplicate_checker(total_groups_number, sheet):

    if (total_groups_number<=0):
        return "Invalid total groups, it should be more than zero"
    elif (total_groups_number>100):
        return "Invalid total groups, it should be at most 100"

    number_of_submissions = len(sheet.get_all_values()) - 1

    if (total_groups_number<number_of_submissions):
        print("Incomplete submissions, unable to check for duplicate")
    else:
        groups_checked = ["Not check"]
        for i in range(total_groups_number):
            groups_checked.append("Not check")

        duplicate = 0

        for i in range(2, number_of_submissions + 2):
            #to extract a particular cell value  row, column
            team_ids = sheet.cell(i, 2).value
            #print(team_ids)
            team_id = int(team_ids)
            
            
            if (groups_checked[team_id] == "Not check"):
                groups_checked[team_id] = "checked"
            else:
                duplicate += 1
                print("Duplicate found: Team {}".format(team_id))
                
        if (duplicate == 0):
            print("No duplicate found")

    return "End of duplicate checker"
