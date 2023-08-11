import gitlab

# Gitlab Variables
GITLAB_TOKEN = "glpat-icyrQZ5aCetgWWPvcsBh"
PROJECT_ID = "47954778"

gl = gitlab.Gitlab("https://gitlab.com", private_token=GITLAB_TOKEN)

# gl.enable_debug()

# Get the project from gitlab
project = project = gl.projects.get(PROJECT_ID, lazy=True)

# Close previous milestone
milestones = project.milestones.list(state='active')

# Name of the milestone you're looking for
target_milestone_name = 'Release v1.0.4'

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