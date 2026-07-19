# Moof Website

This context defines the business language for the Moof static website and its AI-assisted content maintenance workflow.

## Language

**Maintenance**:
Content-only updates made from the store owner's Google Form response, including seasonal drinks, prices, availability, store hours, homepage announcement, featured drink, and promo copy. Redesigns, new page types, ordering, checkout, CMS login, live integrations, and custom feature work are separate change requests.
_Avoid_: Support, upkeep, site work

**Source of Truth**:
The committed repository content files after a successful validation build. Google Form responses are update requests, not durable site state.
_Avoid_: Form data, owner message, latest response

**Seasonal Update Batch**:
One complete Google Form response that describes a coherent menu or store-content update, including season details, announcements, featured drink, and all seasonal items for that update. Routine seasonal maintenance replaces the current seasonal content as a batch unless the owner explicitly requests a narrower change.
_Avoid_: Item submission, partial menu edit

**Preview Review**:
The owner-facing check after an AI agent applies a maintenance update and the site builds. If the preview is wrong, the owner revises the form response or provides corrected instructions rather than the agent silently guessing at business intent.
_Avoid_: Approval workflow, CMS editing, automatic correction
