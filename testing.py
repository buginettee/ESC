import unittest
import utils

class Test(unittest.TestCase):

    def test_zero(self):
        excel_sheet = utils.access_excel()
        self.assertEqual(utils.total_submission_checker(0, excel_sheet), "Invalid total groups, it should be more than zero", "Should be > 0")
    def test_negative(self):
        excel_sheet = utils.access_excel()
        self.assertEqual(utils.total_submission_checker(-10, excel_sheet), "Invalid total groups, it should be more than zero", "Should be > 0")
    def test_hundred_plus(self):
        excel_sheet = utils.access_excel()
        self.assertEqual(utils.total_submission_checker(105, excel_sheet), "Invalid total groups, it should be at most 100", "Should be <= 100")

if __name__ == '__main__':
    unittest.main()
