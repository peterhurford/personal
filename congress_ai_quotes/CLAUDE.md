# congress_ai_quotes workflow notes

## Adding quotes to tracker-embed.html

Entries in `RAW_DATA` use the format:
`["{emoji} {Name} ({Party-State})", "{quote with <b>bold</b>}", "{source URL}", "{context / hearing name}", "{YYYY-MM-DD}"]`

- 🔴 = Republican, 🔵 = Democrat
- Keep quotes grouped by party, then alphabetical by name within party.

### Source labels

`getSourceLabel(url, context)` auto-labels the link. For `*.house.gov` URLs it returns the context field (4th entry), falling back to "House.gov" if empty.

**Rule:** When adding a quote whose source URL is a `*.house.gov` link, always populate the context field with the hearing/event name. Do not leave it empty.

### Avoiding duplicate display

The context field is also rendered below the source link as a footnote. When the source label and the context would be identical (which happens for house.gov URLs), only show the source label — suppress the footnote.

### Updating totals

The hero banner at the top of `tracker-embed.html` shows total member count plus R/D breakdown. Update these whenever a new member (not just a new quote from an existing member) is added or when a member leaves Congress.
