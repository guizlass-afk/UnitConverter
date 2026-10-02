# Unit Converter

Browser-only converter for 52 quantities, including SI, imperial, US customary, CGS and engineering units. Includes 24 SI prefixes, absolute and differential temperatures, force/area pressure calculator, search, copy and CSV export.

12 languages with SVG flags; shared Factory Toolbox light/dark preference. No backend, analytics, remote libraries or runtime dependencies. Files live in the canonical shared project directory `Z:\Projetos\Unit Converter`.

## Run and test

Serve this directory with any static HTTP server. Open `index.html`.

Tests: `python tests/test_app.py` (requires Python, Playwright and installed Chrome). Conversion factors and conventions: [SOURCES.md](SOURCES.md).

Own code: all rights reserved. The flag assets and theme controls are reused from the owner's Factory Toolbox projects.
