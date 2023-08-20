import os
import sys
import subprocess
import gitlab

BOARD_ID="5954639"
CREATE_DEPENDENCY_ISSUE=False

# Get the environment variables from Gitlab
GITLAB_TOKEN = sys.argv[1]
PROJECT_ID = sys.argv[2]
REF_NAME = sys.argv[3]

# Define issue titles and descriptions
READY_RELEASE_ISSUE_TITLE = "Ready release"
READY_RELEASE_ISSUE_DESCRIPTION = (
    "- [ ] Add/update update log to UPDATES.md\n- [ ] Unlocks/locks work as a new user\n- [ ] Unlocks/locks work as an existing user\n- [ ] Builds work as a new user\n- [ ] Builds work as an existing user\n- [ ] Google auth works\n- [ ] Google saving works\n- [ ] Sidebars work\n- [ ] Mobile layout is ok\n"
)

DEPENDENCY_ISSUE_TITLE = "Check & update dependencies"

# Labels
FINAL_TOUCHES_LABEL = "Final Touches"
RELEASE_LABEL = "Release"
CODEBASE_LABEL = "Codebase"

gl = gitlab.Gitlab("https://gitlab.com", private_token=GITLAB_TOKEN)

# gl.enable_debug()

# Get the project from gitlab
project = project = gl.projects.get(PROJECT_ID, lazy=True)

# Get the releases from gitlab
releases = project.releases.list()

latest_release_version = releases[0].name[1:]
major, minor, patch = latest_release_version.split(".")

major_version_number = int(major)
minor_version_number = int(minor)
patch_version_number = int(patch)

# Set variables
LASTEST_RELEASE_FULL_NAME = f"Release v{latest_release_version}"
NEW_RELEASE_FULL_NAME = f"Release v{major_version_number}.x.x"

print(f"Last release full: {LASTEST_RELEASE_FULL_NAME}")
print(f"New release full: {NEW_RELEASE_FULL_NAME}")

# Update board name
print(f"Renamed board to: {NEW_RELEASE_FULL_NAME}")
board = project.boards.get(BOARD_ID)
board.name = NEW_RELEASE_FULL_NAME
board.save()

# Get all milestones
milestones = project.milestones.list(state='active')

target_milestone_name = NEW_RELEASE_FULL_NAME
# Loop through the milestones to find the target milestone
for milestone in milestones:
    if milestone.title == target_milestone_name:
        print(f"Closing milestone with id: {milestone.id}")
        
        # Find the release issue
        target_issue_name = NEW_RELEASE_FULL_NAME
        for issue in milestone.issues():
          if issue.title == target_issue_name:
            print(f"Closing issue with id: {issue.id}")
            # Rename and close the issue
            issue.title = LASTEST_RELEASE_FULL_NAME
            issue.state_event = 'close'
            issue.save()
            break
        
        # Rename and close the milestone
        milestone.title = LASTEST_RELEASE_FULL_NAME
        milestone.state_event = 'close'
        milestone.save()
        break

# Create a new milestone
print(f"Creating milestone: {NEW_RELEASE_FULL_NAME}")
milestone = project.milestones.create({"title": NEW_RELEASE_FULL_NAME})

# Create the ready release issue
print(f"Creating issue: {READY_RELEASE_ISSUE_TITLE}")
issue = project.issues.create(
    {
        "title": READY_RELEASE_ISSUE_TITLE,
        "description": READY_RELEASE_ISSUE_DESCRIPTION,
        "milestone_id": milestone.id,
    }
)

issue.labels = [RELEASE_LABEL, FINAL_TOUCHES_LABEL]
issue.save()

if CREATE_DEPENDENCY_ISSUE:
  print(f"Creating issue: {DEPENDENCY_ISSUE_TITLE}")
  # Create the dependencies issue
  issue = project.issues.create(
      {"title": DEPENDENCY_ISSUE_TITLE, "description": "", "milestone_id": milestone.id}
  )
  
  issue.labels = [CODEBASE_LABEL, FINAL_TOUCHES_LABEL]
  issue.save()

# Create the release issue
print(f"Creating issue: {NEW_RELEASE_FULL_NAME}")
issue = project.issues.create(
    {"title": NEW_RELEASE_FULL_NAME, "description": "", "milestone_id": milestone.id}
)

issue.labels = [RELEASE_LABEL, FINAL_TOUCHES_LABEL]
issue.save()


# Extract latest release section from UPDATES.md
# with open("UPDATES.md", "r") as updates_file:
#     updates_lines = updates_file.readlines()
# 
# section_lines = []
# found_section = False
# for line in updates_lines:
#     if line.startswith("## Version"):
#         if found_section:
#             break
#         found_section = True
#     if found_section:
#         section_lines.append(line)
# 
# UPDATES_TEXT = "\n".join(section_lines)