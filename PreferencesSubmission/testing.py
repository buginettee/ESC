import unittest
import utils
import time

#ae stands for access_excel()
#ts stands for total_submission_checker()
#d stands for duplicate_checker()

class Test(unittest.TestCase):
    
    @unittest.expectedFailure
    def test_ae_invalid_file(self):
        #test access_excel() with an invalid file as the input
        correct_excel_sheet = utils.access_excel('Capstone groups preferences (Responses)')
        time.sleep(5)
        self.assertEqual(correct_excel_sheet, utils.access_excel("Invalid file"), "File to read is wrong")
    @unittest.expectedFailure
    def test_ae_empty_file(self):
        #test access_excel() with no file as the input
        correct_excel_sheet = utils.access_excel('Capstone groups preferences (Responses)')
        time.sleep(5)
        self.assertEqual(correct_excel_sheet, utils.access_excel(""), "No file to read")
    @unittest.expectedFailure
    def test_ae_number_input(self):
        #test access_excel() with an int as the input instead of a filename
        correct_excel_sheet = utils.access_excel('Capstone groups preferences (Responses)')
        time.sleep(5)
        self.assertEqual(correct_excel_sheet, utils.access_excel(3), "File name is a number") 


    def test_ts_zero(self):
        #test total_submission_checker() with zero total number of groups as input
        excel_sheet = utils.access_excel('Capstone groups preferences (Responses)')
        time.sleep(5)
        self.assertEqual(utils.total_submission_checker(0, excel_sheet), "Invalid total groups, it should be more than zero", "Should be > 0")
    def test_ts_negative(self):
        #test total_submission_checker() with negative total number of groups as input
        excel_sheet = utils.access_excel('Capstone groups preferences (Responses)')
        time.sleep(5)
        self.assertEqual(utils.total_submission_checker(-10, excel_sheet), "Invalid total groups, it should be more than zero", "Should be > 0")
    def test_ts_hundred_plus(self):
        #test total_submission_checker() with excessive total number of groups as input
        excel_sheet = utils.access_excel('Capstone groups preferences (Responses)')
        time.sleep(5)
        self.assertEqual(utils.total_submission_checker(105, excel_sheet), "Invalid total groups, it should be at most 100", "Should be <= 100")
    def test_d_zero(self):
        #test duplicate_checker() with zero total number of groups as input
        excel_sheet = utils.access_excel('Capstone groups preferences (Responses)')
        time.sleep(5)
        self.assertEqual(utils.duplicate_checker(0, excel_sheet), "Invalid total groups, it should be more than zero", "Should be > 0")
    def test_d_negative(self):
        #test duplicate_checker() with negative total number of groups as input
        excel_sheet = utils.access_excel('Capstone groups preferences (Responses)')
        time.sleep(5)
        self.assertEqual(utils.duplicate_checker(-10, excel_sheet), "Invalid total groups, it should be more than zero", "Should be > 0")
    def test_d_hundred_plus(self):
        #test duplicate_checker() with excessive total number of groups as input
        excel_sheet = utils.access_excel('Capstone groups preferences (Responses)')
        time.sleep(5)
        self.assertEqual(utils.duplicate_checker(105, excel_sheet), "Invalid total groups, it should be at most 100", "Should be <= 100")


    def test_ts_no_issue(self):
        #test total_submission_checker() with proper inputs, expect to have no issues
        total_groups_number = 24     #you may change this line if the total number of groups is updated
        excel_sheet = utils.access_excel('Capstone groups preferences (Responses)')
        time.sleep(5)
        self.assertEqual(utils.total_submission_checker(total_groups_number, excel_sheet), "End of total submission checker", "No issues")
    def test_d_no_issue(self):
        #test duplicate_checker() with proper inputs, expect to have no issues
        total_groups_number = 24     #you may change this line if the total number of groups is updated
        excel_sheet = utils.access_excel('Capstone groups preferences (Responses)')
        time.sleep(5)
        self.assertEqual(utils.duplicate_checker(total_groups_number, excel_sheet), "End of duplicate checker", "No issues")


    def test_ts_edge_case1(self):
        #test total_submission_checker() with proper inputs, expect to have no issues
        excel_sheet = utils.access_excel('Capstone groups preferences (Responses)')
        time.sleep(5)
        self.assertEqual(utils.total_submission_checker(1, excel_sheet), "End of total submission checker", "No issues")
    def test_ts_edge_case2(self):
        #test total_submission_checker() with proper inputs, expect to have no issues
        excel_sheet = utils.access_excel('Capstone groups preferences (Responses)')
        time.sleep(5)
        self.assertEqual(utils.total_submission_checker(99, excel_sheet), "End of total submission checker", "No issues")
    def test_d_edge_case1(self):
        #test duplicate_checker() with proper inputs, expect to have no issues
        excel_sheet = utils.access_excel('Capstone groups preferences (Responses)')
        time.sleep(5)
        self.assertEqual(utils.duplicate_checker(1, excel_sheet), "End of duplicate checker", "No issues")
    def test_d_edge_case2(self):
        #test duplicate_checker() with proper inputs, expect to have no issues
        excel_sheet = utils.access_excel('Capstone groups preferences (Responses)')
        time.sleep(5)
        self.assertEqual(utils.duplicate_checker(99, excel_sheet), "End of duplicate checker", "No issues")



    @unittest.expectedFailure
    def test_ts_char_input(self):
        #test total_submission_checker() with a char input, expect an error
        excel_sheet = utils.access_excel('Capstone groups preferences (Responses)')
        time.sleep(5)
        self.assertEqual(utils.total_submission_checker('c', excel_sheet), "End of total submission checker", "char input")  
    @unittest.expectedFailure
    def test_d_char_input(self):
        #test duplicate_checker() with a char input, expect an error
        excel_sheet = utils.access_excel('Capstone groups preferences (Responses)')
        time.sleep(5)
        self.assertEqual(utils.duplicate_checker('c', excel_sheet), "End of duplicate checker", "char input")  


    @unittest.expectedFailure
    def test_ts_invalid_file(self):
        #test total_submission_checker() with an invalid file as input, expect an error
        excel_sheet = utils.access_excel('Invalid file')
        time.sleep(5)
        self.assertEqual(utils.total_submission_checker(4, excel_sheet), "End of total submission checker", "Invalid excel sheet passed in")  
    @unittest.expectedFailure
    def test_d_invalid_file(self):
        #test duplicate_checker() with an invalid file as input, expect an error
        excel_sheet = utils.access_excel('Invalid file')
        time.sleep(5)
        self.assertEqual(utils.duplicate_checker(4, excel_sheet), "End of duplicate checker", "Invalid excel sheet passed in")  

    @unittest.expectedFailure
    def test_ae_missing_param(self):
        #test access_excel() with missing parameters, expect an error
        correct_excel_sheet = utils.access_excel()
        time.sleep(5)
        self.assertEqual(correct_excel_sheet, utils.access_excel("Invalid file"), "File to read is wrong")
    @unittest.expectedFailure
    def test_ts_missing_param(self):
        #test total_submission_checker() with missing parameters, expect an error
        excel_sheet = utils.access_excel('Invalid file')
        time.sleep(5)
        self.assertEqual(utils.total_submission_checker(excel_sheet), "End of total submission checker", "Invalid excel sheet passed in")  
    @unittest.expectedFailure
    def test_d_missing_param(self):
        #test duplicate_checker() with missing parameters, expect an error
        excel_sheet = utils.access_excel('Invalid file')
        time.sleep(5)
        self.assertEqual(utils.duplicate_checker(4), "End of duplicate checker", "Invalid excel sheet passed in")      
    
    
if __name__ == '__main__':
    unittest.main()
