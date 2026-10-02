# Conversion conventions and sources

- [NIST SP 811, Appendix B.8](https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b8): conventional and customary conversion factors.
- [NIST SP 811, Appendix B.9](https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b9): factors by physical quantity.
- [BIPM SI prefixes](https://www.bipm.org/en/measurement-units/si-prefixes): 24 prefixes, including quecto/ronto and ronna/quetta.
- [BIPM SI Brochure](https://www.bipm.org/en/publications/si-brochure): SI units, Celsius offset and the exact elementary charge used for eV.
- [NIST binary prefixes](https://physics.nist.gov/cuu/Units/binary.html): KiB, MiB, GiB, TiB use powers of 1024; kB, MB, GB, TB use powers of 1000.

## Reproducibility

`catalog.js` contains every factor and offset. A conversion is `base = x * factor + offset`, then `y = (base - target.offset) / target.factor`. Only units in the selected semantic category can be converted. Torque and work, absorbed and equivalent dose, frequency and radioactive activity remain separate even where dimensions coincide.

The definitions 1 in = 0.0254 m, 1 lb = 0.45359237 kg and standard gravity = 9.80665 m/s² are exact. Feet, yards, international miles, international acres, lbf, psi, torque, density and flow factors derive from them. US liquid gallon = 231 in³; Imperial gallon = 4.54609 L. US dry bushel = 2150.42 in³. US survey foot is historical and explicitly labelled. No local land-area unit with a region-dependent size is assumed.

Btu IT = 1055.05585262 J; Btu thermochemical = 1054.3502644888889 J (rounded double); US therm = 105480400 J. Thermochemical calorie = 4.184 J, IT calorie = 4.1868 J. Mechanical horsepower = 550 ft·lbf/s; metric horsepower = 75 kgf·m/s; electrical horsepower = 746 W. Refrigeration ton = 12000 Btu IT/h. These variants are intentionally distinct.

Conventional mmHg, inHg and inH₂O use the tabulated NIST factors (133.3224, 3386.389 and 249.0889 Pa). Torr is separately defined as 101325/760 Pa. Conventional water head uses standard gravity; no real fluid temperature or density is inferred. Values based on tabulated factors are approximate to their published precision.

Absolute temperatures cannot be below 0 K. Temperature differences have a separate category without offsets. Rankine is °R and Réaumur is °Ré. One Julian year is exactly 365.25 days; variable calendar months/years are not supported. Angular conversion uses Math.PI. lb-mol = 453.59237 mol. Enzyme unit U = 1 µmol/min.

Digital data are an additional non-SI engineering category. Ratios (%, ppm, ppb, ppt) are dimensionless and assume the same basis; they cannot convert mass concentrations to molarity without substance data. Gas flow is actual volume flow, not standardized SCFM/Nm³/h. Gauge/absolute pressure requires a reference and is not inferred. Radiological conversions only change units, not biological weighting factors.

## Numeric limits

JavaScript IEEE-754 double precision; up to 12 significant digits on screen, native number precision in CSV. Dot and comma are accepted as the decimal separator; thousands separators are forbidden. Scientific notation is accepted. Infinity, NaN and numerical underflow are rejected. Intermediate floating-point rounding still applies: this is not an arbitrary-precision metrology system. Prefix expansion is only applied to eligible SI units; SI does not supply an imperial counterpart to every quantity.

The pressure helper calculates P = F/A using the entered force and strictly positive area. It is a separate dimensional calculation, not a kgf-to-Pa unit conversion.
