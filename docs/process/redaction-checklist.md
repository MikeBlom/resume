# Redaction Checklist

This repository is public from its first commit. Apply this checklist **before every commit**
that adds prompts, content, docs, or configuration.

## Never commit

- Credentials, API keys, tokens, `.env` values (deploy tokens live only in GitHub secrets)
- Home addresses, phone numbers, birthdates, government ID data, family members' names
- Employer-confidential information: internal metrics, unreleased products, private incidents,
  colleagues' names without consent
- Sensitive military information: anything beyond the explicitly approved public-comfort list
  in the (private) answers to `docs/requirements/questionnaire.md`
- Raw AI session transcripts — prompt logs are **curated summaries** with personal details
  removed
- Photographs not explicitly approved for publication

## Before each commit of docs/prompts/content

1. Search the diff for emails, phone patterns, street addresses, and names other than Mike's.
2. Confirm military details appear on the approved list.
3. Confirm employer-specific numbers are public or generalized ("a platform serving millions
   of students" not internal figures).
4. Confirm prompt logs describe the session rather than pasting raw personal context.

## If something slips through

Rotate any exposed secret immediately; treat published personal data as permanently exposed
(caches/forks exist) and decide response accordingly. Fix forward — do not rely on history
rewrites of a public repo.
