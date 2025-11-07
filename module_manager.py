#!/usr/bin/env python3
"""
Module Management System
Manages module information including S/U eligibility, bidding data, and assessments
"""

import json
from datetime import datetime
from typing import Dict, List, Any


class ModuleManager:
    def __init__(self, data_file: str = "modules_data.json"):
        self.data_file = data_file
        self.modules = self.load_modules()

    def load_modules(self) -> List[Dict[str, Any]]:
        """Load module data from JSON file"""
        try:
            with open(self.data_file, 'r') as f:
                data = json.load(f)
                return data.get('modules', [])
        except FileNotFoundError:
            print(f"Error: {self.data_file} not found!")
            return []
        except json.JSONDecodeError:
            print(f"Error: Invalid JSON in {self.data_file}")
            return []

    def save_modules(self):
        """Save module data to JSON file"""
        with open(self.data_file, 'w') as f:
            json.dump({"modules": self.modules}, f, indent=2)

    def display_all_modules(self):
        """Display all modules with their information"""
        print("\n" + "="*80)
        print(" " * 25 + "MODULE MANAGEMENT SYSTEM")
        print("="*80 + "\n")

        for module in self.modules:
            self.display_module(module)
            print("-"*80 + "\n")

    def display_module(self, module: Dict[str, Any]):
        """Display detailed information for a single module"""
        print(f"📚 {module['code']}: {module['name']}")
        print(f"   Credits: {module['credits']}")

        # S/U Eligibility
        su_status = "✅ Yes" if module['su_eligible'] else "❌ No"
        print(f"   S/U Eligible: {su_status}")

        # Bidding Information
        bidding = module['bidding']
        print(f"\n   💰 BIDDING ({bidding['year']}):")
        print(f"      Range: {bidding['min_points']} - {bidding['max_points']} points")
        print(f"      Average: {bidding['average']} points")

        # Assessments
        assessments = module['assessments']

        if assessments.get('quizzes'):
            print(f"\n   📝 QUIZZES:")
            for quiz in assessments['quizzes']:
                print(f"      • {quiz['name']}: {quiz['date']} ({quiz['weightage']}%)")

        if assessments.get('projects'):
            print(f"\n   💼 PROJECTS:")
            for project in assessments['projects']:
                print(f"      • {project['name']}: Deadline {project['deadline']} ({project['weightage']}%)")

        if assessments.get('exams'):
            print(f"\n   📖 EXAMS:")
            for exam in assessments['exams']:
                print(f"      • {exam['name']}: {exam['date']} ({exam['weightage']}%)")

    def display_su_eligible_modules(self):
        """Display only S/U eligible modules"""
        print("\n" + "="*80)
        print(" " * 20 + "S/U ELIGIBLE MODULES")
        print("="*80 + "\n")

        su_modules = [m for m in self.modules if m['su_eligible']]

        if not su_modules:
            print("No S/U eligible modules found.")
            return

        for module in su_modules:
            print(f"✅ {module['code']}: {module['name']}")

        print()

    def display_non_su_eligible_modules(self):
        """Display modules that cannot be S/U"""
        print("\n" + "="*80)
        print(" " * 20 + "NON S/U ELIGIBLE MODULES")
        print("="*80 + "\n")

        non_su_modules = [m for m in self.modules if not m['su_eligible']]

        if not non_su_modules:
            print("All modules are S/U eligible.")
            return

        for module in non_su_modules:
            print(f"❌ {module['code']}: {module['name']}")

        print()

    def display_bidding_summary(self):
        """Display bidding summary for all modules"""
        print("\n" + "="*80)
        print(" " * 25 + "BIDDING SUMMARY (2024)")
        print("="*80 + "\n")

        print(f"{'Module Code':<12} {'Module Name':<45} {'Min':<6} {'Max':<6} {'Avg':<6}")
        print("-"*80)

        for module in self.modules:
            bidding = module['bidding']
            print(f"{module['code']:<12} {module['name']:<45} {bidding['min_points']:<6} {bidding['max_points']:<6} {bidding['average']:<6}")

        print()

    def display_upcoming_assessments(self, days: int = 30):
        """Display upcoming assessments within the next N days"""
        print("\n" + "="*80)
        print(f" " * 20 + f"UPCOMING ASSESSMENTS (Next {days} days)")
        print("="*80 + "\n")

        today = datetime.now()
        upcoming = []

        for module in self.modules:
            assessments = module['assessments']

            # Check quizzes
            for quiz in assessments.get('quizzes', []):
                upcoming.append({
                    'module': module['code'],
                    'name': f"{module['name']} - {quiz['name']}",
                    'date': quiz['date'],
                    'type': 'Quiz',
                    'weightage': quiz['weightage']
                })

            # Check projects
            for project in assessments.get('projects', []):
                upcoming.append({
                    'module': module['code'],
                    'name': f"{module['name']} - {project['name']}",
                    'date': project['deadline'],
                    'type': 'Project',
                    'weightage': project['weightage']
                })

            # Check exams
            for exam in assessments.get('exams', []):
                upcoming.append({
                    'module': module['code'],
                    'name': f"{module['name']} - {exam['name']}",
                    'date': exam['date'],
                    'type': 'Exam',
                    'weightage': exam['weightage']
                })

        # Sort by date
        upcoming.sort(key=lambda x: x['date'])

        for item in upcoming:
            print(f"{item['type']:<8} | {item['date']} | {item['module']:<8} | {item['name']} ({item['weightage']}%)")

        print()

    def get_module_by_code(self, code: str) -> Dict[str, Any] or None:
        """Get module by its code"""
        for module in self.modules:
            if module['code'].upper() == code.upper():
                return module
        return None


def main():
    """Main function to demonstrate the module manager"""
    manager = ModuleManager()

    # Display all modules
    manager.display_all_modules()

    # Display S/U eligible modules
    manager.display_su_eligible_modules()

    # Display non S/U eligible modules
    manager.display_non_su_eligible_modules()

    # Display bidding summary
    manager.display_bidding_summary()

    # Display upcoming assessments
    manager.display_upcoming_assessments()


if __name__ == "__main__":
    main()
