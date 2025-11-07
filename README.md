# Module Management System

A comprehensive module management system that tracks S/U eligibility, bidding information, and assessment schedules.

## Features

### 1. S/U Eligibility Tracking
- **Cannot S/U:**
  - IS1108: Intro to Programming
  - IS2101: Data Management
  - IS3103: Business Process Analysis & Solutioning

- **Can S/U:**
  - IS2102: Object Oriented Programming
  - IS3221: Cloud Management and Engineering

### 2. Bidding Information
Each module includes:
- Minimum bidding points
- Maximum bidding points
- Average bidding points (based on 2024 data)

### 3. Assessment Schedules
For each module, track:
- **Quizzes**: Date and weightage
- **Project Deadlines**: Submission dates and weightage
- **Exams**: Date and weightage

## Files

- `modules_data.json` - Module data storage
- `module_manager.py` - Python CLI interface
- `module_viewer.html` - Web-based viewer

## Usage

### Python CLI

```bash
python3 module_manager.py
```

This will display:
- All modules with complete information
- S/U eligible modules
- Non S/U eligible modules
- Bidding summary
- Upcoming assessments

### Web Interface

Open `module_viewer.html` in a web browser to view modules in a user-friendly interface.

## Module Data Structure

```json
{
  "code": "IS1108",
  "name": "Intro to Programming",
  "credits": 4,
  "su_eligible": false,
  "bidding": {
    "min_points": 50,
    "max_points": 250,
    "average": 145,
    "year": "2024"
  },
  "assessments": {
    "quizzes": [...],
    "projects": [...],
    "exams": [...]
  }
}
```

## Customization

Edit `modules_data.json` to:
- Add new modules
- Update bidding information
- Modify assessment schedules
- Change S/U eligibility
