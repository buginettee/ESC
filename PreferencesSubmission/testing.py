import unittest
import utils

class Test(unittest.TestCase):
    
    @unittest.expectedFailure
    def test_ae_invalid_file(self):
        correct_excel_sheet = utils.access_excel('Capstone groups preferences (Responses)')
        self.assertEqual(correct_excel_sheet, utils.access_excel("Invalid file"), "File to read is wrong")
    @unittest.expectedFailure
    def test_ae_empty_file(self):
        correct_excel_sheet = utils.access_excel('Capstone groups preferences (Responses)')
        self.assertEqual(correct_excel_sheet, utils.access_excel(""), "No file to read")
    @unittest.expectedFailure
    def test_ae_number_input(self):
        correct_excel_sheet = utils.access_excel('Capstone groups preferences (Responses)')
        self.assertEqual(correct_excel_sheet, utils.access_excel(3), "File name is a number") 


    def test_ts_zero(self):
        excel_sheet = utils.access_excel('Capstone groups preferences (Responses)')
        self.assertEqual(utils.total_submission_checker(0, excel_sheet), "Invalid total groups, it should be more than zero", "Should be > 0")
    def test_ts_negative(self):
        excel_sheet = utils.access_excel('Capstone groups preferences (Responses)')
        self.assertEqual(utils.total_submission_checker(-10, excel_sheet), "Invalid total groups, it should be more than zero", "Should be > 0")
    def test_ts_hundred_plus(self):
        excel_sheet = utils.access_excel('Capstone groups preferences (Responses)')
        self.assertEqual(utils.total_submission_checker(105, excel_sheet), "Invalid total groups, it should be at most 100", "Should be <= 100")
    def test_d_zero(self):
        excel_sheet = utils.access_excel('Capstone groups preferences (Responses)')
        self.assertEqual(utils.duplicate_checker(0, excel_sheet), "Invalid total groups, it should be more than zero", "Should be > 0")
    def test_d_negative(self):
        excel_sheet = utils.access_excel('Capstone groups preferences (Responses)')
        self.assertEqual(utils.duplicate_checker(-10, excel_sheet), "Invalid total groups, it should be more than zero", "Should be > 0")
    def test_d_hundred_plus(self):
        excel_sheet = utils.access_excel('Capstone groups preferences (Responses)')
        self.assertEqual(utils.duplicate_checker(105, excel_sheet), "Invalid total groups, it should be at most 100", "Should be <= 100")


    def test_ts_no_issue(self):
        excel_sheet = utils.access_excel('Capstone groups preferences (Responses)')
        self.assertEqual(utils.total_submission_checker(4, excel_sheet), "End of total_submission_checker", "No issues")
    def test_d_no_issue(self):
        excel_sheet = utils.access_excel('Capstone groups preferences (Responses)')
        self.assertEqual(utils.duplicate_checker(4, excel_sheet), "End of duplicate_checker", "No issues")



    @unittest.expectedFailure
    def test_ts_char_input(self):
        excel_sheet = utils.access_excel('Capstone groups preferences (Responses)')
        self.assertEqual(utils.total_submission_checker('c', excel_sheet), "End of total_submission_checker", "char input")  
    @unittest.expectedFailure
    def test_d_char_input(self):
        excel_sheet = utils.access_excel('Capstone groups preferences (Responses)')
        self.assertEqual(utils.duplicate_checker('c', excel_sheet), "End of duplicate_checker", "char input")  


    @unittest.expectedFailure
    def test_ts_invalid_file(self):
        excel_sheet = utils.access_excel('Invalid file')
        self.assertEqual(utils.total_submission_checker(4, excel_sheet), "End of total_submission_checker", "Invalid excel sheet passed in")  
    @unittest.expectedFailure
    def test_d_invalid_file(self):
        excel_sheet = utils.access_excel('Invalid file')
        self.assertEqual(utils.duplicate_checker(4, excel_sheet), "End of duplicate_checker", "Invalid excel sheet passed in")  

    
    
    
if __name__ == '__main__':
    unittest.main()
