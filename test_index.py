import os
import unittest


class TestIndexPage(unittest.TestCase):
    def setUp(self):
        self.filepath = os.path.join(os.path.dirname(__file__), "index.html")

    def test_index_file_exists(self):
        self.assertTrue(
            os.path.exists(self.filepath),
            "index.html does not exist in root directory",
        )

    def test_index_contains_viewport_meta(self):
        with open(self.filepath, "r", encoding="utf-8") as f:
            content = f.read()
        self.assertIn(
            'name="viewport"',
            content,
            "index.html does not contain viewport meta tag",
        )

    def test_index_contains_agency_headline(self):
        with open(self.filepath, "r", encoding="utf-8") as f:
            content = f.read()
        self.assertIn(
            "We turn ideas into",
            content,
            "index.html does not contain hero tagline 'We turn ideas into motion.'",
        )

    def test_index_contains_main_sections(self):
        with open(self.filepath, "r", encoding="utf-8") as f:
            content = f.read()

        # Verify required section IDs exist
        required_sections = [
            'id="hero"',
            'id="services"',
            'id="portfolio"',
            'id="about"',
            'id="contact"',
        ]
        for section in required_sections:
            self.assertIn(
                section,
                content,
                f"index.html does not contain section with {section}",
            )

    def test_index_contains_section_headings(self):
        with open(self.filepath, "r", encoding="utf-8") as f:
            content = f.read()

        # Verify section headings exist
        required_headings = [
            "Our Services",
            "Featured Portfolio",
            "About Nova Motion",
            "Ready to bring your project to life?",
        ]
        for heading in required_headings:
            self.assertIn(
                heading,
                content,
                f"index.html does not contain section heading '{heading}'",
            )


if __name__ == "__main__":
    unittest.main()
