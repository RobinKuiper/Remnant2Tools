import os
import sys
import subprocess
import gitlab

BOARD_ID="5954639"

# Extract version from .version file
with open(".version", "r") as version_file:
    CURRENT_VERSION = version_file.read().strip()

# Extract major and minor version components
MAJOR_VERSION_NUMBERS = ".".join(CURRENT_VERSION.split(".")[:2])

# Calculate the next patch version
NEXT_VERSION = str(int(CURRENT_VERSION.split(".")[-1]) + 1)

# Create release and milestone names
RELEASE_NAME = f"Release v{CURRENT_VERSION}"
MILESTONE_NAME = f"Release v{MAJOR_VERSION_NUMBERS}.{NEXT_VERSION}"
BOARD_NAME = MILESTONE_NAME

# Extract latest release section from UPDATES.md
with open("UPDATES.md", "r") as updates_file:
    updates_lines = updates_file.readlines()

section_lines = []
found_section = False
for line in updates_lines:
    if line.startswith("## Version"):
        if found_section:
            break
        found_section = True
    if found_section:
        section_lines.append(line)

UPDATES_TEXT = "\n".join(section_lines)

# Define issue title and description
READY_RELEASE_ISSUE_TITLE = "Ready release"
READY_RELEASE_ISSUE_DESCRIPTION = (
    "- [ ] Update version in .version\n- [ ] Add/update update log to UPDATES.md"
)
DEPENDENCY_ISSUE_TITLE = "Check & update dependencies"
RELEASE_ISSUE_TITLE = MILESTONE_NAME

# Get the environment variables from Gitlab
GITLAB_TOKEN = sys.argv[1]
PROJECT_ID = sys.argv[2]
REF_NAME = sys.argv[3]

gl = gitlab.Gitlab("https://gitlab.com", private_token=GITLAB_TOKEN)

# gl.enable_debug()

# Get the project from gitlab
project = project = gl.projects.get(PROJECT_ID, lazy=True)

# Create a new release
release = project.releases.create(
    {
        "name": RELEASE_NAME,
        "tag_name": CURRENT_VERSION,
        "description": UPDATES_TEXT,
        "ref": REF_NAME,
    }
)

# Close previous milestone
milestones = project.milestones.list(state='active')
target_milestone_name = RELEASE_NAME

# Loop through the milestones to find the target milestone and its ID
target_milestone = None
for milestone in milestones:
    if milestone.title == target_milestone_name:
        target_milestone = milestone
        break

# Close the milestone
if target_milestone is not None:
    print(f"Closing milestone with id: {target_milestone.id}")
    
    milestone.state_event = 'close'
    milestone.save()

# Create a new milestone
milestone = project.milestones.create({"title": MILESTONE_NAME})

# Create the ready release issue
issue = project.issues.create(
    {
        "title": READY_RELEASE_ISSUE_TITLE,
        "description": READY_RELEASE_ISSUE_DESCRIPTION,
        "milestone_id": milestone.id,
    }
)

FINAL_TOUCHES_LABEL = "Final Touches"
RELEASE_LABEL = "Release"
CODEBASE_LABEL = "Codebase"

issue.labels = [RELEASE_LABEL, FINAL_TOUCHES_LABEL]
issue.save()

# Create the dependencies issue
issue = project.issues.create(
    {"title": DEPENDENCY_ISSUE_TITLE, "description": "", "milestone_id": milestone.id}
)

issue.labels = [CODEBASE_LABEL, FINAL_TOUCHES_LABEL]
issue.save()

# Create the release issue
issue = project.issues.create(
    {"title": RELEASE_ISSUE_TITLE, "description": "", "milestone_id": milestone.id}
)

issue.labels = [RELEASE_LABEL, FINAL_TOUCHES_LABEL]
issue.save()

# Update board name
board = project.boards.get(BOARD_ID)
board.name = BOARD_NAME
board.save()