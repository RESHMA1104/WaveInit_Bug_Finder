# BDD Implementation Plan - Learner Profile Certifications and Resume

## Application Overview

Implementation plan for extending the existing BDD learner profile coverage. The existing profile-page scenarios and 40+ scenarios remain unchanged. Add certification and resume scenarios inside the existing learnerProfile.feature only, reuse existing hooks/background/navigation/authentication/test-data conventions, extend learnerprofile.step.ts only for missing bindings, and add locators/actions to learnerprofilepage.ts following existing Page Object Model conventions. Do not create new feature files, duplicate generic steps, or add dependencies.

## Test Scenarios

### 1. Phase 1 - Repository alignment and gap analysis

**Seed:** `cucumber.js`

#### 1.1. Map existing learner profile scenarios before editing

**File:** `learnerProfile.feature`

**Steps:**
  1. Read the full existing learnerProfile.feature and catalog the existing Background, tags, scenario naming, indentation, Examples tables, profile navigation steps, cleanup steps, and the current 40+ scenarios.
    - expect: The new scenarios follow the same Gherkin language, tags, naming, Background, and ordering conventions.
    - expect: Existing scenarios are not rewritten or duplicated.
  2. Read learnerprofile.step.ts and identify reusable step definitions for login, profile navigation, clicking buttons, filling fields, file upload, confirmation dialogs, assertions, refresh, and cleanup.
    - expect: Only missing certification/resume bindings are planned for addition.
    - expect: No ambiguous duplicate step expressions are introduced.
  3. Read learnerprofilepage.ts and identify existing locator strategy, constructor style, helper/action naming, modal handling, wait strategy, and assertion helpers.
    - expect: New certification/resume locators and actions follow the existing page-object conventions instead of introducing a second pattern.
  4. Inspect the existing test-data directory and identify the actual dummy certificate, resume, replacement resume, invalid-file, and oversized-file fixtures already present.
    - expect: Scenarios reference actual repository-relative fixture paths and do not invent filenames that are absent.
  5. Inspect package scripts, cucumber.js, hooks, and TypeScript configuration to determine the exact focused and full test commands.
    - expect: Validation uses only existing project commands and configuration.

### 2. Phase 2 - Add certification scenarios to existing feature

**Seed:** `cucumber.js`

#### 2.1. Certification happy-path and CRUD scenarios

**File:** `learnerProfile.feature`

**Steps:**
  1. Append certification scenarios in the existing learnerProfile.feature using the existing authenticated profile Background and profile navigation steps.
    - expect: The scenario starts from the same state and style as existing learner profile scenarios.
  2. Add a scenario for opening the Certifications section/form and verifying the Add Certificate modal controls.
    - expect: The modal opens and the title, issuer, credential ID, issue date, expiry date, verification URL, certificate file, Cancel, and Add Certificate controls are available.
  3. Add a scenario for creating a certificate with valid title, issuer, credential ID, dates, verification URL, and the existing dummy certificate fixture.
    - expect: The certificate is saved and displayed in the Certifications section with the expected values.
  4. Add a scenario for creating a certificate without an attachment when the application allows optional files.
    - expect: The scenario verifies the actual product behavior: save succeeds if optional, or an explicit file validation message appears if required.
  5. Add a scenario for editing an existing certificate, changing text/date/link values and replacing the attachment when supported.
    - expect: The same certificate is updated in place and no duplicate is created.
  6. Add a scenario for deleting an existing certificate with cancel and confirm branches.
    - expect: Cancel preserves the certificate; confirm removes it and the existing empty-state assertion is shown.
  7. Add a scenario for multiple certificates and independent edit/delete behavior.
    - expect: Editing or deleting one certificate does not alter the other certificate.
  8. Add a scenario for canceling a new certificate and canceling an edit.
    - expect: No record is created by a canceled add and no values change by a canceled edit.
  9. Add a scenario for persistence after refresh or re-login using the existing project navigation step.
    - expect: Saved certificates remain available after reload and authenticated re-entry.

#### 2.2. Certification validation and file-boundary scenarios

**File:** `learnerProfile.feature`

**Steps:**
  1. Add scenarios for empty submission, blank/whitespace title, missing required title, invalid verification URL, invalid date values, expiry before issue date, and boundary dates.
    - expect: The correct validation message or browser validation is displayed and no invalid record is saved.
  2. Add scenarios for duplicate credential ID or duplicate certificate data if the product exposes duplicate validation.
    - expect: The actual duplicate behavior is captured without assuming an unsupported rule.
  3. Add scenarios using the existing invalid certificate fixtures: unsupported extension, corrupt PDF, and oversized file beyond the UI limit.
    - expect: Each invalid file is rejected with visible feedback and does not create or replace a valid certificate.
  4. Add a scenario for safe rendering of special characters or HTML-like certificate text and filenames.
    - expect: The values are rendered as text and no markup executes or local path is exposed.

### 3. Phase 3 - Add resume scenarios to existing feature

**Seed:** `cucumber.js`

#### 3.1. Resume upload, replacement, removal, and persistence

**File:** `learnerProfile.feature`

**Steps:**
  1. Append resume scenarios in the existing learnerProfile.feature using existing profile setup and cleanup.
    - expect: No new feature file is created and existing profile scenarios remain unchanged.
  2. Add a scenario for opening the Resume upload modal and verifying the file input and controls.
    - expect: The modal opens and the file input accepts the formats configured by the application.
  3. Add a scenario for uploading the existing valid dummy resume fixture.
    - expect: The resume upload succeeds and the Resume empty state is replaced by the filename or resume action.
  4. Add a scenario for refreshing the page and verifying the resume remains uploaded.
    - expect: The resume persists after refresh.
  5. Add a scenario for replacing an existing resume with the existing second dummy resume fixture.
    - expect: The current resume changes to the replacement and the old file is no longer presented as current.
  6. Add a scenario for deleting/removing the resume with cancel and confirm branches.
    - expect: Cancel preserves the resume; confirm removes it and the existing empty-state assertion returns.
  7. Add a scenario for canceling the upload modal without selecting a file.
    - expect: The modal closes and no resume is created or replaced.
  8. Add a scenario for re-upload/recovery after a failed upload.
    - expect: A subsequent valid upload succeeds and the previous valid resume remains safe after failed attempts.

#### 3.2. Resume validation and security scenarios

**File:** `learnerProfile.feature`

**Steps:**
  1. Add a scenario for submitting the resume modal with no file selected.
    - expect: The submit button remains disabled or the application displays a required-file validation message.
  2. Add scenarios using existing invalid resume fixtures: unsupported extension, corrupt file, and oversized file.
    - expect: Invalid files are rejected with visible feedback and the existing resume is not replaced.
  3. Add a scenario for supported file types at the configured size boundary and just over the boundary.
    - expect: Boundary behavior matches the implemented application limit.
  4. Add a scenario for safe handling of filenames containing spaces, special characters, HTML-like text, and path separators.
    - expect: The filename is safely displayed without script execution or local path disclosure.
  5. Add a scenario for protected access after logout, reusing existing logout/navigation steps and only if the current project already covers authorization checks.
    - expect: The profile and stored resume require authentication.

### 4. Phase 4 - Page object and step implementation

**Seed:** `cucumber.js`

#### 4.1. Implement certification and resume locators/actions

**File:** `learnerprofilepage.ts`

**Steps:**
  1. Add locators using the existing page-object style for Certifications and Resume section buttons, modal containers, field placeholders, date inputs, file inputs, submit/cancel buttons, empty states, validation text, card-level Edit/Delete controls, and confirmation controls.
    - expect: Locators are one-to-one where possible and scoped to the relevant section/modal to avoid collisions with existing profile buttons.
  2. Add page-object actions for opening forms, filling valid data, selecting existing test-data files, submitting, canceling, editing a card, deleting a card, and waiting for the resulting UI state.
    - expect: Actions use existing wait/assertion helpers and do not rely on brittle global button indexes or arbitrary timeouts.
  3. Ensure the resume submit locator is scoped to the open modal so it is not confused with the section-level Upload Resume button.
    - expect: Resume upload scenarios click the intended submit control deterministically.

#### 4.2. Implement missing certification and resume bindings

**File:** `learnerprofile.step.ts`

**Steps:**
  1. Reuse existing generic steps wherever an existing expression already supports the required action.
    - expect: No duplicate generic step definitions or ambiguous matches are added.
  2. Add only missing Given/When/Then bindings for certification and resume data, uploads, modal actions, card-scoped edits/deletes, validation assertions, persistence checks, and cleanup.
    - expect: All new scenarios resolve to exactly one step definition.
  3. Resolve fixture paths from the existing test-data convention rather than hard-coding machine-specific absolute paths.
    - expect: Tests run from the project root and CI-compatible relative paths.
  4. Use scenario-scoped state only if the existing step architecture requires it, and clean created records with existing hooks or UI cleanup.
    - expect: Scenarios remain independent and do not leak certification/resume state.

### 5. Phase 5 - Verification

**Seed:** `cucumber.js`

#### 5.1. Run focused and regression validation

**File:** `learnerProfile.feature`

**Steps:**
  1. Run the existing focused Cucumber command for learnerProfile.feature.
    - expect: All existing and newly added learner profile scenarios are discovered; failures are investigated rather than hidden.
  2. Run the existing full Cucumber test command after focused tests pass.
    - expect: The 40+ existing profile scenarios and the new certification/resume scenarios pass without regressions.
  3. Review the final diff for unintended changes, duplicate steps, new feature files, hard-coded credentials, absolute fixture paths, and temporary artifacts.
    - expect: Only learnerProfile.feature, learnerprofile.step.ts, learnerprofilepage.ts, and any required existing test-data references are changed.
    - expect: No new feature file or dependency is added.
