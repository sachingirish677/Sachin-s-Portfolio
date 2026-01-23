#!/bin/bash

# Script to replace hardcoded localhost URLs with API_ENDPOINTS in admin panel

cd /Users/sachingirish/Documents/sachin/Portfolio/portfolio-admin/src/pages

# Fix ProjectManager.tsx
sed -i '' "1s/^/import { API_ENDPOINTS } from '..\/config\/api';\n/" ProjectManager.tsx
sed -i '' "s/'http:\/\/localhost:5000\/api\/projects'/API_ENDPOINTS.projects/g" ProjectManager.tsx
sed -i '' "s/\`http:\/\/localhost:5000\/api\/projects\/\${id}\`/\`\${API_ENDPOINTS.projects}\/\${id}\`/g" ProjectManager.tsx
sed -i '' "s/\`http:\/\/localhost:5000\/api\/projects\/\${currentProject._id}\`/\`\${API_ENDPOINTS.projects}\/\${currentProject._id}\`/g" ProjectManager.tsx

# Fix SkillManager.tsx  
sed -i '' "1s/^/import { API_ENDPOINTS } from '..\/config\/api';\n/" SkillManager.tsx
sed -i '' "s/'http:\/\/localhost:5000\/api\/skills'/API_ENDPOINTS.skills/g" SkillManager.tsx
sed -i '' "s/\`http:\/\/localhost:5000\/api\/skills\/\${id}\`/\`\${API_ENDPOINTS.skills}\/\${id}\`/g" SkillManager.tsx
sed -i '' "s/\`http:\/\/localhost:5000\/api\/skills\/\${currentSkill._id}\`/\`\${API_ENDPOINTS.skills}\/\${currentSkill._id}\`/g" SkillManager.tsx

# Fix EducationManager.tsx
sed -i '' "1s/^/import { API_ENDPOINTS } from '..\/config\/api';\n/" EducationManager.tsx  
sed -i '' "s/'http:\/\/localhost:5000\/api\/education'/API_ENDPOINTS.education/g" EducationManager.tsx
sed -i '' "s/\`http:\/\/localhost:5000\/api\/education\/\${id}\`/\`\${API_ENDPOINTS.education}\/\${id}\`/g" EducationManager.tsx
sed -i '' "s/\`http:\/\/localhost:5000\/api\/education\/\${currentEducation._id}\`/\`\${API_ENDPOINTS.education}\/\${currentEducation._id}\`/g" EducationManager.tsx

# Fix ExperienceManager.tsx
sed -i '' "1s/^/import { API_ENDPOINTS } from '..\/config\/api';\n/" ExperienceManager.tsx
sed -i '' "s/'http:\/\/localhost:5000\/api\/experiences'/API_ENDPOINTS.experiences/g" ExperienceManager.tsx
sed -i '' "s/\`http:\/\/localhost:5000\/api\/experiences\/\${id}\`/\`\${API_ENDPOINTS.experiences}\/\${id}\`/g" ExperienceManager.tsx
sed -i '' "s/\`http:\/\/localhost:5000\/api\/experiences\/\${isEditing}\`/\`\${API_ENDPOINTS.experiences}\/\${isEditing}\`/g" ExperienceManager.tsx

# Fix ImageUpload.tsx
cd ../components
sed -i '' "1s/^/import { API_ENDPOINTS } from '..\/config\/api';\n/" ImageUpload.tsx
sed -i '' "s/'http:\/\/localhost:5000\/api\/upload'/API_ENDPOINTS.upload/g" ImageUpload.tsx

echo "All files updated successfully!"
