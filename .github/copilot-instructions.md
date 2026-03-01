- [x] Verify that the copilot-instructions.md file in the .github directory is created.

- [x] Clarify Project Requirements

- [x] Scaffold the Project
	- Frontend scaffolded with Vite React TS.

- [x] Scaffold the Project
	- Backend scaffolded with Node.js Express.

- [x] Customize the Project
	- Backend API with auth, wallet, deposit routes.
	- Frontend with pages for login, register, dashboard, wallet connect, invest, upload proof, admin.
	- Styled with Tailwind CSS, dark theme (black backgrounds, blue/purple gradients), professional design inspired by desk-analyst.com, high-quality Pexels images, icons, animations.

- [x] Install Required Extensions

- [x] Compile the Project

- [x] Create and Run Task

- [x] Launch the Project
	- Start backend: cd backend && npm run dev
	- Start frontend: cd frontend && npm run dev
	- Ensure MongoDB is running.

- [x] Ensure Documentation is Complete

- [x] Fix Tailwind CSS v4 Configuration
	- Updated index.css to use @import "tailwindcss" syntax
	- Simplified tailwind.config.js for v4 compatibility
	- Verified CSS generation (26.82 kB vs previous 8.33 kB)

- [x] Fix MongoDB Connection
	- Removed deprecated useNewUrlParser and useUnifiedTopology options
	- Backend now connects successfully to MongoDB

- [x] Verify Application Launch
	- Frontend running on http://localhost:5173/
	- Backend running on http://localhost:5000/
	- Professional dark theme styles applied correctly

- [x] Fix Full-Width Layout
	- Removed container restrictions from Layout component
	- Updated navbar and footer to use max-w-7xl with proper padding
	- All sections now use full width with centered content

- [x] Redesign Home Page
	- Enhanced hero section with background image, trust indicators, and better CTA
	- Improved stats section with gradient backgrounds and hover effects
	- Redesigned services section with feature lists, better images, and professional layout
	- Added "How It Works" process section with numbered steps
	- Enhanced testimonials with company information and trust indicators
	- Improved final CTA section with trial information and benefits

- [x] Make Site Full Width
	- Removed all max-width constraints from Layout component (navbar, footer)
	- Updated all page sections to use full viewport width
	- Maintained proper padding (px-6) for content readability
	- Applied full-width layout to Home, Dashboard, Admin, Invest, and UploadProof pages

- [x] Change to Light Theme with Desk-Analyst Design
	- Converted entire website from dark theme to light theme
	- Redesigned Home page to match desk-analyst.com layout exactly
	- Implemented navy blue and sky blue color scheme only
	- Updated Layout component (navbar/footer) with light theme colors
	- Added custom navy and sky color definitions to Tailwind config
	- Maintained all existing content while applying new design

- [x] Rebrand Site from Investment to Cyber Recovery Platform
	- Updated Home page content stats from investment ($10M+ assets) to recovery (500+ recoveries)
	- Updated services from "Secure Backup/Wallet Connection/Smart Investing" to "Wallet Recovery/Security Audit/Cyber Education/24/7 Support"
	- Updated process steps from investment flow to "Register & Consult → Backup Wallet → Request Recovery"
	- Updated testimonials from crypto investor perspectives to security expert perspectives
	- Updated Dashboard cards: "Connect Wallet" → "Backup Wallet", "Invest Now" removed, "Upload Proof" → "Request Recovery"
	- Updated WalletConnect page: "Connect Your Wallet" → "Backup Your Wallet", messaging updated to recovery theme
	- Updated UploadProof page: "Deposit Amount" → "Recovery Details", "Proof Document" → "Supporting Document"
	- Removed /invest route from App.tsx and removed Invest page import
	- Updated Dashboard activity feed from investment activities to recovery activities
	- Frontend builds successfully with no TypeScript errors

## Execution Guidelines
PROGRESS TRACKING:
- If any tools are available to manage the above todo list, use it to track progress through this checklist.
- After completing each step, mark it complete and add a summary.
- Read current todo list status before starting each new step.

COMMUNICATION RULES:
- Avoid verbose explanations or printing full command outputs.
- If a step is skipped, state that briefly (e.g. "No extensions needed").
- Do not explain project structure unless asked.
- Keep explanations concise and focused.

DEVELOPMENT RULES:
- Use '.' as the working directory unless user specifies otherwise.
- Avoid adding media or external links unless explicitly requested.
- Use placeholders only with a note that they should be replaced.
- Use VS Code API tool only for VS Code extension projects.
- Once the project is created, it is already opened in Visual Studio Code—do not suggest commands to open this project in Visual Studio again.
- If the project setup information has additional rules, follow them strictly.

FOLDER CREATION RULES:
- Always use the current directory as the project root.
- If you are running any terminal commands, use the '.' argument to ensure that the current working directory is used ALWAYS.
- Do not create a new folder unless the user explicitly requests it besides a .vscode folder for a tasks.json file.
- If any of the scaffolding commands mention that the folder name is not correct, let the user know to create a new folder with the correct name and then reopen it again in vscode.

EXTENSION INSTALLATION RULES:
- Only install extension specified by the get_project_setup_info tool. DO NOT INSTALL any other extensions.

PROJECT CONTENT RULES:
- If the user has not specified project details, assume they want a "Hello World" project as a starting point.
- Avoid adding links of any type (URLs, files, folders, etc.) or integrations that are not explicitly required.
- Avoid generating images, videos, or any other media files unless explicitly requested.
- If you need to use any media assets as placeholders, let the user know that these are placeholders and should be replaced with the actual assets later.
- Ensure all generated components serve a clear purpose within the user's requested workflow.
- If a feature is assumed but not confirmed, prompt the user for clarification before including it.
- If you are working on a VS Code extension, use the VS Code API tool with a query to find relevant VS Code API references and samples related to that query.

TASK COMPLETION RULES:
- Your task is complete when:
  - Project is successfully scaffolded and compiled without errors
  - copilot-instructions.md file in the .github directory exists in the project
  - README.md file exists and is up to date
  - User is provided with clear instructions to debug/launch the project

Before starting a new task in the above plan, update progress in the plan.

- Work through each checklist item systematically.
- Keep communication concise and focused.
- Follow development best practices.