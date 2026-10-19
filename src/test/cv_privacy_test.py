"""Privacy regression checks for the actual downloadable PDF."""
from pathlib import Path
import subprocess
import unittest

class PublicCVPrivacy(unittest.TestCase):
    def test_phone_number_is_not_in_pdf(self):
        path = Path(__file__).resolve().parents[2] / "public/Nika-Jahankhah-CV.pdf"
        text = subprocess.check_output(["pdftotext", str(path), "-"], text=True)
        self.assertNotRegex(text, r"(?:\+44|0044|\b07)\s*\d[\d\s()-]{8,}")
        urls = subprocess.check_output(["pdfinfo", "-url", str(path)], text=True)
        self.assertNotIn("tel:", urls)
        self.assertIn("nika@hamid.com", text)
        self.assertIn("Stalled London", text)

if __name__ == "__main__":
    unittest.main()